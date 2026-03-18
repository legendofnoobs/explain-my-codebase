'use client';

import { useState } from 'react';
import { X, Key, Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApiKey?: string;
  onUpdateApiKey: (newKey: string) => Promise<void>;
}

const SettingsModal = ({ isOpen, onClose, currentApiKey, onUpdateApiKey }: SettingsModalProps) => {
  const [newKey, setNewKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey) return;
    
    setLoading(true);
    try {
      await onUpdateApiKey(newKey);
      setNewKey('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary-bg/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface-card border-2 border-border-clean rounded-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-lg transition-colors text-text-body hover:text-text-hero"
        >
          <X size={20} />
        </button>
        
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-text-hero tracking-tight flex items-center gap-2">
              <Key className="text-accent-ai" size={24} /> API Settings
            </h3>
            <p className="text-text-body text-sm font-medium">Manage your Gemini API key</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-primary-bg border border-border-clean rounded-lg space-y-2">
              <label className="text-[10px] font-bold text-text-body uppercase tracking-widest">Current Key (Masked)</label>
              <div className="text-text-hero font-mono text-sm tracking-wider break-all">
                {currentApiKey || 'No key set'}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-text-body uppercase tracking-widest">New API Key</label>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-accent-action hover:text-accent-action/80 transition-colors">Get Key</a>
                </div>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="Paste new Gemini API Key..."
                    className="w-full bg-primary-bg border border-border-clean rounded-lg pl-12 pr-12 py-4 outline-none focus:border-accent-action/50 transition-all text-text-hero placeholder:text-text-body/50 text-sm"
                    required
                  />
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body" size={20} />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-body hover:text-accent-ai transition-colors"
                  >
                    {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !newKey}
                className="w-full bg-accent-action hover:bg-accent-action/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-accent-action/30 text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Update API Key</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
