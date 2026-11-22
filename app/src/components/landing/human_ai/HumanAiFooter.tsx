import React from 'react';

export const HumanAiFooter: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-zinc-900 py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-white mb-4">
              <span>GetStudy</span>
              <span className="w-2.5 h-2.5 bg-[#00ea64] rounded-xs shadow-[0_0_8px_rgba(0,234,100,0.8)]" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed">
              Where human discipline meets AI precision. The high-performance academic operating system for elite STEM tracks and Grandes Écoles.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#adventures" className="hover:text-white transition-colors">Adventures</a></li>
              <li><a href="#intelligence" className="hover:text-white transition-colors">AI Intelligence</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Study Cockpit</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Formula Matrix</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">Academics</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><span className="hover:text-white transition-colors cursor-default">MPSI / MP*</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">PCSI / PSI*</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Grandes Écoles</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">STEM Universities</span></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><span className="hover:text-white transition-colors cursor-default">Security & Bareme</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Privacy Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Terms of Service</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© 2026 GetStudy Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>The future of preparation is</span>
            <span className="text-white font-medium">human</span>
            <span>+</span>
            <span className="text-[#00ea64] font-medium">AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
