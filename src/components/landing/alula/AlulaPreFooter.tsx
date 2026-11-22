import React from 'react';

interface AlulaPreFooterProps {
  onNavigateApp?: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const AlulaPreFooter: React.FC<AlulaPreFooterProps> = React.memo(({ onNavigateApp, onOpenAuth }) => {
  return (
    <section
      id="overview"
      className="relative w-full py-28 px-6 sm:px-10 bg-[#050507] border-t border-zinc-800/80"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 550px' }}
    >
      <div className="max-w-5xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 sm:p-16 text-center shadow-2xl">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 max-w-3xl mx-auto">
          Build your second brain with structured clarity.
        </h2>

        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 text-balance">
          Designed for ambitious knowledge workers, engineers, and learners who demand effortless organization, instant AI assistance, and long-term memory.
        </p>

        <button
          type="button"
          onClick={onOpenAuth ? () => onOpenAuth('signup') : onNavigateApp}
          className="px-9 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-sm font-bold shadow-md active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2 mb-14"
        >
          <span>Launch GetStudy OS</span>
          <span className="text-sm">→</span>
        </button>

        {/* 3 Refined Value Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-zinc-800 text-center">
          <div className="p-3">
            <div className="text-3xl font-extrabold text-white font-mono mb-1">100% In Sync</div>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Smart Calendar & Tasks</p>
          </div>
          <div className="p-3">
            <div className="text-3xl font-extrabold text-white font-mono mb-1">Zero Friction</div>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Contextual AI Assistant</p>
          </div>
          <div className="p-3">
            <div className="text-3xl font-extrabold text-white font-mono mb-1">Permanent Recall</div>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Second Brain & Flashcards</p>
          </div>
        </div>
      </div>
    </section>
  );
});
