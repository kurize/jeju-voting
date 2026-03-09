'use client';

import { useState, useCallback } from 'react';
import { IMAGES } from '@/data/images';
import type { QuestionOption, SelectionState } from '@/data/questions';
import { MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface CardProps {
  option: QuestionOption;
  selectionState: SelectionState;
  onSelect: () => void;
}

export function Card({ option, selectionState, onSelect }: CardProps) {
  const selected = selectionState === 'selected';
  const images = IMAGES[option.id] || [];
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const nextSlide = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex(idx);
  }, []);

  return (
    <article
      onClick={onSelect}
      className={`border-2 rounded-[18px] overflow-hidden bg-card shadow-[0_8px_32px_rgba(60,30,10,.09)] cursor-pointer transition-all duration-200
        hover:shadow-[0_16px_48px_rgba(60,30,10,.16)] hover:translate-y-[-2px] hover:border-[#d4b8a8]
        ${selectionState === 'selected' ? 'border-brand shadow-[0_0_0_3px_rgba(201,74,30,.14),0_16px_48px_rgba(60,30,10,.16)]'
          : selectionState === 'both' ? 'border-[#e8714a]/40 shadow-[0_0_0_3px_rgba(232,113,74,.08)]'
          : selectionState === 'dimmed' ? 'border-line opacity-50 grayscale-[30%]'
          : 'border-line'}`}
    >
      {/* 图片轮播 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#ede3db] group">
        {images.length > 0 ? (
          <>
            <div
              className="flex w-full h-full transition-transform duration-350 ease-out"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {images.map((src, i) => (
                <div key={i} className="flex-shrink-0 w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${option.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <>
                <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text opacity-0 group-hover:opacity-100 transition-opacity z-[2]">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text opacity-0 group-hover:opacity-100 transition-opacity z-[2]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => goToSlide(i, e)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === slideIndex ? 'bg-white scale-130' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#f0e0d4] to-[#d4b8a8] flex items-center justify-center">
            <span className="text-5xl opacity-50">🍽️</span>
          </div>
        )}

        {/* 标签 */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-white/70 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#6a4030] z-[2]">
          {option.zh}
        </div>

        {/* 选中标记 */}
        {selectionState === 'selected' && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center z-[2] transition-all opacity-100 scale-100">
            <Check className="w-3.5 h-3.5" />
          </div>
        )}
        {selectionState === 'both' && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#e8714a]/80 text-white flex items-center justify-center z-[2] text-sm">
            ❤️
          </div>
        )}
      </div>

      {/* 卡片内容 */}
      <div className="p-4 pb-3.5">
        <div className="flex justify-between items-start gap-2.5 mb-1.5">
          <div>
            <div className="text-xl font-bold text-text">{option.name}</div>
            <div className="text-[13px] text-muted">{option.zh}</div>
          </div>
          <div className="whitespace-nowrap text-xs font-bold text-brand bg-[#fdf0eb] border border-[#f5d0c0] px-2.5 py-1.5 rounded-full">
            {option.price}
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-xs text-muted bg-bg border border-line px-2.5 py-1 rounded-full mb-2.5">
          <MapPin className="w-3 h-3" /> {option.area}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {option.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-1 bg-[#f5ede8] border border-[#ead8ce] rounded-full text-[#7a5040]">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[13px] text-[#5a504a] leading-relaxed mb-3.5">{option.desc}</p>

        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className={`flex-1 py-2.5 px-3.5 rounded-[10px] text-[13px] font-semibold transition-all
              ${selected || selectionState === 'both'
                ? 'bg-gradient-to-br from-brand to-brand2 text-white border-transparent'
                : 'bg-bg border-[1.5px] border-line text-text hover:border-brand2 hover:text-brand'}`}
          >
            {selected ? '✓ 已选择' : selectionState === 'both' ? '❤️ 都要' : '投这一票'}
          </button>
          <a
            href={option.apple}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="py-2.5 px-3.5 rounded-[10px] text-[13px] font-semibold border-[1.5px] border-line bg-white text-muted hover:border-[#c8b0a0] hover:text-text transition-all whitespace-nowrap inline-flex items-center gap-1.5"
          >
            <MapPin className="w-3 h-3" /> 地图
          </a>
        </div>
      </div>
    </article>
  );
}
