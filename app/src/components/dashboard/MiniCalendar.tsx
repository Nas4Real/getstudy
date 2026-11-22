import React from 'react';

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isSelected?: boolean;
  event?: 'exam' | 'task' | 'holiday';
}

const DAYS_OF_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const CALENDAR_DAYS: CalendarDay[] = [
  // Prev month: July
  { day: 27, isCurrentMonth: false },
  { day: 28, isCurrentMonth: false },
  { day: 29, isCurrentMonth: false },
  { day: 30, isCurrentMonth: false },
  { day: 31, isCurrentMonth: false },
  // August
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true },
  { day: 3, isCurrentMonth: true },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true },
  { day: 8, isCurrentMonth: true, event: 'task' },
  { day: 9, isCurrentMonth: true },
  { day: 10, isCurrentMonth: true, isSelected: true },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true, event: 'exam' },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true },
  { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true },
  { day: 20, isCurrentMonth: true },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true, event: 'holiday' },
  { day: 25, isCurrentMonth: true, event: 'holiday' },
  { day: 26, isCurrentMonth: true },
  { day: 27, isCurrentMonth: true },
  { day: 28, isCurrentMonth: true },
  { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true },
  { day: 31, isCurrentMonth: true },
  // Next month: September
  { day: 1, isCurrentMonth: false },
  { day: 2, isCurrentMonth: false },
  { day: 3, isCurrentMonth: false },
  { day: 4, isCurrentMonth: false },
  { day: 5, isCurrentMonth: false },
  { day: 6, isCurrentMonth: false },
];

export const MiniCalendar: React.FC = () => {
  return (
    <section className="bg-[#101012] border border-[#25252b] rounded-[24px] p-6 sm:p-7 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">August 2026</h3>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-9 h-9 rounded-xl hover:bg-[#1a1a20] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Previous month"
          >
            <iconify-icon icon="lucide:chevron-left" width="18" />
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-xl hover:bg-[#1a1a20] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Next month"
          >
            <iconify-icon icon="lucide:chevron-right" width="18" />
          </button>
        </div>
      </div>

      {/* Event Legend */}
      <div className="flex items-center gap-5 sm:gap-6 mb-5 text-[13.5px] sm:text-[14px] font-semibold text-zinc-200 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-500/30" />
          <span className="text-zinc-200">Exam</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] ring-2 ring-sky-500/30" />
          <span className="text-zinc-200">Task</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
          <span className="text-zinc-200">Holiday</span>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-xs sm:text-[13px] font-bold text-zinc-400 uppercase tracking-wider py-1.5"
          >
            {day}
          </div>
        ))}

        {/* Days grid */}
        {CALENDAR_DAYS.map((d, index) => {
          if (!d.isCurrentMonth) {
            return (
              <div key={index} className="flex justify-center py-1.5">
                <span className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[13px] sm:text-[13.5px] font-medium text-zinc-600 cursor-default select-none">
                  {d.day}
                </span>
              </div>
            );
          }

          if (d.isSelected) {
            return (
              <div key={index} className="flex justify-center py-1.5 relative">
                <button
                  type="button"
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[13.5px] sm:text-[14px] font-extrabold bg-white text-black shadow-md ring-4 ring-white/15 cursor-pointer hover:bg-zinc-200 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                  aria-label={`August ${d.day}, today`}
                >
                  {d.day}
                </button>
              </div>
            );
          }

          return (
            <div key={index} className="flex justify-center py-1.5 relative">
              <button
                type="button"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[13.5px] sm:text-[14px] font-semibold text-zinc-200 hover:bg-[#1c1c24] hover:text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                aria-label={`August ${d.day}`}
              >
                {d.day}
              </button>
              {d.event === 'exam' && (
                <span
                  className="absolute bottom-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#101012] shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                  title="Exam scheduled"
                />
              )}
              {d.event === 'task' && (
                <span
                  className="absolute bottom-1 w-2 h-2 rounded-full bg-[#38bdf8] ring-2 ring-[#101012] shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                  title="Task due"
                />
              )}
              {d.event === 'holiday' && (
                <span
                  className="absolute bottom-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#101012] shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                  title="Holiday"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
