'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Code2, Github, Loader2, ArrowRight, Mail, Lock } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        email,
        password,
      });
      login(data);
      toast.success('Welcome back!');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg text-text-hero flex items-center justify-center p-6 selection:bg-accent-ai/30 font-sans">
      <div className="w-full max-w-md space-y-8 relative">
        {/* Dynamic Depth Glows */}
        <div className="absolute -top-24 -left-24 w-64 h-64 glow-indigo opacity-20 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 glow-blue opacity-20 animate-pulse [animation-delay:1s]" />

        <div className="text-center space-y-6 relative z-10">
          <div className="flex justify-center" onClick={() => router.push('/')}>
            <div className="w-16 h-16 bg-accent-action rounded-lg flex items-center justify-center shadow-2xl shadow-accent-action/20 cursor-pointer hover:scale-105 transition-transform border border-white/10">
              <Code2 className="text-white" size={32} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-text-hero tracking-tight">Login</h1>
            <p className="text-text-body font-medium">Access your AI codebase intelligence.</p>
          </div>
        </div>

        <div className="glass bg-surface-card border-2 border-border-clean p-8 rounded-lg shadow-2xl relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-body uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body group-focus-within:text-accent-action transition-colors" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-primary-bg border border-border-clean rounded-lg pl-12 pr-4 py-4 outline-none focus:border-accent-action/50 focus:bg-primary-bg/80 transition-all text-text-hero placeholder:text-text-body/50 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-text-body uppercase tracking-widest">Password</label>
                  <a href="#" className="text-[10px] font-bold text-accent-ai hover:text-accent-ai/80 transition-colors uppercase tracking-wider">Forgot?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body group-focus-within:text-accent-action transition-colors" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-primary-bg border border-border-clean rounded-lg pl-12 pr-4 py-4 outline-none focus:border-accent-action/50 focus:bg-primary-bg/80 transition-all text-text-hero placeholder:text-text-body/50 font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-action hover:bg-accent-action/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-accent-action/30"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-text-body text-sm font-medium">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-accent-ai hover:text-accent-ai/80 font-bold transition-colors"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
