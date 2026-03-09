'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { QUESTIONS, CATEGORIES } from '@/data/questions';
import { Card } from '@/components/card';
import { CompactCard } from '@/components/compact-card';
import { DetailSheet } from '@/components/detail-sheet';
import { submitVote } from '@/lib/supabase';
import { ArrowLeft, RotateCcw, Home, Heart, X } from 'lucide-react';
import type { QuestionOption, SelectionState } from '@/data/questions';

interface SurveyProps {
  voter: string;
  onComplete: () => void;
  onBack: () => void;
}

export function Survey({ voter, onComplete, onBack }: SurveyProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [expandedOption, setExpandedOption] = useState<QuestionOption | null>(null);
  const justSelectedRef = useRef(false);

  const q = QUESTIONS[currentQ];
  const selectedId = votes[q.id] || '';

  // 当前分类信息
  const currentCategory = CATEGORIES.find(c => c.id === q.category)!;
  const categoryQuestions = QUESTIONS.filter(qq => qq.category === q.category);
  const categoryIndex = categoryQuestions.indexOf(q);

  // 计算卡片选中态
  const getSelectionState = useCallback((optId: string): SelectionState => {
    if (selectedId === optId) return 'selected';
    if (selectedId === 'both') return 'both';
    if (selectedId === 'neither') return 'dimmed';
    return 'none';
  }, [selectedId]);

  // 选择答案（支持 optId / "both" / "neither"）
  const selectAnswer = useCallback((value: string) => {
    const isNewSelection = votes[q.id] !== value;
    setVotes((prev) => ({ ...prev, [q.id]: value }));
    if (isNewSelection) {
      justSelectedRef.current = true;
    }
  }, [q.id, votes]);

  // 自动跳题（选中后 600ms）
  useEffect(() => {
    if (!justSelectedRef.current) return;
    justSelectedRef.current = false;

    if (currentQ >= QUESTIONS.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentQ(i => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
    return () => clearTimeout(timer);
  }, [votes, currentQ]);

  // 提交投票
  const handleSubmit = useCallback(async () => {
    const unfilled = QUESTIONS.filter(qq => !votes[qq.id]);
    if (unfilled.length > 0) {
      alert(`还有 ${unfilled.length} 题未完成。`);
      const idx = QUESTIONS.indexOf(unfilled[0]);
      setCurrentQ(idx);
      return;
    }
    setSubmitting(true);
    try {
      await submitVote(voter, votes);
      onComplete();
    } catch (err) {
      console.error(err);
      alert('提交失败，请重试。');
    } finally {
      setSubmitting(false);
    }
  }, [votes, voter, onComplete]);

  const goPrev = useCallback(() => {
    if (currentQ > 0) {
      setCurrentQ(i => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQ]);

  const goNext = useCallback(() => {
    if (!selectedId) {
      alert('请先选择一个选项。');
      return;
    }
    if (currentQ === QUESTIONS.length - 1) {
      handleSubmit();
    } else {
      setCurrentQ(i => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedId, currentQ, handleSubmit]);

  const resetAll = useCallback(() => {
    if (confirm('确定清空全部选择？')) {
      setVotes({});
      setCurrentQ(0);
    }
  }, []);

  return (
    <section className="min-h-screen">
      {/* Slim Top Bar */}
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-line shadow-sm">
        <div className="max-w-[700px] mx-auto px-4 py-3">
          {/* 第一行：导航 + 投票者 + 进度 + 操作 */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={goPrev}
              disabled={currentQ === 0}
              className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-muted hover:text-text hover:bg-line transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex-1 text-center min-w-0">
              <span className="text-sm font-semibold text-text">{voter}</span>
              <span className="text-xs text-muted ml-2">{currentQ + 1}/{QUESTIONS.length}</span>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={resetAll}
                className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-muted hover:text-[#b84030] hover:bg-[#fff5f3] transition-colors"
                title="清空重选"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-muted hover:text-text hover:bg-line transition-colors"
                title="返回首页"
              >
                <Home className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 第二行：分段进度条 */}
          <div className="flex gap-0.5 mt-2.5">
            {QUESTIONS.map((qq, i) => (
              <div
                key={qq.id}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  votes[qq.id]
                    ? 'bg-gradient-to-r from-brand to-brand2'
                    : i === currentQ
                      ? 'bg-brand/30'
                      : 'bg-[#f0e4db]'
                }`}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* 题目内容 */}
      <div className="max-w-[700px] mx-auto px-4 pb-20 pt-5">
        {/* 分类标签 */}
        <div className="text-xs font-bold text-brand mb-1.5">
          {currentCategory.emoji} {currentCategory.label} · 第 {categoryIndex + 1} 题
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-text mb-5 leading-tight">{q.title}</h2>

        {/* 移动端：紧凑并排卡片 */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {q.options.map(opt => (
            <CompactCard
              key={opt.id}
              option={opt}
              selectionState={getSelectionState(opt.id)}
              onSelect={() => selectAnswer(opt.id)}
              onExpand={() => setExpandedOption(opt)}
            />
          ))}
        </div>

        {/* 桌面端：完整卡片 */}
        <div className="hidden md:grid md:grid-cols-2 gap-4">
          {q.options.map(opt => (
            <Card
              key={opt.id}
              option={opt}
              selectionState={getSelectionState(opt.id)}
              onSelect={() => selectAnswer(opt.id)}
            />
          ))}
        </div>

        {/* "我都要" / "都不要" 按钮 */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => selectAnswer('both')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${selectedId === 'both'
                ? 'bg-gradient-to-br from-[#e8714a]/20 to-[#c94a1e]/10 border-2 border-[#e8714a]/50 text-brand shadow-sm'
                : 'bg-white border-[1.5px] border-line text-muted hover:border-[#e8714a]/30 hover:text-brand'}`}
          >
            <Heart className="w-3.5 h-3.5" /> 我都要
          </button>
          <button
            onClick={() => selectAnswer('neither')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${selectedId === 'neither'
                ? 'bg-[#f0ebe8] border-2 border-[#c8b0a0] text-[#8a7060] shadow-sm'
                : 'bg-white border-[1.5px] border-line text-muted hover:border-[#c8b0a0] hover:text-[#8a7060]'}`}
          >
            <X className="w-3.5 h-3.5" /> 都不要
          </button>
        </div>

        {/* 底部导航按钮 */}
        <div className="flex justify-center mt-6">
          <button
            onClick={goNext}
            disabled={submitting || !selectedId}
            className="px-8 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed
              text-white bg-gradient-to-br from-brand to-brand2 shadow-[0_6px_18px_rgba(201,74,30,.28)] hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(201,74,30,.36)] active:translate-y-0"
          >
            {submitting ? '提交中...' : currentQ === QUESTIONS.length - 1 ? '提交投票 ✓' : '下一题 →'}
          </button>
        </div>
      </div>

      {/* 详情底部弹窗 */}
      <DetailSheet
        option={expandedOption}
        open={!!expandedOption}
        onClose={() => setExpandedOption(null)}
      />
    </section>
  );
}
