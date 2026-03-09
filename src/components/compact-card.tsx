'use client';

import { IMAGES } from '@/data/images';
import type { QuestionOption, SelectionState } from '@/data/questions';
import { Check } from 'lucide-react';

interface CompactCardProps {
  option: QuestionOption;
  selectionState: SelectionState;
  onSelect: () => void;
  onExpand: () => void;
}

export function CompactCard({ option, selectionState, onSelect, onExpand }: CompactCardProps) {
  const images = IMAGES[option.id] || [];
  const firstImage = images[0];

  const borderClass = {
    selected: 'border-brand shadow-[0_0_0_3px_rgba(201,74,30,.14)]',
    both: 'border-[#e8714a]/40 shadow-[0_0_0_3px_rgba(232,113,74,.08)]',
    dimmed: 'border-line opacity-50 grayscale-[30%]',
    none: 'border-line hover:border-[#d4b8a8]',
  }[selectionState];

  return (
    <article
      onClick={onSelect}
      className={`relative border-2 rounded-2xl overflow-hidden bg-card cursor-pointer transition-all duration-200
        active:scale-[0.97] ${borderClass}`}
    >
      {/* 正方形图片 */}
      <div className="relative aspect-square overflow-hidden bg-[#ede3db]">
        {firstImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={firstImage} alt={option.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl opacity-50">🍽️</div>
        )}
        {/* 选中标记 */}
        {selectionState === 'selected' && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center transition-all opacity-100 scale-100">
            <Check className="w-3 h-3" />
          </div>
        )}
        {selectionState === 'both' && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#e8714a]/80 text-white flex items-center justify-center text-xs">
            ❤️
          </div>
        )}
      </div>

      {/* 文字内容 */}
      <div className="p-2.5">
        <div className="text-sm font-bold text-text leading-tight truncate">{option.name}</div>
        <div className="text-xs text-muted mt-0.5 truncate">{option.zh}</div>
        <div className="text-xs font-semibold text-brand mt-1">{option.price}</div>
        <button
          onClick={(e) => { e.stopPropagation(); onExpand(); }}
          className="mt-1.5 text-[11px] text-muted underline underline-offset-2 hover:text-brand transition-colors"
        >
          详情 & 地图
        </button>
      </div>
    </article>
  );
}
