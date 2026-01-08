
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronLeft } from 'lucide-react';
import { useApp } from '../App.tsx';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const { addMessage } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-all group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Connect with <br /><span className="text-[var(--primary-color)]">Threat Intelligence</span>
            </h1>
            <p className="text-lg text-slate-500">Interested in enterprise-wide deployment? Start the conversation.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 glass-card rounded-2xl border">
              <div className="w-12 h-12 bg-cyan-500/10 text-[var(--primary-color)] rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Direct Line</div>
                <div className="font-bold">intel@phishdetect.ai</div>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 glass-card rounded-2xl border">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">HQ</div>
                <div className="font-bold">Palo Alto, California</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          {submitted ? (
            <div className="py-20 text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold">Transmission Received</h2>
              <p className="text-slate-500">Our analysts will review your inquiry shortly.</p>
              <button onClick={() => setSubmitted(false)} className="text-[var(--primary-color)] font-bold hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Full Name</label>
                  <input required type="text" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Email Address</label>
                  <input required type="email" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Subject</label>
                <select 
                  value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
                  <option>General Inquiry</option>
                  <option>Security Audit Request</option>
                  <option>Enterprise Pricing</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">Message</label>
                <textarea required rows={5}
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)] resize-none"
                  placeholder="Details of your request..."></textarea>
              </div>
              <button type="submit"
                className="w-full py-4 bg-[var(--primary-color)] text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center space-x-2">
                <span>Submit Inquiry</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
