
import React, { useState } from 'react';
import { Book, Code, Cpu, Shield, Zap, Terminal, ChevronRight, Copy, Check, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-slate-900 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{language}</span>
        <button onClick={copy} className="text-slate-400 hover:text-white transition-colors">
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-cyan-400 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Section = ({ id, title, children, icon: Icon }: any) => (
  <section id={id} className="scroll-mt-32 space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)] flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="text-2xl font-black">{title}</h2>
    </div>
    <div className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
      {children}
    </div>
  </section>
);

export default function Docs() {
  const [activeTab, setActiveTab] = useState('getting-started');

  const menuItems = [
    { id: 'getting-started', label: 'Getting Started', icon: Book },
    { id: 'ai-engine', label: 'AI Forensic Engine', icon: Cpu },
    { id: 'api-integration', label: 'API Integration', icon: Code },
    { id: 'heuristics', label: 'Heuristic Protocols', icon: Terminal },
    { id: 'compliance', label: 'Security & Privacy', icon: Shield },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-all group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar Nav */}
        <aside className="lg:w-64 shrink-0 space-y-8">
          <div className="sticky top-32">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Documentation</div>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === item.id 
                    ? 'bg-[var(--primary-color)] text-white shadow-lg shadow-[var(--primary-color)]/20' 
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow max-w-3xl space-y-24">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">Technical Documentation</h1>
            <p className="text-lg text-slate-500">Comprehensive guide to integrating and deploying PhishDetect AI.</p>
          </header>

          <Section id="getting-started" title="Getting Started" icon={Book}>
            <p>
              PhishDetect AI is designed for seamless integration into existing communication workflows. Whether you are using our Chrome Extension or integrating directly via API, our core neural engine remains consistent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border">
                <h4 className="font-bold mb-2">Browser Extension</h4>
                <p className="text-xs">Zero-configuration deployment. Install from Chrome Store and authenticate with your Enterprise Key.</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border">
                <h4 className="font-bold mb-2">REST API</h4>
                <p className="text-xs">Send payloads for real-time forensic scoring. Supports Node.js, Python, and Go.</p>
              </div>
            </div>
          </Section>

          <Section id="ai-engine" title="AI Forensic Engine" icon={Cpu}>
            <p>
              The engine utilizes a multi-layered Transformer model fine-tuned on millions of verified phishing attempts. It doesn't just look for keywords; it understands <strong>intent</strong>.
            </p>
            <ul className="space-y-4 mt-6">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] shrink-0" />
                <span><strong>NLP Semantic Analysis:</strong> Evaluates authority figures, urgency markers, and logical inconsistencies.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] shrink-0" />
                <span><strong>Visual Identity Matching:</strong> Compares brand assets in emails against our global fingerprint database.</span>
              </li>
            </ul>
          </Section>

          <Section id="api-integration" title="API Integration" icon={Code}>
            <p>Our REST API allows for high-throughput analysis of incoming message streams. Use the following endpoint for real-time scoring:</p>
            <CodeBlock 
              language="POST /v1/forensics/analyze" 
              code={`{
  "artifact_type": "email_body",
  "payload": "Dear user, your account is suspended. Click here to verify...",
  "metadata": {
    "sender_ip": "192.168.1.1",
    "headers": { "X-Priority": "1" }
  }
}`}
            />
            <p className="mt-6">Expected response schema:</p>
            <CodeBlock 
              language="JSON Response" 
              code={`{
  "risk_score": 89.2,
  "verdict": "DANGEROUS",
  "threat_type": "CREDENTIAL_HARVESTING",
  "heuristics": {
    "urgency_score": 9.2,
    "domain_entropy": 7.4
  }
}`}
            />
          </Section>

          <Section id="heuristics" title="Heuristic Protocols" icon={Terminal}>
            <p>
              We employ specific protocol-level heuristics to identify spoofing that bypasses standard DMARC checks.
            </p>
            <div className="space-y-4 mt-6">
              <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-cyan-400">
                <div className="text-slate-500 mb-2">// Punycode & Homoglyph Detection</div>
                <span>DETECT: "gοogle.com" (Omicron instead of o) -> ALERT: VISUAL_SPOOF</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-cyan-400">
                <div className="text-slate-500 mb-2">// Entropy Link Guard</div>
                <span>CHECK: "bit.ly/secure-auth-392" -> RESOLVE -> "evilsite.top/login" -> REPUTATION_FAIL</span>
              </div>
            </div>
          </Section>

          <Section id="compliance" title="Security & Privacy" icon={Shield}>
            <p>
              Privacy is our priority. We follow a <strong>Zero-Persistance</strong> policy for sensitive payloads. 
            </p>
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-6">
              <Shield className="w-12 h-12 text-green-500 shrink-0" />
              <div className="space-y-1">
                <div className="font-bold text-green-600">SOC2 Type II Compliant</div>
                <p className="text-xs text-slate-500">All analysis happens in ephemeral RAM-disks. Payloads are shredded immediately after forensic scoring.</p>
              </div>
            </div>
          </Section>

          <div className="pt-20 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div className="text-xs text-slate-400">Updated: Oct 2024</div>
            <button className="flex items-center gap-2 text-[var(--primary-color)] font-bold text-sm">
              Download PDF SDK Guide <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
