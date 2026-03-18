import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, Loader2, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { repoApi } from '../lib/api';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string;
  fullPath: string;
  repoId: string;
  content: string;
  isLoading: boolean;
}

// Helper to determine language from extension
const getLanguage = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    py: 'python',
    json: 'json',
    html: 'html',
    css: 'css',
    md: 'markdown',
    sh: 'bash',
    yaml: 'yaml',
    yml: 'yaml',
    dockerfile: 'docker',
  };
  return languageMap[ext || ''] || 'text';
};

export const CodeModal = ({ isOpen, onClose, filename, fullPath, repoId, content, isLoading }: CodeModalProps) => {
  const [copied, setCopied] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset explanation state when opening a new file
      setExplanation(null);
      setIsExplaining(false);
      setShowExplanation(true);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, fullPath]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExplain = async () => {
    setIsExplaining(true);
    try {
      const { data } = await repoApi.getFileExplanation(repoId, fullPath);
      setExplanation(data.explanation);
      setShowExplanation(true);
    } catch (err) {
      console.error(err);
      setExplanation('Failed to generate explanation. Please try again.');
    } finally {
      setIsExplaining(false);
    }
  };

  const language = getLanguage(filename);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="ml-2 font-mono text-sm text-slate-400 font-medium truncate max-w-[200px] md:max-w-none">
              {filename}
            </span>
            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded-md">
              {language}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isLoading && (
              <button
                onClick={handleExplain}
                disabled={isExplaining || (!!explanation && showExplanation)}
                className="p-2 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-lg transition-colors text-slate-400 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                title="Explain Code"
              >
                {isExplaining ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                <span className="hidden sm:inline">Explain</span>
              </button>
            )}
            {explanation && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                title={showExplanation ? "Hide Explanation" : "Show Explanation"}
              >
                {showExplanation ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                <span className="hidden sm:inline">{showExplanation ? 'Hide Insight' : 'Show Insight'}</span>
              </button>
            )}
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <div className="w-px h-6 bg-slate-800 mx-1"></div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-slate-500"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area - Split View if explanation exists and is shown */}
        <div className="flex-1 overflow-auto flex flex-col md:flex-row relative bg-[#1e1e1e]" data-lenis-prevent>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-10 w-full h-full">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Code Pane */}
              <div className={`overflow-y-auto h-full flex-1 ${explanation && showExplanation ? 'md:border-r border-slate-700' : ''}`}>
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    minHeight: '100%',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    background: '#1e1e1e', // Match VS Code Dark Plus background
                  }}
                  codeTagProps={{
                    className: 'font-mono'
                  }}
                  lineNumberStyle={{
                    minWidth: '2.5em',
                    paddingRight: '1em',
                    color: '#858585',
                    textAlign: 'right',
                    userSelect: 'none'
                  }}
                >
                  {content}
                </SyntaxHighlighter>
              </div>

              {/* Explanation Pane */}
              {explanation && showExplanation && (
                <div className="md:w-[450px] w-full bg-slate-900 overflow-y-auto sticky top-0 flex flex-col h-full border-l border-slate-800 animate-in slide-in-from-right duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <Sparkles size={20} />
                        <h3 className="text-lg font-bold text-white">AI Code Insight</h3>
                      </div>
                    </div>
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown>{explanation}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
