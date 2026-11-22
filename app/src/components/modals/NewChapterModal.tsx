import { Dialog } from '../common/Dialog';
import React, { useState, useEffect, useRef } from 'react';
import type { SubjectData, ChapterData, ChapterLevel } from '../../types';

interface NewChapterModalProps {
  isOpen: boolean;
  subjects: SubjectData[];
  defaultSubjectId?: string;
  onClose: () => void;
  onSubmit: (subjectId: string, chapter: Omit<ChapterData, 'id'>) => void;
}

const LEVEL_OPTIONS: {
  level: ChapterLevel;
  label: string;
  activeClass: string;
  icon: string;
}[] = [
  {
    level: 'not_started',
    label: 'Not Started',
    activeClass:
      'bg-zinc-700/80 text-white border-zinc-400',
    icon: 'lucide:circle-dashed',
  },
  {
    level: 'beginner',
    label: 'Beginner',
    activeClass:
      'bg-amber-500/20 text-amber-300 border-amber-400/60',
    icon: 'lucide:sparkles',
  },
  {
    level: 'intermediate',
    label: 'Intermediate',
    activeClass:
      'bg-sky-500/20 text-sky-300 border-sky-400/60',
    icon: 'lucide:trending-up',
  },
  {
    level: 'mastered',
    label: 'Mastered',
    activeClass:
      'bg-emerald-500/20 text-emerald-300 border-emerald-400/60',
    icon: 'lucide:check-circle-2',
  },
];

const DIFFICULTY_OPTIONS: {
  diff: 'Easy' | 'Medium' | 'Hard';
  label: string;
  activeClass: string;
}[] = [
  {
    diff: 'Easy',
    label: 'Easy',
    activeClass:
      'bg-emerald-500/20 text-emerald-300 border-emerald-400/60',
  },
  {
    diff: 'Medium',
    label: 'Medium',
    activeClass:
      'bg-amber-500/20 text-amber-300 border-amber-400/60',
  },
  {
    diff: 'Hard',
    label: 'Hard',
    activeClass:
      'bg-rose-500/20 text-rose-300 border-rose-400/60',
  },
];

export const NewChapterModal: React.FC<NewChapterModalProps> = ({
  isOpen,
  subjects,
  defaultSubjectId,
  onClose,
  onSubmit,
}) => {

  const [selectedSubjectId, setSelectedSubjectId] = useState(
    defaultSubjectId || subjects[0]?.id || ''
  );
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [level, setLevel] = useState<ChapterLevel>('not_started');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // Close custom dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (subjectRef.current && !subjectRef.current.contains(e.target as Node)) {
        setIsSubjectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (defaultSubjectId) {
      setSelectedSubjectId(defaultSubjectId);
      const sub = subjects.find((s) => s.id === defaultSubjectId);
      if (sub) {
        setChapterNumber(sub.chapters.length + 1);
      }
    } else if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].id);
      setChapterNumber(subjects[0].chapters.length + 1);
    }
  }, [defaultSubjectId, subjects, isOpen]);

  if (!isOpen) return null;

  const selectedSubject =
    subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const subjectColor = selectedSubject?.color || '#38bdf8';

  const handleSubjectChange = (newSubId: string) => {
    setSelectedSubjectId(newSubId);
    const sub = subjects.find((s) => s.id === newSubId);
    if (sub) {
      setChapterNumber(sub.chapters.length + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedSubjectId) return;

    onSubmit(selectedSubjectId, {
      number: chapterNumber || 1,
      title: title.trim(),
      description: description.trim() || undefined,
      level,
      difficulty,
    });

    setTitle('');
    setDescription('');
    setLevel('not_started');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setIsSubjectOpen(false);
    onClose();
  };

  return (
    <Dialog label="Add Chapter" onClose={onClose}>
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <section
        className="relative w-full max-w-[460px] rounded-2xl border border-[#2a2a2e] bg-[#101013] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Subtle Ambient Top Glow */}
        <div
          className="absolute top-0 inset-x-0 h-28 opacity-20 pointer-events-none rounded-t-2xl bg-gradient-to-b from-[var(--sub-color)] to-transparent"
          style={{ '--sub-color': subjectColor } as React.CSSProperties}
        />

        {/* 1. Header */}
        <div className="relative flex flex-col gap-3 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-[#202026]">
          {/* Top row: Subject Pill, Chapter Badge, Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/[0.05] border border-white/10 text-zinc-200">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: subjectColor }}
                />
                {selectedSubject?.name || 'Subject'}
              </span>

              <span className="text-[11.5px] font-semibold text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/50">
                Ch. {String(chapterNumber).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close chapter modal"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171719] text-zinc-400 hover:bg-[#232326] hover:text-white transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
              title="Close (Esc)"
            >
              <iconify-icon icon="lucide:x" width="16" />
            </button>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
              Add New Chapter
            </h2>
            <p className="mt-1 text-[12.5px] text-zinc-400 flex items-center gap-1.5">
              <iconify-icon icon="lucide:book-plus" width="13" className="text-textSubtle" />
              <span>Register a syllabus unit to track your mastery</span>
            </p>
          </div>
        </div>

        {/* 2. Direct Form Body (No nested boxes) */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative px-4 sm:px-6 py-4 sm:py-5 space-y-4 max-h-[65vh] overflow-y-auto">
            {/* Custom Subject Selection Dropdown */}
            <div ref={subjectRef} className="relative">
              <label className="block text-[12px] font-medium text-zinc-300 mb-1.5">
                Subject
              </label>
              <button
                type="button"
                onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                className={`w-full h-11 flex items-center justify-between px-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSubjectOpen
                    ? 'bg-[#16161c] border-white/30'
                    : 'bg-[#141418] border-[#272730] hover:border-zinc-500 hover:bg-[#181820]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: subjectColor, color: subjectColor }}
                  />
                  <span className="font-semibold text-white text-[13.5px] truncate">
                    {selectedSubject?.name || 'Select subject'}
                  </span>
                  {selectedSubject?.code && (
                    <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                      ({selectedSubject.code})
                    </span>
                  )}
                </div>
                <iconify-icon
                  icon="lucide:chevron-down"
                  width="16"
                  className={`text-zinc-400 transition-transform duration-200 shrink-0 ${
                    isSubjectOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {/* Dropdown Popover */}
              {isSubjectOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-[#2a2a34] bg-[#121216] shadow-2xl p-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 max-h-56 overflow-y-auto">
                  {subjects.map((sub) => {
                    const isSelected = sub.id === selectedSubjectId;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          handleSubjectChange(sub.id);
                          setIsSubjectOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white/10 text-white font-semibold'
                            : 'text-zinc-300 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: sub.color }}
                          />
                          <span className="truncate">{sub.name}</span>
                          {sub.code && (
                            <span className="text-[11px] font-mono text-textSubtle">
                              ({sub.code})
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <iconify-icon icon="lucide:check" width="14" className="text-white shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Chapter Title & Stepper Number in one balanced row */}
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <label className="block text-[12px] font-medium text-zinc-300 mb-1.5">
                  Chapter Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Séries Entières & Convergence"
                  autoFocus
                  className="w-full h-11 px-3.5 rounded-xl bg-[#141418] border border-[#272730] text-white text-[13.5px] placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Number Stepper Control */}
              <div className="shrink-0">
                <label className="block text-[12px] font-medium text-zinc-300 mb-1.5">
                  Chapter #
                </label>
                <div className="flex items-center gap-1 bg-[#141418] border border-[#272730] rounded-xl p-1 h-11">
                  <button
                    type="button"
                    onClick={() => setChapterNumber(Math.max(1, chapterNumber - 1))}
                    className="w-7 h-full rounded-lg bg-[#1c1c22] hover:bg-[#282832] text-zinc-300 hover:text-white flex items-center justify-center font-bold text-[15px] transition-colors cursor-pointer select-none"
                    title="Decrease chapter number"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={chapterNumber}
                    onChange={(e) =>
                      setChapterNumber(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-9 text-center font-bold text-white text-[13.5px] bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setChapterNumber(chapterNumber + 1)}
                    className="w-7 h-full rounded-lg bg-[#1c1c22] hover:bg-[#282832] text-zinc-300 hover:text-white flex items-center justify-center font-bold text-[15px] transition-colors cursor-pointer select-none"
                    title="Increase chapter number"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Key Topics & Notes */}
            <div>
              <label className="block text-[12px] font-medium text-zinc-400 mb-1.5">
                Key Topics & Reference Notes <span className="text-zinc-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key theorems, formula derivations, or exercise numbers..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-[#272730] text-zinc-300 text-[13px] placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Starting Mastery Level - With Crystal-Clear Active State */}
            <div>
              <label className="block text-[12px] font-medium text-zinc-300 mb-2">
                Starting Mastery Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LEVEL_OPTIONS.map((opt) => {
                  const isSelected = level === opt.level;
                  return (
                    <button
                      key={opt.level}
                      type="button"
                      onClick={() => setLevel(opt.level)}
                      className={`py-2.5 px-2.5 rounded-xl text-[12px] font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate ${
                        isSelected
                          ? opt.activeClass
                          : 'bg-[#141418] text-zinc-400 border-[#272730] hover:text-white hover:bg-[#181820]'
                      }`}
                    >
                      <iconify-icon icon={opt.icon} width="14" />
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estimated Difficulty */}
            <div>
              <label className="block text-[12px] font-medium text-zinc-300 mb-2">
                Estimated Difficulty
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTY_OPTIONS.map((opt) => {
                  const isSelected = difficulty === opt.diff;
                  return (
                    <button
                      key={opt.diff}
                      type="button"
                      onClick={() => setDifficulty(opt.diff)}
                      className={`py-2 rounded-xl text-[12.5px] font-bold border transition-all text-center cursor-pointer ${
                        isSelected
                          ? opt.activeClass
                          : 'bg-[#141418] text-zinc-400 border-[#272730] hover:text-white hover:bg-[#181820]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Footer */}
          <div className="relative flex items-center justify-between border-t border-[#202026] px-4 sm:px-6 py-3.5 bg-[#0b0b0e] rounded-b-2xl">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-4 py-2 text-[13px] font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/25 hover:border-red-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <iconify-icon icon="lucide:x" width="15" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim()}
              className={`rounded-xl px-5 py-2 text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                title.trim()
                  ? 'bg-white hover:bg-zinc-200 text-black cursor-pointer shadow-md'
                  : 'bg-zinc-800 text-textSubtle cursor-not-allowed opacity-60'
              }`}
            >
              <iconify-icon icon="lucide:plus" width="16" className="stroke-[3]" />
              Add Chapter
            </button>
          </div>
        </form>
      </section>
    </div>
    </Dialog>
  );
};
