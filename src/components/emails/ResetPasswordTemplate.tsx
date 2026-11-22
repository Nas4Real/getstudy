import React from 'react';

export const ResetPasswordTemplate: React.FC = () => {
  return (
    <div className="w-full max-w-[480px] bg-cardBg border border-borderPanel rounded-2xl p-10 shadow-2xl">
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-borderPanel">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-md">
          <iconify-icon icon="lucide:graduation-cap" width="22" />
        </div>
        <span className="text-[20px] font-bold text-white tracking-tight">Web Study</span>
      </div>

      <h1 className="text-2xl font-bold text-white mb-5 tracking-tight">Reset your password</h1>
      <p className="text-[15px] text-zinc-300 leading-[1.6] mb-8">
        Hi Jane,<br /><br />
        We received a request to reset the password for your Web Study account. Click the button below to set up a new password.
      </p>

      <a
        id="btn-reset"
        href="#"
        className="flex items-center justify-center w-full bg-white hover:bg-zinc-200 text-black min-h-[52px] rounded-xl text-[15px] font-bold transition-all shadow-sm"
      >
        Reset Password
      </a>

      <p className="text-[13px] text-textSubtle mt-10 leading-relaxed">
        This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
      </p>
    </div>
  );
};
