'use client';

import { useState } from 'react';
import { IMAGES } from '@/data/images';

const heroPhotos = [
  { src: IMAGES.sukseongdo[0], name: 'Sukseongdo', desc: '熟成黑猪肉 · 新济州' },
  { src: IMAGES.delmoondo[0], name: 'Cafe Delmoondo', desc: '海景咖啡 · Hamdok' },
  { src: IMAGES.haenyeo[0], name: "Haenyeo's Kitchen", desc: '海女文化体验 · Bukchon' },
];

interface LandingProps {
  onStart: (name: string) => void;
  onViewResults: () => void;
}

export function Landing({ onStart, onViewResults }: LandingProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleStart = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    onStart(name.trim());
  };

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-12 md:py-14">
      {/* 顶部提示 */}
      <div className="mb-6 px-4 py-3.5 bg-gradient-to-r from-[#c94a1e]/10 to-[#e8714a]/10 border-[1.5px] border-[#e8714a]/30 rounded-xl text-center">
        <span className="text-sm font-semibold text-brand">👇 请拉到页面最下方，输入名字开始投票</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1.5 mb-10">
        <div className="text-xs font-bold tracking-widest uppercase text-brand">
          Jeju Food Trip · April 2025
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-text leading-tight">
          济州美食行程<br />投票问卷
        </h1>
        <p className="text-base text-muted max-w-[520px] mt-2">
          6 人同行 · 共 14 道题 · 每题可选 A / B / 都要 / 都不要
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-6 items-start">
        {/* 照片墙 */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
            {heroPhotos.map((photo, i) => (
              <figure
                key={i}
                className={`relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#ede3db] shadow-lg group ${i === 2 ? 'hidden md:block' : ''}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute left-0 right-0 bottom-0 px-3.5 pt-7 pb-3.5 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <span className="text-[13px] font-semibold">{photo.name}</span>
                  <span className="block text-[11px] opacity-80 mt-0.5">{photo.desc}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* 济州美食文化介绍 */}
          <div className="bg-white border-[1.5px] border-line rounded-[20px] p-5 shadow-md">
            <div className="text-xs font-bold tracking-widest uppercase text-brand mb-3">
              关于济州美食
            </div>
            <p className="text-[13px] text-[#5a504a] leading-relaxed mb-4">
              济州岛是韩国最大的火山岛，独特的地理环境孕育了与半岛本土截然不同的饮食文化。
              从海女潜水捕捞的鲍鱼到火山牧场放养的黑猪，从荞麦猪肉汤到汉拿峰柑橘，
              每一口都是这座岛屿的风土故事。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {[
                { emoji: '🍖', label: '黑猪肉', desc: '火山牧场放养' },
                { emoji: '🐚', label: '海鲜', desc: '鲍鱼·带鱼·玉鲷' },
                { emoji: '🍊', label: '柑橘', desc: '汉拿峰·橘子园' },
                { emoji: '🍜', label: '面食&汤', desc: '猪肉面·몸국' },
              ].map(item => (
                <div key={item.label} className="p-2.5 bg-[#fdf7f3] rounded-xl border border-[#f0ddd0] text-center">
                  <div className="text-lg mb-0.5">{item.emoji}</div>
                  <div className="text-xs font-bold text-text">{item.label}</div>
                  <div className="text-[10px] text-muted mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#fdf7f3] rounded-xl border border-[#f0ddd0]">
              <div className="text-[11px] font-bold text-brand mb-1">📋 投票规则</div>
              <div className="text-[12px] text-[#5a504a] leading-relaxed">
                14 道题分 4 个模块（正餐 · 济州海味 · 咖啡&下午茶 · 甜品&体验），
                每题可以选 A、选 B、<span className="text-[#e8714a] font-semibold">我都要</span>、
                或 <span className="text-muted font-semibold">都不要</span>。
                投完自动统计，得票最多的餐厅生成最终行程推荐。
              </div>
            </div>
          </div>
        </div>

        {/* 开始面板 */}
        <div className="bg-white border-[1.5px] border-line rounded-[20px] p-6 shadow-lg flex flex-col gap-5">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-brand mb-2">行程概览</div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: '日期', value: '4月4日 — 4月7日' },
                { label: '人数', value: '6 人同行' },
                { label: '基地', value: '济州市区' },
                { label: '题目', value: '14 道 · 四选一' },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-bg rounded-xl border border-line">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-brand mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-text">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-line" />

          <div>
            <h3 className="text-lg font-bold text-text mb-3">开始投票</h3>
            <div className="flex gap-2.5">
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="输入成员名字，例如：Gino"
                className={`flex-1 border-[1.5px] bg-bg rounded-xl px-3.5 py-3 text-sm outline-none text-text transition-colors
                  ${error ? 'border-brand' : 'border-line'} focus:border-brand2 focus:bg-white`}
              />
              <button
                onClick={handleStart}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-brand to-brand2 shadow-[0_6px_18px_rgba(201,74,30,.28)] hover:translate-y-[-1px] hover:shadow-[0_10px_24px_rgba(201,74,30,.36)] active:translate-y-0 transition-all"
              >
                开始
              </button>
            </div>
          </div>

          <div className="text-[12.5px] text-muted leading-relaxed p-3 bg-[#fdf7f3] rounded-[10px] border border-[#f0ddd0]">
            投票数据保存在云端，6 位成员可在各自手机上投票，结果自动累积统计。
          </div>

          <button
            onClick={onViewResults}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-white border-[1.5px] border-line text-muted hover:border-[#c8b0a0] hover:text-text transition-colors"
          >
            查看当前统计结果
          </button>
        </div>
      </div>
    </section>
  );
}
