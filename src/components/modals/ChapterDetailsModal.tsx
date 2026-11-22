import { Dialog } from '../common/Dialog';
import React from 'react';
import type { ChapterData, ChapterLevel, SubjectData } from '../../types';

interface ChapterDetailsModalProps {
  isOpen: boolean;
  chapter: ChapterData | null;
  subject: SubjectData | null;
  onClose: () => void;
  onLevelChange?: (level: ChapterLevel) => void;
  onScheduleRevision?: (chapter: ChapterData, subject: SubjectData) => void;
}

const LEVEL_CONFIG: Record<
  ChapterLevel,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  not_started: {
    label: 'Not Started',
    bg: 'bg-zinc-800/80',
    text: 'text-zinc-300',
    border: 'border-zinc-700/60',
    dot: 'bg-zinc-500',
  },
  beginner: {
    label: 'Beginner',
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/25',
    dot: 'bg-sky-400',
  },
  intermediate: {
    label: 'Intermediate',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/25',
    dot: 'bg-amber-400',
  },
  mastered: {
    label: 'Mastered',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/25',
    dot: 'bg-emerald-400',
  },
};

export const ChapterDetailsModal: React.FC<ChapterDetailsModalProps> = ({
  isOpen,
  chapter,
  subject,
  onClose,
  onLevelChange,
  onScheduleRevision,
}) => {

  if (!isOpen || !chapter || !subject) return null;

  return (
    <Dialog label="Chapter details" onClose={onClose}>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      aria-labelledby="chapter-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-borderPanel bg-[#101013] p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex flex-col gap-3 pb-4 border-b border-[#202026]">
          {/* Top row: Subject Pill, Chapter Badge, Difficulty, Mastery, Close */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/[0.05] border border-white/10 text-zinc-200">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
                {subject.name}
              </span>

              <span className="text-[11.5px] font-semibold text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/50">
                Ch. {String(chapter.number).padStart(2, '0')}
              </span>

              {chapter.difficulty && (
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    chapter.difficulty === 'Hard'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                      : chapter.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                  }`}
                >
                  {chapter.difficulty}
                </span>
              )}

              {/* Current Level Badge */}
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                  LEVEL_CONFIG[chapter.level]?.bg
                } ${LEVEL_CONFIG[chapter.level]?.text} ${LEVEL_CONFIG[chapter.level]?.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_CONFIG[chapter.level]?.dot}`} />
                {LEVEL_CONFIG[chapter.level]?.label}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#171719] text-zinc-400 hover:bg-[#232326] hover:text-white transition-colors cursor-pointer shrink-0 shrink-0 min-w-[44px] min-h-[44px]"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <iconify-icon icon="lucide:x" width="16" />
            </button>
          </div>

          {/* Title & Metadata */}
          <div>
            <h2 id="chapter-dialog-title" className="text-[20px] sm:text-xl font-bold text-white tracking-tight leading-snug">
              {chapter.title}
            </h2>
            {subject.professor && (
              <p className="mt-1 text-[12.5px] text-zinc-400 flex items-center gap-1.5 font-medium">
                <iconify-icon icon="lucide:graduation-cap" width="14" className="text-textSubtle" />
                <span>{subject.professor}</span>
                <span className="text-zinc-400">•</span>
                <span className="font-mono text-zinc-400">{subject.code}</span>
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-5 flex flex-col gap-5">
          {/* Mastery Level Switcher */}
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Mastery Progress
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(LEVEL_CONFIG) as ChapterLevel[]).map((lvlKey) => {
                const isSelected = chapter.level === lvlKey;
                const conf = LEVEL_CONFIG[lvlKey];

                return (
                  <button
                    key={lvlKey}
                    type="button"
                    onClick={() => onLevelChange?.(lvlKey)}
                    className={`h-10 rounded-xl border text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      isSelected
                        ? `${conf.bg} ${conf.text} ${conf.border} ring-1 ring-white/20`
                        : 'bg-[#141417] border-borderPanel text-zinc-400 hover:text-zinc-200 hover:bg-cardHover'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${conf.dot}`} />
                    <span>{conf.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Chapter Overview
            </label>
            <div className="rounded-xl border border-borderPanel bg-[#141417] p-4 text-[13.5px] text-zinc-200 leading-relaxed">
              {chapter.description ||
                'Covers foundational theoretical concepts, theorem proofs, and standard problem-solving techniques tested in midterms and finals.'}
            </div>
          </div>

          {/* Key Topics / Syllabus Checklist */}
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Core Exam Topics
            </label>
            <div className="rounded-xl border border-borderPanel bg-[#141417] p-3.5 flex flex-col gap-2.5 text-[13px] text-zinc-300">
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:check-circle-2" width="16" className="text-emerald-400 shrink-0" />
                <span>Fundamental definitions & criterion proofs</span>
              </div>
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:check-circle-2" width="16" className="text-emerald-400 shrink-0" />
                <span>Standard examination exercise archetypes</span>
              </div>
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:check-circle-2" width="16" className="text-emerald-400 shrink-0" />
                <span>Tricky edge cases and boundary conditions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-borderPanel flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-[13px] transition-all flex items-center gap-1.5"
          >
            <iconify-icon icon="lucide:x" width="14" />
            <span>Close</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onScheduleRevision?.(chapter, subject);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[13px] transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <iconify-icon icon="lucide:calendar-plus" width="15" />
            <span>Schedule Revision</span>
          </button>
        </div>
      </div>
    </div>
    </Dialog>
  );
};
