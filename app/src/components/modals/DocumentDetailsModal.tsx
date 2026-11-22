import { Dialog } from '../common/Dialog';
import React, { useState } from 'react';

export interface DocumentItem {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  date: string;
  size: string;
  type: string;
  driveSynced?: boolean;
  drivePath?: string;
  summary?: string;
  keyPoints?: string[];
}

interface DocumentDetailsModalProps {
  isOpen: boolean;
  document: DocumentItem | null;
  onClose: () => void;
  onAskAi?: (doc: DocumentItem) => void;
  onDelete?: (id: string) => void;
}

export const DocumentDetailsModal: React.FC<DocumentDetailsModalProps> = ({
  isOpen,
  document,
  onClose,
  onAskAi,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters'>('overview');

  if (!isOpen || !document) return null;

  return (
    <Dialog label="Document details" onClose={onClose}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" aria-labelledby="doc-details-title">
      <div className="relative w-full max-w-2xl rounded-2xl border border-borderPanel bg-[#101013] p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3.5 sm:pb-4 border-b border-borderPanel">
          <div className="flex items-start gap-3.5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border mt-0.5"
              style={{
                backgroundColor: `${document.subjectColor || '#38bdf8'}15`,
                borderColor: `${document.subjectColor || '#38bdf8'}35`,
                color: document.subjectColor || '#38bdf8',
              }}
            >
              <iconify-icon icon="lucide:file-text" width="22" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: `${document.subjectColor || '#38bdf8'}15`,
                    borderColor: `${document.subjectColor || '#38bdf8'}35`,
                    color: document.subjectColor || '#38bdf8',
                  }}
                >
                  {document.subject}
                </span>
                <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 rounded-md">
                  {document.type || 'PDF Document'}
                </span>
                {document.driveSynced && (
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <iconify-icon icon="lucide:cloud-check" width="12" />
                    Drive Synced
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-white tracking-tight mt-1.5">
                {document.title}
              </h2>
              <p className="text-[12px] font-medium text-zinc-400 mt-0.5">
                Uploaded {document.date} • {document.size}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close document details"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-cardHover transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px]"
          >
            <iconify-icon icon="lucide:x" width="18" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-borderPanel/60">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-cardHover'
            }`}
          >
            Document Summary
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === 'chapters'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-cardHover'
            }`}
          >
            Related Chapters
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-4">
              {/* Document Summary Card (No storage info, full summary) */}
              <div className="rounded-2xl border border-[#232328] bg-[#0c0c0f] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-[#1c1c22]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                      <iconify-icon icon="lucide:file-text" width="16" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-white tracking-tight">
                        Document Summary
                      </h4>
                      <span className="text-[11px] font-mono text-textSubtle">
                        Synthesized academic briefing
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Index
                  </span>
                </div>

                {/* Main Summary Text */}
                <p className="text-[13.5px] text-zinc-200 leading-relaxed font-sans">
                  {document.summary ||
                    `This document covers core examination topics in ${document.subject}, including foundational theorems, step-by-step problem-solving methods, and typical exam questions with full derivations.`}
                </p>

                {/* Core Highlights & Takeaways */}
                <div className="mt-4 pt-4 border-t border-[#1c1c22]">
                  <h5 className="text-[11.5px] font-mono uppercase tracking-wider font-bold text-zinc-400 mb-2.5 flex items-center gap-1.5">
                    <iconify-icon icon="lucide:check-circle" width="14" className="text-textSubtle" />
                    Core Highlights & Key Points
                  </h5>
                  <ul className="flex flex-col gap-2">
                    {(document.keyPoints && document.keyPoints.length > 0
                      ? document.keyPoints
                      : [
                          'Key definitions, formal proofs, and theorems aligned with current course modules.',
                          'Step-by-step resolution techniques for recurrent midterms and TD exercises.',
                          'Formulas, criteria, and common pitfalls to review before exams.',
                        ]
                    ).map((point, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-[13px] text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clean Metadata Pills */}
              <div className="grid grid-cols-3 gap-2.5 text-[12px]">
                <div className="p-3 rounded-xl bg-[#121216] border border-[#202026] flex items-center gap-2.5">
                  <iconify-icon icon="lucide:file" width="16" className="text-textSubtle shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase font-bold text-textSubtle block leading-none">Format</span>
                    <span className="font-bold text-zinc-200 text-[12px] mt-0.5 block truncate">
                      {document.type || 'PDF Document'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#121216] border border-[#202026] flex items-center gap-2.5">
                  <iconify-icon icon="lucide:hard-drive" width="16" className="text-textSubtle shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase font-bold text-textSubtle block leading-none">File Size</span>
                    <span className="font-bold text-zinc-200 text-[12px] mt-0.5 block truncate">
                      {document.size}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#121216] border border-[#202026] flex items-center gap-2.5">
                  <iconify-icon icon="lucide:calendar" width="16" className="text-textSubtle shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase font-bold text-textSubtle block leading-none">Added Date</span>
                    <span className="font-bold text-zinc-200 text-[12px] mt-0.5 block truncate">
                      {document.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-borderPanel bg-[#141417] p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-white">Chapter 2: Espaces Vectoriels</h4>
                  <p className="text-[12px] text-zinc-400">Mastery Level: Mastered • 100% Covered</p>
                </div>
                <span className="text-[12px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                  Aligned
                </span>
              </div>
              <div className="rounded-xl border border-borderPanel bg-[#141417] p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-white">Chapter 3: Réduction des Endomorphismes</h4>
                  <p className="text-[12px] text-zinc-400">Mastery Level: Intermediate • Needs revision</p>
                </div>
                <span className="text-[12px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  Practice Needed
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-borderPanel flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-[13px] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <iconify-icon icon="lucide:x" width="14" />
              <span>Close</span>
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  onDelete(document.id);
                  onClose();
                }}
                className="px-3.5 py-2.5 rounded-xl border border-red-500/20 hover:border-red-500/40 text-red-400/80 hover:text-red-400 text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Delete document"
              >
                <iconify-icon icon="lucide:trash-2" width="14" />
                <span>Delete</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end">
            {onAskAi && (
              <button
                type="button"
                onClick={() => {
                  onAskAi(document);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl border border-purple-500/30 bg-purple-950/20 hover:bg-purple-950/40 text-purple-300 font-bold text-[13px] transition-all flex items-center gap-1.5"
              >
                <iconify-icon icon="lucide:sparkles" width="15" />
                <span>Ask AI Assistant</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => alert(`Downloading ${document.title}...`)}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[13px] transition-all shadow-sm flex items-center gap-2 active:scale-95"
            >
              <iconify-icon icon="lucide:download" width="15" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </Dialog>
  );
};
