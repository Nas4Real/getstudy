import React, { useState } from 'react';
import { GoogleDriveSection } from './GoogleDriveSection';

export type SettingsMockState = 'normal' | 'disconnected' | 'empty-cache';

export const parseSettingsMockStateFromUrl = (): SettingsMockState => {
  if (typeof window === 'undefined') return 'normal';
  const p = new URLSearchParams(window.location.search);
  const s = (p.get('settings') || p.get('drive') || '').toLowerCase();
  if (s === 'disconnected' || s === 'disconnect' || s === 'offline') return 'disconnected';
  if (s === 'empty-cache' || s === 'clean-cache' || s === '0cache') return 'empty-cache';
  return 'normal';
};

export interface SettingsViewProps {
  onSignOut: () => void;
  onShowToast?: (msg: string) => void;
  mockState?: SettingsMockState;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onSignOut, onShowToast, mockState }) => {
  const initialMockState = mockState || parseSettingsMockStateFromUrl();
  const [internalToast, setInternalToast] = useState<string | null>(null);
  const [cacheMB, setCacheMB] = useState<number>(initialMockState === 'empty-cache' ? 0 : 420);

  const handleToast = (msg: string) => {
    if (onShowToast) {
      onShowToast(msg);
    } else {
      setInternalToast(msg);
      setTimeout(() => setInternalToast(null), 2800);
    }
  };

  const handleClearCache = () => {
    setCacheMB(0);
    handleToast('Offline cache cleared successfully (0 MB)');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('settings', 'empty-cache');
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <div id="page-settings" className="flex flex-col h-full w-full overflow-hidden relative">
      <header className="flex items-center justify-between border-b border-borderPanel px-4 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-5 shrink-0 bg-panel/80 backdrop-blur-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1.5 sm:mb-2">Settings</h1>
          <p className="text-sm font-medium text-textMuted">Manage your account preferences, storage, and cloud integrations.</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 pt-6 sm:pt-10 pb-20 md:pb-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 sm:gap-10">
          
          {/* Profile */}
          <section>
            <h2 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Profile</h2>
            <div className="rounded-2xl border border-borderPanel bg-[#0c0c0e] p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                <div className="relative shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Jane&backgroundColor=e4e4e7"
                    className="w-20 h-20 rounded-full border-4 border-[#18181b] bg-zinc-800"
                    alt="Profile"
                  />
                  <button
                    type="button"
                    aria-label="Change profile photo"
                    title="Change profile photo"
                    className="absolute bottom-0 right-0 p-2 min-w-[32px] min-h-[32px] bg-cardHover border border-borderPanel rounded-full text-white hover:bg-zinc-700 transition-colors shadow-lg flex items-center justify-center cursor-pointer"
                  >
                    <iconify-icon icon="lucide:camera" width="14" />
                  </button>
                </div>
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="profile-full-name" className="block text-[13px] font-semibold text-zinc-400 mb-2">Full Name</label>
                      <input
                        id="profile-full-name"
                        type="text"
                        defaultValue="Jane Doe"
                        className="w-full h-11 bg-cardBg border border-borderPanel rounded-xl px-4 text-[14px] font-medium text-white focus:border-white focus:outline-none transition-colors shadow-inner"
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-email" className="block text-[13px] font-semibold text-zinc-400 mb-2">Email Address</label>
                      <input
                        id="profile-email"
                        type="email"
                        defaultValue="jane@example.com"
                        className="w-full h-11 bg-cardBg border border-borderPanel rounded-xl px-4 text-[14px] font-medium text-white focus:border-white focus:outline-none transition-colors shadow-inner opacity-60 cursor-not-allowed"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleToast('Profile changes saved successfully')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white text-black rounded-full text-[13px] font-bold hover:bg-zinc-200 active:scale-95 transition-all shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* Cloud Storage & Google Drive Integration */}
          <GoogleDriveSection
            onShowToast={handleToast}
            initialConnected={initialMockState !== 'disconnected'}
          />

          {/* Preferences */}
          <section>
            <h2 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Preferences</h2>
            <div className="rounded-2xl border border-borderPanel bg-[#0c0c0e] shadow-sm overflow-hidden flex flex-col">
              
              {/* Notifications */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderPanel">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-borderPanel bg-cardBg text-zinc-300">
                    <iconify-icon icon="lucide:bell" width="18" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Notification Preferences</h3>
                    <p className="text-[13px] text-zinc-400 mt-1 max-w-sm">Choose what updates you want to receive about your tasks and revision sessions.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToast('Notification preferences updated')}
                  className="self-start sm:self-center shrink-0 px-5 py-2.5 border border-borderPanel bg-cardBg text-white rounded-full text-[13px] font-bold hover:bg-cardHover transition-colors shadow-sm active:scale-95"
                >
                  Manage
                </button>
              </div>

              {/* Local Storage & Cache */}
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-borderPanel bg-cardBg text-zinc-300">
                      <iconify-icon icon="lucide:hard-drive" width="18" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-white">Local Offline Cache</h3>
                      <p className="text-[13px] text-zinc-400 mt-1 max-w-sm">High-speed local cache for quick offline chapter reading and quick thumbnail previews.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 self-start sm:self-center">
                    <span className="text-[13px] font-bold text-zinc-300 bg-cardBg border border-borderPanel px-3 py-1 rounded-lg">
                      {cacheMB} MB / 2 GB Cache
                    </span>
                    {cacheMB > 0 ? (
                      <button
                        type="button"
                        onClick={handleClearCache}
                        className="px-3.5 py-1 text-[12px] font-bold text-zinc-400 hover:text-white bg-cardHover hover:bg-[#222226] border border-borderPanel rounded-lg transition-colors cursor-pointer active:scale-95"
                      >
                        Clear Cache
                      </button>
                    ) : (
                      <span className="text-[12px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        Clean
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="ml-0 sm:ml-14 max-w-md">
                  <div className="w-full h-2.5 bg-[#18181f] rounded-full overflow-hidden border border-borderPanel">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((cacheMB / 2000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Security</h2>
            <div className="rounded-2xl border border-borderPanel bg-[#0c0c0e] shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-borderPanel bg-cardBg text-zinc-300">
                    <iconify-icon icon="lucide:shield-check" width="18" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Change Password</h3>
                    <p className="text-[13px] text-zinc-400 mt-1 max-w-sm">Update your password to keep your account secure from unauthorized access.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToast('Password reset link sent to your email')}
                  className="self-start sm:self-center shrink-0 px-5 py-2.5 border border-borderPanel bg-cardBg text-white rounded-full text-[13px] font-bold hover:bg-cardHover transition-colors shadow-sm active:scale-95"
                >
                  Update Password
                </button>
              </div>
            </div>
          </section>

          {/* Account Session */}
          <section className="mb-12">
            <h2 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Account Session</h2>
            <div className="rounded-2xl border border-borderPanel bg-[#0c0c0e] shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
                    <iconify-icon icon="lucide:log-out" width="18" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Sign Out</h3>
                    <p className="text-[13px] text-zinc-400 mt-1 max-w-sm">Sign out of your account on this device safely.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="self-start sm:self-center shrink-0 px-5 py-2.5 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-full text-[13px] font-bold transition-colors active:scale-95 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Internal Fallback Toast */}
      {internalToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2.5 rounded-xl border border-[#303034] bg-[#101012] px-4 py-3 text-zinc-100 shadow-2xl animate-fade-in">
          <iconify-icon icon="lucide:check-circle" width="18" className="text-emerald-400" />
          <span className="text-[13px] font-medium">{internalToast}</span>
        </div>
      )}
    </div>
  );
};
