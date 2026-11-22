import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { MonthView } from './MonthView';
import type { CalendarViewType, SessionData, TaskData } from '../../types';

export type CalendarMockState = 'normal' | 'empty' | 'completed' | 'exams';

interface CalendarViewProps {
  currentView: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  onOpenNewSession: () => void;
  onSelectSession: (session: SessionData) => void;
  onImport?: (data: { sessions?: SessionData[]; tasks?: TaskData[] }) => void;
  onOpenAiSuggest?: () => void;
  onOpenNotifications?: () => void;
  mockState?: CalendarMockState;
}

const parseMockStateFromUrl = (): CalendarMockState => {
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const cal = (p.get('calendar') || p.get('cal') || p.get('state') || '').toLowerCase();
  if (cal === 'empty' || cal === 'free' || cal === 'freeday' || cal === 'free-day') return 'empty';
  if (cal === 'completed' || cal === 'all-done' || cal === 'done' || cal === 'finished') return 'completed';
  if (cal === 'exams' || cal === 'exam' || cal === 'exam-week' || cal === 'examweek') return 'exams';
  return 'normal';
};

export const CalendarView: React.FC<CalendarViewProps> = ({
  currentView,
  onViewChange,
  onOpenNewSession,
  onSelectSession,
  onImport,
  onOpenAiSuggest,
  onOpenNotifications,
  mockState,
}) => {
  const [periodOffset, setPeriodOffset] = useState(0);
  const activeMockState = mockState || parseMockStateFromUrl();

  // Reset offset when changing view mode (Day / Week / Month)
  useEffect(() => {
    setPeriodOffset(0);
  }, [currentView]);

  return (
    <div className="flex-1 min-h-0 min-w-0 flex flex-col h-full w-full overflow-hidden">
      <CalendarHeader
        currentView={currentView}
        onViewChange={onViewChange}
        onOpenNewSession={onOpenNewSession}
        onImport={onImport}
        onOpenAiSuggest={onOpenAiSuggest}
        onOpenNotifications={onOpenNotifications}
        periodOffset={periodOffset}
        onPrevPeriod={() => setPeriodOffset((p) => p - 1)}
        onNextPeriod={() => setPeriodOffset((p) => p + 1)}
        onSelectPeriodOffset={(offset) => setPeriodOffset(offset)}
      />
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {currentView === 'day' && (
          <DayView
            onSelectSession={onSelectSession}
            onOpenNewSession={onOpenNewSession}
            mockState={activeMockState}
            periodOffset={periodOffset}
            onPrevDay={() => setPeriodOffset((p) => p - 1)}
            onNextDay={() => setPeriodOffset((p) => p + 1)}
            onSelectDayOffset={(offset) => setPeriodOffset(offset)}
          />
        )}
        {currentView === 'week' && (
          <WeekView
            onSelectSession={onSelectSession}
            onOpenNewSession={onOpenNewSession}
            mockState={activeMockState}
            periodOffset={periodOffset}
          />
        )}
        {currentView === 'month' && (
          <MonthView
            onSelectSession={onSelectSession}
            onOpenNewSession={onOpenNewSession}
            mockState={activeMockState}
            periodOffset={periodOffset}
          />
        )}
      </div>
    </div>
  );
};
