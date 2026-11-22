import React, { useState, useEffect } from 'react';
import type { TaskData } from '../../types';

interface TodayTasksProps {
  onSelectTask: (task: TaskData) => void;
  onViewAllTasks: () => void;
  onOpenNewTask?: () => void;
  mockEmpty?: boolean;
  mockState?: 'normal' | 'in-progress' | 'empty' | 'all-done';
}

interface DashboardTask {
  id: string;
  title: string;
  subject: string;
  subjectColor?: string;
  type?: string;
  chapter?: string;
  dueDate: string;
  dueUrgent?: boolean;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  description: string;
  subtasks?: { text: string; completed: boolean }[];
}

const INITIAL_TASKS: DashboardTask[] = [
  {
    id: 'dt-1',
    title: 'Finish Mathematics Assignment',
    subject: 'Math',
    subjectColor: '#06b6d4',
    type: 'Assignment',
    chapter: 'Chapter 4 : Linear Equations',
    dueDate: 'Due 23:59',
    dueUrgent: true,
    priority: 'High',
    completed: false,
    description: 'Chapter 4 : Linear Equations exercises 1 to 20. Make sure to detail intermediate steps for matrix reduction.',
    subtasks: [
      { text: 'Complete exercises 1 to 10 (System systems)', completed: true },
      { text: 'Complete exercises 11 to 20 (Determinants)', completed: false },
      { text: 'Check answers with the tutorial solution sheet', completed: false },
    ],
  },
  {
    id: 'dt-2',
    title: 'Review Physics Notes',
    subject: 'Physics',
    subjectColor: '#10b981',
    type: 'Revision',
    chapter: 'Quantum Mechanics',
    dueDate: 'Tomorrow',
    dueUrgent: false,
    priority: 'Medium',
    completed: false,
    description: 'Quantum Mechanics slide deck, particle-wave duality, and uncertainty principle formulation.',
    subtasks: [
      { text: 'Read lecture slides 1 through 35', completed: true },
      { text: 'Derive Heisenberg uncertainty formula', completed: false },
      { text: 'Summarize key equations on index cards', completed: false },
    ],
  },
  {
    id: 'dt-3',
    title: 'Submit Chemistry Lab Report',
    subject: 'Chemistry',
    subjectColor: '#a855f7',
    type: 'Lab Report',
    chapter: 'Heat capacities & reaction yields',
    dueDate: 'Completed',
    dueUrgent: false,
    priority: 'Low',
    completed: true,
    description: 'Experiment 4 on heat capacities and reaction yields with calorimeter error calculations.',
    subtasks: [
      { text: 'Compile raw calorimeter data points', completed: true },
      { text: 'Calculate enthalpy & percentage yield', completed: true },
      { text: 'Format graphs and export PDF for submission', completed: true },
    ],
  },
  {
    id: 'dt-4',
    title: 'TD 3 : Algèbre - Espaces Vectoriels',
    subject: 'Algèbre',
    subjectColor: '#ec4899',
    type: 'Exercises',
    chapter: 'Sous-espaces stables & Théorème du rang',
    dueDate: 'Tomorrow',
    dueUrgent: false,
    priority: 'Medium',
    completed: false,
    description: 'Prepare tutorial sheet 3 exercises 1 to 5 on stable subspaces and rank theorem for Thursday class.',
    subtasks: [
      { text: 'Prove lemma on direct sum stability', completed: true },
      { text: 'Compute matrix of projection operator', completed: false },
    ],
  },
];

export const TodayTasks: React.FC<TodayTasksProps> = ({
  onSelectTask,
  onViewAllTasks,
  onOpenNewTask,
  mockEmpty = false,
  mockState = 'normal',
}) => {
  const [tasks, setTasks] = useState<DashboardTask[]>(() => {
    if (mockEmpty || mockState === 'empty') return [];
    if (mockState === 'all-done') {
      return INITIAL_TASKS.map((t) => ({ ...t, completed: true }));
    }
    if (mockState === 'in-progress') {
      return INITIAL_TASKS.map((t, idx) => ({ ...t, completed: idx < 2 }));
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    if (mockEmpty || mockState === 'empty') {
      setTasks([]);
    } else if (mockState === 'all-done') {
      setTasks(INITIAL_TASKS.map((t) => ({ ...t, completed: true })));
    } else if (mockState === 'in-progress') {
      setTasks(INITIAL_TASKS.map((t, idx) => ({ ...t, completed: idx < 2 })));
    } else {
      setTasks(INITIAL_TASKS);
    }
  }, [mockEmpty, mockState]);

  const toggleTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const isAllTasksDone = tasks.length > 0 && completedCount === tasks.length;

  return (
    <section className="bg-[#101012] border border-[#25252b] rounded-[24px] p-6 sm:p-7 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-[22px] font-bold text-white tracking-tight">Today's Tasks</h2>
          {isAllTasksDone ? (
            <span className="text-xs sm:text-[13px] font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
              <iconify-icon icon="lucide:check" width="14" />
              <span>All Done</span>
            </span>
          ) : tasks.length === 0 ? (
            <span className="text-xs sm:text-[13px] font-bold px-3 py-1 rounded-full bg-[#1b1b20] text-zinc-400 border border-[#2c2c34] inline-flex items-center">
              0 Tasks
            </span>
          ) : (
            <span className="text-xs sm:text-[13px] font-bold px-3 py-1 rounded-full bg-[#1b1b20] text-zinc-300 border border-[#2c2c34] inline-flex items-center">
              {completedCount}/{tasks.length} Done
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onViewAllTasks}
          className="text-[13.5px] sm:text-[14px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Celebratory Status Bar when all tasks are complete */}
      {isAllTasksDone && (
        <div className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2 font-medium">
            <iconify-icon icon="lucide:check-circle-2" width="16" className="text-emerald-400 shrink-0" />
            <span>All tasks completed for today</span>
          </div>
          {onOpenNewTask && (
            <button
              type="button"
              onClick={onOpenNewTask}
              className="font-bold text-emerald-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <iconify-icon icon="lucide:plus" width="13" />
              <span>Add New</span>
            </button>
          )}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="py-12 sm:py-14 px-6 text-center flex flex-col items-center justify-center bg-[#141418] border border-[#27272e] rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#1b1b21] border border-[#2c2c36] flex items-center justify-center text-zinc-300 mb-4 shadow-inner">
            <iconify-icon icon="lucide:check-circle-2" width="26" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">No tasks for today</h3>
          <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
            You have no deadlines due today. Plan ahead or take time to review past material.
          </p>
          <button
            type="button"
            onClick={onOpenNewTask || onViewAllTasks}
            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <iconify-icon icon="lucide:plus" width="16" />
            <span>Add Task</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {tasks.map((task) => {
            const isCompleted = task.completed;
            const isUrgent = task.dueUrgent && !isCompleted;

            return (
              <div
                key={task.id}
                className={`flex items-center justify-between group hover:bg-[#18181c] py-3.5 sm:py-4 px-3.5 sm:px-4 -mx-3.5 rounded-2xl transition-colors gap-3.5 ${
                  isCompleted ? 'bg-cardBg' : ''
                }`}
              >
                {/* Accessible Checkbox */}
                <button
                  type="button"
                  onClick={(e) => toggleTask(task.id, e)}
                  aria-label={isCompleted ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as completed`}
                  className="group/chk w-9.5 h-9.5 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 -ml-0.5 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none cursor-pointer"
                >
                  <div
                    className={`w-[22px] h-[22px] sm:w-[23px] sm:h-[23px] rounded-[6px] border-[2px] flex items-center justify-center transition-all duration-200 transform active:scale-90 ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-black'
                        : isUrgent
                        ? 'border-red-400/80 group-hover/chk:bg-red-500/10'
                        : 'border-zinc-500 group-hover/chk:border-zinc-300'
                    }`}
                  >
                    <iconify-icon
                      icon="lucide:check"
                      width="14"
                      className={`text-black font-extrabold stroke-[3] transition-all duration-150 transform ${
                        isCompleted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                  </div>
                </button>

                {/* Task Details Button */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectTask({
                      id: task.id,
                      title: task.title,
                      subject: task.subject,
                      subjectColor: task.subjectColor,
                      type: task.type,
                      dueDate: task.dueDate,
                      priority: task.priority,
                      description: task.description,
                      subtasks: task.subtasks,
                    })
                  }
                  className="flex-1 flex items-center justify-between min-w-0 text-left p-1 -m-1 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none cursor-pointer"
                >
                  <div className="flex flex-col gap-1 min-w-0 flex-1 mr-3">
                    <h3
                      className={`text-[15.5px] sm:text-[16.5px] font-bold transition-all duration-200 leading-snug tracking-tight ${
                        isCompleted
                          ? 'text-textSubtle line-through decoration-zinc-500'
                          : 'text-white group-hover:text-zinc-200'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[13px] sm:text-[13.5px] text-zinc-300 flex-wrap">
                      <span className="text-zinc-300 font-medium flex items-center gap-1.5 shrink-0">
                        <iconify-icon icon="lucide:calendar-clock" width="14" className="text-amber-400 shrink-0" />
                        <span>{task.dueDate}</span>
                      </span>
                      <span className="text-textSubtle">•</span>
                      <span className="text-zinc-200 font-semibold shrink-0">{task.subject}</span>
                      {task.chapter && (
                        <>
                          <span className="text-textSubtle">•</span>
                          <span className="text-zinc-400 font-normal truncate">{task.chapter}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Render priority pill only when active */}
                    {!isCompleted && (
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs sm:text-[12.5px] font-bold tabular-nums ${
                          task.priority === 'High'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : task.priority === 'Medium'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-zinc-800 text-zinc-300 border border-zinc-700/50'
                        }`}
                      >
                        {task.priority}
                      </span>
                    )}
                    <iconify-icon
                      icon="lucide:chevron-right"
                      width="17"
                      className="text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
