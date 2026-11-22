import React, { useEffect, useRef, useState } from 'react';
import type { SessionData } from '../../types';

interface DayViewProps {
  onSelectSession?: (session: SessionData) => void;
  onOpenNewSession?: () => void;
  mockState?: 'normal' | 'empty' | 'completed' | 'exams';
  periodOffset?: number;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  onSelectDayOffset?: (offset: number) => void;
}

interface DayEventItem {
  id: string;
  title: string;
  subject: string;
  color: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  room: string;
  professor: string;
  status: 'completed' | 'active' | 'upcoming';
  notes?: string;
  isExam?: boolean;
  coefficient?: number;
}

const NORMAL_EVENTS: DayEventItem[] = [
  {
    id: 'de-1',
    title: "Capacités thermiques : modèle d'Einstein",
    subject: 'Physique',
    color: '#10b981',
    startTime: '08:00',
    endTime: '09:30',
    durationMinutes: 90,
    room: 'Amphi Curie (B-12)',
    professor: 'Prof. Miller',
    status: 'completed',
    notes: 'Thermodynamique statistique & quantification des modes vibratoires.',
  },
  {
    id: 'de-2',
    title: 'Topologie EVN : exercices structurants',
    subject: 'Analyse',
    color: '#06b6d4',
    startTime: '10:00',
    endTime: '11:45',
    durationMinutes: 105,
    room: 'Salle TD 21',
    professor: 'Prof. Laurent Schwartz',
    status: 'active',
    notes: 'Normes équivalentes, compacité dans R^n, théorème de Riesz.',
  },
  {
    id: 'de-3',
    title: 'Pause & Révision Libre Bibliothèque',
    subject: 'Méthodologie',
    color: '#f59e0b',
    startTime: '12:00',
    endTime: '13:30',
    durationMinutes: 90,
    room: 'BU Centrale - Étage 2',
    professor: 'Self-study',
    status: 'upcoming',
    notes: 'Relecture des fiches de synthèse séries de Riemann & d’Alembert.',
  },
  {
    id: 'de-4',
    title: 'Réduction des Endomorphismes & Trigonalisation',
    subject: 'Algèbre',
    color: '#ec4899',
    startTime: '14:00',
    endTime: '16:00',
    durationMinutes: 120,
    room: 'Amphi 27',
    professor: 'Prof. Jean Dieudonné',
    status: 'upcoming',
    notes: 'Polynôme minimal, lemme des noyaux, sous-espaces caractéristiques.',
  },
  {
    id: 'de-5',
    title: 'Graphes & Programmation Dynamique',
    subject: 'Informatique',
    color: '#a855f7',
    startTime: '16:30',
    endTime: '18:00',
    durationMinutes: 90,
    room: 'Lab Info 3',
    professor: 'Dr. Alan Turing',
    status: 'upcoming',
    notes: 'Implémentation de Dijkstra et optimisation du sac à dos en Python.',
  },
];

const EXAMS_EVENTS: DayEventItem[] = [
  {
    id: 'de-exam-1',
    title: 'DS 3 : Algèbre Linéaire & Espaces Préhilbertiens',
    subject: 'Algèbre',
    color: '#ec4899',
    startTime: '08:00',
    endTime: '11:00',
    durationMinutes: 180,
    room: 'Amphi Schwartz (Salle d’Examen)',
    professor: 'Prof. Laurent Schwartz',
    status: 'active',
    isExam: true,
    coefficient: 4,
    notes: 'Major 3-Hour Exam. Calculators prohibited. Bring student card, rough paper, and geometry set.',
  },
  {
    id: 'de-exam-2',
    title: 'Pause Déjeuner & Décompression Post-Écrit',
    subject: 'Méthodologie',
    color: '#f59e0b',
    startTime: '11:30',
    endTime: '13:30',
    durationMinutes: 120,
    room: 'Parc Universitaire / Cafétéria',
    professor: 'Self-care',
    status: 'upcoming',
    notes: 'Hydrate, rest mind, avoid recalculating exam answers immediately.',
  },
  {
    id: 'de-exam-3',
    title: 'TD Préparation : Électromagnétisme Théorème de Gauss',
    subject: 'Physique',
    color: '#10b981',
    startTime: '14:00',
    endTime: '16:00',
    durationMinutes: 120,
    room: 'Salle TD 104',
    professor: 'Prof. Miller',
    status: 'upcoming',
    notes: 'Review cylindrical coordinates, flux integral formulas, and boundary jumps.',
  },
];

const EN_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const EN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const FR_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const FR_MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const OFFSET_EVENTS: Record<number, Omit<DayEventItem, 'status'>[]> = {
  [-3]: [
    {
      id: 'de-m3-1',
      title: 'Réduction des endomorphismes',
      subject: 'Algèbre',
      color: '#ec4899',
      startTime: '08:00',
      endTime: '09:40',
      durationMinutes: 100,
      room: 'Room 102',
      professor: 'Prof. Gauss',
      notes: 'Valeurs propres, sous-espaces propres et critères de diagonalisation.',
    },
    {
      id: 'de-m3-2',
      title: 'Analyse Numérique : Méthodes Itératives',
      subject: 'Analyse',
      color: '#06b6d4',
      startTime: '14:00',
      endTime: '15:45',
      durationMinutes: 105,
      room: 'Lab Info 1',
      professor: 'Prof. Cauchy',
      notes: 'Convergence de Jacobi et Gauss-Seidel sur matrices symétriques.',
    },
  ],
  [-2]: [
    {
      id: 'de-m2-1',
      title: 'Intégration & Théorèmes de Convergence',
      subject: 'Analyse',
      color: '#06b6d4',
      startTime: '08:00',
      endTime: '09:50',
      durationMinutes: 110,
      room: 'Room 201',
      professor: 'Prof. Cauchy',
      notes: 'Convergence dominée de Lebesgue et intégrales à paramètre.',
    },
    {
      id: 'de-m2-2',
      title: 'Optique Ondulatoire & Interférences',
      subject: 'Physique',
      color: '#10b981',
      startTime: '13:30',
      endTime: '15:30',
      durationMinutes: 120,
      room: 'Amphi Curie (B-12)',
      professor: 'Prof. Miller',
      notes: 'Fentes d’Young, interféromètre de Michelson et cohérence temporelle.',
    },
  ],
  [-1]: [
    {
      id: 'de-m1-1',
      title: 'Cinématique PFD & Référentiels',
      subject: 'Mécanique',
      color: '#f59e0b',
      startTime: '08:30',
      endTime: '10:10',
      durationMinutes: 100,
      room: 'Lab 3',
      professor: 'Prof. Newton',
      notes: 'Changement de référentiel, forces d’inertie et théorème du moment cinétique.',
    },
    {
      id: 'de-m1-2',
      title: 'TD Espaces Vectoriels Normés',
      subject: 'Analyse',
      color: '#06b6d4',
      startTime: '10:30',
      endTime: '12:15',
      durationMinutes: 105,
      room: 'Salle TD 21',
      professor: 'Prof. Laurent Schwartz',
      notes: 'Continuité des applications linéaires et boules fermées en dimension finie.',
    },
    {
      id: 'de-m1-3',
      title: 'TP Optique & Diffraction',
      subject: 'Physique',
      color: '#10b981',
      startTime: '14:00',
      endTime: '16:00',
      durationMinutes: 120,
      room: 'Lab 3',
      professor: 'Prof. Miller',
      notes: 'Mesure de longueur d’onde au réseau et incertitudes élargies.',
    },
  ],
  [1]: [
    {
      id: 'de-p1-1',
      title: 'Analyse Fréquentielle & Filtrage',
      subject: 'Physique',
      color: '#10b981',
      startTime: '09:00',
      endTime: '10:45',
      durationMinutes: 105,
      room: 'Lab 2',
      professor: 'Prof. Maxwell',
      notes: 'Diagrammes de Bode asymptotiques, bande passante et résonance.',
    },
    {
      id: 'de-p1-2',
      title: 'Révision Ciblée : Algèbre Linéaire',
      subject: 'Algèbre',
      color: '#ec4899',
      startTime: '11:15',
      endTime: '13:00',
      durationMinutes: 105,
      room: 'BU Centrale - Salle 4',
      professor: 'Self-study',
      notes: 'Dernier entraînement sur polynôme minimal et réduction de Jordan avant DS 3.',
    },
    {
      id: 'de-p1-3',
      title: 'TD Structures de Données Avancées',
      subject: 'Informatique',
      color: '#a855f7',
      startTime: '14:30',
      endTime: '16:30',
      durationMinutes: 120,
      room: 'Lab Info 2',
      professor: 'Dr. Alan Turing',
      notes: 'Arbres binaires équilibrés et files de priorité en complexité O(log n).',
    },
  ],
  [2]: [
    {
      id: 'de-p2-1',
      title: 'DS 3 : Algèbre Linéaire',
      subject: 'Algèbre',
      color: '#ec4899',
      startTime: '09:00',
      endTime: '11:30',
      durationMinutes: 150,
      room: 'Amphi 27',
      professor: 'Prof. Jean Dieudonné',
      isExam: true,
      coefficient: 4,
      notes: 'Épreuve écrite de 2h30. Calculatrice interdite. Se présenter 15 minutes en avance.',
    },
    {
      id: 'de-p2-2',
      title: 'Décompression & Relecture Légère',
      subject: 'Méthodologie',
      color: '#f59e0b',
      startTime: '14:00',
      endTime: '15:30',
      durationMinutes: 90,
      room: 'Parc Universitaire',
      professor: 'Self-care',
      notes: 'Pause après examen et tri des fiches de Physique pour la semaine suivante.',
    },
  ],
  [3]: [
    {
      id: 'de-p3-1',
      title: 'Bilan Semaine & Planning S20',
      subject: 'Méthodologie',
      color: '#f59e0b',
      startTime: '10:00',
      endTime: '11:15',
      durationMinutes: 75,
      room: 'Online',
      professor: 'Prof. Feynman',
      notes: 'Planification des créneaux de révision et consolidation des chapitres maîtrisés.',
    },
  ],
};

const getDayMetadata = (offset: number) => {
  const date = new Date(2026, 4, 7 + offset);
  const weekday = EN_DAYS[date.getDay()];
  const month = EN_MONTHS[date.getMonth()];
  const day = date.getDate();

  let heading = `${weekday}, ${month} ${day}`;
  if (offset === 0) heading = "Today's Schedule";
  else if (offset === -1) heading = "Yesterday's Schedule";
  else if (offset === 1) heading = "Tomorrow's Schedule";

  return {
    heading,
    subtitleDate: `${weekday}, ${month} ${day}, ${date.getFullYear()}`,
    modalDate: `${FR_DAYS[date.getDay()]}, ${day} ${FR_MONTHS[date.getMonth()]}`,
    dayOfWeek: date.getDay(),
  };
};

const getEventsForOffset = (offset: number, dayOfWeek: number): DayEventItem[] => {
  if (offset === 0) return NORMAL_EVENTS;
  const fallbackKey = dayOfWeek === 0 ? 3 : dayOfWeek === 4 ? 0 : offset < 0 ? -1 : 1;
  const source =
    OFFSET_EVENTS[offset] ??
    (fallbackKey === 0 ? NORMAL_EVENTS : OFFSET_EVENTS[fallbackKey]) ??
    [];
  const status: DayEventItem['status'] = offset < 0 ? 'completed' : 'upcoming';
  return source.map((event) => ({ ...event, status }));
};

export const DayView: React.FC<DayViewProps> = ({
  onSelectSession,
  onOpenNewSession,
  mockState = 'normal',
  periodOffset,
}) => {
  const [quickNote, setQuickNote] = useState(
    '• Bring lab booklet & scientific calculator for TD 21\n• Ask Prof. Schwartz about convergence of sum(1/n log n)\n• Review endomorphism reduction notes before 14:00'
  );
  const [copied, setCopied] = useState(false);
  const [fallbackOffset] = useState(0);
  const activeDayOffset = periodOffset ?? fallbackOffset;
  const dayMeta = getDayMetadata(activeDayOffset);
  const isToday = activeDayOffset === 0;

  const prevOffsetRef = useRef(activeDayOffset);
  const [switchDir, setSwitchDir] = useState<'next' | 'prev'>('next');
  const [hasSwitched, setHasSwitched] = useState(false);

  useEffect(() => {
    if (prevOffsetRef.current !== activeDayOffset) {
      setSwitchDir(activeDayOffset < prevOffsetRef.current ? 'prev' : 'next');
      setHasSwitched(true);
      prevOffsetRef.current = activeDayOffset;
    }
  }, [activeDayOffset]);

  const getEvents = (): DayEventItem[] => {
    if (mockState === 'empty') return [];
    if (isToday && mockState === 'completed') {
      return NORMAL_EVENTS.map((e) => ({ ...e, status: 'completed' as const }));
    }
    if (isToday && mockState === 'exams') return EXAMS_EVENTS;
    return getEventsForOffset(activeDayOffset, dayMeta.dayOfWeek);
  };

  const events = getEvents();
  const isAllCompleted = isToday && mockState === 'completed';
  const isExams = isToday && mockState === 'exams';
  const isEmpty = mockState === 'empty' || events.length === 0;

  const handleCardClick = (event: DayEventItem) => {
    onSelectSession?.({
      title: event.title,
      subject: event.subject,
      time: `${event.startTime} - ${event.endTime}`,
      date: dayMeta.modalDate,
      room: event.room,
      professor: event.professor,
      description: event.notes,
    });
  };

  const handleCopyNote = () => {
    navigator.clipboard.writeText(quickNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div id="view-day" className="flex-1 overflow-y-auto overflow-x-clip px-4 sm:px-6 md:px-8 py-4 sm:py-6 pb-20 md:pb-6 scrollbar-hide bg-black text-zinc-200">
      <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
        
        {/* Main Schedule Timeline Column */}
        <div className="flex-1 w-full flex flex-col gap-6 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#202026]">
            <div key={activeDayOffset} className={hasSwitched ? 'day-title-fade' : undefined}>
              <h2 className="text-[17px] sm:text-lg font-bold text-white tracking-tight">
                {dayMeta.heading}
              </h2>
              <p className="text-[12.5px] sm:text-[13.5px] font-medium text-zinc-400 mt-0.5">
                {isEmpty
                  ? `${dayMeta.subtitleDate} • Free Day`
                  : `${dayMeta.subtitleDate} • ${events.length} ${events.length === 1 ? 'session' : 'sessions'}`}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {isEmpty ? (
                <span className="text-[13.5px] sm:text-[14.5px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 sm:px-4 py-1.5 rounded-full flex items-center gap-2 shrink-0 whitespace-nowrap">
                  <iconify-icon icon="lucide:smile" width="15" />
                  Day Off
                </span>
              ) : isAllCompleted ? (
                <span className="text-[13.5px] sm:text-[14.5px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 sm:px-4 py-1.5 rounded-full flex items-center gap-2 shrink-0 whitespace-nowrap">
                  <iconify-icon icon="lucide:check-circle-2" width="15" />
                  All Finished
                </span>
              ) : isExams ? (
                <span className="text-[13.5px] sm:text-[14.5px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3.5 sm:px-4 py-1.5 rounded-full flex items-center gap-2 shrink-0 whitespace-nowrap">
                  <iconify-icon icon="lucide:alert-circle" width="15" />
                  Exam Day
                </span>
              ) : isToday ? (
                <span className="text-xs sm:text-[13px] font-semibold text-zinc-400 bg-zinc-800/60 border border-zinc-700/50 px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Today
                </span>
              ) : (
                <span
                  className={`text-[13.5px] sm:text-[14.5px] font-bold px-3.5 sm:px-4 py-1.5 rounded-full flex items-center gap-2 shrink-0 whitespace-nowrap border ${
                    activeDayOffset < 0
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                      : 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30'
                  }`}
                >
                  <iconify-icon
                    icon={activeDayOffset < 0 ? 'lucide:history' : 'lucide:calendar-clock'}
                    width="15"
                  />
                  {activeDayOffset < 0 ? 'Past Day' : 'Upcoming'}
                </span>
              )}
            </div>
          </div>

          <div
            key={activeDayOffset}
            className={`flex flex-col gap-6 ${
              hasSwitched ? (switchDir === 'prev' ? 'day-switch-prev' : 'day-switch-next') : ''
            }`}
          >
            {/* Celebratory Banner when All Sessions are Completed */}
          {isAllCompleted && (
            <div className="p-4 sm:p-4.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <iconify-icon icon="lucide:check-circle-2" width="22" className="text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-[15px] sm:text-base tracking-tight">
                    All classes completed for today!
                  </div>
                  <div className="text-[12px] text-zinc-400 mt-0.5">
                    5 of 5 scheduled sessions attended. Great work today!
                  </div>
                </div>
              </div>
              <span className="text-[12px] sm:text-[13px] text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 shrink-0">
                5 of 5 attended
              </span>
            </div>
          )}

          {/* Empty State Box */}
          {isEmpty ? (
            <div className="py-14 sm:py-16 px-6 text-center flex flex-col items-center justify-center bg-[#0e0e11] border border-borderPanel/60 rounded-2xl animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-4 shadow-inner">
                <iconify-icon icon="lucide:coffee" width="30" />
              </div>
              <h3 className="text-[20px] sm:text-xl font-bold text-white mb-2 tracking-tight">
                No sessions scheduled today
              </h3>
              <p className="text-[14px] sm:text-[15px] text-zinc-400 max-w-sm sm:max-w-md mb-6 leading-relaxed">
                You have no lectures, labs, or tutorials on your schedule for today. A great opportunity for independent revision or rest.
              </p>
              <button
                type="button"
                onClick={onOpenNewSession}
                className="px-6 sm:px-7 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-[14px] sm:text-[15px] font-bold transition-all shadow-md active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                <iconify-icon icon="lucide:plus" width="18" />
                <span>Schedule Session</span>
              </button>
            </div>
          ) : (
            /* Timeline Sessions List */
            <div className="flex flex-col gap-4">
              {events.map((item, idx) => {
                const isActive = item.status === 'active';
                const isCompleted = item.status === 'completed';

                return (
                  <div key={item.id} className="flex items-start gap-2.5 sm:gap-5 group">
                    {/* Clear & Bold Hours Column */}
                    <div className="w-20 sm:w-28 md:w-32 pt-2 shrink-0 flex flex-col items-end text-right pr-1 sm:pr-2">
                      <div
                        className={`text-[17px] sm:text-xl font-bold tracking-tight leading-none ${
                          isActive
                            ? item.isExam
                              ? 'text-rose-400'
                              : 'text-cyan-400'
                            : isCompleted
                            ? 'text-textSubtle'
                            : 'text-white'
                        }`}
                      >
                        {item.startTime}
                      </div>
                      <div className="text-[12px] sm:text-[13px] font-semibold text-zinc-400 mt-1">
                        to {item.endTime}
                      </div>
                      <span className="text-[11px] sm:text-[11px] font-bold text-zinc-400 bg-[#16161c] px-1.5 sm:px-2 py-0.5 rounded border border-[#272730] mt-1.5 uppercase">
                        {item.durationMinutes} min
                      </span>
                    </div>

                    {/* Vertical Timeline Marker */}
                    <div className="flex flex-col items-center self-stretch shrink-0 relative pt-2">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isActive
                            ? item.isExam
                              ? 'border-rose-500 bg-rose-500'
                              : 'border-cyan-400 bg-cyan-400'
                            : isCompleted
                            ? 'border-emerald-500/80 bg-emerald-500/30'
                            : 'border-zinc-600 bg-[#141418]'
                        }`}
                      />
                      {idx !== events.length - 1 && (
                        <div className="w-0.5 flex-1 bg-[#202026] my-1" />
                      )}
                    </div>

                    {/* Session Card */}
                    <div
                      onClick={() => handleCardClick(item)}
                      className={`flex-1 rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer shadow-sm min-w-0 ${
                        item.isExam
                          ? 'bg-[#1b0911] border-rose-500/60 ring-1 ring-rose-500/30 hover:border-rose-400'
                          : isActive
                          ? 'bg-[#041a24] border-cyan-500/60 ring-1 ring-cyan-500/30 hover:border-cyan-400'
                          : isCompleted
                          ? 'bg-[#0e0e11] border-[#202026] opacity-75 hover:opacity-100 hover:border-zinc-700'
                          : 'bg-[#101014] border-[#222228] hover:border-zinc-600 hover:bg-[#141418]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border"
                            style={{
                              backgroundColor: `${item.color}15`,
                              color: item.color,
                              borderColor: `${item.color}35`,
                            }}
                          >
                            {item.subject}
                          </span>
                          {item.isExam && (
                            <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              DS Coeff {item.coefficient}
                            </span>
                          )}
                          <span className="text-[13px] sm:text-[13.5px] font-medium text-zinc-100 flex items-center gap-1.5 truncate">
                            <iconify-icon icon="lucide:map-pin" width="14" className="text-zinc-300 shrink-0" />
                            {item.room}
                          </span>
                          <span className="text-zinc-400">•</span>
                          <span className="text-[13px] sm:text-[13.5px] font-medium text-zinc-100 flex items-center gap-1.5 truncate">
                            <iconify-icon icon="lucide:user" width="14" className="text-zinc-300 shrink-0" />
                            {item.professor}
                          </span>
                        </div>

                        {/* Status Badge */}
                        {item.isExam ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                            Major Exam
                          </span>
                        ) : isActive ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            In Progress
                          </span>
                        ) : isCompleted ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 flex items-center gap-1">
                            <iconify-icon icon="lucide:check" width="12" />
                            Attended
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700/50 shrink-0">
                            Upcoming
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-base sm:text-[17px] font-bold tracking-tight mb-2 ${
                          item.isExam
                            ? 'text-rose-200'
                            : isActive
                            ? 'text-cyan-200'
                            : isCompleted
                            ? 'text-zinc-300'
                            : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.notes && (
                        <p className="text-[14px] sm:text-[14.5px] text-zinc-100 line-clamp-2 leading-relaxed mb-3">
                          {item.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06] text-[12px] text-textSubtle">
                        <span className="flex items-center gap-1.5">
                          <iconify-icon icon="lucide:clock" width="13" />
                          {item.startTime} — {item.endTime} ({item.durationMinutes}m)
                        </span>
                        <span className="text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 font-semibold">
                          <span>Details</span>
                          <iconify-icon icon="lucide:chevron-right" width="13" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </div>
        </div>

        {/* Right Column: Urgent Exam Countdown & Today's Quick Note */}
        <div className="w-full lg:w-[360px] xl:w-[420px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-0">
          {/* Exam Status Card */}
          {isEmpty ? (
            <div className="rounded-2xl border border-[#222228] bg-[#0c0c0f] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                  Day Schedule
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-white tracking-tight">
                All Clear Today
              </h3>
              <p className="text-[12.5px] text-zinc-400 mt-1">
                No exams or compulsory lectures today. Catch up on reading or enjoy your day off.
              </p>
            </div>
          ) : isExams ? (
            <div className="rounded-2xl border border-rose-500/40 bg-[#160a10] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[11px] uppercase tracking-wider font-bold text-rose-400">
                  Major Exam Today
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-white tracking-tight">
                DS 3 : Algèbre Linéaire
              </h3>
              <div className="text-[12.5px] text-zinc-300 mt-2 flex items-center gap-2">
                <iconify-icon icon="lucide:map-pin" width="14" className="text-rose-400" />
                <span>Amphi Schwartz • 08:00 - 11:00 (3h)</span>
              </div>
              <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11.5px] text-rose-300 font-medium">
                ⚠️ Calculators strictly prohibited. Rough paper provided.
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-br from-[#16090c] via-[#0f0a0c] to-[#0c0c0f] p-6 hover:border-red-500/40 transition-all">
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-red-500/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-[12px] uppercase tracking-wider font-bold text-red-400/90">
                      Next Major Exam
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight truncate leading-snug">
                    Algèbre Linéaire
                  </h3>
                  <div className="mt-3 flex flex-col gap-1.5 text-[14px] text-zinc-200">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1.5 text-zinc-200 font-medium">
                        <iconify-icon icon="lucide:calendar" width="15" className="text-red-400/75" />
                        Samedi 9 Mai
                      </span>
                      <span className="text-zinc-400">•</span>
                      <span className="flex items-center gap-1.5 text-white font-semibold">
                        09:00 — 11:30
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-zinc-200 font-medium">
                      <iconify-icon icon="lucide:map-pin" width="15" className="text-red-400/75" />
                      Amphi 27
                    </span>
                  </div>
                </div>

                {/* Countdown Badge */}
                <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-red-500/15 border border-red-500/35 text-red-100">
                  <span className="text-2xl font-bold leading-none tracking-tight text-white">2d</span>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold text-red-300/90 mt-1.5">left</span>
                </div>
              </div>
            </div>
          )}

          {/* Today's Quick Note */}
          <div className="rounded-2xl border border-[#202026] bg-[#0c0c0f] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <iconify-icon icon="lucide:sticky-note" width="18" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Today's Quick Note</h3>
                  <span className="text-[12.5px] text-zinc-400">Auto-saved scratchpad</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Synced
              </span>
            </div>

            <textarea
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              rows={9}
              placeholder="Jot down quick reminders, questions for professors, or formulas for today..."
              className="w-full bg-[#121216] border border-[#25252c] rounded-xl p-4 text-[15px] text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-zinc-400 transition-colors resize-none leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between pt-1 text-[13px] text-zinc-400">
              <span>
                {quickNote.trim().length} chars
              </span>

              <div className="flex items-center gap-2">
                {quickNote && (
                  <button
                    type="button"
                    onClick={() => setQuickNote('')}
                    className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-[#181820] transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCopyNote}
                  className="px-3.5 py-1.5 rounded-lg bg-[#181820] hover:bg-[#22222a] text-zinc-200 hover:text-white border border-[#2b2b34] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                >
                  <iconify-icon
                    icon={copied ? 'lucide:check' : 'lucide:copy'}
                    width="14"
                    className={copied ? 'text-emerald-400' : ''}
                  />
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
