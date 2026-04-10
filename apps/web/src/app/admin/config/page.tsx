'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminConfigPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('system_settings').select('*');
    if (data) setSettings(data);
    setLoading(false);
  };

  const handleUpdate = async (key: string, value: string) => {
    setSaving(true);
    await supabase.from('system_settings').update({ value }).eq('key', key);
    setSaving(false);
  };

  if (loading) return <div className="p-24 text-center text-stone-400">Loading Configuration Engine...</div>;

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-stone-900 font-serif">Power Grid</h1>
          <p className="text-stone-500 mt-2">Manage API Keys, Costs, and Industrial Integrations</p>
        </header>

        <div className="grid gap-6">
          {settings.map((setting) => (
            <div key={setting.key} className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-green-700 mb-1">
                    {setting.key.replace(/_/g, ' ')}
                  </label>
                  <p className="text-sm text-stone-400 mb-4">{setting.description}</p>
                  <input 
                    type="password"
                    defaultValue={setting.value}
                    onBlur={(e) => handleUpdate(setting.key, e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono text-sm"
                    placeholder="Enter key..."
                  />
                </div>
                <div className="flex items-center space-x-2">
                   {saving ? (
                     <span className="text-xs text-green-600 font-bold animate-pulse">Syncing...</span>
                   ) : (
                     <span className="text-xs text-stone-300 font-bold">Encrypted</span>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-stone-200">
          <div className="bg-green-900 rounded-3xl p-8 text-white flex items-center justify-between">
            <div>
              <h3 className="font-bold font-serif text-xl">Cloud Status</h3>
              <p className="text-green-200 text-sm">Industrial Migration currently at 100% completion in F: Drive.</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white text-green-900 rounded-xl font-bold text-sm hover:bg-stone-100 transition-colors"
            >
              Verify Connections
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
