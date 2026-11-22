import React, { useState, useMemo } from 'react';
import type { FlashcardDeck, FlashcardItem } from '../../types';
import { FlashcardStudySession } from './FlashcardStudySession';
import { NewFlashcardModal } from '../modals/NewFlashcardModal';
import { CurriculumHubView, type StudyFilterOptions } from './variants/CurriculumHubView';

interface FlashcardsViewProps {
  onShowToast?: (msg: string) => void;
  onOpenNewTaskModal?: () => void;
}

const INITIAL_DECKS: FlashcardDeck[] = [
  {
    id: 'deck-analyse',
    title: 'Analyse — Théorèmes & Convergence',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    icon: 'lucide:function-square',
    totalCards: 24,
    dueCards: 5,
    masteredPercentage: 75,
    description: 'Règles de convergence de Riemann, d’Alembert, Cauchy et séries de Fourier.',
  },
  {
    id: 'deck-algebre',
    title: 'Algèbre Linéaire — Matrices & Réduction',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    icon: 'lucide:grid',
    totalCards: 18,
    dueCards: 4,
    masteredPercentage: 88,
    description: 'Diagonalisation, polynômes caractéristiques, espaces propres et sous-espaces.',
  },
  {
    id: 'deck-physique',
    title: 'Physique — Thermodynamique & Ondes',
    subject: 'Physique',
    subjectColor: '#10b981',
    icon: 'lucide:flame',
    totalCards: 20,
    dueCards: 3,
    masteredPercentage: 65,
    description: 'Premier et second principes, relations de Mayer, transferts thermiques et ondes.',
  },
  {
    id: 'deck-info',
    title: 'Informatique — Algorithmes & Graphes',
    subject: 'Informatique',
    subjectColor: '#f59e0b',
    icon: 'lucide:binary',
    totalCards: 15,
    dueCards: 0,
    masteredPercentage: 100,
    description: 'Complexité asymptotique, arbres AVL, parcours BFS/DFS et algorithme de Dijkstra.',
  },
];

const INITIAL_CARDS: FlashcardItem[] = [
  // Analyse
  {
    id: 'card-an-1',
    deckId: 'deck-analyse',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    chapterNumber: 2,
    front: "Règle de d'Alembert pour les séries numériques",
    back: "Soit ∑ u_n avec u_n > 0. On pose L = lim(u_{n+1} / u_n). Si L < 1, la série converge. Si L > 1, elle diverge. Si L = 1, on ne peut pas conclure (cas douteux).",
    formula: '\\lim_{n \\to \\infty} \\frac{u_{n+1}}{u_n} = L',
    mastery: 'review',
    nextReviewDate: 'Today',
    reviewCount: 4,
    streak: 3,
    tags: ['Convergence', 'Séries'],
    due: true,
  },
  {
    id: 'card-an-2',
    deckId: 'deck-analyse',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    chapterNumber: 2,
    front: 'Critère de Riemann pour les séries à termes positifs',
    back: "La série de Riemann ∑ (1 / n^α) converge si et seulement si α > 1. Elle diverge pour tout α ≤ 1 (la série harmonique diverge pour α = 1).",
    formula: '\\sum_{n=1}^\\infty \\frac{1}{n^\\alpha} < \\infty \\iff \\alpha > 1',
    mastery: 'mastered',
    nextReviewDate: 'In 3 days',
    reviewCount: 6,
    streak: 5,
    tags: ['Riemann', 'Séries'],
    due: true,
  },
  {
    id: 'card-an-3',
    deckId: 'deck-analyse',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    chapterNumber: 1,
    front: 'Définition d’un espace de Banach',
    back: 'Un espace de Banach est un espace vectoriel normé (E, ||·||) qui est complet pour la distance induite par la norme d(x,y) = ||x - y||.',
    formula: '(E, \\|\\cdot\\|) \\text{ complet}',
    mastery: 'mastered',
    nextReviewDate: 'Today',
    reviewCount: 2,
    streak: 1,
    tags: ['Espaces', 'Normes'],
    due: false,
  },
  {
    id: 'card-an-6',
    deckId: 'deck-analyse',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    chapterNumber: 1,
    front: 'Équivalence des normes en dimension finie',
    back: "Sur un espace vectoriel de dimension finie, toutes les normes sont équivalentes : il existe c1, c2 > 0 tels que c1 ||x||_a ≤ ||x||_b ≤ c2 ||x||_a.",
    formula: 'c_1 \\|x\\|_a \\le \\|x\\|_b \\le c_2 \\|x\\|_a',
    mastery: 'mastered',
    nextReviewDate: 'In 5 days',
    reviewCount: 4,
    streak: 4,
    tags: ['Topologie', 'Normes'],
    due: false,
  },
  {
    id: 'card-an-4',
    deckId: 'deck-analyse',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    chapterNumber: 3,
    front: 'Théorème de la convergence dominée (Lebesgue)',
    back: "Si (f_n) converge simplement vers f presque partout, et s'il existe g intégrable telle que |f_n(x)| ≤ g(x) p.p., alors f est intégrable et lim ∫ f_n = ∫ f.",
    formula: '\\lim_{n \\to \\infty} \\int f_n \\, d\\mu = \\int \\lim f_n \\, d\\mu',
    mastery: 'learning',
    nextReviewDate: 'Today',
    reviewCount: 1,
    streak: 0,
    tags: ['Intégration', 'Lebesgue'],
    due: true,
  },
  {
    id: 'card-an-7',
    deckId: 'deck-analyse',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    chapterNumber: 3,
    front: 'Lemme de Fatou pour suites de fonctions positives',
    back: "Pour toute suite de fonctions mesurables positives (f_n) : ∫ liminf f_n dμ ≤ liminf ∫ f_n dμ. L'inégalité est en général stricte.",
    formula: '\\int \\liminf f_n \\, d\\mu \\le \\liminf \\int f_n \\, d\\mu',
    mastery: 'review',
    nextReviewDate: 'Today',
    reviewCount: 3,
    streak: 2,
    tags: ['Fatou', 'Intégration'],
    due: true,
  },
  {
    id: 'card-an-5',
    deckId: 'deck-analyse',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    chapterNumber: 2,
    front: "Règle de Duhamel (Raabe-Duhamel)",
    back: "Si u_{n+1}/u_n = 1 - α/n + O(1/n^{1+β}) avec β > 0 : la série ∑ u_n converge si α > 1 et diverge si α ≤ 1.",
    formula: '\\frac{u_{n+1}}{u_n} = 1 - \\frac{\\alpha}{n} + \\mathcal{O}\\left(\\frac{1}{n^{1+\\beta}}\\right)',
    mastery: 'new',
    nextReviewDate: 'Today',
    reviewCount: 0,
    streak: 0,
    tags: ['Séries', 'DS'],
    due: true,
  },

  // Algèbre
  {
    id: 'card-alg-1',
    deckId: 'deck-algebre',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    chapterNumber: 2,
    front: 'Condition nécessaire et suffisante de diagonalisabilité',
    back: "Une matrice A ∈ M_n(K) est diagonalisable sur K ssi son polynôme caractéristique P_A(X) est scindé sur K et pour toute valeur propre λ, dim(E_λ) = mult_alg(λ).",
    formula: '\\dim(E_\\lambda) = \\dim(\\ker(A - \\lambda I_n)) = m_\\lambda',
    mastery: 'mastered',
    nextReviewDate: 'Today',
    reviewCount: 5,
    streak: 4,
    tags: ['Réduction', 'Matrices'],
    due: true,
  },
  {
    id: 'card-alg-2',
    deckId: 'deck-algebre',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    chapterNumber: 2,
    front: 'Théorème de Cayley-Hamilton',
    back: 'Tout endomorphisme ou matrice carrée annule son propre polynôme caractéristique : P_A(A) = 0_n.',
    formula: 'P_A(A) = 0_n',
    mastery: 'review',
    nextReviewDate: 'Today',
    reviewCount: 3,
    streak: 2,
    tags: ['Polynômes', 'Endomorphismes'],
    due: true,
  },
  {
    id: 'card-alg-3',
    deckId: 'deck-algebre',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    chapterNumber: 1,
    front: 'Théorème du Rang (Théorème Fondamental)',
    back: "Soit f : E → F une application linéaire avec dim(E) finie. Alors dim(E) = dim(Ker f) + rg(f).",
    formula: '\\dim(E) = \\dim(\\ker f) + \\text{rg}(f)',
    mastery: 'mastered',
    nextReviewDate: 'In 4 days',
    reviewCount: 7,
    streak: 6,
    tags: ['Dimension', 'Applications'],
    due: false,
  },
  {
    id: 'card-alg-5',
    deckId: 'deck-algebre',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    chapterNumber: 1,
    front: 'Formule de Grassmann pour deux sous-espaces',
    back: "Pour tous sous-espaces vectoriels F et G de dimension finie : dim(F + G) = dim(F) + dim(G) - dim(F ∩ G).",
    formula: '\\dim(F + G) = \\dim F + \\dim G - \\dim(F \\cap G)',
    mastery: 'mastered',
    nextReviewDate: 'In 7 days',
    reviewCount: 6,
    streak: 5,
    tags: ['Sous-espaces', 'Dimension'],
    due: false,
  },
  {
    id: 'card-alg-4',
    deckId: 'deck-algebre',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    chapterNumber: 3,
    front: 'Inégalité de Cauchy-Schwarz dans un espace préhilbertien',
    back: "Pour tous vecteurs x, y dans un espace préhilbertien réel ou complexe : |⟨x, y⟩| ≤ ||x|| · ||y||. Égalité ssi x et y sont colinéaires.",
    formula: '|\\langle x, y \\rangle| \\le \\|x\\| \\cdot \\|y\\|',
    mastery: 'learning',
    nextReviewDate: 'Today',
    reviewCount: 2,
    streak: 1,
    tags: ['Produit Scalaire', 'Géométrie'],
    due: true,
  },
  {
    id: 'card-alg-6',
    deckId: 'deck-algebre',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    chapterNumber: 3,
    front: 'Déterminant de Vandermonde',
    back: "Le déterminant de la matrice de Vandermonde associée à x1, ..., xn vaut le produit de toutes les différences (xj - xi) pour 1 ≤ i < j ≤ n.",
    formula: 'V(x_1, \\dots, x_n) = \\prod_{1 \\le i < j \\le n} (x_j - x_i)',
    mastery: 'review',
    nextReviewDate: 'In 3 days',
    reviewCount: 3,
    streak: 3,
    tags: ['Déterminants', 'Polynômes'],
    due: false,
  },

  // Physique
  {
    id: 'card-phy-1',
    deckId: 'deck-physique',
    subject: 'Physique',
    subjectColor: '#10b981',
    chapterNumber: 1,
    front: 'Premier Principe de la Thermodynamique',
    back: "Pour un système fermé évoluant d'un état 1 à un état 2 : ΔU + ΔE_c = W + Q. Pour un système au repos macroscopique : dU = δW + δQ.",
    formula: '\\Delta U = W + Q',
    mastery: 'mastered',
    nextReviewDate: 'Today',
    reviewCount: 4,
    streak: 3,
    tags: ['Thermo', 'Énergie'],
    due: true,
  },
  {
    id: 'card-phy-2',
    deckId: 'deck-physique',
    subject: 'Physique',
    subjectColor: '#10b981',
    chapterNumber: 1,
    front: 'Relations de Mayer pour un gaz parfait',
    back: "Pour une mole de gaz parfait : C_{p,m} - C_{v,m} = R. Avec γ = C_p/C_v, on déduit C_v = R/(γ - 1) et C_p = γR/(γ - 1).",
    formula: 'C_p - C_v = nR \\quad (\\gamma = C_p / C_v)',
    mastery: 'review',
    nextReviewDate: 'Today',
    reviewCount: 3,
    streak: 2,
    tags: ['Gaz Parfaits', 'Chaleur'],
    due: true,
  },
  {
    id: 'card-phy-3',
    deckId: 'deck-physique',
    subject: 'Physique',
    subjectColor: '#10b981',
    chapterNumber: 1,
    front: 'Second Principe & Entropie créée',
    back: "Pour toute transformation : ΔS = S_e + S_c avec S_c ≥ 0 (irréversibilité). S_c = 0 pour une transformation réversible.",
    formula: '\\Delta S = \\int \\frac{\\delta Q}{T_{ext}} + S_c \\quad (S_c \\ge 0)',
    mastery: 'learning',
    nextReviewDate: 'Today',
    reviewCount: 2,
    streak: 1,
    tags: ['Entropie', 'Principes'],
    due: false,
  },
  {
    id: 'card-phy-4',
    deckId: 'deck-physique',
    subject: 'Physique',
    subjectColor: '#10b981',
    chapterNumber: 2,
    front: 'Équation de Maxwell-Faraday (Induction)',
    back: "La circulation du champ électrique induit dérive de la variation temporelle du champ magnétique : rot(E) = -∂B/∂t.",
    formula: '\\vec{\\nabla} \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}',
    mastery: 'learning',
    nextReviewDate: 'Today',
    reviewCount: 2,
    streak: 1,
    tags: ['Électromagnétisme', 'Maxwell'],
    due: true,
  },
  {
    id: 'card-phy-5',
    deckId: 'deck-physique',
    subject: 'Physique',
    subjectColor: '#10b981',
    chapterNumber: 2,
    front: "Vecteur de Poynting & Flux d'énergie électromagnétique",
    back: "Le flux de puissance surfacique transporté par une onde électromagnétique dans le vide est donné par Π = (E ∧ B) / μ0.",
    formula: '\\vec{\\Pi} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B})',
    mastery: 'mastered',
    nextReviewDate: 'In 6 days',
    reviewCount: 5,
    streak: 4,
    tags: ['Poynting', 'Ondes'],
    due: false,
  },

  // Informatique
  {
    id: 'card-inf-1',
    deckId: 'deck-info',
    subject: 'Informatique',
    subjectColor: '#f59e0b',
    chapterNumber: 1,
    front: 'Complexité temporelle de Dijkstra avec tas binaire',
    back: "Pour un graphe G = (V, E) à poids positifs, l'implémentation de Dijkstra avec file de priorité (min-heap) s'exécute en temps O((|V| + |E|) log |V|).",
    formula: '\\mathcal{O}((|V| + |E|) \\log |V|)',
    mastery: 'mastered',
    nextReviewDate: 'In 4 days',
    reviewCount: 5,
    streak: 5,
    tags: ['Graphes', 'Complexité'],
    due: false,
  },
  {
    id: 'card-inf-2',
    deckId: 'deck-info',
    subject: 'Informatique',
    subjectColor: '#f59e0b',
    chapterNumber: 1,
    front: 'Parcours en Largeur (BFS) et plus court chemin non pondéré',
    back: "Le parcours BFS utilise une file (FIFO) et permet de trouver le plus court chemin en nombre d'arêtes en complexité linéaire O(|V| + |E|).",
    formula: '\\mathcal{O}(|V| + |E|) \\text{ (FIFO)}',
    mastery: 'mastered',
    nextReviewDate: 'In 5 days',
    reviewCount: 4,
    streak: 4,
    tags: ['BFS', 'Graphes'],
    due: false,
  },
  {
    id: 'card-inf-3',
    deckId: 'deck-info',
    subject: 'Informatique',
    subjectColor: '#f59e0b',
    chapterNumber: 2,
    front: 'Équation de Bellman pour le problème du Sac à Dos (0/1 Knapsack)',
    back: "dp[i][w] = max(dp[i-1][w], v_i + dp[i-1][w - w_i]) si w_i ≤ w, sinon dp[i-1][w]. Complexité pseudo-polynomiale O(n · W).",
    formula: '\\text{dp}[i][w] = \\max(\\text{dp}[i-1][w], v_i + \\text{dp}[i-1][w - w_i])',
    mastery: 'mastered',
    nextReviewDate: 'In 3 days',
    reviewCount: 6,
    streak: 5,
    tags: ['Dynamique', 'Knapsack'],
    due: false,
  },
  {
    id: 'card-inf-4',
    deckId: 'deck-info',
    subject: 'Informatique',
    subjectColor: '#f59e0b',
    chapterNumber: 2,
    front: 'Théorème Maître pour la récurrence du Tri Fusion (Merge Sort)',
    back: "Pour la récurrence T(n) = 2T(n/2) + O(n), avec a=2, b=2, et f(n)=n. On a log_b(a) = 1, donc par le cas 2 du Master Theorem : T(n) = Θ(n log n).",
    formula: 'T(n) = 2T(n/2) + \\mathcal{O}(n) \\implies \\Theta(n \\log n)',
    mastery: 'mastered',
    nextReviewDate: 'In 8 days',
    reviewCount: 7,
    streak: 6,
    tags: ['Diviser pour Régner', 'Complexité'],
    due: false,
  },
];

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onShowToast }) => {
  const parseUrlState = () => {
    if (typeof window === 'undefined')
      return { view: 'decks', studyDeck: null, empty: false, allDone: false, modal: false };
    const p = new URLSearchParams(window.location.search);
    const study = p.get('study');
    const s = (p.get('state') || p.get('flashcards') || '').toLowerCase();
    const modal = p.get('modal') === 'new-card' || p.get('modal') === 'new-flashcard';

    return {
      view: study ? 'study' : 'decks',
      studyDeck: study,
      empty: s === 'empty' || s === '0',
      allDone: s === 'all-done' || s === 'done',
      modal,
    };
  };

  const initialUrl = parseUrlState();
  const [studyingDeckId, setStudyingDeckId] = useState<string | null>(initialUrl.studyDeck);
  const [studyOptions, setStudyOptions] = useState<StudyFilterOptions | null>(null);
  const [isStudyActive, setIsStudyActive] = useState<boolean>(initialUrl.view === 'study');
  const [isNewModalOpen, setIsNewModalOpen] = useState(initialUrl.modal);
  const [isAllDoneState] = useState(initialUrl.allDone);

  const [decks, setDecks] = useState<FlashcardDeck[]>(() => {
    if (initialUrl.empty) return [];
    if (initialUrl.allDone) {
      return INITIAL_DECKS.map((d) => ({ ...d, dueCards: 0, masteredPercentage: 100 }));
    }
    return INITIAL_DECKS;
  });

  const [cards, setCards] = useState<FlashcardItem[]>(() => {
    if (initialUrl.empty) return [];
    return INITIAL_CARDS;
  });

  // Calculate totals
  const totalDueCount = isAllDoneState ? 0 : cards.filter((c) => c.due).length;

  const handleStartStudy = (deckId?: string, options?: StudyFilterOptions) => {
    setStudyingDeckId(deckId || null);
    setStudyOptions(options || null);
    setIsStudyActive(true);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (deckId) {
        const d = decks.find((x) => x.id === deckId);
        url.searchParams.set('study', d ? d.subject.toLowerCase() : deckId);
      } else {
        url.searchParams.set('study', 'all');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleExitStudy = () => {
    setIsStudyActive(false);
    setStudyingDeckId(null);
    setStudyOptions(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('study');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleAddCard = (newCardData: Omit<FlashcardItem, 'id' | 'reviewCount' | 'streak'>) => {
    const newCard: FlashcardItem = {
      ...newCardData,
      id: `card-custom-${Date.now()}`,
      reviewCount: 0,
      streak: 0,
    };
    setCards((prev) => [newCard, ...prev]);
    setDecks((prev) =>
      prev.map((d) =>
        d.id === newCard.deckId
          ? { ...d, totalCards: d.totalCards + 1, dueCards: d.dueCards + 1 }
          : d
      )
    );
    onShowToast?.(`Flashcard added to ${newCard.subject}!`);
  };

  // Cards filtered for active study session
  const cardsForStudy = useMemo(() => {
    let pool = cards;
    if (studyingDeckId) {
      const deck = decks.find(
        (d) => d.id === studyingDeckId || d.subject.toLowerCase() === studyingDeckId.toLowerCase()
      );
      if (deck) {
        pool = pool.filter((c) => c.deckId === deck.id);
      }
    }

    if (studyOptions?.specificCardId) {
      const single = pool.filter((c) => c.id === studyOptions.specificCardId);
      if (single.length > 0) return single;
    }

    if (studyOptions?.chapterNumber) {
      const byChap = pool.filter((c) => c.chapterNumber === studyOptions.chapterNumber);
      if (byChap.length > 0) return byChap;
    }

    if (studyOptions?.formulasOnly) {
      const withFormulas = pool.filter((c) => Boolean(c.formula));
      if (withFormulas.length > 0) return withFormulas;
    }

    if (studyOptions?.dueOnly) {
      const due = pool.filter((c) => c.due);
      if (due.length > 0) return due;
    }

    if (!studyOptions && !studyingDeckId) {
      const due = pool.filter((c) => c.due);
      if (due.length > 0) return due;
    }

    return pool.length > 0 ? pool : cards;
  }, [cards, decks, studyingDeckId, studyOptions]);

  const activeDeck = studyingDeckId
    ? decks.find((d) => d.id === studyingDeckId || d.subject.toLowerCase() === studyingDeckId.toLowerCase())
    : null;

  const activeStudySessionTitle = studyOptions?.customTitle || activeDeck?.title || 'Daily Review Session';

  // Active study mode render
  if (isStudyActive && cardsForStudy.length > 0) {
    return (
      <FlashcardStudySession
        cards={cardsForStudy}
        deckName={activeStudySessionTitle}
        deckColor={activeDeck?.subjectColor || '#38bdf8'}
        onExit={handleExitStudy}
        onShowToast={onShowToast}
        initialAllDone={isAllDoneState}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto text-zinc-200 antialiased">
      {/* 1. Master Header */}
      <header className="workspace-header flex-wrap px-4 sm:px-8 pt-5 sm:pt-7 pb-4 sm:pb-5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderPanel bg-panel/85 backdrop-blur-md sticky top-0 z-20">
        <div className="min-w-0 sm:flex-1 sm:basis-64">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1.5 sm:mb-2">
            Flashcards & Active Recall
          </h1>
          <p className="text-sm font-medium text-textMuted">
            Course syllabus chapters, exam alignment blueprints, and spaced repetition active recall.
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-wrap max-w-full">
          <button
            type="button"
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 sm:px-5 py-2.5 rounded-full bg-cardHover hover:bg-[#27272a] text-zinc-200 hover:text-white border border-borderPanel text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <iconify-icon icon="lucide:plus" width="16" />
            <span>New Card</span>
          </button>

          <button
            type="button"
            onClick={() => handleStartStudy()}
            disabled={totalDueCount === 0}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <iconify-icon icon="lucide:play" width="16" />
            <span>Study Due ({totalDueCount})</span>
          </button>
        </div>
      </header>

      {/* 2. Active Body - Curriculum Hub */}
      <div className="flex-1 pt-4">
        <CurriculumHubView
          decks={decks}
          cards={cards}
          onStartStudy={handleStartStudy}
          onOpenNewModal={() => setIsNewModalOpen(true)}
          onShowToast={onShowToast}
        />
      </div>

      {/* 3. New Flashcard Creation Modal */}
      <NewFlashcardModal
        isOpen={isNewModalOpen}
        onClose={() => {
          setIsNewModalOpen(false);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('modal');
            window.history.replaceState({}, '', url.toString());
          }
        }}
        onSubmit={handleAddCard}
      />
    </div>
  );
};
