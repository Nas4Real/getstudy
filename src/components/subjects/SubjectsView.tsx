import React, { useState, useMemo } from 'react';
import { NewSubjectModal } from '../modals/NewSubjectModal';
import { NewChapterModal } from '../modals/NewChapterModal';
import { ChapterDetailsModal } from '../modals/ChapterDetailsModal';
import type { SubjectData, ChapterData, ChapterLevel } from '../../types';

export type SubjectsMockState =
  | 'normal'
  | 'empty'
  | 'all-mastered'
  | 'new-semester'
  | 'search-empty';

interface SubjectsViewProps {
  onShowToast?: (msg: string) => void;
  onOpenNewSession?: (prefill?: { title: string; subject: string; subjectColor: string }) => void;
  mockState?: SubjectsMockState;
}

const INITIAL_SUBJECTS: SubjectData[] = [
  {
    id: 'sub-analyse',
    name: 'Analyse',
    code: 'MATH-101',
    color: '#06b6d4',
    icon: 'lucide:function-square',
    professor: 'Prof. Laurent Schwartz',
    coefficient: 4,
    chapters: [
      {
        id: 'ch-an-1',
        number: 1,
        title: 'Suites & Séries Numériques',
        description: 'Critères de convergence, séries de Riemann, règle de d’Alembert et Cauchy.',
        level: 'mastered',
        difficulty: 'Medium',
      },
      {
        id: 'ch-an-2',
        number: 2,
        title: 'Intégrales Généralisées & Définies',
        description: 'Intégration par parties, changements de variable, convergence absolue.',
        level: 'intermediate',
        difficulty: 'Hard',
      },
      {
        id: 'ch-an-3',
        number: 3,
        title: 'Séries Entières & Fonctions Usuelles',
        description: 'Rayon de convergence, développement en série entière, formule de Taylor.',
        level: 'intermediate',
        difficulty: 'Hard',
      },
      {
        id: 'ch-an-4',
        number: 4,
        title: 'Équations Différentielles Linéaires',
        description: 'Équations d’ordre 1 et 2, méthode de variation de la constante.',
        level: 'beginner',
        difficulty: 'Medium',
      },
      {
        id: 'ch-an-5',
        number: 5,
        title: 'Calcul Différentiel à Plusieurs Variables',
        description: 'Dérivées partielles, matrice jacobienne, gradient et extrema locaux.',
        level: 'not_started',
        difficulty: 'Hard',
      },
      {
        id: 'ch-an-6',
        number: 6,
        title: 'Intégrales Multiples & Formules de Green',
        description: 'Intégrales doubles, triples, théorème de Green-Riemann et Stokes.',
        level: 'not_started',
        difficulty: 'Hard',
      },
    ],
  },
  {
    id: 'sub-algebre',
    name: 'Algèbre',
    code: 'MATH-102',
    color: '#ec4899',
    icon: 'lucide:boxes',
    professor: 'Prof. Jean Dieudonné',
    coefficient: 4,
    chapters: [
      {
        id: 'ch-alg-1',
        number: 1,
        title: 'Espaces Vectoriels & Applications Linéaires',
        description: 'Familles libres, génératrices, bases, théorème du rang et sous-espaces.',
        level: 'mastered',
        difficulty: 'Medium',
      },
      {
        id: 'ch-alg-2',
        number: 2,
        title: 'Matrices & Systèmes Linéaires',
        description: 'Pivot de Gauss, déterminants, inversion matricielle, comatrices.',
        level: 'mastered',
        difficulty: 'Easy',
      },
      {
        id: 'ch-alg-3',
        number: 3,
        title: 'Réduction des Endomorphismes',
        description: 'Polynôme caractéristique, valeurs propres, diagonalisation et trigonalisation.',
        level: 'intermediate',
        difficulty: 'Hard',
      },
      {
        id: 'ch-alg-4',
        number: 4,
        title: 'Espaces Préhilbertiens & Euclidiens',
        description: 'Produit scalaire, procédé d’orthogonalisation de Gram-Schmidt, projecteurs.',
        level: 'beginner',
        difficulty: 'Medium',
      },
      {
        id: 'ch-alg-5',
        number: 5,
        title: 'Endomorphismes Symétriques & Isométries',
        description: 'Théorème spectral, matrices orthogonales, réductions quadratiques.',
        level: 'not_started',
        difficulty: 'Hard',
      },
    ],
  },
  {
    id: 'sub-physique',
    name: 'Physique',
    code: 'PHY-101',
    color: '#10b981',
    icon: 'lucide:atom',
    professor: 'Prof. Werner Heisenberg',
    coefficient: 3,
    chapters: [
      {
        id: 'ch-phy-1',
        number: 1,
        title: 'Thermodynamique des Systèmes Fermés',
        description: 'Premier et second principes, énergie interne, entropie et bilans thermiques.',
        level: 'mastered',
        difficulty: 'Medium',
      },
      {
        id: 'ch-phy-2',
        number: 2,
        title: 'Capacités Thermiques & Changements d’État',
        description: 'Chaleurs latentes, diagrammes de phase (P,V) et cycles moteurs/réfrigérateurs.',
        level: 'intermediate',
        difficulty: 'Medium',
      },
      {
        id: 'ch-phy-3',
        number: 3,
        title: 'Électromagnétisme & Équations de Maxwell',
        description: 'Loi de Gauss, Faraday, Ampère-Maxwell, potentiel vecteur.',
        level: 'intermediate',
        difficulty: 'Hard',
      },
      {
        id: 'ch-phy-4',
        number: 4,
        title: 'Propagation des Ondes Électromagnétiques',
        description: 'Vecteur de Poynting, réflexion et transmission sur interface plane.',
        level: 'beginner',
        difficulty: 'Hard',
      },
      {
        id: 'ch-phy-5',
        number: 5,
        title: 'Optique Ondulatoire & Interférences',
        description: 'Fentes de Young, cohérence spatiale/temporelle et réseaux de diffraction.',
        level: 'not_started',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'sub-mecanique',
    name: 'Mécanique',
    code: 'MEC-201',
    color: '#3b82f6',
    icon: 'lucide:compass',
    professor: 'Prof. Joseph-Louis Lagrange',
    coefficient: 3,
    chapters: [
      {
        id: 'ch-mec-1',
        number: 1,
        title: 'Cinématique du Point Matériel',
        description: 'Repères cartésien, cylindrique et de Frenet, accélérations relatives.',
        level: 'mastered',
        difficulty: 'Easy',
      },
      {
        id: 'ch-mec-2',
        number: 2,
        title: 'Dynamique Newtonienne & Théorèmes Énergétiques',
        description: 'Principe fondamental, travail, énergie potentielle et cinétique, forces conservatives.',
        level: 'mastered',
        difficulty: 'Medium',
      },
      {
        id: 'ch-mec-3',
        number: 3,
        title: 'Mouvement à Force Centrale & Gravitation',
        description: 'Constante des aires, lois de Kepler, potentiel effectif et trajectoires coniques.',
        level: 'intermediate',
        difficulty: 'Hard',
      },
      {
        id: 'ch-mec-4',
        number: 4,
        title: 'Cinématique & Statique du Solide Indéformable',
        description: 'Torseur cinématique, moment d’inertie, théorème de Koenig.',
        level: 'beginner',
        difficulty: 'Hard',
      },
      {
        id: 'ch-mec-5',
        number: 5,
        title: 'Oscillateurs Harmoniques & Régimes Transitoires',
        description: 'Oscillateur amorti, résonance en amplitude et en vitesse.',
        level: 'intermediate',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'sub-informatique',
    name: 'Informatique',
    code: 'INFO-101',
    color: '#a855f7',
    icon: 'lucide:binary',
    professor: 'Prof. Ada Lovelace',
    coefficient: 2,
    chapters: [
      {
        id: 'ch-inf-1',
        number: 1,
        title: 'Structures de Données Linéaires',
        description: 'Piles, files, listes doublement chaînées et tables de hachage.',
        level: 'mastered',
        difficulty: 'Easy',
      },
      {
        id: 'ch-inf-2',
        number: 2,
        title: 'Algorithmes de Tri & Complexité Asymptotique',
        description: 'Tri fusion, tri rapide, analyse en pire cas et notation Grand O.',
        level: 'mastered',
        difficulty: 'Medium',
      },
      {
        id: 'ch-inf-3',
        number: 3,
        title: 'Arbres Binaires & Algorithmes de Parcours',
        description: 'ABR, parcours préfixe/infixe/postfixe, équilibrage AVL.',
        level: 'intermediate',
        difficulty: 'Hard',
      },
      {
        id: 'ch-inf-4',
        number: 4,
        title: 'Graphes & Programmation Dynamique',
        description: 'Algorithmes de Dijkstra, Bellman-Ford, et problèmes de sacs à dos.',
        level: 'beginner',
        difficulty: 'Hard',
      },
    ],
  },
];

const LEVEL_ORDER: ChapterLevel[] = ['not_started', 'beginner', 'intermediate', 'mastered'];

const LEVEL_META: Record<
  ChapterLevel,
  {
    label: string;
    subtext: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    dotBg: string;
    weight: number;
    icon: string;
  }
> = {
  not_started: {
    label: 'Not Started',
    subtext: 'Not studied yet',
    badgeBg: 'bg-zinc-800/80',
    badgeText: 'text-zinc-400',
    badgeBorder: 'border-zinc-700/60',
    dotBg: 'bg-zinc-500',
    weight: 0,
    icon: 'lucide:circle-dashed',
  },
  beginner: {
    label: 'Beginner',
    subtext: 'Learning concepts',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/30',
    dotBg: 'bg-amber-400',
    weight: 35,
    icon: 'lucide:book-open',
  },
  intermediate: {
    label: 'Intermediate',
    subtext: 'Solving exercises',
    badgeBg: 'bg-sky-500/10',
    badgeText: 'text-sky-400',
    badgeBorder: 'border-sky-500/30',
    dotBg: 'bg-sky-400',
    weight: 70,
    icon: 'lucide:activity',
  },
  mastered: {
    label: 'Mastered',
    subtext: 'Exam-ready',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    dotBg: 'bg-emerald-400',
    weight: 100,
    icon: 'lucide:check-circle-2',
  },
};

const parseMockStateFromUrl = (): SubjectsMockState => {
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const s = (p.get('subjects') || p.get('subject_state') || p.get('syllabus') || '').toLowerCase();
  if (s === 'empty' || s === '0' || s === 'none' || s === 'empty-syllabus') return 'empty';
  if (s === 'all-mastered' || s === 'mastered' || s === '100' || s === 'complete') return 'all-mastered';
  if (s === 'new-semester' || s === 'fresh' || s === 'not-started' || s === '0%') return 'new-semester';
  if (s === 'search-empty' || s === 'no-results') return 'search-empty';
  return 'normal';
};

const parseSubjectFilterFromUrl = (): string => {
  if (typeof window === 'undefined') return 'all';
  const p = new URLSearchParams(window.location.search);
  const sub = (p.get('subject') || '').toLowerCase();
  if (!sub || sub === 'all') return 'all';
  if (sub === 'analyse' || sub === 'sub-analyse') return 'sub-analyse';
  if (sub === 'algebre' || sub === 'alg' || sub === 'sub-algebre') return 'sub-algebre';
  if (sub === 'physique' || sub === 'phys' || sub === 'sub-physique') return 'sub-physique';
  if (sub === 'informatique' || sub === 'info' || sub === 'sub-informatique') return 'sub-informatique';
  return sub;
};

const parseLevelFilterFromUrl = (): string => {
  if (typeof window === 'undefined') return 'all';
  const p = new URLSearchParams(window.location.search);
  const lvl = (p.get('level') || '').toLowerCase();
  if (lvl === 'mastered') return 'mastered';
  if (lvl === 'intermediate') return 'intermediate';
  if (lvl === 'beginner') return 'beginner';
  if (lvl === 'not_started' || lvl === 'not-started') return 'not_started';
  if (lvl === 'in_progress' || lvl === 'in-progress' || lvl === 'studying') return 'in_progress';
  return 'all';
};

const parseDifficultyFilterFromUrl = (): string => {
  if (typeof window === 'undefined') return 'all';
  const p = new URLSearchParams(window.location.search);
  const d = (p.get('difficulty') || p.get('diff') || '').toLowerCase();
  if (d === 'hard') return 'Hard';
  if (d === 'medium') return 'Medium';
  if (d === 'easy') return 'Easy';
  return 'all';
};

const parseSearchQueryFromUrl = (mock: SubjectsMockState): string => {
  if (mock === 'search-empty') return 'Quantum Cryptography';
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams(window.location.search);
  return p.get('q') || p.get('search') || '';
};

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  onShowToast,
  onOpenNewSession,
  mockState,
}) => {
  const activeMockState = mockState || parseMockStateFromUrl();

  const [subjects, setSubjects] = useState<SubjectData[]>(() => {
    if (activeMockState === 'empty') return [];
    if (activeMockState === 'all-mastered') {
      return INITIAL_SUBJECTS.map((sub) => ({
        ...sub,
        chapters: sub.chapters.map((ch) => ({ ...ch, level: 'mastered' as ChapterLevel })),
      }));
    }
    if (activeMockState === 'new-semester') {
      return INITIAL_SUBJECTS.map((sub) => ({
        ...sub,
        chapters: sub.chapters.map((ch) => ({ ...ch, level: 'not_started' as ChapterLevel })),
      }));
    }
    return INITIAL_SUBJECTS;
  });

  // Filters
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>(parseSubjectFilterFromUrl);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>(parseLevelFilterFromUrl);
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>(parseDifficultyFilterFromUrl);
  const [searchQuery, setSearchQuery] = useState(() => parseSearchQueryFromUrl(activeMockState));
  const [collapsedSubjects, setCollapsedSubjects] = useState<Record<string, boolean>>({});
  const handleToggleMasteredFilter = () => {
    const next = selectedLevelFilter === 'mastered' ? 'all' : 'mastered';
    setSelectedLevelFilter(next);
    updateUrlParam('level', next === 'all' ? null : next);
  };

  const handleToggleInProgressFilter = () => {
    const next = selectedLevelFilter === 'in_progress' ? 'all' : 'in_progress';
    setSelectedLevelFilter(next);
    updateUrlParam('level', next === 'all' ? null : next);
  };

  const handleToggleNotStartedFilter = () => {
    const next = selectedLevelFilter === 'not_started' ? 'all' : 'not_started';
    setSelectedLevelFilter(next);
    updateUrlParam('level', next === 'all' ? null : next);
  };

  const updateUrlParam = (key: string, value: string | null) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (!value || value === 'all' || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
    window.history.replaceState(null, '', url.pathname + url.search);
  };

  // Modals state
  const [isNewSubjectModalOpen, setIsNewSubjectModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('modal') === 'new-subject';
    }
    return false;
  });
  const [isNewChapterModalOpen, setIsNewChapterModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('modal') === 'new-chapter';
    }
    return false;
  });
  const [defaultSubjectForNewChapter, setDefaultSubjectForNewChapter] = useState<string | undefined>(undefined);
  const [selectedChapterDetails, setSelectedChapterDetails] = useState<{ chapter: ChapterData; subject: SubjectData } | null>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('modal') === 'chapter-details' || p.get('modal') === 'chapter') {
        const sub = INITIAL_SUBJECTS[0];
        return { chapter: sub.chapters[0], subject: sub };
      }
    }
    return null;
  });

  // Active level dropdown popover (chapterId: string | null)
  const [activeLevelDropdownChapterId, setActiveLevelDropdownChapterId] = useState<string | null>(null);

  // Close level dropdown on global click
  React.useEffect(() => {
    const handleOutside = () => setActiveLevelDropdownChapterId(null);
    if (activeLevelDropdownChapterId) {
      document.addEventListener('click', handleOutside);
    }
    return () => document.removeEventListener('click', handleOutside);
  }, [activeLevelDropdownChapterId]);

  // Handle changing chapter level
  const handleUpdateChapterLevel = (subjectId: string, chapterId: string, newLevel: ChapterLevel) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          chapters: sub.chapters.map((ch) =>
            ch.id === chapterId ? { ...ch, level: newLevel } : ch
          ),
        };
      })
    );
    setActiveLevelDropdownChapterId(null);

    const levelName = LEVEL_META[newLevel].label;
    onShowToast?.(`Updated status to "${levelName}"`);
  };

  // Handle adding new subject
  const handleAddSubject = (subjectData: Omit<SubjectData, 'id' | 'chapters'>) => {
    const newSub: SubjectData = {
      ...subjectData,
      id: `sub-${Date.now()}`,
      chapters: [],
    };
    setSubjects((prev) => [...prev, newSub]);
    onShowToast?.(`Subject "${newSub.name}" added successfully!`);
  };

  // Handle adding new chapter
  const handleAddChapter = (targetSubjectId: string, chapterData: Omit<ChapterData, 'id'>) => {
    const newChapter: ChapterData = {
      ...chapterData,
      id: `ch-${Date.now()}`,
    };
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== targetSubjectId) return sub;
        return {
          ...sub,
          chapters: [...sub.chapters, newChapter],
        };
      })
    );
    onShowToast?.(`Chapter "${newChapter.title}" added!`);
  };

  // Toggle subject accordion
  const toggleSubjectCollapse = (subjectId: string) => {
    setCollapsedSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  const toggleAllSubjectsCollapse = () => {
    const allCollapsed = filteredSubjects.length > 0 && filteredSubjects.every((sub) => collapsedSubjects[sub.id]);
    const next: Record<string, boolean> = {};
    filteredSubjects.forEach((sub) => {
      next[sub.id] = !allCollapsed;
    });
    setCollapsedSubjects((prev) => ({ ...prev, ...next }));
  };

  // Compute stats across all chapters
  const stats = useMemo(() => {
    let totalChapters = 0;
    let masteredCount = 0;
    let intermediateCount = 0;
    let beginnerCount = 0;
    let notStartedCount = 0;
    let totalWeightedScore = 0;

    let hardUnmasteredCount = 0;
    let mediumUnmasteredCount = 0;
    let easyUnmasteredCount = 0;
    let totalEstimatedRemainingHours = 0;

    let hardTotal = 0;
    let hardMastered = 0;
    let mediumTotal = 0;
    let mediumMastered = 0;
    let easyTotal = 0;
    let easyMastered = 0;

    const unmasteredWithSubject: {
      chapter: ChapterData;
      subject: SubjectData;
    }[] = [];

    const subjectProgressList: { subject: SubjectData; progress: number }[] = [];

    subjects.forEach((sub) => {
      let subScore = 0;
      sub.chapters.forEach((ch) => {
        totalChapters++;
        totalWeightedScore += LEVEL_META[ch.level].weight;
        subScore += LEVEL_META[ch.level].weight;

        if (ch.difficulty === 'Hard') {
          hardTotal++;
          if (ch.level === 'mastered') hardMastered++;
        } else if (ch.difficulty === 'Medium') {
          mediumTotal++;
          if (ch.level === 'mastered') mediumMastered++;
        } else {
          easyTotal++;
          if (ch.level === 'mastered') easyMastered++;
        }

        if (ch.level === 'mastered') {
          masteredCount++;
        } else {
          unmasteredWithSubject.push({ chapter: ch, subject: sub });

          if (ch.difficulty === 'Hard') hardUnmasteredCount++;
          else if (ch.difficulty === 'Medium') mediumUnmasteredCount++;
          else easyUnmasteredCount++;

          if (ch.level === 'not_started') totalEstimatedRemainingHours += 3.5;
          else if (ch.level === 'beginner') totalEstimatedRemainingHours += 2.5;
          else if (ch.level === 'intermediate') totalEstimatedRemainingHours += 1.5;

          if (ch.level === 'intermediate') intermediateCount++;
          else if (ch.level === 'beginner') beginnerCount++;
          else if (ch.level === 'not_started') notStartedCount++;
        }
      });

      const subProgress = sub.chapters.length > 0 ? Math.round(subScore / sub.chapters.length) : 0;
      subjectProgressList.push({ subject: sub, progress: subProgress });
    });

    const overallPercentage =
      totalChapters > 0 ? Math.round(totalWeightedScore / totalChapters) : 0;

    subjectProgressList.sort((a, b) => b.progress - a.progress);
    const strongestSubject = subjectProgressList[0] || null;
    const weakestSubject = subjectProgressList[subjectProgressList.length - 1] || null;

    const urgentItems = unmasteredWithSubject.filter(
      (item) => item.chapter.difficulty === 'Hard'
    );
    const topUrgent = urgentItems[0] || unmasteredWithSubject[0] || null;

    return {
      totalSubjects: subjects.length,
      totalChapters,
      masteredCount,
      intermediateCount,
      beginnerCount,
      notStartedCount,
      inProgressCount: intermediateCount + beginnerCount,
      overallPercentage,
      hardUnmasteredCount,
      mediumUnmasteredCount,
      easyUnmasteredCount,
      totalEstimatedRemainingHours: Math.round(totalEstimatedRemainingHours),
      strongestSubject,
      weakestSubject,
      topUrgent,
      difficultyStats: {
        hard: {
          total: hardTotal,
          mastered: hardMastered,
          pct: hardTotal > 0 ? Math.round((hardMastered / hardTotal) * 100) : 0,
        },
        medium: {
          total: mediumTotal,
          mastered: mediumMastered,
          pct: mediumTotal > 0 ? Math.round((mediumMastered / mediumTotal) * 100) : 0,
        },
        easy: {
          total: easyTotal,
          mastered: easyMastered,
          pct: easyTotal > 0 ? Math.round((easyMastered / easyTotal) * 100) : 0,
        },
      },
    };
  }, [subjects]);

  // Compute progress for a specific subject
  const getSubjectProgress = (chapters: ChapterData[]) => {
    if (chapters.length === 0) return 0;
    const totalScore = chapters.reduce(
      (acc, ch) => acc + LEVEL_META[ch.level].weight,
      0
    );
    return Math.round(totalScore / chapters.length);
  };

  // Filter subjects and chapters
  const filteredSubjects = useMemo(() => {
    return subjects
      .filter((sub) => {
        if (selectedSubjectFilter !== 'all' && sub.id !== selectedSubjectFilter) {
          return false;
        }
        return true;
      })
      .map((sub) => {
        const query = searchQuery.toLowerCase().trim();
        const filteredChapters = sub.chapters.filter((ch) => {
          if (selectedLevelFilter !== 'all') {
            if (selectedLevelFilter === 'in_progress') {
              if (ch.level !== 'intermediate' && ch.level !== 'beginner') return false;
            } else if (ch.level !== selectedLevelFilter) {
              return false;
            }
          }
          if (selectedDifficultyFilter !== 'all' && ch.difficulty !== selectedDifficultyFilter) {
            return false;
          }
          if (query) {
            const matchTitle = ch.title.toLowerCase().includes(query);
            const matchDesc = ch.description?.toLowerCase().includes(query);
            const matchSub = sub.name.toLowerCase().includes(query);
            return matchTitle || matchDesc || matchSub;
          }
          return true;
        });

        return {
          ...sub,
          chapters: filteredChapters,
        };
      })
      .filter((sub) => {
        if (searchQuery.trim() || selectedLevelFilter !== 'all' || selectedDifficultyFilter !== 'all') {
          return sub.chapters.length > 0;
        }
        return true;
      });
  }, [subjects, selectedSubjectFilter, selectedLevelFilter, selectedDifficultyFilter, searchQuery]);

  return (
    <div id="page-subjects" className="flex flex-col h-full w-full">
      {/* Header & Action Bar */}
      <header className="px-4 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-5 shrink-0 flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-borderPanel bg-panel/85 backdrop-blur-md sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-1.5 sm:mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
              Subjects & Syllabus
            </h1>
            <span className="text-xs sm:text-[12.5px] font-extrabold px-3 py-1 rounded-full bg-[#18181d] text-zinc-300 border border-[#2e2e34]">
              {stats.totalChapters > 0 && stats.masteredCount === stats.totalChapters ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <iconify-icon icon="lucide:check-circle-2" width="13" />
                  <span>{stats.totalSubjects} Subjects • All Mastered 🎉</span>
                </span>
              ) : (
                <>
                  <strong className="text-white font-bold">{stats.totalSubjects}</strong> Subjects •{' '}
                  <strong className="text-white font-bold">{stats.totalChapters}</strong> Chapters
                </>
              )}
            </span>
          </div>
          <p className="text-sm font-medium text-textMuted">
            Track syllabus progress, curriculum coverage, and chapter mastery level.
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap w-full sm:w-auto">
          <button
            onClick={() => setIsNewSubjectModalOpen(true)}
            id="cta-new-subject"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-cardHover hover:bg-[#27272a] text-zinc-200 hover:text-white border border-borderPanel px-4 sm:px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <iconify-icon icon="lucide:folder-plus" width="16" />
            <span>New Subject</span>
          </button>

          <button
            onClick={() => {
              setDefaultSubjectForNewChapter(
                selectedSubjectFilter !== 'all' ? selectedSubjectFilter : undefined
              );
              setIsNewChapterModalOpen(true);
            }}
            id="cta-new-chapter"
            className="flex-1 sm:flex-initial bg-white hover:bg-zinc-200 text-black px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <iconify-icon icon="lucide:plus" width="16" />
            <span>Add Chapter</span>
          </button>
        </div>
      </header>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-20 md:pb-10 flex flex-col gap-6 scrollbar-hide">
        {/* KPI Overview Header & Style Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <iconify-icon icon="lucide:layout-grid" width="14" className="text-textSubtle" />
              <span>Overview Metrics</span>
            </span>

            {selectedLevelFilter !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedLevelFilter('all');
                  updateUrlParam('level', null);
                }}
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                title="Clear active status filter"
              >
                <span>Filter: {selectedLevelFilter === 'in_progress' ? 'Studying' : selectedLevelFilter === 'mastered' ? 'Ready' : 'Untouched'}</span>
                <iconify-icon icon="lucide:x" width="12" />
              </button>
            )}
          </div>

        </div>

        {/* Top Overview KPI Cards (Circular Gauges) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Syllabus Mastery (Circular Gauge) */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedLevelFilter === 'mastered'}
              aria-label="Filter chapters by Syllabus Mastery (Exam-Ready)"
              onClick={handleToggleMasteredFilter}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleMasteredFilter();
                }
              }}
              className={`bg-[#101012] border rounded-2xl p-5 sm:p-5.5 flex flex-col justify-between shadow-sm transition-all duration-200 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-[0.99] select-none ${
                selectedLevelFilter === 'mastered'
                  ? 'border-emerald-500/80 bg-[#111915] ring-2 ring-emerald-500/35'
                  : 'border-[#25252b] hover:border-emerald-500/60 hover:bg-[#111815] hover:'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-base sm:text-[16.5px] font-bold text-white tracking-wide truncate">
                      Syllabus Mastery
                    </span>
                  </div>
                  <div className="text-4xl sm:text-4xl font-bold tracking-tight text-white leading-none mt-2">
                    {stats.overallPercentage}%
                  </div>
                  <span className="text-[15px] sm:text-[15.5px] text-zinc-300 font-medium mt-1 leading-snug">
                    <strong className="text-white font-bold">{stats.masteredCount}</strong> of{' '}
                    <strong className="text-white font-bold">{stats.totalChapters}</strong> chapters exam-ready
                  </span>
                </div>

                {/* Circular SVG Radial Gauge */}
                <div className="relative w-[70px] h-[70px] shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform drop-" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="transparent" stroke="#1c1c24" strokeWidth="5.5" />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="5.5"
                      strokeDasharray="163.4"
                      strokeDashoffset={163.4 - (163.4 * Math.min(100, Math.max(0, stats.overallPercentage))) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-emerald-400">
                    <iconify-icon icon="lucide:check-circle-2" width="22" />
                  </div>
                </div>
              </div>

              {/* Bottom pill & filter CTA */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[13px]">
                <span className="font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[12.5px] sm:text-[13px]">
                  {stats.totalChapters === 0 ? '0 Ready' : `${stats.masteredCount}/${stats.totalChapters} Ready`}
                </span>
                <span className="font-bold text-emerald-400 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1 text-[13px] sm:text-[13.5px] shrink-0">
                  <span>{selectedLevelFilter === 'mastered' ? 'Active Filter (Reset)' : 'Filter by Ready →'}</span>
                </span>
              </div>
            </div>

            {/* Card 2: Currently Studying (Circular Gauge) */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedLevelFilter === 'in_progress'}
              aria-label="Filter chapters by Currently Studying"
              onClick={handleToggleInProgressFilter}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleInProgressFilter();
                }
              }}
              className={`bg-[#101012] border rounded-2xl p-5 sm:p-5.5 flex flex-col justify-between shadow-sm transition-all duration-200 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-[0.99] select-none ${
                selectedLevelFilter === 'in_progress'
                  ? 'border-sky-500/80 bg-[#111820] ring-2 ring-sky-500/35'
                  : 'border-[#25252b] hover:border-sky-500/60 hover:bg-[#11171c] hover:'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-sky-400" />
                    <span className="text-base sm:text-[16.5px] font-bold text-white tracking-wide truncate">
                      Currently Studying
                    </span>
                  </div>
                  <div className="text-4xl sm:text-4xl font-bold tracking-tight text-white leading-none mt-2">
                    {String(stats.inProgressCount).padStart(2, '0')}
                  </div>
                  <span className="text-[15px] sm:text-[15.5px] text-zinc-300 font-medium mt-1 leading-snug">
                    <strong className="text-white font-bold">{stats.intermediateCount}</strong> Intermediate •{' '}
                    <strong className="text-white font-bold">{stats.beginnerCount}</strong> Beginner
                  </span>
                </div>

                {/* Circular SVG Radial Gauge */}
                <div className="relative w-[70px] h-[70px] shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform drop-" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="transparent" stroke="#1c1c24" strokeWidth="5.5" />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="transparent"
                      stroke="#38bdf8"
                      strokeWidth="5.5"
                      strokeDasharray="163.4"
                      strokeDashoffset={
                        163.4 -
                        (163.4 * (stats.totalChapters > 0 ? Math.round((stats.inProgressCount / stats.totalChapters) * 100) : 0)) / 100
                      }
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sky-400">
                    <iconify-icon icon="lucide:book-open" width="20" />
                  </div>
                </div>
              </div>

              {/* Bottom pill & filter CTA */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[13px]">
                <span className="font-bold px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 text-[12.5px] sm:text-[13px]">
                  {stats.totalChapters > 0
                    ? `${Math.round((stats.inProgressCount / stats.totalChapters) * 100)}% of Syllabus`
                    : 'In Progress'}
                </span>
                <span className="font-bold text-sky-400 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1 text-[13px] sm:text-[13.5px] shrink-0">
                  <span>{selectedLevelFilter === 'in_progress' ? 'Active Filter (Reset)' : 'Filter Studying →'}</span>
                </span>
              </div>
            </div>

            {/* Card 3: Yet to Cover (Circular Gauge) */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedLevelFilter === 'not_started'}
              aria-label="Filter chapters by Yet to Cover (Untouched)"
              onClick={handleToggleNotStartedFilter}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleNotStartedFilter();
                }
              }}
              className={`bg-[#101012] border rounded-2xl p-5 sm:p-5.5 flex flex-col justify-between shadow-sm transition-all duration-200 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.99] select-none ${
                selectedLevelFilter === 'not_started'
                  ? 'border-amber-500/80 bg-[#1a1611] ring-2 ring-amber-500/35'
                  : 'border-[#25252b] hover:border-amber-500/60 hover:bg-[#181512] hover:'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-base sm:text-[16.5px] font-bold text-white tracking-wide truncate">
                      Yet to Cover
                    </span>
                  </div>
                  <div className="text-4xl sm:text-4xl font-bold tracking-tight text-white leading-none mt-2">
                    {String(stats.notStartedCount).padStart(2, '0')}
                  </div>
                  <span className="text-[15px] sm:text-[15.5px] text-zinc-300 font-medium mt-1 leading-snug">
                    <strong className="text-white font-bold">{stats.notStartedCount}</strong> untouched chapters remaining
                  </span>
                </div>

                {/* Circular SVG Radial Gauge */}
                <div className="relative w-[70px] h-[70px] shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform drop-" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="transparent" stroke="#1c1c24" strokeWidth="5.5" />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="transparent"
                      stroke="#f59e0b"
                      strokeWidth="5.5"
                      strokeDasharray="163.4"
                      strokeDashoffset={
                        163.4 -
                        (163.4 * (stats.totalChapters > 0 ? Math.round((stats.notStartedCount / stats.totalChapters) * 100) : 0)) / 100
                      }
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-amber-400">
                    <iconify-icon icon="lucide:clock" width="20" />
                  </div>
                </div>
              </div>

              {/* Bottom pill & filter CTA */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[13px]">
                <span className="font-bold px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[12.5px] sm:text-[13px]">
                  {stats.hardUnmasteredCount} Hard Priority
                </span>
                <span className="font-bold text-amber-400 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1 text-[13px] sm:text-[13.5px] shrink-0">
                  <span>{selectedLevelFilter === 'not_started' ? 'Active Filter (Reset)' : 'Filter Remaining →'}</span>
                </span>
              </div>
            </div>
          </div>

        {/* Search & Subject Filters Toolbar */}
        {subjects.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative flex-1 group">
                <div className="flex items-center bg-[#0d0d11] border border-[#272730] focus-within:border-zinc-400 rounded-xl px-4.5 h-[46px] sm:h-[48px] shadow-sm transition-all">
                  <iconify-icon icon="lucide:search" width="20" className="text-zinc-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      updateUrlParam('q', e.target.value);
                    }}
                    placeholder="Search chapters, theorems, formulas, or subjects..."
                    className="bg-transparent border-none outline-none text-[14.5px] sm:text-[15px] text-white w-full placeholder:text-textSubtle font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        updateUrlParam('q', null);
                      }}
                      type="button"
                      aria-label="Clear course search"
                      className="text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
                    >
                      <iconify-icon icon="lucide:x" width="16" />
                    </button>
                  )}
                </div>
              </div>

              {/* Difficulty Filter Badge if active */}
              {selectedDifficultyFilter !== 'all' && (
                <button
                  onClick={() => {
                    setSelectedDifficultyFilter('all');
                    updateUrlParam('difficulty', null);
                  }}
                  className="flex items-center gap-2 h-[46px] sm:h-[48px] px-4 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[13.5px] font-bold transition-all shadow-sm shrink-0"
                >
                  <span>Difficulty: {selectedDifficultyFilter}</span>
                  <iconify-icon icon="lucide:x" width="14" />
                </button>
              )}

              {/* Level Filter Dropdown / Pills */}
              <div className="flex items-center bg-[#111114] border border-[#242428] rounded-xl p-1.5 h-[46px] sm:h-[48px] shadow-sm shrink-0 gap-1.5 overflow-x-auto scrollbar-hide max-w-full">
                <button
                  onClick={() => {
                    setSelectedLevelFilter('all');
                    updateUrlParam('level', null);
                  }}
                  className={`h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-lg text-[13px] sm:text-[13.5px] font-bold transition-all shrink-0 ${
                    selectedLevelFilter === 'all'
                      ? 'bg-[#27272e] text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => {
                    setSelectedLevelFilter('mastered');
                    updateUrlParam('level', 'mastered');
                  }}
                  className={`flex items-center gap-2 h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-lg text-[13px] sm:text-[13.5px] font-bold transition-all shrink-0 ${
                    selectedLevelFilter === 'mastered'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Mastered</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedLevelFilter('intermediate');
                    updateUrlParam('level', 'intermediate');
                  }}
                  className={`flex items-center gap-2 h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-lg text-[13px] sm:text-[13.5px] font-bold transition-all shrink-0 ${
                    selectedLevelFilter === 'intermediate'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span>Intermediate</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedLevelFilter('beginner');
                    updateUrlParam('level', 'beginner');
                  }}
                  className={`flex items-center gap-2 h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-lg text-[13px] sm:text-[13.5px] font-bold transition-all shrink-0 ${
                    selectedLevelFilter === 'beginner'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Beginner</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedLevelFilter('not_started');
                    updateUrlParam('level', 'not_started');
                  }}
                  className={`flex items-center gap-2 h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-lg text-[13px] sm:text-[13.5px] font-bold transition-all shrink-0 ${
                    selectedLevelFilter === 'not_started'
                      ? 'bg-zinc-800 text-zinc-200 border border-zinc-600 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                  <span>Not Started</span>
                </button>
              </div>
            </div>

            {/* Subject Filter Pills Bar */}
            <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1.5 scrollbar-hide pt-1">
              <button
                onClick={() => {
                  setSelectedSubjectFilter('all');
                  updateUrlParam('subject', null);
                }}
                className={`h-[44px] sm:h-[46px] px-5 rounded-full text-[14px] sm:text-[14.5px] transition-all shrink-0 flex items-center gap-2.5 border cursor-pointer ${
                  selectedSubjectFilter === 'all'
                    ? 'bg-white text-black font-bold border-white shadow-[0_2px_10px_rgba(255,255,255,0.2)]'
                    : 'bg-[#131316] hover:bg-[#1a1a20] border-[#25252a] hover:border-[#383842] text-zinc-300 hover:text-white shadow-sm font-semibold'
                }`}
              >
                <span>All Subjects</span>
                <span
                  className={`text-[12px] font-bold px-2 py-0.5 rounded-full leading-none ${
                    selectedSubjectFilter === 'all'
                      ? 'bg-black/10 text-black'
                      : 'bg-[#1e1e24] text-zinc-400'
                  }`}
                >
                  {subjects.length}
                </span>
              </button>
              {subjects.map((sub) => {
                const isActive = selectedSubjectFilter === sub.id;
                const subProgress = getSubjectProgress(sub.chapters);
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      const next = isActive ? 'all' : sub.id;
                      setSelectedSubjectFilter(next);
                      updateUrlParam('subject', next === 'all' ? null : sub.id.replace('sub-', ''));
                    }}
                    className={`h-[44px] sm:h-[46px] px-4.5 sm:px-5 rounded-full text-[14px] sm:text-[14.5px] transition-all shrink-0 flex items-center gap-3 border cursor-pointer select-none group ${
                      isActive
                        ? 'bg-[#181820] text-white shadow-sm font-semibold'
                        : 'bg-[#131316] hover:bg-[#1a1a20] border-[#25252a] hover:border-[#383842] text-zinc-300 hover:text-white shadow-sm font-medium'
                    }`}
                    style={{
                      borderColor: isActive ? sub.color : undefined,
                      boxShadow: isActive ? `0 0 14px ${sub.color}35` : undefined,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: sub.color,
                        boxShadow: `0 0 6px ${sub.color}90`,
                      }}
                    />
                    <span className="font-semibold tracking-tight">{sub.name}</span>
                    <span className="text-[12.5px] text-zinc-400 font-medium">
                      ({sub.chapters.length})
                    </span>
                    <span
                      className="text-[12px] font-bold px-2.5 py-1 rounded-full border leading-none flex items-center justify-center shrink-0 tracking-tight"
                      style={{
                        backgroundColor: `${sub.color}15`,
                        color: sub.color,
                        borderColor: `${sub.color}35`,
                      }}
                    >
                      {subProgress}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        )}

        {/* ======================================================== */}
        {/* CURRICULUM ACCORDION VIEW / EMPTY STATES */}
        {/* ======================================================== */}
        {subjects.length === 0 ? (
          <div className="py-20 px-4 text-center flex flex-col items-center justify-center max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-b from-[#1c1c22] to-[#121216] border border-borderPanel flex items-center justify-center text-cyan-400 mb-4 shadow-xl">
              <iconify-icon icon="lucide:book-open" width="32" />
            </div>
            <h2 className="text-[20px] sm:text-xl font-bold text-white tracking-tight mb-2">
              No subjects added yet
            </h2>
            <p className="text-[14px] sm:text-[15px] text-zinc-400 leading-relaxed mb-6">
              Add your courses and curriculum chapters to track topic mastery, study hours, and exam readiness.
            </p>
            <button
              type="button"
              onClick={() => setIsNewSubjectModalOpen(true)}
              className="px-6 py-3 rounded-full bg-white text-black font-bold text-[14px] hover:bg-zinc-200 transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <iconify-icon icon="lucide:plus" width="16" />
              <span>Add Your First Subject</span>
            </button>
          </div>
        ) : filteredSubjects.length === 0 ? (
          <div className="bg-[#101012] border border-[#25252b] rounded-2xl py-16 sm:py-20 px-6 sm:px-12 text-center flex flex-col items-center justify-center my-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1c20] border border-[#2e2e34] flex items-center justify-center text-zinc-400 mb-4 shadow-xl">
              <iconify-icon icon="lucide:book-x" width="34" />
            </div>
            <h2 className="text-xl sm:text-xl font-bold text-white tracking-tight mb-2">
              No chapters found
            </h2>
            <p className="text-[14.5px] sm:text-[15px] text-zinc-400 max-w-md mb-6 leading-relaxed">
              Try adjusting your search query, selecting "All Levels", or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevelFilter('all');
                setSelectedDifficultyFilter('all');
                setSelectedSubjectFilter('all');
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('q');
                  url.searchParams.delete('search');
                  url.searchParams.delete('subjects');
                  url.searchParams.delete('subject');
                  url.searchParams.delete('level');
                  url.searchParams.delete('difficulty');
                  window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '?page=subjects'));
                }
              }}
              className="px-6 py-2.5 bg-cardHover hover:bg-[#27272a] text-zinc-100 hover:text-white border border-[#383840] hover:border-zinc-500 rounded-xl text-[14px] font-bold transition-all shadow-md cursor-pointer active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        ) : (
            <div className="flex flex-col gap-6">
              {/* Subject Box Variant Switcher Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 pt-1 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-[17px] sm:text-lg font-bold text-white tracking-tight">
                    Course Syllabus
                  </h2>
                  <span className="text-[12.5px] font-bold text-zinc-300 bg-[#16161a] border border-[#26262e] px-3 py-0.5 rounded-full">
                    {filteredSubjects.length} {filteredSubjects.length === 1 ? 'subject' : 'subjects'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleAllSubjectsCollapse}
                  className="px-3.5 py-2 rounded-xl text-[13px] font-semibold text-zinc-300 hover:text-white bg-[#101014] hover:bg-white/5 border border-[#24242e] transition-all flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  <iconify-icon
                    icon={
                      filteredSubjects.length > 0 && filteredSubjects.every((sub) => collapsedSubjects[sub.id])
                        ? 'lucide:unfold-vertical'
                        : 'lucide:fold-vertical'
                    }
                    width="14"
                  />
                  <span>
                    {filteredSubjects.length > 0 && filteredSubjects.every((sub) => collapsedSubjects[sub.id])
                      ? 'Expand All'
                      : 'Collapse All'}
                  </span>
                </button>
              </div>

              {filteredSubjects.map((sub) => {
                const isCollapsed = collapsedSubjects[sub.id] || false;
                const subProgress = getSubjectProgress(sub.chapters);
                const masteredInSub = sub.chapters.filter((c) => c.level === 'mastered').length;

                return (
                  <div
                    key={sub.id}
                    className="group rounded-2xl overflow-hidden transition-all duration-300 border bg-[#101012]"
                    style={{
                      borderColor: '#25252b',
                      boxShadow: '0 4px 18px -2px rgba(0,0,0,0.5)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${sub.color}55`;
                      e.currentTarget.style.boxShadow = `0 8px 24px -4px rgba(0,0,0,0.6), 0 0 16px -4px ${sub.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#25252b';
                      e.currentTarget.style.boxShadow = '0 4px 18px -2px rgba(0,0,0,0.5)';
                    }}
                  >
                    {/* Subject Header */}
                    <div
                      onClick={() => toggleSubjectCollapse(sub.id)}
                      className={`px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between cursor-pointer group-hover:bg-white/[0.02] transition-colors select-none ${
                        !isCollapsed ? 'border-b' : ''
                      }`}
                      style={{
                        borderBottomColor: !isCollapsed ? "#25252b" : undefined,
                      }}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        {/* Dual-ring target halo beacon (7. Glow border) */}
                        <div
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{ borderColor: sub.color, backgroundColor: `${sub.color}20` }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: sub.color, boxShadow: `0 0 6px ${sub.color}` }}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <h3 className="text-base sm:text-[18px] font-bold text-white tracking-tight truncate">
                              {sub.name}
                            </h3>
                            <span
                              className="text-[11px] sm:text-[12px] font-bold px-2.5 py-0.5 rounded-full shrink-0"
                              style={{
                                backgroundColor: `${sub.color}15`,
                                color: sub.color,
                              }}
                            >
                              {subProgress}% Mastered
                            </span>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] text-zinc-200 mt-1 flex-wrap">
                            {sub.professor && <span className="truncate">{sub.professor}</span>}
                            {sub.coefficient && (
                              <>
                                <span>•</span>
                                <span>Coef {sub.coefficient}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>
                              {sub.chapters.length} chapter{sub.chapters.length !== 1 ? 's' : ''} ({masteredInSub} mastered)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                        <div className="w-24 sm:w-32 bg-[#1b1b1e] h-2 rounded-full overflow-hidden border border-borderPanel hidden sm:block">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${subProgress}%`,
                              backgroundColor: sub.color,
                            }}
                          />
                        </div>

                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                          <iconify-icon
                            icon={isCollapsed ? 'lucide:chevron-down' : 'lucide:chevron-up'}
                            width="18"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Chapters List */}
                    {!isCollapsed && (
                      <div className="p-3.5 sm:p-6 flex flex-col gap-3.5 bg-[#08080b]/95 border-t border-white/[0.03]">
                        {sub.chapters.length === 0 ? (
                          <div className="p-8 text-center text-textMuted text-[14px]">
                            No chapters recorded for {sub.name} yet.{' '}
                            <button
                              onClick={() => {
                                setDefaultSubjectForNewChapter(sub.id);
                                setIsNewChapterModalOpen(true);
                              }}
                              className="text-white underline font-semibold hover:text-[#38bdf8]"
                            >
                              Add the first chapter
                            </button>
                          </div>
                        ) : (
                          sub.chapters.map((ch) => {
                            const levelMeta = LEVEL_META[ch.level];
                            const isDropdownOpen = activeLevelDropdownChapterId === ch.id;

                            return (
                              <div
                                key={ch.id}
                                className="group bg-[#141417] hover:bg-[#18181c] border border-[#232328] hover:border-[#383842] rounded-2xl p-5 sm:p-6 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm"
                              >
                                <button
                                  type="button"
                                  onClick={() => setSelectedChapterDetails({ chapter: ch, subject: sub })}
                                  className="flex items-start gap-4 min-w-0 flex-1 text-left p-1 -m-1 rounded-xl focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                                >
                                  <div className="w-11 h-11 rounded-xl bg-[#1a1a20] border border-[#2e2e36] flex items-center justify-center text-white text-[15px] font-bold shrink-0 shadow-inner mt-0.5 transition-colors">
                                    {ch.number < 10 ? `0${ch.number}` : ch.number}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                      <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight leading-snug">
                                        {ch.title}
                                      </h3>
                                      {ch.difficulty && (
                                        <span
                                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                                            ch.difficulty === 'Hard'
                                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                                              : ch.difficulty === 'Medium'
                                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                                          }`}
                                        >
                                          {ch.difficulty}
                                        </span>
                                      )}
                                    </div>
                                    {ch.description && (
                                      <p className="text-[13px] sm:text-[14px] text-zinc-200 mt-1.5 leading-relaxed">
                                        {ch.description}
                                      </p>
                                    )}
                                  </div>
                                </button>

                                <div className="flex items-center gap-3.5 shrink-0 self-end sm:self-center relative">
                                  <span className="text-[13px] font-bold uppercase tracking-wider text-zinc-400 hidden sm:inline">
                                    Level:
                                  </span>

                                  <div className="relative">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveLevelDropdownChapterId(
                                          isDropdownOpen ? null : ch.id
                                        );
                                      }}
                                      className={`h-10 px-4 rounded-xl border text-[13px] font-bold transition-all shadow-sm flex items-center gap-2.5 ${levelMeta.badgeBg} ${levelMeta.badgeText} ${levelMeta.badgeBorder} hover:brightness-125 cursor-pointer`}
                                      title="Click to change chapter level"
                                    >
                                      <span className={`w-2.5 h-2.5 rounded-full ${levelMeta.dotBg}`} />
                                      <span>{levelMeta.label}</span>
                                      <iconify-icon
                                        icon="lucide:chevron-down"
                                        width="15"
                                        className="opacity-70 ml-0.5"
                                      />
                                    </button>

                                    {isDropdownOpen && (
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute right-0 top-full mt-2 w-56 bg-[#121215] border border-[#2c2c32] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                                      >
                                        <div className="px-3 py-2 border-b border-[#222228] mb-1">
                                          <span className="text-[11px] font-bold uppercase tracking-wider text-textMuted">
                                            Change Mastery Level
                                          </span>
                                        </div>

                                        {LEVEL_ORDER.map((lvlKey) => {
                                          const meta = LEVEL_META[lvlKey];
                                          const isSelected = ch.level === lvlKey;
                                          return (
                                            <button
                                              key={lvlKey}
                                              onClick={() =>
                                                handleUpdateChapterLevel(sub.id, ch.id, lvlKey)
                                              }
                                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
                                                isSelected
                                                  ? 'bg-[#1e1e24] text-white'
                                                  : 'text-zinc-300 hover:bg-[#18181c] hover:text-white'
                                              }`}
                                            >
                                              <div className="flex items-center gap-2.5">
                                                <span
                                                  className={`w-2.5 h-2.5 rounded-full ${meta.dotBg}`}
                                                />
                                                <div className="flex flex-col text-left">
                                                  <span className="leading-none">{meta.label}</span>
                                                  <span className="text-[11px] text-textMuted mt-1">
                                                    {meta.subtext}
                                                  </span>
                                                </div>
                                              </div>
                                              {isSelected && (
                                                <iconify-icon
                                                  icon="lucide:check"
                                                  width="15"
                                                  className="text-white shrink-0 ml-2"
                                                />
                                              )}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}

                        {sub.chapters.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setDefaultSubjectForNewChapter(sub.id);
                              setIsNewChapterModalOpen(true);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#2a2a30] hover:border-zinc-500 bg-[#121215]/40 hover:bg-[#16161a] text-zinc-400 hover:text-white text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
                          >
                            <iconify-icon icon="lucide:plus" width="14" />
                            <span>Add Chapter to {sub.name}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </div>

      {/* New Subject Modal */}
      <NewSubjectModal
        isOpen={isNewSubjectModalOpen}
        onClose={() => {
          setIsNewSubjectModalOpen(false);
          updateUrlParam('modal', null);
        }}
        onSubmit={handleAddSubject}
      />

      {/* New Chapter Modal */}
      <NewChapterModal
        isOpen={isNewChapterModalOpen}
        subjects={subjects}
        defaultSubjectId={defaultSubjectForNewChapter}
        onClose={() => {
          setIsNewChapterModalOpen(false);
          updateUrlParam('modal', null);
        }}
        onSubmit={handleAddChapter}
      />

      {/* Chapter Details Modal */}
      <ChapterDetailsModal
        isOpen={selectedChapterDetails !== null}
        chapter={selectedChapterDetails?.chapter || null}
        subject={selectedChapterDetails?.subject || null}
        onClose={() => {
          setSelectedChapterDetails(null);
          updateUrlParam('modal', null);
        }}
        onLevelChange={(newLevel) => {
          if (selectedChapterDetails) {
            handleUpdateChapterLevel(
              selectedChapterDetails.subject.id,
              selectedChapterDetails.chapter.id,
              newLevel
            );
            setSelectedChapterDetails((prev) =>
              prev ? { ...prev, chapter: { ...prev.chapter, level: newLevel } } : null
            );
          }
        }}
        onScheduleRevision={(ch, sub) => {
          onOpenNewSession?.({
            title: `Revise ${ch.title}`,
            subject: sub.name,
            subjectColor: sub.color,
          });
        }}
      />
    </div>
  );
};
