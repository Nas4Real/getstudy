import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  {
    value: '20+',
    label: 'Years Experience',
    description: 'Deep craft in human-computer interfaces, design systems, and creative direction.',
  },
  {
    value: '95+',
    label: 'Projects Done',
    description: 'Launched across fintech, generative AI, automotive, and high-performance developer tools.',
  },
  {
    value: '200%',
    label: 'Satisfied Clients',
    description: 'Delivering beyond expectation with obsessive care for typography, motion, and code quality.',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="bg-bg py-20 md:py-28 relative z-10 border-t border-b border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="text-6xl sm:text-7xl md:text-8xl font-display italic text-text-primary tracking-tight leading-none mb-3 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-text-primary mb-2">
                {stat.label}
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-xs leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
