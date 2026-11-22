import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`session-toast fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] max-w-[calc(100vw-2rem)] w-max flex items-center gap-2.5 rounded-xl border border-[#303034] bg-[#101012] px-4 py-3 text-zinc-100 shadow-2xl ${
        message ? 'is-visible' : ''
      }`}
    >
      <iconify-icon icon="lucide:check-circle" width="18" className="text-green-400" />
      <span className="text-[13px] font-medium">{message || ''}</span>
    </div>
  );
};
