
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff, Mail, LogIn, Zap } from 'lucide-react';
import { useApp } from '../../App.tsx';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, pass)) {
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleQuickDemo = () => {
    const demoEmail = 'admin@phishdetect.ai';
    const demoPass = 'admin123';
    setEmail(demoEmail);
    setPass(demoPass);
    if (login(demoEmail, demoPass)) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card p-10 rounded-3xl border shadow-2xl space-y-8 animate-in zoom-in-95">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-2xl flex items-center justify-center mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black">Secure Authentication</h1>
          <p className="text-sm text-slate-500">Access your neural forensic profile</p>
        </div>

        <div className="space-y-4">
          <button 
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-3 bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-cyan-600 hover:text-white transition-all shadow-lg"
          >
            <Zap className="w-4 h-4" />
            One-Click Demo Access
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold tracking-widest">or manual entry</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-slate-400">Email Address</label>
            <div className="relative">
              <input 
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-4 pl-12 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all"
                placeholder="john@company.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-slate-400">Security Passphrase</label>
            <div className="relative">
              <input 
                type={show ? "text" : "password"}
                required
                value={pass}
                onChange={e => setPass(e.target.value)}
                className={`w-full p-4 pl-12 pr-12 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all ${error ? 'border-red-500 ring-2 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : ''}`}
                placeholder="Enter access code..."
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <button 
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-[10px] font-bold text-red-500 animate-bounce text-center mt-2">Authentication Denied: Check Credentials</p>}
          </div>

          <button type="submit" className="w-full py-4 bg-[var(--primary-color)] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg active:scale-95">
            <LogIn className="w-4 h-4" />
            Authenticate Session
          </button>
          
          <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 italic mb-1">Researcher Credentials Detected:</p>
            <div className="flex justify-center items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Pass: admin123</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
