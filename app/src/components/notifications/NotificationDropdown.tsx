import React, { useState, useEffect, useRef } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'exam' | 'task' | 'session' | 'ai' | 'storage';
  subject?: string;
  actionLabel?: string;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
  onNavigateToNotifications?: () => void;
  align?: 'left' | 'right';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Upcoming Exam in 2 Days',
    message: 'Algèbre Linéaire midterm scheduled at 09:00 AM in Room 27.',
    timestamp: '10m ago',
    read: false,
    type: 'exam',
    subject: 'Algèbre',
    actionLabel: 'View Schedule',
  },
  {
    id: 'notif-2',
    title: 'Assignment Due Tonight',
    message: '"Complete Chapter 4 Exercises" deadline is at 23:59.',
    timestamp: '1h ago',
    read: false,
    type: 'task',
    subject: 'Analyse',
    actionLabel: 'Open Tasks',
  },
  {
    id: 'notif-3',
    title: 'Next Class: Physics (Mechanics)',
    message: 'Starts at 11:00 AM in Lab B-2 with Prof. Miller.',
    timestamp: '2h ago',
    read: false,
    type: 'session',
    subject: 'Physique',
    actionLabel: 'Class Info',
  },
  {
    id: 'notif-4',
    title: 'AI Study Plan Ready',
    message: 'Your assistant prepared 2 revision slots for this weekend.',
    timestamp: 'Yesterday',
    read: true,
    type: 'ai',
    actionLabel: 'Open AI',
  },
  {
    id: 'notif-5',
    title: 'Google Drive Synced',
    message: '14 documents and summaries mirrored to your Drive cloud folder.',
    timestamp: 'Yesterday',
    read: true,
    type: 'storage',
    actionLabel: 'Drive Folder',
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'exam', label: 'Exams' },
  { id: 'task', label: 'Tasks' },
] as const;

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onUnreadCountChange,
  onNavigateToNotifications,
  align = 'right',
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'exam' | 'task'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [unreadCount, onUnreadCountChange]);

  // Click outside listener
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

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'exam') return n.type === 'exam';
    if (filter === 'task') return n.type === 'task';
    return true;
  });

  const getTypeMeta = (type: NotificationItem['type']) => {
    switch (type) {
      case 'exam':
        return {
          icon: 'lucide:alert-circle',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        };
      case 'task':
        return {
          icon: 'lucide:clipboard-check',
          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        };
      case 'session':
        return {
          icon: 'lucide:clock',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        };
      case 'ai':
        return {
          icon: 'lucide:bot',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        };
      case 'storage':
        return {
          icon: 'lucide:cloud',
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        };
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`fixed inset-x-3 top-16 sm:top-12 max-w-[420px] mx-auto sm:mx-0 sm:absolute sm:inset-auto ${
        align === 'left' ? 'sm:left-0' : 'sm:right-0'
      } sm:w-[420px] bg-panel border border-[#1f1f23] rounded-[22px] shadow-[0_25px_70px_rgba(0,0,0,0.98)] z-50 flex flex-col overflow-hidden max-h-[calc(100vh-5rem)] animate-in fade-in zoom-in-95 duration-150`}
    >
      {/* Subtle top ambient indicator */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />

      {/* Header Variant */}
      <div className="p-4 px-5 border-b border-[#18181b] bg-panel flex flex-col gap-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cardBg border border-[#202024] text-zinc-200 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:bell" width="16" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight leading-none">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                )}
              </div>
              <p className="text-[11.5px] font-medium text-zinc-400 mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[12px] font-semibold text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg bg-cardBg hover:bg-cardHover border border-[#202024] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                title="Mark all as read"
              >
                <iconify-icon icon="lucide:check-check" width="14" className="text-emerald-400" />
                <span>Mark read</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notification panel"
              className="w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-[#141417] flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <iconify-icon icon="lucide:x" width="16" />
            </button>
          </div>
        </div>

        {/* Integrated Filter Pills Bar (No Clear All button) */}
        <div className="flex items-center gap-1 bg-[#000000] p-1 rounded-xl border border-[#18181b]">
          {FILTERS.map((f) => {
            const count =
              f.id === 'all'
                ? notifications.length
                : f.id === 'unread'
                ? unreadCount
                : notifications.filter((n) => n.type === f.id).length;
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[12px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-cardHover text-white shadow-sm border border-borderPanel font-bold'
                    : 'text-textSubtle hover:text-zinc-300 hover:bg-panel'
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#38bdf8]/15 text-[#38bdf8]' : 'bg-white/[0.04] text-textSubtle'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List (Seamless unified rows with deep dark / black tones) */}
      <div className="max-h-[350px] overflow-y-auto p-2 space-y-1 scrollbar-hide bg-panel">
        {filteredNotifications.length === 0 ? (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-[#000000] border border-[#18181b] flex items-center justify-center text-zinc-400">
              <iconify-icon icon="lucide:bell-off" width="22" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[14px] font-bold text-zinc-300">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </p>
              <p className="text-[12.5px] font-medium text-textSubtle">
                You're caught up with all your deadlines.
              </p>
            </div>
          </div>
        ) : (
          filteredNotifications.map((n) => {
            const meta = getTypeMeta(n.type);
            return (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-3 px-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 group relative ${
                  !n.read
                    ? 'bg-[#111114] hover:bg-[#18181c] border border-[#1f1f24] hover:border-zinc-700/60 shadow-sm'
                    : 'bg-transparent hover:bg-[#101013] border border-transparent hover:border-[#18181b] opacity-65 hover:opacity-100'
                }`}
              >
                {/* Category Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${meta.badge}`}
                >
                  <iconify-icon icon={meta.icon} width="16" />
                </div>

                {/* Content with comfortable typography */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-[13.5px] font-bold truncate leading-snug ${
                        !n.read ? 'text-white' : 'text-zinc-300'
                      }`}
                    >
                      {n.title}
                    </h4>
                    <span className="text-[11.5px] font-medium text-textSubtle shrink-0">
                      {n.timestamp}
                    </span>
                  </div>

                  <p className="text-[12.5px] font-medium text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {n.message}
                  </p>

                  {/* Inline Action Link */}
                  {n.actionLabel && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(n.id);
                          if (onNavigateToNotifications) {
                            onNavigateToNotifications();
                            onClose();
                          }
                        }}
                        className="text-[12px] font-semibold text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {n.actionLabel}
                        <iconify-icon icon="lucide:arrow-right" width="11" />
                      </span>
                      {n.subject && (
                        <span className="text-[11.5px] text-zinc-400 font-medium">• {n.subject}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Actions: Unread dot / Dismiss */}
                <div className="flex items-center gap-1 shrink-0 self-center">
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] group-hover:hidden" />
                  )}
                  <button
                    type="button"
                    onClick={(e) => removeNotification(n.id, e)}
                    aria-label="Dismiss notification"
                    className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 p-1 text-zinc-400 hover:text-white rounded transition-all cursor-pointer"
                    title="Dismiss"
                  >
                    <iconify-icon icon="lucide:x" width="14" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer link to full screen (True dark theme) */}
      {onNavigateToNotifications && (
        <div className="p-3 px-3.5 border-t border-[#18181b] bg-[#050507]">
          <button
            type="button"
            onClick={() => {
              onNavigateToNotifications();
              onClose();
            }}
            className="w-full py-2.5 px-3.5 rounded-xl text-[13px] font-bold text-zinc-300 hover:text-black bg-[#101013] hover:bg-white border border-[#202025] hover:border-white transition-all flex items-center justify-center gap-2 cursor-pointer group shadow-sm"
          >
            <span>Open Full Notifications Screen</span>
            <iconify-icon
              icon="lucide:arrow-right"
              width="14"
              className="text-textSubtle group-hover:text-black group-hover:translate-x-0.5 transition-all"
            />
          </button>
        </div>
      )}
    </div>
  );
};
