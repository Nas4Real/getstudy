import React from 'react';
import type { ExamData, TaskData } from '../../types';

interface UpcomingAssignmentsProps {
  onSelectExam: (exam: ExamData) => void;
  onSelectTask?: (task: TaskData) => void;
  onViewAllTasks: () => void;
  mockEmpty?: boolean;
}

export const UpcomingAssignments: React.FC<UpcomingAssignmentsProps> = ({
  onSelectExam,
  onViewAllTasks,
  mockEmpty = false,
}) => {
  const exams: ExamData[] = mockEmpty ? [] : [
    {
      id: 'exam-1',
      title: 'DS 3 : Algèbre Linéaire',
      subject: 'Algèbre',
      subjectColor: '#ef4444',
      boxColor: '#ef4444',
      type: 'DS',
      date: 'Friday, Oct 18, 2026',
      time: '08:00 AM - 11:00 AM',
      room: 'Amphi Schwartz',
      timeAndPlace: 'Friday, Oct 18 • 08:00 AM • Amphi Schwartz',
      countdown: 'In 2 days',
      isUrgent: true,
      dueDate: 'Friday, Oct 18 • 08:00 - 11:00 (In 2 days)',
      priority: 'High',
      coefficient: 4,
      duration: '3 Hours',
      allowedMaterial: 'No calculator allowed • Rough paper provided',
      formatGuidelines: [
        '3h00 Written Exam',
        'Coefficient 4',
        '2 Independent Problems',
        '1 Course Restitution Question',
      ],
      description:
        'Major 3-hour examination covering the foundational linear algebra curriculum: Vector spaces, endomorphisms, eigenvalues, polynomial reduction techniques, and diagonalization. Precision in theorem conditions and rigorous drafting expected.',
      chapters: [
        {
          number: 4,
          title: 'Espaces Vectoriels & Applications Linéaires',
          level: 'mastered',
          difficulty: 'Medium',
          topics: ['Sous-espaces stables', 'Théorème du rang', 'Isomorphismes & Noyaux'],
        },
        {
          number: 5,
          title: 'Réduction des Endomorphismes & Valeurs Propres',
          level: 'intermediate',
          difficulty: 'Hard',
          topics: ['Spectre & Sous-espaces propres', 'Multiplicité algébrique/géométrique', 'Trigonalisation'],
        },
        {
          number: 6,
          title: 'Polynômes Caractéristiques & Diagonalisation',
          level: 'intermediate',
          difficulty: 'Hard',
          topics: ['Polynôme minimal', 'Théorème de Cayley-Hamilton', 'Critères de diagonalisation'],
        },
        {
          number: 7,
          title: 'Espaces Euclidiens & Produits Scalaires',
          level: 'beginner',
          difficulty: 'Medium',
          topics: ['Procédé de Gram-Schmidt', 'Adjoint & matrices orthogonales'],
        },
      ],
      subtasks: [
        { text: 'Review theorem proofs on Cayley-Hamilton & Minimal Polynomial', completed: true },
        { text: 'Solve 2024 Concours Blanc problem 2 on cyclic endomorphisms', completed: false },
        { text: 'Synthesize Gram-Schmidt orthonormalization algorithmic steps', completed: false },
      ],
    },
    {
      id: 'exam-2',
      title: 'Contrôle Continu : Électromagnétisme',
      subject: 'Physique',
      subjectColor: '#10b981',
      type: 'Contrôle Continu',
      date: 'Tuesday, Oct 22, 2026',
      time: '14:00 PM - 16:00 PM',
      room: 'Salle 104',
      timeAndPlace: 'Tuesday, Oct 22 • 14:00 PM • Salle 104',
      countdown: 'In 6 days',
      isUrgent: false,
      dueDate: 'Tuesday, Oct 22 • 14:00 - 16:00 (In 6 days)',
      priority: 'Medium',
      coefficient: 3,
      duration: '2 Hours',
      allowedMaterial: 'Standard scientific calculator • 1 handwritten A4 formula sheet',
      formatGuidelines: [
        '2h00 Midterm Exam',
        'Coefficient 3',
        'Problem 1: Electrostatic shielding',
        'Problem 2: Poynting vector & energy flow',
      ],
      description:
        '2-hour midterm test focusing on Maxwell equations in differential & integral form, electrostatic boundary conditions, coaxial wave propagation, and electromagnetic energy density transfer.',
      chapters: [
        {
          number: 3,
          title: 'Équations de Maxwell dans le Vide & Symétries',
          level: 'mastered',
          difficulty: 'Medium',
          topics: ['Loi de Gauss & Ampère-Maxwell', 'Invariance par translation & rotation', 'Jauge de Coulomb'],
        },
        {
          number: 4,
          title: 'Électrostatique, Potentiels & Équation de Poisson',
          level: 'mastered',
          difficulty: 'Easy',
          topics: ['Équations de Laplace-Poisson', 'Conditions aux limites', 'Capacités réparties'],
        },
        {
          number: 5,
          title: 'Vecteur de Poynting & Bilan Énergétique',
          level: 'intermediate',
          difficulty: 'Hard',
          topics: ['Densité volumique d’énergie', 'Théorème de Poynting', 'Ondes planes progressives'],
        },
      ],
      subtasks: [
        { text: 'Derive coaxial cable capacitance and Poisson equation', completed: true },
        { text: 'Review Poynting theorem conservation proof and boundary transitions', completed: true },
        { text: 'Solve past exam exercise on cylindrical waveguide attenuation', completed: false },
      ],
    },
    {
      id: 'exam-3',
      title: 'Colle : Séries & Intégrales',
      subject: 'Analyse',
      subjectColor: '#06b6d4',
      type: 'Colle Oral Test',
      date: 'Monday, Oct 28, 2026',
      time: '17:00 PM - 18:00 PM',
      room: 'Bureau 12 • Prof. Laurent Schwartz',
      timeAndPlace: 'Monday, Oct 28 • 17:00 PM • Bureau 12',
      countdown: 'In 12 days',
      isUrgent: false,
      dueDate: 'Monday, Oct 28 • 17:00 (Oral Test)',
      priority: 'Medium',
      coefficient: 2,
      duration: '1 Hour (Oral)',
      allowedMaterial: 'Board presentation • 15 min preparation on paper',
      formatGuidelines: [
        '1h00 Board Examination',
        '15 min Course Question (No notes)',
        '2 Exercises with progressive hints',
      ],
      description:
        'Oral board interrogation on improper integrals, uniform convergence, dominated convergence theorem, and Fourier series approximations. Strict justification of limit inversion required.',
      chapters: [
        {
          number: 2,
          title: 'Intégrales Généralisées & Intégrales à Paramètres',
          level: 'intermediate',
          difficulty: 'Hard',
          topics: ['Critères de Riemann & Bertrand', 'Théorème de convergence dominée', 'Intégrales dépendant d’un paramètre'],
        },
        {
          number: 3,
          title: 'Séries Numériques & Séries de Fonctions',
          level: 'mastered',
          difficulty: 'Medium',
          topics: ['Règle de d’Alembert & Cauchy', 'Rayon de convergence', 'Séries alternées'],
        },
        {
          number: 4,
          title: 'Convergence Uniforme & Continuité de la Limite',
          level: 'beginner',
          difficulty: 'Hard',
          topics: ['Norme infinie', 'Théorème de dérivation sous le signe somme', 'Intégration terme à terme'],
        },
      ],
      subtasks: [
        { text: 'Memorize Weierstrass M-test and Dominated Convergence proofs', completed: false },
        { text: 'Practice 3 board exercises on Euler Gamma integral calculation', completed: false },
      ],
    },
    {
      id: 'exam-4',
      title: 'Devoir Maison : Mécanique Analytique',
      subject: 'Mécanique',
      subjectColor: '#3b82f6',
      type: 'Devoir Maison (DM)',
      date: 'Thursday, Nov 02, 2026',
      time: '18:00 PM Deadline',
      room: 'Online Submission • ENT',
      timeAndPlace: 'Thursday, Nov 02 • 18:00 PM • ENT',
      countdown: 'In 16 days',
      isUrgent: false,
      dueDate: 'Thursday, Nov 02 • 18:00 (In 16 days)',
      priority: 'Low',
      coefficient: 2,
      duration: 'Take-home',
      allowedMaterial: 'All course documentation allowed',
      formatGuidelines: [
        'Lagrangian & Hamiltonian formulations',
        '2 Independent problems on pendulum dynamics',
      ],
      description:
        'Comprehensive take-home problem set on Euler-Lagrange equations, generalized coordinates, cyclic variables, and Noether conservation laws.',
      chapters: [
        {
          number: 1,
          title: 'Principe de Moindre Action & Lagrangien',
          level: 'intermediate',
          difficulty: 'Medium',
          topics: ['Coordonnées généralisées', 'Équations d’Euler-Lagrange', 'Invariance'],
        },
      ],
      subtasks: [
        { text: 'Set up generalized coordinates and velocity vectors', completed: true },
        { text: 'Derive Euler-Lagrange differential equations', completed: false },
      ],
    },
  ];

  return (
    <section className="bg-[#101012] border border-[#25252b] rounded-[24px] p-6 sm:p-7 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight shrink-0 whitespace-nowrap">
            Exams & Tests
          </h2>
          {exams.length === 0 ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1b1b20] text-zinc-400 border border-[#2c2c34] shrink-0 tabular-nums">
              0 Upcoming
            </span>
          ) : (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1b1b20] text-zinc-300 border border-[#2c2c34] shrink-0 tabular-nums">
              {exams.length} Upcoming
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onViewAllTasks}
          className="text-xs sm:text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          View All
        </button>
      </div>

      {/* Clean list */}
      {exams.length === 0 ? (
        <div className="py-12 sm:py-14 px-6 text-center flex flex-col items-center justify-center bg-[#141418] border border-[#27272e] rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#1b1b21] border border-[#2c2c36] flex items-center justify-center text-zinc-300 mb-4 shadow-inner">
            <iconify-icon icon="lucide:award" width="26" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">No upcoming exams</h3>
          <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
            No exams or major assessments scheduled in the near future. Keep reviewing your course chapters.
          </p>
          <button
            type="button"
            onClick={onViewAllTasks}
            className="px-6 py-2.5 rounded-full bg-[#1a1a20] hover:bg-[#24242c] text-zinc-100 hover:text-white border border-zinc-700/80 hover:border-zinc-500 text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95"
          >
            <iconify-icon icon="lucide:calendar-days" width="16" />
            <span>Open Calendar</span>
          </button>
        </div>
      ) : (
        /* MINIMAL ROWS: Clean, divided list with zero nested box fatigue */
        <div className="divide-y divide-[#1e1e24] flex flex-col">
          {exams.map((exam) => (
            <button
              key={exam.id}
              type="button"
              onClick={() => onSelectExam(exam)}
              className="w-full text-left py-4 sm:py-4.5 px-3.5 sm:px-4 rounded-xl hover:bg-[#16161c] transition-all cursor-pointer group flex items-start justify-between gap-3.5 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {/* Subject Pip */}
                <span
                  className="w-3 h-3 rounded-full mt-1.5 shrink-0 ring-4 ring-black/40"
                  style={{ backgroundColor: exam.subjectColor }}
                  title={exam.subject}
                />

                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  {/* Title */}
                  <h3 className="text-[15.5px] sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug tracking-tight">
                    {exam.title}
                  </h3>

                  {/* Metadata Subline: Subject • Date • Time • Room */}
                  <div className="flex items-center gap-2 text-[13px] sm:text-[13.5px] text-zinc-400 flex-wrap">
                    <span className="text-zinc-200 font-semibold">{exam.subject}</span>
                    <span className="text-textSubtle">•</span>
                    <span className="text-zinc-300 font-medium tabular-nums">
                      {exam.date.replace(', 2026', '')}
                    </span>
                    <span className="text-textSubtle">•</span>
                    <span className="tabular-nums text-zinc-400">
                      {exam.time.replace(/ AM(?=.*-)/, '').replace(/ PM(?=.*-)/, '')}
                    </span>
                    {exam.room && (
                      <span className="text-zinc-400 flex items-center gap-1.5 ml-0.5">
                        <iconify-icon icon="lucide:map-pin" width="13" className="text-textSubtle shrink-0" />
                        <span>{exam.room.split('•')[0].trim()}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Urgency Pill on Right */}
              <span
                className={`text-xs sm:text-[12.5px] font-bold px-3 py-1 rounded-full shrink-0 tabular-nums mt-0.5 ${
                  exam.isUrgent
                    ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                    : 'bg-[#1b1b22] text-zinc-300 border border-[#2c2c36]'
                }`}
              >
                {exam.countdown}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
