import { Dialog } from '../common/Dialog';
import React, { useState, useEffect, useRef } from 'react';
import type { SessionData, SessionType } from '../../types';

interface NewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (session: {
    type: SessionType;
    title: string;
    subject: string;
    date: string;
    start: string;
    duration: string;
    room?: string;
    professor?: string;
  }) => void;
  initialData?: SessionData | null;
  mode?: 'create' | 'edit';
}

const SUBJECTS = [
  { name: 'Mathematics', color: '#38bdf8' },
  { name: 'Algèbre', color: '#ec4899' },
  { name: 'Analyse', color: '#06b6d4' },
  { name: 'Physique', color: '#10b981' },
  { name: 'Mécanique', color: '#3b82f6' },
  { name: 'Chimie', color: '#a855f7' },
  { name: 'Other', color: '#71717a' },
];

const parseSessionType = (data?: SessionData | null): SessionType => {
  if (!data) return 'revision';
  const t = (data.type || '').toLowerCase();
  if (t.includes('exam') || t.includes('ds') || t.includes('test') || t.includes('concours') || t.includes('colle')) {
    return 'exam';
  }
  if (
    t.includes('lecture') ||
    t.includes('class') ||
    t.includes('cours') ||
    t.includes('td') ||
    t.includes('tp') ||
    t.includes('university') ||
    Boolean(data.room) ||
    Boolean(data.professor)
  ) {
    return 'university';
  }
  return 'revision';
};

const parseSessionTime = (timeStr?: string): { start: string; duration: string } => {
  if (!timeStr) return { start: '14:00', duration: '90' };

  const rangeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?\s*[-–—]\s*(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (rangeMatch) {
    let [_, h1Str, m1Str, ampm1, h2Str, m2Str, ampm2] = rangeMatch;
    let h1 = parseInt(h1Str, 10);
    const m1 = parseInt(m1Str, 10);
    let h2 = parseInt(h2Str, 10);
    const m2 = parseInt(m2Str, 10);

    if (ampm1) {
      if (ampm1.toUpperCase() === 'PM' && h1 < 12) h1 += 12;
      if (ampm1.toUpperCase() === 'AM' && h1 === 12) h1 = 0;
    }
    if (ampm2) {
      if (ampm2.toUpperCase() === 'PM' && h2 < 12) h2 += 12;
      if (ampm2.toUpperCase() === 'AM' && h2 === 12) h2 = 0;
    } else if (ampm1 && !ampm2) {
      if (ampm1.toUpperCase() === 'PM' && h2 < 12) h2 += 12;
    }

    const startTotal = h1 * 60 + m1;
    let endTotal = h2 * 60 + m2;
    if (endTotal < startTotal) endTotal += 24 * 60;
    const diff = endTotal - startTotal;

    const startFormatted = `${String(h1).padStart(2, '0')}:${String(m1).padStart(2, '0')}`;
    const durationFormatted = String(diff > 0 ? diff : 90);
    return { start: startFormatted, duration: durationFormatted };
  }

  const singleMatch = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (singleMatch) {
    const h = String(parseInt(singleMatch[1], 10)).padStart(2, '0');
    const m = singleMatch[2];
    const durMatch = timeStr.match(/(\d+)\s*m/);
    const dur = durMatch ? durMatch[1] : '90';
    return { start: `${h}:${m}`, duration: dur };
  }

  return { start: '14:00', duration: '90' };
};

const DURATION_OPTIONS = [
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '1 hour' },
  { value: '90', label: '1 hr 30 min' },
  { value: '120', label: '2 hours', badge: 'Exam std.' },
  { value: '180', label: '3 hours (DS)', badge: 'DS' },
  { value: '240', label: '4 hours', badge: 'Concours' },
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

const QUICK_TIMES = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:30', '17:00', '18:30'];
const HOURS_LIST = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const MINUTES_LIST = ['00', '15', '30', '45'];

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

export const NewSessionModal: React.FC<NewSessionModalProps> = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }) => {
  const [sessionType, setSessionType] = useState<SessionType>('revision');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Algèbre');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [start, setStart] = useState('14:00');
  const [duration, setDuration] = useState('90');
  const [room, setRoom] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setSessionType(parseSessionType(initialData));
        setTitle(initialData.title || '');
        setSubject(initialData.subject || 'Mathematics');
        setRoom(initialData.room || '');
        const { start: parsedStart, duration: parsedDuration } = parseSessionTime(initialData.time);
        setStart(parsedStart);
        setDuration(parsedDuration);

        if (initialData.date && initialData.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          setDate(initialData.date);
          const [y, m] = initialData.date.split('-').map(Number);
          setCalendarViewDate(new Date(y, m - 1, 1));
        } else {
          setDate(new Date().toISOString().slice(0, 10));
        }
      } else {
        setSessionType('revision');
        setTitle('');
        setSubject('Algèbre');
        setDate(new Date().toISOString().slice(0, 10));
        setStart('14:00');
        setDuration('90');
        setRoom('');
      }
    }
  }, [isOpen, initialData]);

  // Custom Dropdown Open States
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const subjectRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    try {
      const [y, m] = (new Date().toISOString().slice(0, 10))
        .split('-')
        .map(Number);
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
      if (durationRef.current && !durationRef.current.contains(target)) {
        setIsDurationOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(target)) {
        setIsDateOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(target)) {
        setIsTimeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Adjust duration default when selecting exam
  const handleTypeChange = (newType: SessionType) => {
    setSessionType(newType);
    if (newType === 'exam') {
      setDuration('120'); // 2 hours default for exams
    } else if (newType === 'university') {
      setDuration('90');
    }
  };

  const availableSubjects = SUBJECTS.some(
    (s) => s.name.toLowerCase() === subject.toLowerCase()
  )
    ? SUBJECTS
    : [{ name: subject, color: initialData?.subjectColor || initialData?.boxColor || '#38bdf8' }, ...SUBJECTS];

  const selectedSubject =
    availableSubjects.find((s) => s.name.toLowerCase() === subject.toLowerCase()) || availableSubjects[0];

  const selectedDuration =
    DURATION_OPTIONS.find((d) => d.value === duration) || DURATION_OPTIONS[3];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultTitle =
      sessionType === 'exam'
        ? `Exam : ${subject}`
        : sessionType === 'university'
        ? `Class : ${subject}`
        : `Revision : ${subject}`;

    onSubmit({
      type: sessionType,
      title: title.trim() || defaultTitle,
      subject,
      date,
      start,
      duration,
      room: room.trim() || undefined,
    });
    onClose();
  };

  // Dynamic theme styling per session type
  const theme = {
    exam: {
      accentColor: '#f43f5e',
      badge: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
      dot: 'bg-rose-400',
      titleFocusBorder: 'focus:border-zinc-400',
      inputFocus: 'focus:border-zinc-500 focus:ring-1 focus:ring-white/10',
      durationGlow: {
        borderColor: '#f43f5e',
        boxShadow: '0 0 16px rgba(244,63,94,0.35), 0 0 0 2px rgba(244,63,94,0.25)',
        backgroundColor: '#16161f',
      },
      btnSubmit:
        'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white',
    },
    university: {
      accentColor: '#a855f7',
      badge: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      dot: 'bg-purple-400',
      titleFocusBorder: 'focus:border-zinc-400',
      inputFocus: 'focus:border-zinc-500 focus:ring-1 focus:ring-white/10',
      durationGlow: {
        borderColor: '#a855f7',
        boxShadow: '0 0 16px rgba(168,85,247,0.35), 0 0 0 2px rgba(168,85,247,0.25)',
        backgroundColor: '#16161f',
      },
      btnSubmit:
        'bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-semibold shadow-sm transition-colors',
    },
    revision: {
      accentColor: '#38bdf8',
      badge: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
      dot: 'bg-sky-400',
      titleFocusBorder: 'focus:border-zinc-400',
      inputFocus: 'focus:border-zinc-500 focus:ring-1 focus:ring-white/10',
      durationGlow: {
        borderColor: '#38bdf8',
        boxShadow: '0 0 16px rgba(56,189,248,0.35), 0 0 0 2px rgba(56,189,248,0.25)',
        backgroundColor: '#16161f',
      },
      btnSubmit:
        'bg-white hover:bg-zinc-200 text-black shadow-sm',
    },
  }[sessionType];

  // Calendar calculations
  const viewYear = calendarViewDate.getFullYear();
  const viewMonth = calendarViewDate.getMonth(); // 0-indexed

  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPreviousMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayWeekday = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const [selectedY, selectedM, selectedD] = date
    ? date.split('-').map(Number)
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
    setDate(formatted);
    setIsDateOpen(false);
  };

  const handleQuickDate = (offsetDays: number) => {
    const target = new Date();
    target.setDate(target.getDate() + offsetDays);
    const y = target.getFullYear();
    const m = target.getMonth() + 1;
    const d = target.getDate();
    setDate(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    setCalendarViewDate(new Date(y, target.getMonth(), 1));
    setIsDateOpen(false);
  };

  // Time calculations & handlers
  const [currentHour = '14', currentMinute = '00'] = start.split(':');

  const handleSelectHour = (h: string) => {
    setStart(`${h}:${currentMinute}`);
  };

  const handleSelectMinute = (m: string) => {
    setStart(`${currentHour}:${m}`);
    setIsTimeOpen(false);
  };

  const handleQuickTime = (timeStr: string) => {
    setStart(timeStr);
    setIsTimeOpen(false);
  };

  return (
    <Dialog label={mode === 'edit' ? "Edit session" : "Schedule a session"} onClose={() => {
      if (isSubjectOpen || isDurationOpen || isDateOpen || isTimeOpen) {
        setIsSubjectOpen(false);
        setIsDurationOpen(false);
        setIsDateOpen(false);
        setIsTimeOpen(false);
      } else {
        onClose();
      }
    }}>
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <section
        className="relative w-full max-w-[480px] rounded-2xl border border-[#26262d] bg-[#101013] shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)] animate-in zoom-in-95 duration-150 flex flex-col font-sans max-h-[92vh] overflow-hidden"
      >
        {/* Ambient Top Edge Specular Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none rounded-t-2xl" />

        {/* 1. Header with Generous Padding */}
        <div className="flex items-center justify-between border-b border-[#202026] px-4 sm:px-6 py-4 sm:py-5 bg-[#131317]/80 rounded-t-2xl">
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${theme.badge}`}
            >
              <iconify-icon
                icon={
                  sessionType === 'exam'
                    ? 'lucide:clipboard-check'
                    : sessionType === 'university'
                    ? 'lucide:school'
                    : 'lucide:book-open'
                }
                width="19"
              />
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-white tracking-tight leading-snug">
                {mode === 'edit'
                  ? sessionType === 'exam'
                    ? 'Edit Exam'
                    : sessionType === 'university'
                    ? 'Edit Class'
                    : 'Edit Session'
                  : sessionType === 'exam'
                  ? 'Schedule Exam'
                  : sessionType === 'university'
                  ? 'Schedule Class'
                  : 'Schedule Revision'}
              </h2>
              <p className="text-[13px] text-zinc-400 font-normal leading-tight mt-0.5">
                {mode === 'edit'
                  ? 'Update session details, timetable, or location'
                  : sessionType === 'exam'
                  ? 'Configure upcoming test, DS and exam duration'
                  : sessionType === 'university'
                  ? 'Add a lecture, lab or tutorial session'
                  : 'Plan a focused study or problem-solving block'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close session modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#272730] bg-[#16161b] text-zinc-400 hover:text-white hover:bg-[#22222a] hover:border-zinc-500 transition-all cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
            title="Close (Esc)"
          >
            <iconify-icon icon="lucide:x" width="16" />
          </button>
        </div>

        {/* 2. Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 flex flex-col gap-4">
            {/* Segmented Type Switcher Pills */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#09090c] border border-[#1f1f25] rounded-xl">
              <button
                type="button"
                onClick={() => handleTypeChange('revision')}
                className={`h-9 px-3 rounded-lg text-[13px] font-medium border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  sessionType === 'revision'
                    ? 'bg-[#131f2d] text-sky-300 border-sky-500/40'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <iconify-icon icon="lucide:book-open" width="14" />
                <span>Revision</span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('university')}
                className={`h-9 px-3 rounded-lg text-[13px] font-medium border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  sessionType === 'university'
                    ? 'bg-[#1c1229] text-purple-300 border-purple-500/40'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <iconify-icon icon="lucide:school" width="14" />
                <span>Class</span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('exam')}
                className={`h-9 px-3 rounded-lg text-[13px] font-medium border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  sessionType === 'exam'
                    ? 'bg-[#270f17] text-rose-300 border-rose-500/40'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <iconify-icon icon="lucide:clipboard-check" width="14" />
                <span>Exam</span>
              </button>
            </div>

            {/* Prominent Title Field */}
            <div className="relative pt-1 pb-1">
              <input
                type="text"
                autoFocus
                data-autofocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  sessionType === 'exam'
                    ? 'Exam title (e.g. DS 3 — Algèbre Linéaire)'
                    : sessionType === 'university'
                    ? 'Class title (e.g. Thermodynamics Lecture)'
                    : 'Revision goal (e.g. Practice Problems Ch. 4)'
                }
                className={`w-full text-[17px] font-semibold text-white placeholder:text-zinc-400 bg-transparent border-b border-[#23232a] ${theme.titleFocusBorder} pb-3 pt-1 outline-none transition-colors tracking-[-0.015em]`}
              />
            </div>

            {/* Table / Properties Card: Label at Left, Interactive Input at Right */}
            <div className="rounded-2xl bg-[#0a0a0d] border border-[#202026] divide-y divide-[#18181d] shadow-inner">
              {/* Row 1: Subject (Custom Designed Dropdown & Glowing Pill) */}
              <div className="h-[52px] px-4 flex items-center justify-between hover:bg-white/[0.015] transition-colors rounded-t-2xl">
                <div className="flex items-center gap-3 text-zinc-300 text-[13.5px] font-medium shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:tag" width="15" />
                  </div>
                  <span>Subject</span>
                </div>

                {/* Custom Designed Dropdown Trigger & Popover Menu */}
                <div ref={subjectRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubjectOpen(!isSubjectOpen);
                      setIsDurationOpen(false);
                      setIsDateOpen(false);
                      setIsTimeOpen(false);
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

                  {/* Designed Dropdown List (NOT the classic browser select menu) */}
                  {isSubjectOpen && (
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-[185px] rounded-xl border border-[#272734] bg-[#121216] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] p-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
                      <div className="space-y-0.5">
                        {availableSubjects.map((s) => {
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

              {/* Row 2: Date & Time (Custom Designed Popovers) */}
              <div className="h-[52px] px-4 flex items-center justify-between hover:bg-white/[0.015] transition-colors">
                <div className="flex items-center gap-3 text-zinc-300 text-[13.5px] font-medium shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:calendar" width="15" />
                  </div>
                  <span>Date & Time</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Custom Date Trigger & Popover */}
                  <div ref={dateRef} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const [y, m] = date.split('-').map(Number);
                          setCalendarViewDate(new Date(y, m - 1, 1));
                        } catch {
                          // ignore
                        }
                        setIsDateOpen(!isDateOpen);
                        setIsTimeOpen(false);
                        setIsSubjectOpen(false);
                        setIsDurationOpen(false);
                      }}
                      className={`relative h-9 flex items-center gap-2 px-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                        isDateOpen
                          ? 'bg-[#16161f]'
                          : 'bg-[#141418] hover:bg-[#1a1a20] border-[#272730] hover:border-[#383844]'
                      }`}
                      style={isDateOpen ? theme.durationGlow : undefined}
                    >
                      <iconify-icon
                        icon="lucide:calendar"
                        width="13"
                        className={isDateOpen ? 'text-white' : 'text-zinc-400'}
                      />
                      <span className="text-white font-medium text-[13px]">
                        {formatDisplayDate(date)}
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
                            onClick={() => handleQuickDate(2)}
                            className="flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold bg-[#181820] hover:bg-[#22222c] text-zinc-300 hover:text-white border border-[#272732] transition-colors cursor-pointer"
                          >
                            +2 Days
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
                                    ? 'text-white font-bold'
                                    : cell.isCurrentMonth
                                    ? 'text-zinc-200 hover:bg-white/10 hover:text-white'
                                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                                }`}
                                style={
                                  isSelected
                                    ? {
                                        backgroundColor: theme.accentColor,
                                        color: sessionType === 'revision' ? '#0b1118' : '#ffffff',
                                        boxShadow: `0 0 12px ${theme.accentColor}70`,
                                      }
                                    : undefined
                                }
                              >
                                <span>{cell.day}</span>
                                {isRealToday && !isSelected && (
                                  <span
                                    className="absolute bottom-0.5 w-1 h-1 rounded-full"
                                    style={{ backgroundColor: theme.accentColor }}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Custom Time Trigger & Popover */}
                  <div ref={timeRef} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsTimeOpen(!isTimeOpen);
                        setIsDateOpen(false);
                        setIsSubjectOpen(false);
                        setIsDurationOpen(false);
                      }}
                      className={`relative h-9 flex items-center gap-1.5 px-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                        isTimeOpen
                          ? 'bg-[#16161f]'
                          : 'bg-[#141418] hover:bg-[#1a1a20] border-[#272730] hover:border-[#383844]'
                      }`}
                      style={isTimeOpen ? theme.durationGlow : undefined}
                    >
                      <iconify-icon
                        icon="lucide:clock"
                        width="13"
                        className={isTimeOpen ? 'text-white' : 'text-zinc-400'}
                      />
                      <span className="text-white font-medium text-[13px]">
                        {start}
                      </span>
                      <iconify-icon
                        icon="lucide:chevron-down"
                        width="12"
                        className={`transition-all duration-200 ${
                          isTimeOpen ? 'text-white rotate-180' : 'text-zinc-400'
                        }`}
                      />
                    </button>

                    {/* Designed Time Picker Popover */}
                    {isTimeOpen && (
                      <div className="absolute right-0 top-full mt-1.5 z-50 w-[235px] rounded-2xl border border-[#272734] bg-[#121216] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] p-3 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 select-none">
                        {/* Quick Presets */}
                        <div className="text-[11px] font-semibold text-textSubtle uppercase tracking-wider mb-1.5 px-0.5">
                          Quick Times
                        </div>
                        <div className="grid grid-cols-4 gap-1 mb-3 pb-2.5 border-b border-[#202028]">
                          {QUICK_TIMES.map((qt) => {
                            const isSelected = start === qt;
                            return (
                              <button
                                key={qt}
                                type="button"
                                onClick={() => handleQuickTime(qt)}
                                className={`py-1 px-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer text-center ${
                                  isSelected
                                    ? 'text-white font-bold'
                                    : 'bg-[#171720] hover:bg-[#22222c] text-zinc-300 hover:text-white border border-[#262632]'
                                }`}
                                style={
                                  isSelected
                                    ? {
                                        backgroundColor: `${theme.accentColor}30`,
                                        color: theme.accentColor,
                                        borderColor: theme.accentColor,
                                      }
                                    : undefined
                                }
                              >
                                {qt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Dual Column Picker: Hours & Minutes */}
                        <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-textSubtle uppercase tracking-wider mb-1 px-1">
                          <span>Hour</span>
                          <span>Minute</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {/* Hours Column */}
                          <div className="max-h-[148px] overflow-y-auto pr-1 space-y-0.5 [scrollbar-width:thin] [scrollbar-color:#2e2e3a_transparent]">
                            {HOURS_LIST.map((h) => {
                              const isSelected = h === currentHour;
                              return (
                                <button
                                  key={h}
                                  type="button"
                                  onClick={() => handleSelectHour(h)}
                                  className={`w-full py-1.5 rounded-lg text-[12.5px] font-medium transition-all cursor-pointer flex items-center justify-between px-2 ${
                                    isSelected
                                      ? 'text-white font-bold'
                                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                                  }`}
                                  style={
                                    isSelected
                                      ? {
                                          backgroundColor: `${theme.accentColor}25`,
                                          color: theme.accentColor,
                                        }
                                      : undefined
                                  }
                                >
                                  <span>{h}:00</span>
                                  {isSelected && (
                                    <iconify-icon
                                      icon="lucide:check"
                                      width="12"
                                      style={{ color: theme.accentColor }}
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Minutes Column */}
                          <div className="space-y-1">
                            {MINUTES_LIST.map((m) => {
                              const isSelected = m === currentMinute;
                              return (
                                <button
                                  key={m}
                                  type="button"
                                  onClick={() => handleSelectMinute(m)}
                                  className={`w-full h-8 rounded-lg text-[12.5px] font-medium transition-all cursor-pointer flex items-center justify-between px-2.5 ${
                                    isSelected
                                      ? 'text-white font-bold'
                                      : 'bg-[#171720] hover:bg-[#20202a] text-zinc-300 hover:text-white border border-[#242430]'
                                  }`}
                                  style={
                                    isSelected
                                      ? {
                                          backgroundColor: `${theme.accentColor}25`,
                                          color: theme.accentColor,
                                          borderColor: `${theme.accentColor}60`,
                                        }
                                      : undefined
                                  }
                                >
                                  <span>:{m}</span>
                                  {isSelected && (
                                    <iconify-icon
                                      icon="lucide:check"
                                      width="12"
                                      style={{ color: theme.accentColor }}
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 3: Duration (Custom Designed Dropdown) */}
              <div className="h-[52px] px-4 flex items-center justify-between hover:bg-white/[0.015] transition-colors">
                <div className="flex items-center gap-2.5 text-zinc-300 text-[13.5px] font-medium shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:clock-3" width="15" />
                  </div>
                  <span>Duration</span>
                  {sessionType === 'exam' && (
                    <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 leading-none">
                      Exam
                    </span>
                  )}
                </div>

                {/* Duration Custom Dropdown Trigger & Popover Menu */}
                <div ref={durationRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDurationOpen(!isDurationOpen);
                      setIsSubjectOpen(false);
                      setIsDateOpen(false);
                      setIsTimeOpen(false);
                    }}
                    className={`relative h-9 flex items-center px-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                      isDurationOpen
                        ? 'bg-[#16161f]'
                        : 'bg-[#141418] hover:bg-[#1a1a20] border-[#272730] hover:border-[#383844]'
                    }`}
                    style={isDurationOpen ? theme.durationGlow : undefined}
                  >
                    <span className="text-white font-medium text-[13px] mr-1">
                      {selectedDuration ? selectedDuration.label : `${duration} min`}
                    </span>
                    <iconify-icon
                      icon="lucide:chevron-down"
                      width="13"
                      className={`transition-all duration-200 ${
                        isDurationOpen ? 'text-white rotate-180' : 'text-zinc-400'
                      }`}
                    />
                  </button>

                  {/* Designed Dropdown List for Duration (NOT the classic browser select menu) */}
                  {isDurationOpen && (
                    <div className="absolute right-0 bottom-full mb-1.5 z-50 w-[205px] rounded-xl border border-[#272734] bg-[#121216] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] p-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 max-h-[260px] overflow-y-auto">
                      <div className="space-y-0.5">
                        {DURATION_OPTIONS.map((opt) => {
                          const isSelected = opt.value === duration;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setDuration(opt.value);
                                setIsDurationOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-white/10 text-white font-semibold'
                                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span>{opt.label}</span>
                                {opt.badge && sessionType === 'exam' && (
                                  <span className="text-[11px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                                    {opt.badge}
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <iconify-icon
                                  icon="lucide:check"
                                  width="14"
                                  className="text-white shrink-0"
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

              {/* Row 4: Room / Location */}
              <div className="h-[52px] px-4 flex items-center justify-between hover:bg-white/[0.015] transition-colors rounded-b-2xl">
                <div className="flex items-center gap-3 text-zinc-300 text-[13.5px] font-medium shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center text-zinc-400">
                    <iconify-icon icon="lucide:map-pin" width="15" />
                  </div>
                  <span>Location</span>
                </div>
                <div className="relative inline-grid items-center max-w-[260px]">
                  <span
                    aria-hidden="true"
                    className="invisible px-3 text-[13px] font-medium whitespace-pre row-start-1 col-start-1 select-none pointer-events-none"
                  >
                    {room || (sessionType === 'exam' ? 'e.g. Amphi Schwartz' : 'Room 27 / Library (opt.)')}
                  </span>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder={
                      sessionType === 'exam' ? 'e.g. Amphi Schwartz' : 'Room 27 / Library (opt.)'
                    }
                    className={`row-start-1 col-start-1 w-full min-w-0 h-9 bg-[#141418] hover:bg-[#1a1a20] focus:bg-[#16161f] border border-[#272730] hover:border-[#383844] ${theme.inputFocus} rounded-xl px-3 text-white text-[13px] font-medium text-left placeholder:text-textSubtle outline-none transition-all`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Footer Bar */}
          <div className="flex items-center justify-between border-t border-[#202026] px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0c0c0f]/80 rounded-b-2xl">
            <span className="text-[12px] text-textSubtle font-normal flex items-center gap-1.5 select-none">
              <iconify-icon icon="lucide:calendar-check" width="14" className="text-textSubtle" />
              <span>Saves to Calendar</span>
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-4 rounded-xl text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`h-9 px-5 rounded-xl text-[13px] font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-2 active:scale-95 ${theme.btnSubmit}`}
              >
                <iconify-icon icon={mode === 'edit' ? "lucide:check" : "lucide:plus"} width={15} />
                <span>{mode === 'edit' ? 'Save Changes' : `Add ${sessionType === 'exam' ? 'Exam' : 'Session'}`}</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
    </Dialog>
  );
};
