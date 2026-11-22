import React from 'react';

interface AlulaFeaturesProps {
  onNavigateApp?: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const AlulaFeatures: React.FC<AlulaFeaturesProps> = React.memo(() => {
  return (
    <section
      id="features"
      className="relative w-full py-28 px-6 sm:px-10 bg-[#000000] border-t border-white/[0.04] select-none overflow-hidden scroll-mt-28"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 850px' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5 text-balance font-jakarta">
            Everything you need to study with{' '}
            <span className="font-serif italic font-normal text-[#facc15]">clarity.</span>
          </h2>
          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed font-sans">
            Three focused engines built for demanding academic programs. No setup friction, no unnecessary complexity.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CARDS GRID: Pure Title, Oversized Typography, No Footer (Clean Finish)     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Pillar 1: Precision Time-Block Core */}
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06] hover:border-white/[0.12] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            {/* Giant Background Numeral */}
            <div className="absolute top-6 right-8 text-7xl sm:text-8xl font-extrabold text-white/[0.04] tracking-tighter select-none font-jakarta pointer-events-none group-hover:text-white/[0.07] transition-colors">
              01
            </div>

            <div className="relative z-10 flex-1 flex flex-col pt-2">
              <h3 className="text-3xl sm:text-[36px] font-extrabold text-white mb-3 tracking-tight font-jakarta leading-[1.08]">
                Precision <span className="whitespace-nowrap">Time-Block</span> Core
              </h3>

              <p className="text-lg sm:text-[19px] text-zinc-300 mb-8 leading-snug font-sans">
                Automated study blocks with built-in rest buffers.
              </p>

              {/* Numbered Capability Rows */}
              <div className="space-y-6 pt-8 border-t border-white/[0.06] mt-auto">
                <div className="flex items-start gap-4 pb-6 border-b border-white/[0.04]">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">01</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Conflict Detection</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Alerts you instantly if a lecture, exam, or study block clashes.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-white/[0.04]">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">02</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Smart Rest Buffers</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Adds automatic breaks after intense lectures to keep you focused.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">03</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Two-Way Calendar Sync</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Syncs your schedule in real time across Google Calendar, Apple, and Outlook.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Problem-Sheet Execution Ledger */}
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06] hover:border-white/[0.12] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            {/* Giant Background Numeral */}
            <div className="absolute top-6 right-8 text-7xl sm:text-8xl font-extrabold text-white/[0.04] tracking-tighter select-none font-jakarta pointer-events-none group-hover:text-white/[0.07] transition-colors">
              02
            </div>

            <div className="relative z-10 flex-1 flex flex-col pt-2">
              <h3 className="text-3xl sm:text-[36px] font-extrabold text-white mb-3 tracking-tight font-jakarta leading-[1.08]">
                <span className="whitespace-nowrap">Problem-Sheet</span> Execution Ledger
              </h3>

              <p className="text-lg sm:text-[19px] text-zinc-300 mb-8 leading-snug font-sans">
                Every tutorial problem paired with its worked solution.
              </p>

              {/* Numbered Capability Rows */}
              <div className="space-y-6 pt-8 border-t border-white/[0.06] mt-auto">
                <div className="flex items-start gap-4 pb-6 border-b border-white/[0.04]">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">01</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Exercise Status</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Tag every tutorial problem as Solved, In Review, or Mastered.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-white/[0.04]">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">02</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Pinned Corrections</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Official worked solutions pinned directly next to each exercise.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">03</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Exam Revision Queue</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Automatically gathers tricky questions into a final revision sheet.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Curriculum Mastery Index */}
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06] hover:border-white/[0.12] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            {/* Giant Background Numeral */}
            <div className="absolute top-6 right-8 text-7xl sm:text-8xl font-extrabold text-white/[0.04] tracking-tighter select-none font-jakarta pointer-events-none group-hover:text-white/[0.07] transition-colors">
              03
            </div>

            <div className="relative z-10 flex-1 flex flex-col pt-2">
              <h3 className="text-3xl sm:text-[36px] font-extrabold text-white mb-3 tracking-tight font-jakarta leading-[1.08]">
                Curriculum Mastery Index
              </h3>

              <p className="text-lg sm:text-[19px] text-zinc-300 mb-8 leading-snug font-sans">
                Track syllabus coverage and countdowns for every exam.
              </p>

              {/* Numbered Capability Rows */}
              <div className="space-y-6 pt-8 border-t border-white/[0.06] mt-auto">
                <div className="flex items-start gap-4 pb-6 border-b border-white/[0.04]">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">01</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Live Exam Countdowns</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Real-time countdowns and daily chapter targets for every exam.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-white/[0.04]">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">02</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Chapter Checklists</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Check off syllabus chapters as you master them across every subject.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-base font-mono text-zinc-400 pt-0.5 shrink-0 font-semibold">03</span>
                  <div>
                    <div className="text-lg sm:text-[19px] font-bold text-white tracking-tight">Spaced Review Alerts</div>
                    <div className="text-base sm:text-[16px] text-zinc-300 mt-1.5 leading-relaxed">
                      Smart review reminders for older formulas so they stay fresh for finals.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AlulaFeatures.displayName = 'AlulaFeatures';
export default AlulaFeatures;
