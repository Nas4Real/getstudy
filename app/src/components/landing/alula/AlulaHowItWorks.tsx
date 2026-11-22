import React from 'react';
import { CalendarClock, Sparkles, Brain } from 'lucide-react';

export const AlulaHowItWorks: React.FC = React.memo(() => {
  return (
    <section
      id="workflow"
      className="relative w-full py-28 px-6 sm:px-10 bg-[#070709] border-t border-zinc-800/80"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 650px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Architected for focus and high performance.
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Three connected engines designed to replace fragmented tools, organize your days, and supercharge your intellect.
          </p>
        </div>

        {/* 3 Refined Architectural Step Cards (Organize, AI Assistant, Second Brain) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Organize */}
          <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono font-bold text-zinc-300 mb-6">
                Engine 01
              </div>

              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-white mb-6">
                <CalendarClock className="w-6 h-6 text-zinc-100" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Organize
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Master your time with an integrated daily calendar, time-blocked agendas, and priority-ranked tasks with automatic deadline reminders.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800/80 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>Time-blocking & tasks</span>
              <span className="text-white font-semibold">Real-time</span>
            </div>
          </div>

          {/* Step 2: AI Assistant */}
          <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono font-bold text-zinc-300 mb-6">
                Engine 02
              </div>

              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-white mb-6">
                <Sparkles className="w-6 h-6 text-zinc-100" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                AI Assistant
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                An on-demand thinking partner that clarifies complex ideas, synthesizes long materials, and answers questions using your active notes.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800/80 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>Context-aware intelligence</span>
              <span className="text-white font-semibold">Zero Noise</span>
            </div>
          </div>

          {/* Step 3: Second Brain */}
          <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono font-bold text-zinc-300 mb-6">
                Engine 03
              </div>

              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-white mb-6">
                <Brain className="w-6 h-6 text-zinc-100" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Second Brain
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Capture knowledge into structured subjects and smart flashcards. Retain everything effortlessly with built-in spaced repetition.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800/80 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>Spaced repetition engine</span>
              <span className="text-white font-semibold">Active Recall</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
