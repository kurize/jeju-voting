'use client';

import { useState, useCallback } from 'react';
import { QUESTIONS } from '@/data/questions';
import { Card } from '@/components/card';
import { submitVote } from '@/lib/supabase';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface SurveyProps {
  voter: string;
  onComplete: () => void;
  onBack: () => void;
}

export function Survey({ voter, onComplete, onBack }: SurveyProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const q = QUESTIONS[currentQ];
  const selectedId = votes[q.id] || '';

  const selectOption = useCallback((optionId: string) => {
    setVotes((prev) => ({ ...prev, [q.id]: optionId }));
  }, [q.id]);

  const goNext = useCallback(async () => {
    if (!selectedId) {
      alert('请先选择这一题的一个选项。');
      return;
    }
    if (currentQ === QUESTIONS.length - 1) {
      // 检查是否全部完成
      const unfilled = QUESTIONS.filter((qq) => !votes[qq.id] && qq.id !== q.id);
      if (unfilled.length > 0) {
        alert(`还有 ${unfilled.length} 题未完成。`);
        return;
      }
      // 提交
      setSubmitting(true);
      try {
        await submitVote(voter, { ...votes, [q.id]: selectedId });
        onComplete();
      } catch (err) {
        console.error(err);
        alert('提交失败，请重试。');
      } finally {
        setSubmitting(false);
      }
    } else {
      setCurrentQ((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedId, currentQ, votes, q.id, voter, onComplete]);

  const goPrev = useCallback(() => {
    if (currentQ > 0) {
      setCurrentQ((i) => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQ]);

  const resetAll = useCallback(() => {
    if (confirm('确定清空本人的全部选择？')) {
      setVotes({});
      setCurrentQ(0);
    }
  }, []);

  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
  const pickedQuestions = QUESTIONS.filter((qq) => votes[qq.id]);

  return (
    <section className="max-w-[1100px] mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
        {/* 侧边栏 */}
        <aside className="md:sticky md:top-5 bg-white border-[1.5px] border-line rounded-[20px] p-5 shadow-lg flex flex-col gap-4 mt-6">
          <div className="text-[13px] text-muted">
            当前投票成员
            <strong className="block text-[17px] text-text mt-0.5">{voter}</strong>
          </div>

          {/* 进度条 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-muted">
              <span>进度</span>
              <span>{currentQ + 1} / {QUESTIONS.length}</span>
            </div>
            <div className="h-1.5 bg-[#f0e4db] rounded-full overflow-hidden">
              <span
                className="block h-full bg-gradient-to-r from-brand to-brand2 transition-all duration-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 已选列表 */}
          <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto">
            {pickedQuestions.length === 0 ? (
              <div className="text-xs text-muted py-1">尚未选择任何题目</div>
            ) : (
              pickedQuestions.map((qq) => {
                const opt = qq.options.find((o) => o.id === votes[qq.id]);
                return (
                  <div key={qq.id} className="p-2 bg-bg rounded-[9px] border border-line text-xs leading-snug">
                    <div className="text-brand font-bold text-[11px]">{qq.day} · {qq.meal}</div>
                    <div className="font-semibold text-text mt-0.5">{opt?.name}</div>
                  </div>
                );
              })
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col gap-2">
            <button onClick={resetAll} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-[#f0c0b0] text-[#b84030] hover:bg-[#fff5f3] transition-colors flex items-center justify-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> 清空重选
            </button>
            <button onClick={onBack} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> 返回首页
            </button>
          </div>
        </aside>

        {/* 题目区域 */}
        <div className="bg-white border-[1.5px] border-line rounded-[20px] p-6 shadow-lg mt-6">
          <div className="text-xs font-bold tracking-wider uppercase text-brand mb-1.5">
            {q.day} · {q.meal} · 第 {currentQ + 1} 题 / 共 {QUESTIONS.length} 题
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-5 leading-tight">{q.title}</h2>

          {/* 选项卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options.map((opt) => (
              <Card
                key={opt.id}
                option={opt}
                selected={selectedId === opt.id}
                onSelect={() => selectOption(opt.id)}
              />
            ))}
          </div>

          {/* 导航 */}
          <div className="flex justify-between items-center mt-5 gap-3">
            <span className="text-[13px] text-muted">
              {selectedId ? '' : '请选择一个选项后继续'}
            </span>
            <div className="flex gap-2.5">
              <button
                onClick={goPrev}
                disabled={currentQ === 0}
                className="px-5 py-3 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← 上一题
              </button>
              <button
                onClick={goNext}
                disabled={submitting}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-brand to-brand2 shadow-[0_6px_18px_rgba(201,74,30,.28)] hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(201,74,30,.36)] active:translate-y-0 transition-all disabled:opacity-60"
              >
                {submitting ? '提交中...' : currentQ === QUESTIONS.length - 1 ? '提交投票' : '下一题 →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
