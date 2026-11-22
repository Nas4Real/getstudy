import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { CTA } from './CTA';
import { Footer } from './Footer';

interface CryptgenLandingProps {
  onNavigateApp?: () => void;
}

export const CryptgenLanding: React.FC<CryptgenLandingProps> = ({ onNavigateApp }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white font-sans selection:bg-cyan-500 selection:text-black antialiased overflow-x-hidden">
      {/* 1. Floating Glassmorphism Navbar */}
      <Navbar onNavigateApp={onNavigateApp} />

      {/* 2. Hero Section with Live Academic Cockpit Mockup */}
      <Hero onNavigateApp={onNavigateApp} />

      {/* 3. Three Core Academic Engines */}
      <Features />

      {/* 4. Cyber Chamfered Final CTA Banner */}
      <CTA onNavigateApp={onNavigateApp} />

      {/* 5. Clean Minimal Footer */}
      <Footer />
    </div>
  );
};
