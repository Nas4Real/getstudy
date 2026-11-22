import React, { useState } from 'react';

export const GoogleDriveIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.6 66.85L10.45 73.5C11.25 74.9 12.4 76 13.75 76.8L27.5 53H0C0 54.55 0.4 56.1 1.2 57.5L6.6 66.85Z" fill="#0066DA" />
    <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.5C0.4 49.9 0 51.45 0 53H27.5L43.65 25Z" fill="#00AC47" />
    <path d="M73.55 76.8C74.9 76 76.05 74.9 76.85 73.5L86.1 57.5C86.9 56.1 87.3 54.55 87.3 53H59.8L73.55 76.8Z" fill="#EA4335" />
    <path d="M43.65 25L57.4 1.2C56.05 0.4 54.5 0 52.9 0H34.4C32.8 0 31.25 0.45 29.9 1.2L43.65 25Z" fill="#00832D" />
    <path d="M59.8 53H27.5L13.75 76.8C15.1 77.6 16.65 78 18.25 78H69.05C70.65 78 72.2 77.55 73.55 76.8L59.8 53Z" fill="#2684FC" />
    <path d="M73.55 25.5L60.85 3.5C60.05 2.1 58.9 1 57.4 0.2L43.65 25L59.8 53H87.3C87.3 51.45 86.9 49.9 86.1 48.5L73.55 25.5Z" fill="#FFBA00" />
  </svg>
);

export interface GoogleDriveSectionProps {
  onShowToast?: (msg: string) => void;
  initialConnected?: boolean;
}

export const GoogleDriveSection: React.FC<GoogleDriveSectionProps> = ({ onShowToast, initialConnected = true }) => {
  const [isConnected, setIsConnected] = useState(initialConnected);
  const [autoSync, setAutoSync] = useState(true);
  const [isSyncing, setIsSyncing] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('settings') === 'syncing' || p.get('sync') === 'active';
    }
    return false;
  });
  const [lastSyncedTime, setLastSyncedTime] = useState('2 minutes ago');

  const email = 'jane.doe@gmail.com';
  const usedGB = 4.2;
  const totalGB = 15;
  const usedPercentage = Math.round((usedGB / totalGB) * 100);

  const handleSyncNow = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedTime('Just now');
      onShowToast?.('Google Drive synchronized successfully');
    }, 1200);
  };

  const handleToggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      onShowToast?.('Google Drive disconnected');
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('settings', 'disconnected');
        window.history.replaceState({}, '', url.toString());
      }
    } else {
      setIsConnected(true);
      setLastSyncedTime('Just now');
      onShowToast?.('Google Drive connected as primary storage');
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('settings');
        window.history.replaceState({}, '', url.toString());
      }
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider">
          Cloud Storage
        </h2>
        {isConnected && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Connected
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-borderPanel bg-[#0c0c0e] shadow-sm overflow-hidden">
        {/* Main Drive Row */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-[#202024]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#141418] border border-borderPanel flex items-center justify-center shrink-0 shadow-inner">
              <GoogleDriveIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-base font-bold text-white tracking-tight">Google Drive Sync</h3>
                <span className="text-[11px] font-semibold text-zinc-400 bg-[#16161a] border border-[#26262c] px-2 py-0.5 rounded-md">
                  {totalGB} GB Cloud Quota
                </span>
              </div>
              <p className="text-[13px] text-zinc-400 mt-1">
                {isConnected
                  ? `Mirrored with ${email}. All revision summaries and document PDFs are backed up safely.`
                  : 'Connect your Google account to back up documents, revision summaries, and exams.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center w-full sm:w-auto justify-end flex-wrap">
            {isConnected ? (
              <>
                <button
                  type="button"
                  onClick={handleSyncNow}
                  disabled={isSyncing}
                  className="px-4 py-2 border border-[#2b2b32] bg-[#141418] hover:bg-[#1a1a20] text-white rounded-xl text-[13px] font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <iconify-icon
                    icon="lucide:refresh-cw"
                    width="14"
                    className={`text-zinc-400 ${isSyncing ? 'animate-spin text-white' : ''}`}
                  />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleConnection}
                  className="px-3.5 py-2 border border-[#2c2c34] hover:border-red-500/40 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl text-[13px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleToggleConnection}
                className="w-full sm:w-auto justify-center px-5 py-2.5 bg-white hover:bg-zinc-200 text-black rounded-xl text-[13px] font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <GoogleDriveIcon className="w-4 h-4" />
                <span>Connect Google Drive</span>
              </button>
            )}
          </div>
        </div>

        {/* Clean Storage & Auto-Sync Row (No Clutter) */}
        {isConnected && (
          <div className="p-4 sm:p-6 flex flex-col gap-5 bg-[#08080a]">
            {/* Storage Bar */}
            <div>
              <div className="flex items-center justify-between text-[13px] mb-2 font-medium">
                <span className="text-zinc-300 font-semibold">Google Drive Storage</span>
                <span className="text-white font-bold">
                  {usedGB} GB / {totalGB} GB ({usedPercentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#18181f] rounded-full overflow-hidden border border-[#25252c]">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${usedPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11.5px] text-textSubtle mt-2">
                <span>{(totalGB - usedGB).toFixed(1)} GB available</span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <iconify-icon icon="lucide:check" width="12" className="text-emerald-400" />
                  Last synced: {lastSyncedTime}
                </span>
              </div>
            </div>

            {/* Single Clear Auto-Sync Toggle */}
            <div className="pt-4 border-t border-[#1c1c22] flex items-center justify-between gap-4">
              <div>
                <h4 className="text-[14px] font-bold text-white">Automatic Cloud Sync</h4>
                <p className="text-[12.5px] text-zinc-400 mt-0.5">
                  Keep study notes, assignments, and generated summaries automatically synchronized.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-label="Automatic sync"
                aria-checked={autoSync}
                onClick={() => {
                  setAutoSync((prev) => !prev);
                  onShowToast?.(`Automatic sync ${!autoSync ? 'enabled' : 'disabled'}`);
                }}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
                  autoSync ? 'bg-white' : 'bg-[#27272a]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform ${
                    autoSync ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
