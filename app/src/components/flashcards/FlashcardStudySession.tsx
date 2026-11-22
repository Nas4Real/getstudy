import React, { useState, useEffect, useCallback } from 'react';
import type { FlashcardItem } from '../../types';
import { LatexMath } from '../common/LatexMath';

interface FlashcardStudySessionProps {
  cards: FlashcardItem[];
  deckName: string;
  deckColor: string;
  onExit: () => void;
  onShowToast?: (msg: string) => void;
  initialAllDone?: boolean;
}

export const FlashcardStudySession: React.FC<FlashcardStudySessionProps> = ({
  cards,
  deckName,
  deckColor,
  onExit,
  onShowToast,
  initialAllDone = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialAllDone);
  const [reviewStats, setReviewStats] = useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });

  const currentCard = cards[currentIndex] || cards[0];
  const progressPercent = cards.length > 0 ? Math.round(((currentIndex) / cards.length) * 100) : 100;

  const handleRate = useCallback(
    (rating: 'again' | 'hard' | 'good' | 'easy') => {
      setReviewStats((prev) => ({ ...prev, [rating]: prev[rating] + 1 }));

      if (currentIndex + 1 < cards.length) {
        setIsFlipped(false);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        onShowToast?.(`🎉 Great job! You finished reviewing ${cards.length} cards.`);
      }
    },
    [currentIndex, cards.length, onShowToast]
  );

  // Global keyboard shortcuts: Space flips card; 1-4 rate when flipped
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (isFlipped) {
        if (e.key === '1') handleRate('again');
        if (e.key === '2') handleRate('hard');
        if (e.key === '3') handleRate('good');
        if (e.key === '4') handleRate('easy');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, handleRate]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
    setReviewStats({ again: 0, hard: 0, good: 0, easy: 0 });
  };

  if (isCompleted || cards.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-6">
          <iconify-icon icon="lucide:trophy" width="38" />
        </div>

        <span className="px-3.5 py-1 rounded-full text-[12px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Review Session Complete
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          All Caught Up on {deckName}!
        </h2>
        <p className="mt-2 text-[14px] text-zinc-400 max-w-md">
          You've reviewed all cards scheduled for today. Regular recall strengthens neural retention before exams.
        </p>

        {/* Stats Pill Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8 w-full max-w-md">
          <div className="bg-[#141417] border border-borderPanel rounded-2xl p-3.5">
            <span className="text-[11px] font-bold text-textSubtle uppercase tracking-wider block">Reviewed</span>
            <span className="text-[20px] font-bold text-white mt-1 block">{cards.length}</span>
          </div>
          <div className="bg-[#141417] border border-borderPanel rounded-2xl p-3.5">
            <span className="text-[11px] font-bold text-emerald-500/80 uppercase tracking-wider block">Easy / Good</span>
            <span className="text-[20px] font-bold text-emerald-400 mt-1 block">{reviewStats.easy + reviewStats.good}</span>
          </div>
          <div className="bg-[#141417] border border-borderPanel rounded-2xl p-3.5">
            <span className="text-[11px] font-bold text-amber-500/80 uppercase tracking-wider block">Hard</span>
            <span className="text-[20px] font-bold text-amber-400 mt-1 block">{reviewStats.hard}</span>
          </div>
          <div className="bg-[#141417] border border-borderPanel rounded-2xl p-3.5">
            <span className="text-[11px] font-bold text-red-500/80 uppercase tracking-wider block">Again</span>
            <span className="text-[20px] font-bold text-red-400 mt-1 block">{reviewStats.again}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-[14px] transition-all shadow-sm cursor-pointer"
          >
            Back to Decks
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="px-5 py-3 rounded-full bg-cardHover hover:bg-[#27272a] text-zinc-300 hover:text-white border border-borderPanel font-bold text-[14px] transition-all cursor-pointer flex items-center gap-2"
          >
            <iconify-icon icon="lucide:rotate-ccw" width="16" />
            <span>Practice Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full max-w-4xl w-full mx-auto p-4 sm:p-6 justify-between animate-in fade-in duration-200">
      {/* Top Header & Progress */}
      <div className="flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              aria-label="Exit study session"
              className="w-9 h-9 rounded-xl bg-[#141417] border border-borderPanel flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
              title="Exit study session"
            >
              <iconify-icon icon="lucide:arrow-left" width="18" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: deckColor }} />
                <h3 className="text-[15px] font-bold text-white tracking-tight">{deckName}</h3>
              </div>
              <p className="text-[12px] text-zinc-400 font-medium">Spaced Repetition Review</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12.5px] font-bold text-zinc-400 bg-[#141417] border border-borderPanel px-3 py-1 rounded-full">
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-cardHover rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Center 3D Flip Card */}
      <div className="flex-1 flex items-center justify-center my-6 sm:my-8 perspective-1000">
        <div
          onClick={() => setIsFlipped((prev) => !prev)}
          className={`relative w-full max-w-2xl min-h-[340px] sm:min-h-[400px] rounded-3xl bg-[#101013] border border-borderPanel p-6 sm:p-10 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-zinc-600 select-none group ${
            isFlipped ? 'ring-1 ring-white/10' : ''
          }`}
        >
          {/* Card Meta Row */}
          <div className="flex items-center justify-between pb-4 border-b border-[#202026]">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border"
                style={{
                  backgroundColor: `${deckColor}15`,
                  borderColor: `${deckColor}35`,
                  color: deckColor,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: deckColor }} />
                {currentCard.subject}
              </span>

              {currentCard.tags && currentCard.tags[0] && (
                <span className="text-[11px] font-medium text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700/50">
                  {currentCard.tags[0]}
                </span>
              )}
            </div>

            <span className="text-[11.5px] font-medium text-textSubtle group-hover:text-zinc-300 transition-colors flex items-center gap-1.5">
              <iconify-icon icon="lucide:rotate-3d" width="14" />
              <span>{isFlipped ? 'Answer View' : 'Question View'}</span>
            </span>
          </div>

          {/* Card Body Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
            {!isFlipped ? (
              // FRONT OF CARD
              <div className="flex flex-col items-center gap-4 animate-in fade-in duration-150">
                <span className="text-[11.5px] font-bold tracking-widest text-textSubtle uppercase">
                  Prompt / Concept
                </span>
                <h4 className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight leading-relaxed max-w-lg">
                  {currentCard.front}
                </h4>
                {currentCard.subtext && (
                  <p className="text-[13px] text-zinc-400 italic">
                    Hint: {currentCard.subtext}
                  </p>
                )}
              </div>
            ) : (
              // BACK OF CARD
              <div className="flex flex-col items-center gap-4 animate-in fade-in duration-150 w-full">
                <span className="text-[11.5px] font-bold tracking-widest text-emerald-400 uppercase">
                  Correct Answer & Key Rule
                </span>
                <p className="text-base sm:text-[18px] font-semibold text-zinc-100 leading-relaxed max-w-xl text-left bg-[#141417] p-5 rounded-2xl border border-borderPanel">
                  {currentCard.back}
                </p>
                {currentCard.formula && (
                  <div className="w-full max-w-xl flex items-center justify-center p-4 rounded-2xl bg-[#09090d] border border-zinc-700/80 shadow-md overflow-x-auto scrollbar-hide">
                    <LatexMath math={currentCard.formula} displayMode className="text-[18px] sm:text-xl text-white font-medium" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Footer Hint */}
          <div className="pt-4 border-t border-[#202026] flex items-center justify-between text-[12px] text-textSubtle">
            <span>
              {isFlipped ? 'Rate your recall below' : 'Tap anywhere or press Space to flip'}
            </span>
            <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
              <kbd className="px-1.5 py-0.5 rounded bg-cardHover border border-borderPanel">Space</kbd>
              <span>to flip</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Rating Controls (Visible after flip) */}
      <div className="shrink-0 pt-2 pb-4">
        {isFlipped ? (
          <div className="flex flex-col items-center gap-2.5 animate-in fade-in duration-150">
            <span className="text-[12px] font-semibold text-zinc-400">
              How well did you remember this?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-xl">
              {/* Again */}
              <button
                type="button"
                onClick={() => handleRate('again')}
                className="h-12 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 font-bold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <iconify-icon icon="lucide:rotate-ccw" width="16" />
                <div className="flex flex-col items-start leading-tight">
                  <span>Again</span>
                  <span className="text-[11px] font-normal opacity-70">&lt; 1 min</span>
                </div>
              </button>

              {/* Hard */}
              <button
                type="button"
                onClick={() => handleRate('hard')}
                className="h-12 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/25 font-bold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <iconify-icon icon="lucide:clock" width="16" />
                <div className="flex flex-col items-start leading-tight">
                  <span>Hard</span>
                  <span className="text-[11px] font-normal opacity-70">10 min</span>
                </div>
              </button>

              {/* Good */}
              <button
                type="button"
                onClick={() => handleRate('good')}
                className="h-12 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/25 font-bold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <iconify-icon icon="lucide:thumbs-up" width="16" />
                <div className="flex flex-col items-start leading-tight">
                  <span>Good</span>
                  <span className="text-[11px] font-normal opacity-70">1 day</span>
                </div>
              </button>

              {/* Easy */}
              <button
                type="button"
                onClick={() => handleRate('easy')}
                className="h-12 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 font-bold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <iconify-icon icon="lucide:zap" width="16" />
                <div className="flex flex-col items-start leading-tight">
                  <span>Easy</span>
                  <span className="text-[11px] font-normal opacity-70">4 days</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="px-8 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-[14px] transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <iconify-icon icon="lucide:eye" width="17" />
              <span>Show Answer (Space)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
