import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter from 000 to 100 over 2700ms using requestAnimationFrame
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2700;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        // 400ms delay after reaching 100 before calling onComplete
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Center words cycling every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden"
      onClick={onComplete}
      role="status"
      aria-label="Loading Screen"
    >
      {/* Top-left: "Portfolio" label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-xs text-muted uppercase tracking-[0.3em] font-body"
      >
        Portfolio
      </motion.div>

      {/* Center: Rotating words cycling every 900ms with AnimatePresence */}
      <div className="flex-1 flex items-center justify-center relative min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 tracking-tight"
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom area: Counter display on right */}
      <div className="flex items-end justify-end mb-4">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none tracking-tight">
          {String(count).padStart(3, '0')}
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[3px] bg-stroke/50 overflow-hidden">
        <div
          className="h-full accent-gradient origin-left transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </div>
  );
};
