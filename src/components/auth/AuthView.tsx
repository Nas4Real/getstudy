import { Dialog } from '../common/Dialog';
import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import type { AuthViewType  } from '../../types';

export interface AuthViewProps {
  initialView?: AuthViewType;
  onLoginSuccess: () => void;
  onClose?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialView = 'signin',
  onLoginSuccess,
  onClose,
}) => {
  const [currentView, setCurrentView] = useState<AuthViewType>(initialView);

  const switchView = (v: AuthViewType) => {
    setCurrentView(v);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('auth', v === 'signin' ? 'login' : v);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <Dialog label="Account access" onClose={onClose}>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-panel/95 backdrop-blur-md p-4 overflow-y-auto selection:bg-white selection:text-black animate-in fade-in duration-200">
      <div className="w-full max-w-[440px] flex flex-col items-center relative">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold text-[20px] shadow-lg">
            G
          </div>
          <span className="font-bold text-[24px] tracking-tight text-white">GetStudy</span>
        </div>

        {/* Auth Card */}
        <div className="w-full bg-[#101012] border border-borderPanel rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close authentication modal"
              className="absolute top-4 right-4 w-10 h-10 min-w-[44px] min-h-[44px] rounded-full border border-borderPanel bg-[#141418] hover:bg-[#202026] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95 z-20"
              title="Close"
            >
              <iconify-icon icon="lucide:x" width="18" />
            </button>
          )}

          {currentView === 'signin' && (
            <SignInForm
              onSignIn={onLoginSuccess}
              onNavigateSignUp={() => switchView('signup')}
              onNavigateForgot={() => switchView('forgot')}
            />
          )}

          {currentView === 'signup' && (
            <SignUpForm
              onSignUp={onLoginSuccess}
              onNavigateSignIn={() => switchView('signin')}
            />
          )}

          {currentView === 'forgot' && (
            <ForgotPasswordForm
              onSubmit={() => {}}
              onNavigateSignIn={() => switchView('signin')}
            />
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[13px] font-medium text-textSubtle max-w-sm relative z-10">
          By continuing, you agree to our{' '}
          <a href="#" className="text-zinc-300 hover:text-white transition-colors underline underline-offset-2">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-zinc-300 hover:text-white transition-colors underline underline-offset-2">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
    </Dialog>
  );
};
