
import React from 'react';
import { Target, Lightbulb, Users, ShieldCheck, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-all group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Our Mission: A Safer <br /><span className="text-cyan-600">Digital World</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            In an era where digital communication is the backbone of society, phishing remains the #1 entry point for cybercrime. Our mission is to democratize elite-level cybersecurity using artificial intelligence, making high-end threat detection accessible to everyone from students to global enterprises.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <div className="text-3xl font-black text-cyan-600 mb-2">99.9%</div>
              <div className="text-sm font-medium text-slate-500">Detection Accuracy</div>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <div className="text-3xl font-black text-cyan-600 mb-2">250ms</div>
              <div className="text-sm font-medium text-slate-500">Average Scan Time</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/cyberabout/800/600" 
            alt="Cybersecurity mission" 
            className="rounded-3xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 glass-card p-8 rounded-2xl shadow-xl border border-slate-200 hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold">Privacy First</div>
                <div className="text-xs text-slate-500">Zero-data storage policy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">The Core Problems We Solve</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Traditional security systems are too slow for modern threats. We solve this through innovation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Human Error',
              desc: '90% of data breaches are caused by a single clicked link. We act as a secondary guard.',
              icon: <Users className="w-8 h-8 text-blue-500" />
            },
            {
              title: 'Advanced AI Lures',
              desc: 'Attackers now use LLMs to write perfect emails. Our AI is trained to catch their fingerprints.',
              icon: <Lightbulb className="w-8 h-8 text-amber-500" />
            },
            {
              title: 'Legacy Inflexibility',
              desc: 'Old email filters cannot adapt to zero-day tactics. Our neural networks learn every hour.',
              icon: <Target className="w-8 h-8 text-red-500" />
            }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
