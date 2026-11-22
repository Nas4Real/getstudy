import React, { useState } from 'react';
import type { CalendarViewType, SessionData, TaskData } from '../../types';
import { ImportJsonModal } from '../modals/ImportJsonModal';

interface CalendarHeaderProps {
  currentView: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  onOpenNewSession: () => void;
  onImport?: (data: { sessions?: SessionData[]; tasks?: TaskData[] }) => void;
  onOpenAiSuggest?: () => void;
  onOpenNotifications?: () => void;
  periodOffset?: number;
  onPrevPeriod?: () => void;
  onNextPeriod?: () => void;
  onSelectPeriodOffset?: (offset: number) => void;
}

const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentView,
  onViewChange,
  onOpenNewSession,
  onImport,
  periodOffset = 0,
  onPrevPeriod,
  onNextPeriod,
  onSelectPeriodOffset,
}) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('modal') === 'import-json' || p.get('modal') === 'import';
    }
    return false;
  });

  const getDateDisplay = () => {
    switch (currentView) {
      case 'day': {
        const d = new Date(2026, 4, 7 + periodOffset);
        return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
      }
      case 'week': {
        const start = new Date(2026, 4, 4 + periodOffset * 7);
        const end = new Date(2026, 4, 10 + periodOffset * 7);
        const startMonth = MONTH_NAMES[start.getMonth()];
        const endMonth = MONTH_NAMES[end.getMonth()];
        if (startMonth === endMonth) {
          return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${start.getFullYear()}`;
        }
        return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${end.getFullYear()}`;
      }
      case 'month': {
        const d = new Date(2026, 4 + periodOffset, 1);
        return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
      }
    }
  };

  return (
    <>
      <header className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-panel/85 backdrop-blur-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1.5 sm:mb-2">Calendar</h1>
          <p className="text-sm font-medium text-textMuted">Here's what's happening with your studies today.</p>
        </div>
      </header>

      <div className="px-4 sm:px-8 pb-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3 shrink-0 border-b border-borderPanel bg-panel/85 backdrop-blur-md">
        <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3 flex-wrap xl:flex-nowrap">
          <h2 id="calendar-title" className="text-base sm:text-[18px] font-bold text-zinc-100 flex items-center gap-2.5 min-w-0 tracking-tight">
            <iconify-icon icon="lucide:calendar" width="18" className="text-zinc-400" />
            <span>{getDateDisplay()}</span>
          </h2>
          {currentView === 'day' ? (
            <div className="flex items-center bg-cardBg border border-borderPanel rounded-xl p-1 shadow-sm gap-0.5">
              <button
                id="btn-prev-period"
                type="button"
                aria-label="Previous day"
                title="Previous day"
                onClick={onPrevPeriod}
                className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <iconify-icon icon="lucide:chevron-left" width="16" />
              </button>

              {(
                [
                  { label: 'Yesterday', offset: -1 },
                  { label: 'Today', offset: 0 },
                  { label: 'Tomorrow', offset: 1 },
                ] as const
              ).map((preset) => {
                const isSelected = periodOffset === preset.offset;
                return (
                  <button
                    key={preset.offset}
                    type="button"
                    onClick={() => onSelectPeriodOffset?.(preset.offset)}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#27272a] text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}

              <button
                id="btn-next-period"
                type="button"
                aria-label="Next day"
                title="Next day"
                onClick={onNextPeriod}
                className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <iconify-icon icon="lucide:chevron-right" width="16" />
              </button>
            </div>
          ) : (
            <div className="flex items-center bg-cardBg border border-borderPanel rounded-xl p-1 shadow-sm gap-1">
              <button
                id="btn-prev-period"
                type="button"
                aria-label="Previous period"
                title="Previous period"
                onClick={onPrevPeriod}
                className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <iconify-icon icon="lucide:chevron-left" width="16" />
              </button>

              {periodOffset !== 0 && (
                <button
                  type="button"
                  onClick={() => onSelectPeriodOffset?.(0)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Today
                </button>
              )}

              <button
                id="btn-next-period"
                type="button"
                aria-label="Next period"
                title="Next period"
                onClick={onNextPeriod}
                className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <iconify-icon icon="lucide:chevron-right" width="16" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-start sm:justify-end gap-2 sm:gap-2.5 flex-wrap xl:flex-nowrap min-w-0">
          <div className="flex items-center bg-cardBg border border-borderPanel rounded-xl p-1 shadow-sm">
            {(['day', 'week', 'month'] as CalendarViewType[]).map((view) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors cursor-pointer ${
                  currentView === view
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 min-w-0">
            {/* Import Timetable Button */}
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              id="cta-import-sessions"
              className="bg-cardHover hover:bg-[#27272a] text-zinc-200 hover:text-white border border-borderPanel px-3.5 sm:px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              title="Import timetable from JSON file"
            >
              <iconify-icon icon="lucide:upload" width="15" />
              <span>Import Timetable</span>
            </button>

            {/* New Session Button */}
            <button
              onClick={onOpenNewSession}
              id="cta-new-session"
              className="bg-white hover:bg-zinc-200 text-black px-4 sm:px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <iconify-icon icon="lucide:plus" width="15" />
              <span>New Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* JSON Import Modal */}
      <ImportJsonModal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            if (url.searchParams.has('modal')) {
              url.searchParams.delete('modal');
              window.history.replaceState({}, '', url.toString());
            }
          }
        }}
        onImport={(data) => {
          onImport?.(data);
        }}
      />
    </>
  );
};
