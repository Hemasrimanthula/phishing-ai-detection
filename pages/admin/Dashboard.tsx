
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Settings as SettingsIcon, 
  Users, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertCircle, 
  MessageSquare, 
  Terminal, 
  Activity, 
  Clock, 
  Database, 
  Lock, 
  Cpu, 
  Zap, 
  RefreshCcw,
  ShieldAlert,
  Beaker,
  ChevronDown,
  ChevronUp,
  Globe,
  FileSearch
} from 'lucide-react';
import { useApp } from '../../App.tsx';

const colorVariants: Record<string, { bg: string; text: string; hover: string; ring: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', hover: 'group-hover:bg-cyan-500', ring: 'ring-cyan-500/20' },
  red: { bg: 'bg-red-500/10', text: 'text-red-500', hover: 'group-hover:bg-red-500', ring: 'ring-red-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', hover: 'group-hover:bg-blue-500', ring: 'ring-blue-500/20' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', hover: 'group-hover:bg-indigo-500', ring: 'ring-indigo-500/20' }
};

const StatCard = ({ label, value, icon: Icon, color, path }: any) => {
  const variant = colorVariants[color] || colorVariants.cyan;
  return (
    <Link to={path || "#"} className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[var(--primary-color)]/30 transition-all group overflow-hidden relative">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 blur-2xl ${variant.bg}`}></div>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${variant.bg} ${variant.text} ${variant.hover} group-hover:text-white transition-all duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[var(--primary-color)] transition-colors" />
      </div>
      <div className="text-2xl font-black text-slate-900 dark:text-white mb-1 tabular-nums">{value}</div>
      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</div>
    </Link>
  );
};

const LogEntry = ({ scan }: any) => {
  const [expanded, setExpanded] = useState(false);
  
  const TypeIcon = scan.type === 'URL' ? Globe : scan.type === 'FILE' ? FileSearch : scan.type === 'API' ? Cpu : Terminal;

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-slate-600">
      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => setExpanded(!expanded)}>
          <div className="relative">
            <div className={`w-3 h-12 rounded-full shrink-0 ${
              scan.verdict === 'DANGEROUS' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 
              scan.verdict === 'SUSPICIOUS' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 
              'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
            }`} />
            <TypeIcon className="absolute -right-1 -bottom-1 w-4 h-4 text-white bg-slate-800 rounded-full p-0.5 border border-slate-700" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500">{scan.date}</span>
              <span className="text-[8px] font-black uppercase text-cyan-500 px-1 border border-cyan-500/30 rounded">{scan.type || 'EMAIL'}</span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                 scan.verdict === 'DANGEROUS' ? 'bg-red-500/20 text-red-500' : 
                 scan.verdict === 'SUSPICIOUS' ? 'bg-amber-500/20 text-amber-500' : 
                 'bg-green-500/20 text-green-500'
              }`}>{scan.verdict}</span>
            </div>
            <div className="text-xs text-slate-300 font-medium leading-relaxed max-w-lg line-clamp-1 group-hover:line-clamp-none transition-all">
              {scan.explanation}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 pl-10 md:pl-0">
          <div className="text-right">
            <div className="text-[9px] font-black text-slate-600 uppercase">RISK</div>
            <div className={`text-sm font-black ${scan.riskScore > 70 ? 'text-red-500' : scan.riskScore > 30 ? 'text-amber-500' : 'text-green-500'}`}>
              {scan.riskScore}%
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="p-2 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {expanded && scan.heuristics && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-800 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-3 gap-6 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
            {Object.entries(scan.heuristics).map(([key, val]: any) => (
              <div key={key} className="space-y-2">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500" style={{ width: `${val * 10}%` }} />
                </div>
                <div className="text-[10px] font-mono text-cyan-500">{val}/10</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function AdminDashboard() {
  const { posts, messages, scans, addScan, addMessage } = useApp();

  const dangerousCount = scans.filter(s => s.verdict === 'DANGEROUS').length;
  const suspiciousCount = scans.filter(s => s.verdict === 'SUSPICIOUS').length;
  const securityScore = scans.length > 0 ? Math.max(0, 100 - (dangerousCount * 10) - (suspiciousCount * 5)) : 100;

  const generateTestData = () => {
    const types: ('EMAIL' | 'URL' | 'FILE' | 'API')[] = ['EMAIL', 'URL', 'FILE', 'API'];
    const type = types[Math.floor(Math.random() * types.length)];
    const verdicts: ('SAFE' | 'SUSPICIOUS' | 'DANGEROUS')[] = ['SAFE', 'SUSPICIOUS', 'DANGEROUS'];
    const v = verdicts[Math.floor(Math.random() * verdicts.length)];
    
    addScan({
      type: type,
      verdict: v,
      riskScore: v === 'SAFE' ? Math.floor(Math.random() * 20) : v === 'SUSPICIOUS' ? 30 + Math.floor(Math.random() * 40) : 75 + Math.floor(Math.random() * 25),
      explanation: `Simulated ${type} security event triggered for diagnostic verification.`,
      redFlags: v === 'DANGEROUS' ? ["SIGNATURE_MATCH", "ANOMALOUS_SOURCE"] : [],
      heuristics: {
        linguisticManipulation: Math.floor(Math.random() * 10),
        linkEntropy: Math.floor(Math.random() * 10),
        domainMasking: Math.floor(Math.random() * 10)
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <ShieldCheck className="w-3 h-3" />
        <span>Root</span>
        <span className="opacity-30">/</span>
        <span className="text-[var(--primary-color)]">SOC_Global</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--primary-color)]/5 to-transparent"></div>
        <div className="space-y-4 relative z-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">SOC Analytics</h1>
            <p className="text-slate-500 text-sm font-medium">Cross-service threat intelligence and mitigation status.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              SYSTEM_OPTIMAL
            </div>
            <button onClick={generateTestData} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all">
              <Beaker className="w-3 h-3" />
              INJECT_TEST_VECTOR
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 relative z-10">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Global Health</div>
            <div className={`text-3xl font-black ${securityScore > 80 ? 'text-green-500' : 'text-amber-500'}`}>
              {securityScore}<span className="text-sm opacity-50 ml-1">%</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner">
             <ShieldAlert className={`w-8 h-8 ${securityScore > 80 ? 'text-green-500' : 'text-amber-500'}`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Email Threats" value={scans.filter(s=>s.type==='EMAIL').length} icon={MessageSquare} color="cyan" />
        <StatCard label="Link Malice" value={scans.filter(s=>s.type==='URL').length} icon={Globe} color="red" />
        <StatCard label="Sandbox Detonations" value={scans.filter(s=>s.type==='FILE').length} icon={FileSearch} color="blue" />
        <StatCard label="API Consumptions" value={scans.filter(s=>s.type==='API').length} icon={Cpu} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-500" />
                Cross-Service Telemetry
              </h3>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {scans.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed">
                  <Activity className="w-12 h-12 opacity-10 animate-pulse" />
                  <p className="font-bold text-sm">Waiting for Global Events...</p>
                </div>
              ) : (
                [...scans].reverse().map((scan) => (
                  <LogEntry key={scan.id} scan={scan} />
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="glass-card rounded-3xl p-8 border bg-slate-900 text-white shadow-2xl">
            <h3 className="text-lg font-black mb-8 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Service Status
            </h3>
            <div className="space-y-6">
              {[
                { label: 'URL Reputation', value: 'ONLINE', color: 'text-green-400' },
                { label: 'File Sandbox', value: 'ONLINE', color: 'text-green-400' },
                { label: 'Neural Core', value: '14ms', color: 'text-cyan-400' },
                { label: 'API Gateway', value: '99.9%', color: 'text-blue-400' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{item.label}</span>
                  <span className={`text-[10px] font-mono font-black ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
