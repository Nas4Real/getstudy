import React from 'react';

interface CTAProps {
  onNavigateApp?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onNavigateApp }) => {
  return (
    <section className="relative w-full max-w-5xl mx-auto py-16 md:py-24 px-4 sm:px-6 bg-black overflow-hidden flex items-center justify-center">
      {/* Radial Center Glow */}
      <div
        className="absolute w-[500px] h-[250px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #ec4899 50%, transparent 80%)',
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />

      {/* Cyber Chamfered Container */}
      <div className="relative z-10 w-full p-8 sm:p-12 md:p-16 rounded-3xl bg-neutral-950/80 border border-neutral-800 shadow-2xl text-center flex flex-col items-center">
        {/* Animated Cyber Laser Line Left & Right */}
        <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none opacity-30">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path
              d="M0 0 H60 L100 40 V100"
              stroke="url(#laser-gradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="laser-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none opacity-30 rotate-180">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path
              d="M0 0 H60 L100 40 V100"
              stroke="url(#laser-gradient-2)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="laser-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Small Eyebrow */}
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 mb-3">
          Academic Command Center
        </span>

        {/* Big Heading with Metallic Gradient */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-xl leading-[1.15]">
          <span className="bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
            Master your STEM curriculum with zero distraction.
          </span>
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mb-8 leading-relaxed">
          Consolidate class schedules, DS countdowns, and formula flashcards in one place.
          Free forever for solo revision.
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={onNavigateApp}
          className="group relative px-8 py-3.5 rounded-full text-sm font-semibold text-white [background:linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(6,182,212,0.6)_100%)] border border-cyan-500/60 hover:border-cyan-400 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.35),0_10px_35px_rgba(6,182,212,0.2)] transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <span>Launch GetStudy OS</span>
          <span className="text-cyan-400 transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </section>
  );
};
