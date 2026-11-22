import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HumanAiNavbarProps {
  onNavigateApp?: () => void;
}

export const HumanAiNavbar: React.FC<HumanAiNavbarProps> = ({ onNavigateApp }) => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-850/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a
            href="#hero"
            className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            <span>GetStudy</span>
            <span className="w-2.5 h-2.5 bg-[#00ea64] rounded-xs shadow-[0_0_8px_rgba(0,234,100,0.8)]" />
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400 font-medium">
            <a href="#adventures" className="hover:text-white transition-colors duration-200">
              Adventures
            </a>
            <a href="#intelligence" className="hover:text-white transition-colors duration-200">
              Intelligence
            </a>
            <a href="#curriculum" className="hover:text-white transition-colors duration-200">
              Curriculum
            </a>
            <a href="#analytics" className="hover:text-white transition-colors duration-200">
              Analytics
            </a>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#adventures"
            className="hidden sm:inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>For Prépa</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <button
            type="button"
            onClick={onNavigateApp}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 transition-all cursor-pointer"
          >
            Request Demo
          </button>

          <button
            type="button"
            onClick={onNavigateApp}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-black bg-[#00ea64] hover:bg-[#05f06a] shadow-[0_0_24px_rgba(0,234,100,0.4)] transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Launch App
          </button>
        </div>
      </div>
    </header>
  );
};
