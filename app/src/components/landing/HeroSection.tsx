import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { CosmicVortexBackground } from './CosmicVortexBackground';

interface HeroSectionProps {
  onNavigateWork?: () => void;
  onNavigateContact?: () => void;
  onNavigateApp?: () => void;
}

const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar'];
const NAV_LINKS = ['Home', 'Work', 'Resume'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateWork,
  onNavigateContact,
  onNavigateApp,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Initialize HLS.js video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Track window scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cycle role every 2.0s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.0, stagger: 0.1, delay: 0.3 },
        '-=0.8'
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (link: string) => {
    setActiveTab(link);
    if (link === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === 'Work') {
      scrollToSection('selected-works');
      onNavigateWork?.();
    } else if (link === 'Resume') {
      scrollToSection('explorations');
    }
  };

  return (
    <div
      ref={heroContainerRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-bg text-text-primary px-4"
    >
      {/* Background HLS Video + Cosmic Vortex */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CosmicVortexBackground />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </div>

      {/* Floating Pill Navbar (fixed, floats at top center) */}
      <nav
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-auto"
      >
        <div
          className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-all duration-300 ${
            isScrolled ? 'shadow-md shadow-black/40 bg-surface/95 border-white/15' : ''
          }`}
        >
          {/* 1. Logo: 9x9 circle with accent gradient border (reverses direction on hover) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            tabIndex={0}
            aria-label="Home"
            className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-r from-[#89AACC] to-[#4E85BF] hover:from-[#4E85BF] hover:to-[#89AACC] transition-transform duration-300 hover:scale-110 cursor-pointer flex items-center justify-center shrink-0"
          >
            <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary select-none font-bold">
                JA
              </span>
            </div>
          </div>

          {/* 2. Divider: w-px h-5 bg-stroke mx-1 (hidden on mobile) */}
          <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

          {/* 3. Nav links: ["Home", "Work", "Resume"] */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeTab === link;
              return (
                <button
                  key={link}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer font-medium ${
                    isActive
                      ? 'text-text-primary bg-stroke/50 shadow-sm'
                      : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </div>

          {/* 4. Divider */}
          <div className="w-px h-5 bg-stroke mx-1" />

          {/* 5. "Say hi" button with accent gradient border behind on hover */}
          <button
            type="button"
            onClick={() => {
              scrollToSection('contact');
              onNavigateContact?.();
            }}
            className="relative group rounded-full p-[1.5px] cursor-pointer inline-flex items-center text-xs sm:text-sm"
          >
            {/* Absolute accent gradient border behind on hover */}
            <span
              className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"
              aria-hidden="true"
            />
            {/* Inner button pill */}
            <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full backdrop-blur-md bg-surface px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary group-hover:bg-surface/90 transition-colors">
              <span>Say hi</span>
              <span className="text-[13px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-24 md:pt-28 pb-16">
        {/* Eyebrow */}
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-body font-medium select-none">
          COLLECTION '26
        </div>

        {/* Name: text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 select-none">
          Michael Smith
        </h1>

        {/* Role line: "A {role} lives in Chicago." */}
        <p className="blur-in text-lg sm:text-xl md:text-2xl font-light text-muted mb-4">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block font-normal underline decoration-stroke/50 underline-offset-4"
          >
            {ROLES[roleIndex]}
          </span>{' '}
          lives in Chicago.
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed px-4">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons (inline-flex gap-4) */}
        <div className="blur-in inline-flex items-center gap-4 flex-wrap justify-center">
          {/* "See Works": Solid button. Default: bg-text-primary text-bg. Hover: bg-bg text-text-primary with accent gradient border ring */}
          <button
            type="button"
            onClick={() => scrollToSection('selected-works')}
            className="relative group rounded-full p-[2px] transition-all duration-300 hover:scale-105 cursor-pointer font-body font-medium text-sm"
          >
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <span className="relative z-10 block rounded-full px-7 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300 shadow-md">
              See Works
            </span>
          </button>

          {/* "Reach out...": Outlined button. Default: border-2 border-stroke bg-bg text-text-primary. Hover: border-transparent with accent gradient border ring */}
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="relative group rounded-full p-[2px] transition-all duration-300 hover:scale-105 cursor-pointer font-body font-medium text-sm"
          >
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <span className="relative z-10 block rounded-full px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent transition-colors duration-300">
              Reach out...
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        onClick={() => scrollToSection('selected-works')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer select-none group"
      >
        <span className="text-xs text-muted uppercase tracking-[0.2em] font-body group-hover:text-text-primary transition-colors">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="w-full h-4 bg-text-primary/90 animate-scroll-down rounded-full" />
        </div>
      </div>
    </div>
  );
};
