import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { CosmicVortexBackground } from './CosmicVortexBackground';

interface ContactFooterSectionProps {
  onNavigateApp?: () => void;
}

const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'GitHub', href: 'https://github.com' },
];

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Background video playback (flipped scale-y-[-1])
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // GSAP continuous marquee animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const anim = gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden text-text-primary z-10"
    >
      {/* Background Video (flipped vertically scale-y-[-1] with heavier overlay bg-black/60) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="transform scale-y-[-1] w-full h-full">
          <CosmicVortexBackground />
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* GSAP Marquee: "BUILDING THE FUTURE • " repeated 10x */}
        <div className="overflow-hidden py-6 border-t border-b border-stroke/40 select-none mb-16 md:mb-20">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap will-change-transform text-4xl sm:text-6xl md:text-8xl font-display italic tracking-tight text-text-primary/20 hover:text-text-primary/40 transition-colors"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="inline-block mr-12 shrink-0">
                BUILDING THE FUTURE •
              </span>
            ))}
          </div>
        </div>

        {/* CTA Center */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Get In Touch
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight mb-8">
            Let's build something <span className="font-display italic">extraordinary</span> together.
          </h2>

          {/* Email button: mailto:hello@michaelsmith.com with gradient hover border ring */}
          <a
            href="mailto:hello@michaelsmith.com"
            className="relative group rounded-full p-[2px] cursor-pointer inline-flex items-center text-base sm:text-lg transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
              aria-hidden="true"
            />
            <span className="relative z-10 inline-flex items-center gap-3 rounded-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary px-8 py-4 font-medium transition-colors duration-300 shadow-xl">
              <span>hello@michaelsmith.com</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </span>
          </a>
        </div>

        {/* Footer Bar: Social links + Green pulsing dot + "Available for projects" */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke/40 text-xs sm:text-sm text-muted">
          {/* Social links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Availability Status */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium text-text-primary/80">Available for projects</span>
          </div>

          {/* Copyright */}
          <div className="text-muted/60 font-mono text-xs">
            © 2026 Michael Smith. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
