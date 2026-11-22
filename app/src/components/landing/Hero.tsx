import React from 'react';
import { motion } from 'framer-motion';
import { LatexMath } from '../common/LatexMath';

interface HeroProps {
  onNavigateApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateApp }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 pb-20 px-4 bg-black overflow-hidden"
    >
      {/* Top Ambient Glow Spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[400px] md:h-[600px] pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(6, 182, 212, 0.22) 0%, rgba(255, 255, 255, 0.06) 40%, rgba(0, 0, 0, 0) 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Background Radial Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Release Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-700/80 bg-neutral-900/80 text-[11px] font-mono text-neutral-300 mb-8 backdrop-blur-md shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>v2.4 Production Release</span>
          <span className="text-neutral-500">•</span>
          <span className="text-cyan-400 font-semibold">Built for STEM & Prepa</span>
        </motion.div>

        {/* Headline with Signature Radial Metallic Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-[1.08] mb-6 max-w-4xl"
        >
          <span className="bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
            The Academic Cockpit for Demanding STEM Curricula
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Consolidate timetable slots, continuous assessment (DS) countdowns, LaTeX formula
          flashcards, and autonomous AI revision schedules into one distraction-free operating system.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-20"
        >
          {/* Primary Launch Button */}
          <button
            type="button"
            onClick={onNavigateApp}
            className="group relative px-8 py-3.5 rounded-full text-sm md:text-base font-semibold text-white [background:linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(255,255,255,0.45)_100%)] border border-neutral-700 hover:border-cyan-400 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.35),0_10px_30px_rgba(6,182,212,0.15)] transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <span>Launch GetStudy OS</span>
            <span className="text-cyan-400 transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>

          {/* Secondary Explore Button */}
          <button
            type="button"
            onClick={() => scrollTo('product')}
            className="px-6 py-3.5 rounded-full text-sm md:text-base font-medium text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 backdrop-blur-md transition-all cursor-pointer"
          >
            Explore Academic Engines ↓
          </button>
        </motion.div>

        {/* Hero Dashboard Interactive Cockpit Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-5xl rounded-[24px] p-[1.5px] bg-gradient-to-b from-white/20 via-neutral-800 to-transparent shadow-[0_0_50px_rgba(6,182,212,0.08)]"
        >
          <div className="relative rounded-[22px] overflow-hidden bg-[#09090b] border border-[#27272a] text-left p-4 sm:p-6 md:p-8">
            {/* Window Top Controls */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-neutral-400 hidden sm:inline-block">
                  getstudy-os // academic-cockpit-v2.4
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                  Target: DS 3 Algèbre (48h)
                </span>
              </div>
            </div>

            {/* Dashboard Inner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Left Column (5 cols): Today's Schedule */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Today's Schedule • Vendredi
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">3 Sessions</span>
                </div>

                {/* Session Card 1 */}
                <div className="p-3.5 rounded-xl bg-[#121214] border border-[#25252b] hover:border-pink-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-pink-400 font-mono">
                      08:00 - 10:00 • Cours
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 bg-pink-500/10 px-2 py-0.5 rounded">
                      Algèbre
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">Diagonalisation & Trigonalisation</h4>
                  <p className="text-xs text-neutral-400 mt-1">Amphithéâtre 27 • Prof. Delorme</p>
                </div>

                {/* Session Card 2 */}
                <div className="p-3.5 rounded-xl bg-[#121214] border border-[#25252b] hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-cyan-400 font-mono">
                      10:15 - 12:15 • TD
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                      Analyse
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">Séries Entières & Convergence</h4>
                  <p className="text-xs text-neutral-400 mt-1">Salle TD 4 • Exercices 1 à 12</p>
                </div>

                {/* Session Card 3 */}
                <div className="p-3.5 rounded-xl bg-[#121214] border border-[#25252b] hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      14:00 - 16:00 • TP
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Physique
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">Induction & Électromagnétisme</h4>
                  <p className="text-xs text-neutral-400 mt-1">Laboratoire Curie • Mesures B(t)</p>
                </div>
              </div>

              {/* Center Column (4 cols): Active KaTeX Flashcard & DS Countdown */}
              <div className="md:col-span-4 flex flex-col gap-4">
                {/* DS Exam Countdown Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-red-950/40 via-[#121214] to-[#121214] border border-red-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-mono">
                      ⚠️ DS 3 Midterm
                    </span>
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full">
                      2 Days Left
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white">Algèbre Linéaire</div>
                  <div className="text-xs text-neutral-300 mt-1">
                    Samedi 9 Mai • 08:00 (3h) • Coeff 4
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Amphithéâtre 27 • 4 chapitres au programme</span>
                  </div>
                </div>

                {/* KaTeX Active Recall Flashcard */}
                <div className="p-4 rounded-xl bg-[#121214] border border-[#25252b] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                        Active Recall • Box 4
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        94% Mastery
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mb-2">Théorème de Diagonalisation :</div>
                    <div className="py-2.5 px-3 rounded-lg bg-[#0c0c0e] border border-neutral-800 text-center text-white text-sm overflow-x-auto">
                      <LatexMath
                        math="A \in \mathcal{M}_n(\mathbb{K}) \iff \sum_{i=1}^p \dim(E_{\lambda_i}) = n"
                        displayMode
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>Leitner Interval: 6 Days</span>
                    <span className="text-emerald-400 font-bold">Retained ✓</span>
                  </div>
                </div>
              </div>

              {/* Right Column (3 cols): Autonomous AI Assistant & Tasks */}
              <div className="md:col-span-3 flex flex-col gap-3">
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  AI Co-pilot Status
                </div>

                {/* AI Assistant Output Card */}
                <div className="p-3.5 rounded-xl bg-[#121214] border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span className="text-xs font-bold text-purple-300 font-mono">
                      Autonomous Scheduler
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    "I noticed DS 3 is approaching. I scheduled a 2-hour problem-solving revision
                    block for tonight at 20:00."
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>Action Hook:</span>
                    <span className="text-cyan-400">Synced to Cal ⚡</span>
                  </div>
                </div>

                {/* Task Checklist Snippet */}
                <div className="p-3.5 rounded-xl bg-[#121214] border border-[#25252b] flex-1 flex flex-col justify-between">
                  <div className="text-xs font-mono text-neutral-400 mb-2">Urgent Revision Tasks</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <span className="w-3.5 h-3.5 rounded-full border border-emerald-500 bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                      <span className="line-through text-neutral-500">TD 4 Exercices 1 à 6</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <span className="w-3.5 h-3.5 rounded-full border border-neutral-600" />
                      <span>Polynôme caractéristique det(A-λI)</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <span className="w-3.5 h-3.5 rounded-full border border-neutral-600" />
                      <span>Révision Concours Blanc 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark gradient fade at the bottom of the mockup */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
