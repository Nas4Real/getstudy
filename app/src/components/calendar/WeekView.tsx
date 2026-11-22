import React from 'react';
import type { SessionData } from '../../types';

interface WeekSession {
  title: string;
  subject: string;
  subjectClass: string;
  dotClass: string;
  time: string;
  duration: string;
  date: string;
  room: string;
  professor: string;
  isCompleted?: boolean;
  isExam?: boolean;
  coefficient?: number;
}

interface WeekDay {
  shortName: string;
  dateNum: number;
  isToday?: boolean;
  sessions: WeekSession[];
}

const ORIGINAL_WEEK_DAYS: WeekDay[] = [
  {
    shortName: 'Lun',
    dateNum: 4,
    sessions: [
      {
        title: 'Réduction des endomorphismes',
        subject: 'Algèbre',
        subjectClass: 'text-algebre',
        dotClass: 'bg-algebre',
        time: '08:00',
        duration: '100M',
        date: 'Lundi 4 Mai',
        room: 'Room 102',
        professor: 'Prof. Gauss',
      },
    ],
  },
  {
    shortName: 'Mar',
    dateNum: 5,
    sessions: [
      {
        title: 'Intégration Théorèmes',
        subject: 'Analyse',
        subjectClass: 'text-analyse',
        dotClass: 'bg-analyse',
        time: '08:00',
        duration: '110M',
        date: 'Mardi 5 Mai',
        room: 'Room 201',
        professor: 'Prof. Cauchy',
      },
    ],
  },
  {
    shortName: 'Mer',
    dateNum: 6,
    sessions: [
      {
        title: 'Cinématique PFD',
        subject: 'Mécanique',
        subjectClass: 'text-mecanique',
        dotClass: 'bg-mecanique',
        time: '14:00',
        duration: '100M',
        date: 'Mercredi 6 Mai',
        room: 'Lab 3',
        professor: 'Prof. Newton',
      },
    ],
  },
  {
    shortName: 'Jeu',
    dateNum: 7,
    isToday: true,
    sessions: [
      {
        title: 'Capacités thermiques',
        subject: 'Physique',
        subjectClass: 'text-physique',
        dotClass: 'bg-physique',
        time: '08:00',
        duration: '110M',
        date: 'Jeudi 7 Mai',
        room: 'Room 304',
        professor: 'Prof. Heisenberg',
      },
      {
        title: 'Topologie EVN : Exercices',
        subject: 'Analyse',
        subjectClass: 'text-analyse',
        dotClass: 'bg-analyse',
        time: '10:00',
        duration: '75M',
        date: 'Jeudi 7 Mai',
        room: 'Room 105',
        professor: 'Prof. Cauchy',
      },
    ],
  },
  {
    shortName: 'Ven',
    dateNum: 8,
    sessions: [
      {
        title: 'Analyse fréquentielle',
        subject: 'Physique',
        subjectClass: 'text-physique',
        dotClass: 'bg-physique',
        time: '14:00',
        duration: '75M',
        date: 'Vendredi 8 Mai',
        room: 'Lab 2',
        professor: 'Prof. Maxwell',
      },
    ],
  },
  {
    shortName: 'Sam',
    dateNum: 9,
    sessions: [
      {
        title: 'Mini-simulation Maths 1',
        subject: 'Algèbre',
        subjectClass: 'text-algebre',
        dotClass: 'bg-algebre',
        time: '08:00',
        duration: '180M',
        date: 'Samedi 9 Mai',
        room: 'Amphi A',
        professor: 'Prof. Euler',
      },
    ],
  },
  {
    shortName: 'Dim',
    dateNum: 10,
    sessions: [
      {
        title: 'Bilan semaine et plan',
        subject: 'Méthodologie',
        subjectClass: 'text-methodologie',
        dotClass: 'bg-methodologie',
        time: '10:00',
        duration: '70M',
        date: 'Dimanche 10 Mai',
        room: 'Online',
        professor: 'Prof. Feynman',
      },
    ],
  },
];

const EXAMS_WEEK_DAYS: WeekDay[] = [
  {
    shortName: 'Lun',
    dateNum: 4,
    sessions: [
      {
        title: 'Révisions Algèbre',
        subject: 'Algèbre',
        subjectClass: 'text-algebre',
        dotClass: 'bg-algebre',
        time: '08:00',
        duration: '120M',
        date: 'Lundi 4 Mai',
        room: 'Room 102',
        professor: 'Prof. Gauss',
      },
    ],
  },
  {
    shortName: 'Mar',
    dateNum: 5,
    sessions: [
      {
        title: 'Intégration Théorèmes',
        subject: 'Analyse',
        subjectClass: 'text-analyse',
        dotClass: 'bg-analyse',
        time: '08:00',
        duration: '110M',
        date: 'Mardi 5 Mai',
        room: 'Room 201',
        professor: 'Prof. Cauchy',
      },
    ],
  },
  {
    shortName: 'Mer',
    dateNum: 6,
    sessions: [
      {
        title: 'Cinématique PFD',
        subject: 'Mécanique',
        subjectClass: 'text-mecanique',
        dotClass: 'bg-mecanique',
        time: '14:00',
        duration: '100M',
        date: 'Mercredi 6 Mai',
        room: 'Lab 3',
        professor: 'Prof. Newton',
      },
    ],
  },
  {
    shortName: 'Jeu',
    dateNum: 7,
    isToday: true,
    sessions: [
      {
        title: 'Mise au point avant DS',
        subject: 'Algèbre',
        subjectClass: 'text-algebre',
        dotClass: 'bg-algebre',
        time: '08:00',
        duration: '90M',
        date: 'Jeudi 7 Mai',
        room: 'Amphi Schwartz',
        professor: 'Prof. Laurent Schwartz',
      },
    ],
  },
  {
    shortName: 'Ven',
    dateNum: 8,
    sessions: [
      {
        title: 'DS 3 : Algèbre Linéaire',
        subject: 'Algèbre',
        subjectClass: 'text-rose-400',
        dotClass: 'bg-rose-500',
        time: '08:00',
        duration: '180M',
        date: 'Vendredi 8 Mai',
        room: 'Amphi Schwartz',
        professor: 'Prof. Laurent Schwartz',
        isExam: true,
        coefficient: 4,
      },
    ],
  },
  {
    shortName: 'Sam',
    dateNum: 9,
    sessions: [
      {
        title: 'Concours Blanc : Physique',
        subject: 'Physique',
        subjectClass: 'text-rose-400',
        dotClass: 'bg-rose-500',
        time: '08:00',
        duration: '240M',
        date: 'Samedi 9 Mai',
        room: 'Amphi Curie',
        professor: 'Prof. Miller',
        isExam: true,
        coefficient: 5,
      },
    ],
  },
  {
    shortName: 'Dim',
    dateNum: 10,
    sessions: [
      {
        title: 'Bilan post-DS & Repos',
        subject: 'Méthodologie',
        subjectClass: 'text-methodologie',
        dotClass: 'bg-methodologie',
        time: '10:00',
        duration: '70M',
        date: 'Dimanche 10 Mai',
        room: 'Online',
        professor: 'Self-care',
      },
    ],
  },
];

const WEEK_FULL_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const WEEK_MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const EXTRA_WEEKS: Record<number, WeekDay[]> = {
  [-2]: [
    {
      shortName: 'Lun',
      dateNum: 20,
      sessions: [
        { title: 'Séries de Fourier', subject: 'Analyse', subjectClass: 'text-analyse', dotClass: 'bg-analyse', time: '08:30', duration: '90M', date: '', room: 'Room 201', professor: 'Prof. Cauchy' },
        { title: 'TP Thermodynamique', subject: 'Physique', subjectClass: 'text-physique', dotClass: 'bg-physique', time: '14:00', duration: '120M', date: '', room: 'Lab 1', professor: 'Prof. Miller' },
      ],
    },
    {
      shortName: 'Mar',
      dateNum: 21,
      sessions: [
        { title: 'Espaces Préhilbertiens', subject: 'Algèbre', subjectClass: 'text-algebre', dotClass: 'bg-algebre', time: '10:00', duration: '105M', date: '', room: 'Amphi 27', professor: 'Prof. Gauss' },
      ],
    },
    {
      shortName: 'Mer',
      dateNum: 22,
      sessions: [
        { title: 'Graphes & Parcours BFS', subject: 'Informatique', subjectClass: 'text-purple-400', dotClass: 'bg-purple-500', time: '13:30', duration: '90M', date: '', room: 'Lab Info 3', professor: 'Dr. Alan Turing' },
      ],
    },
    {
      shortName: 'Jeu',
      dateNum: 23,
      sessions: [
        { title: 'Mécanique des Fluides', subject: 'Mécanique', subjectClass: 'text-mecanique', dotClass: 'bg-mecanique', time: '09:00', duration: '110M', date: '', room: 'Lab 3', professor: 'Prof. Newton' },
      ],
    },
    {
      shortName: 'Ven',
      dateNum: 24,
      sessions: [
        { title: 'Synthèse Fiches Cours', subject: 'Méthodologie', subjectClass: 'text-methodologie', dotClass: 'bg-methodologie', time: '15:00', duration: '60M', date: '', room: 'BU Centrale', professor: 'Self-study' },
      ],
    },
    { shortName: 'Sam', dateNum: 25, sessions: [] },
    {
      shortName: 'Dim',
      dateNum: 26,
      sessions: [
        { title: 'Lecture & Préparation', subject: 'Méthodologie', subjectClass: 'text-methodologie', dotClass: 'bg-methodologie', time: '11:00', duration: '60M', date: '', room: 'Online', professor: 'Self-care' },
      ],
    },
  ],
  [-1]: [
    {
      shortName: 'Lun',
      dateNum: 27,
      sessions: [
        { title: 'Espaces Vectoriels & Bases', subject: 'Algèbre', subjectClass: 'text-algebre', dotClass: 'bg-algebre', time: '08:00', duration: '90M', date: '', room: 'Room 102', professor: 'Prof. Gauss' },
        { title: 'Optique Géométrique', subject: 'Physique', subjectClass: 'text-physique', dotClass: 'bg-physique', time: '11:00', duration: '90M', date: '', room: 'Amphi Curie', professor: 'Prof. Miller' },
      ],
    },
    {
      shortName: 'Mar',
      dateNum: 28,
      sessions: [
        { title: 'Suites & Séries Numériques', subject: 'Analyse', subjectClass: 'text-analyse', dotClass: 'bg-analyse', time: '09:00', duration: '105M', date: '', room: 'Salle TD 21', professor: 'Prof. Cauchy' },
      ],
    },
    {
      shortName: 'Mer',
      dateNum: 29,
      sessions: [
        { title: 'Moment Cinétique Solides', subject: 'Mécanique', subjectClass: 'text-mecanique', dotClass: 'bg-mecanique', time: '14:00', duration: '100M', date: '', room: 'Lab 3', professor: 'Prof. Newton' },
      ],
    },
    {
      shortName: 'Jeu',
      dateNum: 30,
      sessions: [
        { title: 'TP Diffraction Lumineuse', subject: 'Physique', subjectClass: 'text-physique', dotClass: 'bg-physique', time: '08:30', duration: '120M', date: '', room: 'Lab 2', professor: 'Prof. Maxwell' },
      ],
    },
    {
      shortName: 'Ven',
      dateNum: 1,
      sessions: [
        { title: 'TD Matrices & Noyaux', subject: 'Algèbre', subjectClass: 'text-algebre', dotClass: 'bg-algebre', time: '10:00', duration: '90M', date: '', room: 'Amphi 27', professor: 'Prof. Jean Dieudonné' },
        { title: 'Graphes & Plus Court Chemin', subject: 'Informatique', subjectClass: 'text-purple-400', dotClass: 'bg-purple-500', time: '15:00', duration: '90M', date: '', room: 'Lab Info 1', professor: 'Dr. Alan Turing' },
      ],
    },
    {
      shortName: 'Sam',
      dateNum: 2,
      sessions: [
        { title: 'Annales Maths Appliquées', subject: 'Algèbre', subjectClass: 'text-algebre', dotClass: 'bg-algebre', time: '09:00', duration: '120M', date: '', room: 'BU Centrale', professor: 'Prof. Euler' },
      ],
    },
    { shortName: 'Dim', dateNum: 3, sessions: [] },
  ],
  [1]: [
    {
      shortName: 'Lun',
      dateNum: 11,
      sessions: [
        { title: 'Théorème de Gauss', subject: 'Physique', subjectClass: 'text-physique', dotClass: 'bg-physique', time: '08:30', duration: '105M', date: '', room: 'Amphi Curie', professor: 'Prof. Miller' },
        { title: 'Calcul Différentiel', subject: 'Analyse', subjectClass: 'text-analyse', dotClass: 'bg-analyse', time: '14:00', duration: '90M', date: '', room: 'Room 201', professor: 'Prof. Cauchy' },
      ],
    },
    {
      shortName: 'Mar',
      dateNum: 12,
      sessions: [
        { title: 'Orthogonalité & Gram-Schmidt', subject: 'Algèbre', subjectClass: 'text-algebre', dotClass: 'bg-algebre', time: '10:00', duration: '120M', date: '', room: 'Room 102', professor: 'Prof. Jean Dieudonné' },
      ],
    },
    {
      shortName: 'Mer',
      dateNum: 13,
      sessions: [
        { title: 'Oscillateurs Amortis', subject: 'Mécanique', subjectClass: 'text-mecanique', dotClass: 'bg-mecanique', time: '09:00', duration: '90M', date: '', room: 'Lab 3', professor: 'Prof. Newton' },
        { title: 'Arbres & Tas Binaires', subject: 'Informatique', subjectClass: 'text-purple-400', dotClass: 'bg-purple-500', time: '15:00', duration: '90M', date: '', room: 'Lab Info 2', professor: 'Dr. Alan Turing' },
      ],
    },
    {
      shortName: 'Jeu',
      dateNum: 14,
      sessions: [
        { title: 'Intégrales Impropres', subject: 'Analyse', subjectClass: 'text-analyse', dotClass: 'bg-analyse', time: '10:00', duration: '105M', date: '', room: 'Salle TD 21', professor: 'Prof. Laurent Schwartz' },
      ],
    },
    {
      shortName: 'Ven',
      dateNum: 15,
      sessions: [
        { title: 'TD Onde & Propagation', subject: 'Physique', subjectClass: 'text-physique', dotClass: 'bg-physique', time: '13:30', duration: '90M', date: '', room: 'Lab 2', professor: 'Prof. Maxwell' },
      ],
    },
    {
      shortName: 'Sam',
      dateNum: 16,
      sessions: [
        { title: 'DS 4 : Physique & Optique', subject: 'Physique', subjectClass: 'text-rose-400', dotClass: 'bg-rose-500', time: '08:00', duration: '180M', date: '', room: 'Amphi Curie', professor: 'Prof. Miller', isExam: true, coefficient: 4 },
      ],
    },
    { shortName: 'Dim', dateNum: 17, sessions: [] },
  ],
  [2]: [
    {
      shortName: 'Lun',
      dateNum: 18,
      sessions: [
        { title: 'Formes Quadratiques', subject: 'Algèbre', subjectClass: 'text-algebre', dotClass: 'bg-algebre', time: '09:00', duration: '105M', date: '', room: 'Room 102', professor: 'Prof. Gauss' },
      ],
    },
    {
      shortName: 'Mar',
      dateNum: 19,
      sessions: [
        { title: 'Induction & Loi Faraday', subject: 'Physique', subjectClass: 'text-physique', dotClass: 'bg-physique', time: '08:30', duration: '90M', date: '', room: 'Lab 2', professor: 'Prof. Maxwell' },
        { title: 'Séries Entières & Rayon', subject: 'Analyse', subjectClass: 'text-analyse', dotClass: 'bg-analyse', time: '13:30', duration: '105M', date: '', room: 'Room 201', professor: 'Prof. Cauchy' },
      ],
    },
    { shortName: 'Mer', dateNum: 20, sessions: [] },
    {
      shortName: 'Jeu',
      dateNum: 21,
      sessions: [
        { title: 'Algorithmes Gloutons & DP', subject: 'Informatique', subjectClass: 'text-purple-400', dotClass: 'bg-purple-500', time: '10:30', duration: '120M', date: '', room: 'Lab Info 3', professor: 'Dr. Alan Turing' },
      ],
    },
    {
      shortName: 'Ven',
      dateNum: 22,
      sessions: [
        { title: 'Mécanique Énergétique', subject: 'Mécanique', subjectClass: 'text-mecanique', dotClass: 'bg-mecanique', time: '09:00', duration: '90M', date: '', room: 'Lab 3', professor: 'Prof. Newton' },
        { title: 'Oral Blanc & Synthèse', subject: 'Méthodologie', subjectClass: 'text-methodologie', dotClass: 'bg-methodologie', time: '14:30', duration: '75M', date: '', room: 'Room 105', professor: 'Prof. Feynman' },
      ],
    },
    {
      shortName: 'Sam',
      dateNum: 23,
      sessions: [
        { title: 'Simulation Concours Maths', subject: 'Algèbre', subjectClass: 'text-algebre', dotClass: 'bg-algebre', time: '08:00', duration: '180M', date: '', room: 'Amphi 27', professor: 'Prof. Euler' },
      ],
    },
    {
      shortName: 'Dim',
      dateNum: 24,
      sessions: [
        { title: 'Planning Révisions Juin', subject: 'Méthodologie', subjectClass: 'text-methodologie', dotClass: 'bg-methodologie', time: '11:00', duration: '60M', date: '', room: 'Online', professor: 'Self-study' },
      ],
    },
  ],
};

const getBaseWeekForOffset = (periodOffset: number, isExams: boolean): WeekDay[] => {
  if (periodOffset === 0) {
    return isExams ? EXAMS_WEEK_DAYS : ORIGINAL_WEEK_DAYS;
  }
  if (EXTRA_WEEKS[periodOffset]) {
    return EXTRA_WEEKS[periodOffset];
  }
  const key = periodOffset < 0 ? (Math.abs(periodOffset) % 2 === 1 ? -1 : -2) : (periodOffset % 2 === 1 ? 1 : 2);
  return EXTRA_WEEKS[key];
};

interface WeekViewProps {
  onSelectSession?: (session: SessionData) => void;
  onOpenNewSession?: () => void;
  mockState?: 'normal' | 'empty' | 'completed' | 'exams';
  periodOffset?: number;
}

export const WeekView: React.FC<WeekViewProps> = ({
  onSelectSession,
  onOpenNewSession,
  mockState = 'normal',
  periodOffset = 0,
}) => {
  const isEmpty = mockState === 'empty';
  const isCompleted = mockState === 'completed';
  const isExams = mockState === 'exams';

  const getWeekDays = (): WeekDay[] => {
    const baseWeek = getBaseWeekForOffset(periodOffset, isExams);

    return baseWeek.map((day, index) => {
      const colDate = new Date(2026, 4, 4 + periodOffset * 7 + index);
      const dateNum = colDate.getDate();
      const formattedDate = `${WEEK_FULL_DAYS[colDate.getDay()]} ${dateNum} ${WEEK_MONTHS[colDate.getMonth()]}`;

      return {
        ...day,
        dateNum,
        isToday: periodOffset === 0 && Boolean(day.isToday),
        sessions: isEmpty
          ? []
          : day.sessions.map((s) => ({
              ...s,
              date: formattedDate,
              isCompleted:
                periodOffset < 0
                  ? true
                  : periodOffset > 0
                  ? false
                  : isCompleted
                  ? dateNum <= 7
                  : s.isCompleted,
            })),
      };
    });
  };

  const weekDays = getWeekDays();

  return (
    <div id="view-week" className="flex-1 overflow-x-auto overflow-y-auto p-2 sm:p-4 md:p-6 pb-20 md:pb-6 scrollbar-hide flex flex-col">
      {isExams && periodOffset === 0 && (
        <div className="mb-3.5 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 text-rose-300 shrink-0 animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <iconify-icon icon="lucide:alert-circle" width="20" className="text-rose-400 shrink-0" />
            <div className="min-w-0">
              <div className="font-bold text-white text-[14px] sm:text-[14.5px] tracking-tight leading-none">
                Exam Week — 2 Major Devoirs Surveillés Scheduled
              </div>
              <div className="text-[12.5px] sm:text-[13px] font-semibold text-rose-200 mt-1 leading-tight truncate">
                DS 3 Algèbre Linéaire (Vendredi 8 Mai) & Concours Blanc Physique (Samedi 9 Mai).
              </div>
            </div>
          </div>
          <span className="text-[11px] text-rose-300 font-bold px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/35 shrink-0">
            Exams Active
          </span>
        </div>
      )}

      {/* 7-Day Grid (100% identical to original layout) */}
      <div className="min-w-[850px] xl:min-w-0 flex-1 grid grid-cols-7 bg-panel rounded-2xl border border-borderPanel overflow-hidden divide-x divide-borderPanel shadow-inner">
        {weekDays.map((day) => (
          <div
            key={day.shortName}
            className={`flex flex-col h-full relative ${
              day.isToday ? 'bg-cardBg z-10 border-x border-zinc-700 shadow-2xl' : 'bg-panel'
            }`}
          >
            {day.isToday && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-300 z-30" />
            )}
            
            {/* Day Header */}
            <div
              className={`flex flex-col items-center py-4 sm:py-5 border-b border-borderPanel ${
                day.isToday ? 'bg-cardBg' : 'bg-panel'
              }`}
            >
              <span
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                  day.isToday ? 'text-zinc-200' : 'text-zinc-400'
                }`}
              >
                {day.shortName}
              </span>
              {day.isToday ? (
                <span className="text-sm sm:text-base font-bold text-black bg-white w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full mt-1.5 shadow-sm">
                  {day.dateNum}
                </span>
              ) : (
                <span className="text-base sm:text-lg font-bold text-zinc-300 mt-1.5">
                  {day.dateNum}
                </span>
              )}
            </div>

            {/* Day Sessions List */}
            <div className="flex flex-col gap-3 p-3 sm:p-3.5 overflow-y-auto scrollbar-hide flex-1">
              {day.sessions.length === 0 ? (
                /* Empty state placeholder for empty/break week */
                <div
                  onClick={onOpenNewSession}
                  className="flex-1 flex flex-col items-center justify-center py-10 sm:py-12 px-3 text-center border border-dashed border-[#26262e] rounded-2xl m-1 group hover:border-zinc-600 hover:bg-zinc-900/30 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-3 shadow-inner group-hover:border-zinc-700 group-hover:text-white group-hover:scale-105 transition-all">
                    <iconify-icon icon="lucide:calendar-plus" width="22" />
                  </div>
                  <span className="text-[13.5px] sm:text-[14.5px] font-bold text-zinc-200 group-hover:text-white tracking-tight transition-colors">
                    No classes
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenNewSession?.();
                    }}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-[#222228] hover:bg-zinc-700 text-zinc-200 hover:text-white text-[12px] sm:text-[12.5px] font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <iconify-icon icon="lucide:plus" width="13" />
                    <span>Add</span>
                  </button>
                </div>
              ) : (
                day.sessions.map((sess, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      onSelectSession?.({
                        title: `${sess.subject} - ${sess.title}`,
                        subject: sess.subject,
                        time: sess.time,
                        date: sess.date,
                        room: sess.room,
                        professor: sess.professor,
                      })
                    }
                    className={`event-card w-full text-left p-3.5 sm:p-4 rounded-xl flex flex-col cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none transition-all shadow-sm ${
                      sess.isExam
                        ? 'bg-[#1b0911] border border-rose-500/60 ring-1 ring-rose-500/30 hover:border-rose-400'
                        : sess.isCompleted
                        ? 'bg-[#0e0e11] border border-emerald-500/30 opacity-90 hover:opacity-100 hover:border-emerald-500/50'
                        : 'hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 leading-none">
                      <div className="flex items-center gap-2">
                        {sess.isCompleted ? (
                          <iconify-icon icon="lucide:check-circle-2" width="14" className="text-emerald-400 shrink-0" />
                        ) : (
                          <span className={`w-2 h-2 rounded-full ${sess.dotClass} shrink-0`} />
                        )}
                        <span className="text-xs sm:text-sm font-semibold text-zinc-200">{sess.time}</span>
                      </div>
                      <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700/50">
                        {sess.duration}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-white leading-snug mt-2.5">
                      {sess.title}
                    </h3>
                    <div className="flex items-center justify-between gap-1.5 flex-wrap mt-2">
                      <span className={`text-xs sm:text-sm font-medium truncate ${sess.subjectClass}`}>
                        {sess.subject}
                      </span>
                      {sess.isExam && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          COEFF {sess.coefficient}
                        </span>
                      )}
                      {sess.isCompleted && (
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Attended
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
