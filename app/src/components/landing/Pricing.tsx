import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface PricingProps {
  onNavigateApp?: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onNavigateApp, onOpenAuth }) => {
  const handleAction = () => {
    if (onOpenAuth) {
      onOpenAuth('signup');
    } else if (onNavigateApp) {
      onNavigateApp();
    }
  };

  return (
    <section
      id="pricing"
      className="relative w-full py-28 px-6 sm:px-10 bg-[#070709] border-t border-zinc-800/80 select-none overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono font-medium text-zinc-300 mb-4">
            <span className="text-[#facc15]">✦</span>
            <span>Transparent Academic Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Invest in your academic trajectory.
          </h2>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            No predatory subscriptions. Transparent student pricing designed for ambitious minds tackling intense STEM coursework and competitive exams.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Student Free */}
          <div className="rounded-3xl bg-[#0c0c0f] border border-zinc-800 hover:border-zinc-700 p-8 flex flex-col justify-between transition-all duration-200">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Student Free</h3>
              <p className="text-xs text-zinc-400 mb-6">Essential Solo Toolkit</p>

              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="text-4xl md:text-5xl font-extrabold text-white font-jakarta">
                  $0
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  / forever
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Full Timetable & Calendar Engine</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Course & Tutorial (TD) Task Manager</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Local KaTeX Flashcards SRS</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>DS Exam Countdown Clocks</span>
                </li>
                <li className="flex items-center gap-2.5 text-zinc-400">
                  <span className="text-zinc-400 font-mono text-sm w-4 text-center shrink-0">✕</span>
                  <span>Autonomous AI Calendar Hooks</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleAction}
              className="w-full py-3.5 rounded-full text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all cursor-pointer active:scale-95"
            >
              Start Free Now
            </button>
          </div>

          {/* Tier 2: Scholar Pro (Recommended) */}
          <div className="rounded-3xl bg-[#0f0f13] border-2 border-[#facc15]/60 hover:border-[#facc15] p-8 flex flex-col justify-between relative shadow-[0_0_40px_rgba(250,204,21,0.1)] transition-all duration-200">
            {/* Top Pill Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#facc15] text-zinc-950 font-mono text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <span>✦</span>
              <span>Most Popular for Exam Prep</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Scholar Pro</h3>
              <p className="text-xs text-[#facc15] mb-6 font-mono font-medium">Full Cognitive OS</p>

              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="text-4xl md:text-5xl font-extrabold text-white font-jakarta">
                  $19
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  / semester pass
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-zinc-200">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Everything in Student Free</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span className="font-semibold text-white">Autonomous AI Co-pilot with Calendar Hooks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Unlimited Formula & Theorem Extraction</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Leitner Spaced Repetition Analytics</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Priority Cloud Backup & Sync</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleAction}
              className="w-full py-3.5 rounded-full text-xs font-bold text-zinc-950 bg-[#facc15] hover:bg-yellow-300 transition-all cursor-pointer shadow-[0_2px_12px_rgba(250,204,21,0.25)] flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Claim Scholar Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tier 3: Campus Lifetime */}
          <div className="rounded-3xl bg-[#0c0c0f] border border-zinc-800 hover:border-zinc-700 p-8 flex flex-col justify-between transition-all duration-200">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Campus Lifetime</h3>
              <p className="text-xs text-zinc-400 mb-6">Complete Engineering License</p>

              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="text-4xl md:text-5xl font-extrabold text-white font-jakarta">
                  $49
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  / one-time investment
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Everything in Scholar Pro Lifetime</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Archived DS & Exam Preparation Vault</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Export Revision Schedules to CalDAV & PDF</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Multi-device Infinite Storage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Priority Developer Hotline</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleAction}
              className="w-full py-3.5 rounded-full text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all cursor-pointer active:scale-95"
            >
              Get Lifetime License
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
