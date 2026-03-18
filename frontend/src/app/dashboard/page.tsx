'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Github, 
  Loader2, 
  Code2, 
  FolderGit2, 
  Plus,
  Key
} from 'lucide-react';
import { repoApi, authApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/context/AuthContext';
import RepositoryCard from '@/components/RepositoryCard';
import SettingsModal from '@/components/SettingsModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

interface RecentRepo {
  _id: string;
  name: string;
  owner: string;
  architectureSummary?: {
    projectType: string;
    summary: string;
    techStack: string[];
  };
  createdAt: string;
}

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentRepos, setRecentRepos] = useState<RecentRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const router = useRouter();
  const { user, loading: authLoading, logout, updateUser } = useAuth();
  
  // Modal States
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<{ id: string, name: string } | null>(null);
  
  const [profileData, setProfileData] = useState<{ geminiApiKey?: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    
    const fetchRepos = async () => {
      try {
        const { data } = await repoApi.getAllRepos();
        setRecentRepos(data);
      } catch (err) {
        console.error('Failed to fetch recent repos:', err);
      } finally {
        setLoadingRepos(false);
      }
    };
    fetchRepos();
  }, [user]);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const importPromise = repoApi.importRepo(url);

    toast.promise(importPromise, {
      loading: 'Analyzing codebase... this may take a minute 🚀',
      success: (res: any) => {
        router.push(`/dashboard/${res.data._id}`);
        return 'Analysis complete! Redirecting...';
      },
      error: (err) => {
        setLoading(false);
        const errorMsg = err.response?.data?.error || 'Failed to import repository. Please check the URL.';
        setError(errorMsg);
        return errorMsg;
      },
    });

    try {
      await importPromise;
    } catch (err) {
      // Error is handled in toast.promise
    }
  };

  const handleOpenSettings = async () => {
    setShowSettings(true);
    try {
      const { data } = await authApi.getProfile();
      setProfileData(data);
    } catch (err) {
      toast.error('Failed to load profile');
    }
  };

  const handleUpdateApiKey = async (key: string) => {
    try {
      await authApi.updateApiKey(key);
      toast.success('API Key updated successfully');
      const { data } = await authApi.getProfile();
      setProfileData(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Failed to update API key';
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const fetchDeleteRepo = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setRepoToDelete({ id, name });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!repoToDelete) return;
    
    const { id, name } = repoToDelete;
    const deletePromise = repoApi.deleteRepo(id);

    setShowDeleteModal(false);
    setRepoToDelete(null);

    toast.promise(deletePromise, {
      loading: `Deleting ${name}...`,
      success: () => {
        setRecentRepos(prev => prev.filter(repo => repo._id !== id));
        return 'Project deleted successfully';
      },
      error: 'Failed to delete project',
    });
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1600px] z-30">
        <nav className="glass rounded-lg border border-white/10 px-8 h-20 flex items-center justify-between shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-accent-action rounded-lg flex items-center justify-center shadow-lg shadow-accent-action/20 group-hover:scale-110 transition-transform">
              <Code2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-hero">RepoLens</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/legendofnoobs/explain-my-codebase" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-text-body hover:text-text-hero transition-colors"
              title="View on GitHub"
            >
              <Github size={20} />
            </a>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-text-hero">{user.name}</div>
                <div className="text-[10px] text-text-body font-mono uppercase tracking-tighter">{user.email}</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent-action/10 border border-accent-action/20 flex items-center justify-center text-accent-action font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
            <button 
              onClick={handleOpenSettings}
              className="text-[10px] font-bold text-accent-ai hover:text-accent-ai/80 transition-colors uppercase tracking-widest pt-1 flex items-center gap-1"
              title="Get or update your Gemini API Key"
            >
              <Key size={12} />
              API Key
            </button>
            <button 
              onClick={logout}
              className="text-xs font-bold text-text-body hover:text-rose-400 transition-colors uppercase tracking-widest pt-1"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>

      <main className="pt-32 pb-20 px-8 max-w-[1600px] mx-auto w-full flex flex-col gap-2">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-text-hero tracking-tight">Your Dashboard</h1>
            <p className="text-text-body text-lg max-w-2xl">
              Import a new repository to start analyzing or pick up where you left off.
            </p>
          </div>
        </div>

        {/* Import Form */}
        <section className="relative">
          <div className="absolute -inset-1 glow-blue opacity-20"></div>
          <div className="relative p-8">
            <form onSubmit={handleImport} className="max-w-4xl mx-auto group">
              <div className="flex flex-col lg:flex-row gap-4 p-2 bg-primary-bg/50 border border-border-clean rounded-lg focus-within:border-accent-action/50 transition-all">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <Github className="text-text-body" size={24} />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className="flex-1 bg-transparent py-4 outline-none text-text-hero text-lg placeholder:text-text-body/50 font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent-action hover:bg-accent-action/90 text-white font-bold px-10 py-4 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-accent-action/30 whitespace-nowrap"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <>Start Analysis <Plus size={20} /></>}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Recently Analyzed Section */}
        <section className="space-y-8" id="recent">
          <div className="flex items-center justify-between border-b-2 border-border-clean pb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent-ai/10 text-accent-ai rounded-lg flex items-center justify-center border border-accent-ai/20">
                 <FolderGit2 size={18} />
              </div>
              <h2 className="text-2xl font-bold text-text-hero tracking-tight">Recent Projects</h2>
            </div>
          </div>

          {loadingRepos ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-indigo-500" size={40} />
            </div>
          ) : recentRepos.length === 0 ? (
            <div className="text-center py-24 bg-white/5 rounded-lg border border-dashed border-white/10">
              <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Github size={32} className="text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto">
                Paste a GitHub URL above to generate your first architecture analysis.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentRepos.map((repo) => (
                <RepositoryCard 
                  key={repo._id} 
                  repo={repo} 
                  onDelete={fetchDeleteRepo} 
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-12 px-8 border-t-2 border-border-clean bg-surface-card/20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent-action/20 rounded-md flex items-center justify-center">
              <Code2 className="text-accent-action" size={14} />
            </div>
            <span className="text-sm font-bold text-text-hero tracking-tighter uppercase italic">RepoLens AI</span>
          </div>
          <div className="text-[10px] text-text-body font-bold uppercase tracking-widest opacity-50">© {new Date().getFullYear()} RepoLens. Neural Engine v1.0.4</div>
          <div className="flex gap-6 text-[10px] font-bold text-text-body uppercase tracking-widest">
            <a href="#" className="hover:text-accent-action transition-colors">Documentation</a>
            <a href="#" className="hover:text-accent-action transition-colors">System Status</a>
          </div>
        </div>
      </footer>

      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentApiKey={profileData?.geminiApiKey}
        onUpdateApiKey={handleUpdateApiKey}
      />

      <DeleteConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        repoName={repoToDelete?.name}
      />
    </div>
  );
}
