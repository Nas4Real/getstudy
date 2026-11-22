import React, { useState } from 'react';
import { LatexMath } from '../../common/LatexMath';

export const AlulaViewShowcase: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<'organize' | 'ai' | 'brain'>('organize');

  return (
    <section
      id="cockpit"
      className="relative w-full py-28 px-6 sm:px-10 bg-[#050507] border-t border-zinc-800/80"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 700px' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Feature Controller (5 cols) */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              One cockpit. Zero cognitive noise.
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-8">
              Everything ambitious minds need to plan their day, interrogate their knowledge, and retain concepts without context switching.
            </p>

            {/* Interactive Selector Buttons */}
            <div className="flex flex-col gap-3">
              {/* Tab 1: Organize */}
              <button
                type="button"
                onClick={() => setActiveTab('organize')}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  activeTab === 'organize'
                    ? 'bg-zinc-800/90 border-zinc-600 text-white shadow-md'
                    : 'bg-zinc-900/30 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-base font-bold ${activeTab === 'organize' ? 'text-white' : 'text-zinc-200'}`}>
                    Smart Calendar & Tasks
                  </span>
                  <span className="text-xs font-mono text-zinc-400">01</span>
                </div>
                <p className="text-xs text-zinc-400">Time-blocking calendar, automated priority queues, and deadline tracking.</p>
              </button>

              {/* Tab 2: AI Assistant */}
              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-zinc-800/90 border-zinc-600 text-white shadow-md'
                    : 'bg-zinc-900/30 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-base font-bold ${activeTab === 'ai' ? 'text-white' : 'text-zinc-200'}`}>
                    Autonomous AI Assistant
                  </span>
                  <span className="text-xs font-mono text-zinc-400">02</span>
                </div>
                <p className="text-xs text-zinc-400">Instant document summaries, active recall generation, and smart answers.</p>
              </button>

              {/* Tab 3: Second Brain */}
              <button
                type="button"
                onClick={() => setActiveTab('brain')}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  activeTab === 'brain'
                    ? 'bg-zinc-800/90 border-zinc-600 text-white shadow-md'
                    : 'bg-zinc-900/30 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-base font-bold ${activeTab === 'brain' ? 'text-white' : 'text-zinc-200'}`}>
                    Second Brain & Flashcards
                  </span>
                  <span className="text-xs font-mono text-zinc-400">03</span>
                </div>
                <p className="text-xs text-zinc-400">Spaced repetition memory engine with native LaTeX and structured subjects.</p>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity App Preview Window (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800 bg-[#09090b] p-6 sm:p-7 shadow-2xl">
              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="text-zinc-400 font-mono text-xs ml-2">
                    {activeTab === 'organize'
                      ? 'getstudy // organize'
                      : activeTab === 'ai'
                      ? 'getstudy // ai-assistant'
                      : 'getstudy // second-brain'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-300 font-mono text-xs font-medium">Live State</span>
                </div>
              </div>

              {/* View Content depending on activeTab */}
              {activeTab === 'organize' && (
                <div className="space-y-4">
                  {/* Active deep work block */}
                  <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-700/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                        • In Progress • Next 45m
                      </span>
                      <div className="text-lg font-bold text-white">System Architecture & Design Review</div>
                      <div className="text-xs text-zinc-300 mt-0.5">Deep Work Block • Priority 1</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-white">Focus Mode</div>
                      <div className="text-xs text-zinc-400">10:00 – 11:30 AM</div>
                    </div>
                  </div>

                  {/* Secondary scheduled item */}
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-zinc-200">Review Spaced Repetition Decks</div>
                      <div className="text-xs text-zinc-400">24 cards due today • Second Brain</div>
                    </div>
                    <div className="text-right font-mono text-xs text-zinc-400">
                      <div>14:00 – 14:30</div>
                      <div className="text-emerald-400 font-medium">Automated</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-4">
                  {/* User Prompt */}
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-300">
                    <span className="font-mono text-zinc-500 block mb-1">You</span>
                    "Synthesize the core tradeoffs of Distributed Consensus and create 2 review flashcards."
                  </div>

                  {/* AI Output Card */}
                  <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-700/80">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        • AI Co-Pilot
                      </span>
                    </div>
                    <div className="text-xs text-zinc-200 leading-relaxed space-y-2">
                      <p>
                        In distributed networks, consensus ensures replica consistency despite asynchronous networks and node failures (e.g. Raft, Paxos).
                      </p>
                      <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 flex items-center justify-between">
                        <span className="font-mono text-[11px] text-zinc-300">Generated 2 flashcards to "System Design" deck</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Saved</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'brain' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-center">
                    <span className="text-xs font-mono text-zinc-400 font-semibold block mb-3">
                      CARD 14 / 48 • ALGORITHMS & LINEAR ALGEBRA
                    </span>
                    <div className="text-sm font-semibold text-zinc-200 mb-4">
                      Rank-Nullity Fundamental Invariant:
                    </div>
                    <div className="p-4 rounded-lg bg-black border border-zinc-800 text-white text-base">
                      <LatexMath math="\dim(V) = \dim(\ker T) + \dim(\text{Im } T)" />
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-3">
                      <span className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-medium">
                        Again (1d)
                      </span>
                      <span className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-medium">
                        Good (4d)
                      </span>
                      <span className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-medium">
                        Easy (7d)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
