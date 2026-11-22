import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  rotation: string;
  image: string;
}

const EXPLORATIONS: ExplorationItem[] = [
  // Column 1 (Left)
  {
    id: 'exp-1',
    title: 'Neural Audio Visualizer',
    category: 'WEBGL EXPERIMENT #01',
    rotation: '-rotate-3',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-2',
    title: 'Fluid Typography Engine',
    category: 'KINETIC TYPE #02',
    rotation: 'rotate-2',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-3',
    title: 'Micro-interactions Kit',
    category: 'UI LAB #03',
    rotation: '-rotate-2',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
  // Column 2 (Right)
  {
    id: 'exp-4',
    title: 'WebGL Particle Field',
    category: 'SHADERS #04',
    rotation: 'rotate-3',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-5',
    title: 'Kinetic Type Lab',
    category: 'INTERACTION #05',
    rotation: '-rotate-4',
    image:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'exp-6',
    title: 'Procedural Geometry',
    category: 'GENERATIVE #06',
    rotation: 'rotate-2',
    image:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
  },
];

export const ExplorationsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinnedContent = pinnedContentRef.current;
    const colLeft = colLeftRef.current;
    const colRight = colRightRef.current;

    if (!container || !pinnedContent) return;

    const ctx = gsap.context(() => {
      // Pin center text during scroll
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedContent,
        pinSpacing: false,
      });

      // Parallax scroll animation on columns
      if (colLeft) {
        gsap.fromTo(
          colLeft,
          { y: 120 },
          {
            y: -180,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (colRight) {
        gsap.fromTo(
          colRight,
          { y: 240 },
          {
            y: -280,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const col1 = EXPLORATIONS.slice(0, 3);
  const col2 = EXPLORATIONS.slice(3, 6);

  return (
    <section
      ref={containerRef}
      id="explorations"
      className="relative min-h-[260vh] bg-bg overflow-hidden border-t border-stroke/30"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={pinnedContentRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none relative z-10"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center pointer-events-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-text-primary tracking-tight mb-4">
            Visual <span className="font-display italic">playground</span>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-sm mb-8 leading-relaxed">
            A curated collection of visual experiments, motion design, and algorithmic interfaces.
          </p>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="relative group rounded-full p-[1.5px] cursor-pointer text-xs sm:text-sm inline-flex items-center"
          >
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/90 backdrop-blur-md px-6 py-3 text-text-primary group-hover:bg-bg transition-colors font-medium">
              <span>Follow on Dribbble</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full flex justify-between pt-40 pb-40">
          {/* Column 1 (Left) */}
          <div
            ref={colLeftRef}
            className="w-[45%] md:w-[36%] flex flex-col gap-28 md:gap-40 items-start pointer-events-auto"
          >
            {col1.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden bg-surface border border-stroke p-3 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-text-primary/40 cursor-pointer ${item.rotation}`}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] text-muted font-mono uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-medium text-text-primary">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Right) */}
          <div
            ref={colRightRef}
            className="w-[45%] md:w-[36%] flex flex-col gap-28 md:gap-40 items-end pointer-events-auto pt-32"
          >
            {col2.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden bg-surface border border-stroke p-3 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-text-primary/40 cursor-pointer ${item.rotation}`}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] text-muted font-mono uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-medium text-text-primary">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal on Card Click */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden p-6 md:p-8 cursor-default"
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              ✕
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-80 object-cover rounded-2xl mb-6 border border-stroke/50"
            />
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              {selectedItem.category}
            </span>
            <h2 className="text-3xl font-display text-text-primary mt-1 mb-3">
              {selectedItem.title}
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Exploratory study examining interaction dynamics, fluid spatial transitions, and high-framerate rendering ergonomics.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
