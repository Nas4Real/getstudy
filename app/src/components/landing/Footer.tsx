import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black border-t border-neutral-900 overflow-hidden py-10 px-4 md:px-8">
      {/* Specular Top Beam Glow */}
      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-8" />

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <span className="font-bold text-neutral-300">GetStudy OS v2.4</span>
          <span>•</span>
          <span className="text-neutral-500">Built for STEM Excellence</span>
        </div>

        {/* Operational Status */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-neutral-400">All Academic Engines Operational</span>
        </div>

        {/* Copyright */}
        <div>
          © 2026 GetStudy OS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
