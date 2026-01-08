
import React, { useState } from 'react';
import { Plus, Trash2, Edit, X, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../App.tsx';
import { BlogPost } from '../../types.ts';

export default function BlogCMS() {
  const { posts, addPost, deletePost } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Cybersecurity',
    image: 'https://picsum.photos/seed/newpost/800/400'
  });

  const handleSave = () => {
    if (!newPost.title || !newPost.content) return;
    const post: BlogPost = {
      ...newPost as BlogPost,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    addPost(post);
    setIsAdding(false);
    setNewPost({ title: '', excerpt: '', content: '', author: '', category: 'Cybersecurity', image: 'https://picsum.photos/seed/newpost/800/400' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Content Management</h1>
          <p className="text-slate-500">Draft, edit, and publish security insights.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-[var(--primary-color)]/20"
        >
          <Plus className="w-5 h-5" />
          Create New Post
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-3xl rounded-3xl p-8 border border-white/20 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black">Draft New Post</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Title</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Author</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    value={newPost.author}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Excerpt (Meta)</label>
                <textarea
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  rows={2}
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Body Content</label>
                <textarea
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  rows={8}
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Header Image URL</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    className="flex-grow p-3 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    value={newPost.image}
                    onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                  />
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button onClick={() => setIsAdding(false)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700">Cancel</button>
              <button onClick={handleSave} className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl font-bold shadow-lg shadow-[var(--primary-color)]/20">Publish Post</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="glass-card p-6 rounded-2xl border flex items-center gap-6 group">
            <img src={post.image} className="w-24 h-24 rounded-xl object-cover" />
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded text-[10px] font-bold uppercase">{post.category}</span>
                <span className="text-xs text-slate-400">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{post.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors">
                <Edit className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <button onClick={() => deletePost(post.id)} className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
