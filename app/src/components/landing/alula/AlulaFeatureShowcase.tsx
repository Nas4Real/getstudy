import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatexMath } from '../../common/LatexMath';

export const AlulaFeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: 'timetable',
      title: 'Obsidian Timetable',
      subtitle: 'Real-time session locator & daily schedule',
      description: 'Instant situational awareness: see what class is next, in which room (Amphi Schwartz, Lab B-2), with professor metadata and timeline status.',
      badge: 'Live Timetable',
    },
    {
      id: 'exams',
      title: 'Exam & DS Readiness',
      subtitle: 'Countdowns, oral Colles & coefficients',
      description: 'Built around the real CPGE/STEM rhythm: tracks written DS, oral Colles, and homework with coefficient weighting and urgent countdown badges.',
      badge: 'Continuous Assessment',
    },
    {
      id: 'flashcards',
      title: 'Formula-Native Flashcards',
      subtitle: 'Spaced repetition with KaTeX math',
      description: 'Active recall system engineered for STEM: renders complex integrals, differential equations, and matrices natively without blurry images.',
      badge: 'Active Recall SRS',
    },
    {
      id: 'ai',
      title: 'Actionable AI Co-Pilot',
      subtitle: 'Autonomous revision scheduling & proof solver',
      description: 'An AI assistant that does real work: directly schedules revision blocks into your calendar, breaks down hard theorems, and analyzes exam baremes.',
      badge: 'Deep STEM AI',
    },
  ];

  return (
    <section id="features" className="relative w-full py-24 px-4 sm:px-8 bg-[#030306] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading matching reference */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Built for Academic Excellence
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            High-density tools designed specifically for the pace and cognitive load of top STEM curricula.
          </p>
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {features.map((item, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0f0f14] border-cyan-500/40 shadow-xl shadow-cyan-950/20'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-base font-bold tracking-tight ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                      {item.title}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center">
                      <span
                        className={`w-2 h-2 rounded-full transition-all ${
                          isSelected ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-zinc-700'
                        }`}
                      />
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Dynamic Live Mockup Window (matching the glowing dashboard card in Alula image) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/[0.1] bg-[#09090d] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-center">
              {/* Ambient Top Right Glow */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="tab-timetable"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-sm font-bold text-white">Today's Timeline</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">4 SESSIONS</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-cyan-400 font-semibold mb-0.5">09:00 – 10:30 • Next Up</div>
                        <div className="text-sm font-bold text-white">Mathematics (Calculus)</div>
                        <div className="text-xs text-zinc-400">Room 27 • Dr. Laurent</div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        ANALYSE
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-zinc-500 mb-0.5">11:00 – 12:30</div>
                        <div className="text-sm font-bold text-zinc-200">Physics (Mechanics)</div>
                        <div className="text-xs text-zinc-500">Lab B-2 • Prof. Miller</div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        MÉCANIQUE
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="tab-exams"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="text-sm font-bold text-white">Upcoming Exams (DS & Colles)</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">3 SCHEDULED</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">DS 3 : Algèbre Linéaire</div>
                        <div className="text-xs text-zinc-400">Algèbre • Friday, Oct 18 • 08:00 – 11:00 AM</div>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        In 2 days
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-zinc-200">Contrôle Continu : Électromagnétisme</div>
                        <div className="text-xs text-zinc-500">Physique • Tuesday, Oct 22 • 14:00 – 16:00 PM</div>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                        In 6 days
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="tab-flashcards"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-sm font-bold text-white">KaTeX Formula SRS</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">DUE FOR REVIEW (12)</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-center flex flex-col items-center">
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Analyse • Théorème de Fubini</span>
                      <div className="my-2 py-2 px-4 rounded-xl bg-white/[0.03] border border-white/5 w-full">
                        <LatexMath math="\iint_{A \times B} f(x,y) \, dx \, dy = \int_A \left( \int_B f(x,y) \, dy \right) dx" displayMode />
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-zinc-400">Mastery:</span>
                        <div className="w-24 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="w-4/5 h-full bg-emerald-400 rounded-full" />
                        </div>
                        <span className="text-xs font-mono text-emerald-400">80%</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 3 && (
                  <motion.div
                    key="tab-ai"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-1">
                      <div className="flex items-center gap-2 font-sans">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                        <span className="text-sm font-bold text-white">AI Academic Co-Pilot</span>
                      </div>
                      <span className="text-[11px] text-indigo-400">ACTION EXECUTED</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400">
                      <span className="text-zinc-500">&gt;</span> Student: Schedule a 90-minute revision block for reduction of endomorphisms before Friday.
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-zinc-200">
                      <div className="text-indigo-400 font-bold mb-1">✓ Action completed in Study Calendar:</div>
                      <div className="text-zinc-300">Added session: "Réduction des endomorphismes" on Thursday 14:00 – 15:30. Linked to Algèbre (Coeff 4).</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
