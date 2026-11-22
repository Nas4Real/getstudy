import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Lock,
  User,
} from 'lucide-react';

export type AuthMode = 'signin' | 'signup' | 'forgot';

interface AlulaAuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
}

const POPPINS_FONT = "'Poppins', sans-serif";

export const AlulaAuthModal: React.FC<AlulaAuthModalProps> = React.memo(({
  isOpen,
  initialMode = 'signin',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Render-phase sync when modal opens to eliminate post-mount double-render jank
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen && !prevIsOpen) {
    setPrevIsOpen(true);
    setMode(initialMode);
    setResetSent(false);
    setIsLoading(false);
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }

  // Lock body scroll and handle Escape key smoothly
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      if (!email) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setResetSent(true);
      }, 600);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 500);
  };

  const handleOAuth = (_provider: 'google' | 'github') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Ambient Deep Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 transform-gpu will-change-opacity"
            aria-hidden="true"
          />

          {/* Elevated & Spacious Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[500px] rounded-3xl bg-[#09090b] border border-zinc-800/90 shadow-[0_32px_96px_rgba(0,0,0,0.98),0_0_1px_1px_rgba(255,255,255,0.06)] transform-gpu will-change-transform p-6 sm:p-8 md:p-9 z-10 overflow-hidden my-auto text-center transition-colors duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Specular Rim Reflection */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-all duration-200" />

            {/* Soft Ambient Glow at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-white/[0.03] blur-3xl pointer-events-none rounded-full transform-gpu transition-colors duration-200" />

            {/* Close Button (Preserved Exactly) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95 z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Elevated Editorial Title (Locked & Approved: Syne + Bold Yellow Serif Accent) */}
            <h2
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-2xl sm:text-3xl md:text-[32px] font-bold text-white tracking-tight leading-[1.2] mb-2.5 pt-1 sm:pt-2"
            >
              {mode === 'signin' && (
                <>
                  Welcome back to your <br />
                  <span className="font-serif italic font-bold text-[#facc15]">
                    second brain.
                  </span>
                </>
              )}
              {mode === 'signup' && (
                <>
                  Build your personal <br />
                  <span className="font-serif italic font-bold text-[#facc15]">
                    cognitive OS.
                  </span>
                </>
              )}
              {mode === 'forgot' && (
                <>
                  Recover your <br />
                  <span className="font-serif italic font-bold text-[#facc15]">
                    workspace.
                  </span>
                </>
              )}
            </h2>

            {/* Form & Controls Container with Locked Poppins Typography */}
            <div style={{ fontFamily: POPPINS_FONT }} className="w-full">
              {/* Clear Editorial Subtitle (High-Contrast & Crisp) */}
              <p className="text-[14.5px] sm:text-[15px] text-zinc-200 font-medium leading-relaxed mb-6 max-w-sm sm:max-w-md mx-auto">
                {mode === 'signin' && 'All your thoughts, right where you left them.'}
                {mode === 'signup' && 'Your thoughts, memory, and schedule in sync.'}
                {mode === 'forgot' &&
                  'Enter your email to receive a secure recovery link.'}
              </p>

              {/* Side-by-Side OAuth Buttons (Poppins Font) */}
              {mode !== 'forgot' && (
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => handleOAuth('google')}
                    disabled={isLoading}
                    style={{ fontFamily: POPPINS_FONT }}
                    className="h-12 w-full rounded-xl bg-[#121215] hover:bg-[#18181c] border border-white/[0.09] hover:border-white/20 text-white text-sm sm:text-[14.5px] font-medium transition-all duration-150 inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] disabled:opacity-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.5)] group"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuth('github')}
                    disabled={isLoading}
                    style={{ fontFamily: POPPINS_FONT }}
                    className="h-12 w-full rounded-xl bg-[#121215] hover:bg-[#18181c] border border-white/[0.09] hover:border-white/20 text-white text-sm sm:text-[14.5px] font-medium transition-all duration-150 inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] disabled:opacity-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.5)] group"
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                  </button>
                </div>
              )}

              {/* Clearer Hairline Divider */}
              {mode !== 'forgot' && (
                <div className="relative my-5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-800" />
                  </div>
                  <span
                    style={{ fontFamily: POPPINS_FONT }}
                    className="relative bg-[#09090b] px-3.5 text-xs sm:text-[12.5px] text-zinc-400 font-medium"
                  >
                    or continue with email
                  </span>
                </div>
              )}

              {/* Form Content */}
              {mode === 'forgot' && resetSent ? (
                <SuccessResetMessage
                  email={email}
                  onBack={() => {
                    setResetSent(false);
                    setMode('signin');
                  }}
                />
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
                  {/* Full Name Field (Sign Up Only) */}
                  {mode === 'signup' && (
                    <div>
                      <label
                        htmlFor="poppins-name-app"
                        style={{ fontFamily: POPPINS_FONT }}
                        className="block text-sm sm:text-[14px] font-medium text-zinc-200 mb-2"
                      >
                        Full name
                      </label>
                      <div className="relative flex items-center group">
                        <User className="absolute left-3.5 w-[18px] h-[18px] text-zinc-400 group-hover:text-zinc-200 group-focus-within:text-white transition-colors duration-150 ease-out pointer-events-none" />
                        <input
                          id="poppins-name-app"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Morgan"
                          style={{ fontFamily: POPPINS_FONT }}
                          className="w-full h-12 rounded-xl bg-[#101013] hover:bg-[#131317] focus:bg-[#141419] border border-transparent hover:border-white/30 focus:border-white pl-11 pr-4 text-[15px] sm:text-base text-white placeholder:text-zinc-400 font-normal outline-none transition-colors duration-150 ease-out shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="poppins-email-app"
                      style={{ fontFamily: POPPINS_FONT }}
                      className="block text-sm sm:text-[14px] font-medium text-zinc-200 mb-2"
                    >
                      Email address
                    </label>
                    <div className="relative flex items-center group">
                      <Mail className="absolute left-3.5 w-[18px] h-[18px] text-zinc-400 group-hover:text-zinc-200 group-focus-within:text-white transition-colors duration-150 ease-out pointer-events-none" />
                      <input
                        id="poppins-email-app"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          mode === 'signin'
                            ? 'name@example.com'
                            : mode === 'signup'
                            ? 'name@university.edu'
                            : 'name@example.com'
                        }
                        style={{ fontFamily: POPPINS_FONT }}
                        className="w-full h-12 rounded-xl bg-[#101013] hover:bg-[#131317] focus:bg-[#141419] border border-transparent hover:border-white/30 focus:border-white pl-11 pr-4 text-[15px] sm:text-base text-white placeholder:text-zinc-400 font-normal outline-none transition-colors duration-150 ease-out shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  {mode !== 'forgot' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="poppins-password-app"
                          style={{ fontFamily: POPPINS_FONT }}
                          className="block text-sm sm:text-[14px] font-medium text-zinc-200"
                        >
                          Password
                        </label>
                        {mode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => setMode('forgot')}
                            style={{ fontFamily: POPPINS_FONT }}
                            className="text-xs sm:text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative flex items-center group">
                        <Lock className="absolute left-3.5 w-[18px] h-[18px] text-zinc-400 group-hover:text-zinc-200 group-focus-within:text-white transition-colors duration-150 ease-out pointer-events-none" />
                        <input
                          id="poppins-password-app"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={
                            mode === 'signin'
                              ? 'Enter your password'
                              : 'At least 8 characters'
                          }
                          style={{ fontFamily: POPPINS_FONT }}
                          className="w-full h-12 rounded-xl bg-[#101013] hover:bg-[#131317] focus:bg-[#141419] border border-transparent hover:border-white/30 focus:border-white pl-11 pr-11 text-[15px] sm:text-base text-white placeholder:text-zinc-400 font-normal outline-none transition-colors duration-150 ease-out shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.5)]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-3.5 p-1 text-zinc-400 hover:text-zinc-200 transition-colors duration-150 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="w-[18px] h-[18px]" />
                          ) : (
                            <Eye className="w-[18px] h-[18px]" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tactile Calibrated Primary Button (Non-glaring, no harsh white halo) */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{ fontFamily: POPPINS_FONT }}
                    className="group mt-2 h-12 sm:h-12.5 w-full rounded-xl bg-zinc-200 hover:bg-zinc-100 text-zinc-950 font-semibold text-[15px] sm:text-base transition-all duration-150 cursor-pointer inline-flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.5)] border border-zinc-300/30"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>
                          {mode === 'signin' && 'Sign in to workspace'}
                          {mode === 'signup' && 'Create account & get started'}
                          {mode === 'forgot' && 'Send reset link'}
                        </span>
                        <ArrowRight className="w-4.5 h-4.5 stroke-[2.2] text-zinc-950 group-hover:translate-x-0.5 transition-transform duration-150" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Quiet Terms Whisper */}
              {mode === 'signup' && (
                <p
                  style={{ fontFamily: POPPINS_FONT }}
                  className="mt-3 text-xs sm:text-[12.5px] text-zinc-400 leading-normal"
                >
                  By continuing, you agree to GetStudy's{' '}
                  <span className="text-zinc-300 underline underline-offset-2">Terms</span> and{' '}
                  <span className="text-zinc-300 underline underline-offset-2">Privacy Policy</span>.
                </p>
              )}

              {/* Frameless Bottom Mode Toggle */}
              <div className="mt-4 pt-4 border-t border-zinc-800/80 text-center transition-colors">
                {mode === 'signin' ? (
                  <p
                    style={{ fontFamily: POPPINS_FONT }}
                    className="text-[13.5px] sm:text-sm text-zinc-300"
                  >
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      style={{ fontFamily: POPPINS_FONT }}
                      className="font-semibold text-white hover:text-zinc-200 hover:underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      Create an account →
                    </button>
                  </p>
                ) : mode === 'signup' ? (
                  <p
                    style={{ fontFamily: POPPINS_FONT }}
                    className="text-[13.5px] sm:text-sm text-zinc-300"
                  >
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      style={{ fontFamily: POPPINS_FONT }}
                      className="font-semibold text-white hover:text-zinc-200 hover:underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      Sign in →
                    </button>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    style={{ fontFamily: POPPINS_FONT }}
                    className="text-[13.5px] sm:text-sm text-zinc-300 hover:text-white font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to sign in</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

/* --- Helper Sub-components --- */

const SuccessResetMessage: React.FC<{ email: string; onBack: () => void }> = ({
  email,
  onBack,
}) => (
  <div
    style={{ fontFamily: POPPINS_FONT }}
    className="flex flex-col items-center text-center py-6"
  >
    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
      <Check className="w-6 h-6 stroke-[2.5]" />
    </div>
    <h3 className="text-base font-bold text-white mb-1.5">Check your inbox</h3>
    <p className="text-xs text-zinc-400 max-w-xs mb-6">
      We've sent a secure password recovery link to{' '}
      <span className="text-zinc-200 font-medium">{email}</span>.
    </p>
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white font-medium cursor-pointer transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Back to Sign In</span>
    </button>
  </div>
);

const GoogleIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px] shrink-0"
    style={{ width: 18, height: 18 }}
    aria-hidden="true"
  >
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
    />
    <path
      fill="#FBBC05"
      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"
    />
    <path
      fill="#34A853"
      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
    />
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px] shrink-0 fill-current"
    style={{ width: 18, height: 18 }}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export default AlulaAuthModal;
