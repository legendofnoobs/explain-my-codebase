import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import { IArchitectureSummary } from '../types';
import { 
  Layers, BookOpen, Share2, 
  ShieldCheck, TrendingUp, Zap, Box,
  Activity, Database, Globe, Wrench,
  CornerUpRight, HardDrive, BarChart3,
  ThumbsUp, ThumbsDown,
  Grip
} from 'lucide-react';

// Initialize mermaid
if (typeof window !== 'undefined') {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif'
  });
}

const Mermaid = ({ chart }: { chart: string }) => {
  const [mounted, setMounted] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && ref.current && chart) {
      ref.current.removeAttribute('data-processed');
      try {
        mermaid.contentLoaded();
      } catch (err) {
        console.error('Mermaid render failed:', err);
      }
    }
  }, [chart, mounted]);

  if (!mounted) {
    return (
      <div className="bg-slate-950 p-8 rounded-lg border border-slate-800 flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-slate-800 rounded-full" />
          <div className="h-2 w-32 bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="mermaid bg-slate-950 p-4 rounded-lg border border-slate-800 shadow-inner overflow-x-auto" ref={ref}>
      {chart}
    </div>
  );
};

export const ArchitectureSummary = ({ summary }: { summary: IArchitectureSummary }) => {
  const sections = [
    { title: 'Runtime Data Flow', icon: <Activity className="text-amber-500" size={18} />, content: summary.runtimeDataFlow },
    { 
      title: 'Domain Model & ER Diagram', 
      icon: <Database className="text-purple-500" size={18} />, 
      content: summary.domainModel,
      extra: summary.mermaidErd && (
        <div className="mt-6 space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visual ER Diagram</p>
          <Mermaid chart={summary.mermaidErd} />
        </div>
      )
    },
    { title: 'Component & Module Architecture', icon: <Layers className="text-indigo-500" size={18} />, content: summary.componentArchitecture },
    { title: 'External Services', icon: <Zap className="text-yellow-500" size={18} />, content: summary.externalServices },
    { title: 'State & Data Management', icon: <HardDrive className="text-emerald-500" size={18} />, content: summary.stateManagement },
    { title: 'Security Posture', icon: <ShieldCheck className="text-rose-500" size={18} />, content: summary.securityPosture },
    { title: 'Scalability & Performance', icon: <TrendingUp className="text-cyan-500" size={18} />, content: summary.scalabilityPerformance },
    { title: 'Observability', icon: <BarChart3 className="text-orange-500" size={18} />, content: summary.observability },
    { title: 'Infrastructure & Deployment', icon: <Wrench className="text-slate-700" size={18} />, content: summary.infrastructureDeployment },
  ];

  return (
    <div className="bg-surface-card rounded-lg border-2 border-border-clean overflow-hidden shadow-2xl transition-all animate-in fade-in slide-in-from-right duration-500">
      
      {/* Header Section */}
      <div className="bg-surface-card p-8 text-text-hero relative overflow-hidden pb-0">
        <div className="absolute top-0 right-0 w-64 h-64 glow-blue opacity-20 -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent-action/10 rounded-lg backdrop-blur-sm border border-accent-action/20">
              <Layers className="text-accent-action" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">System Architecture</h2>
              <p className="text-text-body font-mono text-sm uppercase tracking-widest">{summary.projectType}</p>
            </div>
          </div>
          
          <div className="p-5 bg-primary-bg/50 border border-border-clean rounded-lg backdrop-blur-sm shadow-inner">
            <h3 className="text-xs font-bold text-text-body uppercase tracking-widest mb-2 flex items-center gap-2">
              <BookOpen size={14} className="text-accent-action" /> Executive Summary
            </h3>
            <div className="text-sm text-text-body leading-relaxed prose prose-invert max-w-none whitespace-pre-wrap">
              <ReactMarkdown>{summary.summary}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-12">
        {/* Tech Stack */}
        <section className="space-y-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-[10px] font-bold text-text-body uppercase tracking-[0.2em]">Core Tech Stack:</span>
            {summary.techStack && summary.techStack.length > 0 ? (
              summary.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 bg-surface-card border-2 border-border-clean rounded-lg text-[11px] font-mono text-accent-action shadow-inner flex items-center gap-1.5 group/tech transition-all hover:border-accent-action/30">
                  <Box size={12} className="text-accent-action/50 group-hover/tech:text-accent-action transition-colors" />
                  <ReactMarkdown>{tech}</ReactMarkdown>
                </span>
              ))
            ) : (
              <span className="text-[11px] italic text-text-body">Could not generate tech stack.</span>
            )}
          </div>
        </section>

        {/* Individual Design patterns Section with whitespace-pre-wrap */}
        <div className="space-y-3 group bg-primary-bg/30 p-6 rounded-lg border border-border-clean/50 hover:border-accent-action/30 transition-all mb-6">
          <h4 className="text-xs font-bold text-text-body uppercase tracking-widest flex items-center gap-2 border-b border-border-clean pb-4">
            <Grip className="text-accent-action" size={18} /> Detected Design Patterns
          </h4>
          <div className="text-sm text-text-body leading-relaxed prose prose-invert max-w-none prose-sm whitespace-pre-wrap">
            {summary.designPatterns ? 
            <ul className='flex flex-wrap gap-2'>
              {summary.designPatterns.map((pattern, i) => (
                <li className='bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-1 rounded-lg' key={i}>{pattern}</li>
              ))}
            </ul> 
            : <span className="text-[11px] italic text-text-body">Could not generate design patterns.</span>}
          </div>
        </div>

        {/* Individual API Design Section with whitespace-pre-wrap */}
        <div className="space-y-3 group bg-primary-bg/30 p-6 rounded-lg border border-border-clean/50 hover:border-accent-action/30 transition-all mb-6">
          <h4 className="text-xs font-bold text-text-body uppercase tracking-widest flex items-center gap-2 border-b border-border-clean pb-4">
            <Globe className="text-accent-action" size={18} /> API Design
          </h4>
          <div className="text-sm text-text-body leading-relaxed prose prose-invert max-w-none prose-sm whitespace-pre-wrap">
            <ReactMarkdown>{summary.apiDesign}</ReactMarkdown>
          </div>
        </div>

        {/* Detailed Technical Breakdown */}
        <div className="grid grid-cols-1 gap-6">
          {sections.map((section, i) => (
            <div key={i} className="space-y-3 group bg-primary-bg/30 p-6 rounded-lg border border-border-clean/50 hover:border-accent-ai/30 transition-all">
              <h4 className="text-xs font-bold text-text-body uppercase tracking-widest flex items-center gap-2 border-b border-border-clean pb-4">
                {section.icon} {section.title}
              </h4>
              <div className="text-sm text-text-body leading-relaxed prose prose-invert max-w-none prose-sm">
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
              {section.extra && section.extra}
            </div>
          ))}
        </div>

        {/* Architectural Tradeoffs Table */}
        <section className="space-y-6">
          <h3 className="text-xs font-bold text-text-body uppercase tracking-[0.2em] flex items-center gap-2">
            <CornerUpRight size={16} className="text-text-body" /> Architectural Tradeoffs
          </h3>
          <div className="overflow-hidden border-2 border-border-clean rounded-lg shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-bg/50 border-b-2 border-border-clean">
                  <th className="px-6 py-5 text-xs font-bold text-text-body uppercase tracking-[0.1em] w-1/3">Key Decision</th>
                  <th className="px-6 py-5 text-xs font-bold text-emerald-500 uppercase tracking-[0.1em]">Advantage (Pros)</th>
                  <th className="px-6 py-5 text-xs font-bold text-rose-500 uppercase tracking-[0.1em]">Constraint (Cons)</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border-clean/50">
                {summary.architecturalTradeoffs?.map((tradeoff, i) => (
                  <tr key={i} className="hover:bg-accent-action/5 transition-colors group/row">
                    <td className="px-6 py-5">
                      <div className="font-mono text-[11px] font-bold text-text-hero bg-surface-card border border-border-clean px-3 py-1.5 rounded-lg inline-block group-hover/row:border-accent-action/30 transition-colors">
                        {tradeoff.choice}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-2.5 text-sm text-text-body prose-sm prose-invert">
                        <ThumbsUp size={14} className="text-emerald-500 mt-1 shrink-0 opacity-70" />
                        <ReactMarkdown>{tradeoff.pros || ''}</ReactMarkdown>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-2.5 text-sm text-text-body prose-sm prose-invert">
                        <ThumbsDown size={14} className="text-rose-500 mt-1 shrink-0 opacity-70" />
                        <ReactMarkdown>{tradeoff.cons || ''}</ReactMarkdown>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <span className="text-[10px] font-bold text-text-body/50 uppercase tracking-[0.3em] text-center block mb-8">
        SCIENTIFIC VERIFICATION: AI INSIGHTS MAY REQUIRE HUMAN REVIEW
      </span>
    </div>
  );
};
