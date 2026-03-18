import React, { useEffect } from 'react';
import { X, FolderGit2, Loader2, Sparkles, History } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ExplanationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  explanations: Record<string, string>;
  activePath: string;
  onSelectPath: (path: string) => void;
  isLoadingFile: string;
}

export const ExplanationSidebar: React.FC<ExplanationSidebarProps> = ({ 
  isOpen, 
  onClose, 
  explanations,
  activePath,
  onSelectPath,
  isLoadingFile 
}) => {
  const hasHistory = Object.keys(explanations).length > 0;
  const activeText = activePath ? explanations[activePath] : null;
  const isCurrentlyLoading = activePath && isLoadingFile === activePath;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[700px] bg-slate-900 border-l border-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">AI Insight</h2>
              {activePath || isLoadingFile ? (
                 <p className="text-xs font-mono text-slate-400 mt-0.5 truncate max-w-[250px]" title={isLoadingFile || activePath}>
                   {isLoadingFile || activePath || '/ (root)'}
                 </p>
              ) : (
                <p className="text-xs text-slate-500 mt-0.5">Select a folder or file to analyze</p>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* History Tabs */}
        {hasHistory && (
          <div className="px-6 py-3 border-b border-slate-800 bg-slate-900 overflow-x-auto whitespace-nowrap flex gap-2 shrink-0 custom-scrollbar items-center">
            <History size={14} className="text-slate-500 shrink-0 mr-1" />
            {Object.keys(explanations).map((path) => (
              <button
                key={path}
                onClick={() => onSelectPath(path)}
                className={`px-3 py-1.5 text-[11px] font-mono rounded-md transition-colors shrink-0 ${
                  activePath === path
                    ? 'bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {path || '/ (root)'}
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 relative" data-lenis-prevent>
          {/* Decorative background logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-800/10 pointer-events-none">
             <FolderGit2 size={150} />
          </div>

          <div className="relative z-10 h-full">
            {isCurrentlyLoading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 className="animate-spin text-indigo-500" size={40} />
                <p className="text-sm font-medium text-slate-400 animate-pulse">Analyzing folder contents and architecture...</p>
              </div>
            ) : activeText ? (
              <div className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-300 leading-relaxed text-sm">
                <ReactMarkdown>{activeText}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">No Insight Selected</h3>
                  <p className="text-sm text-slate-400 max-w-[250px] mx-auto mt-2">
                    Click the "✨ AI" button next to any folder in the tree to generate a deep architectural breakdown or open code file to generate code explanation. You can switch between analyzed folders or files using the history tabs above.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {hasHistory && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-800 text-xs text-center text-slate-400 shrink-0">
            Powered by Explain My Codebase AI
          </div>
        )}
      </div>
    </>
  );
};
