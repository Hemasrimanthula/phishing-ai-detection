
import React, { useState } from 'react';
import { Shield, Mail, Terminal, Cpu, Activity, AlertTriangle, ChevronLeft, Search, CheckCircle, RefreshCcw, ArrowRight } from 'lucide-react';
import { FEATURES } from '../constants.tsx';
import { analyzeEmailForPhishing } from '../services/geminiService.ts';
import { useApp } from '../App.tsx';

const HeuristicBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
      <span className="text-slate-500">{label.replace(/([A-Z])/g, ' $1')}</span>
      <span className="text-cyan-500">{value}/10</span>
    </div>
    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 transition-all duration-1000 ease-out" 
        style={{ width: `${value * 10}%` }}
      />
    </div>
  </div>
);

export default function Home() {
  const { addScan } = useApp();
  const [emailText, setEmailText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleAnalyze = async () => {
    if (!emailText || emailText.length < 10) {
      alert("Artifact too small for forensic profiling. Min 10 characters.");
      return;
    }
    setLoading(true);
    setResult(null);
    setLogs(["> Initializing Neural Inference..."]);
    
    try {
      // Simulate forensic logs for UX
      const msgs = ["> Accessing ephemeral memory...", "> Running linguistic vector analysis...", "> Checking homograph databases...", "> Generating threat report..."];
      for(const m of msgs) {
        await new Promise(r => setTimeout(r, 400));
        setLogs(prev => [...prev, m]);
      }

      const data = await analyzeEmailForPhishing(emailText);
      setResult(data);
      addScan({
        type: 'EMAIL',
        verdict: data.verdict as 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS',
        riskScore: data.riskScore,
        explanation: data.explanation,
        redFlags: data.redFlags,
        heuristics: data.heuristics
      });
    } catch (error) {
      console.error(error);
      alert("Forensic Node Error: Failed to reach analysis gateway.");
    } finally {
      setLoading(false);
    }
  };

  const resetSession = () => {
    setResult(null);
    setEmailText('');
    setLogs([]);
  };

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-top-4">
            <Shield className="w-4 h-4 text-cyan-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">v3.1.0 Enterprise AI Activated</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Stop Phishing with <br />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Neural Forensics
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
            The world's first browser-edge AI platform that decodes malicious intent in real-time. 100% accuracy through local linguistic inference.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="#sandbox" className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-bold text-sm hover:shadow-2xl transition-all hover:scale-[1.02]">
              Start Forensic Scan
            </a>
            <a href="#/product" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Forensic Sandbox */}
      <section id="sandbox" className="max-w-5xl mx-auto px-4 scroll-mt-32">
        <div className="glass-card rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-xl">
                <Terminal className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest">Neural Forensic Sandbox</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Mode: Live_Artifact_Analysis</p>
              </div>
            </div>
            {result && (
              <button 
                onClick={resetSession}
                className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-cyan-600 uppercase tracking-widest transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                New Forensic Session
              </button>
            )}
          </div>

          <div className="p-8 space-y-8">
            {!result ? (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-10 group-focus-within:opacity-30 transition-all" />
                  <textarea 
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="Paste email content, suspicious links, or raw headers for neural decoding..."
                    className="w-full h-64 p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:ring-0 text-sm leading-relaxed relative z-10 shadow-inner"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                      </div>)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Trusted by 500+ Security Researchers</span>
                  </div>
                  
                  <button 
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full md:w-auto px-12 py-5 bg-cyan-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 shadow-xl shadow-cyan-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                    {loading ? 'Processing Neural Vectors...' : 'Execute Forensic Analysis'}
                  </button>
                </div>

                {loading && logs.length > 0 && (
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-[10px] text-cyan-500 space-y-1 animate-pulse">
                    {logs.map((log, i) => <div key={i}>{log}</div>)}
                    <div className="w-2 h-4 bg-cyan-500 inline-block animate-ping" />
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Verdict Card */}
                  <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full ${
                      result.verdict === 'SAFE' ? 'bg-green-500' : 
                      result.verdict === 'DANGEROUS' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Analysis Verdict</div>
                        <div className={`text-4xl font-black ${
                          result.verdict === 'SAFE' ? 'text-green-600' : 
                          result.verdict === 'DANGEROUS' ? 'text-red-600' : 'text-amber-600'
                        }`}>
                          {result.verdict}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Risk Probability</div>
                        <div className="text-4xl font-black text-slate-900 dark:text-white">{result.riskScore}%</div>
                      </div>
                    </div>

                    <div className="p-5 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 italic text-sm text-slate-600 dark:text-slate-400">
                      "{result.explanation}"
                    </div>

                    <div className="space-y-3">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neural Red Flags</div>
                      <div className="flex flex-wrap gap-2">
                        {result.redFlags.map((f: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-red-500/10 text-red-600 text-[10px] font-bold rounded-full border border-red-500/20 flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3" />
                            {f}
                          </span>
                        ))}
                        {result.redFlags.length === 0 && <span className="text-[10px] text-green-600 font-bold flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Integrity Verified</span>}
                      </div>
                    </div>
                  </div>

                  {/* Heuristics Card */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Heuristic Entropy</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[9px] font-mono text-cyan-600 uppercase">Live_Node_09</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {result.heuristics && Object.entries(result.heuristics).map(([key, val]: any) => (
                        <HeuristicBar key={key} label={key} value={val} />
                      ))}
                    </div>

                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <button onClick={resetSession} className="px-6 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
                        Reset Terminal
                      </button>
                      <div className="text-[9px] font-mono text-slate-400">SOC_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feature, i) => (
          <div key={i} className="group p-8 glass-card rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 py-20 bg-slate-900 rounded-[60px] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-white">Join the PhishDetect <br />Enterprise Fleet</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Deploy our AI forensic core across your entire organization with a single click. Zero-configuration, zero-trust, maximum security.</p>
          <div className="pt-4 flex justify-center gap-4">
             <a href="#/contact" className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:scale-105 transition-all">Request Enterprise Demo</a>
             <a href="#/services" className="px-10 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center gap-2">
               Explore Infrastructure <ArrowRight className="w-4 h-4" />
             </a>
          </div>
        </div>
      </section>
    </div>
  );
}
