import { Dialog } from '../common/Dialog';
import React, { useState, useRef } from 'react';

export interface DocumentUploadData {
  title: string;
  subject: string;
  subjectColor: string;
  category: 'Course Notes' | 'Devoir / TD' | 'Past Exam' | 'Summary';
  fileName: string;
  fileSize: string;
  saveToDrive: boolean;
  generateAiSummary: boolean;
}

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (doc: DocumentUploadData) => void;
}

const AVAILABLE_SUBJECTS = [
  { id: 'sub-analyse', name: 'Analyse', color: '#06b6d4' },
  { id: 'sub-physique', name: 'Physique', color: '#10b981' },
  { id: 'sub-algebre', name: 'Algèbre', color: '#a855f7' },
  { id: 'sub-info', name: 'Informatique', color: '#f59e0b' },
];

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('sub-analyse');
  const [category, setCategory] = useState<'Course Notes' | 'Devoir / TD' | 'Past Exam' | 'Summary'>('Devoir / TD');
  const [saveToDrive, setSaveToDrive] = useState(true);
  const [generateAiSummary, setGenerateAiSummary] = useState(true);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>({
    name: 'Devoir_Synthese_2026.pdf',
    size: '2.4 MB',
  });
  const [isUploading, setIsUploading] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('upload') === 'uploading' || p.get('state') === 'uploading';
    }
    return false;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      setSelectedFile({
        name: file.name,
        size: `${sizeInMb} MB`,
      });
      if (!title.trim()) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  if (!isOpen) return null;

  const currentSubject = AVAILABLE_SUBJECTS.find((s) => s.id === selectedSubjectId) || AVAILABLE_SUBJECTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      onUpload?.({
        title: title.trim(),
        subject: currentSubject.name,
        subjectColor: currentSubject.color,
        category,
        fileName: selectedFile?.name || `${title.replace(/\s+/g, '_')}.pdf`,
        fileSize: selectedFile?.size || '1.8 MB',
        saveToDrive,
        generateAiSummary,
      });
      setIsUploading(false);
      onClose();
    }, 700);
  };

  return (
    <Dialog label="Upload Document" onClose={onClose}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" aria-labelledby="upload-modal-title">
      <div className="relative w-full max-w-lg rounded-2xl border border-borderPanel bg-[#101013] p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#232328]">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <iconify-icon icon="lucide:file-up" width="20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="upload-modal-title" className="text-base sm:text-[18px] font-bold text-white tracking-tight">Upload Study Document</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Drive Sync
                </span>
              </div>
              <p className="text-[13px] font-medium text-zinc-400 mt-0.5">
                Attach lecture notes, tutorial series, or past exams for automatic AI indexing.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close upload dialog"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#1a1a20] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none shrink-0 min-w-[44px] min-h-[44px]"
          >
            <iconify-icon icon="lucide:x" width="18" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-5 flex flex-col gap-5">
          {/* File Dropzone */}
          <div>
            <label htmlFor="doc-file-input" className="block text-[13px] font-semibold text-zinc-300 mb-2">Attached File</label>
            <input
              id="doc-file-input"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.docx,.doc,.txt,.tex,.png,.jpg,.jpeg"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload document file"
              className="w-full border-2 border-dashed border-[#2c2c34] hover:border-zinc-500 rounded-xl p-5 bg-[#141417] flex flex-col items-center justify-center text-center cursor-pointer transition-colors group focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#1e1e24] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors mb-2">
                <iconify-icon icon="lucide:upload-cloud" width="20" />
              </div>
              <span className="text-[13px] font-bold text-white">
                {selectedFile ? selectedFile.name : 'Click to select or drag & drop'}
              </span>
              <span className="text-[11px] text-zinc-400 mt-0.5">
                {selectedFile ? `Size: ${selectedFile.size} • PDF Document (Click to change)` : 'PDF, DOCX, LaTeX, or image scans up to 50MB'}
              </span>
            </button>
          </div>

          {/* Document Title */}
          <div>
            <label htmlFor="doc-title" className="block text-[13px] font-semibold text-zinc-300 mb-2">Document Title</label>
            <input
              id="doc-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Devoir de Contrôle N°2 - Corrigé Détaillé"
              className="w-full h-11 bg-[#141417] border border-borderPanel rounded-xl px-4 text-[14px] text-white placeholder:text-zinc-400 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/10 transition-colors"
            />
          </div>

          {/* Subject & Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="doc-subject" className="block text-[13px] font-semibold text-zinc-300 mb-2">Subject</label>
              <select
                id="doc-subject"
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full h-11 bg-[#141417] border border-borderPanel rounded-xl px-3 text-[13px] font-semibold text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/10 transition-colors"
              >
                {AVAILABLE_SUBJECTS.map((sub) => (
                  <option key={sub.id} value={sub.id} className="bg-cardBg text-white">
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="doc-category" className="block text-[13px] font-semibold text-zinc-300 mb-2">Category</label>
              <select
                id="doc-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-11 bg-[#141417] border border-borderPanel rounded-xl px-3 text-[13px] font-semibold text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/10 transition-colors"
              >
                <option value="Devoir / TD">Devoir / TD</option>
                <option value="Course Notes">Course Notes</option>
                <option value="Past Exam">Past Exam</option>
                <option value="Summary">Summary Sheet</option>
              </select>
            </div>
          </div>

          {/* Cloud & AI Automation Toggles */}
          <div className="rounded-xl border border-borderPanel bg-[#141417] divide-y divide-[#27272a]">
            {/* Google Drive Toggle */}
            <div className="p-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:cloud" width="16" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">Save to Google Drive</div>
                  <div className="text-[11px] text-zinc-400">Mirror file to /GetStudy/{currentSubject.name}</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={saveToDrive}
                aria-label="Save to Google Drive"
                onClick={() => setSaveToDrive((prev) => !prev)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  saveToDrive ? 'bg-white' : 'bg-[#27272a]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform ${
                    saveToDrive ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                  }`}
                />
              </button>
            </div>

            {/* AI Summary Toggle */}
            <div className="p-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:sparkles" width="16" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">Generate AI Summary</div>
                  <div className="text-[11px] text-zinc-400">Extract key formulas and difficult questions</div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={generateAiSummary}
                aria-label="Generate AI Summary"
                onClick={() => setGenerateAiSummary((prev) => !prev)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  generateAiSummary ? 'bg-white' : 'bg-[#27272a]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform ${
                    generateAiSummary ? 'translate-x-5 bg-black' : 'translate-x-0 bg-zinc-400'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-borderPanel flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2.5 rounded-xl border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-[13px] transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <iconify-icon icon="lucide:x" width="14" />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[13px] transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              {isUploading ? (
                <>
                  <iconify-icon icon="lucide:loader-2" width="15" className="animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <iconify-icon icon="lucide:check" width="15" />
                  <span>Upload Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </Dialog>
  );
};
