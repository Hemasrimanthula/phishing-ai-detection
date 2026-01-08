
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../App.tsx';
import { ChevronLeft, Calendar, User, Share2, Shield, Bookmark, Clock } from 'lucide-react';

export default function BlogDetail() {
  const { id } = useParams();
  const { posts } = useApp();
  const post = posts.find(p => p.id === id);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-4xl mx-auto px-4 w-full">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-[10px] font-black text-white/70 hover:text-white uppercase tracking-[0.2em] mb-8 transition-all bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Forensic Intel
            </Link>
            
            <div className="space-y-6">
              <span className="px-4 py-1.5 bg-cyan-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] text-cyan-600">
                    {post.author.charAt(0)}
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="space-y-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tools Used</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <Shield className="w-4 h-4 text-cyan-500" />
                    DMARC Analyzer
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <Shield className="w-4 h-4 text-cyan-500" />
                    Neural Core v3
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-500 transition-colors">
                  <Share2 className="w-4 h-4" /> Share Forensic Data
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-500 transition-colors">
                  <Bookmark className="w-4 h-4" /> Archive Case Study
                </button>
              </div>
            </div>
          </aside>

          {/* Body Text */}
          <div className="lg:col-span-3 space-y-8">
            <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic border-l-4 border-cyan-500 pl-8 py-2">
              {post.excerpt}
            </p>
            
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-loose space-y-6">
              {post.content.split('\n').map((para, i) => (
                <p key={i} className="text-lg">{para}</p>
              ))}
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white pt-8">Technical Mitigation</h3>
              <p className="text-lg">
                The forensic evidence suggests a multi-stage infiltration attempt. Our neural engine flagged the linguistic entropy within the first 500ms of ingestion, allowing the sandbox to isolate the detonation before the user's browser could render the homoglyph-spoofed landing page.
              </p>

              <div className="p-8 bg-slate-900 rounded-[32px] border border-slate-800 my-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Researcher Note</div>
                    <div className="text-xs font-bold text-white">Neural Protection Baseline</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed italic">
                  "Always verify the raw DMARC alignment before trusting any visual brand indicators. This case study highlights why automated SPF validation is no longer sufficient against LLM-crafted social engineering lures."
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer Nav */}
      <footer className="max-w-4xl mx-auto px-4 py-20 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-xl font-black">Stay Ahead of Threats</h4>
            <p className="text-sm text-slate-500">Receive weekly forensic intelligence reports directly to your inbox.</p>
          </div>
          <button className="px-10 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl">
            Subscribe to Intel
          </button>
        </div>
      </footer>
    </div>
  );
}
