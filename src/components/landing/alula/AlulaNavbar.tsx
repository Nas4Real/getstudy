import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AlulaNavbarProps {
  onNavigateApp?: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const AlulaNavbar: React.FC<AlulaNavbarProps> = React.memo(({ onNavigateApp, onOpenAuth }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NAV_ITEMS = [
    { id: 'features', label: 'Features' },
    { id: 'ai-copilot', label: 'AI Copilot' },
    { id: 'second-brain', label: 'Second Brain' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-20 bg-[#050507]/85 backdrop-blur-md border-b border-white/[0.08] select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.6)] transform-gpu will-change-[transform,opacity]">
      {/* Specular Top Rim Reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Mark with Restored Golden Star */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <span className="text-white text-xl sm:text-2xl font-extrabold tracking-tight group-hover:text-zinc-100 transition-colors">
            GetStudy
          </span>
          <span className="text-amber-400 text-base sm:text-lg font-serif select-none drop-shadow-[0_0_10px_rgba(251,191,36,0.6)] group-hover:rotate-12 transition-transform duration-200">
            ✦
          </span>
        </a>

        {/* Clean & Elegant Navigation Links with Pure Glow Hover Effect */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm sm:text-base font-medium">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="group relative px-3 py-2 text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer text-sm sm:text-base font-medium tracking-normal"
            >
              <span className="relative z-10 inline-block transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.55)]">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Actions - Minimalist Unified Dual Capsule (Log In + Sign Up) */}
        <div className="flex items-center">
          <div className="flex items-center p-1 rounded-full bg-white/[0.04]">
            <button
              type="button"
              onClick={onOpenAuth ? () => onOpenAuth('signin') : onNavigateApp}
              className="px-4 sm:px-4.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={onOpenAuth ? () => onOpenAuth('signup') : onNavigateApp}
              className="group h-9 sm:h-9.5 px-5 sm:px-5.5 rounded-full bg-white hover:bg-zinc-200/90 text-zinc-950 text-xs sm:text-sm font-semibold shadow-sm transition-colors duration-150 cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] text-zinc-950 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

export default AlulaNavbar;
