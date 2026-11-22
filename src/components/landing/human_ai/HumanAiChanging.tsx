import React, { useState } from 'react';
import { Sparkles, Award, Shield, CheckCircle2, ArrowRight, User } from 'lucide-react';

interface HumanAiChangingProps {
  onNavigateApp?: () => void;
}

export const HumanAiChanging: React.FC<HumanAiChangingProps> = ({ onNavigateApp }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      titleEmerald: 'GenAI',
      titleRest: 'advances daily.',
      description: 'Ability to synthesize theorems and solve complex equations is evolving at a dizzying pace.',
    },
    {
      titleEmerald: 'GenAI',
      titleRest: 'is becoming a part of everything.',
      description: 'Smart spaced repetition, formula retention, and theorem synthesis replace brute-force rote study.',
    },
    {
      titleEmerald: 'GenAI',
      titleRest: 'will execute more mundane development tasks.',
      description: 'Students and engineers orchestrate the work of AI agents while focusing on higher-level problem solving.',
    },
  ];

  return (
    <section id="intelligence" className="w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-zinc-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-base sm:text-lg font-bold text-[#00ea64] block tracking-wide">
            AI Changing
          </span>
          <h2 className="mt-1 text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
            Software & Academic Development
          </h2>
        </div>

        {/* 2-Column Layout (Exact from Video Frames 5 & 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive 3-Step Accordion / Selector */}
          <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-50 border border-zinc-200/80 shadow-sm'
                      : 'opacity-50 hover:opacity-80 hover:bg-zinc-50/50'
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 leading-snug">
                    <span className="text-[#00ea64] font-extrabold">{tab.titleEmerald} </span>
                    <span>{tab.titleRest}</span>
                  </h3>
                  {isActive && (
                    <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed animate-in fade-in duration-200">
                      {tab.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Visual Canvas */}
          <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[500px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center justify-center p-4 sm:p-8">
            {/* Ambient Lighting */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-zinc-950 to-black pointer-events-none" 
              aria-hidden="true" 
            />

            {/* TAB 0 & 1 VISUAL: Profile & Achievement Card (Frame 5) */}
            {activeTab !== 2 && (
              <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
                <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800/90 backdrop-blur-xl p-6 shadow-2xl text-white">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 pb-5 border-b border-zinc-800">
                    <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#00ea64] to-emerald-700 p-0.5 shadow-md">
                      <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-white font-bold text-lg">
                        AC
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>Ada Chen</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-[#00ea64] border border-emerald-500/30">
                          Major
                        </span>
                      </h4>
                      <p className="text-xs text-zinc-400">Machine Learning & Math Engineer</p>
                    </div>
                  </div>

                  {/* Certifications Row */}
                  <div className="mt-5">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 block mb-3">
                      Certifications
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                        <span className="text-xs font-semibold text-zinc-200 block truncate">
                          Linear Algebra & Spaces
                        </span>
                        <div className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-[#00ea64]" />
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                        <span className="text-xs font-semibold text-zinc-200 block truncate">
                          Data Science & ML
                        </span>
                        <div className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-[#00ea64]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hexagonal Badges Row */}
                  <div className="mt-6">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 block mb-3">
                      Mastery Badges
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Kubernetes', sub: '★★★' },
                        { label: 'PyTorch', sub: '★★★' },
                        { label: 'Python 3', sub: '★★★' },
                      ].map((b, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950/90 border border-zinc-800 text-center"
                        >
                          <Shield className="w-5 h-5 text-[#00ea64] mb-1 stroke-[1.8]" />
                          <span className="text-[10px] font-bold text-zinc-200">{b.label}</span>
                          <span className="text-[9px] text-emerald-400 font-mono">{b.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2 VISUAL: Backlog -> AI Delegated Flow (Frame 7) */}
            {activeTab === 2 && (
              <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-300 flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Backlog Item Card */}
                <div className="w-full sm:w-56 p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 text-white shadow-xl">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-2">
                    Backlog
                  </span>
                  <p className="text-xs font-semibold text-zinc-200 leading-snug">
                    Solving TD 3 Series & Integral convergence bounds
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-[#00ea64] font-medium flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI Help
                    </span>
                    <span className="text-zinc-500">Maria P.</span>
                  </div>
                  <div className="mt-2 text-[10px] text-zinc-500 font-mono">
                    May 24 — July 1
                  </div>
                </div>

                {/* Arrow / Delegator Indicator */}
                <div className="flex flex-col items-center justify-center text-[#00ea64] shrink-0">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(0,234,100,0.3)]">
                    AI Delegated ⚡
                  </span>
                </div>

                {/* AI Delegated Item Card */}
                <div className="w-full sm:w-56 p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 text-white shadow-2xl relative">
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#00ea64] rounded-full animate-ping" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#00ea64] block mb-2">
                    In Autonomous Progress
                  </span>
                  <p className="text-xs font-semibold text-white leading-snug">
                    Automated room locators, formula fiches & DS countdowns
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-[#00ea64] text-black font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Active
                    </span>
                    <span className="text-zinc-400">Andreas H.</span>
                  </div>
                  <div className="mt-2 text-[10px] text-zinc-400 font-mono">
                    Auto-synced today
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
