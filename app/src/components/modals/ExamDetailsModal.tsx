import { Dialog } from '../common/Dialog';
import React from 'react';
import type { ExamData } from '../../types';

interface ExamDetailsModalProps {
  isOpen: boolean;
  exam: ExamData | null;
  onClose: () => void;
  onEdit?: (exam?: ExamData) => void;
  onDelete?: () => void;
}

export const ExamDetailsModal: React.FC<ExamDetailsModalProps> = ({
  isOpen,
  exam,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen || !exam) return null;

  // Box color takes priority over subject color to match the dashboard box!
  const accentColor = exam.boxColor || (exam.isUrgent ? '#ef4444' : exam.subjectColor) || '#ef4444';
  const chapters = exam.chapters || [];

  return (
    <Dialog label="Exam details" onClose={onClose}>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <section
          className="relative w-full max-w-[550px] rounded-2xl border border-[#2a2a2e] bg-[#101013] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Subtle Top Glowing Hairline */}
          <div
            className="absolute top-0 inset-x-0 h-[1px] pointer-events-none z-10 opacity-40"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
            }}
          />

          {/* Deep Moody Ambient Top Glow */}
          <div
            className="absolute top-0 inset-x-0 h-32 opacity-15 pointer-events-none bg-gradient-to-b from-[var(--modal-accent)] via-[var(--modal-accent)]/5 to-transparent"
            style={{ '--modal-accent': accentColor } as React.CSSProperties}
          />

          {/* 1. Header with Metadata Tags */}
          <div className="relative flex flex-col gap-4 px-5 sm:px-7 pt-6 sm:pt-7 pb-4.5 border-b border-[#202026]">
            {/* Top row: Tags & Close */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Subject Tag */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12.5px] font-semibold bg-white/[0.06] border border-white/10 text-zinc-200">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  {exam.subject}
                </span>

                {/* Countdown Tag (Matches Box Alert Badge) */}
                {exam.countdown && (
                  <span
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: `${accentColor}18`,
                      color: accentColor,
                      borderColor: `${accentColor}35`,
                    }}
                  >
                    <iconify-icon icon="lucide:hourglass" width="13" />
                    {exam.countdown}
                  </span>
                )}

                {/* Duration Tag */}
                {(exam.duration || exam.duration === undefined) && (
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-300 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                    <iconify-icon icon="lucide:clock" width="13" className="text-zinc-400" />
                    {exam.duration || '3 Hours'}
                  </span>
                )}

                {/* Coefficient Tag */}
                {(exam.coefficient !== undefined || !exam.duration) && (
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-300 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                    Coeff. {exam.coefficient ?? 4}
                  </span>
                )}

                {/* Type Tag */}
                {exam.type && (
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
                    {exam.type === 'Devoir Surveillé' ? 'DS' : exam.type}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close exam details"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171719] text-zinc-400 hover:bg-[#232326] hover:text-white transition-colors cursor-pointer shrink-0 min-w-[38px] min-h-[38px] -mt-0.5"
                title="Close (Esc)"
              >
                <iconify-icon icon="lucide:x" width="18" />
              </button>
            </div>

            {/* Title & Metadata */}
            <div>
              <h2 className="text-xl sm:text-[23px] font-extrabold text-white tracking-tight leading-snug">
                {exam.title}
              </h2>
              <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-zinc-400 flex items-center gap-2">
                <iconify-icon icon="lucide:calendar-clock" width="15" className="text-textSubtle shrink-0" />
                <span>{exam.timeAndPlace}</span>
              </p>
            </div>
          </div>

          {/* 2. Body: Description Card (if present) + Tested Syllabus Table */}
          <div className="relative px-5 sm:px-7 py-5 space-y-4 sm:space-y-5 max-h-[65vh] overflow-y-auto">
            {/* Description Card (rendered ONLY if description is present) */}
            {exam.description && exam.description.trim().length > 0 && (
              <div className="rounded-2xl bg-[#18181c] border border-[#26262e] p-4.5 sm:p-5 text-[14px] sm:text-[14.5px] flex flex-col gap-2">
                <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">
                  Overview & Scope
                </span>
                <p className="text-zinc-300 leading-relaxed font-normal">
                  {exam.description}
                </p>
              </div>
            )}

            {/* Allowed Material info if present */}
            {exam.allowedMaterial && (
              <div className="rounded-xl bg-[#141418] border border-[#24242c] px-4 py-3 flex items-center gap-3 text-[13px] sm:text-[13.5px] text-zinc-400">
                <iconify-icon icon="lucide:info" width="16" className="text-zinc-400 shrink-0" />
                <span>
                  <strong className="text-zinc-300 font-medium">Materials:</strong> {exam.allowedMaterial}
                </span>
              </div>
            )}

            {/* Tested Syllabus Table */}
            {chapters.length > 0 && (
              <div className="rounded-2xl bg-[#18181c] border border-[#26262e] overflow-hidden divide-y divide-[#24242c] text-[14px]">
                {/* Table Header */}
                <div className="px-5 py-3 bg-[#141418] text-[13px] font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Tested Chapters ({chapters.length})</span>
                </div>

                {/* Chapter Rows */}
                {chapters.map((chap, idx) => (
                  <div
                    key={chap.id || idx}
                    className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <span className="text-[13px] font-semibold text-textSubtle w-6 shrink-0 group-hover:text-zinc-300">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] sm:text-[14.5px] font-medium text-zinc-200 group-hover:text-white truncate">
                        {chap.title}
                      </span>
                    </div>
                    <span
                      className="text-[12px] font-semibold px-2.5 py-1 rounded-md shrink-0 border"
                      style={{
                        backgroundColor: `${accentColor}12`,
                        color: accentColor,
                        borderColor: `${accentColor}30`,
                      }}
                    >
                      Ch. {chap.number}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Footer */}
          <div className="relative flex items-center justify-between border-t border-[#202026] px-5 sm:px-7 py-4 bg-[#0b0b0e] rounded-b-2xl">
            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="text-[14px] font-medium text-textSubtle hover:text-red-400 transition-colors flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl hover:bg-red-500/10"
              >
                <iconify-icon icon="lucide:trash-2" width="17" />
                <span>Delete</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-11 px-6 rounded-xl bg-[#222228] hover:bg-[#2c2c34] text-[14.5px] font-semibold text-white transition-colors cursor-pointer flex items-center justify-center min-w-[95px]"
              >
                Close
              </button>
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(exam)}
                  className="h-11 px-7 rounded-xl bg-white hover:bg-zinc-200 text-[15px] font-bold text-black transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-95 min-w-[120px]"
                >
                  <iconify-icon icon="lucide:pencil" width="16" className="text-black" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </Dialog>
  );
};
