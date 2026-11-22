import React from 'react';
import { LatexMath } from '../../common/LatexMath';

export const AlulaPillars: React.FC = () => {
  return (
    <section id="pillars" className="relative w-full py-20 px-4 sm:px-8 bg-[#030305] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14 text-left">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
            Core Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Built strictly for the reality of STEM students.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            No bloated project management templates. Just the three daily instruments you need to stay ahead of your coursework.
          </p>
        </div>

        {/* 3 Academic Engines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Engine 1: Timetable & Classes */}
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-5">
                <iconify-icon icon="lucide:calendar-clock" width="18" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Timetable & Session Timeline
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Instant room locator, professor metadata, and daily progress rail. Import a whole semester schedule via 1-click JSON.
              </p>
            </div>

            {/* UI Chip */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">09:00 – 10:30</span>
              <span className="text-white font-semibold">Room 27 • Analyse</span>
            </div>
          </div>

          {/* Engine 2: Continuous Assessment (DS & Colles) */}
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-5">
                <iconify-icon icon="lucide:shield-alert" width="18" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Exam & DS Countdown
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Native countdowns for written DS, oral Colles, and problem sets weighted by real academic coefficients (Coeff 4, Coeff 6).
              </p>
            </div>

            {/* UI Chip */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">DS 3 : Algèbre</span>
              <span className="text-rose-400 font-semibold">In 2 days • Coeff 4</span>
            </div>
          </div>

          {/* Engine 3: Active Recall & LaTeX */}
          <div className="p-6 rounded-2xl bg-[#09090c] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-5">
                <iconify-icon icon="lucide:sparkles" width="18" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Active Recall & KaTeX
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Native LaTeX mathematical equation rendering across spaced-repetition flashcards and chapter syllabus checklists.
              </p>
            </div>

            {/* UI Chip with real KaTeX */}
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center text-xs text-zinc-200">
              <LatexMath math="\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
