import React, { useState, useMemo } from 'react';
import type { FlashcardDeck, FlashcardItem } from '../../../types';
import { LatexMath } from '../../common/LatexMath';

export interface StudyFilterOptions {
  chapterNumber?: number;
  formulasOnly?: boolean;
  dueOnly?: boolean;
  specificCardId?: string;
  customTitle?: string;
}

interface CurriculumHubViewProps {
  decks: FlashcardDeck[];
  cards: FlashcardItem[];
  onStartStudy: (deckId?: string, options?: StudyFilterOptions) => void;
  onOpenNewModal: () => void;
  onShowToast?: (msg: string) => void;
}

interface ChapterModule {
  id: string;
  chapterNumber: number;
  title: string;
  cardCount: number;
  dueCount: number;
  masteryPercentage: number;
  concepts: string[];
  keyFormula?: string;
  examWeight?: string;
}

const CURRICULUM_CHAPTERS: Record<string, ChapterModule[]> = {
  analyse: [
    {
      id: 'chap-an-1',
      chapterNumber: 1,
      title: 'Espaces Vectoriels Normés & Espaces de Banach',
      cardCount: 2,
      dueCount: 0,
      masteryPercentage: 100,
      concepts: ['Normes équivalentes', 'Complétude', 'Boules ouvertes', 'Topologie'],
      keyFormula: '\\|x\\|_1 \\leq \\|x\\|_2 \\leq \\sqrt{n} \\|x\\|_1',
      examWeight: '25% of Exam',
    },
    {
      id: 'chap-an-2',
      chapterNumber: 2,
      title: 'Séries Numériques & Séries Entières',
      cardCount: 3,
      dueCount: 3,
      masteryPercentage: 70,
      concepts: ["Règle de d'Alembert", 'Critère de Riemann', 'Règle de Duhamel', 'Rayon R'],
      keyFormula: '\\lim_{n\\to\\infty} \\frac{u_{n+1}}{u_n} = L < 1',
      examWeight: '45% of Exam (Core Topic)',
    },
    {
      id: 'chap-an-3',
      chapterNumber: 3,
      title: 'Intégration & Théorèmes de Convergence',
      cardCount: 2,
      dueCount: 2,
      masteryPercentage: 50,
      concepts: ['Convergence dominée de Lebesgue', 'Fubini', 'Lemme de Fatou'],
      keyFormula: '\\lim_{n\\to\\infty} \\int f_n \\, d\\mu = \\int \\lim f_n \\, d\\mu',
      examWeight: '30% of Exam',
    },
  ],
  algèbre: [
    {
      id: 'chap-alg-1',
      chapterNumber: 1,
      title: 'Espaces Vectoriels & Applications Linéaires',
      cardCount: 2,
      dueCount: 0,
      masteryPercentage: 100,
      concepts: ['Théorème du rang', 'Formule de Grassmann', 'Sous-espaces supplémentaires'],
      keyFormula: '\\dim(E) = \\dim(\\ker(u)) + \\text{rg}(u)',
      examWeight: '20% of Exam',
    },
    {
      id: 'chap-alg-2',
      chapterNumber: 2,
      title: 'Réduction des Endomorphismes & Diagonalisation',
      cardCount: 3,
      dueCount: 2,
      masteryPercentage: 66,
      concepts: ['Polynôme caractéristique', 'Valeurs propres', 'Sous-espaces caractéristiques', 'Jordan'],
      keyFormula: 'P_u(X) = \\det(X I_n - u) = 0',
      examWeight: '50% of Exam (Core Topic)',
    },
    {
      id: 'chap-alg-3',
      chapterNumber: 3,
      title: 'Espaces Préhilbertiens & Endomorphismes Symétriques',
      cardCount: 2,
      dueCount: 2,
      masteryPercentage: 40,
      concepts: ['Inégalité de Cauchy-Schwarz', 'Procédé de Gram-Schmidt', 'Théorème spectral'],
      keyFormula: '|\\langle x, y \\rangle| \\leq \\|x\\| \\cdot \\|y\\|',
      examWeight: '30% of Exam',
    },
  ],
  physique: [
    {
      id: 'chap-phy-1',
      chapterNumber: 1,
      title: 'Thermodynamique Phénoménologique & Machines',
      cardCount: 2,
      dueCount: 1,
      masteryPercentage: 80,
      concepts: ['Premier principe', 'Entropie & Second principe', 'Cycles de Carnot'],
      keyFormula: 'dU = \\delta W + \\delta Q = -P dV + T dS',
      examWeight: '40% of Exam',
    },
    {
      id: 'chap-phy-2',
      chapterNumber: 2,
      title: 'Électromagnétisme & Équations de Maxwell',
      cardCount: 3,
      dueCount: 2,
      masteryPercentage: 55,
      concepts: ['Maxwell-Gauss', 'Maxwell-Faraday', 'Vecteur de Poynting', 'Ondes EM'],
      keyFormula: '\\vec{\\nabla} \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}',
      examWeight: '60% of Exam (Core Topic)',
    },
  ],
  informatique: [
    {
      id: 'chap-inf-1',
      chapterNumber: 1,
      title: 'Algorithmique Avancée, Graphes & Complexité',
      cardCount: 2,
      dueCount: 0,
      masteryPercentage: 100,
      concepts: ['Parcours BFS & DFS', 'Algorithme de Dijkstra', 'Complexité asymptotique \\mathcal{O}'],
      keyFormula: 'd[v] = \\min(d[v], d[u] + w(u,v))',
      examWeight: '50% of Written Exam',
    },
    {
      id: 'chap-inf-2',
      chapterNumber: 2,
      title: 'Programmation Dynamique & Diviser pour Régner',
      cardCount: 2,
      dueCount: 0,
      masteryPercentage: 100,
      concepts: ['Mémoïsation', 'Sous-structure optimale', 'Sac à dos (Knapsack)', 'Tri fusion'],
      keyFormula: 'T(n) = 2T(n/2) + \\mathcal{O}(n)',
      examWeight: '50% of Lab Exam',
    },
  ],
};

const SUBJECT_EXAM_INFO: Record<string, string> = {
  analyse: 'DS 3 in 2 days (Coeff 4)',
  algèbre: 'DS 4 next week (Coeff 4)',
  physique: 'Concours Blanc in 3 weeks (Coeff 5)',
  informatique: 'TP Concours in 10 days (Coeff 3)',
};

const SUBJECT_ICONS: Record<string, string> = {
  analyse: 'lucide:function-square',
  algèbre: 'lucide:grid',
  physique: 'lucide:flame',
  informatique: 'lucide:binary',
};

const getChapters = (subject: string): ChapterModule[] => {
  const norm = subject.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (norm.includes('ana')) return CURRICULUM_CHAPTERS['analyse'] || [];
  if (norm.includes('alg')) return CURRICULUM_CHAPTERS['algèbre'] || [];
  if (norm.includes('phy')) return CURRICULUM_CHAPTERS['physique'] || [];
  if (norm.includes('inf')) return CURRICULUM_CHAPTERS['informatique'] || [];
  return [];
};

const getExamInfo = (subject: string): string => {
  const norm = subject.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (norm.includes('ana')) return SUBJECT_EXAM_INFO['analyse'] || 'DS 3 in 2 days (Coeff 4)';
  if (norm.includes('alg')) return SUBJECT_EXAM_INFO['algèbre'] || 'DS 4 next week (Coeff 4)';
  if (norm.includes('phy')) return SUBJECT_EXAM_INFO['physique'] || 'Concours Blanc in 3 weeks (Coeff 5)';
  if (norm.includes('inf')) return SUBJECT_EXAM_INFO['informatique'] || 'TP Concours in 10 days (Coeff 3)';
  return 'Upcoming Exam';
};

export const parseExamMilestone = (note: string): { title: string; remaining: string } => {
  const clean = note.split('(')[0].trim();
  const match = clean.match(/^(.*?)\s+(in\s+.*|next\s+week)$/i);
  if (match) {
    return { title: match[1], remaining: match[2] };
  }
  return { title: clean, remaining: '' };
};

export const isUnderOneWeek = (text: string): boolean => {
  if (!text) return false;
  const norm = text.toLowerCase().trim();
  const dayMatch = norm.match(/in\s+(\d+)\s+day/);
  if (dayMatch) {
    return parseInt(dayMatch[1], 10) < 7;
  }
  if (norm.includes('hour') || norm.includes('tomorrow') || norm.includes('today')) {
    return true;
  }
  return false;
};

const getSubjectIcon = (subject: string): string => {
  const norm = subject.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (norm.includes('ana')) return SUBJECT_ICONS['analyse'] || 'lucide:function-square';
  if (norm.includes('alg')) return SUBJECT_ICONS['algèbre'] || 'lucide:grid';
  if (norm.includes('phy')) return SUBJECT_ICONS['physique'] || 'lucide:flame';
  if (norm.includes('inf')) return SUBJECT_ICONS['informatique'] || 'lucide:binary';
  return 'lucide:layers';
};

const parseDaysOffset = (dateStr: string): number => {
  const lower = dateStr.toLowerCase().trim();
  if (lower === 'today') return 0;
  if (lower === 'tomorrow') return 1;
  const match = lower.match(/in\s+(\d+)\s+day/);
  return match ? parseInt(match[1], 10) : 99;
};

/** Derives the earliest spaced-repetition review schedule and semantic badge styling for a chapter. */
const getChapterNextReview = (
  chapterCards: FlashcardItem[],
  dueCount: number
): { label: string; badgeClass: string } => {
  if (dueCount > 0) {
    return {
      label: 'Next: Today',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    };
  }

  const futureDates = chapterCards
    .map((c) => c.nextReviewDate)
    .filter((d) => Boolean(d) && parseDaysOffset(d) > 0)
    .sort((a, b) => parseDaysOffset(a) - parseDaysOffset(b));

  const nextLabel = futureDates[0] || 'In 5 days';
  const days = parseDaysOffset(nextLabel);

  return {
    label: `Next: ${nextLabel}`,
    badgeClass:
      days <= 3
        ? 'bg-sky-500/10 text-sky-300 border-sky-500/25'
        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  };
};

const ExamMilestoneChip: React.FC<{
  title: string;
  remaining: string;
  urgent: boolean;
}> = ({ title, remaining, urgent }) => (
  <span
    className={`inline-flex items-center rounded-lg text-xs shadow-sm overflow-hidden shrink-0 border ${
      urgent ? 'bg-[#191114] border-rose-500/30' : 'bg-[#16161e] border-white/10'
    }`}
  >
    <span
      className={`px-2 py-0.5 font-bold text-white flex items-center gap-1.5 border-r ${
        urgent ? 'bg-white/[0.04] border-rose-500/20' : 'bg-white/[0.04] border-white/10'
      }`}
    >
      <iconify-icon
        icon={urgent ? 'lucide:calendar-alert' : 'lucide:calendar'}
        width="12"
        className={urgent ? 'text-rose-400' : 'text-amber-400'}
      />
      <span>{title}</span>
    </span>
    {remaining && (
      <span
        className={`px-2 py-0.5 font-bold ${
          urgent ? 'text-rose-400 bg-rose-500/15' : 'text-amber-300 bg-amber-500/[0.08]'
        }`}
      >
        {remaining}
      </span>
    )}
  </span>
);

export const CurriculumHubView: React.FC<CurriculumHubViewProps> = ({
  decks,
  cards,
  onStartStudy,
  onOpenNewModal: _onOpenNewModal,
  onShowToast,
}) => {
  // Browsing Deck Modal State
  const [browsingDeckId, setBrowsingDeckId] = useState<string | null>(null);
  const [browseSearchQuery, setBrowseSearchQuery] = useState('');
  const [browseChapterFilter, setBrowseChapterFilter] = useState<number | 'all'>('all');

  // Split-Rail inspector selected deck
  const [selectedRailDeckId, setSelectedRailDeckId] = useState<string>(() => decks[0]?.id || 'deck-analyse');

  // Overall totals
  const totalCardsCount = cards.length;
  void totalCardsCount;
  const totalDueCount = cards.filter((c) => c.due).length;

  // Active Deck for browsing modal
  const browsingDeck = decks.find((d) => d.id === browsingDeckId);
  const browsingSubject = browsingDeck ? browsingDeck.subject.toLowerCase() : '';
  const browsingChapters = browsingSubject ? CURRICULUM_CHAPTERS[browsingSubject] || [] : [];

  const browsingCards = useMemo(() => {
    if (!browsingSubject) return [];
    let pool = cards.filter((c) => c.subject.toLowerCase() === browsingSubject);
    if (browseChapterFilter !== 'all') {
      pool = pool.filter((c) => c.chapterNumber === browseChapterFilter);
    }
    if (browseSearchQuery.trim()) {
      const q = browseSearchQuery.toLowerCase();
      pool = pool.filter(
        (c) =>
          c.front.toLowerCase().includes(q) ||
          c.back.toLowerCase().includes(q) ||
          (c.formula && c.formula.toLowerCase().includes(q))
      );
    }
    return pool;
  }, [cards, browsingSubject, browseChapterFilter, browseSearchQuery]);

  const handleOpenBrowseDeck = (deckId: string, initialChapter: number | 'all' = 'all') => {
    setBrowsingDeckId(deckId);
    setBrowseSearchQuery('');
    setBrowseChapterFilter(initialChapter);
  };

  const handleCloseBrowseModal = () => {
    setBrowsingDeckId(null);
  };

  const handlePracticeSingleCard = (card: FlashcardItem) => {
    if (!browsingDeck) return;
    onStartStudy(browsingDeck.id, {
      specificCardId: card.id,
      customTitle: card.front,
    });
    onShowToast?.(`Reviewing: "${card.front}"`);
  };

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-8 w-full pb-24">
      {/* 1. Daily Review Queue Section Card */}
      <section className="bg-[#101012] border border-[#25252b] rounded-[24px] p-6 sm:p-7 flex flex-col shadow-sm relative overflow-hidden">
        {/* Top border accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-borderPanel/60 mb-5 sm:mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:sparkles" width="18" />
            </div>
            <div>
              <h2 className="text-[18px] sm:text-[20px] font-bold text-white tracking-wide leading-tight">
                Daily Review Queue
              </h2>
              <p className="text-xs text-zinc-200 mt-0.5 font-medium">
                Cards scheduled for review today
              </p>
            </div>
          </div>

          {totalDueCount > 0 ? (
            <span className="text-[12.5px] font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{totalDueCount} Cards Due</span>
            </span>
          ) : (
            <span className="text-[12.5px] font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm inline-flex items-center gap-1.5">
              <iconify-icon icon="lucide:check-circle-2" width="14" />
              <span>All Caught Up 🎉</span>
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {totalDueCount > 0 ? (
                <span>
                  You have <span className="text-amber-300 font-extrabold">{totalDueCount} cards</span> scheduled for review today
                </span>
              ) : (
                <span>You have reviewed all scheduled cards for today!</span>
              )}
            </h3>

            <p className="text-sm text-zinc-100 mt-1.5 max-w-2xl leading-relaxed">
              {totalDueCount > 0
                ? "Review these cards today to keep key formulas, theorems, and definitions fresh for your exams."
                : "You're all caught up for today. Explore your subject decks below or practice any topic at your own pace."}
            </p>

            {/* Quick Subject Due Breakdown */}
            <div className="flex items-center gap-2 sm:gap-2.5 mt-4 flex-wrap text-xs font-medium">
              {decks.map((deck) => (
                <button
                  key={deck.id}
                  type="button"
                  onClick={() => onStartStudy(deck.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#141418] hover:bg-[#1f1f26] text-zinc-300 hover:text-white border border-[#272730] hover:border-zinc-600 flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                  title={`Start review for ${deck.subject}`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: deck.subjectColor }} />
                  <span className="font-semibold">{deck.subject}:</span>
                  <span className={deck.dueCards > 0 ? 'text-amber-300 font-bold' : 'text-textSubtle'}>
                    {deck.dueCards} due
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Action Button */}
          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => onStartStudy()}
              disabled={totalDueCount === 0}
              className="h-11 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <iconify-icon icon="lucide:play" width="16" />
              <span>Start Daily Review ({totalDueCount})</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Your Subject Decks Section (Split-Rail Workspace) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Course Subject Decks
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Choose a deck to review due cards, study formulas, or browse all syllabus modules.
            </p>
          </div>
        </div>

        {/* Split-Rail Inspector (Left Rail: Subject Selector, Right Pane: Deep Inspector) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 animate-in fade-in duration-200">
          {/* Left Rail: 4 Subject Selector Cards (Bigger & More Spacious) */}
          <div className="xl:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            {decks.map((deck) => {
              const isSelected = deck.id === selectedRailDeckId;
              const sub = deck.subject.toLowerCase();
              const iconName = getSubjectIcon(sub);
              const chapters = getChapters(sub);
              const examNote = getExamInfo(sub);
              const examParts = parseExamMilestone(examNote);
              const isUrgent = isUnderOneWeek(examParts.remaining);

              return (
                <button
                  key={deck.id}
                  type="button"
                  onClick={() => setSelectedRailDeckId(deck.id)}
                  className={`w-full text-left p-5 sm:p-5.5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-wrap items-center justify-between gap-4 shadow-sm ${
                    isSelected
                      ? 'bg-[#17171b] border-white/40 shadow-xl ring-1 ring-white/10'
                      : 'bg-[#101012] border-[#25252b] hover:border-zinc-500 hover:bg-[#16161a]'
                  }`}
                >
                  <div className="flex-1 basis-64 flex items-center gap-4 min-w-0">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: `${deck.subjectColor}25`, border: `1px solid ${deck.subjectColor}50` }}
                    >
                      <iconify-icon icon={iconName} width="26" style={{ color: deck.subjectColor }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      {/* Title Row: Subject Name + Split Event Chip */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-lg sm:text-[20px] font-bold text-white tracking-tight">
                          {deck.subject}
                        </h4>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                        )}
                        {/* 2-Tone Split Event Chip (Urgent red if < 1 week) */}
                        <span className={`inline-flex items-center rounded-lg text-xs shadow-sm overflow-hidden shrink-0 border ${
                          isUrgent
                            ? 'bg-[#191114] border-rose-500/30'
                            : 'bg-[#16161e] border-white/10'
                        }`}>
                          <span className={`px-2.5 py-1 font-bold text-white flex items-center gap-1.5 border-r ${
                            isUrgent ? 'bg-white/[0.04] border-rose-500/20' : 'bg-white/[0.04] border-white/10'
                          }`}>
                            <iconify-icon
                              icon={isUrgent ? "lucide:calendar-alert" : "lucide:calendar"}
                              width="13"
                              className={isUrgent ? "text-rose-400" : "text-amber-400"}
                            />
                            <span>{examParts.title}</span>
                          </span>
                          <span className={`px-2.5 py-1 font-bold ${
                            isUrgent
                              ? 'text-rose-400 bg-rose-500/15'
                              : 'text-amber-300 bg-amber-500/[0.06]'
                          }`}>
                            {examParts.remaining}
                          </span>
                        </span>
                      </div>

                      {/* Subtitle: Whole Subject Scope & Stats (Clear & High-Contrast) */}
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[13.5px] sm:text-[14px] text-zinc-200 font-medium mt-1.5">
                        <span className="whitespace-nowrap">
                          <strong className="text-white font-semibold">{chapters.length}</strong> Modules
                        </span>
                        <span className="text-textSubtle">•</span>
                        <span className="whitespace-nowrap">
                          <strong className="text-white font-semibold">{deck.totalCards}</strong> cards
                        </span>
                        <span className="text-textSubtle">•</span>
                        <span className="text-emerald-400 font-semibold whitespace-nowrap">{deck.masteredPercentage}% mastery</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Sleek Accent Pill (Bigger, sans-serif) */}
                  <div className="flex items-center gap-3 shrink-0 ml-auto">
                    {deck.dueCards > 0 ? (
                      <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[13px] sm:text-[14px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center justify-center shadow-[0_2px_8px_rgba(245,158,11,0.18)]">
                        {deck.dueCards} Due
                      </span>
                    ) : (
                      <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[13px] sm:text-[14px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 inline-flex items-center gap-1.5 shadow-[0_2px_8px_rgba(16,185,129,0.18)]">
                        <iconify-icon icon="lucide:check" width="15" />
                        <span>Done</span>
                      </span>
                    )}
                    <iconify-icon
                      icon="lucide:chevron-right"
                      width="22"
                      className={isSelected ? 'text-white' : 'text-zinc-400'}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          {/* Right Pane: Subject Deck Overview */}
          <div className="xl:col-span-7 min-w-0 self-start">
            {(() => {
              const railDeck = decks.find((d) => d.id === selectedRailDeckId) || decks[0];
              if (!railDeck) return null;
              const sub = railDeck.subject.toLowerCase();
              const chapters = getChapters(sub);
              const examNote = getExamInfo(sub);
              const iconName = getSubjectIcon(sub);
              const examParts = parseExamMilestone(examNote);
              const isExamUrgent = isUnderOneWeek(examParts.remaining);
              const coeffLabel = examNote.includes('(') ? examNote.split('(')[1].replace(')', '').trim() : '';

              const dueChapters =
                railDeck.dueCards > 0 ? chapters.filter((c) => c.dueCount > 0) : [];
              const prioritizedDueChapters = [...dueChapters].sort(
                (a, b) =>
                  (b.examWeight?.includes('Core') ? 1 : 0) -
                    (a.examWeight?.includes('Core') ? 1 : 0) ||
                  b.dueCount - a.dueCount ||
                  a.masteryPercentage - b.masteryPercentage
              );
              const conceptPool = (prioritizedDueChapters.length > 0 ? prioritizedDueChapters : chapters)
                .flatMap((c) => c.concepts || [])
                .map((c) => c.replace(/\\mathcal\{O\}/g, 'O(n)'));
              const shownConcepts = conceptPool.slice(0, 2);
              const extraConceptsCount = Math.max(0, conceptPool.length - shownConcepts.length);

              const primaryStudyLabel =
                railDeck.dueCards > 0 ? `Study Due (${railDeck.dueCards})` : 'Practice All Cards';

              return (
                <div className="rounded-3xl border border-[#25252b] bg-[#101012] flex flex-col shadow-xl overflow-hidden relative">
                  {/* Command Header */}
                  <div
                    className="px-5 pt-4 pb-4 flex items-center justify-between gap-3 flex-wrap relative border-b border-[#1d1d29]"
                    style={{
                      background: `linear-gradient(135deg, ${railDeck.subjectColor}14 0%, transparent 55%)`,
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                        style={{
                          backgroundColor: `${railDeck.subjectColor}24`,
                          border: `1.5px solid ${railDeck.subjectColor}55`,
                        }}
                      >
                        <iconify-icon icon={iconName} width="22" style={{ color: railDeck.subjectColor }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-lg sm:text-[20px] font-extrabold text-white tracking-tight leading-tight">
                            {railDeck.subject}
                          </h3>
                          <ExamMilestoneChip title={examParts.title} remaining={examParts.remaining} urgent={isExamUrgent} />
                          {coeffLabel && (
                            <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded-md bg-white/[0.06] text-zinc-300 border border-white/10">
                              {coeffLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-[12.5px] font-medium text-zinc-300 mt-1 flex items-center gap-1.5 min-w-0">
                          <iconify-icon
                            icon={railDeck.dueCards > 0 ? 'lucide:book-marked' : 'lucide:sparkles'}
                            width="12"
                            className={railDeck.dueCards > 0 ? 'text-amber-300 shrink-0' : 'text-emerald-400 shrink-0'}
                          />
                          <span className="truncate">
                            <span className="text-zinc-400">
                              {railDeck.dueCards > 0 ? 'Up next:' : 'Mastered:'}
                            </span>{' '}
                            <span className="text-zinc-100">{shownConcepts.join(', ')}</span>
                          </span>
                          {extraConceptsCount > 0 && (
                            <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300 shrink-0">
                              +{extraConceptsCount}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onStartStudy(railDeck.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 border ${
                        railDeck.dueCards > 0
                          ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/35 shadow-sm'
                          : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/35'
                      }`}
                      title={railDeck.dueCards > 0 ? 'Start due review now' : 'Review full deck'}
                    >
                      {railDeck.dueCards > 0 ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>Study {railDeck.dueCards} Due</span>
                        </>
                      ) : (
                        <>
                          <iconify-icon icon="lucide:check" width="14" />
                          <span>Caught Up</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Syllabus Chapters */}
                  <div className="px-5 sm:px-6 py-4">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Syllabus Chapters
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-200 border border-white/10">
                          {chapters.length}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400">
                        {dueChapters.length > 0
                          ? `${dueChapters.length} module${dueChapters.length > 1 ? 's' : ''} due for review`
                          : 'All modules up to date'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {chapters.map((ch) => {
                        const isUrgent = ch.dueCount > 0;
                        const isMastered = ch.masteryPercentage >= 90;
                        const isCore = Boolean(ch.examWeight && ch.examWeight.includes('Core'));
                        const cleanConcepts = (ch.concepts || []).map((c) =>
                          c.replace(/\\mathcal\{O\}/g, 'O(n)')
                        );
                        const visibleConcepts = cleanConcepts.slice(0, 3);
                        const extraConceptsCount = Math.max(0, cleanConcepts.length - visibleConcepts.length);
                        const chapterCards = cards.filter(
                          (c) =>
                            (c.deckId === railDeck.id || c.subject.toLowerCase() === sub) &&
                            c.chapterNumber === ch.chapterNumber
                        );
                        const nextReview = getChapterNextReview(chapterCards, ch.dueCount);

                        return (
                          <div
                            key={ch.id}
                            className="group rounded-2xl border bg-[#141418] p-3.5 sm:p-4 transition-all duration-200 border-[#25252b] hover:border-zinc-500/60 hover:bg-[#19191f]"
                          >
                            {/* Top Row: Chapter Index + Title + Key Concepts + Actions */}
                            <div className="flex items-start sm:items-center justify-between gap-3.5">
                              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-[14px] sm:text-[15px] font-black shrink-0 border transition-all duration-200 bg-[#1a1a24] group-hover:bg-[#222230] text-zinc-200 group-hover:text-white border-[#2b2b38] group-hover:border-zinc-500/60">
                                  {String(ch.chapterNumber).padStart(2, '0')}
                                </span>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-[14.5px] sm:text-[15px] font-bold text-white tracking-tight leading-snug">
                                      {ch.title}
                                    </h4>
                                    {isCore && (
                                      <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/25 shrink-0">
                                        Core Topic
                                      </span>
                                    )}
                                  </div>

                                  {visibleConcepts.length > 0 && (
                                    <p className="text-[12px] text-zinc-300 mt-1 leading-relaxed truncate">
                                      {visibleConcepts.join(' · ')}
                                      {extraConceptsCount > 0 && (
                                        <span className="text-zinc-400"> · +{extraConceptsCount}</span>
                                      )}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="inline-flex items-center rounded-full bg-[#0b0b10] border border-[#282835] p-1.5 gap-1 shrink-0 shadow-sm">
                                <button
                                  type="button"
                                  onClick={() => handleOpenBrowseDeck(railDeck.id, ch.chapterNumber)}
                                  aria-label={`Browse Chapter ${ch.chapterNumber} cards`}
                                  title={`Browse Ch. 0${ch.chapterNumber} cards`}
                                  className="h-9 px-3 sm:px-3.5 rounded-full text-[13px] font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.08] inline-flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                >
                                  <iconify-icon icon="lucide:book-open" width="15" />
                                  <span className="hidden sm:inline">Cards</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onStartStudy(railDeck.id, {
                                      chapterNumber: ch.chapterNumber,
                                      customTitle: `${railDeck.subject} — Ch. 0${ch.chapterNumber}`,
                                    })
                                  }
                                  aria-label={`Study Chapter ${ch.chapterNumber}`}
                                  title={`Study Ch. 0${ch.chapterNumber}`}
                                  className="group/btn h-9 px-4 sm:px-5 rounded-full text-[13px] font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 bg-white hover:bg-zinc-200 text-black shadow-sm"
                                >
                                  <span>Study</span>
                                  <iconify-icon
                                    icon="lucide:arrow-right"
                                    width="14"
                                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                                  />
                                </button>
                              </div>
                            </div>

                            {/* Bottom Row: Status, Card Count & Next Review Schedule */}
                            <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                              <div className="flex items-center gap-2 text-[12px] font-medium flex-wrap">
                                {!isUrgent && (
                                  <>
                                    {isMastered ? (
                                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                        <iconify-icon icon="lucide:check-circle-2" width="13" />
                                        <span>Mastered</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-zinc-300 font-semibold">
                                        <iconify-icon icon="lucide:check-circle-2" width="13" />
                                        <span>Caught up</span>
                                      </span>
                                    )}
                                    <span className="text-zinc-400">•</span>
                                  </>
                                )}
                                <span className="text-zinc-300">{ch.cardCount} cards</span>
                              </div>

                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11.5px] font-semibold shrink-0 ${nextReview.badgeClass}`}
                              >
                                <iconify-icon icon="lucide:calendar-clock" width="12" />
                                <span>{nextReview.label}</span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 sm:px-6 pb-5 pt-3.5 border-t border-[#1f1f2a] flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenBrowseDeck(railDeck.id)}
                      className="flex-1 h-11 px-4 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <iconify-icon icon="lucide:book-open" width="16" />
                      <span>Browse Cards ({railDeck.totalCards})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartStudy(railDeck.id)}
                      className="flex-1 h-11 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      <iconify-icon icon="lucide:play" width="16" />
                      <span>{primaryStudyLabel}</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* 3. Card Browser Modal (Opened when clicking 'Browse Cards') */}
      {browsingDeck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[88vh] bg-[#0e0e14] border border-[#272734] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#20202a] flex items-center justify-between gap-4 shrink-0 bg-[#0c0c11]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: `${browsingDeck.subjectColor}25`, border: `1px solid ${browsingDeck.subjectColor}50` }}
                >
                  <iconify-icon icon={SUBJECT_ICONS[browsingSubject] || 'lucide:layers'} width="20" style={{ color: browsingDeck.subjectColor }} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {browsingDeck.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {browsingCards.length} flashcards shown • {browsingDeck.dueCards} due today
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleCloseBrowseModal();
                    onStartStudy(browsingDeck.id);
                  }}
                  className="h-10 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <iconify-icon icon="lucide:play" width="14" />
                  <span>Study Deck ({browsingDeck.dueCards})</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseBrowseModal}
                  aria-label="Close browse cards modal"
                  className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-zinc-800"
                >
                  <iconify-icon icon="lucide:x" width="18" />
                </button>
              </div>
            </div>

            {/* Modal Search & Chapter Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-[#20202a] bg-[#111116] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
              <div className="relative flex-1">
                <iconify-icon
                  icon="lucide:search"
                  width="16"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSubtle pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search front, back, or formulas..."
                  value={browseSearchQuery}
                  onChange={(e) => setBrowseSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-all placeholder:text-textSubtle"
                />
              </div>

              {/* Chapter Modules Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setBrowseChapterFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    browseChapterFilter === 'all'
                      ? 'bg-zinc-200 text-black shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  All Chapters ({browsingChapters.length})
                </button>
                {browsingChapters.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setBrowseChapterFilter(ch.chapterNumber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      browseChapterFilter === ch.chapterNumber
                        ? 'bg-zinc-200 text-black shadow-sm'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    Ch. 0{ch.chapterNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Card Grid */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {browsingCards.length === 0 ? (
                <div className="text-center py-12">
                  <iconify-icon icon="lucide:inbox" width="36" className="text-zinc-400 mb-2" />
                  <p className="text-zinc-400 text-sm">No flashcards found matching your filter.</p>
                </div>
              ) : (
                browsingCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-5 rounded-2xl bg-[#14141a] border border-[#232330] hover:border-zinc-700 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-mono font-bold text-zinc-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                          Card #{card.id.split('-').pop()} • Chapter 0{card.chapterNumber}
                        </span>
                        {card.due ? (
                          <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>Due Today</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                            Learned
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                        {card.front}
                      </h4>

                      {card.formula && (
                        <div className="my-2 p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center overflow-x-auto">
                          <LatexMath math={card.formula} className="text-base sm:text-[17.5px] text-white font-medium" />
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-[#0c0c11] p-3 rounded-xl border border-white/5">
                        {card.back}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[11px] font-mono text-zinc-400">
                        Reviewed: {card.reviewCount}x • Streak: {card.streak}d
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePracticeSingleCard(card)}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white text-zinc-200 hover:text-black text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <iconify-icon icon="lucide:play" width="12" />
                        <span>Practice This Card</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#20202a] bg-[#0c0c11] flex items-center justify-between text-xs text-zinc-400 shrink-0">
              <span>
                Showing {browsingCards.length} of {browsingDeck.totalCards} cards in this subject
              </span>
              <button
                type="button"
                onClick={handleCloseBrowseModal}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
