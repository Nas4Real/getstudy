import React from 'react';

export const AlulaFooter: React.FC = React.memo(() => {
  return (
    <footer
      className="w-full border-t border-zinc-800/80 bg-[#050507] py-10 px-6 sm:px-10 text-xs text-zinc-400"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 120px' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-white text-black flex items-center justify-center font-black text-xs">
            G
          </div>
          <span className="font-bold text-white text-sm tracking-tight">GetStudy OS</span>
          <span className="text-[11px] font-mono text-zinc-500">v2.4 Production</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-zinc-400 text-sm font-medium">
          <a href="#workflow" className="hover:text-white transition-colors">Organize</a>
          <a href="#cockpit" className="hover:text-white transition-colors">AI Assistant</a>
          <a href="#cockpit" className="hover:text-white transition-colors">Second Brain</a>
          <a href="#overview" className="hover:text-white transition-colors">Overview</a>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>All Engines Operational</span>
        </div>
      </div>
    </footer>
  );
});
