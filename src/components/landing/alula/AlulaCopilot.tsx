import React, { useState } from 'react';
import {
  Calendar, CheckSquare, MessageSquare, Zap, CheckCircle2,
  Layers, Sparkles, Mic, FileText, ChevronRight, BookOpen
} from 'lucide-react';

export type CopilotDeckVariant = 'console' | 'workspace' | 'cockpit';

interface AlulaCopilotProps {
  initialVariant?: CopilotDeckVariant;
  onNavigateApp?: () => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const AlulaCopilot: React.FC<AlulaCopilotProps> = React.memo(({ 
  initialVariant = 'console',
}) => {
  const [variant, setVariant] = useState<CopilotDeckVariant>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const v = p.get('copilot') || p.get('v') || '';
      if (v === 'workspace' || v === '2') return 'workspace';
      if (v === 'cockpit' || v === '3') return 'cockpit';
      if (v === 'console' || v === '1') return 'console';
    }
    return initialVariant;
  });

  // State for Variant 1 (Interactive Command Console)
  const [activeConsoleTab, setActiveConsoleTab] = useState<'calendar' | 'tasks' | 'qa'>('calendar');
  const [consolePromptIndex, setConsolePromptIndex] = useState<number>(0);

  // State for Variant 2 (Live App Workspace Split)
  const [activeWorkspaceScenario, setActiveWorkspaceScenario] = useState<'calendar' | 'tasks' | 'exam'>('calendar');

  // State for Variant 3 (Omni-Action Studio)
  const [activeCockpitTab, setActiveCockpitTab] = useState<'calendar' | 'tasks' | 'qa'>('calendar');

  return (
    <section
      id="ai-copilot"
      className="relative w-full py-28 px-6 sm:px-10 bg-[#000000] border-t border-white/[0.04] select-none overflow-hidden scroll-mt-28"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 850px' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5 text-balance font-jakarta">
              An assistant that doesn't just chat.{' '}
              <span className="font-serif italic font-normal text-[#facc15]">It executes.</span>
            </h2>
            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed font-sans">
              Ask questions, create tasks, or schedule study sessions. Just talk to your copilot, and it operates your entire study workflow for you.
            </p>
          </div>

          {/* Switcher between the 3 Deck Variants */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.03] border border-white/[0.08] self-start lg:self-end backdrop-blur-md gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setVariant('console')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer font-jakarta ${
                variant === 'console'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              1 · Interactive Console
            </button>
            <button
              type="button"
              onClick={() => setVariant('workspace')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer font-jakarta ${
                variant === 'workspace'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              2 · App Split View
            </button>
            <button
              type="button"
              onClick={() => setVariant('cockpit')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer font-jakarta ${
                variant === 'cockpit'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              3 · Action Studio
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VARIANT 1: Refined Interactive Command Console                           */}
        {/* ========================================================================= */}
        {variant === 'console' && (
          <div className="rounded-3xl bg-[#060609] border border-white/[0.08] p-6 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            {/* Top Command Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => { setActiveConsoleTab('calendar'); setConsolePromptIndex(0); }}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeConsoleTab === 'calendar'
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>01 // CALENDAR ACTIONS</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveConsoleTab('tasks'); setConsolePromptIndex(0); }}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeConsoleTab === 'tasks'
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>02 // TASK AUTOMATION</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveConsoleTab('qa'); setConsolePromptIndex(0); }}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeConsoleTab === 'qa'
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>03 // ACADEMIC Q&A</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>COPILOT ACTIVE // DATABASE CONNECTED</span>
              </div>
            </div>

            {/* TAB 1: CALENDAR ACTIONS */}
            {activeConsoleTab === 'calendar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Capability Thesis & Prompt Switcher */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight font-jakarta">
                      Schedule Your Week Just by Talking
                    </h3>
                    <p className="text-base text-zinc-300 leading-relaxed font-sans">
                      Never spend 10 minutes dragging blocks across a calendar. Tell your Copilot what exam is coming up, and it automatically arranges conflict-free sessions with realistic breaks.
                    </p>
                  </div>

                  {/* Interactive Prompt Pills */}
                  <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Click to test voice prompts:
                    </div>
                    <div className="space-y-2">
                      {[
                        { text: '“Push tonight’s 2-hour Calculus block to Saturday 10 AM.”', action: 'Reschedules block without clashing with labs' },
                        { text: '“Find a 3-hour revision window before Thursday’s Physics exam.”', action: 'Scans week and spots optimal energy slots' },
                        { text: '“Clear my Friday evening and protect my weekend rest time.”', action: 'Rearranges homework without overloading Monday' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setConsolePromptIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                            consolePromptIndex === idx
                              ? 'bg-white/[0.08] border-white/20 text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="text-sm font-medium font-sans flex items-center justify-between">
                            <span>{item.text}</span>
                            {consolePromptIndex === idx && <ChevronRight className="w-4 h-4 text-[#facc15] shrink-0" />}
                          </div>
                          <div className="text-xs text-zinc-400 font-mono mt-1">{item.action}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Live Conversational Execution Feed */}
                <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-black border border-white/[0.08] space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.06]">
                    <span className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>STUDENT VOICE COMMAND</span>
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      EXECUTED IN 0.4S
                    </span>
                  </div>

                  {/* Student Input Bubble */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start justify-between gap-4">
                    <p className="text-base font-medium text-white font-sans leading-relaxed">
                      {consolePromptIndex === 0 && "“I’m too exhausted tonight. Push my 2-hour Calculus block to Saturday morning at 10 AM, and make sure it doesn't clash with my lab.”"}
                      {consolePromptIndex === 1 && "“Find a 3-hour revision window before Thursday’s Physics exam, and make sure I get a dinner break.”"}
                      {consolePromptIndex === 2 && "“Clear my Friday evening and reschedule my Linear Algebra revision to Sunday afternoon.”"}
                    </p>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.05] text-zinc-400 shrink-0">
                      AUDIO 0:04
                    </span>
                  </div>

                  {/* Agent Trace Pill */}
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Zap className="w-3.5 h-3.5 text-[#facc15]" />
                    <span>TIMETABLE CHECKED // 0 OVERLAPS DETECTED // REST BUFFERS INTACT</span>
                  </div>

                  {/* Rich Execution Result Card */}
                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 font-sans">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold">
                      <span>✓ CALENDAR STATE UPDATED</span>
                      <span>GOOGLE & APPLE SYNCED</span>
                    </div>

                    <div className="space-y-2">
                      {consolePromptIndex === 0 && (
                        <>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/[0.05]">
                            <span className="line-through text-zinc-500 text-sm">Friday 19:00 – 21:00 · Calculus II Revision</span>
                            <span className="text-xs font-mono text-rose-400">CANCELLED (REST SAVED)</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                            <div>
                              <div className="text-white text-sm font-semibold">Saturday 10:00 – 12:00 · Calculus II Deep Work</div>
                              <div className="text-xs text-zinc-400 mt-0.5">Placed before Chemistry Lab · 45-min lunch buffer guaranteed</div>
                            </div>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">CONFIRMED</span>
                          </div>
                        </>
                      )}
                      {consolePromptIndex === 1 && (
                        <>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                            <div>
                              <div className="text-white text-sm font-semibold">Wednesday 14:00 – 17:00 · Physics Midterm Prep</div>
                              <div className="text-xs text-zinc-400 mt-0.5">Optimal cognitive window · Dinner break protected from 18:30</div>
                            </div>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">SCHEDULED</span>
                          </div>
                        </>
                      )}
                      {consolePromptIndex === 2 && (
                        <>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/[0.05]">
                            <span className="line-through text-zinc-500 text-sm">Friday 18:00 – 20:00 · Linear Algebra Revision</span>
                            <span className="text-xs font-mono text-rose-400">CANCELLED (FREE EVENING)</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                            <div>
                              <div className="text-white text-sm font-semibold">Sunday 14:30 – 16:30 · Linear Algebra Problem Drill</div>
                              <div className="text-xs text-zinc-400 mt-0.5">Quiet study block · Synced to all connected devices</div>
                            </div>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">CONFIRMED</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="text-xs text-zinc-400 pt-2 border-t border-emerald-500/20 font-mono flex items-center justify-between">
                      <span>Database revision ID #704-B</span>
                      <span className="text-zinc-300 hover:text-white cursor-pointer underline">View in Calendar →</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TASK AUTOMATION */}
            {activeConsoleTab === 'tasks' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight font-jakarta">
                      Turn Problem Sheets into Tasks Instantly
                    </h3>
                    <p className="text-base text-zinc-300 leading-relaxed font-sans">
                      Stop manually writing homework to-do lists. Tell your Copilot to scan a TD PDF, and it extracts every exercise, categorizes the difficulty, and attaches worked solutions into your execution ledger.
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Click to test voice prompts:
                    </div>
                    <div className="space-y-2">
                      {[
                        { text: '“Extract all unsolved exercises from Quantum TD 3 into tasks.”', action: 'Extracts 3 problems with difficulty badges' },
                        { text: '“Mark problem 4 in Analysis TD as completed and log time.”', action: 'Updates mastery index and logs 45 mins' },
                        { text: '“Create a priority drill for my hardest unmastered problems.”', action: 'Assembles targeted pre-exam worksheet' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setConsolePromptIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                            consolePromptIndex === idx
                              ? 'bg-white/[0.08] border-white/20 text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="text-sm font-medium font-sans flex items-center justify-between">
                            <span>{item.text}</span>
                            {consolePromptIndex === idx && <ChevronRight className="w-4 h-4 text-[#facc15] shrink-0" />}
                          </div>
                          <div className="text-xs text-zinc-400 font-mono mt-1">{item.action}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-black border border-white/[0.08] space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.06]">
                    <span className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>STUDENT VOICE COMMAND</span>
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      TASKS CREATED
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start justify-between gap-4">
                    <p className="text-base font-medium text-white font-sans leading-relaxed">
                      {consolePromptIndex === 0 && "“Extract all unsolved exercises from Quantum Mechanics TD 3 and add them to my priority task list with solutions.”"}
                      {consolePromptIndex === 1 && "“Mark problem 4 in Analysis TD as completed and log 45 minutes of deep focus.”"}
                      {consolePromptIndex === 2 && "“Create a priority drill for my hardest unmastered problems before next Tuesday’s exam.”"}
                    </p>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.05] text-zinc-400 shrink-0">
                      AUDIO 0:05
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <FileText className="w-3.5 h-3.5 text-[#facc15]" />
                    <span>PARSED TD_03_QUANTUM.PDF // 3 EXERCISES IDENTIFIED // SOLUTIONS ATTACHED</span>
                  </div>

                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 font-sans">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold">
                      <span>✓ 3 TASKS POPULATED IN TASK LEDGER</span>
                      <span>ATTACHMENTS READY</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/[0.05]">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" readOnly checked className="w-4 h-4 rounded border-zinc-600 accent-emerald-500" />
                          <div>
                            <div className="text-sm font-semibold text-white">Ex 1: Infinite square well wavefunctions</div>
                            <div className="text-xs text-zinc-400">Attached: Solution_TD03_Ex1.pdf (2 pages)</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">READY</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/[0.05]">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" readOnly className="w-4 h-4 rounded border-zinc-600 accent-emerald-500" />
                          <div>
                            <div className="text-sm font-semibold text-white">Ex 3: Tunneling probability through delta barrier</div>
                            <div className="text-xs text-zinc-400">Attached: Solution_TD03_Ex3.pdf (Step derivation)</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">HARD</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-400 pt-2 border-t border-emerald-500/20 font-mono flex items-center justify-between">
                      <span>Tasks synced to your Course Ledger</span>
                      <span className="text-zinc-300 hover:text-white cursor-pointer underline">Open Task Board →</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ACADEMIC Q&A */}
            {activeConsoleTab === 'qa' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight font-jakarta">
                      Syllabus-Grounded Answers, Never Guesses
                    </h3>
                    <p className="text-base text-zinc-300 leading-relaxed font-sans">
                      Ask any question about your curriculum and get clear, mathematical derivations cited directly from your university lecture slides and official textbooks.
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Click to test voice prompts:
                    </div>
                    <div className="space-y-2">
                      {[
                        { text: '“How does our professor define compactness in Lecture 3?”', action: 'Cites exact slide number and Heine-Borel theorem' },
                        { text: '“Show me the step-by-step proof of Cayley-Hamilton theorem.”', action: 'Step derivation matching course notation' },
                        { text: '“Which past exam problems asked about Green’s theorem?”', action: 'Retrieves 2023 & 2024 final exam questions' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setConsolePromptIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                            consolePromptIndex === idx
                              ? 'bg-white/[0.08] border-white/20 text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="text-sm font-medium font-sans flex items-center justify-between">
                            <span>{item.text}</span>
                            {consolePromptIndex === idx && <ChevronRight className="w-4 h-4 text-[#facc15] shrink-0" />}
                          </div>
                          <div className="text-xs text-zinc-400 font-mono mt-1">{item.action}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-black border border-white/[0.08] space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.06]">
                    <span className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>STUDENT QUESTION</span>
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      SLIDE CITED
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start justify-between gap-4">
                    <p className="text-base font-medium text-white font-sans leading-relaxed">
                      “How does our professor define compactness in Lecture 3, and which homework problems test it?”
                    </p>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.05] text-zinc-400 shrink-0">
                      AUDIO 0:04
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <BookOpen className="w-3.5 h-3.5 text-[#facc15]" />
                    <span>FOUND IN TOPOLOGY_LEC03.PDF // SLIDE 14 // CHAPTER 2 // 100% RECALL ACCURACY</span>
                  </div>

                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 font-sans">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold">
                      <span>✓ SYLLABUS-VERIFIED ANSWER</span>
                      <span>PAGE 14 OF 58</span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-black/60 border border-white/[0.05] text-sm text-zinc-200 leading-relaxed font-sans">
                      <div className="font-semibold text-white mb-1">Definition 2.4 (Compactness in Metric Spaces):</div>
                      “A subset K ⊂ X is compact if every open cover of K admits a finite subcover. In ℝⁿ, this is strictly equivalent to K being closed and bounded (Heine-Borel Theorem).”
                    </div>

                    <div className="text-xs text-zinc-400 pt-2 border-t border-emerald-500/20 font-mono flex items-center justify-between">
                      <span>Associated Tasks: Homework 2 (Ex 4) · Midterm 2024 (Q1)</span>
                      <span className="text-zinc-300 hover:text-white cursor-pointer underline">Open Slide in Viewer →</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VARIANT 2: In-App Workspace Split (Chat Drawer + Live App Viewport)       */}
        {/* ========================================================================= */}
        {variant === 'workspace' && (
          <div className="rounded-3xl bg-[#060609] border border-white/[0.08] p-6 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            {/* Top Workspace Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] mb-8 gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-jakarta">
                  Live App Control: From Speech to State
                </h3>
                <p className="text-base text-zinc-300 font-sans mt-1">
                  See how talking to your Copilot immediately updates your live calendar, tasks, and exam telemetry.
                </p>
              </div>

              {/* Scenario Toggles */}
              <div className="flex items-center p-1 rounded-full bg-white/[0.03] border border-white/[0.06] self-start sm:self-auto gap-1">
                <button
                  type="button"
                  onClick={() => setActiveWorkspaceScenario('calendar')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer font-jakarta ${
                    activeWorkspaceScenario === 'calendar'
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📅 1 · Reschedule Block
                </button>
                <button
                  type="button"
                  onClick={() => setActiveWorkspaceScenario('tasks')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer font-jakarta ${
                    activeWorkspaceScenario === 'tasks'
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ✓ 2 · Extract Tasks
                </button>
                <button
                  type="button"
                  onClick={() => setActiveWorkspaceScenario('exam')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer font-jakarta ${
                    activeWorkspaceScenario === 'exam'
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📊 3 · Exam Audit
                </button>
              </div>
            </div>

            {/* Split Screen View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Side: Conversational Copilot Drawer (40%) */}
              <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] text-xs font-mono text-zinc-400 mb-4">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>ALULA COPILOT CHAT DRAWER</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">LISTENING</span>
                  </div>

                  {activeWorkspaceScenario === 'calendar' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white font-sans">
                        <div className="text-xs font-mono text-zinc-400 mb-1">YOU (VOICE):</div>
                        “I have a migraine tonight. Push my Electromagnetism revision to Friday afternoon at 3 PM.”
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-sm text-zinc-200 font-sans space-y-2">
                        <div className="text-xs font-mono text-emerald-400 font-semibold">✓ ACTION EXECUTED</div>
                        <div>I moved your 90-minute study block to Friday 15:00 between your Physics Lecture and Lab. Your timetable and Google Calendar sync are updated. Rest well!</div>
                      </div>
                    </div>
                  )}

                  {activeWorkspaceScenario === 'tasks' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white font-sans">
                        <div className="text-xs font-mono text-zinc-400 mb-1">YOU (VOICE):</div>
                        “Extract the hardest unsolved exercises from Calculus TD 4 and put them in my task ledger.”
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-sm text-zinc-200 font-sans space-y-2">
                        <div className="text-xs font-mono text-emerald-400 font-semibold">✓ ACTION EXECUTED</div>
                        <div>Scanned TD_04_Calculus.pdf. Extracted Exercises 2, 5, and 7 into your Task Ledger with step solutions attached.</div>
                      </div>
                    </div>
                  )}

                  {activeWorkspaceScenario === 'exam' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white font-sans">
                        <div className="text-xs font-mono text-zinc-400 mb-1">YOU (VOICE):</div>
                        “What is my exact readiness score for Friday’s Linear Algebra midterm?”
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-sm text-zinc-200 font-sans space-y-2">
                        <div className="text-xs font-mono text-emerald-400 font-semibold">✓ SYLLABUS AUDIT</div>
                        <div>You have mastered 14 of 16 topics (88%). Review Eigenspaces & Cayley-Hamilton tonight to reach 100% readiness.</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Hold spacebar or type...</span>
                  </span>
                  <Mic className="w-4 h-4 text-[#facc15]" />
                </div>
              </div>

              {/* Right Side: Live App Workspace View (60%) */}
              <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] text-xs font-mono text-zinc-400 mb-4">
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-zinc-300" />
                      <span>LIVE APP WORKSPACE VIEW</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">UPDATED IN REAL TIME</span>
                  </div>

                  {activeWorkspaceScenario === 'calendar' && (
                    <div className="space-y-2.5 font-sans">
                      {/* Mini Schedule Strip showing conflict-free placement */}
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-400">
                        <span className="font-mono text-zinc-500">10:00 – 12:00</span>
                        <span className="text-zinc-300 font-medium">Physics III Lecture (Hall C)</span>
                        <span className="text-zinc-500 font-mono">FIXED CLASS</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-400">
                        <span className="font-mono text-zinc-500">13:30 – 14:45</span>
                        <span className="text-zinc-300 font-medium">Linear Algebra Recitation</span>
                        <span className="text-zinc-500 font-mono">FIXED CLASS</span>
                      </div>

                      {/* Copilot Inserted Study Block */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between shadow-sm">
                        <div>
                          <div className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                            15:00 – 16:30 · INSERTED BY COPILOT (CONFLICT-FREE)
                          </div>
                          <div className="text-sm font-semibold text-white mt-0.5">
                            Electromagnetism Revision Block (90 mins)
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            Optimal rest buffer before lab · Synced with Google Calendar
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold shrink-0">
                          SCHEDULED
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-400">
                        <span className="font-mono text-zinc-500">17:00 – 19:00</span>
                        <span className="text-zinc-300 font-medium">Applied Chemistry Laboratory</span>
                        <span className="text-zinc-500 font-mono">FIXED CLASS</span>
                      </div>
                    </div>
                  )}

                  {activeWorkspaceScenario === 'tasks' && (
                    <div className="space-y-3 font-sans">
                      <div className="p-3.5 rounded-xl bg-black/80 border border-white/[0.05] flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">TD 04 · Ex 2: Uniform Convergence of Series</div>
                          <div className="text-xs text-zinc-400 mt-0.5">Weierstrass M-Test · Attached: Sol_TD04_Ex2.pdf</div>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">HIGH PRIORITY</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/80 border border-white/[0.05] flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">TD 04 · Ex 5: Power series radius of convergence</div>
                          <div className="text-xs text-zinc-400 mt-0.5">Root Test vs Ratio Test · Attached: Sol_TD04_Ex5.pdf</div>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">PENDING</span>
                      </div>
                    </div>
                  )}

                  {activeWorkspaceScenario === 'exam' && (
                    <div className="p-5 rounded-xl bg-black/80 border border-white/[0.05] space-y-4 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">Linear Algebra Midterm Readiness</span>
                        <span className="text-xl font-extrabold text-[#facc15] font-mono">88%</span>
                      </div>
                      <div className="w-full bg-white/[0.06] h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#facc15] h-full rounded-full" style={{ width: '88%' }} />
                      </div>
                      <div className="text-xs text-zinc-400 space-y-1">
                        <div>• 2 days, 14 hours remaining until exam</div>
                        <div>• Recommended action: Review Eigenspace dimension theorems</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-xs font-mono text-zinc-400 flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Two-way real-time database sync: changes persist across your desktop and mobile app.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VARIANT 3: Omni-Action Studio (Voice Omnibox + 3 Live Action Engines)     */}
        {/* ========================================================================= */}
        {variant === 'cockpit' && (
          <div className="rounded-3xl bg-[#060609] border border-white/[0.08] p-6 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] space-y-8">
            {/* Top Luminous Command Bar */}
            <div className="rounded-2xl bg-black border border-white/[0.12] p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="text-xs font-mono text-zinc-400 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>VOICE & TEXT COMMAND INTERFACE</span>
                </span>
                <span className="text-zinc-500">HOLD SPACEBAR OR TYPE</span>
              </div>

              {/* Natural Input Bar Display */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3 flex-1">
                  <Mic className="w-5 h-5 text-[#facc15]" />
                  <span className="text-base sm:text-lg text-white font-medium font-sans">
                    {activeCockpitTab === 'calendar' && "“Push my Friday calculus revision to Saturday 10 AM without clashing.”"}
                    {activeCockpitTab === 'tasks' && "“Scan TD 3 and add all unsolved physics exercises into my task ledger.”"}
                    {activeCockpitTab === 'qa' && "“What theorems should I review before my Linear Algebra exam on Monday?”"}
                  </span>
                </div>
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.06] text-zinc-300 font-semibold uppercase tracking-wider shrink-0 hidden sm:inline-block">
                  ENTER ↵
                </span>
              </div>

              {/* Interactive Scenario Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/[0.04]">
                <span className="text-xs font-mono text-zinc-400 mr-2">CLICK CAPABILITY:</span>
                <button
                  type="button"
                  onClick={() => setActiveCockpitTab('calendar')}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCockpitTab === 'calendar'
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05]'
                  }`}
                >
                  📅 1. Calendar Scheduling
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCockpitTab('tasks')}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCockpitTab === 'tasks'
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05]'
                  }`}
                >
                  ✓ 2. Task & TD Extraction
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCockpitTab('qa')}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCockpitTab === 'qa'
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05]'
                  }`}
                >
                  💬 3. Course Q&A & Readiness
                </button>
              </div>
            </div>

            {/* 3 Active Execution Studios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Studio 1: Calendar */}
              <div className={`p-6 rounded-2xl bg-black border transition-all ${
                activeCockpitTab === 'calendar'
                  ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'border-white/[0.06] opacity-70'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.05] mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-300" />
                    <span>CALENDAR ENGINE</span>
                  </span>
                  <span className={activeCockpitTab === 'calendar' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>
                    {activeCockpitTab === 'calendar' ? 'LIVE' : 'STANDBY'}
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-jakarta mb-2">Automated Rescheduling</div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                  Translates natural voice requests into conflict-free study blocks. Automatically detects lectures, lab sessions, and preserves recovery sleep buffers.
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-400 space-y-1">
                  <div>✓ Friday 19:00 cancelled (rest protected)</div>
                  <div>✓ Saturday 10:00–12:00 scheduled</div>
                </div>
              </div>

              {/* Studio 2: Tasks */}
              <div className={`p-6 rounded-2xl bg-black border transition-all ${
                activeCockpitTab === 'tasks'
                  ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'border-white/[0.06] opacity-70'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.05] mb-4">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-zinc-300" />
                    <span>TASK AUTOMATION</span>
                  </span>
                  <span className={activeCockpitTab === 'tasks' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>
                    {activeCockpitTab === 'tasks' ? 'LIVE' : 'STANDBY'}
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-jakarta mb-2">TD to Action Items</div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                  Parses coursework PDF sheets into individual actionable exercise cards. Tags difficulty, attaches official worked solutions, and pins to your ledger.
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-400 space-y-1">
                  <div>✓ Scanned TD_03_Physics.pdf</div>
                  <div>✓ 3 exercise tasks added to ledger</div>
                </div>
              </div>

              {/* Studio 3: Q&A */}
              <div className={`p-6 rounded-2xl bg-black border transition-all ${
                activeCockpitTab === 'qa'
                  ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'border-white/[0.06] opacity-70'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.05] mb-4">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-300" />
                    <span>SYLLABUS Q&A</span>
                  </span>
                  <span className={activeCockpitTab === 'qa' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>
                    {activeCockpitTab === 'qa' ? 'LIVE' : 'STANDBY'}
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-jakarta mb-2">Slide-Grounded Answers</div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                  Retrieves professor's definitions, theorems, and proofs directly from your uploaded slides. Never hallucinates outside your university curriculum.
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-400 space-y-1">
                  <div>✓ Citing Topology_Lec03.pdf (Slide 14)</div>
                  <div>✓ 100% curriculum recall accuracy</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

AlulaCopilot.displayName = 'AlulaCopilot';
export default AlulaCopilot;
