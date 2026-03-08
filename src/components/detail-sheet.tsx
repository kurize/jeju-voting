'use client';

import { useState, useCallback, useEffect } from 'react';
import { IMAGES } from '@/data/images';
import type { QuestionOption } from '@/data/questions';
import { MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DetailSheetProps {
  option: QuestionOption | null;
  open: boolean;
  onClose: () => void;
}

export function DetailSheet({ option, open, onClose }: DetailSheetProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // 打开新选项时重置轮播
  useEffect(() => {
    if (open) setSlideIndex(0);
  }, [open, option?.id]);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || !option) return null;

  const images = IMAGES[option.id] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />

      {/* 面板 */}
      <div
        className="relative bg-white rounded-t-2xl w-full max-w-[500px] max-h-[80dvh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶栏 */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-5 pt-4 pb-2 flex items-center justify-between">
          <div className="w-10 h-1 bg-line rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <div />
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-bg flex items-center justify-center hover:bg-line transition-colors">
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>

        <div className="px-5 pb-6">
          {/* 图片轮播 */}
          {images.length > 0 && (
            <ImageCarousel images={images} slideIndex={slideIndex} setSlideIndex={setSlideIndex} name={option.name} />
          )}

          {/* 餐厅信息 */}
          <h3 className="text-xl font-bold text-text mt-4">{option.name}</h3>
          <div className="text-sm text-muted">{option.zh}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-brand">{option.price}</span>
            <span className="text-muted">·</span>
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <MapPin className="w-3 h-3" /> {option.area}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {option.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-[#f5ede8] border border-[#ead8ce] rounded-full text-[#7a5040]">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#5a504a] leading-relaxed mt-3">{option.desc}</p>

          <a
            href={option.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full py-3 rounded-xl text-sm font-semibold bg-bg border border-line text-text flex items-center justify-center gap-1.5 hover:border-brand2 transition-colors"
          >
            <MapPin className="w-4 h-4" /> 在地图中查看
          </a>
        </div>
      </div>
    </div>
  );
}

// 图片轮播子组件
function ImageCarousel({ images, slideIndex, setSlideIndex, name }: {
  images: string[];
  slideIndex: number;
  setSlideIndex: (i: number) => void;
  name: string;
}) {
  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((slideIndex - 1 + images.length) % images.length);
  }, [slideIndex, images.length, setSlideIndex]);

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((slideIndex + 1) % images.length);
  }, [slideIndex, images.length, setSlideIndex]);

  return (
    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#ede3db] group">
      <div
        className="flex w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSlideIndex(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === slideIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
