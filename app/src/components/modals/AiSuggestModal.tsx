import { Dialog } from '../common/Dialog';
import React, { useState } from 'react';
import type { SessionData } from '../../types';

interface AiSuggestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptSuggestion?: (session: SessionData) => void;
  onAcceptAll?: (sessions: SessionData[]) => void;
}

interface SuggestionCard {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  date: string;
  time: string;
  duration: string;
  reason: string;
  priority: 'High' | 'Medium';
}

const AI_SUGGESTIONS: SuggestionCard[] = [
  {
    id: 'sug-1',
    title: 'Réduction des Endomorphismes (Diagonalisation)',
    subject: 'Algèbre',
    subjectColor: '#a855f7',
    date: 'Tomorrow, May 8',
    time: '14:00 - 16:00',
    duration: '2h 00m',
    reason: 'Exam in 2 days. This topic accounts for ~40% of the midterm grade.',
    priority: 'High',
  },
  {
    id: 'sug-2',
    title: 'Intégrales Généralisées & Critères de Cauchy',
    subject: 'Analyse',
    subjectColor: '#06b6d4',
    date: 'Friday, May 9',
    time: '16:30 - 18:00',
    duration: '1h 30m',
    reason: 'Identified as "Intermediate" mastery level with 3 unsolved practice problems.',
    priority: 'Medium',
  },
  {
    id: 'sug-3',
    title: 'Oscillations Forcées & Résonance',
    subject: 'Physique',
    subjectColor: '#10b981',
    date: 'Saturday, May 10',
    time: '10:00 - 11:30',
    duration: '1h 30m',
    reason: 'Prepares you for the upcoming lab practical on damped oscillators.',
    priority: 'Medium',
  },
];

export const AiSuggestModal: React.FC<AiSuggestModalProps> = ({
  isOpen,
  onClose,
  onAcceptSuggestion,
  onAcceptAll,
}) => {
  const [suggestions] = useState<SuggestionCard[]>(AI_SUGGESTIONS);
  const [scheduledIds, setScheduledIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleScheduleOne = (sug: SuggestionCard) => {
    setScheduledIds((prev) => [...prev, sug.id]);
    onAcceptSuggestion?.({
      id: `session-ai-${Date.now()}`,
      title: sug.title,
      subject: sug.subject,
      subjectColor: sug.subjectColor,
      date: sug.date,
      time: sug.time,
      description: sug.reason,
      status: 'upcoming',
      type: 'revision',
    });
  };

  const handleScheduleAll = () => {
    const newSessions: SessionData[] = suggestions.map((sug) => ({
      id: `session-ai-${Date.now()}-${sug.id}`,
      title: sug.title,
      subject: sug.subject,
      subjectColor: sug.subjectColor,
      date: sug.date,
      time: sug.time,
      description: sug.reason,
      status: 'upcoming',
      type: 'revision',
    }));
    onAcceptAll?.(newSessions);
    onClose();
  };

  return (
    <Dialog label="Smart study suggestions" onClose={onClose}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" aria-labelledby="ai-suggest-title">
      <div className="relative w-full max-w-xl rounded-2xl border border-borderPanel bg-[#101013] p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-borderPanel shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 flex items-center justify-center shrink-0 shadow-inner">
              <iconify-icon icon="lucide:sparkles" width="20" />
            </div>
            <div>
              <h2 id="ai-suggest-title" className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight flex items-center gap-2">
                <span>AI Study Session Suggestions</span>
                <span className="text-[11px] font-bold text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Smart Plan
                </span>
              </h2>
              <p className="text-[12.5px] sm:text-[13px] text-zinc-400">
                Tailored revision slots based on your exam dates & chapter mastery.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI suggestions dialog"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-cardHover transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none shrink-0 min-w-[44px] min-h-[44px]"
          >
            <iconify-icon icon="lucide:x" width="18" />
          </button>
        </div>

        {/* Suggestions List */}
        <div className="flex-1 overflow-y-auto py-4 sm:py-5 flex flex-col gap-3.5">
          {suggestions.map((sug) => {
            const isAdded = scheduledIds.includes(sug.id);

            return (
              <div
                key={sug.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col gap-3 ${
                  isAdded
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-borderPanel bg-[#141417] hover:border-zinc-500'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: `${sug.subjectColor}15`,
                        borderColor: `${sug.subjectColor}35`,
                        color: sug.subjectColor,
                      }}
                    >
                      {sug.subject}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {sug.duration}
                    </span>
                    {sug.priority === 'High' && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/25">
                        High Yield
                      </span>
                    )}
                  </div>

                  <span className="text-[12px] font-bold text-zinc-300 flex items-center gap-1.5 shrink-0 bg-[#1c1c22] px-2.5 py-1 rounded-lg border border-[#2c2c34]">
                    <iconify-icon icon="lucide:calendar" width="13" className="text-zinc-400" />
                    {sug.date} • {sug.time}
                  </span>
                </div>

                <div>
                  <h4 className="text-[15px] font-bold text-white tracking-tight">
                    {sug.title}
                  </h4>
                  <p className="text-[12px] text-zinc-400 leading-relaxed mt-1 flex items-start gap-1.5">
                    <iconify-icon icon="lucide:info" width="14" className="text-purple-400 mt-0.5 shrink-0" />
                    <span>{sug.reason}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-borderPanel/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[12px] text-textSubtle">Suggested by GetStudy AI</span>
                  <button
                    type="button"
                    onClick={() => handleScheduleOne(sug)}
                    disabled={isAdded}
                    className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto ${
                      isAdded
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 cursor-default'
                        : 'bg-white hover:bg-zinc-200 text-black shadow-sm active:scale-95 cursor-pointer'
                    }`}
                  >
                    <iconify-icon icon={isAdded ? 'lucide:check' : 'lucide:plus'} width="14" />
                    <span>{isAdded ? 'Added to Calendar' : 'Add to Schedule'}</span>
                  </button>
                </div>
              </div>
            );
          })}
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
            onClick={handleScheduleAll}
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[13px] transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <iconify-icon icon="lucide:calendar-plus" width="15" />
            <span>Schedule All 3 Sessions</span>
          </button>
        </div>
      </div>
    </div>
    </Dialog>
  );
};
