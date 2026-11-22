import React, { useState } from 'react';
import type { FlashcardDeck, FlashcardItem } from '../../../types';

interface DecksGridViewProps {
  decks: FlashcardDeck[];
  cards: FlashcardItem[];
  selectedSubjectFilter: string;
  onSelectSubjectFilter: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onStartStudy: (deckId?: string) => void;
  onOpenNewModal: () => void;
  isEmptyState?: boolean;
}

export const DecksGridView: React.FC<DecksGridViewProps> = ({
  decks,
  cards,
  selectedSubjectFilter,
  onSelectSubjectFilter,
  searchQuery,
  onSearchChange,
  onStartStudy,
  onOpenNewModal,
  isEmptyState = false,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'decks' | 'browse'>('decks');

  // Filtered decks for decks tab
  const filteredDecks = decks.filter((deck) => {
    if (selectedSubjectFilter === 'all') return true;
    if (selectedSubjectFilter === 'due') return deck.dueCards > 0;
    return deck.subject.toLowerCase() === selectedSubjectFilter.toLowerCase();
  });

  // Filtered cards for browse tab
  const filteredCards = cards.filter((card) => {
    if (selectedSubjectFilter === 'due' && !card.due) return false;
    if (
      selectedSubjectFilter !== 'all' &&
      selectedSubjectFilter !== 'due' &&
      card.subject.toLowerCase() !== selectedSubjectFilter.toLowerCase()
    ) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        card.front.toLowerCase().includes(q) ||
        card.back.toLowerCase().includes(q) ||
        (card.formula && card.formula.toLowerCase().includes(q)) ||
        (card.tags && card.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    return true;
  });

  // Totals
  const totalCardsCount = cards.length;
  const totalDueCount = cards.filter((c) => c.due).length;
  const masteredCount = cards.filter((c) => c.mastery === 'mastered').length;
  const masteryPercentage = totalCardsCount > 0 ? Math.round((masteredCount / totalCardsCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Top Stats Overview Bar */}
      <div className="px-4 sm:px-8 py-4 sm:py-5 shrink-0 border-b border-borderPanel/60 bg-[#0b0b0e]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {/* Due Today */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#121215] border border-borderPanel flex items-center justify-between">
            <div>
              <span className="text-[11.5px] font-bold text-zinc-400 uppercase tracking-wider block">Due Today</span>
              <span className="text-xl sm:text-[24px] font-bold text-white mt-0.5 block">{totalDueCount} cards</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:clock" width="20" />
            </div>
          </div>

          {/* Mastered Rate */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#121215] border border-borderPanel flex items-center justify-between">
            <div>
              <span className="text-[11.5px] font-bold text-zinc-400 uppercase tracking-wider block">Mastery Rate</span>
              <span className="text-xl sm:text-[24px] font-bold text-emerald-400 mt-0.5 block">{masteryPercentage}%</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:check-circle-2" width="20" />
            </div>
          </div>

          {/* Current Streak */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#121215] border border-borderPanel flex items-center justify-between">
            <div>
              <span className="text-[11.5px] font-bold text-zinc-400 uppercase tracking-wider block">Daily Streak</span>
              <span className="text-xl sm:text-[24px] font-bold text-white mt-0.5 block">5 Days 🔥</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:flame" width="20" />
            </div>
          </div>

          {/* Total Library */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#121215] border border-borderPanel flex items-center justify-between">
            <div>
              <span className="text-[11.5px] font-bold text-zinc-400 uppercase tracking-wider block">Total Flashcards</span>
              <span className="text-xl sm:text-[24px] font-bold text-white mt-0.5 block">{totalCardsCount} cards</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:layers" width="20" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subnav Tabs (Decks / Card Browser) */}
      <div className="px-4 sm:px-8 w-full flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 bg-cardBg border border-borderPanel p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveSubTab('decks')}
            className={`px-5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
              activeSubTab === 'decks' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Subject Decks ({decks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('browse')}
            className={`px-5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
              activeSubTab === 'browse' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Cards Browser ({cards.length})
          </button>
        </div>
      </div>

      {/* 3. Main Content */}
      <div className="px-4 sm:px-8 w-full pb-12">
        {isEmptyState ? (
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
            <div className="w-18 h-18 rounded-3xl bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 flex items-center justify-center shadow-inner mb-5">
              <iconify-icon icon="lucide:layers" width="36" />
            </div>
            <h3 className="text-[20px] font-bold text-white tracking-tight">No Flashcards Created Yet</h3>
            <p className="mt-2 text-[13.5px] text-zinc-400 leading-relaxed">
              Start building your active recall deck by creating flashcards for tricky formulas, theorem statements, and exam proofs.
            </p>
            <button
              type="button"
              onClick={onOpenNewModal}
              className="mt-6 px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-[13.5px] shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <iconify-icon icon="lucide:plus" width="16" />
              <span>Create Your First Flashcard</span>
            </button>
          </div>
        ) : activeSubTab === 'decks' ? (
          <div className="flex flex-col gap-6">
            {/* Filter Pills row */}
            <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-hide py-1">
              {[
                { id: 'all', label: 'All Decks' },
                { id: 'due', label: 'Due Today' },
                { id: 'analyse', label: 'Analyse' },
                { id: 'algèbre', label: 'Algèbre' },
                { id: 'physique', label: 'Physique' },
                { id: 'informatique', label: 'Informatique' },
              ].map((tab) => {
                const isSelected = selectedSubjectFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectSubjectFilter(tab.id)}
                    className={`h-[44px] sm:h-[48px] px-5 sm:px-6 rounded-full text-[14px] sm:text-[15px] font-bold tracking-tight transition-all shrink-0 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center whitespace-nowrap ${
                      isSelected
                        ? 'bg-white text-black shadow-lg ring-1 ring-white/20'
                        : 'bg-[#101014] hover:bg-[#181820] text-zinc-300 hover:text-white border border-[#272730] hover:border-zinc-400'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Decks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredDecks.map((deck) => {
                return (
                  <div
                    key={deck.id}
                    className="rounded-3xl border border-[#25252b] bg-[#101012] p-5 sm:p-6 shadow-sm hover:border-zinc-600 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top row: Subject pill, Due counter */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold border"
                          style={{
                            backgroundColor: `${deck.subjectColor}15`,
                            borderColor: `${deck.subjectColor}35`,
                            color: deck.subjectColor,
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: deck.subjectColor }} />
                          {deck.subject}
                        </span>

                        {deck.dueCards > 0 ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {deck.dueCards} Due
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            All Caught Up ✓
                          </span>
                        )}
                      </div>

                      <h3 className="text-[18px] sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {deck.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {deck.description}
                      </p>

                      {/* Progress Bar & Mastery */}
                      <div className="mt-5 pt-4 border-t border-[#1a1a20]">
                        <div className="flex items-center justify-between text-[12px] mb-2 font-medium">
                          <span className="text-zinc-400">Mastery Progress</span>
                          <span className="font-bold text-white">{deck.masteredPercentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#1c1c22] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${deck.masteredPercentage}%`,
                              backgroundColor: deck.subjectColor,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Deck Actions */}
                    <div className="mt-6 pt-3 flex items-center justify-between gap-3 border-t border-[#18181e]">
                      <span className="text-[12px] font-semibold text-textSubtle">
                        {deck.totalCards} total cards
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSubjectFilter(deck.subject.toLowerCase());
                            setActiveSubTab('browse');
                          }}
                          className="px-3.5 py-2 rounded-xl text-[12.5px] font-semibold text-zinc-400 hover:text-white hover:bg-cardHover transition-colors cursor-pointer"
                        >
                          Browse Cards
                        </button>

                        <button
                          type="button"
                          onClick={() => onStartStudy(deck.id)}
                          className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[13px] flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <iconify-icon icon="lucide:play" width="15" />
                          <span>Study Deck</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Card Browser Table / List View
          <div className="flex flex-col gap-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-2">
              {/* Search input */}
              <div className="relative flex-1 min-w-[240px] max-w-md">
                <iconify-icon
                  icon="lucide:search"
                  width="18"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search questions, formulas, or theorems..."
                  className="w-full h-[44px] sm:h-[48px] pl-11 pr-4 rounded-2xl bg-cardBg border border-borderPanel text-[14px] sm:text-[14.5px] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-300 transition-colors shadow-sm"
                />
              </div>

              {/* Subject filters */}
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-hide py-1">
                {[
                  { id: 'all', label: 'All Cards' },
                  { id: 'due', label: 'Due Today' },
                  { id: 'analyse', label: 'Analyse' },
                  { id: 'algèbre', label: 'Algèbre' },
                  { id: 'physique', label: 'Physique' },
                  { id: 'informatique', label: 'Informatique' },
                ].map((tab) => {
                  const isSelected = selectedSubjectFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => onSelectSubjectFilter(tab.id)}
                      className={`h-[44px] sm:h-[48px] px-5 sm:px-6 rounded-full text-[14px] sm:text-[15px] font-bold tracking-tight transition-all shrink-0 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center whitespace-nowrap ${
                        isSelected
                          ? 'bg-white text-black shadow-lg ring-1 ring-white/20'
                          : 'bg-[#101014] hover:bg-[#181820] text-zinc-300 hover:text-white border border-[#272730] hover:border-zinc-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-3 mt-2">
              {filteredCards.length === 0 ? (
                <div className="py-12 text-center text-textSubtle text-[13.5px]">
                  No flashcards found matching your query.
                </div>
              ) : (
                filteredCards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      className="rounded-2xl border border-[#25252b] bg-[#101012] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-600 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border"
                            style={{
                              backgroundColor: `${card.subjectColor}15`,
                              borderColor: `${card.subjectColor}35`,
                              color: card.subjectColor,
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.subjectColor }} />
                            {card.subject}
                          </span>

                          {card.tags &&
                            card.tags.map((t) => (
                              <span
                                key={t}
                                className="text-[10.5px] font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full border border-zinc-700/50"
                              >
                                {t}
                              </span>
                            ))}
                        </div>

                        <h4 className="text-[15px] font-bold text-white tracking-tight">
                          {card.front}
                        </h4>
                        <p className="mt-1 text-[13px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {card.back}
                        </p>
                      </div>

                      {/* Right Meta & Tag */}
                      <div className="flex items-center gap-3 shrink-0 sm:border-l sm:border-[#202026] sm:pl-5">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                            card.mastery === 'mastered'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                              : card.mastery === 'review'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/25'
                              : card.mastery === 'learning'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {card.mastery.toUpperCase()}
                        </span>

                        <span className="text-[12px] font-medium text-textSubtle">
                          Streak: {card.streak}🔥
                        </span>

                        <button
                          type="button"
                          onClick={() => onStartStudy(card.deckId)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Review Card"
                        >
                          <iconify-icon icon="lucide:play" width="16" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
