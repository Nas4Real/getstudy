import React from 'react';
import type { SessionData } from '../../types';

interface MonthViewProps {
  onSelectSession?: (session: SessionData) => void;
  onOpenNewSession?: () => void;
  mockState?: 'normal' | 'empty' | 'completed' | 'exams';
  periodOffset?: number;
}

interface MonthEventItem {
  title: string;
  label: string;
  subject: string;
  time: string;
  room: string;
  professor: string;
  dotClass: string;
  completed?: boolean;
  isExam?: boolean;
}

interface MonthCell {
  key: string;
  dayNum: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dateLabel: string;
  event?: MonthEventItem;
}

const WEEKDAY_HEADERS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTH_FULL_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const getMonthEvent = (
  periodOffset: number,
  dayNum: number,
  isCompletedState: boolean,
  isExamsState: boolean
): MonthEventItem | undefined => {
  if (periodOffset === 0) {
    if (dayNum === 7) {
      return {
        title: 'Topologie EVN',
        label: 'Topologie EVN',
        subject: 'Analyse',
        time: '10:00 - 11:15',
        room: 'Class 21',
        professor: 'Prof. Cauchy',
        dotClass: 'bg-analyse',
        completed: isCompletedState,
      };
    }
    if (dayNum === 8) {
      return {
        title: isExamsState ? 'DS 3 : Algèbre Linéaire' : 'Physique',
        label: isExamsState ? 'DS 3 Algèbre' : 'Physique',
        subject: isExamsState ? 'Algèbre' : 'Physique',
        time: isExamsState ? '08:00 - 11:00' : '14:00 - 15:15',
        room: isExamsState ? 'Amphi Schwartz' : 'Lab 2',
        professor: isExamsState ? 'Prof. Laurent Schwartz' : 'Prof. Maxwell',
        dotClass: isExamsState ? 'bg-rose-500' : 'bg-physique',
        isExam: isExamsState,
      };
    }
    return undefined;
  }

  if (periodOffset < 0) {
    if (dayNum === 9) {
      return {
        title: 'Cinématique PFD',
        label: 'Cinématique PFD',
        subject: 'Mécanique',
        time: '14:00 - 15:40',
        room: 'Lab 3',
        professor: 'Prof. Newton',
        dotClass: 'bg-mecanique',
        completed: true,
      };
    }
    if (dayNum === 22) {
      return {
        title: 'Intégration Théorèmes',
        label: 'Analyse TD',
        subject: 'Analyse',
        time: '08:00 - 09:50',
        room: 'Room 201',
        professor: 'Prof. Cauchy',
        dotClass: 'bg-analyse',
        completed: true,
      };
    }
    return undefined;
  }

  if (dayNum === 5) {
    return {
      title: 'Révision Endomorphismes',
      label: 'Révision Algèbre',
      subject: 'Algèbre',
      time: '09:00 - 11:00',
      room: 'Amphi 27',
      professor: 'Prof. Jean Dieudonné',
      dotClass: 'bg-algebre',
    };
  }
  if (dayNum === 16) {
    return {
      title: 'Concours Blanc : Physique',
      label: 'Concours Blanc',
      subject: 'Physique',
      time: '08:00 - 12:00',
      room: 'Amphi Curie',
      professor: 'Prof. Miller',
      dotClass: 'bg-physique',
    };
  }
  return undefined;
};

const buildMonthCells = (
  periodOffset: number,
  isEmpty: boolean,
  isCompleted: boolean,
  isExams: boolean
): { cells: MonthCell[]; rowsCount: 5 | 6 } => {
  const firstOfMonth = new Date(2026, 4 + periodOffset, 1);
  const year = firstOfMonth.getFullYear();
  const month = firstOfMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingCount = (firstOfMonth.getDay() + 6) % 7;
  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = leadingCount + daysInMonth > 35 ? 42 : 35;
  const rowsCount: 5 | 6 = totalCells === 42 ? 6 : 5;

  const cells: MonthCell[] = [];

  for (let i = 0; i < totalCells; i++) {
    if (i < leadingCount) {
      const dayNum = prevMonthDays - leadingCount + i + 1;
      cells.push({
        key: `prev-${year}-${month}-${dayNum}`,
        dayNum,
        isCurrentMonth: false,
        isToday: false,
        dateLabel: '',
      });
    } else if (i < leadingCount + daysInMonth) {
      const dayNum = i - leadingCount + 1;
      const cellDate = new Date(year, month, dayNum);
      const dateLabel = `${MONTH_FULL_DAYS[cellDate.getDay()]} ${dayNum} ${MONTH_NAMES[month]}`;
      cells.push({
        key: `cur-${year}-${month}-${dayNum}`,
        dayNum,
        isCurrentMonth: true,
        isToday: periodOffset === 0 && dayNum === 7,
        dateLabel,
        event: isEmpty ? undefined : getMonthEvent(periodOffset, dayNum, isCompleted, isExams),
      });
    } else {
      const dayNum = i - leadingCount - daysInMonth + 1;
      cells.push({
        key: `next-${year}-${month}-${dayNum}`,
        dayNum,
        isCurrentMonth: false,
        isToday: false,
        dateLabel: '',
      });
    }
  }

  return { cells, rowsCount };
};

export const MonthView: React.FC<MonthViewProps> = ({
  onSelectSession,
  mockState = 'normal',
  periodOffset = 0,
}) => {
  const isEmpty = mockState === 'empty';
  const isCompleted = mockState === 'completed';
  const isExams = mockState === 'exams';

  const { cells, rowsCount } = buildMonthCells(periodOffset, isEmpty, isCompleted, isExams);

  return (
    <div id="view-month" className="flex-1 overflow-x-auto overflow-y-auto p-2 sm:p-4 md:p-8 pb-20 md:pb-8 scrollbar-hide flex flex-col">
      {isExams && periodOffset === 0 && (
        <div className="mb-3.5 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 text-rose-300 shrink-0 animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <iconify-icon icon="lucide:alert-circle" width="20" className="text-rose-400 shrink-0" />
            <div className="min-w-0">
              <div className="font-bold text-white text-[14px] sm:text-[14.5px] tracking-tight leading-none">
                May 2026 • Examination Period Active
              </div>
              <div className="text-[12.5px] sm:text-[13px] font-semibold text-rose-200 mt-1 leading-tight truncate">
                DS 3 Algèbre Linéaire (Vendredi 8 Mai) & Concours Blanc Physique (Samedi 9 Mai).
              </div>
            </div>
          </div>
          <span className="text-[11px] text-rose-300 font-bold px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/35 shrink-0">
            Exams Active
          </span>
        </div>
      )}

      <div className="min-w-[650px] flex-1 bg-cardBg rounded-xl border border-borderPanel overflow-hidden shadow-inner flex flex-col">
        <div className="grid grid-cols-7 border-b border-borderPanel bg-panel shrink-0">
          {WEEKDAY_HEADERS.map((day, idx) => (
            <div
              key={day}
              className={`py-3 text-center ${idx < 6 ? 'border-r border-borderPanel' : ''}`}
            >
              <span className="text-[12px] font-bold text-textSubtle uppercase tracking-widest">
                {day}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`flex-1 grid grid-cols-7 bg-panel ${
            rowsCount === 6 ? 'grid-rows-6' : 'grid-rows-5'
          }`}
        >
          {cells.map((cell, idx) => {
            const isLastCol = idx % 7 === 6;
            const borderCol = isLastCol ? '' : 'border-r';

            if (!cell.isCurrentMonth) {
              return (
                <div
                  key={cell.key}
                  className={`p-2 ${borderCol} border-b border-borderPanel opacity-60 bg-black/20`}
                >
                  <span className="text-[14px] font-bold text-zinc-400 pl-1">
                    {cell.dayNum}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={cell.key}
                className={`p-2 ${borderCol} border-b flex flex-col gap-1 cursor-pointer ${
                  cell.isToday
                    ? 'border-[#3f3f46] bg-cardBg shadow-inner relative'
                    : 'border-borderPanel hover:bg-cardBg group'
                }`}
              >
                {cell.isToday ? (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-bold bg-white text-black w-6 h-6 flex items-center justify-center rounded-full">
                      {cell.dayNum}
                    </span>
                    {cell.event && <div className="h-1.5 w-1.5 rounded-full bg-analyse" />}
                  </div>
                ) : (
                  <span className="text-[14px] font-bold text-zinc-400 pl-1 group-hover:text-white">
                    {cell.dayNum}
                  </span>
                )}

                {cell.event && (
                  <div
                    onClick={() =>
                      onSelectSession?.({
                        title: cell.event!.title,
                        subject: cell.event!.subject,
                        time: cell.event!.time,
                        date: cell.dateLabel,
                        room: cell.event!.room,
                        professor: cell.event!.professor,
                      })
                    }
                    className={`event-card px-3 py-1.5 flex items-center gap-2 ${cell.isToday ? '' : 'mt-1'} ${
                      cell.event.isExam
                        ? 'bg-rose-500/15 border border-rose-500/40 text-rose-200'
                        : cell.event.completed
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : cell.isToday
                        ? 'bg-[#001f29] border border-analyse/40'
                        : ''
                    }`}
                  >
                    {cell.event.completed ? (
                      <iconify-icon icon="lucide:check" width="12" className="text-emerald-400 shrink-0" />
                    ) : (
                      <span className={`dot ${cell.event.dotClass} shrink-0`} />
                    )}
                    <span className="text-[12px] font-bold text-white truncate tracking-tight">
                      {cell.event.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
