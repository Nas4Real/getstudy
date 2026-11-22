import { Dialog } from '../common/Dialog';
import React, { useState, useEffect } from 'react';
import type { TaskData } from '../../types';

interface EditTaskModalProps {
  isOpen: boolean;
  task: TaskData | null;
  onClose: () => void;
  onSave: (updatedTask: TaskData) => void;
}

function formatToDateInput(val?: string): string {
  if (!val) return '';
  const trimmed = val.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const now = new Date();
  const lower = trimmed.toLowerCase();
  if (lower === 'today') {
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  if (lower === 'yesterday') {
    const prev = new Date(now);
    prev.setDate(prev.getDate() - 1);
    const y = prev.getFullYear();
    const m = String(prev.getMonth() + 1).padStart(2, '0');
    const d = String(prev.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  if (lower === 'tomorrow') {
    const next = new Date(now);
    next.setDate(next.getDate() + 1);
    const y = next.getFullYear();
    const m = String(next.getMonth() + 1).padStart(2, '0');
    const d = String(next.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    if (parsed.getFullYear() < 2020) {
      parsed.setFullYear(now.getFullYear());
    }
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Analyse');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setSubject(task.subject || 'Analyse');
      setDueDate(formatToDateInput(task.dueDate));
      setPriority(task.priority || 'Medium');
      setDescription(task.description || '');
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...task,
      title: title.trim() || task.title,
      subject: subject.trim() || task.subject,
      dueDate: dueDate || task.dueDate,
      priority,
      description: description.trim(),
    });
    onClose();
  };

  return (
    <Dialog label="Edit Task" onClose={onClose}>
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <section
        aria-labelledby="edit-task-title-heading"
        className="w-full max-w-[520px] max-h-[92vh] flex flex-col rounded-2xl border border-[#2a2a2e] bg-[#101012] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-borderPanel p-4 sm:px-6 sm:py-5 shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8]">
              <iconify-icon icon="lucide:pencil" width="20" />
            </div>
            <div>
              <h2 id="edit-task-title-heading" className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight">Edit Task</h2>
              <p className="text-[12.5px] sm:text-[13px] text-textMuted mt-0.5">
                Update task title, due date, subject, or priority.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit task modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#303034] bg-[#171719] text-zinc-400 hover:text-white hover:bg-[#232326] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none shrink-0 min-w-[44px] min-h-[44px]"
          >
            <iconify-icon icon="lucide:x" width="18" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="space-y-4 p-4 sm:px-6 sm:py-5 overflow-y-auto flex-1">
            <div>
              <label htmlFor="edit-task-title-input" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Task Title
              </label>
              <input
                id="edit-task-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#171719] border border-borderPanel text-white text-[14px] focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-white/10 transition-colors"
                placeholder="e.g. Complete Exercises 1-4"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-task-subject-select" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Subject
                </label>
                <select
                  id="edit-task-subject-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171719] border border-borderPanel text-white text-[14px] focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-white/10 transition-colors"
                >
                  <option value="Analyse">Analyse</option>
                  <option value="Algèbre">Algèbre</option>
                  <option value="Physique">Physique</option>
                  <option value="Mécanique">Mécanique</option>
                  <option value="Méthodologie">Méthodologie</option>
                  <option value="Math">Math</option>
                </select>
              </div>

              <div>
                <label htmlFor="edit-task-due-date" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Due Date
                </label>
                <input
                  id="edit-task-due-date"
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171719] border border-borderPanel text-white text-[14px] focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-white/10 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <span className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Priority
              </span>
              <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Priority">
                {(['High', 'Medium', 'Low'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={priority === p}
                    onClick={() => setPriority(p)}
                    className={`py-2 rounded-xl text-[13px] font-bold border transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                      priority === p
                        ? p === 'High'
                          ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-sm'
                          : p === 'Medium'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                        : 'bg-[#171719] text-zinc-400 border-borderPanel hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="edit-task-description" className="block text-[12px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Description
              </label>
              <textarea
                id="edit-task-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#171719] border border-borderPanel text-white text-[14px] focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-white/10 transition-colors resize-none"
                placeholder="Add notes or task instructions..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 sm:gap-3 border-t border-borderPanel p-4 sm:px-6 sm:py-4 bg-[#141416]/50 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-borderPanel bg-[#171719] text-[13px] font-bold text-zinc-300 hover:text-white hover:bg-[#232326] transition-colors text-center cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-[13px] font-bold text-black hover:bg-zinc-200 transition-colors shadow-sm text-center cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
    </Dialog>
  );
};
