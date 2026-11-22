import React, { useState } from 'react';
import { Fingerprint, Sparkles, Check } from 'lucide-react';

interface HumanAiHeroProps {
  onNavigateApp?: () => void;
}

export const HumanAiHero: React.FC<HumanAiHeroProps> = ({ onNavigateApp }) => {
  const [cookieAccepted, setCookieAccepted] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-[92vh] pt-32 sm:pt-40 pb-20 flex flex-col justify-between items-center bg-black overflow-hidden">
      {/* Subtle Background Glow behind the hero */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center">
        {/* Massive 3-Line Stacked Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] select-none text-center">
          <span className="block text-[#475569] font-extrabold transition-colors">
            The future
          </span>
          <span className="block text-[#475569] font-extrabold transition-colors">
            of preparation
          </span>
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2 mt-2">
            <span className="text-[#475569] font-extrabold">is</span>
            
            {/* Human with Emerald Fingerprint Glyph */}
            <span className="inline-flex items-center gap-2 sm:gap-3 text-white font-extrabold">
              <span className="relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-[#00ea64] shadow-[0_0_30px_rgba(0,234,100,0.45)]">
                <Fingerprint className="w-8 h-8 sm:w-11 sm:h-11 stroke-[2.3]" />
              </span>
              <span className="text-white">human</span>
            </span>

            <span className="text-white font-light text-4xl sm:text-6xl mx-0.5 sm:mx-1">+</span>

            {/* AI with Emerald Sparkles Glyph */}
            <span className="inline-flex items-center gap-2 sm:gap-3 text-white font-extrabold">
              <span className="relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-[#00ea64] shadow-[0_0_30px_rgba(0,234,100,0.45)]">
                <Sparkles className="w-8 h-8 sm:w-11 sm:h-11 fill-[#00ea64]/20 stroke-[2.3]" />
              </span>
              <span className="text-white">AI</span>
            </span>
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
          We help you map the syllabus you need, track the concepts you have, and close your gaps to thrive in a high-stakes concours environment.
        </p>

        {/* Hero CTA Button with Emerald Underglow */}
        <div className="mt-10 sm:mt-12 relative">
          <div 
            className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-[#00ea64] rounded-2xl blur-lg opacity-40 group-hover:opacity-80 transition duration-300"
            aria-hidden="true" 
          />
          <button
            type="button"
            onClick={onNavigateApp}
            className="relative px-8 sm:px-10 py-4 rounded-xl bg-zinc-950 hover:bg-black text-white text-base sm:text-lg font-semibold border border-emerald-500/40 shadow-[0_12px_36px_rgba(0,234,100,0.25)] hover:border-emerald-400 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Join The Community
          </button>
        </div>
      </div>

      {/* Floating Cookie Consent Bar (from frame_0.0s.png) */}
      {!cookieAccepted && (
        <div className="w-full max-w-3xl mx-auto px-4 mt-16 sm:mt-24 z-20">
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400 leading-relaxed text-center sm:text-left">
              We set essential cookies to help run our study platform and services. By clicking Accept, you consent to academic performance tracking. Read more in our{' '}
              <a href="#privacy" className="text-[#00ea64] underline hover:text-emerald-300">
                Cookie Policy
              </a>
              .
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCookieAccepted(true)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setCookieAccepted(true)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-black bg-[#00ea64] hover:bg-[#05f06a] transition-all cursor-pointer flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Accept</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
