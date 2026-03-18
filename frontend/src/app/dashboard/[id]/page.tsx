'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FileTree } from '../../../components/FileTree';
import { ArchitectureSummary } from '../../../components/ArchitectureSummary';
import { CodeModal } from '../../../components/CodeModal';
import { ExplanationSidebar } from '../../../components/ExplanationSidebar';
import { repoApi } from '../../../lib/api';
import { IRepository } from '../../../types';
import { Loader2, AlertCircle, X, Github, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { id } = useParams();
  const [repo, setRepo] = useState<IRepository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Explanation Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [activeExplainPath, setActiveExplainPath] = useState<string>('');
  const [loadingExpl, setLoadingExpl] = useState('');

  // File Content State
  const [codeModal, setCodeModal] = useState<{ isOpen: boolean; filename: string; fullPath: string; content: string; isLoading: boolean }>({
    isOpen: false,
    filename: '',
    fullPath: '',
    content: '',
    isLoading: false
  });

  useEffect(() => {
    if (id) {
      repoApi.getRepo(id as string)
        .then(res => setRepo(res.data))
        .catch(err => setError('Failed to load repository data.'))
        .finally(() => setLoading(false));

      // Also fetch all previously generated explanations
      repoApi.getAllExplanations(id as string)
        .then(res => {
          const explanationsDict: Record<string, string> = {};
          res.data.forEach((expl: any) => {
            explanationsDict[expl.path] = expl.explanation;
          });
          setExplanations(explanationsDict);
        })
        .catch(err => console.error("Failed to load historical explanations", err));
    }
  }, [id]);

  const handleFolderClick = (path: string) => {
    // Only toggles open/close now, no fetching
    console.log("Toggled folder:", path);
  };

  const handleExplainClick = async (path: string) => {
    setActiveExplainPath(path);
    setIsSidebarOpen(true);

    // If already fetched, don't fetch again
    if (explanations[path]) {
      return;
    }

    setLoadingExpl(path);
    
    const explainPromise = repoApi.getExplanation(id as string, path);
    
    toast.promise(explainPromise, {
      loading: `Generating AI insight for ${path.split('/').pop()}...`,
      success: 'Insight generated!',
      error: (err: any) => err.response?.data?.error || 'Failed to generate insight.',
    });

    try {
      const { data } = await explainPromise;
      setExplanations(prev => ({ ...prev, [path]: data.explanation }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingExpl('');
    }
  };

  const handleFileClick = async (path: string) => {
    setCodeModal({ isOpen: true, filename: path.split('/').pop() || '', fullPath: path, content: '', isLoading: true });
    try {
      const { data } = await repoApi.getFileContent(id as string, path);
      setCodeModal(prev => ({ ...prev, content: data.content, isLoading: false }));
    } catch (err) {
      console.error(err);
      toast.error(`Failed to load file: ${path.split('/').pop()}`);
      setCodeModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center space-y-4">
        <Loader2 className="animate-spin text-blue-500 mx-auto" size={48} />
        <p className="text-slate-400 font-medium tracking-tight">Analyzing Codebase...</p>
      </div>
    </div>
  );

  if (error || !repo) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 shadow-sm text-center max-w-md">
        <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
        <p className="text-slate-400 mb-6">{error}</p>
        <button onClick={() => window.location.href = '/'} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Go Back</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header-like top bar */}
      <nav className="glass px-8 h-20 fixed w-full top-0 z-40 shadow-2xl">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-text-hero">
              <a href={`https://github.com/${repo.owner}/${repo.name}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent-action transition-colors">
                {repo.name}
              </a>
            </h1>
            <a href={`https://github.com/${repo.owner}`} target="_blank" rel="noopener noreferrer" className="px-2 py-0.5 bg-surface-card border-2 border-border-clean text-text-body text-[10px] rounded-md font-mono uppercase tracking-widest hover:text-text-hero transition-colors">by {repo.owner}</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-accent-ai/10 text-accent-ai hover:bg-accent-ai/20 border-2 border-accent-ai/20 transition-all uppercase tracking-widest"
            >
              <Sparkles size={16} /> AI Insight Panel
            </button>
            <a href="/dashboard" className="text-xs font-bold text-white bg-accent-action px-6 py-2 rounded-lg hover:bg-accent-action/90 transition-all shadow-lg shadow-accent-action/20 uppercase tracking-widest">Pick another repo</a>
          </div>
        </div>
      </nav>

      <main className="w-full px-4 sm:px-8 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 relative max-w-[1600px] mx-auto items-start">
        {/* Left Column: File Tree */}
        <div className="lg:col-span-3 space-y-6 relative z-10 lg:sticky lg:top-24">
          <FileTree
            tree={repo.fileTree}
            onFolderClick={handleFolderClick}
            onExplainClick={handleExplainClick}
            onFileClick={handleFileClick}
            loadingExplainPath={loadingExpl}
          />
        </div>

        {/* Right Column: Insights */}
        <div className="lg:col-span-9 space-y-8 relative z-10 pb-10">
          {repo.architectureSummary && (
            <ArchitectureSummary summary={repo.architectureSummary} />
          )}
        </div>
      </main>

      {/* Overlays */}
      <CodeModal
        isOpen={codeModal.isOpen}
        onClose={() => setCodeModal(prev => ({ ...prev, isOpen: false }))}
        filename={codeModal.filename}
        fullPath={codeModal.fullPath}
        repoId={id as string}
        content={codeModal.content}
        isLoading={codeModal.isLoading}
      />

      <ExplanationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        explanations={explanations}
        activePath={activeExplainPath}
        onSelectPath={setActiveExplainPath}
        isLoadingFile={loadingExpl}
      />

    </div>
  );
}
