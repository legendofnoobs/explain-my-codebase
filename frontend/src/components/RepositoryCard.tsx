'use client';

import { Calendar, Trash2, ChevronRight, Box } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

interface RepositoryCardProps {
  repo: {
    _id: string;
    name: string;
    owner: string;
    createdAt: string;
    architectureSummary?: {
      summary?: string;
      techStack?: string[];
    };
  };
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
}

export default function RepositoryCard({ repo, onDelete }: RepositoryCardProps) {
  const router = useRouter();
  const projectId = repo._id.slice(-6).toUpperCase();

  return (
    <div 
      onClick={() => router.push(`/dashboard/${repo._id}`)}
      className="group relative bg-surface-card border-2 border-border-clean rounded-lg transition-all cursor-pointer overflow-hidden flex flex-col h-full shadow-2xl hover:border-accent-action/50 hover:shadow-accent-action/10 hover:-translate-y-1 active:scale-[0.98]"
    >
      {/* Blueprint Grid Overlay (Visible on Hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-500" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Vertical Status Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-action/20 group-hover:bg-accent-action transition-colors" />

      <div className="p-6 flex flex-col h-full relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-bg border-2 border-border-clean text-accent-action rounded-lg flex items-center justify-center shadow-inner group-hover:border-accent-action/50 transition-all">
              <Box size={20} className="group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                <span className="text-[10px] font-bold text-text-body uppercase tracking-[0.2em]">Active Index</span>
              </div>
              <p className="text-[10px] font-mono text-text-body/50 mt-0.5">ID: PRJ-{projectId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-primary-bg px-2.5 py-1 rounded-lg border border-border-clean text-[10px] font-mono text-text-body">
              <Calendar size={12} className="text-accent-action/50" />
              {new Date(repo.createdAt).toLocaleDateString()}
            </div>
            <button
              onClick={(e) => onDelete(e, repo._id, repo.name)}
              className="p-2 text-text-body hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all active:scale-90"
              title="Delete project"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h3 className="text-text-hero font-black text-xl tracking-tight group-hover:text-accent-action transition-colors leading-none">
              {repo.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-text-body uppercase tracking-widest px-2 py-0.5 bg-primary-bg rounded border border-border-clean">Owner</span>
              <p className="text-xs font-mono text-text-hero/70">{repo.owner}</p>
            </div>
          </div>

          <div className="p-4 bg-primary-bg/50 border border-border-clean rounded-lg shadow-inner relative overflow-hidden group-hover:bg-primary-bg/80 transition-colors">
            <div className="text-[11px] text-text-body line-clamp-2 leading-relaxed h-8 prose-invert prose-2xs italic">
              <ReactMarkdown>{repo.architectureSummary?.summary?.slice(0, 80) || 'Analyzing system architecture and recursive dependencies...'}</ReactMarkdown>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {repo.architectureSummary?.techStack?.slice(0, 4).map((tech, i) => (
              <span key={i} className="text-[9px] font-bold px-2 py-1 bg-surface-card border border-border-clean text-accent-ai rounded flex items-center gap-1 hover:border-accent-ai/50 transition-colors">
                <Box size={10} className="opacity-50" />
                {tech}
              </span>
            ))}
            {(!repo.architectureSummary?.techStack || repo.architectureSummary.techStack.length === 0) && (
              <span className="text-[9px] font-bold px-2 py-1 bg-surface-card border border-dashed border-border-clean text-text-body/50 rounded animate-pulse uppercase tracking-[0.2em]">
                Parsing Modules...
              </span>
            )}
          </div>
        </div>

        {/* Action Button Section */}
        <div className="mt-8 flex items-center justify-between pointer-events-none">
          <div className="text-[10px] font-black text-accent-action uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
            Open Analysis
          </div>
          <div className="w-10 h-10 bg-accent-action text-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all scale-90 group-hover:scale-100">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 glow-blue opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}
