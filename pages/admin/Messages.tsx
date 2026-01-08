
import React, { useState } from 'react';
import { Mail, Trash2, CheckCircle, Search, Clock, User, MessageSquare, AlertCircle } from 'lucide-react';
import { useApp } from '../../App.tsx';

export default function AdminMessages() {
  const { messages, deleteMessage, markMessageRead } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMsg = messages.find(m => m.id === selectedId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Communication Hub</h1>
          <p className="text-slate-500">Manage enterprise inquiries and support requests.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
          />
        </div>
      </div>

      <div className="flex-grow flex gap-8 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-1/3 glass-card rounded-2xl border flex flex-col overflow-hidden">
          <div className="p-4 border-b font-bold text-xs uppercase tracking-widest text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
            Recent Inquiries ({filteredMessages.length})
          </div>
          <div className="flex-grow overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-4">
                <MessageSquare className="w-8 h-8 mx-auto opacity-20" />
                <p className="text-xs">No messages found.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelectedId(msg.id);
                    markMessageRead(msg.id);
                  }}
                  className={`w-full p-4 border-b text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 relative ${
                    selectedId === msg.id ? 'bg-slate-100 dark:bg-slate-800' : ''
                  }`}
                >
                  {!msg.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-color)]" />
                  )}
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold truncate pr-2">{msg.name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{msg.date.split(',')[0]}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate mb-1">{msg.subject}</div>
                  <div className="text-[10px] text-slate-500 truncate">{msg.message}</div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-grow glass-card rounded-2xl border p-10 overflow-y-auto">
          {activeMsg ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-2xl flex items-center justify-center font-black text-xl">
                    {activeMsg.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{activeMsg.name}</h2>
                    <div className="text-sm text-slate-500">{activeMsg.email}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => deleteMessage(activeMsg.id)}
                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 transition-all hover:text-white"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  <Clock className="w-4 h-4" />
                  Received on {activeMsg.date}
                  <span className="mx-2 opacity-20">|</span>
                  <AlertCircle className="w-4 h-4" />
                  Priority: Standard
                </div>
                <h3 className="text-xl font-bold border-b pb-4 mb-4">{activeMsg.subject}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {activeMsg.message}
                </p>
              </div>

              <div className="pt-8 border-t space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-400">Response Draft</h4>
                <textarea 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)] min-h-[150px]"
                  placeholder="Type your response..."
                />
                <button className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg">
                  <Mail className="w-4 h-4" />
                  Send Response
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <User className="w-16 h-16 opacity-10" />
              <p className="italic">Select a message to view the artifact details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
