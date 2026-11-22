import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'How is GetStudy different from generic tools like Notion, Anki, or Google Calendar?',
    answer:
      'Generic productivity tools treat all tasks as flat text notes. GetStudy is engineered natively around STEM academic reality: timetable slots bind directly to syllabus chapters, formulas render with native KaTeX, and our AI co-pilot automatically schedules revision blocks into your calendar when exams approach without manual copying.',
  },
  {
    question: 'Does GetStudy natively support LaTeX formulas and KaTeX rendering?',
    answer:
      'Yes, seamlessly. Mathematical expressions are typeset natively via KaTeX across all flashcards, exercise notes, AI assistant prompts, and syllabus chapters—supporting matrices, differential equations, integrals, summation operators, and vector spaces.',
  },
  {
    question: 'How does the AI Assistant schedule study blocks into my calendar?',
    answer:
      'Unlike chat-only bots, the GetStudy AI Co-pilot has direct action hooks into your workspace. When you ask it to plan revision for an upcoming DS, it breaks down tutorial problem sets and schedules prioritized study blocks directly into your calendar without leaving your flow.',
  },
  {
    question: 'Is GetStudy suitable for French CPGE (MPSI, PCSI, MP, PSI) and international engineering programs?',
    answer:
      'Yes. The curriculum hierarchy was purpose-built for intense preparatory programs: DS countdown timers, tutorial sheet (TD) decomposition, coefficient weightings, and multi-tier chapter mastery levels.',
  },
  {
    question: 'Can I use GetStudy offline during library revision sessions?',
    answer:
      'Absolutely. Your timetable, tasks, flashcards, and notes are cached locally in your browser so you can maintain uninterrupted focus even in library basements with poor connectivity.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full max-w-7xl mx-auto py-20 px-4 md:px-8 bg-black overflow-hidden border-t border-neutral-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
            Frequently Answered Questions
          </span>
        </h2>
        <p className="text-sm md:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed">
          Everything you need to know about our academic engines, formula typesetting,
          and timetable conflict resolution.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-3xl mx-auto divide-y divide-neutral-800">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-6 transition-colors">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-medium text-white group-hover:text-cyan-400 transition-colors pr-4">
                  {faq.question}
                </span>
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-white border-neutral-500' : ''
                  }`}
                >
                  ↓
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
