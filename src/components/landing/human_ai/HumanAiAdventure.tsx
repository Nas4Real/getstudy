import React from 'react';
import { Plus, Check, Boxes, Terminal } from 'lucide-react';

interface HumanAiAdventureProps {
  onNavigateApp?: () => void;
}

export const HumanAiAdventure: React.FC<HumanAiAdventureProps> = ({ onNavigateApp }) => {
  return (
    <section id="adventures" className="w-full relative z-10 -mt-8 scroll-mt-24">
      {/* Massive Rounded White Sheet Transition Container from Video */}
      <div className="w-full bg-white rounded-t-[44px] sm:rounded-t-[64px] pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 shadow-[0_-20px_60px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
              Choose Your <span className="text-[#00ea64]">Adventure</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-500 leading-relaxed max-w-xl mx-auto">
              We build elite tech and academic tools for students and advance candidates' exam prospects.
            </p>
          </div>

          {/* Dual Split Dark Cards (Exact from Video Frame 3) */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Card: For Students */}
            <div className="group relative bg-[#0c0d0e] border border-zinc-800 rounded-3xl p-6 sm:p-9 text-white overflow-hidden shadow-2xl flex flex-col justify-between min-h-[440px] hover:border-zinc-700 transition-all duration-300">
              {/* Background ambient corner flare */}
              <div 
                className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" 
                aria-hidden="true" 
              />

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  For students
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
                  GetStudy helps you hone your problem-solving skills and become concours-ready.
                </p>

                {/* Bullet Points with Emerald Plus Markers */}
                <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#00ea64] font-bold shrink-0 mt-0.5">+</span>
                    <span>Track your syllabus & formula proficiency</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#00ea64] font-bold shrink-0 mt-0.5">+</span>
                    <span>Prepare for technical interviews, written DS & oral Colles</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#00ea64] font-bold shrink-0 mt-0.5">+</span>
                    <span>Learn the latest high-yield problem solving patterns</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Row: CTA + Embedded Code/Formula Card */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={onNavigateApp}
                  className="px-5 py-3 rounded-xl bg-[#00ea64] hover:bg-[#05f06a] text-black font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,234,100,0.3)] transition-all cursor-pointer w-fit transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Student Workspace
                </button>

                {/* Micro IDE Card Graphic (from video) */}
                <div className="w-full sm:w-56 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono shrink-0 shadow-lg select-none">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-sans">Python / Math</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-zinc-200 font-semibold">Théorème du rang</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-[#00ea64] font-sans font-medium flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> AI
                    </span>
                  </div>
                  <div className="mt-2 text-zinc-400 bg-black/60 p-2 rounded text-[10px] overflow-hidden text-ellipsis whitespace-nowrap">
                    dim(E) = dim(ker f) + dim(Im f)
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: For Institutions */}
            <div className="group relative bg-[#0c0d0e] border border-zinc-800 rounded-3xl p-6 sm:p-9 text-white overflow-hidden shadow-2xl flex flex-col justify-between min-h-[440px] hover:border-zinc-700 transition-all duration-300">
              {/* Background ambient corner flare */}
              <div 
                className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" 
                aria-hidden="true" 
              />

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  For institutions
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
                  Get your prep cohort or university department concours-ready.
                </p>

                {/* Bullet Points with Emerald Plus Markers */}
                <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#00ea64] font-bold shrink-0 mt-0.5">+</span>
                    <span>Attract and train the most ambitious candidates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#00ea64] font-bold shrink-0 mt-0.5">+</span>
                    <span>Upskill your cohort with smart problem solving</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#00ea64] font-bold shrink-0 mt-0.5">+</span>
                    <span>Build out your AI and academic evaluation platform</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Row: CTA + Isometric 3D Graphic */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={onNavigateApp}
                  className="px-5 py-3 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-white font-medium text-xs sm:text-sm border border-zinc-700 transition-all cursor-pointer w-fit"
                >
                  Explore Institution Platform
                </button>

                {/* Isometric Cube + GenAI Badge Graphic (from video) */}
                <div className="w-full sm:w-56 h-24 rounded-xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/80 shrink-0 shadow-lg relative flex items-center justify-center overflow-hidden">
                  {/* Isometric wireframe lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 100">
                    <path d="M100 20 L160 50 L100 80 L40 50 Z" fill="none" stroke="#00ea64" strokeWidth="1" />
                    <path d="M100 80 L100 95 M160 50 L160 65 M40 50 L40 65" fill="none" stroke="#00ea64" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                  
                  {/* Floating GenAI Emerald Badge */}
                  <div className="relative px-3.5 py-1.5 rounded-lg bg-[#00ea64] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,234,100,0.6)] flex items-center gap-1.5">
                    <Boxes className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>GenAI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
