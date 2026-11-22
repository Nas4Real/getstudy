import React from 'react';

export const AlulaTrustBar: React.FC = () => {
  return (
    <section className="relative w-full border-y border-white/[0.08] bg-[#07070a] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Label */}
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 text-center md:text-left shrink-0">
          Tailored For Rigorous Paths
        </div>

        {/* 4 Academic Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 w-full md:w-auto">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-white text-sm font-bold tracking-tight flex items-center gap-1.5">
              <span className="text-cyan-400">⚡</span>
              <span>Classes Préparatoires</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 mt-0.5">MPSI • PCSI • PSI • MP</div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="text-white text-sm font-bold tracking-tight flex items-center gap-1.5">
              <span className="text-indigo-400">🏛</span>
              <span>Grandes Écoles</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 mt-0.5">Polytechnique • Mines • Centrale</div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="text-white text-sm font-bold tracking-tight flex items-center gap-1.5">
              <span className="text-emerald-400">🔬</span>
              <span>STEM Faculties</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 mt-0.5">Maths • Physique • Informatique</div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="text-white text-sm font-bold tracking-tight flex items-center gap-1.5">
              <span className="text-pink-400">🎓</span>
              <span>Bac Scientifique</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 mt-0.5">Mention Très Bien Track</div>
          </div>
        </div>
      </div>
    </section>
  );
};
