import React, { useState, useEffect } from 'react';
import { KpiCards } from './KpiCards';
import { UpcomingAssignments } from './UpcomingAssignments';
import { TodayClasses } from './TodayClasses';
import { TodayTasks } from './TodayTasks';
import { MiniCalendar } from './MiniCalendar';
import { NotificationDropdown } from '../notifications/NotificationDropdown';
import type { SessionData, TaskData, ExamData } from '../../types';

export type DashboardPreset =
  | 'normal'
  | 'in-progress'
  | 'free-day'
  | 'all-done'
  | 'no-classes'
  | 'no-tasks'
  | 'no-exams';

interface DashboardViewProps {
  onOpenNewTask: () => void;
  onSelectTask: (task: TaskData) => void;
  onSelectExam: (exam: ExamData) => void;
  onSelectSession: (session: SessionData) => void;
  onNavigateToCalendar: () => void;
  onNavigateToTasks: () => void;
  onNavigateToNotifications?: () => void;
  mockEmpty?: boolean;
  initialPreset?: DashboardPreset;
}

const parsePresetFromUrl = (): DashboardPreset => {
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const d = p.get('dashboard') || p.get('dash') || '';
  if (d === 'in-progress' || d === 'midday' || d === '2-4' || d === 'progress') return 'in-progress';
  if (d === 'free-day' || d === 'empty' || (p.get('classes') === '0' && p.get('tasks') === '0')) return 'free-day';
  if (d === 'all-done' || p.get('tasks') === 'done') return 'all-done';
  if (d === 'no-classes' || p.get('classes') === '0') return 'no-classes';
  if (d === 'no-tasks' || p.get('tasks') === '0') return 'no-tasks';
  if (d === 'no-exams' || p.get('exams') === '0') return 'no-exams';

  // Support legacy ?state=
  const s = p.get('state');
  if (s === 'empty-dashboard') return 'free-day';
  if (s === 'all-done') return 'all-done';

  return 'normal';
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenNewTask,
  onSelectTask,
  onSelectExam,
  onSelectSession,
  onNavigateToCalendar,
  onNavigateToTasks,
  onNavigateToNotifications,
  mockEmpty = false,
  initialPreset,
}) => {
  const [currentPreset, setCurrentPreset] = useState<DashboardPreset>(() => {
    if (initialPreset) return initialPreset;
    if (mockEmpty) return 'free-day';
    return parsePresetFromUrl();
  });

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('dropdown') === 'notifications' || p.get('dropdown') === 'notif';
    }
    return false;
  });
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPreset(parsePresetFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Derived state mapping for child widgets
  const examState =
    currentPreset === 'free-day' || currentPreset === 'no-exams' ? 'empty' : 'urgent';
  const sessionState =
    currentPreset === 'free-day' || currentPreset === 'no-classes'
      ? 'empty'
      : currentPreset === 'all-done'
      ? 'finished'
      : currentPreset === 'in-progress'
      ? 'midday'
      : 'upcoming';
  const taskState =
    currentPreset === 'free-day' || currentPreset === 'no-tasks'
      ? 'empty'
      : currentPreset === 'all-done'
      ? 'all-done'
      : 'active';

  const classesMockState =
    currentPreset === 'free-day' || currentPreset === 'no-classes'
      ? 'empty'
      : currentPreset === 'all-done'
      ? 'finished'
      : currentPreset === 'in-progress'
      ? 'in-progress'
      : 'normal';

  const tasksMockState =
    currentPreset === 'free-day' || currentPreset === 'no-tasks'
      ? 'empty'
      : currentPreset === 'all-done'
      ? 'all-done'
      : currentPreset === 'in-progress'
      ? 'in-progress'
      : 'normal';

  const examsMockEmpty =
    mockEmpty || currentPreset === 'free-day' || currentPreset === 'no-exams';

  return (
    <div id="page-dashboard" className="flex flex-col h-full w-full">
      {/* Pinned Top Header */}
      <header className="px-4 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderPanel bg-panel/85 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1.5 sm:mb-2">
            Overview
          </h1>
          <p className="text-sm font-medium text-zinc-400">
            Your daily schedule, urgent deadlines, and academic overview.
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center relative group cursor-pointer ${
                isNotificationsOpen
                  ? 'border-[#38bdf8] bg-cardHover text-white'
                  : 'border-borderPanel bg-cardBg hover:bg-cardHover text-zinc-300 hover:text-white hover:border-zinc-500'
              }`}
              aria-label="Notifications"
              title={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
            >
              <iconify-icon
                icon="lucide:bell"
                width="16"
                className="transition-transform group-hover:rotate-12 duration-200"
              />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-cardBg" />
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotificationsOpen}
              onClose={() => {
                setIsNotificationsOpen(false);
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href);
                  if (url.searchParams.has('dropdown')) {
                    url.searchParams.delete('dropdown');
                    window.history.replaceState({}, '', url.toString());
                  }
                }
              }}
              onUnreadCountChange={setUnreadCount}
              onNavigateToNotifications={onNavigateToNotifications}
            />
          </div>

          <button
            type="button"
            onClick={onOpenNewTask}
            className="bg-white hover:bg-zinc-200 text-black px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <iconify-icon icon="lucide:plus" width="16" />
            <span>New Task</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 pb-24 md:pb-10 flex flex-col gap-6 sm:gap-8 w-full scrollbar-hide">
        {/* KPI Cards Row */}
        <KpiCards
          examState={examState}
          sessionState={sessionState}
          taskState={taskState}
          onSelectExam={() =>
            onSelectExam({
              id: 'exam-alg-lin',
              title: 'Algèbre Linéaire',
              subject: 'Algèbre',
              subjectColor: '#ef4444',
              boxColor: '#ef4444',
              timeAndPlace: 'Salle Amphi B • 08:30 - 11:30',
              countdown: 'In 2 days',
              isUrgent: true,
              duration: '3 hours',
              dueDate: 'In 2 days',
              priority: 'High',
              date: 'Thursday 15 May',
              time: '08:30 - 11:30',
              room: 'Salle Amphi B',
              coefficient: 4,
              type: 'DS',
              chapters: [
                { number: 1, title: 'Espaces Vectoriels', level: 'mastered' },
                { number: 2, title: 'Applications Linéaires', level: 'mastered' },
                { number: 3, title: 'Matrices & Déterminants', level: 'intermediate' },
                { number: 4, title: 'Réduction des Endomorphismes', level: 'beginner' },
              ],
            })
          }
          onSelectSession={() =>
            onSelectSession(
              currentPreset === 'in-progress'
                ? {
                    title: 'Thermodynamics Lecture',
                    subject: 'Physique',
                    subjectColor: '#38bdf8',
                    boxColor: '#38bdf8',
                    time: '14:00 - 15:30',
                    date: 'Today',
                    room: 'Amphi Curie',
                    professor: 'Dr. Moreau',
                    status: 'current',
                    type: 'Lecture',
                    notes: [
                      'Review Carnot cycle theorem and entropy formulas',
                      'Submit lab measurements worksheet',
                    ],
                  }
                : {
                    title: 'Mathematics (Calculus)',
                    subject: 'Mathematics',
                    subjectColor: '#38bdf8',
                    boxColor: '#38bdf8',
                    time: '11:00 AM - 12:30 PM',
                    date: 'Today',
                    room: 'Room 27',
                    professor: 'Prof. Laurent Schwartz',
                    status: 'current',
                    type: 'Lecture',
                    notes: [
                      'Bring course handout & TD sheet #4',
                      'Review Leibniz integration formula beforehand',
                    ],
                  }
            )
          }
          onNavigateToTasks={onNavigateToTasks}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
            <TodayClasses
              onSelectSession={onSelectSession}
              onViewCalendar={onNavigateToCalendar}
              mockState={classesMockState}
              mockEmpty={classesMockState === 'empty'}
            />
            <TodayTasks
              onSelectTask={onSelectTask}
              onViewAllTasks={onNavigateToTasks}
              onOpenNewTask={onOpenNewTask}
              mockState={tasksMockState}
              mockEmpty={tasksMockState === 'empty'}
            />
          </div>

          <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
            <UpcomingAssignments
              onSelectExam={onSelectExam}
              onSelectTask={onSelectTask}
              onViewAllTasks={onNavigateToCalendar}
              mockEmpty={examsMockEmpty}
            />
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};
