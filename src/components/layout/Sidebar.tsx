import React from 'react';
import type { PageType } from '../../types';

interface SidebarProps {
  currentPage: PageType;
  onSelectPage: (page: PageType) => void;
  onToggleProfileDropdown: (e: React.MouseEvent) => void;
  onCloseMobile?: () => void;
  isMobile?: boolean;
}

interface NavItem {
  id: PageType;
  label: string;
  icon: string;
  badge?: number | string;
}

interface NavCategory {
  id: string;
  title: string;
  items: NavItem[];
}

const CATEGORIES: NavCategory[] = [
  {
    id: 'workspace',
    title: 'Workspace',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'lucide:layout-dashboard',
      },
      {
        id: 'calendar',
        label: 'Calendar',
        icon: 'lucide:calendar-days',
      },
    ],
  },
  {
    id: 'academics',
    title: 'Academics',
    items: [
      {
        id: 'tasks',
        label: 'Tasks',
        icon: 'lucide:check-square',
        badge: 3,
      },
      {
        id: 'subjects',
        label: 'Subjects',
        icon: 'lucide:book-open',
      },
      {
        id: 'documents',
        label: 'Documents',
        icon: 'lucide:folder-open',
      },
      {
        id: 'flashcards',
        label: 'Flashcards',
        icon: 'lucide:layers',
        badge: 12,
      },
    ],
  },
  {
    id: 'intelligence',
    title: 'Intelligence',
    items: [
      {
        id: 'ai-assistant',
        label: 'AI Assistant',
        icon: 'lucide:bot',
        badge: 'AI',
      },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  onToggleProfileDropdown,
  onCloseMobile,
  isMobile = false,
}) => {
  const handleNavClick = (id: PageType) => {
    onSelectPage(id);
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={
        isMobile
          ? 'w-[300px] max-w-[85vw] h-full flex flex-col justify-between py-5 px-4 bg-[#09090c] text-white border-r border-white/10 shadow-2xl overflow-y-auto shrink-0 select-none'
          : 'hidden lg:flex w-[290px] xl:w-[310px] h-full flex flex-col justify-between p-4 bg-[#09090c] border border-white/[0.08] rounded-2xl text-white shadow-2xl shrink-0 select-none'
      }
    >
      <div className="flex flex-col gap-6 min-h-0 flex-1">
        {/* Logo & Mobile Close Button */}
        <div className="px-2 pt-1 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-extrabold text-[18px] shadow-md shadow-white/10">
              ✦
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white leading-tight">GetStudy</span>
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">Academic OS</span>
            </div>
          </div>

          {isMobile && onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close navigation menu"
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close menu"
            >
              <iconify-icon icon="lucide:x" width="20" />
            </button>
          )}
        </div>

        {/* Navigation Body */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pr-0.5">
          <nav className="flex flex-col gap-5 text-white">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex flex-col gap-1.5">
                {/* Category Header */}
                <div className="px-3.5 pt-2 pb-1">
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    {cat.title}
                  </span>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-col gap-1">
                  {cat.items.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl border transition-all text-sm font-semibold text-left w-full group cursor-pointer ${
                          isActive
                            ? 'bg-white/[0.12] border-white/20 text-white shadow-sm font-bold'
                            : 'border-transparent text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        <iconify-icon
                          icon={item.icon}
                          width="22"
                          className={isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white transition-colors'}
                        />
                        <span
                          className={`flex-1 truncate ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}
                        >
                          {item.label}
                        </span>
                        {item.badge !== undefined && (
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2.5 pt-3 shrink-0 border-t border-white/[0.08]">
        {/* Settings Button */}
        <button
          type="button"
          onClick={() => handleNavClick('settings')}
          aria-current={currentPage === 'settings' ? 'page' : undefined}
          className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl border transition-all text-sm font-semibold text-left w-full group cursor-pointer ${
            currentPage === 'settings'
              ? 'bg-white/[0.12] border-white/20 text-white shadow-sm font-bold'
              : 'border-transparent text-zinc-300 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <iconify-icon
            icon="lucide:settings"
            width="22"
            className={currentPage === 'settings' ? 'text-white' : 'text-zinc-400 group-hover:text-white transition-colors'}
          />
          <span
            className={`flex-1 ${currentPage === 'settings' ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}
          >
            Settings
          </span>
        </button>

        {/* User Profile Button */}
        <button
          type="button"
          onClick={onToggleProfileDropdown}
          aria-label="User profile and account options"
          className="w-full text-left flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all cursor-pointer group shadow-sm relative overflow-hidden"
        >
          <div className="flex items-center gap-3 overflow-hidden z-10 w-full">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-white/20 group-hover:border-white/40 transition-colors">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden min-w-0 flex-1">
              <span className="text-sm font-bold text-white truncate block">
                Della Guerrero
              </span>
              <span className="text-xs font-medium text-zinc-400 truncate block">
                Classes Prépa • MPSI
              </span>
            </div>
            <div className="shrink-0 text-zinc-400 group-hover:text-white transition-colors ml-auto flex items-center justify-center w-6 h-6">
              <iconify-icon icon="lucide:chevrons-up-down" width="16" />
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
};
