import React from 'react';
import { motion } from 'framer-motion';

interface JournalEntry {
  id: string;
  title: string;
  readTime: string;
  date: string;
  image: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'journal-1',
    title: 'Designing for Spatial Computing: Nuance & Depth',
    readTime: '5 min read',
    date: 'Apr 2026',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'journal-2',
    title: 'The Future of Generative Interfaces & Intent Models',
    readTime: '4 min read',
    date: 'Mar 2026',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'journal-3',
    title: 'Building Micro-interactions at Scale in Modern Web Apps',
    readTime: '7 min read',
    date: 'Feb 2026',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'journal-4',
    title: 'Typography as Architecture: Structural Editorial Systems',
    readTime: '6 min read',
    date: 'Jan 2026',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=300&q=80',
  },
];

export const JournalSection: React.FC = () => {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative z-10 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 pb-8 border-b border-stroke/40"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                Journal
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              Reflections on design, technology, and the intersection of physical and digital worlds.
            </p>
          </div>

          {/* Desktop "View all" button */}
          <div className="hidden md:inline-flex">
            <button
              type="button"
              className="relative group rounded-full p-[1.5px] cursor-pointer inline-flex items-center text-xs"
            >
              <span
                className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
                aria-hidden="true"
              />
              <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-text-primary group-hover:bg-surface/90 transition-colors">
                <span>View all thoughts</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* 4 journal entries displayed as horizontal pills */}
        <div className="flex flex-col gap-4">
          {JOURNAL_ENTRIES.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <img
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 border border-stroke group-hover:scale-105 transition-transform duration-300"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-white transition-colors">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted mt-1 font-mono">
                    <span>{entry.readTime}</span>
                    <span>•</span>
                    <span>{entry.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center pr-2">
                <div className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-text-primary/40 transition-colors">
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
