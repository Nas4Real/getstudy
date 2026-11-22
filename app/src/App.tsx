import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ProfileDropdown } from './components/layout/ProfileDropdown';
import { DashboardView } from './components/dashboard/DashboardView';
import { NewTaskModal } from './components/modals/NewTaskModal';
import { NewSessionModal } from './components/modals/NewSessionModal';
import { SessionDetailsModal } from './components/modals/SessionDetailsModal';
import { TaskDetailsModal } from './components/modals/TaskDetailsModal';
import { ExamDetailsModal } from './components/modals/ExamDetailsModal';
import { AiSuggestModal } from './components/modals/AiSuggestModal';
import { NotificationPreferencesModal } from './components/modals/NotificationPreferencesModal';
import { Toast } from './components/common/Toast';
import { Dialog } from './components/common/Dialog';
import { ToastContext } from './components/common/ToastContext';
import type { PageType, CalendarViewType, SessionData, TaskData, ExamData } from './types';

// Code-split route-level components for performance optimization
const CalendarView = lazy(() => import('./components/calendar/CalendarView').then((m) => ({ default: m.CalendarView })));
const TasksView = lazy(() => import('./components/tasks/TasksView').then((m) => ({ default: m.TasksView })));
const DocumentsView = lazy(() => import('./components/documents/DocumentsView').then((m) => ({ default: m.DocumentsView })));
const SubjectsView = lazy(() => import('./components/subjects/SubjectsView').then((m) => ({ default: m.SubjectsView })));
const SettingsView = lazy(() => import('./components/settings/SettingsView').then((m) => ({ default: m.SettingsView })));
const AiAssistantView = lazy(() => import('./components/ai/AiAssistantView').then((m) => ({ default: m.AiAssistantView })));
const AuthView = lazy(() => import('./components/auth/AuthView').then((m) => ({ default: m.AuthView })));
const NotificationsView = lazy(() => import('./components/notifications/NotificationsView').then((m) => ({ default: m.NotificationsView })));
const EmailPreviewView = lazy(() => import('./components/emails/EmailPreviewView').then((m) => ({ default: m.EmailPreviewView })));
const FlashcardsView = lazy(() => import('./components/flashcards/FlashcardsView').then((m) => ({ default: m.FlashcardsView })));
const LandingPage = lazy(() => import('./components/landing/Index').then((m) => ({ default: m.LandingPageIndex })));

const SAMPLE_MODAL_TASK: TaskData = {
  id: 'task-sample-1',
  title: 'Complete Chapter 4 Exercises',
  subject: 'Analyse',
  subjectColor: '#06b6d4',
  dueDate: 'Tonight, 23:59',
  priority: 'High',
  description: 'Solve exercises 1 through 15 from tutorial sheet 4 on series convergence.',
  subtasks: [
    { text: 'Review lecture examples', completed: true },
    { text: 'Solve exercises 1 to 8', completed: true },
    { text: 'Verify uniform convergence proofs', completed: false },
  ],
};

const SAMPLE_MODAL_SESSION: SessionData = {
  id: 'session-sample-1',
  title: 'Algèbre Linéaire — Diagonalization Revision',
  subject: 'Algèbre',
  subjectColor: '#a855f7',
  date: 'Vendredi 8 Mai',
  time: '14:00 - 16:00',
  room: 'Library Room 4',
  professor: 'Solo Revision',
  notes: [
    'Compute det(A - λI) characteristic polynomial',
    'Verify geometric vs algebraic multiplicity',
    'Write matrix P of eigenvectors',
  ],
  description: 'Intensive 2-hour problem solving block before the midterm exam.',
};

const SAMPLE_MODAL_EXAM: ExamData = {
  id: 'exam-sample-1',
  title: 'Algèbre Linéaire Midterm (DS 3)',
  subject: 'Algèbre',
  subjectColor: '#a855f7',
  dueDate: 'Samedi 9 Mai',
  priority: 'High',
  date: 'Samedi 9 Mai 2026',
  time: '08:00 - 11:00 (3h)',
  room: 'Amphithéâtre 27',
  timeAndPlace: 'Amphi 27 • 08:00 AM',
  countdown: '2 days left',
  chapters: [
    { number: 1, title: 'Espaces Vectoriels & Sous-espaces', level: 'mastered' },
    { number: 2, title: 'Applications Linéaires & Noyau', level: 'mastered' },
    { number: 3, title: 'Matrices & Réduction', level: 'intermediate' },
    { number: 4, title: 'Diagonalisation & Trigonalisation', level: 'intermediate' },
  ],
};

const parseModalFromUrl = (): string | null => {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search);
    return p.get('modal') || p.get('popup') || null;
  }
  return null;
};

export type UIStateVariant = 'default' | 'empty-tasks' | 'all-done' | 'ai-typing' | 'empty-dashboard' | 'search-empty';

const parseStateFromUrl = (): UIStateVariant => {
  if (typeof window === 'undefined') return 'default';
  const p = new URLSearchParams(window.location.search);
  const s = p.get('state') || p.get('status') || '';
  if (s === 'empty-tasks' || p.get('tasks') === '0' || p.get('tasks') === 'empty') return 'empty-tasks';
  if (s === 'all-done' || p.get('tasks') === 'done') return 'all-done';
  if (s === 'ai-typing' || p.get('ai') === 'typing') return 'ai-typing';
  if (s === 'empty-dashboard' || p.get('dashboard') === 'empty' || p.get('classes') === '0') return 'empty-dashboard';
  if (s === 'search-empty' || p.get('docs') === 'empty') return 'search-empty';
  return 'default';
};

const getInitialPage = (): PageType => {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search);
    const page = p.get('page') as PageType;
    if (page === 'landing' || p.has('landing') || p.has('portfolio') || window.location.pathname === '/landing') return 'landing';
    if (page === 'dashboard' || p.has('dashboard') || p.has('dash') || p.has('classes')) return 'dashboard';
    if (['dashboard', 'calendar', 'tasks', 'subjects', 'documents', 'flashcards', 'ai-assistant', 'settings', 'notifications', 'emails', 'landing'].includes(page)) return page;
    if (p.has('emails') || p.has('email') || p.get('page') === 'emails' || p.get('page') === 'email') return 'emails';
    if (p.has('flashcards') || p.has('cards') || p.has('flashcard') || p.get('page') === 'flashcards' || p.get('page') === 'cards') return 'flashcards';
    if (p.has('calendar') || p.has('cal') || p.has('view')) return 'calendar';
    if (p.has('tasks') || p.has('task') || p.get('page') === 'tasks') return 'tasks';
    if (p.has('subjects') || p.has('subject') || p.has('syllabus') || p.get('page') === 'subjects') return 'subjects';
    if (p.has('docs') || p.has('documents') || p.has('files') || p.get('page') === 'documents' || p.get('page') === 'docs') return 'documents';
    if (p.has('ai') || p.has('assistant') || p.has('chat') || p.get('page') === 'ai' || p.get('page') === 'ai-assistant' || p.get('page') === 'chat') return 'ai-assistant';
    if (p.has('notifications') || p.has('notif') || p.has('alerts') || p.get('page') === 'notifications') return 'notifications';
    if (p.has('settings') || p.has('profile') || p.get('page') === 'settings') return 'settings';
    if (p.has('dashboard') || p.has('dash') || p.has('classes')) return 'dashboard';
  }
  const s = parseStateFromUrl();
  if (s === 'empty-tasks' || s === 'all-done') return 'tasks';
  if (s === 'ai-typing') return 'ai-assistant';
  if (s === 'empty-dashboard') return 'dashboard';
  if (s === 'search-empty') return 'documents';
  return 'landing';
};

const getInitialCalendarView = (): CalendarViewType => {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search);
    const v = p.get('view') || p.get('calview');
    if (v === 'day' || v === 'week' || v === 'month') return v;
    const cal = p.get('calendar') || p.get('cal');
    if (cal === 'day' || cal === 'week' || cal === 'month') return cal;
  }
  return 'week';
};

const getInitialCalendarMockState = (): 'normal' | 'empty' | 'completed' | 'exams' => {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search);
    const cal = (p.get('calendar') || p.get('cal') || '').toLowerCase();
    if (cal === 'empty' || cal === 'free' || cal === 'freeday' || cal === 'free-day') return 'empty';
    if (cal === 'completed' || cal === 'all-done' || cal === 'done') return 'completed';
    if (cal === 'exams' || cal === 'exam' || cal === 'exam-week') return 'exams';
  }
  return 'normal';
};

const getInitialAuthOpen = (): { isOpen: boolean; view: 'signin' | 'signup' | 'forgot' } => {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search);
    const auth = (p.get('auth') || p.get('page') || '').toLowerCase();
    if (auth === 'signup' || p.has('signup')) return { isOpen: true, view: 'signup' };
    if (auth === 'forgot' || auth === 'reset' || p.has('reset') || p.has('forgot')) return { isOpen: true, view: 'forgot' };
    if (auth === 'login' || auth === 'signin' || auth === 'auth' || p.has('auth') || p.has('login') || p.has('signin')) return { isOpen: true, view: 'signin' };
  }
  return { isOpen: false, view: 'signin' };
};

export function App() {
  const [uiState, setUiState] = useState<UIStateVariant>(parseStateFromUrl);

  const initialAuth = getInitialAuthOpen();
  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage);
  const [calendarView, setCalendarView] = useState<CalendarViewType>(getInitialCalendarView);
  const [calendarMockState, setCalendarMockState] = useState<'normal' | 'empty' | 'completed' | 'exams'>(getInitialCalendarMockState);
  const [isAuthOpen, setIsAuthOpen] = useState(initialAuth.isOpen);
  const [authInitialView, setAuthInitialView] = useState<'signin' | 'signup' | 'forgot'>(initialAuth.view);

  // Modals & Popups state
  const initialModal = parseModalFromUrl();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const closeDesktopDrawer = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileNavOpen(false);
    };
    media.addEventListener('change', closeDesktopDrawer);
    return () => media.removeEventListener('change', closeDesktopDrawer);
  }, []);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('dropdown') === 'profile';
    }
    return false;
  });
  const [profileDropdownAnchor, setProfileDropdownAnchor] = useState<'sidebar' | 'header'>('sidebar');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(initialModal === 'new-task');
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(initialModal === 'new-session');
  const [isSessionDetailsModalOpen, setIsSessionDetailsModalOpen] = useState(initialModal === 'session-details');
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(initialModal === 'task-details');
  const [isExamDetailsModalOpen, setIsExamDetailsModalOpen] = useState(initialModal === 'exam-details');
  const [isAiSuggestModalOpen, setIsAiSuggestModalOpen] = useState(initialModal === 'ai-suggest');
  const [isNotificationPreferencesModalOpen, setIsNotificationPreferencesModalOpen] = useState(
    initialModal === 'notification-preferences' || initialModal === 'notif-pref'
  );
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    initialModal === 'session-details' ? SAMPLE_MODAL_SESSION : null
  );
  const [editingSession, setEditingSession] = useState<SessionData | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(
    initialModal === 'task-details' ? SAMPLE_MODAL_TASK : null
  );
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(
    initialModal === 'exam-details' ? SAMPLE_MODAL_EXAM : null
  );



  useEffect(() => {
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      setCurrentPage(getInitialPage());
      setCalendarView(getInitialCalendarView());
      setCalendarMockState(getInitialCalendarMockState());
      setUiState(parseStateFromUrl());
      setIsMobileNavOpen(false);
      const authInfo = getInitialAuthOpen();
      setIsAuthOpen(authInfo.isOpen);
      setAuthInitialView(authInfo.view);

      const m = parseModalFromUrl();
      setIsNewTaskModalOpen(m === 'new-task');
      setIsNewSessionModalOpen(m === 'new-session');
      if (m !== 'new-session') setEditingSession(null);
      setIsSessionDetailsModalOpen(m === 'session-details');
      if (m === 'session-details') setSelectedSession(SAMPLE_MODAL_SESSION);
      setIsTaskDetailsModalOpen(m === 'task-details');
      if (m === 'task-details') setSelectedTask(SAMPLE_MODAL_TASK);
      setIsExamDetailsModalOpen(m === 'exam-details');
      if (m === 'exam-details') setSelectedExam(SAMPLE_MODAL_EXAM);
      setIsAiSuggestModalOpen(m === 'ai-suggest');
      setIsNotificationPreferencesModalOpen(m === 'notification-preferences' || m === 'notif-pref');
      setIsProfileDropdownOpen(p.get('dropdown') === 'profile');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  


  const clearModalUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.has('modal') || url.searchParams.has('popup') || url.searchParams.has('dropdown')) {
        url.searchParams.delete('modal');
        url.searchParams.delete('popup');
        url.searchParams.delete('dropdown');
        window.history.replaceState({}, '', url.toString());
      }
    }
  };
  
  const navigateToPage = (page: PageType) => {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('page', page);
    if (page === 'calendar') url.searchParams.set('view', calendarView);
    if (url.href !== window.location.href) window.history.pushState({}, '', url);
    setCurrentPage(page);
    setUiState('default');
    setCalendarMockState('normal');
    setIsMobileNavOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    const url = new URL(window.location.href);
    for (const param of ['auth', 'login', 'signin', 'signup', 'forgot', 'reset']) {
      url.searchParams.delete(param);
    }
    if (['auth', 'login', 'signin', 'signup', 'forgot', 'reset'].includes(url.searchParams.get('page') || '')) {
      url.searchParams.delete('page');
    }
    window.history.replaceState({}, '', url);
  };

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (msg: string) => {
    clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Dismiss the non-modal profile popup; dialogs own their Escape events.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileNavOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

    if (currentPage === 'landing') {
    return (
      <ToastContext.Provider value={toastMessage}>
        <Suspense fallback={<div className="min-h-screen bg-bg" />}>
          <LandingPage onNavigateApp={() => navigateToPage('dashboard')} />
        </Suspense>
        <Toast message={toastMessage} />
      </ToastContext.Provider>
    );
  }

  return (
    <ToastContext.Provider value={toastMessage}>
    <div className="h-[100dvh] w-screen bg-black text-zinc-200 font-sans flex flex-col lg:flex-row p-0 sm:p-2 lg:p-3 gap-0 lg:gap-3 antialiased overflow-hidden selection:bg-white selection:text-black">
      {/* Mobile App Bar Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0c0c0e] border-b border-[#202026] shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-xl bg-[#18181b] border border-[#27272a] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <iconify-icon icon="lucide:menu" width="18" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-100 text-black flex items-center justify-center font-bold text-sm">
              G
            </div>
            <span className="font-bold text-base tracking-tight text-white">GetStudy</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateToPage('notifications')}
            className={`w-10 h-10 min-w-[44px] min-h-[44px] rounded-xl border transition-colors flex items-center justify-center relative cursor-pointer ${
              currentPage === 'notifications'
                ? 'bg-white text-black border-white'
                : 'bg-[#18181b] border-[#27272a] text-zinc-300 hover:text-white'
            }`}
            aria-label="View notifications"
          >
            <iconify-icon icon="lucide:bell" width="16" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setProfileDropdownAnchor('header');
              setIsProfileDropdownOpen((prev) => !prev);
            }}
            className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full overflow-hidden border border-[#27272a] cursor-pointer"
            aria-label="User profile and account options"
          >
            <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Slide-over with Backdrop) */}
      {isMobileNavOpen && (
        <Dialog label="Navigation" onClose={() => setIsMobileNavOpen(false)}>
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative z-10 h-full animate-in slide-in-from-left duration-200">
            <Sidebar
              currentPage={currentPage}
              onSelectPage={(page) => {
                navigateToPage(page);
                setIsMobileNavOpen(false);
                setIsProfileDropdownOpen(false);
              }}
              onToggleProfileDropdown={(e) => {
                e.stopPropagation();
                setIsMobileNavOpen(false);
                setProfileDropdownAnchor('header');
                setIsProfileDropdownOpen((prev) => !prev);
              }}
              onCloseMobile={() => setIsMobileNavOpen(false)}
              isMobile={true}
            />
          </div>
        </div>
        </Dialog>
      )}

      {/* Desktop Persistent Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={(page) => {
          navigateToPage(page);
          setIsProfileDropdownOpen(false);
        }}
        onToggleProfileDropdown={(e) => {
          e.stopPropagation();
          setProfileDropdownAnchor('sidebar');
          setIsProfileDropdownOpen((prev) => !prev);
        }}
      />

      {/* Main Container Panel */}
      <main className="flex-1 min-w-0 min-h-0 bg-panel rounded-none lg:rounded-2xl border-0 lg:border lg:border-borderPanel shadow-2xl flex flex-col h-full overflow-hidden relative">
        <Suspense
          fallback={
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] gap-3">
              <div className="flex items-center gap-2.5 text-zinc-400 font-mono text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Loading view...</span>
              </div>
            </div>
          }
        >
        {currentPage === 'dashboard' && (
          <DashboardView
            onOpenNewTask={() => setIsNewTaskModalOpen(true)}
            onSelectTask={(task) => {
              setSelectedTask(task);
              setIsTaskDetailsModalOpen(true);
            }}
            onSelectExam={(exam) => {
              setSelectedExam(exam);
              setIsExamDetailsModalOpen(true);
            }}
            onSelectSession={(session) => {
              setSelectedSession(session);
              setIsSessionDetailsModalOpen(true);
            }}
            onNavigateToCalendar={() => navigateToPage('calendar')}
            onNavigateToTasks={() => navigateToPage('tasks')}
            onNavigateToNotifications={() => navigateToPage('notifications')}
            mockEmpty={uiState === 'empty-dashboard'}
          />
        )}

        {currentPage === 'calendar' && (
          <CalendarView
            currentView={calendarView}
            onViewChange={(newView) => {
              setCalendarView(newView);
              const url = new URL(window.location.href);
              url.searchParams.set('view', newView);
              window.history.replaceState(null, '', url.pathname + url.search);
            }}
            mockState={calendarMockState}
            onOpenNewSession={() => { setEditingSession(null); setIsNewSessionModalOpen(true); }}
            onSelectSession={(session) => {
              setSelectedSession(session);
              setIsSessionDetailsModalOpen(true);
            }}
            onOpenAiSuggest={() => setIsAiSuggestModalOpen(true)}
            onOpenNotifications={() => navigateToPage('notifications')}
            onImport={(data) => {
              const sessionCount = data.sessions?.length || 0;
              const taskCount = data.tasks?.length || 0;
              if (sessionCount > 0 && taskCount > 0) {
                showToast(`Successfully imported ${sessionCount} timetable session${sessionCount > 1 ? 's' : ''} and ${taskCount} task${taskCount > 1 ? 's' : ''}!`);
              } else if (sessionCount > 0) {
                showToast(`Successfully imported ${sessionCount} timetable session${sessionCount > 1 ? 's' : ''}!`);
              } else if (taskCount > 0) {
                showToast(`Successfully imported ${taskCount} task${taskCount > 1 ? 's' : ''}!`);
              }
            }}
          />
        )}

        {currentPage === 'tasks' && (
          <TasksView
            onOpenNewTask={() => setIsNewTaskModalOpen(true)}
            onSelectTask={(task) => {
              setSelectedTask(task);
              setIsTaskDetailsModalOpen(true);
            }}
          />
        )}

        {currentPage === 'subjects' && (
          <SubjectsView
            onShowToast={showToast}
            onOpenNewSession={(prefill) => {
              if (prefill) {
                setEditingSession({
                  title: prefill.title,
                  subject: prefill.subject,
                  subjectColor: prefill.subjectColor,
                  date: 'Tomorrow',
                  time: '14:00 - 15:30',
                });
              } else {
                setEditingSession(null);
              }
              setIsNewSessionModalOpen(true);
            }}
          />
        )}

        {currentPage === 'documents' && (
          <DocumentsView
            onShowToast={showToast}
            onNavigateToAi={() => navigateToPage('ai-assistant')}
            mockSearchEmpty={uiState === 'search-empty'}
          />
        )}

        {currentPage === 'notifications' && (
          <NotificationsView
            onBack={() => navigateToPage('dashboard')}
            onOpenExamDetails={(exam) => {
              setSelectedExam(exam);
              setIsExamDetailsModalOpen(true);
            }}
            onOpenTaskDetails={(task) => {
              setSelectedTask(task);
              setIsTaskDetailsModalOpen(true);
            }}
            onOpenSessionDetails={(session) => {
              setSelectedSession(session);
              setIsSessionDetailsModalOpen(true);
            }}
            onNavigateToAi={() => navigateToPage('ai-assistant')}
            onNavigateToSettings={() => navigateToPage('settings')}
            onOpenPreferences={() => setIsNotificationPreferencesModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'ai-assistant' && (
          <AiAssistantView
            onAddTasks={(newTasks) => {
              showToast(newTasks.length === 1 ? `Task "${newTasks[0].title}" added!` : `${newTasks.length} tasks added to your workspace!`);
            }}
            onAddSession={(newSession) => {
              showToast(`Session "${newSession.title}" added to calendar!`);
            }}
            onNavigateToTasks={() => navigateToPage('tasks')}
            onNavigateToCalendar={() => navigateToPage('calendar')}
            onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
            onOpenNewSessionModal={() => { setEditingSession(null); setIsNewSessionModalOpen(true); }}
            mockTyping={uiState === 'ai-typing'}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsView
            onSignOut={() => {
              setIsAuthOpen(true);
            }}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'emails' && (
          <EmailPreviewView />
        )}

        {currentPage === 'flashcards' && (
          <FlashcardsView onShowToast={showToast} />
        )}
        </Suspense>

        {/* Mobile Bottom Navigation Bar (1-Tap Tab Switching) */}
        <nav aria-label="Main navigation" className="app-bottom-nav lg:hidden flex items-center justify-around bg-panel/95 backdrop-blur-xl border-t border-[#1e1e24] py-1.5 px-0 sm:px-2 shrink-0 z-30">
          {[
            { id: 'dashboard', label: 'Overview', icon: 'lucide:layout-dashboard' },
            { id: 'calendar', label: 'Calendar', icon: 'lucide:calendar-days' },
            { id: 'tasks', label: 'Tasks', icon: 'lucide:check-square' },
            { id: 'flashcards', label: 'Cards', icon: 'lucide:layers' },
            { id: 'subjects', label: 'Subjects', icon: 'lucide:book-open' },
            { id: 'documents', label: 'Docs', icon: 'lucide:folder-open' },
            { id: 'ai-assistant', label: 'AI', icon: 'lucide:bot' },
          ].map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  navigateToPage(item.id as PageType);
                  setIsProfileDropdownOpen(false);
                }}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-all cursor-pointer ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-all ${
                    isActive ? 'bg-white/10 text-white' : 'text-zinc-400'
                  }`}
                >
                  <iconify-icon icon={item.icon} width="18" />
                </div>
                <span
                  className={`max-w-full truncate text-[10px] sm:text-xs tracking-tight transition-colors ${
                    isActive ? 'font-bold text-white' : 'font-medium text-zinc-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </main>

      {/* Profile Dropdown Popup */}
      <ProfileDropdown
        isOpen={isProfileDropdownOpen}
        anchor={profileDropdownAnchor}
        onClose={() => {
          setIsProfileDropdownOpen(false);
          clearModalUrl();
        }}
        onNavigateSettings={() => {
          navigateToPage('settings');
          setIsProfileDropdownOpen(false);
          clearModalUrl();
        }}
        onSignOut={() => {
          setIsProfileDropdownOpen(false);
          clearModalUrl();
          setIsAuthOpen(true);
        }}
      />

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => {
          setIsNewTaskModalOpen(false);
          clearModalUrl();
        }}
        onSubmit={(task) => {
          showToast(`Task "${task.title}" created successfully!`);
        }}
      />

      {/* New Session Modal */}
      <NewSessionModal
        isOpen={isNewSessionModalOpen}
        initialData={editingSession}
        mode={editingSession ? 'edit' : 'create'}
        onClose={() => {
          setIsNewSessionModalOpen(false);
          setEditingSession(null);
          clearModalUrl();
        }}
        onSubmit={(session) => {
          if (editingSession) {
            if (editingSession.type === 'exam') {
              setSelectedExam((prev) =>
                prev
                  ? {
                      ...prev,
                      title: session.title,
                      subject: session.subject,
                      room: session.room ?? prev.room,
                      time: `${session.start} (${session.duration} min)`,
                    }
                  : null
              );
            }
            setSelectedSession((prev) =>
              prev
                ? {
                    ...prev,
                    title: session.title,
                    subject: session.subject,
                    room: session.room,
                    time: `${session.start} (${session.duration} min)`,
                    type:
                      session.type === 'exam'
                        ? 'Exam'
                        : session.type === 'university'
                        ? 'Lecture'
                        : 'Revision',
                  }
                : null
            );
            showToast(`${session.type === 'exam' ? 'Exam' : 'Session'} "${session.title}" updated!`);
          } else {
            showToast(`Session "${session.title}" added to calendar!`);
          }
          setEditingSession(null);
        }}
      />

      {/* Session Details Modal */}
      <SessionDetailsModal
        isOpen={isSessionDetailsModalOpen}
        session={selectedSession}
        onClose={() => {
          setIsSessionDetailsModalOpen(false);
          clearModalUrl();
        }}
        onEdit={(sessionToEdit) => {
          setEditingSession(sessionToEdit || selectedSession);
          setIsSessionDetailsModalOpen(false);
          setIsNewSessionModalOpen(true);
        }}
        onDelete={() => {
          setIsSessionDetailsModalOpen(false);
          clearModalUrl();
          showToast('Session deleted');
        }}
      />

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={isTaskDetailsModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsTaskDetailsModalOpen(false);
          clearModalUrl();
        }}
        onComplete={() => {
          setIsTaskDetailsModalOpen(false);
          clearModalUrl();
          showToast('Task marked as complete!');
        }}
        onDelete={() => {
          setIsTaskDetailsModalOpen(false);
          clearModalUrl();
          showToast('Task deleted');
        }}
      />

      {/* Exam Details Modal */}
      <ExamDetailsModal
        isOpen={isExamDetailsModalOpen}
        exam={selectedExam}
        onClose={() => {
          setIsExamDetailsModalOpen(false);
          clearModalUrl();
        }}
        onEdit={(examToEdit) => {
          const ex = examToEdit || selectedExam;
          if (ex) {
            setEditingSession({
              title: ex.title,
              subject: ex.subject,
              subjectColor: ex.subjectColor,
              boxColor: ex.boxColor,
              date: ex.date,
              time: ex.time,
              room: ex.room,
              type: 'exam',
            });
          }
          setIsExamDetailsModalOpen(false);
          setIsNewSessionModalOpen(true);
        }}
        onDelete={() => {
          setIsExamDetailsModalOpen(false);
          clearModalUrl();
          showToast('Exam removed');
        }}
      />

      {/* AI Suggestion Smart Scheduler Modal */}
      <AiSuggestModal
        isOpen={isAiSuggestModalOpen}
        onClose={() => {
          setIsAiSuggestModalOpen(false);
          clearModalUrl();
        }}
        onAcceptSuggestion={(session) => {
          showToast(`"${session.title}" scheduled!`);
        }}
        onAcceptAll={(sessions) => {
          showToast(`All ${sessions.length} study sessions added to calendar!`);
        }}
      />

      {/* Notification Preferences Modal */}
      <NotificationPreferencesModal
        isOpen={isNotificationPreferencesModalOpen}
        onClose={() => {
          setIsNotificationPreferencesModalOpen(false);
          clearModalUrl();
        }}
        onSave={() => {
          showToast('Notification alert preferences saved!');
        }}
      />

      {/* Authentication Full Screen Overlay */}
      {isAuthOpen && (
        <AuthView
          key={authInitialView}
          initialView={authInitialView}
          onLoginSuccess={closeAuth}
          onClose={closeAuth}
        />
      )}

      {/* Global Toast */}
      <Toast message={toastMessage} />
    </div>
    </ToastContext.Provider>
  );
}

export default App;
