import React, { useState } from 'react';
import type { FlashcardDeck, FlashcardItem } from '../../../types';

interface AnkiTableViewProps {
  decks: FlashcardDeck[];
  cards: FlashcardItem[];
  selectedSubjectFilter: string;
  onSelectSubjectFilter: (filter: string) => void;
  onStartStudy: (deckId?: string) => void;
  onOpenNewModal: () => void;
}

// Simulated 35-day review heatmap data (5 weeks x 7 days)
const HEATMAP_DAYS = [
  { day: 'Lun', date: 'Oct 06', count: 14, level: 3 },
  { day: 'Mar', date: 'Oct 07', count: 18, level: 3 },
  { day: 'Mer', date: 'Oct 08', count: 8, level: 2 },
  { day: 'Jeu', date: 'Oct 09', count: 22, level: 4 },
  { day: 'Ven', date: 'Oct 10', count: 16, level: 3 },
  { day: 'Sam', date: 'Oct 11', count: 5, level: 1 },
  { day: 'Dim', date: 'Oct 12', count: 0, level: 0 },

  { day: 'Lun', date: 'Oct 13', count: 12, level: 2 },
  { day: 'Mar', date: 'Oct 14', count: 25, level: 4 },
  { day: 'Mer', date: 'Oct 15', count: 19, level: 3 },
  { day: 'Jeu', date: 'Oct 16', count: 14, level: 3 },
  { day: 'Ven', date: 'Oct 17', count: 7, level: 2 },
  { day: 'Sam', date: 'Oct 18', count: 12, level: 2 },
  { day: 'Dim', date: 'Oct 19', count: 4, level: 1 },

  { day: 'Lun', date: 'Oct 20', count: 20, level: 4 },
  { day: 'Mar', date: 'Oct 21', count: 15, level: 3 },
  { day: 'Mer', date: 'Oct 22', count: 11, level: 2 },
  { day: 'Jeu', date: 'Oct 23', count: 18, level: 3 },
  { day: 'Ven', date: 'Oct 24', count: 24, level: 4 },
  { day: 'Sam', date: 'Oct 25', count: 6, level: 1 },
  { day: 'Dim', date: 'Oct 26', count: 2, level: 1 },

  { day: 'Lun', date: 'Oct 27', count: 17, level: 3 },
  { day: 'Mar', date: 'Oct 28', count: 21, level: 4 },
  { day: 'Mer', date: 'Oct 29', count: 16, level: 3 },
  { day: 'Jeu', date: 'Oct 30', count: 19, level: 3 },
  { day: 'Ven', date: 'Oct 31', count: 13, level: 2 },
  { day: 'Sam', date: 'Nov 01', count: 9, level: 2 },
  { day: 'Dim', date: 'Nov 02', count: 5, level: 1 },

  { day: 'Lun', date: 'Nov 03', count: 22, level: 4 },
  { day: 'Mar', date: 'Nov 04', count: 18, level: 3 },
  { day: 'Mer', date: 'Nov 05', count: 26, level: 4 },
  { day: 'Jeu', date: 'Nov 06', count: 15, level: 3 },
  { day: 'Ven', date: 'Nov 07', count: 8, level: 2 },
  { day: 'Sam', date: 'Nov 08', count: 0, level: 0 },
  { day: 'Dim', date: 'Nov 09', count: 0, level: 0 },
];

export const AnkiTableView: React.FC<AnkiTableViewProps> = ({
  decks,
  cards,
  selectedSubjectFilter,
  onSelectSubjectFilter,
  onStartStudy,
  onOpenNewModal,
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);

  // Filtered decks
  const filteredDecks = decks.filter((deck) => {
    if (selectedSubjectFilter === 'all') return true;
    if (selectedSubjectFilter === 'due') return deck.dueCards > 0;
    return deck.subject.toLowerCase() === selectedSubjectFilter.toLowerCase();
  });

  const totalDue = cards.filter((c) => c.due).length;

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-[#15151a] border border-[#222228]';
      case 1:
        return 'bg-emerald-950/70 border border-emerald-800/40';
      case 2:
        return 'bg-emerald-700/60 border border-emerald-600/40';
      case 3:
        return 'bg-emerald-500/80 border border-emerald-400/60';
      case 4:
        return 'bg-emerald-400 border border-emerald-300';
      default:
        return 'bg-[#15151a]';
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-8 w-full pb-16">
      {/* 1. Header Banner & Quick Sprint CTA */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#121217] via-[#0d0d12] to-[#121217] border border-borderPanel flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 flex items-center justify-center shrink-0">
            <iconify-icon icon="lucide:zap" width="26" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-[20px] font-bold text-white tracking-tight">
                Anki Pro Retention Matrix
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                SM-2 / FSRS
              </span>
            </div>
            <p className="text-[13px] sm:text-[13.5px] text-zinc-400 mt-1">
              Linear spaced repetition queue with memory retention forecasts and recall heatmaps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenNewModal}
            className="px-4 py-2.5 rounded-full bg-cardHover hover:bg-[#27272a] text-zinc-200 hover:text-white border border-borderPanel text-[13.5px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <iconify-icon icon="lucide:plus" width="16" />
            <span>Add Card</span>
          </button>

          <button
            type="button"
            onClick={() => onStartStudy()}
            disabled={totalDue === 0}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black text-[13.5px] font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            <iconify-icon icon="lucide:play" width="16" />
            <span>Start Review Sprint ({totalDue})</span>
          </button>
        </div>
      </div>

      {/* 2. Top Analytics Grid: Heatmap + Algorithm Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 30-Day Retention Heatmap (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-[#25252b] bg-[#101012] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:calendar-days" width="18" className="text-emerald-400" />
                <h3 className="text-[15px] font-bold text-white tracking-tight">
                  30-Day Active Recall Heatmap
                </h3>
              </div>
              <span className="text-[11.5px] font-medium text-zinc-400">
                {hoveredCell ? (
                  <span className="text-emerald-400 font-bold">
                    {hoveredCell.date}: {hoveredCell.count} cards reviewed
                  </span>
                ) : (
                  '486 cards recalled this month'
                )}
              </span>
            </div>

            {/* Heatmap Grid */}
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-2">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d, colIdx) => (
                <div key={d} className="flex flex-col items-center gap-1.5 flex-1 min-w-[32px]">
                  <span className="text-[11px] font-bold text-textSubtle uppercase">{d}</span>
                  {/* 5 rows for the 5 weeks */}
                  {[0, 1, 2, 3, 4].map((rowIdx) => {
                    const item = HEATMAP_DAYS[rowIdx * 7 + colIdx];
                    if (!item) return null;
                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        onMouseEnter={() => setHoveredCell({ date: item.date, count: item.count })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-full aspect-square rounded-lg transition-transform hover:scale-115 cursor-pointer ${getHeatmapColor(
                          item.level
                        )}`}
                        title={`${item.date}: ${item.count} cards`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="mt-4 pt-3 border-t border-[#1a1a20] flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>5-Day Study Streak Maintained</span>
            </span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <span className="w-3 h-3 rounded bg-[#15151a] border border-[#222228]" />
              <span className="w-3 h-3 rounded bg-emerald-950/70 border border-emerald-800/40" />
              <span className="w-3 h-3 rounded bg-emerald-700/60" />
              <span className="w-3 h-3 rounded bg-emerald-500/80" />
              <span className="w-3 h-3 rounded bg-emerald-400" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Right: SRS Forecast & Interval Intervals (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#25252b] bg-[#101012] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:trending-up" width="18" className="text-cyan-400" />
                <h3 className="text-[15px] font-bold text-white tracking-tight">
                  SRS Algorithm Schedule
                </h3>
              </div>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                Predicted Retention: 91.2%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <span className="text-[11px] text-zinc-400 font-bold uppercase block">Due Today</span>
                <span className="text-xl font-bold text-white mt-0.5 block">{totalDue} cards</span>
                <span className="text-[11px] text-amber-400 mt-1 block">Active recall queue</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <span className="text-[11px] text-zinc-400 font-bold uppercase block">Tomorrow</span>
                <span className="text-xl font-bold text-white mt-0.5 block">8 cards</span>
                <span className="text-[11px] text-cyan-400 mt-1 block">Scheduled interval</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <span className="text-[11px] text-zinc-400 font-bold uppercase block">In 3 Days</span>
                <span className="text-xl font-bold text-white mt-0.5 block">14 cards</span>
                <span className="text-[11px] text-purple-400 mt-1 block">Midterm revision</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141418] border border-[#222228]">
                <span className="text-[11px] text-zinc-400 font-bold uppercase block">Next Week</span>
                <span className="text-xl font-bold text-white mt-0.5 block">26 cards</span>
                <span className="text-[11px] text-emerald-400 mt-1 block">Long-term memory</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1a1a20] flex items-center justify-between text-[11px] text-zinc-400">
            <span>Algorithm: Modified SuperMemo 2 (SM-2)</span>
            <span className="text-textSubtle font-medium">Interval factor: 2.50</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Pills */}
      <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-hide py-1">
        {[
          { id: 'all', label: 'All Queues' },
          { id: 'due', label: 'Pending Review Only' },
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

      {/* 4. Anki Pro Linear Decks Queue Table */}
      <div className="rounded-3xl border border-[#25252b] bg-[#101012] overflow-hidden shadow-lg">
        <div className="px-5 sm:px-7 py-4 border-b border-borderPanel flex items-center justify-between bg-[#0e0e11]">
          <div className="flex items-center gap-2">
            <iconify-icon icon="lucide:list" width="18" className="text-zinc-400" />
            <h3 className="text-[15px] font-bold text-white tracking-tight">
              Spaced Repetition Decks Queue
            </h3>
          </div>
          <span className="text-[12px] font-medium text-zinc-400">
            {filteredDecks.length} active deck{filteredDecks.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#181820] text-[11.5px] font-bold text-zinc-400 uppercase tracking-wider bg-[#0a0a0d]">
                <th className="py-3.5 px-6">Deck & Curriculum</th>
                <th className="py-3.5 px-4">Queue Status</th>
                <th className="py-3.5 px-4">SRS State Breakdown</th>
                <th className="py-3.5 px-4">Mastery</th>
                <th className="py-3.5 px-4">Est. Time</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181820] text-[13px]">
              {filteredDecks.map((deck) => {
                // Break down cards for this deck
                const deckCards = cards.filter((c) => c.deckId === deck.id);
                const newCount = deckCards.filter((c) => c.mastery === 'new').length;
                const learnCount = deckCards.filter((c) => c.mastery === 'learning').length;
                const reviewCount = deckCards.filter((c) => c.mastery === 'review').length;
                const masteredCount = deckCards.filter((c) => c.mastery === 'mastered').length;

                return (
                  <tr
                    key={deck.id}
                    className="hover:bg-[#141418] transition-colors group"
                  >
                    {/* Deck info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: `${deck.subjectColor}15`,
                            borderColor: `${deck.subjectColor}30`,
                            color: deck.subjectColor,
                          }}
                        >
                          <iconify-icon icon={deck.icon} width="20" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {deck.title}
                            </span>
                          </div>
                          <span className="text-[12px] text-zinc-400 block mt-0.5">
                            {deck.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Due count */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {deck.dueCards > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {deck.dueCards} Due Now
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          0 Due • Synced
                        </span>
                      )}
                    </td>

                    {/* Breakdown bar */}
                    <td className="py-4 px-4 min-w-[180px]">
                      <div className="flex items-center gap-2 text-[11px] font-bold mb-1.5">
                        <span className="text-cyan-400">{newCount} New</span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-amber-400">{learnCount} Learn</span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-purple-400">{reviewCount} Rev</span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-emerald-400">{masteredCount} Mst</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#1c1c22] overflow-hidden flex">
                        <div style={{ width: `${(newCount / deck.totalCards) * 100}%` }} className="bg-cyan-400 h-full" />
                        <div style={{ width: `${(learnCount / deck.totalCards) * 100}%` }} className="bg-amber-400 h-full" />
                        <div style={{ width: `${(reviewCount / deck.totalCards) * 100}%` }} className="bg-purple-400 h-full" />
                        <div style={{ width: `${(masteredCount / deck.totalCards) * 100}%` }} className="bg-emerald-400 h-full" />
                      </div>
                    </td>

                    {/* Mastery */}
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                      {deck.masteredPercentage}%
                    </td>

                    {/* Est. time */}
                    <td className="py-4 px-4 text-zinc-400 font-medium text-[12px] whitespace-nowrap">
                      ~{deck.dueCards * 1.5} min
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onStartStudy(deck.id)}
                        disabled={deck.dueCards === 0}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-[12.5px] font-bold transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <iconify-icon icon="lucide:play" width="14" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
