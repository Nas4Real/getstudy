import { Dialog } from '../common/Dialog';
import React, { useState, useEffect, useRef } from 'react';
import type { TaskData } from '../../types';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskData) => void;
}

const SUBJECTS = [
  { name: 'Analyse', color: '#06b6d4' },
  { name: 'Algèbre', color: '#ec4899' },
  { name: 'Physique', color: '#10b981' },
  { name: 'Mécanique', color: '#3b82f6' },
  { name: 'Chimie', color: '#a855f7' },
  { name: 'Méthodologie', color: '#f59e0b' },
  { name: 'Other', color: '#71717a' },
];

const PRIORITIES: {
  value: 'High' | 'Medium' | 'Low';
  label: string;
  badge: string;
  color: string;
  dotClass: string;
}[] = [
  {
    value: 'High',
    label: 'High Priority',
    badge: 'Urgent',
    color: '#ef4444',
    dotClass: 'bg-red-500',
  },
  {
    value: 'Medium',
    label: 'Medium Priority',
    badge: 'Normal',
    color: '#f59e0b',
    dotClass: 'bg-amber-500',
  },
  {
    value: 'Low',
    label: 'Low Priority',
    badge: 'Optional',
    color: '#10b981',
    dotClass: 'bg-emerald-500',
  },
];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const formatDisplayDate = (dateStr: string) => {
  if (!dateStr) return 'Select date';
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  const dateObj = new Date(y, m - 1, d);

  const today = new Date();
  const isToday =
    today.getFullYear() === y &&
    today.getMonth() === m - 1 &&
    today.getDate() === d;

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    tomorrow.getFullYear() === y &&
    tomorrow.getMonth() === m - 1 &&
    tomorrow.getDate() === d;

  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = shortMonths[m - 1] || '';

  if (isToday) return `Today, ${d} ${monthName}`;
  if (isTomorrow) return `Tmrw, ${d} ${monthName}`;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[dateObj.getDay()] || '';
  return `${dayName}, ${d} ${monthName}`;
};

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Analyse');
  const [dueDate, setDueDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState<{ id: string; text: string }[]>([]);

  // Dropdown states
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const subjectRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const priorityRef = useRef<HTMLDivElement>(null);

  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    try {
      const [y, m] = new Date().toISOString().slice(0, 10).split('-').map(Number);
      return new Date(y, m - 1, 1);
    } catch {
      return new Date();
    }
  });

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (subjectRef.current && !subjectRef.current.contains(target)) {
        setIsSubjectOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(target)) {
        setIsDateOpen(false);
      }
      if (priorityRef.current && !priorityRef.current.contains(target)) {
        setIsPriorityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const selectedPriority =
    PRIORITIES.find((p) => p.value === priority) || PRIORITIES[1];

  const selectedSubject =
    SUBJECTS.find((s) => s.name === subject) || SUBJECTS[0];

  // Calendar calculations
  const viewYear = calendarViewDate.getFullYear();
  const viewMonth = calendarViewDate.getMonth(); // 0-indexed

  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPreviousMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayWeekday = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const [selectedY, selectedM, selectedD] = dueDate
    ? dueDate.split('-').map(Number)
    : [0, 0, 0];

  const todayObj = new Date();
  const todayY = todayObj.getFullYear();
  const todayM = todayObj.getMonth() + 1;
  const todayD = todayObj.getDate();

  const calendarCells: {
    day: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
  }[] = [];

  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const prevDate = new Date(viewYear, viewMonth, 0);
    calendarCells.push({
      day: daysInPreviousMonth - i,
      month: prevDate.getMonth() + 1,
      year: prevDate.getFullYear(),
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInCurrentMonth; d++) {
    calendarCells.push({
      day: d,
      month: viewMonth + 1,
      year: viewYear,
      isCurrentMonth: true,
    });
  }

  const remainingDays = 7 - (calendarCells.length % 7);
  if (remainingDays < 7) {
    const nextDate = new Date(viewYear, viewMonth + 1, 1);
    for (let d = 1; d <= remainingDays; d++) {
      calendarCells.push({
        day: d,
        month: nextDate.getMonth() + 1,
        year: nextDate.getFullYear(),
        isCurrentMonth: false,
      });
    }
  }

  const prevMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const nextMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleSelectDate = (y: number, m: number, d: number) => {
    const formatted = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    setDueDate(formatted);
    setIsDateOpen(false);
  };

  const handleQuickDate = (offsetDays: number) => {
    const target = new Date();
    target.setDate(target.getDate() + offsetDays);
    const y = target.getFullYear();
    const m = target.getMonth() + 1;
    const d = target.getDate();
    setDueDate(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    setCalendarViewDate(new Date(y, target.getMonth(), 1));
    setIsDateOpen(false);
  };

  const handleAddSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      {
        id: `st-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text: '',
      },
    ]);
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks((prev) => prev.filter((st) => st.id !== id));
  };

  const handleSubtaskTextChange = (id: string, text: string) => {
    setSubtasks((prev) =>
      prev.map((st) => (st.id === id ? { ...st, text } : st))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const validSubtasks = subtasks
      .map((st) => ({ text: st.text.trim(), completed: false }))
      .filter((st) => st.text.length > 0);

    onSubmit({
      id: `t-${Date.now()}`,
      title: title.trim(),
      subject,
      subjectColor: selectedSubject.color,
      dueDate,
      priority,
      description: description.trim() || undefined,
      subtasks: validSubtasks.length > 0 ? validSubtasks : undefined,
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSubject('Analyse');
    setPriority('Medium');
    setDueDate(new Date().toISOString().slice(0, 10));
    setSubtasks([]);
    setIsSubjectOpen(false);
    setIsDateOpen(false);
    setIsPriorityOpen(false);
    onClose();
  };

  return (
    <Dialog label="Add New Task" onClose={() => {
      if (isSubjectOpen || isDateOpen || isPriorityOpen) {
        setIsSubjectOpen(false);
        setIsDateOpen(false);
        setIsPriorityOpen(false);
      } else {
        handleClose();
      }
    }}>
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150 font-sans">
      <section
        className="relative w-full max-w-[480px] rounded-2xl border border-[#26262d] bg-[#101013] shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)] animate-in zoom-in-95 duration-150 flex flex-col font-sans max-h-[92vh] overflow-hidden"
      >
        {/* Ambient Top Edge Specular Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none rounded-t-2xl" />

        {/* 1. Header */}
        <div className="flex items-center justify-between border-b border-[#202026] px-4 sm:px-6 py-4 sm:py-5 bg-[#131317]/80 rounded-t-2xl">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300"
              style={{
                borderColor: `${selectedPriority.color}40`,
                backgroundColor: `${selectedPriority.color}15`,
                color: selectedPriority.color,
                boxShadow: `0 0 16px ${selectedPriority.color}25`,
              }}
            >
              <iconify-icon icon="lucide:check-square" width="19" />
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-white tracking-tight leading-snug">
                Add New Task
              </h2>
              <p className="text-[13px] text-zinc-400 font-normal leading-tight mt-0.5">
                Create an assignment, homework or revision goal to track
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close task modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#272730] bg-[#16161b] text-zinc-400 hover:text-white hover:bg-[#22222a] hover:border-zinc-500 transition-all cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
            title="Close (Esc)"
          >
            <iconify-icon icon="lucide:x" width="16" />
          </button>
        </div>

        {/* 2. Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 flex flex-col gap-4">
            {/* Prominent Task Title Input */}
            <div className="relative pt-1 pb-1">
              <input
                type="text"
                autoFocus
                data-autofocus
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Task title"
                placeholder="Task title (e.g. Exercises Chapter 4 — Séries)"
                className="w-full text-[17px] font-semibold text-white placeholder:text-zinc-400 bg-transparent border-b border-[#23232a] focus:border-zinc-400 pb-3 pt-1 outline-none transition-colors tracking-[-0.015em]"
              />
            </div>

            {/* Properties Table Card: Label at Left, Interactive Input at Right */}
            <div className="rounded-2xl bg-[#0a0a0d] border border-[#202026] divide-y divide-[#18181d] shadow-inner">
              {/* Row 1: Subject (Custom Designed Dropdown & Glowing Pill) */}
              <div className="h-[52px] px-4 flex items-center justify-between hover:bg-white/[0.015] transition-colors rounded-t-2xl">
                <div className="flex items-center gap-3 text-zinc-300 text-[13.5px] font-medium shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:tag" width="15" />
                  </div>
                  <span>Subject</span>
                </div>

                {/* Custom Subject Trigger & Popover Menu */}
                <div ref={subjectRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubjectOpen(!isSubjectOpen);
                      setIsDateOpen(false);
                      setIsPriorityOpen(false);
                    }}
                    className={`relative h-9 flex items-center px-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                      isSubjectOpen
                        ? 'bg-[#16161f]'
                        : 'bg-[#141418] hover:bg-[#1a1a20] border-[#272730] hover:border-[#383844]'
                    }`}
                    style={
                      isSubjectOpen
                        ? {
                            borderColor: selectedSubject.color,
                            boxShadow: `0 0 16px ${selectedSubject.color}40, 0 0 0 2px ${selectedSubject.color}25`,
                            backgroundColor: '#16161f',
                          }
                        : undefined
                    }
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 mr-2 transition-all duration-200 ${
                        isSubjectOpen
                          ? 'scale-125'
                          : ''
                      }`}
                      style={{
                        backgroundColor: selectedSubject.color,
                        color: selectedSubject.color,
                      }}
                    />
                    <span className="text-white font-medium text-[13px] mr-1">
                      {subject}
                    </span>
                    <iconify-icon
                      icon="lucide:chevron-down"
                      width="13"
                      className={`transition-all duration-200 ${
                        isSubjectOpen ? 'text-white rotate-180' : 'text-zinc-400'
                      }`}
                    />
                  </button>

                  {/* Designed Dropdown List */}
                  {isSubjectOpen && (
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-[185px] rounded-xl border border-[#272734] bg-[#121216] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] p-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
                      <div className="space-y-0.5">
                        {SUBJECTS.map((s) => {
                          const isSelected = s.name === subject;
                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => {
                                setSubject(s.name);
                                setIsSubjectOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'text-white font-semibold'
                                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                              }`}
                              style={
                                isSelected
                                  ? {
                                      backgroundColor: `${s.color}20`,
                                      color: s.color,
                                    }
                                  : undefined
                              }
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: s.color, color: s.color }}
                                />
                                <span>{s.name}</span>
                              </div>
                              {isSelected && (
                                <iconify-icon
                                  icon="lucide:check"
                                  width="14"
                                  className="shrink-0"
                                  style={{ color: s.color }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Due Date (Custom Mini-Calendar Popover) */}
              <div className="h-[52px] px-4 flex items-center justify-between hover:bg-white/[0.015] transition-colors">
                <div className="flex items-center gap-3 text-zinc-300 text-[13.5px] font-medium shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:calendar" width="15" />
                  </div>
                  <span>Due Date</span>
                </div>

                <div ref={dateRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const [y, m] = dueDate.split('-').map(Number);
                        setCalendarViewDate(new Date(y, m - 1, 1));
                      } catch {
                        // ignore
                      }
                      setIsDateOpen(!isDateOpen);
                      setIsSubjectOpen(false);
                      setIsPriorityOpen(false);
                    }}
                    className={`relative h-9 flex items-center gap-2 px-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                      isDateOpen
                        ? 'bg-[#16161f]'
                        : 'bg-[#141418] hover:bg-[#1a1a20] border-[#272730] hover:border-[#383844]'
                    }`}
                    style={
                      isDateOpen
                        ? {
                            borderColor: '#38bdf8',
                            boxShadow: '0 0 16px rgba(56,189,248,0.35), 0 0 0 2px rgba(56,189,248,0.25)',
                            backgroundColor: '#16161f',
                          }
                        : undefined
                    }
                  >
                    <iconify-icon
                      icon="lucide:calendar"
                      width="13"
                      className={isDateOpen ? 'text-white' : 'text-zinc-400'}
                    />
                    <span className="text-white font-medium text-[13px]">
                      {formatDisplayDate(dueDate)}
                    </span>
                    <iconify-icon
                      icon="lucide:chevron-down"
                      width="12"
                      className={`transition-all duration-200 ${
                        isDateOpen ? 'text-white rotate-180' : 'text-zinc-400'
                      }`}
                    />
                  </button>

                  {/* Designed Date Picker Popover */}
                  {isDateOpen && (
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-[275px] rounded-2xl border border-[#272734] bg-[#121216] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] p-3 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 select-none">
                      {/* Quick date presets */}
                      <div className="flex items-center gap-1.5 mb-2.5 pb-2.5 border-b border-[#202028]">
                        <button
                          type="button"
                          onClick={() => handleQuickDate(0)}
                          className="flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold bg-[#181820] hover:bg-[#22222c] text-zinc-300 hover:text-white border border-[#272732] transition-colors cursor-pointer"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickDate(1)}
                          className="flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold bg-[#181820] hover:bg-[#22222c] text-zinc-300 hover:text-white border border-[#272732] transition-colors cursor-pointer"
                        >
                          Tomorrow
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickDate(7)}
                          className="flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold bg-[#181820] hover:bg-[#22222c] text-zinc-300 hover:text-white border border-[#272732] transition-colors cursor-pointer"
                        >
                          +1 Week
                        </button>
                      </div>

                      {/* Month navigation header */}
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[13px] font-semibold text-white">
                          {MONTH_NAMES[viewMonth]} {viewYear}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={prevMonth}
                            aria-label="Previous month"
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <iconify-icon icon="lucide:chevron-left" width="14" />
                          </button>
                          <button
                            type="button"
                            onClick={nextMonth}
                            aria-label="Next month"
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <iconify-icon icon="lucide:chevron-right" width="14" />
                          </button>
                        </div>
                      </div>

                      {/* Weekday column names */}
                      <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                        {WEEKDAY_NAMES.map((d) => (
                          <span key={d} className="text-[11px] font-semibold text-textSubtle py-0.5">
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {calendarCells.map((cell, idx) => {
                          const isSelected =
                            cell.year === selectedY &&
                            cell.month === selectedM &&
                            cell.day === selectedD;
                          const isRealToday =
                            cell.year === todayY &&
                            cell.month === todayM &&
                            cell.day === todayD;

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSelectDate(cell.year, cell.month, cell.day)}
                              className={`h-7 w-7 mx-auto rounded-lg text-[12px] font-medium flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                                isSelected
                                  ? 'text-black font-bold'
                                  : cell.isCurrentMonth
                                  ? 'text-zinc-200 hover:bg-white/10 hover:text-white'
                                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                              }`}
                              style={
                                isSelected
                                  ? {
                                      backgroundColor: '#38bdf8',
                                      color: '#081018',
                                      boxShadow: '0 0 12px rgba(56,189,248,0.7)',
                                    }
                                  : undefined
                              }
                            >
                              <span>{cell.day}</span>
                              {isRealToday && !isSelected && (
                                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-sky-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3: Priority (Custom Designed Dropdown & Glowing Pill) */}
              <div className="h-[52px] px-4 flex items-center justify-between hover:bg-white/[0.015] transition-colors rounded-b-2xl">
                <div className="flex items-center gap-3 text-zinc-300 text-[13.5px] font-medium shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:flag" width="15" />
                  </div>
                  <span>Priority</span>
                </div>

                <div ref={priorityRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPriorityOpen(!isPriorityOpen);
                      setIsSubjectOpen(false);
                      setIsDateOpen(false);
                    }}
                    className={`relative h-9 flex items-center px-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                      isPriorityOpen
                        ? 'bg-[#16161f]'
                        : 'bg-[#141418] hover:bg-[#1a1a20] border-[#272730] hover:border-[#383844]'
                    }`}
                    style={
                      isPriorityOpen
                        ? {
                            borderColor: selectedPriority.color,
                            boxShadow: `0 0 16px ${selectedPriority.color}40, 0 0 0 2px ${selectedPriority.color}25`,
                            backgroundColor: '#16161f',
                          }
                        : undefined
                    }
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 mr-2 transition-all duration-200 ${
                        isPriorityOpen
                          ? 'scale-125'
                          : ''
                      }`}
                      style={{
                        backgroundColor: selectedPriority.color,
                        color: selectedPriority.color,
                      }}
                    />
                    <span className="text-white font-medium text-[13px] mr-1">
                      {selectedPriority.value}
                    </span>
                    <iconify-icon
                      icon="lucide:chevron-down"
                      width="13"
                      className={`transition-all duration-200 ${
                        isPriorityOpen ? 'text-white rotate-180' : 'text-zinc-400'
                      }`}
                    />
                  </button>

                  {/* Designed Dropdown List */}
                  {isPriorityOpen && (
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-[190px] rounded-xl border border-[#272734] bg-[#121216] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] p-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
                      <div className="space-y-0.5">
                        {PRIORITIES.map((p) => {
                          const isSelected = p.value === priority;
                          return (
                            <button
                              key={p.value}
                              type="button"
                              onClick={() => {
                                setPriority(p.value);
                                setIsPriorityOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'text-white font-semibold'
                                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                              }`}
                              style={
                                isSelected
                                  ? {
                                      backgroundColor: `${p.color}20`,
                                      color: p.color,
                                    }
                                  : undefined
                              }
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: p.color, color: p.color }}
                                />
                                <span>{p.label}</span>
                              </div>
                              {isSelected && (
                                <iconify-icon
                                  icon="lucide:check"
                                  width="14"
                                  className="shrink-0"
                                  style={{ color: p.color }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Subtasks Section */}
            <div className="flex flex-col gap-2 pt-0.5">
              <div className="flex items-center justify-between px-0.5">
                <div className="flex items-center gap-2 text-zinc-300 text-[13px] font-medium">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:list-todo" width="15" />
                  </div>
                  <span>Subtasks</span>
                  {subtasks.length > 0 && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-400 border border-white/[0.08] leading-none">
                      {subtasks.length}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="h-8 px-3 rounded-xl border border-[#272730] hover:border-[#3d3d4d] bg-[#141418] hover:bg-[#1a1a22] text-zinc-200 hover:text-white text-[12.5px] font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 select-none"
                >
                  <iconify-icon icon="lucide:plus" width="14" className="text-sky-400" />
                  <span>Add Subtask</span>
                </button>
              </div>

              {/* Subtasks List */}
              {subtasks.length > 0 && (
                <div className="max-h-[150px] overflow-y-auto space-y-1.5 pr-0.5 [scrollbar-width:thin] [scrollbar-color:#2a2a35_transparent]">
                  {subtasks.map((st, idx) => (
                    <div
                      key={st.id}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0a0a0d] border border-[#202026] hover:border-[#2f2f3a] transition-all"
                    >
                      <span className="w-5 h-5 rounded-md bg-white/[0.05] text-zinc-400 text-[11px] font-semibold flex items-center justify-center shrink-0 select-none">
                        {idx + 1}
                      </span>

                      <input
                        type="text"
                        autoFocus={idx === subtasks.length - 1 && st.text === ''}
                        value={st.text}
                        onChange={(e) => handleSubtaskTextChange(st.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSubtask();
                          }
                          if (e.key === 'Backspace' && st.text === '' && subtasks.length > 1) {
                            e.preventDefault();
                            handleRemoveSubtask(st.id);
                          }
                        }}
                        placeholder={`Subtask ${idx + 1}...`}
                        className="flex-1 bg-transparent text-[13px] text-zinc-100 placeholder:text-zinc-400 focus:text-white outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(st.id)}
                        aria-label="Remove subtask"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                        title="Remove subtask"
                      >
                        <iconify-icon icon="lucide:x" width="14" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes / Description Area */}
            <div className="flex flex-col gap-1.5 pt-0.5">
              <div className="flex items-center gap-2 text-zinc-400 text-[12px] font-medium px-0.5">
                <iconify-icon icon="lucide:align-left" width="13" className="text-zinc-400" />
                <span>Description (optional)</span>
              </div>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-label="Description (optional)"
                placeholder="Add notes or references (optional)..."
                className="w-full bg-[#0a0a0d] border border-[#202026] hover:border-[#2f2f38] focus:border-zinc-500 focus:ring-1 focus:ring-white/10 rounded-2xl p-3 text-[13px] text-white placeholder:text-zinc-400 outline-none transition-all resize-none shadow-inner"
              />
            </div>
          </div>

          {/* 3. Footer Bar */}
          <div className="flex items-center justify-between border-t border-[#202026] px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0c0c0f]/80 rounded-b-2xl">
            <span className="text-[12px] text-textSubtle font-normal flex items-center gap-1.5 select-none">
              <iconify-icon icon="lucide:check-circle-2" width="14" className="text-textSubtle" />
              <span>Saves to Tasks</span>
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleClose}
                className="h-9 px-4 rounded-xl text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 px-5 rounded-xl text-[13px] font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-2 active:scale-95 bg-white hover:bg-zinc-200 text-black shadow-sm"
              >
                <iconify-icon icon="lucide:plus" width="15" />
                <span>Create Task</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
    </Dialog>
  );
};
