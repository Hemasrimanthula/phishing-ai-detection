
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App.tsx';
import { ArrowRight, Calendar, User, ChevronLeft } from 'lucide-react';

export default function Blog() {
  const { posts } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-all group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">Security Insights</h1>
        <p className="text-lg text-slate-500">The latest in AI, cybercrime trends, and digital defense.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article key={post.id} className="group glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="relative overflow-hidden h-64 shrink-0">
              <img 
                src={post.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={post.title}
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 bg-[var(--primary-color)] text-white text-xs font-bold rounded-full shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-8 space-y-4 flex flex-col flex-grow">
              <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[var(--primary-color)] transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.id}`} 
                className="inline-flex items-center gap-2 text-[var(--primary-color)] font-bold hover:gap-4 transition-all pt-4 mt-auto"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
