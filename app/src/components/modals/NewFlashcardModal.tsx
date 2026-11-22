import { Dialog } from '../common/Dialog';
import React, { useState } from 'react';
import type { FlashcardItem } from '../../types';

interface NewFlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: Omit<FlashcardItem, 'id' | 'reviewCount' | 'streak'>) => void;
  defaultSubject?: string;
}

const DECKS = [
  { id: 'deck-analyse', name: 'Analyse', color: '#06b6d4' },
  { id: 'deck-algebre', name: 'Algèbre', color: '#a855f7' },
  { id: 'deck-physique', name: 'Physique', color: '#10b981' },
  { id: 'deck-info', name: 'Informatique', color: '#f59e0b' },
];

export const NewFlashcardModal: React.FC<NewFlashcardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultSubject = 'Analyse',
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState(() => {
    const found = DECKS.find((d) => d.name.toLowerCase() === defaultSubject.toLowerCase());
    return found ? found.id : 'deck-analyse';
  });
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [formula, setFormula] = useState('');
  const [tag, setTag] = useState('');

  if (!isOpen) return null;

  const currentDeck = DECKS.find((d) => d.id === selectedDeckId) || DECKS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;

    onSubmit({
      deckId: currentDeck.id,
      subject: currentDeck.name,
      subjectColor: currentDeck.color,
      front: front.trim(),
      back: back.trim(),
      formula: formula.trim() || undefined,
      mastery: 'new',
      nextReviewDate: 'Today',
      due: true,
      tags: tag.trim() ? tag.split(',').map((t) => t.trim()).filter(Boolean) : ['Active Recall'],
    });

    setFront('');
    setBack('');
    setFormula('');
    setTag('');
    onClose();
  };

  return (
    <Dialog label="New Flashcard" onClose={onClose}>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      aria-labelledby="new-flashcard-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-borderPanel bg-[#101013] p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex flex-col gap-3 pb-4 border-b border-[#202026]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold bg-white/[0.05] border border-white/10 text-zinc-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentDeck.color }} />
                {currentDeck.name} Deck
              </span>
              <span className="text-[11.5px] font-medium text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700/50">
                Active Recall
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-cardHover border border-borderPanel flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-[#222226] transition-colors cursor-pointer shrink-0 shrink-0 min-w-[44px] min-h-[44px]"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <iconify-icon icon="lucide:x" width="16" />
            </button>
          </div>

          <div>
            <h2 id="new-flashcard-dialog-title" className="text-[20px] sm:text-xl font-bold text-white tracking-tight leading-snug">
              Create New Flashcard
            </h2>
            <p className="mt-1 text-[12.5px] text-zinc-400">
              Add a concept, formula, or exam theorem for spaced repetition practice.
            </p>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-5 flex flex-col gap-4">
          {/* Deck Selector */}
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Target Deck / Subject
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DECKS.map((deck) => {
                const isSelected = deck.id === selectedDeckId;
                return (
                  <button
                    key={deck.id}
                    type="button"
                    onClick={() => setSelectedDeckId(deck.id)}
                    className={`h-10 rounded-xl border text-[12.5px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white text-white bg-white/10 shadow-sm'
                        : 'border-borderPanel bg-[#141417] text-zinc-400 hover:text-zinc-200 hover:bg-cardHover'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: deck.color }} />
                    <span>{deck.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Front Prompt */}
          <div>
            <label htmlFor="card-front" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Front: Question / Prompt <span className="text-red-400">*</span>
            </label>
            <textarea
              id="card-front"
              rows={3}
              required
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="e.g. Critère de convergence de Riemann pour les intégrales impropres"
              className="w-full rounded-xl bg-[#141417] border border-borderPanel p-3 text-[13.5px] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>

          {/* Back Answer */}
          <div>
            <label htmlFor="card-back" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Back: Answer / Solution <span className="text-red-400">*</span>
            </label>
            <textarea
              id="card-back"
              rows={4}
              required
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="e.g. L'intégrale ∫[1, +∞] 1/x^α dx converge si et seulement si α > 1. En 0, ∫[0, 1] 1/x^α dx converge ssi α < 1."
              className="w-full rounded-xl bg-[#141417] border border-borderPanel p-3 text-[13.5px] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>

          {/* Key Formula / Clue */}
          <div>
            <label htmlFor="card-formula" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Key Formula / Hint (Optional)
            </label>
            <input
              id="card-formula"
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="e.g. ∫[1,+∞] 1/t^α dt < ∞ ⇔ α > 1"
              className="w-full rounded-xl bg-[#141417] border border-borderPanel px-3.5 py-2.5 text-[13px] font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="card-tags" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Tags (Comma separated)
            </label>
            <input
              id="card-tags"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. Intégration, Concours, Formule"
              className="w-full rounded-xl bg-[#141417] border border-borderPanel px-3.5 py-2.5 text-[13px] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#202026] flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-[13px] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <iconify-icon icon="lucide:x" width="14" />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[13px] transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <iconify-icon icon="lucide:plus" width="15" />
              <span>Save Flashcard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    </Dialog>
  );
};
