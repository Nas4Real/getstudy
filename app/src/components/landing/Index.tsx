import React from 'react';
import { AlulaLanding } from './alula/AlulaLanding';

interface LandingPageIndexProps {
  onNavigateApp?: () => void;
}

export const LandingPageIndex: React.FC<LandingPageIndexProps> = ({ onNavigateApp }) => {
  return <AlulaLanding onNavigateApp={onNavigateApp} />;
};

export default LandingPageIndex;
