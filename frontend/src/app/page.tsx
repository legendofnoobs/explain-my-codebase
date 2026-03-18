'use client';

import { useRouter } from 'next/navigation';
import { 
  Code2, 
  Sparkles, 
  Globe, 
  Zap, 
  Search,
  Layers,
  Component,
  ChevronRight,
  LayoutTemplate,
  X,
  Github
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-primary-bg text-text-hero flex flex-col font-sans selection:bg-accent-ai/30">
      {/* Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1600px] z-30">
        <nav className="glass rounded-lg border border-white/10 px-8 h-20 flex items-center justify-between shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-accent-action rounded-lg flex items-center justify-center shadow-lg shadow-accent-action/20 group-hover:scale-110 transition-transform">
              <Code2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-hero">RepoLens</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-text-body uppercase tracking-widest">
            <a href="#features" className="hover:text-text-hero transition-colors">Features</a>
            <a href="#setup" className="hover:text-text-hero transition-colors">Setup</a>
            <a href="/demo" className="hover:text-text-hero transition-colors">Demo</a>
          </div>

          <div className="flex items-center gap-5">
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
            <button 
              onClick={navigateToDashboard}
              className="bg-accent-action hover:bg-accent-action/90 text-white text-xs font-bold px-8 py-3 rounded-lg transition-all shadow-lg shadow-accent-action/20 active:scale-95 uppercase tracking-widest"
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-8 overflow-hidden">
        {/* Dynamic Depth Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 glow-indigo opacity-20 animate-pulse" />
          <div className="absolute top-40 right-1/4 w-80 h-80 glow-blue opacity-20 animate-pulse [animation-delay:1s]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card border-2 border-border-clean text-[10px] font-bold text-accent-ai uppercase tracking-[0.2em] backdrop-blur-md">
            <Sparkles size={14} />
            <span>AI is now live with Mermaid support</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-text-hero leading-[1] tracking-tighter">
            Understand Any Codebase <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-action via-accent-ai to-accent-action animate-gradient-x">in Minutes</span>
          </h1>
          
          <p className="text-xl text-text-body leading-relaxed max-w-3xl mx-auto font-medium">
            Drop any GitHub URL and let our AI index the entire repository. Get instant architecture diagrams, file explanations, and context-aware insights without reading thousands of lines manually.
          </p>

          <div className="pt-8">
            <button
               onClick={navigateToDashboard}
               className="bg-accent-action hover:bg-accent-action/90 text-white font-black px-16 py-6 rounded-lg flex items-center gap-4 mx-auto transition-all active:scale-95 shadow-2xl shadow-accent-action/40 text-2xl"
            >
              Analyze Your Codebase <ChevronRight size={32} />
            </button>
            <p className="mt-8 text-text-body/50 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-4">
              <span>Scientific Precision • No credit card required.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-clean" />
              <a href="#setup" className="text-accent-action hover:underline transition-all">Setup Instructions</a>
            </p>
          </div>

          {/* Product Mockup */}
          <div className="relative group max-w-6xl mx-auto mt-24" id="interface">
            <div className="absolute -inset-2 glow-blue opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-surface-card border-4 border-border-clean rounded-lg overflow-hidden shadow-2xl cursor-pointer" onClick={navigateToDashboard}>
              <img 
                src="/Preview.png" 
                alt="Product Preview" 
                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              
              <div className="absolute inset-0 bg-primary-bg/0 group-hover:bg-primary-bg/20 transition-colors flex items-center justify-center">
                 <div className="w-24 h-24 glass rounded-full flex items-center justify-center border-2 border-white/20 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                    <ChevronRight size={48} className="text-white ml-2" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-40 px-8 bg-surface-card/30">
        <div className="max-w-[1600px] mx-auto space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 space-y-10 text-left">
              <h2 className="text-5xl md:text-6xl font-black text-text-hero leading-tight tracking-tight">
                Understanding a New Codebase <br />
                <span className="text-accent-ai">Takes Too Long</span>
              </h2>
              <p className="text-xl text-text-body font-medium leading-relaxed">
                Developers spend 70% of their time reading code rather than writing it. Onboarding to a complex project shouldn't mean a week of confusion.
              </p>
              
              <ul className="space-y-8">
                {[
                  { title: "Messy Docs", desc: "READMEs are often outdated or non-existent." },
                  { title: "Tangled Dependencies", desc: "Hard to see how services interact without running the code." },
                  { title: "Cognitive Load", desc: "Jumping between 20 files just to understand one feature." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-6 items-start group">
                    <div className="mt-1.5 w-6 h-6 rounded bg-rose-500/20 flex items-center justify-center text-rose-500 flex-none group-hover:scale-110 transition-transform">
                      <X size={16} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-text-hero">{item.title}: <span className="font-medium text-text-body">{item.desc}</span></h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-7 relative group">
               <div className="absolute -inset-2 glow-indigo opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000"></div>
               <div className="relative bg-surface-card border-4 border-border-clean rounded-lg overflow-hidden shadow-2xl">
                  <img 
                     src="/ai_insight.png" 
                     alt="AI Insight" 
                     className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Key Setup Section */}
      <section className="py-24 px-8 relative overflow-hidden border-t border-border-clean/50" id="setup">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-action to-transparent" />
           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-ai to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-text-hero tracking-tighter uppercase">Bring Your Own Intelligence</h2>
            <p className="text-text-body text-lg max-w-2xl mx-auto font-medium">
              ExplainMyCode uses your personal Gemini API key to deliver high-precision analysis. Follow these steps to initialize your environment in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Access AI Studio",
                desc: "Navigate to the official Google AI Studio API dashboard.",
                link: "https://aistudio.google.com/app/apikey",
                linkText: "Go to AI Studio",
                icon: <Globe size={20} />
              },
              {
                step: "02",
                title: "Generate Key",
                desc: "Click 'Create API key' and select a project to authorize access.",
                icon: <Zap size={20} />
              },
              {
                step: "03",
                title: "Copy & Secure",
                desc: "Copy your unique key (starts with AIzaSy) to your clipboard.",
                icon: <Search size={20} />
              },
              {
                step: "04",
                title: "Initialize App",
                desc: "Paste your key during registration or in settings to begin.",
                icon: <Sparkles size={20} />
              }
            ].map((s, i) => (
              <div key={i} className="group relative bg-surface-card border-2 border-border-clean p-8 rounded-lg hover:border-accent-action/50 transition-all flex flex-col h-full shadow-xl">
                 <div className="absolute top-4 right-6 text-4xl font-black text-accent-action/5 group-hover:text-accent-action/10 transition-colors font-mono italic">
                   {s.step}
                 </div>
                 
                 <div className="w-12 h-12 bg-primary-bg border border-border-clean rounded-lg flex items-center justify-center text-accent-action mb-6 group-hover:scale-110 transition-transform shadow-inner">
                   {s.icon}
                 </div>

                 <h3 className="text-lg font-bold text-text-hero mb-3">{s.title}</h3>
                 <p className="text-sm text-text-body leading-relaxed mb-6 flex-1">
                   {s.desc}
                 </p>

                 {s.link && (
                   <a 
                     href={s.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent-action hover:text-accent-action/80 transition-colors"
                   >
                     {s.linkText} <ChevronRight size={14} />
                   </a>
                 )}
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 bg-accent-ai/5 border-2 border-dashed border-accent-ai/20 rounded-lg text-center backdrop-blur-sm">
             <p className="text-xs font-mono text-text-body italic">
                Scientific Note: Your API key is stored securely and used only to authenticate requests to Google's Generative AI services.
             </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-slate-900/40 relative border-y border-white/5 overflow-hidden" id="features">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Powerful Repository Intelligence</h2>
            <p className="text-slate-400 text-lg">Everything you need to master a new project in record time.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: <Globe size={24} />, 
                title: "Instant Import", 
                desc: "Simply paste a public or private GitHub URL. We handle the recursive cloning and indexing in the background.",
                color: "bg-blue-500/10 text-blue-400"
              },
              { 
                icon: <Layers size={24} />, 
                title: "AI Architecture Summary", 
                desc: "Get a high-level overview of the tech stack, project structure, and core logic flow before diving into the tree.",
                color: "bg-indigo-500/10 text-indigo-400"
              },
              { 
                icon: <LayoutTemplate size={24} />, 
                title: "ER Diagram Gen", 
                desc: "Automatically visualize database schemas and component relationships with Mermaid-based interactive diagrams.",
                color: "bg-indigo-500/10 text-indigo-400"
              },
              { 
                icon: <Search size={24} />, 
                title: "Folder Deep-Dives", 
                desc: "Click any folder in the tree to get a summary of what's inside and how it relates to the rest of the project.",
                color: "bg-blue-500/10 text-blue-400"
              },
              { 
                icon: <Component size={24} />, 
                title: "Split-Screen Insights", 
                desc: "Read the original code side-by-side with an AI generated natural language expression of the logic.",
                color: "bg-indigo-500/10 text-indigo-400"
              },
              { 
                icon: <Zap size={24} />, 
                title: "Recursive Scanning", 
                desc: "Our scanner understands complex imports and path-resolutions, tracking logic across file boundaries seamlessly.",
                color: "bg-blue-500/10 text-blue-400"
              },
            ].map((feat, i) => (
              <div key={i} className="group p-8 rounded-lg bg-slate-950 border border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/50">
                <div className={`w-12 h-12 rounded-lg ${feat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-16 md:p-24 rounded-lg bg-accent-action overflow-hidden shadow-2xl shadow-accent-action/30 text-center border-4 border-white/20">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
             
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 relative z-10 leading-none tracking-tight">
              Stop Reading Code Blindly
            </h2>
            <p className="text-white text-xl md:text-2xl font-bold mb-16 relative z-10 max-w-3xl mx-auto opacity-90 leading-relaxed uppercase tracking-widest">
              Join 10,000+ developers who use ExplainMyCode to speed up their development cycle and master new repositories in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
               <button 
                onClick={navigateToDashboard}
                className="bg-white text-accent-action font-black px-12 py-6 rounded-lg hover:scale-105 transition-transform shadow-2xl text-xl"
              >
                Get Started For Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 px-8 mt-24 overflow-hidden border-t border-border-clean/30">
        {/* Modern Background Decor */}
        <div className="absolute inset-0 bg-slate-950 -z-10">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-accent-action/30 to-transparent" />
        </div>
        
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
             <div className="space-y-8 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent-action rounded-lg flex items-center justify-center shadow-lg shadow-accent-action/20">
                    <Code2 className="text-white" size={18} />
                  </div>
                  <span className="text-xl font-bold text-text-hero tracking-tighter uppercase italic">RepoLens AI</span>
                </div>
                <p className="text-sm text-text-body font-medium leading-relaxed opacity-70">
                   The definitive intelligence layer for your engineering team. Context-aware repository analysis delivered through high-precision neural logic.
                </p>
             </div>

             <div className="flex flex-wrap gap-x-16 gap-y-8 text-xs font-bold text-text-body uppercase tracking-[0.25em]">
                <div className="flex flex-col gap-4">
                   <h5 className="text-[10px] text-accent-ai opacity-50">Navigation</h5>
                   <a href="#features" className="underline-offset-4 hover:underline hover:text-accent-action transition-all">Features</a>
                   <a href="#interface" className="underline-offset-4 hover:underline hover:text-accent-action transition-all">Interface</a>
                   <a href="#setup" className="underline-offset-4 hover:underline hover:text-accent-action transition-all">Setup</a>
                </div>
                <div className="flex flex-col gap-4">
                   <h5 className="text-[10px] text-accent-ai opacity-50">Secure Connect</h5>
                   <a href="https://github.com/legendofnoobs/explain-my-codebase" target="_blank" className="underline-offset-4 hover:underline hover:text-accent-action transition-all whitespace-nowrap">RepoLens Source Code</a>
                   <a href="https://aistudio.google.com" target="_blank" className="underline-offset-4 hover:underline hover:text-accent-action transition-all">Google AI Studio</a>
                </div>
             </div>
          </div>
          
          <div className="pt-10 border-t border-border-clean/50 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">All Systems Operational</span>
                </div>
             </div>

             <div className="text-[10px] text-text-body/40 font-bold uppercase tracking-[0.3em] flex items-center gap-4">
                <span>© {new Date().getFullYear()} RepoLens</span>
                <span className="w-1.5 h-1.5 rounded-full bg-border-clean/30" />
                <span>Neural Engine v1.0.4</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
