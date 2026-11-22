import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatexMath } from '../common/LatexMath';

// Interactive Card Stack Formulas
const THEOREM_CARDS = [
  {
    id: 1,
    subject: 'Algèbre Linéaire',
    subjectColor: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
    title: 'Théorème de Diagonalisation',
    latex: 'A \\in \\mathcal{M}_n(\\mathbb{K}) \\iff \\sum_{i=1}^p \\dim(E_{\\lambda_i}) = n',
    confidence: 'Leitner Box 5 • 98% Mastery',
  },
  {
    id: 2,
    subject: 'Analyse Réelle',
    subjectColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    title: 'Formule de Taylor-Young',
    latex: 'f(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x-a)^k + o((x-a)^n)',
    confidence: 'Leitner Box 4 • 91% Mastery',
  },
  {
    id: 3,
    subject: 'Physique Électromagnétisme',
    subjectColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    title: 'Équation de Maxwell-Faraday',
    latex: '\\mathbf{\\nabla} \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}',
    confidence: 'Leitner Box 5 • 99% Mastery',
  },
];

export const Features: React.FC = () => {
  const [cards, setCards] = useState(THEOREM_CARDS);

  const flipCard = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  return (
    <section id="engines" className="relative w-full max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 bg-black">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
          <span className="bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
            Three Engines. Zero Overhead.
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
          Engineered to replace fragmented to-do apps, spreadsheets, and disconnected tools
          with an integrated academic command center.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Pillar 1: Automated Timetable Radar */}
        <div className="rounded-3xl bg-neutral-950/80 border border-neutral-800/90 p-7 flex flex-col justify-between hover:border-neutral-700 transition-all group">
          {/* Visual Element: Radar Ring */}
          <div className="relative h-44 w-full flex items-center justify-center overflow-hidden mb-6 rounded-2xl bg-[#09090b] border border-neutral-900">
            <div className="absolute w-40 h-40 rounded-full border border-neutral-800 animate-ping opacity-25" />
            <div className="absolute w-32 h-32 rounded-full border border-neutral-800/80" />
            <div className="absolute w-20 h-20 rounded-full border border-neutral-700/60" />
            
            <div className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <span className="text-[10px] font-mono font-bold">RADAR</span>
            </div>

            {/* Orbiting session dot */}
            <div className="absolute w-32 h-32 animate-spin [animation-duration:10s]">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] -top-1.5 left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute w-20 h-20 animate-spin [animation-duration:7s] [animation-direction:reverse]">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899] top-1/2 -left-1.2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              Temporal Engine
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              Automated Timetable & DS Radar
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Detects timetable conflicts automatically. Binds your daily class sessions, TD problem sets,
              and continuous assessment (DS) deadlines into an organized schedule.
            </p>
          </div>
        </div>

        {/* Pillar 2: KaTeX Active Recall & SRS */}
        <div className="rounded-3xl bg-neutral-950/80 border border-neutral-800/90 p-7 flex flex-col justify-between hover:border-neutral-700 transition-all group">
          {/* Visual Element: Interactive Click-to-Flip Card */}
          <div
            className="relative h-44 w-full flex items-center justify-center cursor-pointer select-none mb-6"
            onClick={flipCard}
            title="Click to flip formula"
          >
            <AnimatePresence mode="popLayout">
              {cards.slice(0, 2).map((card, index) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{
                    scale: 1 - index * 0.06,
                    y: index * 10,
                    zIndex: 2 - index,
                    opacity: 1 - index * 0.25,
                  }}
                  exit={{ y: 50, opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="absolute w-full p-3.5 rounded-2xl bg-[#0c0c0e] border border-neutral-800 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${card.subjectColor}`}>
                      {card.subject}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      {card.confidence}
                    </span>
                  </div>
                  <div className="py-2 px-2.5 rounded-lg bg-[#060608] border border-neutral-800 text-center text-white text-xs overflow-x-auto">
                    <LatexMath math={card.latex} displayMode />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-neutral-500">
                    <span>Leitner Spaced Repetition</span>
                    <span className="text-cyan-400 font-bold">Flip ↻</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div>
            <div className="text-[11px] font-mono text-pink-400 uppercase tracking-widest mb-1.5">
              Cognitive Engine
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              Formula-Native Active Recall
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Typeset complex equations natively with KaTeX. Leitner confidence intervals (Box 1 to 5)
              predict retention decay and schedule flashcard reviews right before forgetting.
            </p>
          </div>
        </div>

        {/* Pillar 3: Action-Driven AI Co-pilot */}
        <div className="rounded-3xl bg-neutral-950/80 border border-neutral-800/90 p-7 flex flex-col justify-between hover:border-neutral-700 transition-all group">
          {/* Visual Element: Action Hook Dialog */}
          <div className="relative h-44 w-full flex flex-col justify-between p-4 mb-6 rounded-2xl bg-[#09090b] border border-neutral-900 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span className="text-[11px] font-mono font-bold text-purple-300">
                  Autonomous Scheduler
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2 py-0.5 rounded-full">
                Synced to Cal ⚡
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed my-2 italic">
              "DS 3 Algèbre is in 48h. I scheduled a 2-hour problem-solving revision block for tonight at 20:00."
            </p>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Task: Diagonalisation TD 4</span>
              <span className="text-emerald-400 font-bold">Active ✓</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono text-purple-400 uppercase tracking-widest mb-1.5">
              Autonomous Assistant
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              Action-Driven AI Assistant
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Not just a chat box. GetStudy's AI Co-pilot has direct hooks into your calendar,
              decomposing tutorial sheets and scheduling focused study blocks without manual copying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
