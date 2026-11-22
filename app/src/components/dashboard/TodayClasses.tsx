import React from 'react';
import type { SessionData } from '../../types';

interface TodayClassesProps {
  onSelectSession: (session: SessionData) => void;
  onViewCalendar: () => void;
  mockEmpty?: boolean;
  mockState?: 'normal' | 'in-progress' | 'finished' | 'empty';
}

interface TimelineClass extends SessionData {
  status: 'past' | 'current' | 'upcoming';
}

export const TodayClasses: React.FC<TodayClassesProps> = ({
  onSelectSession,
  onViewCalendar,
  mockEmpty = false,
  mockState = 'normal',
}) => {
  const initialList: TimelineClass[] = [
    {
      title: 'Mathematics (Calculus)',
      subject: 'Analyse',
      subjectColor: '#06b6d4',
      type: 'Lecture',
      time: '09:00 - 10:30',
      date: 'Today',
      room: 'Room 27',
      professor: 'Dr. Laurent',
      status: 'past',
      description: 'Lecture covering improper integrals, dominated convergence theorems, and Riemann sum approximations.',
      notes: [
        'Bring completed homework #3',
        'Ask about question 4 on page 50',
      ],
    },
    {
      title: 'Physics (Mechanics)',
      subject: 'Mécanique',
      subjectColor: '#3b82f6',
      type: 'Lab Practical',
      time: '11:00 - 12:30',
      date: 'Today',
      room: 'Lab B-2',
      professor: 'Prof. Miller',
      status: 'current',
      description: 'Laboratory practical session on rotational dynamics, angular momentum conservation, and moment of inertia measurements.',
      notes: [
        'Lab coats required for experiment',
        'Review conservation of momentum formula',
      ],
    },
    {
      title: 'Thermodynamics Lecture',
      subject: 'Physique',
      subjectColor: '#10b981',
      type: 'Lecture',
      time: '14:00 - 15:30',
      date: 'Today',
      room: 'Amphi Curie',
      professor: 'Dr. Moreau',
      status: 'upcoming',
      description: 'Thermodynamic cycles, Carnot efficiency, entropy calculations, and state functions.',
      notes: [
        'Slide 14 has important formula for midterm',
        'Check homework submission deadline',
      ],
    },
    {
      title: 'Linear Algebra Tutorial',
      subject: 'Algèbre',
      subjectColor: '#ec4899',
      type: 'Tutorial (TD)',
      time: '16:00 - 17:30',
      date: 'Today',
      room: 'Room 105',
      professor: 'Dr. Ben Salem',
      status: 'upcoming',
      description: 'Tutorial problem solving on endomorphism reduction, minimal polynomials, and matrix diagonalization.',
      notes: [
        'Matrix diagonalization exercises',
        'Review Cayley-Hamilton application',
      ],
    },
  ];

  const classes: TimelineClass[] =
    mockEmpty || mockState === 'empty'
      ? []
      : mockState === 'finished'
      ? initialList.map((c) => ({ ...c, status: 'past' as const }))
      : mockState === 'in-progress'
      ? [
          { ...initialList[0], status: 'past' as const },
          { ...initialList[1], status: 'past' as const },
          { ...initialList[2], status: 'current' as const },
          { ...initialList[3], status: 'upcoming' as const },
        ]
      : initialList;

  const isAllFinished = mockState === 'finished';
  const isInProgress = mockState === 'in-progress';

  const getSubjectStyle = (subject: string) => {
    const s = subject.toLowerCase();
    if (s.includes('anal')) return 'bg-analyse/10 text-analyse border-analyse/20';
    if (s.includes('méc') || s.includes('mec')) return 'bg-mecanique/10 text-mecanique border-mecanique/20';
    if (s.includes('phys')) return 'bg-physique/10 text-physique border-physique/20';
    if (s.includes('alg')) return 'bg-algebre/10 text-algebre border-algebre/20';
    return 'bg-zinc-800 text-zinc-300 border-zinc-700/50';
  };

  return (
    <section className="bg-[#101012] border border-[#25252b] rounded-[24px] p-6 sm:p-7 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-[22px] font-bold text-white tracking-tight">Today's Classes</h2>
          {isAllFinished ? (
            <span className="text-xs sm:text-[13px] font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
              <iconify-icon icon="lucide:check" width="14" />
              <span>All Done</span>
            </span>
          ) : isInProgress ? (
            <span className="text-xs sm:text-[13px] font-bold px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 inline-flex items-center gap-1.5">
              <span>2/4 Attended</span>
            </span>
          ) : classes.length === 0 ? (
            <span className="text-xs sm:text-[13px] font-bold px-3 py-1 rounded-full bg-[#1b1b20] text-zinc-400 border border-[#2c2c34] inline-flex items-center">
              0 Sessions
            </span>
          ) : (
            <span className="text-xs sm:text-[13px] font-bold px-3 py-1 rounded-full bg-[#1b1b20] text-zinc-300 border border-[#2c2c34] inline-flex items-center">
              {classes.length} Sessions
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onViewCalendar}
          className="text-[13.5px] sm:text-[14px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Finished Summary Pill when all classes done */}
      {isAllFinished && (
        <div className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2 font-medium">
            <iconify-icon icon="lucide:check-circle-2" width="16" className="text-emerald-400 shrink-0" />
            <span>All 4 classes attended today</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-400">Complete</span>
        </div>
      )}

      {/* Timeline Schedule Rail */}
      {classes.length === 0 ? (
        <div className="py-12 sm:py-14 px-6 text-center flex flex-col items-center justify-center bg-[#141418] border border-[#27272e] rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#1b1b21] border border-[#2c2c36] flex items-center justify-center text-zinc-300 mb-4 shadow-inner">
            <iconify-icon icon="lucide:coffee" width="26" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">No classes today</h3>
          <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
            You have no lecture or lab sessions scheduled for today. Great time for independent study.
          </p>
          <button
            type="button"
            onClick={onViewCalendar}
            className="px-6 py-2.5 rounded-full bg-[#1a1a20] hover:bg-[#24242c] text-zinc-100 hover:text-white border border-zinc-700/80 hover:border-zinc-500 text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95"
          >
            <iconify-icon icon="lucide:calendar-days" width="16" />
            <span>Open Calendar</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {classes.map((cls, idx) => {
            const isCurrent = cls.status === 'current';
            const isPast = cls.status === 'past';
            const isLast = idx === classes.length - 1;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSession(cls)}
                className="relative w-full text-left flex items-start gap-4 py-3.5 sm:py-4 px-3.5 sm:px-4 -mx-3.5 rounded-2xl hover:bg-[#18181c] transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
              >
                {/* Timeline Track Node & Rail Line */}
                <div className="flex flex-col items-center self-stretch shrink-0 pt-1">
                  {/* Node Dot */}
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      isCurrent
                        ? 'border-[2px] border-[#38bdf8] bg-[#101012]'
                        : isPast
                        ? 'border-[2px] border-zinc-700 bg-zinc-800'
                        : 'border-[2px] border-[#2e2e36] bg-[#101012] group-hover:border-zinc-500'
                    }`}
                  >
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                    )}
                  </div>

                  {/* Connecting Rail Line */}
                  {!isLast && (
                    <div className="w-[2px] bg-[#27272e] flex-1 my-1" />
                  )}
                </div>

                {/* Class Info */}
                <div className="flex-1 min-w-0 pb-1">
                  {/* Time & Status */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className={`text-[13.5px] sm:text-[14px] font-bold tracking-tight tabular-nums ${
                        isCurrent ? 'text-[#38bdf8]' : isPast ? 'text-zinc-400' : 'text-zinc-100'
                      }`}
                    >
                      {cls.time}
                    </span>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs sm:text-[12.5px] font-bold bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 flex items-center gap-1">
                        Next Up
                      </span>
                    )}
                    {isPast && (isAllFinished || isInProgress) && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs sm:text-[12.5px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                        Attended
                      </span>
                    )}
                  </div>

                  {/* Class Title */}
                  <h3
                    className={`text-[16px] sm:text-[16.5px] font-bold transition-colors leading-snug tracking-tight mb-1.5 ${
                      isPast
                        ? 'text-zinc-400 group-hover:text-zinc-200'
                        : 'text-white group-hover:text-zinc-200'
                    }`}
                  >
                    {cls.title}
                  </h3>

                  {/* Tags & Room / Prof */}
                  <div className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] text-zinc-300 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11.5px] sm:text-xs font-bold uppercase tracking-wider border ${getSubjectStyle(
                        cls.subject
                      )}`}
                    >
                      {cls.subject}
                    </span>
                    {cls.room && (
                      <span className="flex items-center gap-1.5 font-medium text-zinc-200 truncate">
                        <iconify-icon icon="lucide:map-pin" width="14" className="text-cyan-400 shrink-0" />
                        <span>{cls.room}</span>
                      </span>
                    )}
                    {cls.professor && (
                      <>
                        <span className="text-textSubtle">•</span>
                        <span className="flex items-center gap-1.5 text-zinc-300 font-medium truncate">
                          <iconify-icon icon="lucide:user" width="14" className="text-zinc-400 shrink-0" />
                          <span>{cls.professor}</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Chevron */}
                <div className="flex items-center self-center shrink-0 pl-1">
                  <iconify-icon
                    icon="lucide:chevron-right"
                    width="18"
                    className="text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};
