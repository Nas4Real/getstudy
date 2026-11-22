import React, { useState, useMemo } from 'react';
import type { SessionData, TaskData, ExamData } from '../../types';

export interface FullNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier this week';
  read: boolean;
  type: 'exam' | 'task' | 'session' | 'ai' | 'storage';
  subject?: string;
  actionLabel?: string;
  actionTarget?: 'exam' | 'task' | 'session' | 'ai' | 'settings';
}

const INITIAL_FULL_NOTIFICATIONS: FullNotificationItem[] = [
  {
    id: 'fn-1',
    title: 'Upcoming Exam in 2 Days',
    message: 'Algèbre Linéaire midterm scheduled at 09:00 AM in Room 27. Ensure you have revised Chapter 3 & 4.',
    timestamp: '10 min ago',
    dateGroup: 'Today',
    read: false,
    type: 'exam',
    subject: 'Algèbre',
    actionLabel: 'View Exam Sheet',
    actionTarget: 'exam',
  },
  {
    id: 'fn-2',
    title: 'Assignment Due Tonight',
    message: '"Complete Chapter 4 Exercises" deadline is at 23:59. 2 subtasks remaining.',
    timestamp: '1 hour ago',
    dateGroup: 'Today',
    read: false,
    type: 'task',
    subject: 'Analyse',
    actionLabel: 'Open Task',
    actionTarget: 'task',
  },
  {
    id: 'fn-3',
    title: 'Next Class: Physics (Mechanics)',
    message: 'Starts at 11:00 AM in Lab B-2 with Prof. Miller. Bring your lab booklet.',
    timestamp: '3 hours ago',
    dateGroup: 'Today',
    read: false,
    type: 'session',
    subject: 'Physique',
    actionLabel: 'Class Details',
    actionTarget: 'session',
  },
  {
    id: 'fn-4',
    title: 'Google Drive Storage Synced',
    message: 'Successfully mirrored 14 documents and chapter revision summaries to /GetStudy folder.',
    timestamp: '5 hours ago',
    dateGroup: 'Today',
    read: true,
    type: 'storage',
    actionLabel: 'Storage Settings',
    actionTarget: 'settings',
  },
  {
    id: 'fn-5',
    title: 'AI Revision Strategy Ready',
    message: 'Your assistant prepared 2 high-yield revision slots for this weekend based on past exam weights.',
    timestamp: 'Yesterday at 16:30',
    dateGroup: 'Yesterday',
    read: true,
    type: 'ai',
    actionLabel: 'Review AI Plan',
    actionTarget: 'ai',
  },
  {
    id: 'fn-6',
    title: 'New Chapter Added: Séries Entières',
    message: 'Prof. Schwartz published course notes and 8 practice problems in Analyse.',
    timestamp: 'Yesterday at 10:15',
    dateGroup: 'Yesterday',
    read: true,
    type: 'session',
    subject: 'Analyse',
    actionLabel: 'Open Chapter',
    actionTarget: 'session',
  },
  {
    id: 'fn-7',
    title: 'Exam Score Available: Physique TD 1',
    message: 'Your grade has been logged: 17.5 / 20. Class average: 13.8.',
    timestamp: '3 days ago',
    dateGroup: 'Earlier this week',
    read: true,
    type: 'exam',
    subject: 'Physique',
    actionLabel: 'View Report',
    actionTarget: 'exam',
  },
];

export type NotificationsMockState = 'normal' | 'empty' | 'all-read' | 'unread' | 'search-empty';

export const parseNotificationsMockStateFromUrl = (): NotificationsMockState => {
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const s = (p.get('notifications') || p.get('notif') || p.get('alerts') || '').toLowerCase();
  if (s === 'empty' || s === '0' || s === 'none' || s === 'inbox-zero') return 'empty';
  if (s === 'all-read' || s === 'read') return 'all-read';
  if (s === 'unread') return 'unread';
  if (s === 'search-empty' || s === 'no-results') return 'search-empty';
  if (p.get('unread') === 'true') return 'unread';
  return 'normal';
};

export const parseNotificationFilterFromUrl = (mockState: NotificationsMockState): 'all' | 'unread' | 'exam' | 'task' | 'session' | 'ai' => {
  if (mockState === 'unread') return 'unread';
  if (typeof window === 'undefined') return 'all';
  const p = new URLSearchParams(window.location.search);
  const f = (p.get('filter') || p.get('category') || p.get('tab') || p.get('notif') || '').toLowerCase();
  if (f === 'unread') return 'unread';
  if (f === 'exam' || f === 'exams') return 'exam';
  if (f === 'task' || f === 'tasks' || f === 'assignment' || f === 'assignments') return 'task';
  if (f === 'session' || f === 'sessions' || f === 'class' || f === 'classes') return 'session';
  if (f === 'ai' || f === 'strategy') return 'ai';
  return 'all';
};

export const parseNotificationSearchFromUrl = (mockState: NotificationsMockState): string => {
  if (mockState === 'search-empty') return 'NonExistentNotification';
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams(window.location.search);
  return p.get('q') || p.get('search') || '';
};

export interface NotificationsViewProps {
  onBack?: () => void;
  onOpenExamDetails?: (exam: ExamData) => void;
  onOpenTaskDetails?: (task: TaskData) => void;
  onOpenSessionDetails?: (session: SessionData) => void;
  onNavigateToAi?: () => void;
  onNavigateToSettings?: () => void;
  onOpenPreferences?: () => void;
  onShowToast?: (msg: string) => void;
  mockState?: NotificationsMockState;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  onBack,
  onOpenExamDetails,
  onOpenTaskDetails,
  onOpenSessionDetails,
  onNavigateToAi,
  onNavigateToSettings,
  onOpenPreferences,
  onShowToast,
  mockState,
}) => {
  const initialMockState = mockState || parseNotificationsMockStateFromUrl();

  const getInitialNotifications = (): FullNotificationItem[] => {
    if (initialMockState === 'empty') return [];
    if (initialMockState === 'all-read') {
      return INITIAL_FULL_NOTIFICATIONS.map((n) => ({ ...n, read: true }));
    }
    return INITIAL_FULL_NOTIFICATIONS;
  };

  const [notifications, setNotifications] = useState<FullNotificationItem[]>(getInitialNotifications);
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'exam' | 'task' | 'session' | 'ai'>(() => parseNotificationFilterFromUrl(initialMockState));
  const [searchQuery, setSearchQuery] = useState(() => parseNotificationSearchFromUrl(initialMockState));

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onShowToast?.('All notifications marked as read');
  };

  const toggleReadStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    onShowToast?.('Notification dismissed');
  };

  const handleFilterChange = (tabId: 'all' | 'unread' | 'exam' | 'task' | 'session' | 'ai') => {
    setFilterType(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'notifications');
      if (tabId === 'all') {
        url.searchParams.delete('filter');
        url.searchParams.delete('category');
        url.searchParams.delete('unread');
        url.searchParams.delete('notifications');
        url.searchParams.delete('notif');
      } else if (tabId === 'unread') {
        url.searchParams.set('filter', 'unread');
        url.searchParams.delete('category');
        url.searchParams.delete('notifications');
        url.searchParams.delete('notif');
      } else {
        url.searchParams.set('category', tabId);
        url.searchParams.delete('filter');
        url.searchParams.delete('notifications');
        url.searchParams.delete('notif');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleActionClick = (n: FullNotificationItem) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
    );

    if (n.actionTarget === 'ai') {
      onNavigateToAi?.();
    } else if (n.actionTarget === 'settings') {
      onNavigateToSettings?.();
    } else if (n.actionTarget === 'exam' && onOpenExamDetails) {
      onOpenExamDetails({
        id: 'exam-sample',
        title: 'Algèbre Linéaire Midterm',
        subject: 'Algèbre',
        subjectColor: '#a855f7',
        dueDate: 'May 12, 2026',
        priority: 'High',
        date: 'May 12, 2026',
        time: '09:00 AM - 11:30 AM',
        room: 'Amphi 27',
        timeAndPlace: 'Amphi 27 • 09:00 AM',
        countdown: '2 days left',
        chapters: [
          { number: 1, title: 'Espaces Vectoriels', level: 'mastered' },
          { number: 2, title: 'Applications Linéaires', level: 'intermediate' },
        ],
      });
    } else if (n.actionTarget === 'task' && onOpenTaskDetails) {
      onOpenTaskDetails({
        id: 'task-sample',
        title: 'Complete Chapter 4 Exercises',
        subject: 'Analyse',
        subjectColor: '#06b6d4',
        dueDate: 'Tonight, 23:59',
        priority: 'High',
        description: 'Solve exercises 1 through 8 from tutorial sheet 4.',
      });
    } else if (n.actionTarget === 'session' && onOpenSessionDetails) {
      onOpenSessionDetails({
        id: 'session-sample',
        title: 'Physics (Mechanics)',
        subject: 'Physique',
        subjectColor: '#10b981',
        date: 'Today',
        time: '11:00 AM - 01:00 PM',
        room: 'Lab B-2',
        professor: 'Prof. Miller',
        description: 'Kinematics lab session and pendulum experiments.',
      });
    }
  };

  // Filtered list
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (filterType === 'unread' && n.read) return false;
      if (filterType !== 'all' && filterType !== 'unread' && n.type !== filterType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q) ||
          (n.subject && n.subject.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [notifications, filterType, searchQuery]);

  const groups: Array<'Today' | 'Yesterday' | 'Earlier this week'> = [
    'Today',
    'Yesterday',
    'Earlier this week',
  ];

  const getTypeMeta = (type: FullNotificationItem['type']) => {
    switch (type) {
      case 'exam':
        return {
          icon: 'lucide:alert-circle',
          badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
          accentColor: '#f43f5e',
          label: 'Exam Alert',
        };
      case 'task':
        return {
          icon: 'lucide:check-circle-2',
          badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
          accentColor: '#38bdf8',
          label: 'Assignment',
        };
      case 'session':
        return {
          icon: 'lucide:clock',
          badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
          accentColor: '#34d399',
          label: 'Class & Lab',
        };
      case 'ai':
        return {
          icon: 'lucide:sparkles',
          badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
          accentColor: '#c084fc',
          label: 'AI Strategy',
        };
      case 'storage':
        return {
          icon: 'lucide:cloud',
          badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
          accentColor: '#60a5fa',
          label: 'Cloud Sync',
        };
    }
  };

  return (
    <div id="page-notifications" className="flex flex-col h-full w-full overflow-hidden text-zinc-200">
      {/* Top Header */}
      <header className="flex-wrap px-4 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderPanel bg-panel/85 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Return to previous view"
              className="p-2 sm:p-2.5 rounded-xl border border-[#24242a] bg-[#0d0d10] hover:bg-[#16161c] text-zinc-300 hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer group shrink-0"
              title="Return to Calendar"
            >
              <iconify-icon
                icon="lucide:arrow-left"
                width="18"
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
          )}
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1.5 sm:mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-textMuted">
              Academic reminders, schedule changes, and smart revision alerts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="px-4 py-2.5 rounded-full border border-[#272730] bg-cardHover hover:bg-[#27272a] text-zinc-200 hover:text-white text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <iconify-icon icon="lucide:check-check" width="16" className="text-emerald-400" />
              <span>Mark all as read</span>
            </button>
          )}

          {onOpenPreferences && (
            <button
              type="button"
              onClick={onOpenPreferences}
              aria-label="Notification settings"
              className="p-2.5 rounded-full border border-[#272730] bg-cardHover hover:bg-[#27272a] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Notification Settings"
            >
              <iconify-icon icon="lucide:sliders-horizontal" width="16" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 sm:py-6 pb-20 md:pb-8 flex flex-col gap-6 scrollbar-hide max-w-5xl mx-auto w-full">
        {/* Filter Pills & Instant Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide py-1">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread Only' },
                { id: 'exam', label: 'Exams' },
                { id: 'task', label: 'Assignments' },
                { id: 'session', label: 'Classes' },
                { id: 'ai', label: 'AI Strategy' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id)}
                className={`h-[44px] sm:h-[48px] px-5 sm:px-6 rounded-full text-[14.5px] sm:text-[15.5px] font-bold tracking-tight transition-all shrink-0 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center ${
                  filterType === tab.id
                    ? 'bg-white text-black shadow-lg ring-1 ring-white/20'
                    : 'bg-[#101014] hover:bg-[#181820] text-zinc-300 hover:text-white border border-[#272730] hover:border-zinc-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative min-w-[250px] sm:min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full h-[44px] sm:h-[48px] bg-[#0c0c0f] border border-[#24242e] focus:border-zinc-300 rounded-2xl px-4 pl-11 pr-10 text-[14px] sm:text-[14.5px] text-white placeholder:text-textSubtle outline-none transition-colors shadow-sm"
            />
            <iconify-icon
              icon="lucide:search"
              width="18"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSubtle pointer-events-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear notification search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <iconify-icon icon="lucide:x" width="16" />
              </button>
            )}
          </div>
        </div>

        {/* Notifications Timeline Groups */}
        {filteredNotifications.length === 0 ? (
          <div className="rounded-3xl border border-[#1f1f25] bg-[#0a0a0d] py-16 sm:py-20 px-6 sm:px-12 text-center flex flex-col items-center justify-center my-6 animate-in fade-in duration-200 shadow-xl">
            {notifications.length === 0 ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-[#141418] border border-[#25252c] flex items-center justify-center text-zinc-300 mb-4 shadow-inner ring-1 ring-white/5">
                  <iconify-icon icon="lucide:bell-off" width="32" className="text-zinc-400" />
                </div>
                <h3 className="text-xl sm:text-xl font-bold text-white mb-2 tracking-tight">
                  No notifications right now
                </h3>
                <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
                  All caught up! You'll receive alerts for upcoming exams, due assignments, schedule changes, and AI study tips here.
                </p>
                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-6 sm:px-7 py-2.5 bg-[#18181e] hover:bg-[#22222a] text-zinc-100 hover:text-white border border-[#2b2b34] hover:border-zinc-500 rounded-xl text-[14px] font-bold transition-all shadow-md cursor-pointer active:scale-95 flex items-center gap-2"
                  >
                    <iconify-icon icon="lucide:arrow-left" width="16" />
                    <span>Return to Dashboard</span>
                  </button>
                )}
              </>
            ) : searchQuery.trim() ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-[#141418] border border-[#25252c] flex items-center justify-center text-zinc-300 mb-4 shadow-inner">
                  <iconify-icon icon="lucide:search-x" width="32" className="text-zinc-400" />
                </div>
                <h3 className="text-xl sm:text-xl font-bold text-white mb-2 tracking-tight">
                  No notifications matching &ldquo;{searchQuery}&rdquo;
                </h3>
                <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
                  We couldn't find any notification matching that search query. Try adjusting your query or reset filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    handleFilterChange('all');
                  }}
                  className="px-6 sm:px-7 py-2.5 bg-[#18181e] hover:bg-[#22222a] text-zinc-100 hover:text-white border border-[#2b2b34] hover:border-zinc-500 rounded-xl text-[14px] font-bold transition-all shadow-md cursor-pointer active:scale-95"
                >
                  Clear Search
                </button>
              </>
            ) : filterType === 'unread' ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-inner ring-1 ring-emerald-500/20">
                  <iconify-icon icon="lucide:check-check" width="32" className="text-emerald-400" />
                </div>
                <h3 className="text-xl sm:text-xl font-bold text-white mb-2 tracking-tight">
                  You're all caught up!
                </h3>
                <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
                  Zero unread notifications remaining. All academic alerts and revision recommendations have been reviewed.
                </p>
                <button
                  type="button"
                  onClick={() => handleFilterChange('all')}
                  className="px-6 sm:px-7 py-2.5 bg-[#18181e] hover:bg-[#22222a] text-zinc-100 hover:text-white border border-[#2b2b34] hover:border-zinc-500 rounded-xl text-[14px] font-bold transition-all shadow-md cursor-pointer active:scale-95"
                >
                  View All Notifications
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-[#141418] border border-[#25252c] flex items-center justify-center text-zinc-400 mb-4 shadow-inner">
                  <iconify-icon icon="lucide:filter-x" width="32" />
                </div>
                <h3 className="text-xl sm:text-xl font-bold text-white mb-2 tracking-tight">
                  No notifications in this category
                </h3>
                <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
                  There are no notifications matching your selected filter right now.
                </p>
                <button
                  type="button"
                  onClick={() => handleFilterChange('all')}
                  className="px-6 sm:px-7 py-2.5 bg-[#18181e] hover:bg-[#22222a] text-zinc-100 hover:text-white border border-[#2b2b34] hover:border-zinc-500 rounded-xl text-[14px] font-bold transition-all shadow-md cursor-pointer active:scale-95"
                >
                  View All Notifications
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-7">
            {groups.map((group) => {
              const groupItems = filteredNotifications.filter((n) => n.dateGroup === group);
              if (groupItems.length === 0) return null;

              return (
                <section key={group} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-1">
                    <h2 className="text-[11.5px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                      {group}
                    </h2>
                    <div className="h-px flex-1 bg-[#1c1c22]" />
                    <span className="text-[11px] font-medium text-textSubtle">
                      {groupItems.length} item{groupItems.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {groupItems.map((n) => {
                      const meta = getTypeMeta(n.type);

                      return (
                        <div
                          key={n.id}
                          className={`rounded-2xl border p-4 sm:p-5 transition-all group flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                            !n.read
                              ? 'bg-[#0c0c10] border-[#292934] shadow-sm'
                              : 'bg-[#08080a] border-[#1a1a20] opacity-80 hover:opacity-100 hover:border-[#2a2a32]'
                          }`}
                        >
                          {/* Main Left Content */}
                          <div className="flex items-start gap-4 min-w-0 flex-1">
                            {/* Icon badge */}
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 shadow-inner ${meta.badgeColor}`}
                            >
                              <iconify-icon icon={meta.icon} width="19" />
                            </div>

                            <div className="min-w-0 flex-1">
                              {/* Header Meta */}
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span
                                  className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${meta.badgeColor}`}
                                >
                                  {meta.label}
                                </span>
                                {n.subject && (
                                  <span className="text-[11px] font-bold text-zinc-400 bg-[#141418] px-2 py-0.5 rounded border border-[#222228]">
                                    {n.subject}
                                  </span>
                                )}
                                <span className="text-[11px] font-medium text-textSubtle">
                                  {n.timestamp}
                                </span>
                                {!n.read && (
                                  <span className="w-2 h-2 rounded-full bg-cyan-400 ml-auto sm:ml-0" />
                                )}
                              </div>

                              {/* Title */}
                              <h3
                                className={`text-[15px] font-bold tracking-tight ${
                                  !n.read ? 'text-white' : 'text-zinc-300'
                                }`}
                              >
                                {n.title}
                              </h3>

                              {/* Body Message */}
                              <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                                {n.message}
                              </p>
                            </div>
                          </div>

                          {/* Right Actions */}
                          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start sm:self-center w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t border-[#1a1a20] sm:border-t-0">
                            {n.actionLabel && (
                              <button
                                type="button"
                                onClick={() => handleActionClick(n)}
                                className="px-3.5 py-1.5 bg-[#16161c] hover:bg-[#202028] text-white border border-[#2a2a34] rounded-lg text-[12px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5"
                              >
                                <span>{n.actionLabel}</span>
                                <iconify-icon icon="lucide:arrow-right" width="13" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={(e) => toggleReadStatus(n.id, e)}
                              aria-label={n.read ? 'Mark notification as unread' : 'Mark notification as read'}
                              className="w-8 h-8 rounded-lg border border-[#222228] bg-[#101014] hover:bg-[#181820] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                              title={n.read ? 'Mark as unread' : 'Mark as read'}
                            >
                              <iconify-icon
                                icon={n.read ? 'lucide:mail' : 'lucide:mail-check'}
                                width="15"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => removeNotification(n.id, e)}
                              aria-label="Dismiss notification"
                              className="w-8 h-8 rounded-lg border border-[#222228] bg-[#101014] hover:bg-rose-950/20 text-zinc-400 hover:text-rose-400 hover:border-rose-900/40 flex items-center justify-center transition-colors cursor-pointer"
                              title="Dismiss"
                            >
                              <iconify-icon icon="lucide:x" width="15" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
