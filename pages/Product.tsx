
import React from 'react';
import { Mail, Shield, Zap, Search, Chrome, Smartphone, Layout, Cpu, Database, Network, Globe, CheckCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechLayer = ({ icon: Icon, title, tech, desc }: any) => (
  <div className="flex gap-6 p-8 glass-card border rounded-3xl group hover:border-cyan-500/50 transition-all">
    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-cyan-500 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all">
      <Icon className="w-8 h-8" />
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded uppercase text-slate-500">{tech}</span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function Product() {
  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="bg-slate-950 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                System Architecture
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Enterprise <br /><span className="text-cyan-500">Security Layers</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                Our extension isn't just a filter. It's a localized neural inference engine that analyzes raw metadata, linguistic markers, and protocol compliance.
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Chrome className="w-5 h-5 text-cyan-500" />
                  <span className="text-sm font-bold">V8 Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-cyan-500" />
                  <span className="text-sm font-bold">WebAssembly Core</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/20 blur-[100px] rounded-full"></div>
              <img src="https://picsum.photos/seed/techstack/800/600" className="rounded-3xl border border-white/10 shadow-2xl relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Tech Stack */}
      <section className="max-w-7xl mx-auto px-4 py-32 space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black">Technical Deep Stack</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">A multi-stage pipeline designed to detect the most sophisticated spear-phishing attempts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TechLayer 
            icon={Database}
            title="Ingestion Engine"
            tech="DOM-Observer"
            desc="Efficiently captures incoming email payloads using MutationObservers without impacting browser performance or UI responsiveness."
          />
          <TechLayer 
            icon={Cpu}
            title="Feature Extraction"
            tech="NLP-Worker"
            desc="Extracts 250+ feature vectors including punctuation density, urgency vocabulary, and sender-domain similarity indices."
          />
          <TechLayer 
            icon={Network}
            title="Neural Analysis"
            tech="Transformer-v3"
            desc="Proprietary transformer model evaluates intent and context, identifying patterns typical of BEC (Business Email Compromise)."
          />
          <TechLayer 
            icon={Globe}
            title="Protocol Validation"
            tech="DNS-SEC"
            desc="Real-time validation of SPF, DKIM, and DMARC headers to verify sender authenticity and prevent spoofing."
          />
        </div>
      </section>

      {/* Detection Visuals */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="glass-card rounded-3xl p-10 border shadow-2xl space-y-8 bg-white dark:bg-slate-950">
            <div className="flex items-center justify-between border-b pb-6 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-red-500 text-lg">MALICIOUS PAYLOAD</div>
                  <div className="text-[10px] font-mono text-slate-400">SIGNATURE: 0x88A2-PHISH</div>
                </div>
              </div>
              <span className="bg-red-500/10 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold border border-red-500/20">BLOCKED</span>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border font-mono text-xs text-slate-500 leading-relaxed">
                <span className="text-red-500">CRITICAL:</span> Suspicious link detected leading to <span className="text-red-400 underline italic">secure-verify-bank.top/login</span>. Entropy score: 8.4/10.
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'SPF', ok: true },
                  { label: 'DKIM', ok: false },
                  { label: 'DMARC', ok: false }
                ].map((p, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-center ${p.ok ? 'bg-green-500/5 border-green-500/20 text-green-500' : 'bg-red-500/5 border-red-500/20 text-red-500'}`}>
                    <div className="text-[10px] font-bold uppercase mb-1">{p.label}</div>
                    <div className="text-xs font-black">{p.ok ? 'PASS' : 'FAIL'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-black">Sub-Millisecond <br />Reaction Time</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Detection happens at the speed of thought. By processing the initial 5KB of every incoming email stream, we can provide a verdict before the user has even finished reading the subject line.
            </p>
            <ul className="space-y-4">
              {[
                "Zero-data storage architecture",
                "Heuristic-based offline mode",
                "Advanced punycode detection",
                "Behavioral analysis engine"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
