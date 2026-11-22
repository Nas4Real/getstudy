import React from 'react';
import { motion } from 'framer-motion';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  colSpan: string;
  image: string;
}

const WORKS: WorkItem[] = [
  {
    id: 'work-1',
    title: 'Automotive Motion',
    category: '3D ART DIRECTION',
    colSpan: 'md:col-span-7',
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'work-2',
    title: 'Urban Architecture',
    category: 'SPATIAL DESIGN',
    colSpan: 'md:col-span-5',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'work-3',
    title: 'Human Perspective',
    category: 'CREATIVE DIRECTION',
    colSpan: 'md:col-span-5',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'work-4',
    title: 'Brand Identity',
    category: 'VISUAL SYSTEM',
    colSpan: 'md:col-span-7',
    image:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1400&q=80',
  },
];

export const SelectedWorksSection: React.FC = () => {
  return (
    <section id="selected-works" className="bg-bg py-16 md:py-24 relative z-10">
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
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* Desktop "View all work" button */}
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
                <span>View all work</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Bento Grid (alternate spans 7/5/5/7) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {WORKS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className={`${item.colSpan} relative bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto md:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end p-6 md:p-8`}
            >
              {/* Background Image with Zoom */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Halftone Overlay: 4x4px radial dots */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
                aria-hidden="true"
              />

              {/* Base Gradient Shadow for idle readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Idle Metadata at card bottom */}
              <div className="relative z-10 flex flex-col gap-1 transition-opacity duration-300 group-hover:opacity-10">
                <span className="text-xs text-muted uppercase tracking-wider font-mono">
                  {item.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-text-primary tracking-tight">
                  {item.title}
                </h3>
              </div>

              {/* Hover Overlay: bg-bg/70 + backdrop-blur-lg */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
                {/* Hover Label with Animated Gradient Border */}
                <div className="relative rounded-full p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-xl">
                  <span
                    className="absolute inset-0 rounded-full animate-gradient-shift accent-gradient"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black font-medium text-sm sm:text-base">
                    <span>View —</span>
                    <span className="font-display italic font-semibold text-lg">
                      {item.title}
                    </span>
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
