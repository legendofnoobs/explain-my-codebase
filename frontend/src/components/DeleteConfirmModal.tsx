'use client';

import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  repoName?: string;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, repoName }: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary-bg/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-surface-card border-2 border-border-clean rounded-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-lg flex items-center justify-center border border-rose-500/20">
            <AlertTriangle size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-text-hero tracking-tight">Delete Project?</h3>
            <p className="text-text-body text-sm font-medium leading-relaxed">
              Are you sure you want to delete <span className="text-text-hero font-bold">"{repoName}"</span>? 
              This action cannot be undone.
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-rose-600/20 text-sm"
            >
              Confirm Delete
            </button>
            <button
              onClick={onClose}
              className="w-full bg-white/5 hover:bg-white/10 text-text-body hover:text-text-hero font-bold py-4 rounded-lg transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
