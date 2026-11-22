import React, { useState } from 'react';

interface AlulaCadenceSimulatorProps {
  onNavigateApp?: () => void;
}

export const AlulaCadenceSimulator: React.FC<AlulaCadenceSimulatorProps> = ({ onNavigateApp }) => {
  const [mode, setMode] = useState<'cadence' | 'crunch'>('cadence');
  const [dailyHours, setDailyHours] = useState<number>(3.5);
  const [subjectCount, setSubjectCount] = useState<number>(5);
  const [weeksToExam, setWeeksToExam] = useState<number>(3);

  // Dynamic calculations based on sliders and mode
  const weeklyHours = (dailyHours * (mode === 'crunch' ? 7 : 5)).toFixed(1);
  const masteryRate = Math.min(99, Math.round(72 + dailyHours * 4.5 + (12 - weeksToExam) * 1.2));
  const retentionRate = Math.min(99.4, (88 + dailyHours * 2.2 - (subjectCount > 6 ? 3 : 0))).toFixed(1);
  
  const burnoutRisk = dailyHours >= 6.5 
    ? { label: 'High (Risk of Fatigue)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' }
    : dailyHours >= 4.5
    ? { label: 'Moderate (High Output)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' }
    : { label: 'Optimal (Sustainable Pace)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };

  return (
    <section id="simulator" className="relative w-full py-24 px-4 sm:px-8 bg-[#030306] overflow-hidden select-none">
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold mb-3">
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Live Academic Workload & Cadence Simulator
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Model your daily study commitment, balance semester coefficients, and forecast formula retention rate before your next DS.
          </p>
        </div>

        {/* Simulator Main Card (Matching Alula reference layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-white/[0.08] bg-[#09090d]/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Left Navigation / Mode Switcher */}
          <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between bg-white/[0.01]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">
                Select Study Profile
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setMode('cadence')}
                  className={`w-full text-left p-4 rounded-2xl transition-all border cursor-pointer ${
                    mode === 'cadence'
                      ? 'bg-white/[0.08] border-cyan-500/40 text-white shadow-lg shadow-cyan-950/30'
                      : 'bg-white/[0.02] border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Standard Semester Cadence</span>
                    {mode === 'cadence' && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                  </div>
                  <p className="text-xs text-zinc-500 leading-snug">
                    Steady daily revision of lecture notes, TD problem sheets, and flashcard queues across 5 days.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('crunch')}
                  className={`w-full text-left p-4 rounded-2xl transition-all border cursor-pointer ${
                    mode === 'crunch'
                      ? 'bg-white/[0.08] border-pink-500/40 text-white shadow-lg shadow-pink-950/30'
                      : 'bg-white/[0.02] border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Exam Sprint Mode</span>
                    {mode === 'crunch' && <span className="w-2 h-2 rounded-full bg-pink-400" />}
                  </div>
                  <p className="text-xs text-zinc-500 leading-snug">
                    7-day continuous crunch for upcoming DS, Concours Blanc, or oral Colles with maximum problem set drills.
                  </p>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="text-[12px] font-mono text-zinc-500 mb-1">Status Recommendation</div>
              <div className="text-sm font-semibold text-zinc-300">
                {mode === 'cadence' ? 'Consistent 3–4 hours/day yields highest long-term retention.' : 'Sprint mode recommended for 2–3 weeks max to avoid burnout.'}
              </div>
            </div>
          </div>

          {/* Right Interactive Sliders & Live Results */}
          <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between">
            {/* Sliders Container */}
            <div className="flex flex-col gap-8 mb-10">
              {/* Slider 1: Daily Study Hours */}
              <div>
                <div className="flex items-center justify-between text-sm font-bold text-white mb-2">
                  <span className="flex items-center gap-2">
                    <iconify-icon icon="lucide:clock" width="16" className="text-cyan-400" />
                    <span>Daily Independent Study Time</span>
                  </span>
                  <span className="font-mono text-base text-cyan-300">{dailyHours} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-zinc-800 accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1">
                  <span>1h (Light)</span>
                  <span>4h (Balanced)</span>
                  <span>8h (Intense)</span>
                </div>
              </div>

              {/* Slider 2: Active Subjects */}
              <div>
                <div className="flex items-center justify-between text-sm font-bold text-white mb-2">
                  <span className="flex items-center gap-2">
                    <iconify-icon icon="lucide:book-open" width="16" className="text-indigo-400" />
                    <span>Active STEM Subjects Tracked</span>
                  </span>
                  <span className="font-mono text-base text-indigo-300">{subjectCount} Disciplines</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={subjectCount}
                  onChange={(e) => setSubjectCount(parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg bg-zinc-800 accent-indigo-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1">
                  <span>2 Subjects</span>
                  <span>5 Subjects (Typical MPSI)</span>
                  <span>8 Subjects</span>
                </div>
              </div>

              {/* Slider 3: Weeks to Major DS */}
              <div>
                <div className="flex items-center justify-between text-sm font-bold text-white mb-2">
                  <span className="flex items-center gap-2">
                    <iconify-icon icon="lucide:calendar" width="16" className="text-pink-400" />
                    <span>Time Horizon Until Major Exam (DS)</span>
                  </span>
                  <span className="font-mono text-base text-pink-300">{weeksToExam} Weeks</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={weeksToExam}
                  onChange={(e) => setWeeksToExam(parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg bg-zinc-800 accent-pink-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1">
                  <span>1 Week (Crunch)</span>
                  <span>4 Weeks</span>
                  <span>10 Weeks (Term)</span>
                </div>
              </div>
            </div>

            {/* Live Outputs Grid (matching the APY / Return display in Alula image) */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Weekly Hours
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {weeklyHours} <span className="text-xs text-zinc-400">h/wk</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Syllabus Mastery
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">
                    {masteryRate}%
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Active Recall Rate
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono">
                    {retentionRate}%
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Fatigue Profile
                  </div>
                  <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${burnoutRisk.color}`}>
                    {burnoutRisk.label.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Button matching Alula blue/cyan pill button */}
            <button
              type="button"
              onClick={onNavigateApp}
              className="w-full py-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-300 hover:opacity-95 shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Build this schedule in GetStudy OS</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
