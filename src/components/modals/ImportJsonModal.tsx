import { Dialog } from '../common/Dialog';
import React, { useState, useRef } from 'react';
import type { SessionData, TaskData } from '../../types';

interface ImportJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: { sessions?: SessionData[]; tasks?: TaskData[] }) => void;
}

export const ImportJsonModal: React.FC<ImportJsonModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedSessions, setParsedSessions] = useState<SessionData[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateAndParse = (jsonString: string) => {
    try {
      if (!jsonString.trim()) {
        setParsedSessions([]);
        setValidationError(null);
        return false;
      }

      const parsed = JSON.parse(jsonString);
      let sessions: SessionData[] = [];

      if (Array.isArray(parsed)) {
        sessions = parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        if (Array.isArray(parsed.sessions)) {
          sessions = parsed.sessions;
        } else if (Array.isArray(parsed.timetable)) {
          sessions = parsed.timetable;
        } else if (Array.isArray(parsed.classes)) {
          sessions = parsed.classes;
        } else if (Array.isArray(parsed.events)) {
          sessions = parsed.events;
        }
      }

      const validSessions = sessions.filter((s) => s && (s.title || s.subject));

      if (validSessions.length === 0) {
        setValidationError('No timetable sessions found. Ensure the file contains a list of classes.');
        setParsedSessions([]);
        return false;
      }

      setParsedSessions(validSessions);
      setValidationError(null);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid JSON format';
      setValidationError(`Syntax error: ${message}`);
      setParsedSessions([]);
      return false;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      setRawText(text);
      validateAndParse(text);
    };
    reader.readAsText(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawText(val);
    validateAndParse(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedSessions.length === 0) return;

    onImport({ sessions: parsedSessions });
    onClose();
  };

  return (
    <Dialog label="Import Timetable" onClose={onClose}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-borderPanel bg-[#101013] p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header - Consistent with other popups, NO top rainbow stripe */}
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#232328] shrink-0">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:calendar" width="20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-[18px] font-bold text-white tracking-tight">Import Timetable</h2>
                <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  .JSON
                </span>
              </div>
              <p className="text-[12.5px] sm:text-[13px] text-zinc-400 mt-0.5">
                Upload your class schedule or timetable file.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close import dialog"
            className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#1a1a1e] transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
          >
            <iconify-icon icon="lucide:x" width="18" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 sm:py-5 space-y-4">
          {/* Segmented Tab Bar */}
          <div className="flex items-center">
            <div className="inline-flex bg-[#141417] p-1 rounded-xl border border-[#232328]">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <iconify-icon icon="lucide:upload-cloud" width="15" />
                <span>Upload File</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('paste')}
                className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'paste'
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <iconify-icon icon="lucide:code-2" width="15" />
                <span>Paste JSON</span>
              </button>
            </div>
          </div>

          {/* Upload Dropzone */}
          {activeTab === 'upload' && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json,application/json"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#27272f] hover:border-zinc-400 rounded-2xl p-7 bg-[#121216] hover:bg-[#15151a] flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1b1b22] border border-[#2b2b36] flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 group-hover:scale-105 transition-all mb-3 shadow-inner">
                  <iconify-icon icon={fileName ? "lucide:file-check" : "lucide:upload-cloud"} width="22" />
                </div>
                <span className="text-[14px] font-bold text-white">
                  {fileName ? fileName : 'Click to browse or drop timetable (.json)'}
                </span>
                <span className="text-[12px] text-zinc-400 mt-1">
                  Expected fields: title, subject, time, date, room
                </span>
              </div>
            </div>
          )}

          {/* Paste JSON */}
          {activeTab === 'paste' && (
            <div>
              <textarea
                value={rawText}
                onChange={handleTextChange}
                rows={7}
                placeholder={'[\n  {\n    "title": "Algèbre TD",\n    "subject": "Algèbre",\n    "time": "10:00 - 11:30",\n    "date": "Jeudi 7 Mai"\n  }\n]'}
                className="w-full bg-[#121216] border border-[#27272f] focus:border-cyan-500/50 rounded-xl p-3.5 text-[12.5px] font-mono text-zinc-200 placeholder:text-zinc-400 focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>
          )}

          {/* Validation Feedback */}
          {validationError && (
            <div className="rounded-xl border border-red-500/25 bg-red-950/20 p-3 px-3.5 flex items-start gap-2.5">
              <iconify-icon icon="lucide:alert-circle" width="16" className="text-red-400 shrink-0 mt-0.5" />
              <div className="text-[12.5px] text-red-300 leading-snug">
                {validationError}
              </div>
            </div>
          )}

          {!validationError && parsedSessions.length > 0 && (
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 p-3.5 px-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:check-circle-2" width="16" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-white truncate">
                    Ready to import {parsedSessions.length} session{parsedSessions.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-[11.5px] text-zinc-400 truncate">
                    {Array.from(new Set(parsedSessions.map((s) => s.subject))).join(', ')}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                Valid Timetable
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#232328] flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-borderPanel bg-[#141417] hover:bg-[#1a1a20] text-zinc-300 hover:text-white text-[13px] font-bold transition-all text-center cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={parsedSessions.length === 0}
            className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed text-black text-[13px] font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <iconify-icon icon="lucide:calendar-plus" width="15" />
            <span>Import Timetable {parsedSessions.length > 0 ? `(${parsedSessions.length})` : ''}</span>
          </button>
        </div>
      </div>
    </div>
    </Dialog>
  );
};
