
import React from 'react';
import { Palette, Globe, Shield, Save } from 'lucide-react';
import { useApp } from '../../App.tsx';

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();

  const colorPresets = ['#0ea5e9', '#3b82f6', '#6366f1', '#a855f7', '#10b981', '#f43f5e'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Platform Settings</h1>
        <p className="text-slate-500">Customize the UI, branding, and global configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 rounded-3xl border">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-6 h-6 text-[var(--primary-color)]" />
              <h3 className="text-xl font-bold">General Branding</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Site Name</label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  value={settings.siteName}
                  onChange={(e) => updateSettings({ siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Meta Description</label>
                <textarea
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  rows={3}
                  value={settings.metaDescription}
                  onChange={(e) => updateSettings({ metaDescription: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border">
            <div className="flex items-center gap-3 mb-8">
              <Palette className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold">Visual Identity</h3>
            </div>
            <div className="space-y-8">
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-4">Primary Brand Color</label>
                <div className="flex flex-wrap gap-4">
                  {colorPresets.map(color => (
                    <button
                      key={color}
                      onClick={() => updateSettings({ primaryColor: color })}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        settings.primaryColor === color ? 'border-white ring-4 ring-[var(--primary-color)] scale-110 shadow-xl' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs font-bold text-slate-400">Custom:</span>
                    <input 
                      type="color" 
                      value={settings.primaryColor}
                      onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                      className="w-8 h-8 rounded border-0 p-0 overflow-hidden cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div>
                  <div className="font-bold">Dark Mode Default</div>
                  <div className="text-xs text-slate-500">Toggle site-wide theme preference</div>
                </div>
                <button
                  onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
                  className={`w-14 h-8 rounded-full transition-colors relative ${settings.theme === 'dark' ? 'bg-[var(--primary-color)]' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.theme === 'dark' ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border bg-slate-900 text-white">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--primary-color)]" />
              Quick Preview
            </h4>
            <div className="space-y-4 opacity-80">
              <div className="h-12 w-full bg-white/10 rounded-lg flex items-center px-4">
                <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: settings.primaryColor }}></div>
                <div className="text-xs font-bold">{settings.siteName} Header</div>
              </div>
              <div className="h-32 w-full bg-white/5 rounded-xl p-4">
                <div className="h-4 w-2/3 bg-white/20 rounded mb-2"></div>
                <div className="h-4 w-full bg-white/20 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-white/20 rounded"></div>
              </div>
            </div>
            <button 
              onClick={() => alert("Changes synced to production context.")}
              className="w-full mt-8 py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <Save className="w-5 h-5" />
              Push Production
            </button>
          </div>
          
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-3xl">
            <h4 className="font-bold text-sm mb-4">API Configuration</h4>
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Gemini Flash-Preview</div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-xs overflow-hidden text-ellipsis">
                {process.env.API_KEY ? '••••••••' + process.env.API_KEY.slice(-4) : 'NOT CONFIGURED'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
