import { Dialog } from '../common/Dialog';
import React, { useState } from 'react';
import type { SubjectData } from '../../types';

interface NewSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subject: Omit<SubjectData, 'id' | 'chapters'>) => void;
}

const COLOR_OPTIONS = [
  { name: 'Cyan (Analyse)', hex: '#06b6d4' },
  { name: 'Pink (Algèbre)', hex: '#ec4899' },
  { name: 'Emerald (Physique)', hex: '#10b981' },
  { name: 'Blue (Mécanique)', hex: '#3b82f6' },
  { name: 'Purple (Informatique)', hex: '#a855f7' },
  { name: 'Amber (Méthodologie)', hex: '#f59e0b' },
  { name: 'Rose (Chimie)', hex: '#f43f5e' },
  { name: 'Yellow (Langues)', hex: '#eab308' },
];

export const NewSubjectModal: React.FC<NewSubjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].hex);
  const [professor, setProfessor] = useState('');
  const [coefficient, setCoefficient] = useState<number>(3);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      code: code.trim() || undefined,
      color: selectedColor,
      professor: professor.trim() || undefined,
      coefficient: coefficient || 1,
    });

    setName('');
    setCode('');
    setProfessor('');
    setCoefficient(3);
    setSelectedColor(COLOR_OPTIONS[0].hex);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setCode('');
    setProfessor('');
    onClose();
  };

  return (
    <Dialog label="New Subject" onClose={onClose}>
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <section
        className="relative w-full max-w-[460px] rounded-2xl border border-[#2a2a2e] bg-[#101013] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Dynamic Ambient Top Glow tinted with chosen subject color */}
        <div
          className="absolute top-0 inset-x-0 h-28 opacity-20 pointer-events-none rounded-t-2xl bg-gradient-to-b from-[var(--sub-color)] to-transparent transition-all duration-300"
          style={{ '--sub-color': selectedColor } as React.CSSProperties}
        />

        {/* 1. Header (Matching the app's established design language) */}
        <div className="relative flex flex-col gap-3 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-[#202026]">
          {/* Top row: Live Preview Pill, Code Badge, Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/[0.05] border border-white/10 text-zinc-200">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: selectedColor }}
                />
                {name.trim() || 'New Subject'}
              </span>

              {code.trim() && (
                <span className="text-[11px] font-mono font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full border border-zinc-700/50">
                  {code.trim()}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close subject modal"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171719] text-zinc-400 hover:bg-[#232326] hover:text-white transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
              title="Close (Esc)"
            >
              <iconify-icon icon="lucide:x" width="16" />
            </button>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
              Add New Subject
            </h2>
            <p className="mt-1 text-[12.5px] text-zinc-400 flex items-center gap-1.5">
              <iconify-icon icon="lucide:folder-plus" width="13" className="text-textSubtle" />
              <span>Create a course module to organize chapters and exams</span>
            </p>
          </div>
        </div>

        {/* 2. Direct Form Body (Clean, airy, no nested boxes) */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative px-4 sm:px-6 py-4 sm:py-5 space-y-4 max-h-[65vh] overflow-y-auto">
            {/* Subject Name */}
            <div>
              <label className="block text-[12px] font-medium text-zinc-300 mb-1.5">
                Subject Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Électrocinétique or Chimie Organique"
                autoFocus
                className="w-full h-11 px-3.5 rounded-xl bg-[#141418] border border-[#272730] text-white text-[13.5px] placeholder-zinc-500 focus:outline-none focus:border-white/35 transition-colors"
              />
            </div>

            {/* Course Code & Coefficient in a balanced row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-zinc-300 mb-1.5">
                  Course Code <span className="text-textSubtle font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. PHY-201"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#141418] border border-[#272730] text-white font-mono text-[13px] placeholder-zinc-500 focus:outline-none focus:border-white/35 transition-colors uppercase"
                />
              </div>

              {/* Coefficient / ECTS with - / + Stepper */}
              <div>
                <label className="block text-[12px] font-medium text-zinc-300 mb-1.5">
                  Coefficient / ECTS
                </label>
                <div className="flex items-center gap-1 bg-[#141418] border border-[#272730] rounded-xl p-1 h-11">
                  <button
                    type="button"
                    onClick={() => setCoefficient(Math.max(1, coefficient - 1))}
                    className="w-8 h-full rounded-lg bg-[#1c1c22] hover:bg-[#282832] text-zinc-300 hover:text-white flex items-center justify-center font-bold text-[15px] transition-colors cursor-pointer select-none"
                    title="Decrease coefficient"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-white text-[13.5px]">
                    Coef {coefficient}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCoefficient(Math.min(20, coefficient + 1))}
                    className="w-8 h-full rounded-lg bg-[#1c1c22] hover:bg-[#282832] text-zinc-300 hover:text-white flex items-center justify-center font-bold text-[15px] transition-colors cursor-pointer select-none"
                    title="Increase coefficient"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Professor / Instructor */}
            <div>
              <label className="block text-[12px] font-medium text-zinc-300 mb-1.5">
                Professor / Instructor <span className="text-textSubtle font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSubtle flex items-center">
                  <iconify-icon icon="lucide:user" width="14" />
                </span>
                <input
                  type="text"
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                  placeholder="e.g. Dr. Laurent or Prof. Turing"
                  className="w-full h-11 pl-9 pr-3.5 rounded-xl bg-[#141418] border border-[#272730] text-zinc-200 text-[13px] placeholder-zinc-500 focus:outline-none focus:border-white/35 transition-colors"
                />
              </div>
            </div>

            {/* Color Palette Studio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[12px] font-medium text-zinc-300">
                  Subject Color Theme
                </label>
                <span className="text-[11px] font-mono text-textSubtle">
                  {COLOR_OPTIONS.find((c) => c.hex === selectedColor)?.name}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {COLOR_OPTIONS.map((col) => {
                  const isSelected = selectedColor === col.hex;
                  return (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => setSelectedColor(col.hex)}
                      className={`h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'scale-105 shadow-sm'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${col.hex}22` : '#141418',
                        borderColor: isSelected ? col.hex : '#272730',
                      }}
                      title={col.name}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full transition-transform"
                        style={{
                          backgroundColor: col.hex,
                          boxShadow: isSelected ? `0 0 8px ${col.hex}` : undefined,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Footer */}
          <div className="relative flex items-center justify-between border-t border-[#202026] px-4 sm:px-6 py-3.5 bg-[#0b0b0e] rounded-b-2xl">
            {/* Clear Red Cancel Button */}
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-4 py-2 text-[13px] font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/25 hover:border-red-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <iconify-icon icon="lucide:x" width="15" />
              Cancel
            </button>

            {/* Solid White Primary Action Button */}
            <button
              type="submit"
              disabled={!name.trim()}
              className={`rounded-xl px-5 py-2 text-[13px] font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                name.trim()
                  ? 'bg-white hover:bg-zinc-200 text-black cursor-pointer shadow-md'
                  : 'bg-zinc-800 text-textSubtle cursor-not-allowed opacity-60'
              }`}
            >
              <iconify-icon icon="lucide:plus" width="16" className="stroke-[3]" />
              Create Subject
            </button>
          </div>
        </form>
      </section>
    </div>
    </Dialog>
  );
};
