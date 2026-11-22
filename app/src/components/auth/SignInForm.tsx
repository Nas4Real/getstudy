import React, { useState } from 'react';

interface SignInFormProps {
  onSignIn: () => void;
  onNavigateSignUp: () => void;
  onNavigateForgot: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSignIn,
  onNavigateSignUp,
  onNavigateForgot,
}) => {
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [errorMessage, setErrorMessage] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('error') === 'invalid-credentials' || p.get('error') === 'invalid' || p.get('auth_error')) {
        return 'Invalid email or password. Please verify your credentials and try again.';
      }
    }
    return null;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
        <p className="mt-2 text-[14px] text-zinc-400">Enter your details to access your study space</p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-[13px] flex items-center gap-2.5 animate-in fade-in">
          <iconify-icon icon="lucide:alert-circle" width="18" className="shrink-0 text-red-400" />
          <span className="flex-1 font-medium">{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-white"
            aria-label="Dismiss error"
          >
            <iconify-icon icon="lucide:x" width="15" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="signin-email" className="block text-[13px] font-semibold text-zinc-300 mb-2">Email address</label>
          <input
            id="signin-email"
            type="email"
            required
            className="w-full bg-cardBg border border-borderPanel rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/10 transition-colors"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="signin-password" className="block text-[13px] font-semibold text-zinc-300">Password</label>
            <button
              type="button"
              onClick={onNavigateForgot}
              className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded px-1"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="signin-password"
            type="password"
            required
            className="w-full bg-cardBg border border-borderPanel rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/10 transition-colors"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-3 w-full bg-white hover:bg-zinc-200 text-black min-h-[48px] rounded-full text-[15px] font-bold transition-all active:scale-[0.98] shadow-sm hover:shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-borderPanel flex items-center justify-center gap-2 text-[14px] text-zinc-400">
        <span>Don't have an account?</span>
        <button
          type="button"
          onClick={onNavigateSignUp}
          className="font-bold text-white hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded px-1"
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
};
