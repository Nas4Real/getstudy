import React, { useEffect } from 'react';
import { HumanAiNavbar } from './HumanAiNavbar';
import { HumanAiHero } from './HumanAiHero';
import { HumanAiAdventure } from './HumanAiAdventure';
import { HumanAiChanging } from './HumanAiChanging';
import { HumanAiFooter } from './HumanAiFooter';

interface HumanAiLandingProps {
  onNavigateApp?: () => void;
}

export const HumanAiLanding: React.FC<HumanAiLandingProps> = ({ onNavigateApp }) => {
  useEffect(() => {
    // Set page title for this landing page
    const prevTitle = document.title;
    document.title = 'GetStudy — The Future of Preparation is Human + AI';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans antialiased selection:bg-[#00ea64] selection:text-black">
      {/* Fixed Sticky Header */}
      <HumanAiNavbar onNavigateApp={onNavigateApp} />

      {/* Hero Section */}
      <main>
        <HumanAiHero onNavigateApp={onNavigateApp} />

        {/* Section 2: Massive White Sheet Transition & Dual Adventure Cards */}
        <HumanAiAdventure onNavigateApp={onNavigateApp} />

        {/* Section 3: AI Changing Academic Development (Interactive Tabs & State) */}
        <HumanAiChanging onNavigateApp={onNavigateApp} />
      </main>

      {/* Footer */}
      <HumanAiFooter />
    </div>
  );
};

export default HumanAiLanding;
