
import React from 'react';
import { useApp } from '../App.tsx';
import { 
  History, 
  ShieldCheck, 
  Activity, 
  Globe, 
  FileSearch, 
  Cpu, 
  Terminal, 
  ArrowRight,
  ChevronLeft,
  Search,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'URL': return <Globe className="w-4 h-4" />;
    case 'FILE': return <FileSearch className="w-4 h-4" />;
    case 'API': return <Cpu className="w-4 h-4" />;
    default: return <Terminal className="w-4 h-4" />;
  }
};

export default function Profile() {
  const { scans, currentUser } = useApp();

  const userScans = scans.filter(s => s.userEmail === currentUser?.email);
  const dangerousCount = userScans.filter(s => s.verdict === 'DANGEROUS').length;
  const suspiciousCount = userScans.filter(s => s.verdict === 'SUSPICIOUS').length;
  const safetyRating = userScans.length > 0 ? Math.max(0, 100 - (dangerousCount * 15) - (suspiciousCount * 5)) : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[var(--primary-color)] text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl shadow-[var(--primary-color)]/20">
              {currentUser?.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">{currentUser?.email.split('@')[0]}'s Forensic Hub</h1>
              <p className="text-slate-500 font-medium">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="glass-card p-6 rounded-3xl border text-center min-w-[140px]">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Safety Rating</div>
            <div className={`text-3xl font-black ${safetyRating > 80 ? 'text-green-500' : 'text-amber-500'}`}>{safetyRating}%</div>
          </div>
          <div className="glass-card p-6 rounded-3xl border text-center min-w-[140px]">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Scans</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{userScans.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-600" />
              Recent Artifact Analysis
            </h2>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Synchronized with Node_Alpha</div>
          </div>

          <div className="space-y-4">
            {userScans.length === 0 ? (
              <div className="p-20 text-center glass-card rounded-[40px] border border-dashed space-y-6">
                <Search className="w-16 h-16 text-slate-200 mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-bold text-slate-400">No Forensic History Found</p>
                  <p className="text-sm text-slate-400 max-w-xs mx-auto">Execute your first neural scan from the home page or infrastructure hub to begin tracking threats.</p>
                </div>
                <Link to="/services" className="inline-block px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:brightness-125 transition-all">
                  Access Forensic Tools
                </Link>
              </div>
            ) : (
              [...userScans].reverse().map((scan) => (
                <div key={scan.id} className="group glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row gap-6">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                      scan.verdict === 'DANGEROUS' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      scan.verdict === 'SUSPICIOUS' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      <TypeIcon type={scan.type} />
                    </div>
                    <div className="md:hidden">
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{scan.date}</div>
                       <div className={`text-xs font-black ${
                          scan.verdict === 'DANGEROUS' ? 'text-red-500' : 
                          scan.verdict === 'SUSPICIOUS' ? 'text-amber-500' : 
                          'text-green-500'
                       }`}>{scan.verdict}</div>
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <div className="hidden md:flex items-center gap-3">
                      <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase tracking-tighter">{scan.type}</span>
                      <span className="text-[10px] font-bold text-slate-400">{scan.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic line-clamp-2">
                      "{scan.explanation}"
                    </p>
                  </div>

                  <div className="shrink-0 flex md:flex-col items-center justify-between md:justify-center md:items-end gap-2 md:pl-10">
                    <div className="text-right">
                       <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Risk Score</div>
                       <div className={`text-2xl font-black ${scan.riskScore > 70 ? 'text-red-500' : scan.riskScore > 30 ? 'text-amber-500' : 'text-green-500'}`}>
                         {scan.riskScore}%
                       </div>
                    </div>
                    <div className={`hidden md:flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      scan.verdict === 'DANGEROUS' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      scan.verdict === 'SUSPICIOUS' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {scan.verdict}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 space-y-8">
            <h3 className="text-lg font-black flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Security Posture
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                   <span>Neural Immunity</span>
                   <span>{safetyRating}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${safetyRating}%` }} />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                 {[
                   { label: 'Blocked Threats', value: dangerousCount, color: 'text-red-500', icon: AlertTriangle },
                   { label: 'Baseline Checks', value: userScans.length - dangerousCount - suspiciousCount, color: 'text-green-500', icon: CheckCircle },
                   { label: 'Heuristic Alerts', value: suspiciousCount, color: 'text-amber-500', icon: Activity }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                     <div className="flex items-center gap-3">
                       <stat.icon className={`w-4 h-4 ${stat.color}`} />
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{stat.label}</span>
                     </div>
                     <span className="text-sm font-black text-slate-900 dark:text-white">{stat.value}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
               <button className="w-full py-4 bg-[var(--primary-color)] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all">
                 Generate Global Report
               </button>
            </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[40px] text-white space-y-6">
             <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400">
                <Activity className="w-6 h-6" />
             </div>
             <div className="space-y-2">
                <h4 className="font-black text-lg">Predictive Mitigation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Based on your recent forensic artifacts, our AI predicts a 12% lower probability of successful spear-phishing attempts against your profile.</p>
             </div>
             <Link to="/docs" className="inline-flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:gap-4 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
