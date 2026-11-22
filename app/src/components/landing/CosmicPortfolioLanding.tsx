import React, { useState } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { HeroSection } from './HeroSection';
import { SelectedWorksSection } from './SelectedWorksSection';
import { JournalSection } from './JournalSection';
import { ExplorationsSection } from './ExplorationsSection';
import { StatsSection } from './StatsSection';
import { ContactFooterSection } from './ContactFooterSection';

interface CosmicPortfolioLandingProps {
  onNavigateApp?: () => void;
}

export const CosmicPortfolioLanding: React.FC<CosmicPortfolioLandingProps> = ({
  onNavigateApp,
}) => {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loading screen once per session to avoid annoying refresh loop, or show if requested
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.has('noload') || p.has('skip')) return false;
      const seen = sessionStorage.getItem('portfolio_loaded');
      if (seen) return false;
      sessionStorage.setItem('portfolio_loaded', 'true');
      return true;
    }
    return false;
  });

  return (
    <div className="min-h-screen w-full bg-bg text-text-primary font-body antialiased selection:bg-[#4E85BF] selection:text-white overflow-x-hidden">
      {/* 1. Full-screen Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Hero Section with Background Video + Centered Content */}
      <HeroSection
        onNavigateWork={() => {
          const el = document.getElementById('selected-works');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateContact={() => {
          const el = document.getElementById('contact');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateApp={onNavigateApp}
      />

      {/* 3. Selected Works Section (Bento Grid) */}
      <SelectedWorksSection />

      {/* 4. Journal / Recent Thoughts Section */}
      <JournalSection />

      {/* 5. Explorations Section (Parallax Gallery) */}
      <ExplorationsSection />

      {/* 6. Stats & Key Metrics */}
      <StatsSection />

      {/* 7. Contact & Footer Section (Inverted Video + Marquee + Socials) */}
      <ContactFooterSection onNavigateApp={onNavigateApp} />
    </div>
  );
};
