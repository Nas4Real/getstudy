import React from 'react';

interface NavbarProps {
  onNavigateApp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateApp }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between px-5 py-2.5 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl pointer-events-auto">
        {/* Brand Mark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-full border border-neutral-700 bg-gradient-to-b from-neutral-800 to-neutral-950 flex items-center justify-center shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3)] group-hover:border-cyan-500/50 transition-colors">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] group-hover:scale-125 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-white tracking-tight text-sm">
              GetStudy
            </span>
            <span className="text-[10px] font-mono font-medium text-cyan-400 tracking-wider">
              OS
            </span>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-xs font-medium text-neutral-400">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cockpit
          </a>
          <a
            href="#engines"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('engines');
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Capabilities
          </a>
        </nav>

        {/* Action Button */}
        <button
          type="button"
          onClick={onNavigateApp}
          className="relative group px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs font-medium text-white [background:linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(255,255,255,0.4)_100%)] border border-neutral-700 hover:border-cyan-500/50 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3)] transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
        >
          <span>Launch App</span>
          <span className="text-cyan-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </button>
      </div>
    </header>
  );
};
