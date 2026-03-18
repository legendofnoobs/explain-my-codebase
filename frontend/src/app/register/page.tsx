'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Code2, Loader2, ArrowRight, Mail, Lock, User, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        name,
        email,
        password,
        geminiApiKey,
      });
      login(data);
      toast.success('Account created successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 selection:bg-indigo-500/30">
      <div className="w-full max-w-md space-y-8 relative">
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />

        <div className="text-center space-y-6 relative z-10">
          <div className="flex justify-center" onClick={() => router.push('/')}>
            <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center shadow-2xl shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform">
              <Code2 className="text-white" size={32} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">Register</h1>
            <p className="text-slate-400 font-medium">Join 10,000+ developers today.</p>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-8 rounded-lg shadow-2xl relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ahmed Elsayed"
                    className="w-full bg-white/5 border border-white/5 rounded-lg pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white/5 border border-white/5 rounded-lg pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/5 rounded-lg pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gemini API Key</label>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">Get Key</a>
                </div>
                <div className="relative group">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-white/5 border border-white/5 rounded-lg pl-12 pr-4 py-4 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/30"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={20} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm font-medium">
          Already have an account?{' '}
          <button 
            onClick={() => router.push('/login')}
            className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
