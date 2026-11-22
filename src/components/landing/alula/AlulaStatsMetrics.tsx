import React from 'react';

export const AlulaStatsMetrics: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-8 bg-[#030306] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl border border-white/[0.08] bg-[#08080c]/80 p-8 sm:p-12 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="max-w-md">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
              Proven Academic Performance
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
              Built for students aiming for the top 5% of their class.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every detail is calibrated to eliminate hesitation, maintain continuous revision rhythm, and protect your grades.
            </p>
          </div>

          {/* Right Metrics Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10 w-full md:w-auto">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-1">
                500+
              </div>
              <div className="text-xs font-medium text-zinc-400">
                KaTeX Formulas Mastered
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight mb-1">
                98.4%
              </div>
              <div className="text-xs font-medium text-zinc-400">
                On-Time TD & DM Delivery
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono tracking-tight mb-1">
                4.9 / 5
              </div>
              <div className="text-xs font-medium text-zinc-400">
                Student Recommendation
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-pink-400 font-mono tracking-tight mb-1">
                0
              </div>
              <div className="text-xs font-medium text-zinc-400">
                Missed DS Exam Deadlines
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
