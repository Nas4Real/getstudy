import React from 'react';
import { motion } from 'framer-motion';

const INSTITUTIONS = [
  { name: 'MPSI / PCSI • CPGE', label: 'Classes Préparatoires' },
  { name: 'ÉCOLE POLYTECHNIQUE', label: 'L\'X Ingénierie' },
  { name: 'CENTRALESUPÉLEC', label: 'Grandes Écoles' },
  { name: 'MIT STEM & EECS', label: 'Computer Science' },
  { name: 'OXFORD MATHEMATICS', label: 'Mathematical Institute' },
  { name: 'SORBONNE UNIVERSITÉ', label: 'Faculté des Sciences' },
];

export const LogosCloud: React.FC = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-black overflow-hidden border-t border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3"
        >
          <span className="bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent">
            Engineered for Rigorous Higher Education Programs
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-12"
        >
          Scholars across premier preparatory tracks and top STEM universities rely on GetStudy OS
          to tame heavy problem set volumes and exam crunch phases.
        </motion.p>

        {/* Institutional Monograms Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto items-center justify-items-center">
          {INSTITUTIONS.map((inst, idx) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="w-full p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 flex flex-col items-center justify-center text-center group hover:border-neutral-600 hover:bg-neutral-900/80 transition-all cursor-default"
            >
              <span className="font-mono text-xs font-bold text-neutral-300 tracking-tight group-hover:text-white transition-colors">
                {inst.name}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono mt-0.5">
                {inst.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
