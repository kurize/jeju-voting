'use client';

import { useState, useEffect, useCallback } from 'react';
import { QUESTIONS } from '@/data/questions';
import { getVotes, clearAllVotes, type VoteRecord } from '@/lib/supabase';
import { ArrowLeft, Download, Trash2, RefreshCw, MapPin } from 'lucide-react';

interface ResultsProps {
  onBack: () => void;
  onVoteAgain: () => void;
}

interface TallyItem {
  question: typeof QUESTIONS[number];
  total: number;
  ranked: { option: typeof QUESTIONS[number]['options'][number]; count: number }[];
  winner: { option: typeof QUESTIONS[number]['options'][number]; count: number };
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

  const tally: TallyItem[] = QUESTIONS.map((q) => {
    const counts: Record<string, number> = {};
    q.options.forEach((o) => (counts[o.id] = 0));
    votes.forEach((v) => {
      if (v.answers && v.answers[q.id]) {
        counts[v.answers[q.id]] = (counts[v.answers[q.id]] || 0) + 1;
      }
    });
    const total = votes.length;
    const ranked = q.options
      .map((o) => ({ option: o, count: counts[o.id] || 0 }))
      .sort((a, b) => b.count - a.count);
    return { question: q, total, ranked, winner: ranked[0] };
  });

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
    const lines = tally.map(
      (item) =>
        `${item.question.day} ${item.question.meal}｜${item.winner.option.name}｜${item.winner.option.zh}｜${item.winner.option.price}｜${item.winner.option.address}`
    );
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
      <div className="max-w-[1100px] mx-auto px-6 py-16 text-center">
        <div className="text-muted text-lg">加载投票数据中...</div>
      </div>
    );
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 pb-16">
      {/* 头部 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-7 mt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-text">投票结果</h2>
        <div className="flex gap-2.5 flex-wrap">
          <button onClick={loadVotes} className="py-2.5 px-4 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> 刷新
          </button>
          <button onClick={handleDownloadText} className="py-2.5 px-4 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> 导出行程
          </button>
          <button onClick={handleClearAll} className="py-2.5 px-4 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-[#f0c0b0] text-[#b84030] hover:bg-[#fff5f3] transition-colors flex items-center gap-1.5">
            <Trash2 className="w-3.5 h-3.5" /> 清空全部
          </button>
        </div>
      </div>

      {/* 参与成员 */}
      <div className="bg-white border-[1.5px] border-line rounded-[20px] p-5 shadow-lg mb-4">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-3">
          <h4 className="text-lg font-bold text-text">已参与投票成员</h4>
          <span className="text-[13px] text-muted">共 {votes.length} 人</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {votes.length === 0 ? (
            <span className="text-[13px] text-muted">暂无投票记录</span>
          ) : (
            votes.map((v) => (
              <span key={v.id || v.voter} className="px-3 py-1.5 bg-bg border border-line rounded-full text-[13px] font-semibold text-text">
                {v.voter}
              </span>
            ))
          )}
        </div>
      </div>

      {/* 当前领先行程 */}
      <div className="bg-white border-[1.5px] border-line rounded-[20px] p-5 shadow-lg mb-4">
        <h4 className="text-lg font-bold text-text mb-4">当前领先行程</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {tally.map((item) => {
            const win = item.winner.option;
            return (
              <div key={item.question.id} className="p-3.5 rounded-[14px] bg-bg border border-line">
                <div className="text-[11px] font-bold tracking-wider uppercase text-brand mb-0.5">
                  {item.question.day}
                </div>
                <div className="text-[11px] text-muted mb-1.5">{item.question.meal}</div>
                <div className="text-base font-bold text-text mb-0.5">{win.name}</div>
                <div className="text-xs text-muted leading-snug">{win.zh} · {win.area} · {win.price}</div>
                <a
                  href={win.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-brand font-semibold hover:underline"
                >
                  <MapPin className="w-3 h-3" /> 查看地图
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* 每题统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {tally.map((item) => (
          <div key={item.question.id} className="bg-white border-[1.5px] border-line rounded-[20px] p-5 shadow-lg">
            <h4 className="text-base font-bold text-text mb-3.5">{item.question.day} · {item.question.meal}</h4>
            {item.ranked.map((r) => {
              const pct = item.total ? (r.count / item.total) * 100 : 0;
              return (
                <div key={r.option.id} className="my-2">
                  <div className="flex justify-between text-[13px] text-[#514944] mb-1">
                    <span>{r.option.name}</span>
                    <span>{r.count} 票</span>
                  </div>
                  <div className="h-2 bg-[#f0e4db] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand to-brand2 rounded-full transition-all duration-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-2 bg-[#fdf0eb] border border-[#f5d0c0] rounded-[10px] text-[13px] text-[#8a3820]">
              当前领先：<strong className="text-brand">{item.winner.option.name}</strong>
              {item.total ? `（${item.winner.count} / ${item.total} 票）` : '（暂无投票）'}
            </div>
          </div>
        ))}
      </div>

      {/* 底部按钮 */}
      <div className="flex gap-2.5 flex-wrap mt-5">
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
