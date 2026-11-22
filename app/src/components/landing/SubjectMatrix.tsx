import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatexMath } from '../common/LatexMath';

interface SubjectInfo {
  id: string;
  name: string;
  code: string;
  accent: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  coeff: string;
  description: string;
  chapters: { title: string; difficulty: 'Mastered' | 'Intermediate' | 'Weak'; progress: number }[];
  featuredLatex: string;
  latexLabel: string;
}

const SUBJECTS_DATA: SubjectInfo[] = [
  {
    id: 'analyse',
    name: 'Analyse Réelle & Complexe',
    code: 'ANA',
    accent: '#06b6d4',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    coeff: 'Coeff 6 • DS 3 & Écrit',
    description: 'Séries numériques, espaces vectoriels normés, intégrales généralisées et équations différentielles.',
    chapters: [
      { title: 'Séries Numériques & Critères de Convergence', difficulty: 'Mastered', progress: 100 },
      { title: 'Suites & Séries de Fonctions', difficulty: 'Intermediate', progress: 75 },
      { title: 'Séries Entières & Rayon de Convergence', difficulty: 'Intermediate', progress: 65 },
      { title: 'Intégrales sur un Intervalle Quelconque', difficulty: 'Weak', progress: 35 },
    ],
    featuredLatex: '\\int_0^{+\\infty} e^{-t} t^{x-1} \\, dt = \\Gamma(x) \\quad (\\text{pour } x > 0)',
    latexLabel: 'Fonction Gamma d\'Euler & Continuité',
  },
  {
    id: 'algebre',
    name: 'Algèbre Linéaire & Bilinéaire',
    code: 'ALG',
    accent: '#ec4899',
    badgeBg: 'bg-pink-500/10',
    badgeBorder: 'border-pink-500/30',
    badgeText: 'text-pink-400',
    coeff: 'Coeff 6 • DS 3 & Écrit',
    description: 'Espaces vectoriels, applications linéaires, matrices, diagonalisation, trigonalisation et espaces euclidiens.',
    chapters: [
      { title: 'Espaces Vectoriels & Sous-espaces Propres', difficulty: 'Mastered', progress: 100 },
      { title: 'Applications Linéaires & Théorème du Rang', difficulty: 'Mastered', progress: 95 },
      { title: 'Diagonalisation & Polynôme Annulateur', difficulty: 'Intermediate', progress: 70 },
      { title: 'Espaces Préhilbertiens & Endomorphismes Symétriques', difficulty: 'Weak', progress: 40 },
    ],
    featuredLatex: '\\chi_A(\\lambda) = \\det(A - \\lambda I_n) = (-1)^n \\prod_{i=1}^p (\\lambda - \\lambda_i)^{m_i}',
    latexLabel: 'Polynôme Caractéristique & Multiplicité Algébrique',
  },
  {
    id: 'physique',
    name: 'Physique & Électromagnétisme',
    code: 'PHY',
    accent: '#10b981',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    coeff: 'Coeff 5 • DS 2 & Concours',
    description: 'Électromagnétisme dans le vide, induction de Faraday, thermodynamique des systèmes ouverts et optique ondulatoire.',
    chapters: [
      { title: 'Équations de Maxwell dans le Vide', difficulty: 'Mastered', progress: 95 },
      { title: 'Induction Électromagnétique & Loi de Lenz', difficulty: 'Intermediate', progress: 80 },
      { title: 'Thermodynamique des Machines Thermiques', difficulty: 'Intermediate', progress: 60 },
      { title: 'Interférences & Diffraction à l\'Infini', difficulty: 'Weak', progress: 30 },
    ],
    featuredLatex: '\\mathbf{\\nabla} \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}, \\quad \\mathbf{\\nabla} \\cdot \\mathbf{B} = 0, \\quad \\mathbf{\\nabla} \\times \\mathbf{B} = \\mu_0 \\mathbf{j} + \\mu_0\\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}',
    latexLabel: 'Équations Fondamentales de Maxwell',
  },
  {
    id: 'informatique',
    name: 'Informatique & Algorithmique',
    code: 'INFO',
    accent: '#c084fc',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-400',
    coeff: 'Coeff 3 • TP & Épreuve Modélisation',
    description: 'Algorithmes de graphes, programmation dynamique, bases de données relationnelles (SQL) et complexité asymptotique.',
    chapters: [
      { title: 'Parcours de Graphes (BFS, DFS, Dijkstra)', difficulty: 'Mastered', progress: 100 },
      { title: 'Programmation Dynamique & Mémoïsation', difficulty: 'Intermediate', progress: 85 },
      { title: 'Arbres Binaires de Recherche & Tas', difficulty: 'Intermediate', progress: 75 },
      { title: 'Algorithmes Gloutons & Sac à Dos', difficulty: 'Intermediate', progress: 65 },
    ],
    featuredLatex: 'T(n) = a \\, T(n/b) + f(n) \\implies T(n) = \\Theta(n^{\\log_b a}) \\quad (\\text{Master Theorem})',
    latexLabel: 'Complexité Asymptotique des Récurrences',
  },
];

export const SubjectMatrix: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<SubjectInfo>(SUBJECTS_DATA[0]);

  return (
    <section id="curriculum" className="relative w-full max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8 bg-black overflow-hidden border-t border-neutral-900">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
            Discipline-Chromatic Wayfinding
          </span>
        </h2>
        <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Permanent color beaconing ensures instant orientation. Every subject maps its chapters,
          tutorial problem sheets, and exam coefficients without mental friction.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
        {SUBJECTS_DATA.map((subject) => {
          const isActive = activeSubject.id === subject.id;
          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => setActiveSubject(subject)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? `${subject.badgeBg} ${subject.badgeBorder} ${subject.badgeText} shadow-md`
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: subject.accent }}
              />
              <span>{subject.name.split(' ')[0]}</span>
              <span className="text-[10px] font-mono opacity-60">({subject.code})</span>
            </button>
          );
        })}
      </div>

      {/* Subject Detail Showcase Card */}
      <div className="relative rounded-3xl bg-neutral-950/80 border border-neutral-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow Accent Backdrop */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-15 pointer-events-none blur-3xl transition-colors duration-700"
          style={{ backgroundColor: activeSubject.accent }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column (5 cols): Overview & Chapters Roadmap */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${activeSubject.badgeBg} ${activeSubject.badgeBorder} ${activeSubject.badgeText}`}>
                    {activeSubject.coeff}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {activeSubject.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                  {activeSubject.description}
                </p>

                {/* Chapter Progression List */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Syllabus Mastery Roadmap
                  </div>
                  {activeSubject.chapters.map((ch, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-xs font-mono text-neutral-500 font-bold">
                          0{i + 1}
                        </span>
                        <span className="text-xs font-medium text-neutral-200 truncate">
                          {ch.title}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 font-bold ${
                          ch.difficulty === 'Mastered'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : ch.difficulty === 'Intermediate'
                            ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/15 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {ch.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Native KaTeX Typesetting Showcase */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#09090b] border border-neutral-800">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Formula-Native LaTeX Renderer
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-full">
                    KaTeX AMS Standard
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {activeSubject.latexLabel}
                </h4>
                <div className="my-6 p-6 sm:p-8 rounded-xl bg-[#030303] border border-neutral-800/90 text-center text-white text-base sm:text-lg overflow-x-auto shadow-inner">
                  <LatexMath math={activeSubject.featuredLatex} displayMode />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
                <span>Integrated across flashcards, notes & chat</span>
                <span className="text-white font-medium">Zero ASCII approximations ✓</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
