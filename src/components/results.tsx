'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { QUESTIONS, CATEGORIES } from '@/data/questions';
import { IMAGES } from '@/data/images';
import { getVotes, clearAllVotes, type VoteRecord } from '@/lib/supabase';
import { ArrowLeft, Download, Trash2, RefreshCw, MapPin } from 'lucide-react';

interface ResultsProps {
  onBack: () => void;
  onVoteAgain: () => void;
}

interface TallyItem {
  question: typeof QUESTIONS[number];
  total: number;
  optA: { voters: string[]; count: number };
  optB: { voters: string[]; count: number };
}

export function Results({ onBack, onVoteAgain }: ResultsProps) {
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVotes = useCallback(async () => {
    setLoading(true);
    const data = await getVotes();
    setVotes(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadVotes(); }, [loadVotes]);

  // 统计每题投票详情（含投票者名字）
  const tally: TallyItem[] = useMemo(() => QUESTIONS.map(q => {
    const optAVoters: string[] = [];
    const optBVoters: string[] = [];
    votes.forEach(v => {
      const answer = v.answers?.[q.id];
      if (answer === q.options[0].id) optAVoters.push(v.voter);
      else if (answer === q.options[1].id) optBVoters.push(v.voter);
    });
    return {
      question: q,
      total: votes.length,
      optA: { voters: optAVoters, count: optAVoters.length },
      optB: { voters: optBVoters, count: optBVoters.length },
    };
  }), [votes]);

  // 统计数据
  const stats = useMemo(() => {
    if (votes.length === 0) return null;
    let mostContested = tally[0];
    let mostDecisive = tally[0];
    tally.forEach(t => {
      const gap = Math.abs(t.optA.count - t.optB.count);
      const contestedGap = Math.abs(mostContested.optA.count - mostContested.optB.count);
      const decisiveGap = Math.abs(mostDecisive.optA.count - mostDecisive.optB.count);
      if (gap < contestedGap) mostContested = t;
      if (gap > decisiveGap) mostDecisive = t;
    });
    return { mostContested, mostDecisive };
  }, [tally, votes.length]);

  const handleClearAll = useCallback(async () => {
    if (!confirm('确定清空全部投票记录？此操作不可撤销。')) return;
    try {
      await clearAllVotes();
      await loadVotes();
    } catch (err) {
      console.error(err);
      alert('清空失败，请重试。');
    }
  }, [loadVotes]);

  const handleDownloadText = useCallback(() => {
    const lines: string[] = [];
    CATEGORIES.forEach(cat => {
      lines.push(`=== ${cat.emoji} ${cat.label} ===`);
      tally
        .filter(t => t.question.category === cat.id)
        .forEach(item => {
          const winner = item.optA.count >= item.optB.count ? item.question.options[0] : item.question.options[1];
          lines.push(`${winner.name}（${winner.zh}）| ${winner.price} | ${winner.address}`);
        });
      lines.push('');
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jeju-final-itinerary.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [tally]);

  if (loading) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-16 text-center">
        <div className="text-muted text-lg">加载投票数据中...</div>
      </div>
    );
  }

  return (
    <section className="max-w-[700px] mx-auto px-4 pb-16">
      {/* 头部 */}
      <div className="mt-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">投票结果</h2>
        {stats && votes.length > 0 && (
          <p className="text-sm text-muted">
            {votes.length} 人参与 · {QUESTIONS.length} 题已决
            {stats.mostContested !== stats.mostDecisive && (
              <> · 最大分歧：{stats.mostContested.question.title.split('：')[0]}</>
            )}
          </p>
        )}
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={loadVotes} className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-white border border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" /> 刷新
          </button>
          <button onClick={handleDownloadText} className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-white border border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors flex items-center gap-1.5">
            <Download className="w-3 h-3" /> 导出
          </button>
          <button onClick={handleClearAll} className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-white border border-[#f0c0b0] text-[#b84030] hover:bg-[#fff5f3] transition-colors flex items-center gap-1.5">
            <Trash2 className="w-3 h-3" /> 清空
          </button>
        </div>
      </div>

      {/* 参与成员 */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {votes.length === 0 ? (
          <span className="text-sm text-muted">暂无投票记录</span>
        ) : (
          votes.map(v => (
            <span key={v.id || v.voter} className="px-2.5 py-1 bg-white border border-line rounded-full text-xs font-semibold text-text">
              {v.voter}
            </span>
          ))
        )}
      </div>

      {/* 按分类展示 VS 对比卡片 */}
      {CATEGORIES.map(cat => {
        const catTally = tally.filter(t => t.question.category === cat.id);
        return (
          <div key={cat.id} className="mb-8">
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <span>{cat.emoji}</span> {cat.label}
            </h3>
            <div className="flex flex-col gap-4">
              {catTally.map(item => (
                <VsCard key={item.question.id} item={item} />
              ))}
            </div>
          </div>
        );
      })}

      {/* 底部按钮 */}
      <div className="flex gap-2.5 flex-wrap mt-8">
        <button onClick={onBack} className="py-3 px-5 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> 返回首页
        </button>
        <button onClick={onVoteAgain} className="py-3 px-5 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-brand to-brand2 shadow-[0_6px_18px_rgba(201,74,30,.28)] hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(201,74,30,.36)] active:translate-y-0 transition-all">
          继续投票
        </button>
      </div>
    </section>
  );
}

// VS 对比卡片组件
function VsCard({ item }: { item: TallyItem }) {
  const [optA, optB] = item.question.options;
  const aWins = item.optA.count > item.optB.count;
  const bWins = item.optB.count > item.optA.count;
  const tied = item.optA.count === item.optB.count && item.total > 0;
  const imgA = IMAGES[optA.id]?.[0];
  const imgB = IMAGES[optB.id]?.[0];

  return (
    <div className="bg-white border-[1.5px] border-line rounded-2xl overflow-hidden shadow-lg">
      {/* 问题标题栏 */}
      <div className="px-4 py-3 border-b border-line bg-[#fdf7f3]">
        <h4 className="text-sm font-bold text-text">{item.question.title}</h4>
      </div>

      {/* VS 对比 */}
      <div className="grid grid-cols-[1fr_auto_1fr]">
        {/* 左侧选项 A */}
        <div className={`p-3 md:p-4 ${aWins ? 'bg-[#fdf0eb]' : ''}`}>
          {imgA && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgA} alt={optA.name} className="w-full aspect-[4/3] object-cover rounded-xl mb-2.5" loading="lazy" />
          )}
          <div className="flex items-start gap-1">
            {aWins && <span className="text-base mt-0.5">🏆</span>}
            <div className="min-w-0">
              <div className="text-sm md:text-base font-bold text-text leading-tight">{optA.name}</div>
              <div className="text-[11px] text-muted truncate">{optA.zh}</div>
            </div>
          </div>
          <div className="text-[11px] text-muted mt-1">{optA.price}</div>

          {/* 票数 */}
          <div className="mt-2.5">
            <span className={`text-2xl font-bold ${aWins ? 'text-brand' : 'text-text'}`}>{item.optA.count}</span>
            <span className="text-xs text-muted ml-1">票</span>
          </div>

          {/* 投票者 */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.optA.voters.map(v => (
              <span key={v} className="text-[10px] px-1.5 py-0.5 bg-bg border border-line rounded-full text-muted">{v}</span>
            ))}
          </div>

          {/* 地图链接 */}
          <a href={optA.apple} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-[11px] text-brand font-semibold hover:underline">
            <MapPin className="w-3 h-3" /> 地图
          </a>
        </div>

        {/* VS 分隔线 */}
        <div className="flex items-center px-1 md:px-2 border-x border-line bg-[#faf5f1]">
          <span className="text-[10px] font-bold text-muted/60">VS</span>
        </div>

        {/* 右侧选项 B */}
        <div className={`p-3 md:p-4 ${bWins ? 'bg-[#fdf0eb]' : ''}`}>
          {imgB && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgB} alt={optB.name} className="w-full aspect-[4/3] object-cover rounded-xl mb-2.5" loading="lazy" />
          )}
          <div className="flex items-start gap-1">
            {bWins && <span className="text-base mt-0.5">🏆</span>}
            <div className="min-w-0">
              <div className="text-sm md:text-base font-bold text-text leading-tight">{optB.name}</div>
              <div className="text-[11px] text-muted truncate">{optB.zh}</div>
            </div>
          </div>
          <div className="text-[11px] text-muted mt-1">{optB.price}</div>

          {/* 票数 */}
          <div className="mt-2.5">
            <span className={`text-2xl font-bold ${bWins ? 'text-brand' : 'text-text'}`}>{item.optB.count}</span>
            <span className="text-xs text-muted ml-1">票</span>
          </div>

          {/* 投票者 */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.optB.voters.map(v => (
              <span key={v} className="text-[10px] px-1.5 py-0.5 bg-bg border border-line rounded-full text-muted">{v}</span>
            ))}
          </div>

          {/* 地图链接 */}
          <a href={optB.apple} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-[11px] text-brand font-semibold hover:underline">
            <MapPin className="w-3 h-3" /> 地图
          </a>
        </div>
      </div>

      {/* 底部：平局提示 */}
      {tied && (
        <div className="px-4 py-2 border-t border-line bg-[#fdf7f3] text-center text-xs text-muted">
          ⚖️ 平票！需要现场 PK
        </div>
      )}
    </div>
  );
}
