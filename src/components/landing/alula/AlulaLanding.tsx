import React, { useState, useCallback } from 'react';
import { AlulaNavbar } from './AlulaNavbar';
import { AlulaHero } from './AlulaHero';
import { AlulaFeatures } from './AlulaFeatures';
import { AlulaCopilot } from './AlulaCopilot';
import { AlulaViewShowcase } from './AlulaViewShowcase';
import { AlulaPreFooter } from './AlulaPreFooter';
import { AlulaFooter } from './AlulaFooter';
import { AlulaAuthModal } from './AlulaAuthModal';

interface AlulaLandingProps {
  onNavigateApp?: () => void;
}

export const AlulaLanding: React.FC<AlulaLandingProps> = ({ onNavigateApp }) => {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const auth = p.get('auth') || p.get('modal') || '';
      if (auth === 'signup' || auth === 'register') return { isOpen: true, mode: 'signup' };
      if (auth === 'signin' || auth === 'login') return { isOpen: true, mode: 'signin' };
    }
    return { isOpen: false, mode: 'signin' };
  });

  const handleOpenAuth = useCallback((mode: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('auth', mode === 'signin' ? 'login' : 'signup');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleCloseAuth = useCallback(() => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('auth');
      url.searchParams.delete('modal');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleAuthSuccess = useCallback(() => {
    handleCloseAuth();
    onNavigateApp?.();
  }, [handleCloseAuth, onNavigateApp]);

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white font-jakarta selection:bg-white selection:text-black antialiased overflow-x-hidden">
      {/* 1. Substantive & Clear Navbar */}
      <AlulaNavbar onNavigateApp={onNavigateApp} onOpenAuth={handleOpenAuth} />

      {/* 2. Spacious Editorial Hero */}
      <AlulaHero onNavigateApp={onNavigateApp} onOpenAuth={handleOpenAuth} />

      {/* 3. Core Academic Features (Combo A: Timetable, Problem Sets, Readiness) */}
      <AlulaFeatures onNavigateApp={onNavigateApp} onOpenAuth={handleOpenAuth} />

      {/* 4. AI Copilot Section (3 Interactive Variants) */}
      <AlulaCopilot onNavigateApp={onNavigateApp} onOpenAuth={handleOpenAuth} />

      {/* 5. Asymmetrical Interactive Cockpit Showcase (Second Brain) */}
      <AlulaViewShowcase />

      {/* 6. Pre-Footer Banner with Metrics */}
      <AlulaPreFooter onNavigateApp={onNavigateApp} onOpenAuth={handleOpenAuth} />

      {/* 7. Refined Footer */}
      <AlulaFooter />

      {/* Premium Alula Auth Popup Modal (Sign In & Sign Up) */}
      <AlulaAuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleCloseAuth}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default AlulaLanding;
