import { Dialog } from '../common/Dialog';
import React from 'react';
import type { TaskData } from '../../types';

interface DeleteTaskModalProps {
  isOpen: boolean;
  task: TaskData | null;
  onClose: () => void;
  onConfirm: (task: TaskData) => void;
}

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onConfirm,
}) => {

  if (!isOpen || !task) return null;

  return (
    <Dialog label="Delete Task" onClose={onClose}>
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <section
        aria-labelledby="delete-task-heading"
        className="w-full max-w-[440px] rounded-2xl border border-[#2a2a2e] bg-[#101012] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 p-4 sm:p-6"
      >
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
            <iconify-icon icon="lucide:trash-2" width="20" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="delete-task-heading" className="text-base sm:text-[17px] font-bold text-white tracking-tight">Delete Task</h2>
            <p className="text-[12.5px] sm:text-[13px] text-textMuted mt-1 leading-relaxed">
              Are you sure you want to remove <strong className="text-white">"{task.title}"</strong>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-borderPanel">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-borderPanel bg-[#171719] text-[13px] font-bold text-zinc-300 hover:text-white hover:bg-[#232326] transition-colors text-center cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(task);
              onClose();
            }}
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-[13px] font-bold text-white transition-colors shadow-sm flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            <iconify-icon icon="lucide:trash-2" width="14" />
            <span>Delete</span>
          </button>
        </div>
      </section>
    </div>
    </Dialog>
  );
};
