import React, { useState } from 'react';

interface ForgotPasswordFormProps {
  onSubmit: () => void;
  onNavigateSignIn: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onNavigateSignIn,
}) => {
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('email') || (p.get('sent') === 'true' ? 'jane@example.com' : '');
    }
    return '';
  });
  const [submitted, setSubmitted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('sent') === 'true' || p.get('state') === 'sent';
    }
    return false;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Reset password</h2>
        <p className="mt-2 text-[14px] text-zinc-400">Enter your email and we'll send you a recovery link</p>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center text-center p-6 bg-cardHover border border-borderPanel rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
            <iconify-icon icon="lucide:mail-check" width="24" />
          </div>
          <h3 className="text-[17px] font-bold text-white">Check your email</h3>
          <p className="mt-2 text-[13px] text-zinc-400 leading-relaxed">
            We've sent a password reset link to <span className="text-white font-medium">{email || 'your email'}</span>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="reset-email" className="block text-[13px] font-semibold text-zinc-300 mb-2">Email address</label>
            <input
              id="reset-email"
              type="email"
              required
              className="w-full bg-cardBg border border-borderPanel rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/10 transition-colors"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full bg-white hover:bg-zinc-200 text-black min-h-[48px] rounded-full text-[15px] font-bold transition-all active:scale-[0.98] shadow-sm hover:shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            Send Reset Link
          </button>
        </form>
      )}

      <div className="mt-8 flex items-center justify-center gap-2 text-[14px]">
        <button
          type="button"
          onClick={onNavigateSignIn}
          className="font-bold text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded px-1.5 py-0.5 flex items-center gap-2 group"
        >
          <iconify-icon icon="lucide:arrow-left" width="16" className="group-hover:-translate-x-1 transition-transform" />
          Back to sign in
        </button>
      </div>
    </div>
  );
};
