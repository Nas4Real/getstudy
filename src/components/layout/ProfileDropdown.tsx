import React, { useEffect, useLayoutEffect, useRef } from 'react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSettings: () => void;
  onSignOut: () => void;
  anchor?: 'sidebar' | 'header';
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  onNavigateSettings,
  onSignOut,
  anchor,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    dropdownRef.current?.querySelector('button')?.focus();
    return () => {
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses =
    anchor === 'header'
      ? 'fixed top-14 right-3 w-[240px] max-w-[calc(100vw-1.5rem)]'
      : anchor === 'sidebar'
      ? 'fixed bottom-[104px] left-4 md:left-[32px] w-[240px] max-w-[calc(100vw-1.5rem)]'
      : 'fixed top-14 right-3 md:top-auto md:right-auto md:bottom-[104px] md:left-[32px] w-[240px] max-w-[calc(100vw-1.5rem)]';

  return (
    <div
      ref={dropdownRef}
      className={`${positionClasses} bg-cardBg border border-borderPanel rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[200] animate-in fade-in zoom-in-95 duration-150`}
    >
      <div className="p-4 border-b border-borderPanel flex items-center gap-3 bg-cardHover/50 rounded-t-2xl">
        <div className="relative">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Jane&backgroundColor=e4e4e7"
            className="w-11 h-11 rounded-full border-2 border-borderPanel bg-zinc-800"
            alt="Profile"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121214] rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-white truncate">Jane Doe</p>
          <p className="text-[12px] font-medium text-zinc-400 truncate">jane@example.com</p>
        </div>
      </div>
      <div className="p-2">
        <button
          onClick={() => {
            onNavigateSettings();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-zinc-300 hover:text-white hover:bg-[#1c1c1f] rounded-xl transition-colors text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1c1f] text-zinc-300">
            <iconify-icon icon="lucide:settings" width="16" />
          </div>
          Profile & Settings
        </button>
      </div>
      <div className="p-2 border-t border-borderPanel">
        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-950/40 text-red-400">
            <iconify-icon icon="lucide:log-out" width="16" />
          </div>
          Sign Out
        </button>
      </div>
    </div>
  );
};
