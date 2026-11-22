import React, { useState, useEffect, useRef } from 'react';
import { EditTaskModal } from '../modals/EditTaskModal';
import { DeleteTaskModal } from '../modals/DeleteTaskModal';
import type { TaskData } from '../../types';

export type TasksMockState = 'normal' | 'empty' | 'all-done' | 'overdue';

interface TasksViewProps {
  onOpenNewTask: () => void;
  onSelectTask: (task: TaskData) => void;
  mockState?: TasksMockState;
}

interface TaskItem extends TaskData {
  id: string;
  section: 'overdue' | 'today' | 'later';
  completed: boolean;
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 't-1',
    title: 'TD2: Suites Numériques',
    description: 'Finish exercises 1-4 before the next tutorial session.',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    type: 'Tutorial Work',
    dueDate: 'Yesterday',
    priority: 'High',
    section: 'overdue',
    completed: false,
    subtasks: [
      { text: 'Exercise 1: Monotone convergence test', completed: true },
      { text: 'Exercise 2: Recurrence relations', completed: false },
      { text: 'Exercise 3: Cauchy sequence proof', completed: false },
      { text: 'Exercise 4: Limit evaluation', completed: false },
    ],
  },
  {
    id: 't-2',
    title: 'Read Chapter 4: Forces',
    description: 'Read pages 45-60 and summarize key formulas.',
    subject: 'Physique',
    subjectColor: '#10b981',
    type: 'Reading',
    dueDate: 'Today',
    priority: 'Medium',
    section: 'today',
    completed: false,
    subtasks: [
      { text: 'Read friction & normal force sections', completed: true },
      { text: 'Summarize Newton laws in notebook', completed: false },
      { text: 'Attempt practice conceptual question 4.2', completed: false },
    ],
  },
  {
    id: 't-3',
    title: 'Project Proposal Draft',
    description: 'Write a 2-page outline for the end-of-term project.',
    subject: 'Méthodologie',
    subjectColor: '#3b82f6',
    type: 'Project',
    dueDate: 'Today',
    priority: 'High',
    section: 'today',
    completed: false,
    subtasks: [
      { text: 'Formulate research problem statement', completed: true },
      { text: 'Identify 3 primary literature citations', completed: false },
      { text: 'Outline methodology and deliverables timeline', completed: false },
    ],
  },
  {
    id: 't-4',
    title: 'Review Matrices',
    description: 'Go over the past exams for matrix inversions.',
    subject: 'Algèbre',
    subjectColor: '#ec4899',
    type: 'Revision',
    dueDate: 'Friday',
    priority: 'Low',
    section: 'later',
    completed: false,
    subtasks: [
      { text: 'Gauss-Jordan elimination method review', completed: true },
      { text: 'Cofactor expansion practice problems', completed: false },
      { text: 'Past exam 2023 matrix questions', completed: false },
    ],
  },
];

const OVERDUE_TASKS: TaskItem[] = [
  {
    id: 't-od-1',
    title: 'TD2: Suites Numériques & Séries',
    description: 'Finish exercises 1-4 before the next tutorial session.',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    type: 'Tutorial Work',
    dueDate: 'Yesterday',
    priority: 'High',
    section: 'overdue',
    completed: false,
    subtasks: [
      { text: 'Exercise 1: Monotone convergence test', completed: true },
      { text: 'Exercise 2: Recurrence relations', completed: false },
      { text: 'Exercise 3: Cauchy sequence proof', completed: false },
      { text: 'Exercise 4: Limit evaluation', completed: false },
    ],
  },
  {
    id: 't-od-2',
    title: 'DM 1: Électrostatique & Gauss',
    description: 'Mandatory graded problem set on cylindrical charge distributions.',
    subject: 'Physique',
    subjectColor: '#10b981',
    type: 'Assignment',
    dueDate: 'Yesterday',
    priority: 'High',
    section: 'overdue',
    completed: false,
    subtasks: [
      { text: 'Calculate electric field using Gauss theorem', completed: true },
      { text: 'Establish electrostatic potential continuity', completed: false },
    ],
  },
  {
    id: 't-od-3',
    title: 'TP Python: Dijkstra & Sac à dos',
    description: 'Submit completed Jupyter notebook report before lab start.',
    subject: 'Informatique',
    subjectColor: '#a855f7',
    type: 'Lab Work',
    dueDate: 'Yesterday',
    priority: 'High',
    section: 'overdue',
    completed: false,
    subtasks: [
      { text: 'Implement priority queue in Python', completed: true },
      { text: 'Benchmark on 10,000 node graphs', completed: false },
    ],
  },
  {
    id: 't-od-4',
    title: 'Fiche de Synthèse Algèbre',
    description: 'Revoir les théorèmes de réduction des endomorphismes.',
    subject: 'Algèbre',
    subjectColor: '#ec4899',
    type: 'Revision',
    dueDate: 'Today',
    priority: 'Medium',
    section: 'today',
    completed: false,
  },
];

const calculateSection = (dateStr: string): 'overdue' | 'today' | 'later' => {
  if (!dateStr) return 'today';
  const lower = dateStr.toLowerCase().trim();
  if (lower === 'yesterday') return 'overdue';
  if (lower === 'today') return 'today';
  if (lower === 'tomorrow' || lower === 'friday') return 'later';

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayIso = `${year}-${month}-${day}`;

  if (dateStr === todayIso) return 'today';
  if (dateStr < todayIso) return 'overdue';
  return 'later';
};

const formatDueDateDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  const lower = dateStr.toLowerCase().trim();
  if (lower === 'today' || lower === 'yesterday' || lower === 'tomorrow') {
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayIso = `${year}-${month}-${day}`;

  const yDate = new Date(now);
  yDate.setDate(yDate.getDate() - 1);
  const yIso = `${yDate.getFullYear()}-${String(yDate.getMonth() + 1).padStart(2, '0')}-${String(yDate.getDate()).padStart(2, '0')}`;

  const tDate = new Date(now);
  tDate.setDate(tDate.getDate() + 1);
  const tIso = `${tDate.getFullYear()}-${String(tDate.getMonth() + 1).padStart(2, '0')}-${String(tDate.getDate()).padStart(2, '0')}`;

  if (dateStr === todayIso) return 'Today';
  if (dateStr === yIso) return 'Yesterday';
  if (dateStr === tIso) return 'Tomorrow';

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return dateStr;
};

const parseMockStateFromUrl = (): TasksMockState => {
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const t = (p.get('tasks') || p.get('task') || p.get('state') || '').toLowerCase();
  if (t === 'empty' || t === '0' || t === 'none' || t === 'empty-tasks') return 'empty';
  if (t === 'all-done' || t === 'done' || t === 'completed') return 'all-done';
  if (t === 'overdue' || t === 'urgent') return 'overdue';
  return 'normal';
};

const parseFilterFromUrl = (): 'pending' | 'completed' | 'all' => {
  if (typeof window === 'undefined') return 'pending';
  const p = new URLSearchParams(window.location.search);
  const f = (p.get('filter') || '').toLowerCase();
  if (f === 'completed' || f === 'done') return 'completed';
  if (f === 'all') return 'all';
  if (f === 'pending') return 'pending';
  const t = (p.get('tasks') || p.get('task') || '').toLowerCase();
  if (t === 'completed') return 'completed';
  if (t === 'all') return 'all';
  return 'pending';
};

export const TasksView: React.FC<TasksViewProps> = ({
  onOpenNewTask,
  onSelectTask,
  mockState,
}) => {
  const activeMockState = mockState || parseMockStateFromUrl();

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    if (activeMockState === 'empty') return [];
    if (activeMockState === 'all-done') {
      return INITIAL_TASKS.map((t) => ({ ...t, completed: true }));
    }
    if (activeMockState === 'overdue') {
      return OVERDUE_TASKS;
    }
    return INITIAL_TASKS;
  });

  const [filter, setFilter] = useState<'pending' | 'completed' | 'all'>(parseFilterFromUrl);

  // Popup modal states
  const [activeMenuTaskId, setActiveMenuTaskId] = useState<string | null>(null);
  const [menuPlacement, setMenuPlacement] = useState<'top' | 'bottom'>('bottom');
  const [editingTask, setEditingTask] = useState<TaskItem | null>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('modal') === 'edit-task') return INITIAL_TASKS[0];
    }
    return null;
  });
  const [deletingTask, setDeletingTask] = useState<TaskItem | null>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('modal') === 'delete-task') return INITIAL_TASKS[0];
    }
    return null;
  });

  // Track tasks currently undergoing exit animation when filtered
  const [transitioningTasks, setTransitioningTasks] = useState<Record<string, 'active' | 'exiting'>>({});
  // Track the most recently completed task for ripple and pulse effect
  const [recentlyCompletedId, setRecentlyCompletedId] = useState<string | null>(null);
  // Timers ref to cleanly manage and cancel ongoing exit timeouts
  const timersRef = useRef<{ [id: string]: { exitTimer?: ReturnType<typeof setTimeout>; removeTimer?: ReturnType<typeof setTimeout> } }>({});

  const menuRef = useRef<HTMLDivElement>(null);

  // Cleanup active animation timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => {
        if (t.exitTimer) clearTimeout(t.exitTimer);
        if (t.removeTimer) clearTimeout(t.removeTimer);
      });
    };
  }, []);

  // Close 3-dots action menu on click outside or resize
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuTaskId(null);
      }
    };
    const handleClose = () => {
      setActiveMenuTaskId(null);
    };

    if (activeMenuTaskId) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleClose);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleClose);
    };
  }, [activeMenuTaskId]);

  const toggleComplete = (id: string) => {
    const targetTask = tasks.find((t) => t.id === id);
    if (!targetTask) return;

    const willBeCompleted = !targetTask.completed;

    // Trigger celebratory micro-interaction on completion
    if (willBeCompleted) {
      setRecentlyCompletedId(id);
      setTimeout(() => {
        setRecentlyCompletedId((prev) => (prev === id ? null : prev));
      }, 700);
    } else {
      setRecentlyCompletedId(null);
    }

    // If an exit animation is already pending for this task (e.g. user toggles back quickly)
    if (timersRef.current[id]) {
      if (timersRef.current[id].exitTimer) clearTimeout(timersRef.current[id].exitTimer);
      if (timersRef.current[id].removeTimer) clearTimeout(timersRef.current[id].removeTimer);
      delete timersRef.current[id];
      setTransitioningTasks((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }

    // Toggle the completed status immediately in tasks state
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: willBeCompleted } : t))
    );

    // If viewing 'pending' and completing, OR viewing 'completed' and uncompleting:
    // keep it visible so user sees the checkmark and strikethrough transition before collapsing
    const needsExitTransition =
      (filter === 'pending' && willBeCompleted) ||
      (filter === 'completed' && !willBeCompleted);

    if (needsExitTransition) {
      setTransitioningTasks((prev) => ({ ...prev, [id]: 'active' }));

      // Phase 1: Keep card visible for 450ms with strikethrough & emerald check
      const exitTimer = setTimeout(() => {
        setTransitioningTasks((prev) => ({ ...prev, [id]: 'exiting' }));
      }, 450);

      // Phase 2: After 320ms smooth height & opacity collapse, remove from transitioning tasks
      const removeTimer = setTimeout(() => {
        setTransitioningTasks((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        delete timersRef.current[id];
      }, 770);

      timersRef.current[id] = { exitTimer, removeTimer };
    }
  };

  const handleToggleMenu = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    if (activeMenuTaskId === taskId) {
      setActiveMenuTaskId(null);
    } else {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setMenuPlacement(spaceBelow < 180 ? 'top' : 'bottom');
      setActiveMenuTaskId(taskId);
    }
  };

  const handleSaveEdit = (updated: TaskData) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== (updated.id || editingTask?.id)) return t;
        const newDueDate = updated.dueDate || t.dueDate;
        return {
          ...t,
          title: updated.title,
          subject: updated.subject,
          dueDate: newDueDate,
          priority: updated.priority,
          description: updated.description,
          section: calculateSection(newDueDate),
        };
      })
    );
    setEditingTask(null);
  };

  const handleDeleteConfirm = (taskToDelete: TaskData) => {
    const deleteId = taskToDelete.id;
    if (deleteId) {
      if (timersRef.current[deleteId]) {
        if (timersRef.current[deleteId].exitTimer) clearTimeout(timersRef.current[deleteId].exitTimer);
        if (timersRef.current[deleteId].removeTimer) clearTimeout(timersRef.current[deleteId].removeTimer);
        delete timersRef.current[deleteId];
      }
      setTransitioningTasks((prev) => {
        const next = { ...prev };
        delete next[deleteId];
        return next;
      });
    }
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setDeletingTask(null);
  };

  const handleFilterChange = (newFilter: 'pending' | 'completed' | 'all') => {
    Object.values(timersRef.current).forEach((t) => {
      if (t.exitTimer) clearTimeout(t.exitTimer);
      if (t.removeTimer) clearTimeout(t.removeTimer);
    });
    timersRef.current = {};
    setTransitioningTasks({});
    setFilter(newFilter);
    const url = new URL(window.location.href);
    url.searchParams.set('filter', newFilter);
    window.history.replaceState(null, '', url.pathname + url.search);
  };

  const getSubjectColor = (subject: string) => {
    const s = subject.toLowerCase();
    if (s.includes('anal')) return 'text-analyse bg-analyse/10 border-analyse/20';
    if (s.includes('phys')) return 'text-physique bg-physique/10 border-physique/20';
    if (s.includes('alg')) return 'text-algebre bg-algebre/10 border-algebre/20';
    if (s.includes('méc') || s.includes('mec')) return 'text-mecanique bg-mecanique/10 border-mecanique/20';
    if (s.includes('meth')) return 'text-methodologie bg-methodologie/10 border-methodologie/20';
    if (s.includes('info')) return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    return 'text-zinc-300 bg-zinc-800 border-zinc-700';
  };

  const filteredTasks = tasks.filter((t) => {
    // If this task is transitioning out, keep it rendered during the animation
    if (transitioningTasks[t.id]) return true;

    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const overdueTasks = filteredTasks.filter((t) => t.section === 'overdue');
  const todayTasks = filteredTasks.filter((t) => t.section === 'today');
  const laterTasks = filteredTasks.filter((t) => t.section === 'later');

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const isOverdueAllExiting = overdueTasks.length > 0 && overdueTasks.every((t) => transitioningTasks[t.id] === 'exiting');
  const isTodayAllExiting = todayTasks.length > 0 && todayTasks.every((t) => transitioningTasks[t.id] === 'exiting');
  const isLaterAllExiting = laterTasks.length > 0 && laterTasks.every((t) => transitioningTasks[t.id] === 'exiting');

  const renderTaskItem = (task: TaskItem) => {
    const isExiting = transitioningTasks[task.id] === 'exiting';
    const isRecentlyCompleted = recentlyCompletedId === task.id;

    return (
      <div
        key={task.id}
        style={{
          transitionProperty: 'all',
          transitionDuration: isExiting ? '320ms' : '260ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className={`flex items-center justify-between border-b border-[#2a2a32] last:border-b-0 relative group first:rounded-t-2xl last:rounded-b-2xl ${
          isExiting
            ? 'max-h-0 !p-0 !border-b-0 opacity-0 translate-x-4 overflow-hidden pointer-events-none'
            : 'max-h-[350px] p-5 sm:p-6 opacity-100 translate-x-0'
        } ${
          activeMenuTaskId === task.id ? 'z-30' : 'z-0'
        } ${
          isRecentlyCompleted
            ? 'bg-emerald-500/[0.08] shadow-[inset_0_0_24px_rgba(16,185,129,0.08)]'
            : task.completed && activeMenuTaskId !== task.id
            ? 'opacity-60 hover:opacity-100 bg-transparent'
            : 'hover:bg-[#1a1a20]'
        }`}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0 mr-4">
          {/* Circular Checkbox Button */}
          <button
            type="button"
            aria-label={task.completed ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as completed`}
            onClick={(e) => {
              e.stopPropagation();
              toggleComplete(task.id);
            }}
            className="group/chk relative w-11 h-11 -ml-1.5 -mt-0.5 flex items-center justify-center shrink-0 rounded-xl focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none cursor-pointer"
          >
            {/* Ripple ping effect when freshly checkmarked */}
            {isRecentlyCompleted && (
              <span className="absolute w-8 h-8 rounded-full bg-emerald-400/35 animate-ping pointer-events-none" />
            )}

            <div
              className={`w-[26px] h-[26px] rounded-full border-[2px] flex items-center justify-center transition-all duration-300 transform active:scale-90 group-hover/chk:scale-105 ${
                task.completed
                  ? 'border-emerald-500 bg-emerald-500 text-black'
                  : 'border-borderPanel group-hover/chk:border-white bg-transparent'
              }`}
            >
              <iconify-icon
                icon="lucide:check"
                width="15"
                className={`text-black font-extrabold stroke-[3] transition-all duration-200 transform ${
                  task.completed
                    ? 'scale-100 opacity-100 rotate-0'
                    : 'scale-0 opacity-0 -rotate-45'
                }`}
              />
            </div>
          </button>

          {/* Task Details Button (Keyboard Accessible) */}
          <button
            type="button"
            onClick={() => onSelectTask(task)}
            className="flex flex-col gap-1.5 flex-1 min-w-0 text-left p-1 -m-1 rounded-xl focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none cursor-pointer"
          >
            <h3
              className={`text-[17px] sm:text-[18px] font-bold tracking-tight transition-all duration-300 truncate ${
                task.completed
                  ? 'text-textSubtle line-through decoration-zinc-500 decoration-[1.5px]'
                  : 'text-white group-hover:text-zinc-200'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-[14px] sm:text-[14.5px] font-medium leading-relaxed line-clamp-2 transition-all duration-300 ${
                  task.completed
                    ? 'text-textSubtle/70 line-through decoration-zinc-600'
                    : 'text-zinc-300'
                }`}
              >
                {task.description}
              </p>
            )}
            <div
              className={`flex items-center gap-2.5 sm:gap-3 mt-2 flex-wrap transition-opacity duration-300 ${
                task.completed ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <span
                className={`px-2.5 py-1 rounded-md text-[12px] font-bold border transition-colors ${getSubjectColor(
                  task.subject
                )}`}
              >
                {task.subject}
              </span>
              <span
                className={`text-[13px] sm:text-[13.5px] font-bold flex items-center gap-1.5 transition-colors ${
                  task.section === 'overdue' && !task.completed
                    ? 'text-red-400'
                    : 'text-zinc-400'
                }`}
              >
                <iconify-icon
                  icon={task.section === 'overdue' ? 'lucide:clock' : 'lucide:calendar'}
                  width="15"
                />
                {formatDueDateDisplay(task.dueDate)}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[12px] font-bold uppercase tracking-wider transition-colors ${
                  task.priority === 'High' && !task.completed
                    ? 'text-red-400'
                    : task.priority === 'Medium' && !task.completed
                    ? 'text-amber-400'
                    : 'text-zinc-400'
                }`}
              >
                • {task.priority}
              </span>
            </div>
          </button>
        </div>

      {/* 3 Dots Menu Button & Options Popup */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={(e) => handleToggleMenu(e, task.id)}
          aria-label="Task options"
          className={`p-2.5 rounded-xl transition-all cursor-pointer ${
            activeMenuTaskId === task.id
              ? 'text-white bg-[#27272a] opacity-100'
              : 'text-textMuted hover:text-white hover:bg-[#27272a] opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
          }`}
          title="Task options"
        >
          <iconify-icon icon="lucide:more-vertical" width="20" />
        </button>

        {/* Floating Options Menu */}
        {activeMenuTaskId === task.id && (
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            className={`absolute right-0 ${
              menuPlacement === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
            } w-[150px] bg-[#141416] border border-borderPanel rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] z-50 p-1 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100`}
          >
            <button
              onClick={() => {
                setActiveMenuTaskId(null);
                setEditingTask(task);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-semibold text-zinc-300 hover:text-white hover:bg-[#1f1f23] rounded-lg transition-colors text-left cursor-pointer"
            >
              <iconify-icon icon="lucide:pencil" width="14" className="text-zinc-400" />
              Edit Task
            </button>

            <div className="h-[1px] bg-[#27272a] my-0.5" />

            <button
              onClick={() => {
                setActiveMenuTaskId(null);
                setDeletingTask(task);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left cursor-pointer"
            >
              <iconify-icon icon="lucide:trash-2" width="14" className="text-red-400" />
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

  return (
    <div id="page-tasks" className="flex flex-col h-full w-full">
      {/* Header */}
      <header className="px-4 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-borderPanel bg-panel/85 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1.5 sm:mb-2">Tasks</h1>
          <p className="text-sm font-medium text-textMuted">Manage your pending assignments and to-dos.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewTask}
            className="bg-white hover:bg-zinc-200 text-black px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <iconify-icon icon="lucide:plus" width="16" />
            <span>New Task</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 pb-20 md:pb-10 flex flex-col gap-6 sm:gap-8 scrollbar-hide">
        {/* Task Filters - Status Badges */}
        <div className="border-b border-borderPanel pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto scrollbar-hide py-1 -my-1">
            <button
              type="button"
              onClick={() => handleFilterChange('pending')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0 ${
                filter === 'pending'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                  : 'bg-[#141418] border-[#272730] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-[#181820]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  filter === 'pending' ? 'bg-amber-400' : 'bg-amber-500/50'
                }`}
              />
              <span>Pending</span>
              <span className="text-[12px] font-bold">({pendingCount})</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterChange('completed')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0 ${
                filter === 'completed'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                  : 'bg-[#141418] border-[#272730] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-[#181820]'
              }`}
            >
              <iconify-icon
                icon="lucide:check-circle-2"
                width="15"
                className={filter === 'completed' ? 'text-emerald-400 shrink-0' : 'text-textSubtle shrink-0'}
              />
              <span>Completed</span>
              <span className="text-[12px] font-bold">({completedCount})</span>
            </button>

            <button
              type="button"
              onClick={() => handleFilterChange('all')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer shadow-sm active:scale-95 shrink-0 ${
                filter === 'all'
                  ? 'bg-white/10 border-white/25 text-white'
                  : 'bg-[#141418] border-[#272730] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-[#181820]'
              }`}
            >
              <iconify-icon
                icon="lucide:layers"
                width="15"
                className={filter === 'all' ? 'text-cyan-400 shrink-0' : 'text-textSubtle shrink-0'}
              />
              <span>All Tasks</span>
              <span className="text-[12px] font-bold">({tasks.length})</span>
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          tasks.length === 0 ? (
            <div className="py-20 px-4 text-center flex flex-col items-center justify-center max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-b from-[#1c1c22] to-[#121216] border border-[#272723] flex items-center justify-center text-cyan-400 mb-4 shadow-xl">
                <iconify-icon icon="lucide:clipboard-check" width="32" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                No tasks on your plate yet
              </h3>
              <p className="text-[14px] sm:text-[15px] text-zinc-400 leading-relaxed mb-6">
                Keep your coursework, problem sets, and revision deadlines organized in one clean schedule.
              </p>
              <button
                type="button"
                onClick={onOpenNewTask}
                className="px-6 py-3 rounded-full bg-white text-black font-bold text-[14px] hover:bg-zinc-200 transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <iconify-icon icon="lucide:plus" width="16" />
                <span>Create Your First Task</span>
              </button>
            </div>
          ) : filter === 'pending' && pendingCount === 0 && completedCount > 0 ? (
            <div className="py-20 px-4 text-center flex flex-col items-center justify-center max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-xl shadow-emerald-500/5">
                <iconify-icon icon="lucide:party-popper" width="32" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[12px] font-bold tracking-wide uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>All Caught Up</span>
              </div>
              <h3 className="text-[20px] sm:text-xl font-bold text-white tracking-tight mb-2">
                Great job! All tasks completed
              </h3>
              <p className="text-[14px] sm:text-[15px] text-zinc-400 leading-relaxed mb-6">
                You have finished every pending task for today. Enjoy your free time or review completed items.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleFilterChange('completed')}
                  className="px-5 py-2.5 rounded-full bg-cardHover border border-[#272730] text-zinc-200 hover:text-white hover:bg-[#27272a] font-bold text-sm transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  View Completed ({completedCount})
                </button>
                <button
                  type="button"
                  onClick={onOpenNewTask}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-sm cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <iconify-icon icon="lucide:plus" width="15" />
                  <span>New Task</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 px-4 text-center flex flex-col items-center justify-center max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-[#141418] border border-[#272730] flex items-center justify-center text-zinc-300 mb-4 shadow-xl ring-1 ring-white/5">
                <iconify-icon icon="lucide:filter-x" width="30" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                No tasks matching this filter
              </h3>
              <p className="text-[14px] sm:text-[15px] font-medium text-zinc-400 leading-relaxed mb-6">
                You have no tasks in this view.
              </p>
              <button
                type="button"
                onClick={() => handleFilterChange('all')}
                className="px-6 py-2.5 sm:py-3 rounded-full bg-[#18181c] border border-[#2e2e34] hover:border-zinc-500 hover:bg-[#24242c] text-white text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <iconify-icon icon="lucide:layers" width="16" className="text-cyan-400" />
                <span>Show All Tasks ({tasks.length})</span>
              </button>
            </div>
          )
        ) : (
          <>
            {/* Overdue Section */}
            {overdueTasks.length > 0 && (
              <section className={`flex flex-col gap-3.5 relative transition-opacity duration-300 ${isOverdueAllExiting ? 'opacity-0' : 'opacity-100'} ${overdueTasks.some(t => t.id === activeMenuTaskId) ? 'z-30' : 'z-10'}`}>
                <h2 className="text-[14px] sm:text-[15px] font-extrabold text-red-400 uppercase tracking-[0.12em] px-1 flex items-center gap-2">
                  <span>Overdue</span>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                </h2>
                <div className="bg-[#121215] border border-[#2a2a32] rounded-2xl flex flex-col shadow-sm">
                  {overdueTasks.map(renderTaskItem)}
                </div>
              </section>
            )}

            {/* Today Section */}
            {todayTasks.length > 0 && (
              <section className={`flex flex-col gap-3.5 relative transition-opacity duration-300 ${isTodayAllExiting ? 'opacity-0' : 'opacity-100'} ${todayTasks.some(t => t.id === activeMenuTaskId) ? 'z-30' : 'z-10'}`}>
                <h2 className="text-[14px] sm:text-[15px] font-extrabold text-zinc-300 uppercase tracking-[0.12em] px-1">
                  Today
                </h2>
                <div className="bg-[#121215] border border-[#2a2a32] rounded-2xl flex flex-col shadow-sm">
                  {todayTasks.map(renderTaskItem)}
                </div>
              </section>
            )}

            {/* Later Section */}
            {laterTasks.length > 0 && (
              <section className={`flex flex-col gap-3.5 relative transition-opacity duration-300 ${isLaterAllExiting ? 'opacity-0' : 'opacity-100'} ${laterTasks.some(t => t.id === activeMenuTaskId) ? 'z-30' : 'z-10'}`}>
                <h2 className="text-[14px] sm:text-[15px] font-extrabold text-zinc-300 uppercase tracking-[0.12em] px-1">
                  Later this week
                </h2>
                <div className="bg-[#121215] border border-[#2a2a32] rounded-2xl flex flex-col shadow-sm">
                  {laterTasks.map(renderTaskItem)}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Edit Task Modal Popup */}
      <EditTaskModal
        isOpen={!!editingTask}
        task={editingTask}
        onClose={() => {
          setEditingTask(null);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            if (url.searchParams.has('modal')) {
              url.searchParams.delete('modal');
              window.history.replaceState({}, '', url.toString());
            }
          }
        }}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Modal Popup */}
      <DeleteTaskModal
        isOpen={!!deletingTask}
        task={deletingTask}
        onClose={() => {
          setDeletingTask(null);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            if (url.searchParams.has('modal')) {
              url.searchParams.delete('modal');
              window.history.replaceState({}, '', url.toString());
            }
          }
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
