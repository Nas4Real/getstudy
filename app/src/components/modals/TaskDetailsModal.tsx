import { Dialog } from '../common/Dialog';
import React, { useState, useEffect } from 'react';
import type { TaskData } from '../../types';

interface TaskDetailsModalProps {
  isOpen: boolean;
  task: TaskData | null;
  onClose: () => void;
  onComplete: () => void;
  onDelete: () => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  task,
  onClose,
  onComplete,
  onDelete,
}) => {

  const defaultTask: TaskData = {
    priority: 'High',
    subject: 'Math',
    subjectColor: '#06b6d4',
    title: 'Complete Chapter 4 Exercises',
    dueDate: 'Due Tomorrow, 11:59 PM',
    type: 'Assignment',
    completed: false,
    description:
      'Finish all the odd-numbered problems from pages 112 to 118. Pay special attention to the proofs on integrals as they will likely appear on the midterm next week.',
    subtasks: [
      { text: 'Review theorem proofs and class notes', completed: true },
      { text: 'Solve odd-numbered problems 1 to 15', completed: false },
      { text: 'Write down step-by-step proofs for integrals', completed: false },
    ],
  };

  const data: TaskData = task || defaultTask;

  const getDefaultSubtasks = (t: TaskData) => {
    if (t.subtasks && t.subtasks.length > 0) return t.subtasks;
    const titleLower = t.title.toLowerCase();
    const subLower = t.subject.toLowerCase();

    if (subLower.includes('anal') || subLower.includes('math')) {
      return [
        { text: 'Review theorem proofs and class notes', completed: true },
        { text: 'Solve core calculation problems', completed: false },
        { text: 'Write down formal step-by-step proofs', completed: false },
      ];
    }
    if (subLower.includes('phys')) {
      return [
        { text: 'Review formula sheet and unit conversions', completed: true },
        { text: 'Work through textbook numerical problems', completed: false },
        { text: 'Check edge cases and free-body diagrams', completed: false },
      ];
    }
    if (subLower.includes('chim') || titleLower.includes('lab')) {
      return [
        { text: 'Calculate experimental error margins', completed: true },
        { text: 'Draft observation results and reaction yields', completed: false },
        { text: 'Complete final lab conclusion writeup', completed: false },
      ];
    }
    return [
      { text: 'Review lecture notes & background material', completed: true },
      { text: 'Draft solution and work out primary steps', completed: false },
      { text: 'Review final output before submission', completed: false },
    ];
  };

  const [subtasks, setSubtasks] = useState(getDefaultSubtasks(data));
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    if (data.completed !== undefined) return data.completed;
    if (data.dueDate.toLowerCase().includes('completed')) return true;
    return false;
  });

  // Sync state when task changes
  useEffect(() => {
    if (data) {
      setSubtasks(getDefaultSubtasks(data));
      setIsCompleted(
        data.completed !== undefined
          ? data.completed
          : data.dueDate.toLowerCase().includes('completed')
      );
    }
  }, [task]);

  if (!isOpen) return null;

  const getSubjectColor = (subject: string, explicitColor?: string) => {
    if (explicitColor) return explicitColor;
    const s = subject.toLowerCase();
    if (s.includes('anal') || s.includes('math')) return '#06b6d4';
    if (s.includes('méc') || s.includes('mec') || s.includes('m\u00e9th')) return '#3b82f6';
    if (s.includes('phys')) return '#10b981';
    if (s.includes('alg')) return '#ec4899';
    if (s.includes('chim')) return '#a855f7';
    return '#f59e0b';
  };

  const subjectColor = getSubjectColor(data.subject, data.subjectColor);
  const taskType =
    data.type ||
    (data.title.toLowerCase().includes('assignment')
      ? 'Assignment'
      : data.title.toLowerCase().includes('lab')
      ? 'Lab Report'
      : data.title.toLowerCase().includes('read')
      ? 'Reading'
      : 'Exercise');

  const completedCount = subtasks.filter((st) => st.completed).length;

  const toggleSubtask = (idx: number) => {
    setSubtasks((prev) => {
      const next = prev.map((st, i) => (i === idx ? { ...st, completed: !st.completed } : st));
      const allDone = next.length > 0 && next.every((s) => s.completed);
      if (allDone && !isCompleted) {
        setIsCompleted(true);
      } else if (!allDone && isCompleted) {
        setIsCompleted(false);
      }
      return next;
    });
  };

  const handleToggleComplete = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    // Align all subtasks with the task's completion status
    setSubtasks((prev) => prev.map((st) => ({ ...st, completed: nextState })));
    if (nextState) {
      onComplete();
    }
  };

  return (
    <Dialog label="Task details" onClose={onClose}>
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="relative w-full max-w-[480px] rounded-2xl border border-[#2a2a2e] bg-[#101013] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Subtle Ambient Top Glow */}
        <div
          className="absolute top-0 inset-x-0 h-28 opacity-20 pointer-events-none bg-gradient-to-b from-[var(--sub-color)] to-transparent"
          style={{ '--sub-color': subjectColor } as React.CSSProperties}
        />

        {/* 1. Header (Consistent with Exam & Session Popups) */}
        <div className="relative flex flex-col gap-3 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-[#202026]">
          {/* Top row: Subject Pill, Priority Badge, Status Badge, Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/[0.05] border border-white/10 text-zinc-200">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: subjectColor }}
                />
                {data.subject}
              </span>

              {/* Priority Badge */}
              {data.priority === 'High' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  High
                </span>
              ) : data.priority === 'Medium' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Medium
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Low
                </span>
              )}

              {/* Status Badge */}
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Done
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  Pending
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close task details"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171719] text-zinc-400 hover:bg-[#232326] hover:text-white transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
              title="Close (Esc)"
            >
              <iconify-icon icon="lucide:x" width="16" />
            </button>
          </div>

          {/* Title with Interactive Checkbox & Metadata */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={handleToggleComplete}
              aria-label={isCompleted ? 'Mark task as incomplete' : 'Mark task as complete'}
              className={`mt-1 w-5 h-5 rounded-[6px] border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500 border-emerald-500 text-black'
                  : 'border-zinc-600 hover:border-zinc-400 bg-white/[0.02]'
              }`}
              title={isCompleted ? 'Mark as incomplete' : 'Mark as done'}
            >
              {isCompleted && (
                <iconify-icon icon="lucide:check" width="13" className="text-black font-extrabold" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <h2
                className={`text-lg font-bold tracking-tight leading-snug transition-colors ${
                  isCompleted ? 'text-textSubtle line-through decoration-zinc-500' : 'text-white'
                }`}
              >
                {data.title}
              </h2>
              <p className="mt-1 text-[12.5px] text-zinc-400 flex items-center gap-1.5">
                <iconify-icon icon="lucide:calendar-clock" width="13" className="text-textSubtle" />
                <span>{data.dueDate}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Body: Two-Card Layout */}
        <div className="relative px-4 sm:px-6 py-4 sm:py-5 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Card 1: Overview & Description (YouTube Style) */}
          <div className="rounded-2xl bg-[#18181c] border border-[#26262e] p-4 text-[13px] flex flex-col gap-2.5">
            {/* Top metadata stats line */}
            <div className="flex items-center gap-2.5 text-white font-bold text-[13px] flex-wrap">
              <span>{data.dueDate.startsWith('Due') ? data.dueDate : `Due ${data.dueDate}`}</span>
              <span className="text-zinc-400 font-normal">•</span>
              <span>{data.priority} Priority</span>
              {taskType && (
                <>
                  <span className="text-zinc-400 font-normal">•</span>
                  <span className="text-zinc-400 font-normal">{taskType}</span>
                </>
              )}
            </div>

            {/* Description text */}
            <p className="text-zinc-300 leading-relaxed font-normal">
              {data.description ||
                'Complete the assigned exercises and prepare questions for the next session.'}
            </p>
          </div>

          {/* Card 2: Subtasks Table (YouTube / Tracklist Style) */}
          {subtasks.length > 0 && (
            <div className="rounded-2xl bg-[#18181c] border border-[#26262e] overflow-hidden divide-y divide-[#24242c] text-[13px]">
              {/* Table Header */}
              <div className="px-4 py-2.5 bg-[#141418] flex items-center justify-between text-[12px] font-semibold text-zinc-400">
                <span>Subtasks ({completedCount}/{subtasks.length})</span>
                <span className="text-[11px] font-semibold text-zinc-400">
                  {Math.round((completedCount / (subtasks.length || 1)) * 100)}% Done
                </span>
              </div>

              {/* Subtask Rows */}
              {subtasks.map((st, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleSubtask(idx)}
                  className="px-4 py-2.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Interactive Custom Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubtask(idx);
                      }}
                      className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 transition-all ${
                        st.completed
                          ? 'bg-emerald-500 border-emerald-500 text-black'
                          : 'border-zinc-600 hover:border-zinc-400 bg-white/[0.02]'
                      }`}
                    >
                      {st.completed && (
                        <iconify-icon
                          icon="lucide:check"
                          width="12"
                          className="text-black font-extrabold"
                        />
                      )}
                    </button>

                    <span className="text-[12px] font-semibold text-textSubtle w-5 shrink-0 group-hover:text-zinc-300">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`text-[13px] font-medium transition-colors truncate ${
                        st.completed ? 'text-textSubtle line-through' : 'text-zinc-200 group-hover:text-white'
                      }`}
                    >
                      {st.text}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0 border ${
                      st.completed
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                        : 'bg-zinc-800/80 text-zinc-400 border-zinc-700/50'
                    }`}
                  >
                    {st.completed ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Footer */}
        <div className="relative flex items-center justify-between border-t border-[#202026] px-4 sm:px-6 py-3.5 bg-[#0b0b0e] rounded-b-2xl">
          <button
            type="button"
            onClick={onDelete}
            className="text-[12.5px] font-medium text-textSubtle hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <iconify-icon icon="lucide:trash-2" width="14" />
            Delete Task
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-[#222228] hover:bg-[#2c2c34] px-4 py-1.5 text-[12.5px] font-semibold text-white transition-colors cursor-pointer"
            >
              Close
            </button>

            {/* Clear, State-Aware Primary Action Button */}
            {isCompleted ? (
              <button
                type="button"
                onClick={handleToggleComplete}
                className="group rounded-lg bg-emerald-500/15 hover:bg-red-500/10 border border-emerald-500/30 hover:border-red-500/30 px-4 py-1.5 text-[12.5px] font-semibold text-emerald-400 hover:text-red-400 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Click to reopen task"
              >
                <iconify-icon icon="lucide:check-circle-2" width="14" className="group-hover:hidden" />
                <iconify-icon icon="lucide:rotate-ccw" width="14" className="hidden group-hover:inline-block" />
                <span className="group-hover:hidden">Completed</span>
                <span className="hidden group-hover:inline">Mark Incomplete</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggleComplete}
                className="rounded-lg bg-white hover:bg-zinc-200 px-4 py-1.5 text-[12.5px] font-bold text-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
              >
                <iconify-icon icon="lucide:check" width="15" className="text-black stroke-[3]" />
                Mark as Done
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
    </Dialog>
  );
};
