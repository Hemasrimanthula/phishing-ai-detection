
import React, { useState, useEffect } from 'react';
import { Search, Shield, Globe, Terminal, Cpu, Activity, AlertTriangle, FileSearch, Code, CheckCircle, RefreshCcw, Database, ChevronLeft, Sparkles } from 'lucide-react';
import { useApp } from '../App.tsx';
import { Link } from 'react-router-dom';
import { analyzeUrlReputation, analyzeSandboxArtifact, analyzeApiRequest } from '../services/geminiService.ts';

const ToolContainer = ({ title, children, onExit }: { title: string; children: React.ReactNode; onExit: () => void }) => (
  <div className="mt-8 p-8 bg-slate-900 border border-slate-800 rounded-[32px] animate-in slide-in-from-top-4 relative overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] -z-10"></div>
    <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
      <button 
        onClick={onExit} 
        className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-all bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-700/50 shadow-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Hub
      </button>
      <h4 className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2">
        <Terminal className="w-4 h-4" />
        {title}
      </h4>
    </div>
    {children}
  </div>
);

const HeuristicBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
      <span className="text-slate-500">{label.replace(/([A-Z])/g, ' $1')}</span>
      <span className="text-cyan-500">{value}/10</span>
    </div>
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/30 shadow-inner">
      <div 
        className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 transition-all duration-1000 ease-out" 
        style={{ width: `${value * 10}%` }}
      />
    </div>
  </div>
);

const ResultDisplay = ({ result }: { result: any }) => {
  const isSafe = result.verdict === 'SAFE';
  const isDangerous = result.verdict === 'DANGEROUS';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="lg:col-span-3 space-y-6 bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full transition-colors duration-500 ${
          isSafe ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 
          isDangerous ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 
          'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
        }`} />
        
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Forensic Verdict</div>
            <div className={`text-4xl font-black ${
              isSafe ? 'text-green-500' : isDangerous ? 'text-red-500' : 'text-amber-500'
            }`}>
              {result.verdict}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Risk Score</div>
            <div className="text-4xl font-black text-white">{result.riskScore}%</div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800/50">
          <p className="text-sm text-slate-300 leading-relaxed italic">"{result.explanation}"</p>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" />
            Threat Signatures
          </div>
          <div className="grid grid-cols-1 gap-2">
            {result.redFlags && result.redFlags.length > 0 ? (
              result.redFlags.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-red-400 bg-red-400/5 border border-red-400/10 px-4 py-3 rounded-xl text-[11px] font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {f}
                </div>
              ))
            ) : (
              <div className="text-green-500 bg-green-500/5 border border-green-500/10 px-4 py-3 rounded-xl text-[11px] font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> No critical signatures detected.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8 bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Heuristics</div>
          <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
        </div>
        <div className="space-y-8">
          {result.heuristics && Object.entries(result.heuristics).map(([key, val]: any) => (
            <HeuristicBar key={key} label={key} value={val} />
          ))}
        </div>
        <div className="pt-8 border-t border-slate-800">
           <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800/50 text-[10px] text-slate-500 leading-relaxed font-mono">
              <span className="text-cyan-600">SOC_ADVISORY:</span> Neural scoring is based on real-time correlation of domain entropy and visual masquerading attempts.
           </div>
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const { addScan } = useApp();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [hasPremiumKey, setHasPremiumKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      // Safe access using 'any' to avoid conflicting global declarations
      const aiStudio = (window as any).aistudio;
      if (aiStudio && typeof aiStudio.hasSelectedApiKey === 'function') {
        try {
          const has = await aiStudio.hasSelectedApiKey();
          setHasPremiumKey(has);
        } catch (e) {
          console.warn("AI Studio key check failed:", e);
        }
      }
    };
    checkKey();
  }, []);

  const handleConnectAIStudio = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio && typeof aiStudio.openSelectKey === 'function') {
      try {
        await aiStudio.openSelectKey();
        // Guidelines: Assume success immediately after openSelectKey
        setHasPremiumKey(true);
      } catch (e) {
        console.error("AI Studio key selection failed:", e);
      }
    } else {
      console.warn("AI Studio interface not available in this environment.");
    }
  };

  const simulateLogs = async (type: string) => {
    setLogs([]);
    const messages = [
      `> Initializing ${type} Probe...`,
      "> Mounting isolated detonation volume...",
      "> Injecting neural pattern probe...",
      "> Correlating threat vectors...",
      "> Generating forensic report..."
    ];
    for (const msg of messages) {
      setLogs(prev => [...prev, msg]);
      await new Promise(r => setTimeout(r, 120));
    }
  };

  const handleUrlCheck = async () => {
    if (!input || !input.includes('.')) {
      alert("Invalid Artifact: Please provide a valid URL.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      await simulateLogs("URL Reputation");
      const data = await analyzeUrlReputation(input);
      setResult(data);
      addScan({
        type: 'URL',
        verdict: data.verdict,
        riskScore: data.riskScore,
        explanation: data.explanation,
        redFlags: data.redFlags,
        heuristics: data.heuristics
      });
    } catch (e: any) {
      if (e.message?.includes("Requested entity was not found")) {
        setHasPremiumKey(false);
        handleConnectAIStudio(); 
      } else {
        console.error(e);
        alert("Forensic Gateway Error. Handshake failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSandboxCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      await simulateLogs("Virtual Sandbox");
      const data = await analyzeSandboxArtifact("suspicious_binary.exe", "Syscalls: SocketOpen, RegWrite, NetworkScan");
      setResult(data);
      addScan({
        type: 'FILE',
        verdict: data.verdict,
        riskScore: data.riskScore,
        explanation: data.explanation,
        redFlags: data.redFlags,
        heuristics: data.heuristics
      });
    } catch (e) {
      alert("Sandbox detonation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleApiTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      await simulateLogs("API Gateway");
      const data = await analyzeApiRequest(input || '{"action": "remote_handshake", "target": "internal_relay"}');
      setResult(data);
      addScan({
        type: 'API',
        verdict: data.verdict,
        riskScore: data.riskScore,
        explanation: data.explanation,
        redFlags: data.redFlags,
        heuristics: data.heuristics
      });
    } catch (e) {
      alert("API Probe failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetTool = () => {
    setActiveTool(null);
    setInput('');
    setResult(null);
    setLogs([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-[0.2em] transition-all">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">Infrastructure Hub</h1>
        </div>
        
        <button 
          onClick={handleConnectAIStudio}
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
            hasPremiumKey ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 hover:bg-cyan-600 hover:text-white shadow-xl shadow-cyan-500/10'
          }`}
        >
          <Sparkles className="w-4 h-4" /> 
          {hasPremiumKey ? 'Premium Node Active' : 'Enable Neural Pro'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="glass-card p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 flex flex-col h-full hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-500 group">
          <Globe className="w-16 h-16 text-cyan-500 mb-10 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-black mb-4">URL Reputation</h3>
          <p className="text-slate-500 text-sm mb-10 flex-grow leading-relaxed">Punycode detection, domain entropy analysis, and TLD reputation scoring in real-time.</p>
          <button onClick={() => setActiveTool('URL')} className="w-full py-4 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">Launch Console</button>
        </div>

        <div className="glass-card p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 flex flex-col h-full hover:shadow-2xl hover:border-purple-500/30 transition-all duration-500 group">
          <FileSearch className="w-16 h-16 text-purple-500 mb-10 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-black mb-4">Virtual Sandbox</h3>
          <p className="text-slate-500 text-sm mb-10 flex-grow leading-relaxed">Isolated detonation environment for interrogating suspicious binary artifacts without host exposure.</p>
          <button onClick={() => setActiveTool('SANDBOX')} className="w-full py-4 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-purple-500/20">Access Chamber</button>
        </div>

        <div className="glass-card p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 flex flex-col h-full hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-500 group">
          <Code className="w-16 h-16 text-emerald-500 mb-10 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-black mb-4">API Playground</h3>
          <p className="text-slate-500 text-sm mb-10 flex-grow leading-relaxed">Enterprise REST gateway for integrating neural forensics into your custom CI/CD or security pipelines.</p>
          <button onClick={() => setActiveTool('API')} className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20">Access API</button>
        </div>
      </div>

      {activeTool === 'URL' && (
        <ToolContainer title="URL Reputation Console" onExit={resetTool}>
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Artifact (URL)</label>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlCheck()}
                placeholder="https://secure-verify-auth.xyz/login..."
                className="w-full p-6 bg-slate-950 border border-slate-800 rounded-2xl text-cyan-400 font-mono text-sm outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
            
            <button 
              onClick={handleUrlCheck}
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
            >
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
              {loading ? 'Executing Probe...' : 'Analyze Reputation'}
            </button>

            {loading && logs.length > 0 && (
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[10px] text-cyan-500 space-y-2 shadow-inner">
                {logs.map((l, i) => <div key={i}>{l}</div>)}
              </div>
            )}
            
            {result && <ResultDisplay result={result} />}
          </div>
        </ToolContainer>
      )}

      {activeTool === 'SANDBOX' && (
        <ToolContainer title="Forensic Detonation Chamber" onExit={resetTool}>
          <div className="space-y-8 text-center">
            <div className="p-16 border-2 border-dashed border-slate-800 rounded-[40px] bg-slate-950/50">
              <Database className="w-16 h-16 text-slate-700 mx-auto mb-6" />
              <p className="text-xs text-slate-500 uppercase font-black tracking-[0.3em]">Awaiting Forensic Artifact</p>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">Compatible with .bin, .exe, .js, .py</p>
            </div>
            <button 
              onClick={handleSandboxCheck}
              disabled={loading}
              className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin mx-auto" /> : 'Initialize Detonation'}
            </button>
            {result && <ResultDisplay result={result} />}
          </div>
        </ToolContainer>
      )}

      {activeTool === 'API' && (
        <ToolContainer title="API Security Playground" onExit={resetTool}>
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Raw Payload Body (JSON)</label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"artifact": "raw_payload_data_here"}'
                className="w-full h-64 p-6 bg-slate-950 border border-slate-800 rounded-3xl outline-none text-emerald-400 font-mono text-xs focus:border-emerald-500/50"
              />
            </div>
            <button 
              onClick={handleApiTest}
              disabled={loading}
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin mx-auto" /> : 'Dispatch API Probe'}
            </button>
            {result && <ResultDisplay result={result} />}
          </div>
        </ToolContainer>
      )}
    </div>
  );
}
