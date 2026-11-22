import React, { useState } from 'react';
import { VerifyEmailTemplate } from './VerifyEmailTemplate';
import { ResetPasswordTemplate } from './ResetPasswordTemplate';

export const EmailPreviewView: React.FC = () => {
  const parseTabFromUrl = (): 'verify' | 'reset' => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const t = (p.get('tab') || p.get('email') || '').toLowerCase();
      if (t === 'reset' || t === 'password' || t === 'forgot') return 'reset';
    }
    return 'verify';
  };

  const [tab, setTab] = useState<'verify' | 'reset'>(parseTabFromUrl);

  const switchTab = (newTab: 'verify' | 'reset') => {
    setTab(newTab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'emails');
      url.searchParams.set('tab', newTab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-8 items-center bg-panel">
      <div className="flex items-center gap-2 mb-8 bg-cardBg border border-borderPanel p-1 rounded-2xl shadow-sm">
        <button
          onClick={() => switchTab('verify')}
          className={`px-5 py-2.5 rounded-xl text-[13.5px] sm:text-[14px] font-bold transition-all cursor-pointer ${
            tab === 'verify' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Verify Email Template
        </button>
        <button
          onClick={() => switchTab('reset')}
          className={`px-5 py-2.5 rounded-xl text-[13.5px] sm:text-[14px] font-bold transition-all cursor-pointer ${
            tab === 'reset' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Password Reset Template
        </button>
      </div>

      <div className="w-full flex justify-center pb-12">
        {tab === 'verify' ? <VerifyEmailTemplate /> : <ResetPasswordTemplate />}
      </div>
    </div>
  );
};
