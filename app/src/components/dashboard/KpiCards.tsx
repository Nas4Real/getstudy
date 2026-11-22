import React from 'react';

interface KpiCardsProps {
  onSelectExam?: () => void;
  onSelectSession?: () => void;
  onNavigateToTasks?: () => void;
  examState?: 'urgent' | 'empty';
  sessionState?: 'upcoming' | 'midday' | 'finished' | 'empty';
  taskState?: 'active' | 'all-done' | 'empty';
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  onSelectExam,
  onSelectSession,
  onNavigateToTasks,
  examState = 'urgent',
  sessionState = 'upcoming',
  taskState = 'active',
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
      {/* Card 1: Upcoming Exam */}
      {examState === 'empty' ? (
        <button
          type="button"
          onClick={onSelectExam}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-zinc-500 hover:bg-[#16161b] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Upcoming Exam
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50 inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:calendar-check" width="13" />
              <span>None Soon</span>
            </span>
          </div>

          <div className="my-3 flex flex-col gap-1">
            <div className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-zinc-200 transition-colors">
              No Exams Due
            </div>
            <div className="text-sm font-medium text-zinc-400">
              No tests scheduled for the next 14 days
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] text-zinc-300 pt-3.5 border-t border-[#1f1f26] w-full">
            <span className="flex items-center gap-1.5 font-medium text-zinc-300">
              <iconify-icon icon="lucide:smile" width="15" className="text-emerald-400 shrink-0" />
              <span>All clear • Keep up pace</span>
            </span>
            <div className="flex items-center gap-1 font-bold text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0">
              <span>Calendar</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={onSelectExam}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-red-500/50 hover:bg-[#171114] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Upcoming Exam
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:alert-circle" width="13" />
              <span>In 2 days</span>
            </span>
          </div>

          <div className="my-3 flex flex-col gap-1">
            <div className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-red-200 transition-colors">
              Algèbre Linéaire
            </div>
            <div className="flex items-center gap-2 text-sm flex-wrap text-zinc-300">
              <span className="font-bold text-red-400">DS 3</span>
              <span className="text-textSubtle">•</span>
              <span className="font-medium text-zinc-300">Coeff 4</span>
              <span className="text-textSubtle">•</span>
              <span className="font-medium text-zinc-300">3 Hours</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <div className="flex items-center gap-2 text-[13px] flex-wrap text-zinc-300">
              <span className="flex items-center gap-1.5 font-medium">
                <iconify-icon icon="lucide:map-pin" width="14" className="text-red-400 shrink-0" />
                <span>Amphi Schwartz</span>
              </span>
              <span className="text-textSubtle">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <iconify-icon icon="lucide:clock" width="13" className="text-red-400 shrink-0" />
                <span>08:00 AM</span>
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold text-red-400 group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Details</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      )}

      {/* Card 2: Next Session */}
      {sessionState === 'empty' ? (
        <button
          type="button"
          onClick={onSelectSession}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-amber-500/50 hover:bg-[#161410] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Today's Schedule
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:coffee" width="13" />
              <span>Free Day</span>
            </span>
          </div>

          <div className="my-3 flex flex-col gap-1">
            <div className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-amber-200 transition-colors">
              No Classes Today
            </div>
            <div className="text-sm font-medium text-zinc-400">
              Independent study or rest period
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <div className="flex items-center gap-2 text-[13px] flex-wrap text-zinc-300">
              <span className="flex items-center gap-1.5 font-medium">
                <iconify-icon icon="lucide:calendar" width="14" className="text-amber-400 shrink-0" />
                <span>Next class tomorrow</span>
              </span>
              <span className="text-textSubtle">•</span>
              <span className="flex items-center gap-1.5 font-medium text-amber-300">
                <iconify-icon icon="lucide:clock" width="13" className="text-amber-400 shrink-0" />
                <span>09:00 AM</span>
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Calendar</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      ) : sessionState === 'finished' ? (
        <button
          type="button"
          onClick={onSelectSession}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-emerald-500/50 hover:bg-[#101713] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Today's Schedule
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:check-check" width="13" />
              <span>All Done</span>
            </span>
          </div>

          <div className="my-3 flex flex-col gap-1">
            <div className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-emerald-200 transition-colors">
              Classes Finished
            </div>
            <div className="text-sm font-medium text-zinc-400">
              4 of 4 classes completed for today
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <iconify-icon icon="lucide:sparkles" width="14" />
              <span>Day schedule complete</span>
            </span>
            <div className="flex items-center gap-1 font-bold text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Schedule</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      ) : sessionState === 'midday' ? (
        <button
          type="button"
          onClick={onSelectSession}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-sky-500/50 hover:bg-[#10151a] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Next Session
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Starts in 45m</span>
            </span>
          </div>

          <div className="my-3 flex flex-col gap-1">
            <div className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-sky-200 transition-colors">
              Thermodynamics Lecture
            </div>
            <div className="flex items-center gap-2 text-sm flex-wrap text-zinc-300">
              <span className="font-bold text-sky-400">Lecture</span>
              <span className="text-textSubtle">•</span>
              <span className="font-medium text-zinc-300">Dr. Moreau</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <span className="flex items-center gap-2 text-zinc-300 font-medium">
              <iconify-icon icon="lucide:check-circle-2" width="15" className="text-sky-400 shrink-0" />
              <strong className="text-white">2 attended</strong>
              <span className="text-textSubtle">•</span>
              <strong className="text-sky-300">2 upcoming</strong>
            </span>
            <div className="flex items-center gap-1 font-bold text-sky-400 group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Schedule</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={onSelectSession}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-sky-500/50 hover:bg-[#10151a] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Next Session
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>Starts in 25m</span>
            </span>
          </div>

          <div className="my-3 flex flex-col gap-1">
            <div className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-cyan-200 transition-colors">
              Mathematics (Calculus)
            </div>
            <div className="flex items-center gap-2 text-sm flex-wrap text-zinc-300">
              <span className="font-bold text-[#38bdf8]">Lecture</span>
              <span className="text-textSubtle">•</span>
              <span className="font-medium text-zinc-300">Dr. Laurent Schwartz</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <div className="flex items-center gap-2 text-[13px] flex-wrap text-zinc-300">
              <span className="flex items-center gap-1.5 font-medium">
                <iconify-icon icon="lucide:map-pin" width="14" className="text-[#38bdf8] shrink-0" />
                <span>Room 27</span>
              </span>
              <span className="text-textSubtle">•</span>
              <span className="flex items-center gap-1.5 font-medium text-cyan-200">
                <iconify-icon icon="lucide:clock" width="13" className="text-[#38bdf8] shrink-0" />
                <span>11:00 AM - 12:30 PM</span>
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold text-[#38bdf8] group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Schedule</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      )}

      {/* Card 3: Tasks */}
      {taskState === 'empty' ? (
        <button
          type="button"
          onClick={onNavigateToTasks}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-zinc-500 hover:bg-[#16161b] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Active Tasks
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50 inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:check-circle" width="13" />
              <span>All Clear</span>
            </span>
          </div>

          <div className="my-3 flex items-baseline gap-3">
            <div className="text-[28px] sm:text-3xl font-bold text-white leading-none tracking-tight tabular-nums group-hover:text-zinc-200 transition-colors">
              00
            </div>
            <div className="text-sm font-medium text-zinc-400">
              pending assignments
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <iconify-icon icon="lucide:sparkles" width="14" className="text-emerald-400 shrink-0" />
              <span>No deadlines due today</span>
            </span>
            <div className="flex items-center gap-1 font-bold text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>View Tasks</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      ) : taskState === 'all-done' ? (
        <button
          type="button"
          onClick={onNavigateToTasks}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-emerald-500/50 hover:bg-[#101713] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Active Tasks
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:check-check" width="13" />
              <span>100% Done</span>
            </span>
          </div>

          <div className="my-3 flex items-baseline gap-3">
            <div className="text-[28px] sm:text-3xl font-bold text-white leading-none tracking-tight tabular-nums group-hover:text-emerald-200 transition-colors">
              00
            </div>
            <div className="text-sm font-semibold text-emerald-400">
              pending (4 completed)
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <iconify-icon icon="lucide:check-circle-2" width="14" />
              <span>You're completely caught up</span>
            </span>
            <div className="flex items-center gap-1 font-bold text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>View Tasks</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNavigateToTasks}
          className="w-full text-left bg-[#101012] border border-[#25252b] rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-amber-500/50 hover:bg-[#161410] transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[168px]"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Active Tasks
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:clock" width="13" />
              <span>2 due today</span>
            </span>
          </div>

          <div className="my-3 flex items-baseline gap-3">
            <div className="text-[28px] sm:text-3xl font-bold text-white leading-none tracking-tight tabular-nums group-hover:text-amber-200 transition-colors">
              04
            </div>
            <div className="text-sm font-medium text-zinc-300">
              pending assignments
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-[13px] pt-3.5 border-t border-[#1f1f26] w-full">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <strong className="text-amber-300 font-semibold">1 urgent</strong>
              <span className="text-textSubtle">•</span>
              <span className="text-zinc-300">3 normal</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Tasks</span>
              <iconify-icon icon="lucide:chevron-right" width="14" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
