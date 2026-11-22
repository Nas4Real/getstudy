import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlulaHeroProps {
  onNavigateApp?: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

const ROTATING_WORDS = ['mind', 'studies', 'memory', 'focus', 'education'];

const RotatingHeroWord: React.FC = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative inline-flex items-baseline justify-start text-left h-[1.16em] w-[2.8em] leading-[1.04] align-baseline"
      style={{ clipPath: 'inset(-10% -1000px -10% 0px)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING_WORDS[currentIndex]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block font-serif italic font-bold text-[#facc15] drop-shadow-[0_2px_12px_rgba(250,204,21,0.25)] h-[1.16em] leading-[1.04] text-left whitespace-nowrap transform-gpu will-change-transform"
        >
          {ROTATING_WORDS[currentIndex]}.
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

export const AlulaHero: React.FC<AlulaHeroProps> = React.memo(({ onNavigateApp, onOpenAuth }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-black select-none"
    >
      {/* Background Architectural Canvas - Subtle Grid & Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_75%)] opacity-80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 w-full flex flex-col items-center text-center">
        {/* Main Hero Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-extrabold tracking-[-0.04em] text-white leading-[1.04] mb-8 max-w-5xl text-balance">
          One workspace <br className="hidden sm:inline" />
          <div className="inline-flex items-baseline gap-x-2 sm:gap-x-3">
            <span className="whitespace-nowrap">for your</span>
            <RotatingHeroWord />
          </div>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mb-10 text-balance">
          Stop juggling five different apps. Manage your time, notes, and memory in one place.
        </p>

        {/* Action CTAs - Quiet Luxury Power-User Recipe */}
        <div className="mb-12 sm:mb-14 flex flex-col items-center justify-center gap-3.5">
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {/* Primary Action: Start Free */}
            <button
              type="button"
              onClick={onOpenAuth ? () => onOpenAuth('signup') : onNavigateApp}
              className="group h-12 sm:h-13 px-8 sm:px-9 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-sm font-bold shadow-[0_4px_24px_rgba(255,255,255,0.18)] hover:shadow-[0_4px_28px_rgba(255,255,255,0.25)] transition-all duration-150 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] text-zinc-950 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>

            {/* Secondary Action: Frosted Glass Discovery Pill */}
            <button
              type="button"
              onClick={() => scrollTo('workflow')}
              className="group h-12 sm:h-13 px-6 sm:px-7 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.08] hover:border-white/20 text-sm font-medium backdrop-blur-sm transition-all duration-150 active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>See How It Works</span>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200" />
            </button>
          </div>

          {/* Elevated "Instant web access" Badge — Lightning Fast */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-sm select-none transition-colors">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 stroke-[2]" />
            <span className="text-xs sm:text-[13px] text-zinc-200 font-medium tracking-wide">
              Instant web access
            </span>
          </div>
        </div>

        {/* Editorial Statement Ribbon (Locked in with Syne) */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-in fade-in duration-300">
          <div className="w-full pt-6 pb-2 border-t border-zinc-800/80 flex flex-col items-center justify-center gap-3 text-center">
            <div
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="flex items-center justify-center gap-3 sm:gap-4.5 whitespace-nowrap font-bold text-base sm:text-lg uppercase text-zinc-100 tracking-wider not-italic"
            >
              <span>Plan deliberately</span>
              <span className="text-amber-400/90 not-italic font-sans text-sm">✦</span>
              <span>Synthesize deeply</span>
              <span className="text-amber-400/90 not-italic font-sans text-sm">✦</span>
              <span>Remember permanently</span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-sm transition-all duration-200">
              <span className="text-amber-400/80 text-xs sm:text-sm select-none">✦</span>
              <span className="text-xs sm:text-[13px] uppercase tracking-[0.16em] text-zinc-400 font-medium font-sans">
                A unified cognitive operating system for ambitious minds
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AlulaHero;
