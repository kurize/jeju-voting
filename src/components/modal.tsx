'use client';

import { useEffect, useRef } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void; // 不传 = alert 模式（仅确定按钮）
}

export function Modal({ open, title, message, confirmText = '确定', cancelText = '取消', onConfirm, onCancel }: ModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 animate-fade-in">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/40" onClick={onCancel || onConfirm} />
      {/* 弹窗 */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[320px] overflow-hidden animate-slide-up">
        <div className="px-6 pt-6 pb-4 text-center">
          <h3 className="text-base font-bold text-text mb-1">{title}</h3>
          {message && <p className="text-sm text-muted leading-relaxed">{message}</p>}
        </div>
        <div className={`flex border-t border-line ${onCancel ? '' : 'justify-center'}`}>
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 py-3.5 text-sm font-semibold text-muted hover:bg-bg transition-colors border-r border-line"
            >
              {cancelText}
            </button>
          )}
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="flex-1 py-3.5 text-sm font-bold text-brand hover:bg-[#fff5f3] transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
