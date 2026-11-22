import React, { useState } from 'react';
import { LatexMath } from '../../common/LatexMath';

export const AlulaAiTerminal: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'proof' | 'schedule' | 'bareme'>('proof');

  return (
    <section id="intelligence" className="relative w-full py-24 px-4 sm:px-8 bg-[#030306] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading matching reference */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold mb-3">
            <span>Integrated AI Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Deep Academic Intelligence
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Unlike generic chatbots, GetStudy's AI co-pilot understands LaTeX formulas, syllabus dependencies, and your live schedule.
          </p>
        </div>

        {/* Two Column Layout matching Image 2 "Build on Alula" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActiveCodeTab('proof')}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                activeCodeTab === 'proof'
                  ? 'bg-white/[0.08] border-cyan-500/40 text-white shadow-lg'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="font-bold text-sm text-white mb-1">Step-by-Step Proof Solver ↗</div>
              <p className="text-xs text-zinc-500">Decomposes difficult mathematical proofs and explains subtle theorem steps.</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveCodeTab('schedule')}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                activeCodeTab === 'schedule'
                  ? 'bg-white/[0.08] border-indigo-500/40 text-white shadow-lg'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="font-bold text-sm text-white mb-1">Adaptive Calendar Scheduling ↗</div>
              <p className="text-xs text-zinc-500">Auto-slots revision sessions into free timetable periods before major DS exams.</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveCodeTab('bareme')}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                activeCodeTab === 'bareme'
                  ? 'bg-white/[0.08] border-pink-500/40 text-white shadow-lg'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="font-bold text-sm text-white mb-1">Exam Bareme & Weighting ↗</div>
              <p className="text-xs text-zinc-500">Prioritizes problem sheet exercises based on historical exam point distributions.</p>
            </button>
          </div>

          {/* Right Terminal Mockup (matching Alula code window in Image 2) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/[0.1] bg-[#08080c] shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-zinc-500 text-[11px] ml-2">getstudy-ai-engine.sh</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  KaTeX Live
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-6 text-zinc-300 flex flex-col gap-4">
                {activeCodeTab === 'proof' && (
                  <>
                    <div className="text-zinc-500"># Query: Prove that ker(f) + im(f) is direct for a projector p</div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-sans text-xs text-zinc-200">
                      Let <LatexMath math="p \in \mathcal{L}(E)" /> such that <LatexMath math="p^2 = p" />.
                      <div className="my-2">
                        For any <LatexMath math="x \in E" />, we decompose: <LatexMath math="x = p(x) + (x - p(x))" />.
                      </div>
                      <div className="text-cyan-400 font-mono text-[11px] mt-1">
                        ✓ Step verified: <LatexMath math="p(x - p(x)) = p(x) - p^2(x) = 0 \implies (x - p(x)) \in \ker(p)" />
                      </div>
                    </div>
                    <div className="text-emerald-400 text-[11px]">
                      &gt; Proof concluded: <LatexMath math="E = \ker(p) \oplus \text{im}(p)" />. Added to Algèbre revision flashcard queue.
                    </div>
                  </>
                )}

                {activeCodeTab === 'schedule' && (
                  <>
                    <div className="text-zinc-500"># AI Autonomous Timetable Optimizer</div>
                    <div className="text-zinc-400">
                      Analyzing weekly timetable: 24h classes, 4h TD, 1 upcoming DS on Friday.
                    </div>
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 font-sans text-xs">
                      <div className="font-bold text-white mb-1">Generated Revision Strategy:</div>
                      <div>• Mercredi 16:30 – 18:00 : Révision Endomorphismes (Priorité Haute)</div>
                      <div>• Jeudi 20:00 – 21:30 : Annales DS 2024 & Fiches Formules (Priorité Maximale)</div>
                    </div>
                    <div className="text-cyan-400 text-[11px]">&gt; 2 sessions synced to Study Calendar. Zero overlap.</div>
                  </>
                )}

                {activeCodeTab === 'bareme' && (
                  <>
                    <div className="text-zinc-500"># Syllabus Weighting & Historical Bareme Analysis</div>
                    <div className="text-zinc-400">
                      Coefficient Audit: Mathématiques (Coeff 6), Physique (Coeff 5), Chimie (Coeff 2).
                    </div>
                    <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-200 font-sans text-xs">
                      <div className="font-bold text-white mb-1">Recommended Time Allocation:</div>
                      <div>• 45% Algèbre & Analyse (Top exam weight)</div>
                      <div>• 35% Électromagnétisme & Thermodynamique</div>
                      <div>• 20% Informatique Python & SQL</div>
                    </div>
                    <div className="text-pink-400 text-[11px]">&gt; Workload balanced according to competitive exam coefficients.</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
