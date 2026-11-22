import { Dialog } from '../common/Dialog';
import React, { useState } from 'react';

interface NotificationPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (settings: Record<string, boolean>) => void;
}

export const NotificationPreferencesModal: React.FC<NotificationPreferencesModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [prefs, setPrefs] = useState({
    exam48h: true,
    examMorning: true,
    class15m: true,
    assignment24h: true,
    assignment2h: true,
    aiDigest: true,
    driveSync: false,
    soundEffects: true,
  });

  if (!isOpen) return null;

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave?.(prefs);
    onClose();
  };

  return (
    <Dialog label="Notification preferences" onClose={onClose}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" aria-labelledby="notification-prefs-title">
      <div className="relative w-full max-w-lg rounded-2xl border border-borderPanel bg-[#101013] p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-borderPanel shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:bell-ring" width="20" />
            </div>
            <div>
              <h2 className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight">Notification Settings</h2>
              <p className="text-[12.5px] sm:text-[13px] text-zinc-400">Choose when and how GetStudy alerts you.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification settings"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-cardHover transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
          >
            <iconify-icon icon="lucide:x" width="18" />
          </button>
        </div>

        {/* Scrollable Settings */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-5">
          {/* Section: Exams & Deadlines */}
          <div>
            <h4 className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
              Exams & Deadlines
            </h4>
            <div className="rounded-xl border border-borderPanel bg-[#141417] divide-y divide-[#27272a]">
              <div className="p-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-white">48h Before Exam</div>
                  <div className="text-[12px] text-zinc-400">Send high-priority reminder with room and chapter list.</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle('exam48h')}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    prefs.exam48h ? 'bg-white' : 'bg-[#27272a]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      prefs.exam48h ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-white">Morning of Exam (07:00 AM)</div>
                  <div className="text-[12px] text-zinc-400">Wake-up checklist and countdown alert.</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle('examMorning')}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    prefs.examMorning ? 'bg-white' : 'bg-[#27272a]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      prefs.examMorning ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-white">Assignment Due in 24 Hours</div>
                  <div className="text-[12px] text-zinc-400">Alert for pending homework and exercises.</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle('assignment24h')}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    prefs.assignment24h ? 'bg-white' : 'bg-[#27272a]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      prefs.assignment24h ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Section: Daily Routine & AI */}
          <div>
            <h4 className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
              Daily Schedule & AI
            </h4>
            <div className="rounded-xl border border-borderPanel bg-[#141417] divide-y divide-[#27272a]">
              <div className="p-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-white">Class Starts in 15 Minutes</div>
                  <div className="text-[12px] text-zinc-400">Alert with lab number and professor name.</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle('class15m')}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    prefs.class15m ? 'bg-white' : 'bg-[#27272a]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      prefs.class15m ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-white">Morning AI Study Digest (08:00 AM)</div>
                  <div className="text-[12px] text-zinc-400">Brief summary of today's targets and recommended revision slots.</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle('aiDigest')}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    prefs.aiDigest ? 'bg-white' : 'bg-[#27272a]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      prefs.aiDigest ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-white">Google Drive Cloud Sync Notice</div>
                  <div className="text-[12px] text-zinc-400">Notify when weekly cloud backup finishes.</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle('driveSync')}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    prefs.driveSync ? 'bg-white' : 'bg-[#27272a]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      prefs.driveSync ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-borderPanel flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-[13px] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <iconify-icon icon="lucide:x" width="14" />
            <span>Cancel</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[13px] transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <iconify-icon icon="lucide:check" width="15" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
    </Dialog>
  );
};
