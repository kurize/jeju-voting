'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { QUESTIONS, CATEGORIES } from '@/data/questions';
import { IMAGES } from '@/data/images';
import { getVotes, type VoteRecord } from '@/lib/supabase';
import { ArrowLeft, Download, RefreshCw, MapPin } from 'lucide-react';

interface ResultsProps {
  onBack: () => void;
  onVoteAgain: () => void;
}

interface TallyItem {
  question: typeof QUESTIONS[number];
  total: number;
  optA: { voters: string[]; count: number };
  optB: { voters: string[]; count: number };
  bothVoters: string[];
  neitherVoters: string[];
  // 得分 = 直选 + both（both 对两个选项各 +1）
  scoreA: number;
  scoreB: number;
}

interface RestaurantRank {
  id: string;
  name: string;
  zh: string;
  score: number;
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

  // 统计每题投票详情（含 both/neither）
  const tally: TallyItem[] = useMemo(() => QUESTIONS.map(q => {
    const optAVoters: string[] = [];
    const optBVoters: string[] = [];
    const bothVoters: string[] = [];
    const neitherVoters: string[] = [];
    votes.forEach(v => {
      const answer = v.answers?.[q.id];
      if (answer === q.options[0].id) optAVoters.push(v.voter);
      else if (answer === q.options[1].id) optBVoters.push(v.voter);
      else if (answer === 'both') bothVoters.push(v.voter);
      else if (answer === 'neither') neitherVoters.push(v.voter);
    });
    return {
      question: q,
      total: votes.length,
      optA: { voters: optAVoters, count: optAVoters.length },
      optB: { voters: optBVoters, count: optBVoters.length },
      bothVoters,
      neitherVoters,
      scoreA: optAVoters.length + bothVoters.length,
      scoreB: optBVoters.length + bothVoters.length,
    };
  }), [votes]);

  // 餐厅总排名
  const restaurantRanking: RestaurantRank[] = useMemo(() => {
    const scoreMap: Record<string, RestaurantRank> = {};
    QUESTIONS.forEach(q => {
      q.options.forEach(opt => {
        if (!scoreMap[opt.id]) {
          scoreMap[opt.id] = { id: opt.id, name: opt.name, zh: opt.zh, score: 0 };
        }
      });
    });
    tally.forEach(item => {
      const [optA, optB] = item.question.options;
      scoreMap[optA.id].score += item.scoreA;
      scoreMap[optB.id].score += item.scoreB;
    });
    return Object.values(scoreMap).sort((a, b) => b.score - a.score);
  }, [tally]);

  const maxScore = restaurantRanking[0]?.score || 1;

  // 统计数据
  const stats = useMemo(() => {
    if (votes.length === 0) return null;
    let mostContested = tally[0];
    let mostDecisive = tally[0];
    tally.forEach(t => {
      const gap = Math.abs(t.scoreA - t.scoreB);
      const contestedGap = Math.abs(mostContested.scoreA - mostContested.scoreB);
      const decisiveGap = Math.abs(mostDecisive.scoreA - mostDecisive.scoreB);
      if (gap < contestedGap) mostContested = t;
      if (gap > decisiveGap) mostDecisive = t;
    });
    return { mostContested, mostDecisive };
  }, [tally, votes.length]);

  const handleDownloadText = useCallback(() => {
    const lines: string[] = [];
    CATEGORIES.forEach(cat => {
      lines.push(`=== ${cat.emoji} ${cat.label} ===`);
      tally
        .filter(t => t.question.category === cat.id)
        .forEach(item => {
          const winner = item.scoreA >= item.scoreB ? item.question.options[0] : item.question.options[1];
          lines.push(`${winner.name}（${winner.zh}）| ${winner.price} | ${winner.address}`);
        });
      lines.push('');
    });
    lines.push('=== 餐厅人气排行 ===');
    restaurantRanking.forEach((r, i) => {
      lines.push(`${i + 1}. ${r.name}（${r.zh}）— ${r.score} 票`);
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jeju-final-itinerary.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [tally, restaurantRanking]);

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

      {/* 餐厅人气排行 */}
      {votes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <span>📊</span> 餐厅人气排行
          </h3>
          <div className="bg-white border-[1.5px] border-line rounded-2xl overflow-hidden shadow-lg">
            <div className="divide-y divide-line">
              {restaurantRanking.filter(r => r.score > 0).map((r, i) => (
                <div key={r.id} className="px-4 py-3 flex items-center gap-3">
                  <span className={`text-sm font-bold w-6 text-center ${i === 0 ? 'text-brand' : 'text-muted'}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text truncate">{r.name}</span>
                      <span className="text-[11px] text-muted truncate">{r.zh}</span>
                    </div>
                    <div className="mt-1 h-2 bg-[#f0e4db] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand to-brand2 rounded-full transition-all duration-500"
                        style={{ width: `${(r.score / maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${i === 0 ? 'text-brand' : 'text-text'}`}>{r.score}</span>
                  <span className="text-[11px] text-muted">票</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
  const aWins = item.scoreA > item.scoreB;
  const bWins = item.scoreB > item.scoreA;
  const tied = item.scoreA === item.scoreB && item.total > 0;
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
            {aWins && item.scoreA > 0 && <span className="text-base mt-0.5">🏆</span>}
            <div className="min-w-0">
              <div className="text-sm md:text-base font-bold text-text leading-tight">{optA.name}</div>
              <div className="text-[11px] text-muted truncate">{optA.zh}</div>
            </div>
          </div>
          <div className="text-[11px] text-muted mt-1">{optA.price}</div>

          {/* 得分 */}
          <div className="mt-2.5">
            <span className={`text-2xl font-bold ${aWins ? 'text-brand' : 'text-text'}`}>{item.scoreA}</span>
            <span className="text-xs text-muted ml-1">票</span>
          </div>

          {/* 直选投票者 */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.optA.voters.map(v => (
              <span key={v} className="text-[10px] px-1.5 py-0.5 bg-bg border border-line rounded-full text-muted">{v}</span>
            ))}
          </div>

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
            {bWins && item.scoreB > 0 && <span className="text-base mt-0.5">🏆</span>}
            <div className="min-w-0">
              <div className="text-sm md:text-base font-bold text-text leading-tight">{optB.name}</div>
              <div className="text-[11px] text-muted truncate">{optB.zh}</div>
            </div>
          </div>
          <div className="text-[11px] text-muted mt-1">{optB.price}</div>

          {/* 得分 */}
          <div className="mt-2.5">
            <span className={`text-2xl font-bold ${bWins ? 'text-brand' : 'text-text'}`}>{item.scoreB}</span>
            <span className="text-xs text-muted ml-1">票</span>
          </div>

          {/* 直选投票者 */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.optB.voters.map(v => (
              <span key={v} className="text-[10px] px-1.5 py-0.5 bg-bg border border-line rounded-full text-muted">{v}</span>
            ))}
          </div>

        </div>
      </div>

      {/* 底部："我都要" / "都不要" / 平局 */}
      {(item.bothVoters.length > 0 || item.neitherVoters.length > 0 || tied) && (
        <div className="px-4 py-2 border-t border-line bg-[#fdf7f3]">
          {item.bothVoters.length > 0 && (
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[11px] text-[#e8714a] font-semibold">❤️ 都要：</span>
              <div className="flex flex-wrap gap-1">
                {item.bothVoters.map(v => (
                  <span key={v} className="text-[10px] px-1.5 py-0.5 bg-[#fdf0eb] border border-[#f5d0c0] rounded-full text-[#c94a1e]">{v}</span>
                ))}
              </div>
            </div>
          )}
          {item.neitherVoters.length > 0 && (
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[11px] text-muted font-semibold">✗ 都不要：</span>
              <div className="flex flex-wrap gap-1">
                {item.neitherVoters.map(v => (
                  <span key={v} className="text-[10px] px-1.5 py-0.5 bg-bg border border-line rounded-full text-muted/70">{v}</span>
                ))}
              </div>
            </div>
          )}
          {tied && item.bothVoters.length === 0 && item.neitherVoters.length === 0 && (
            <div className="text-center text-xs text-muted">
              ⚖️ 平票！需要现场 PK
            </div>
          )}
        </div>
      )}
    </div>
  );
}
