'use client';

import React, { useState, useEffect } from 'react';

export default function SocialDashboardPage() {
  const [contentList, setContentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ en: '', es: '' });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/social');
      if (res.ok) {
        const data = await res.json();
        const formatted = data.records.map((r: any) => ({
          id: r.id,
          date: r.fields.Publish_Date ? new Date(r.fields.Publish_Date).toISOString().split('T')[0] : 'TBD',
          caption_en: r.fields.Caption_EN || '',
          caption_es: r.fields.Caption_ES || '',
          bot_keyword: r.fields.Bot_Keyword || '',
          status: r.fields.Status || 'Draft',
          prompt: r.fields.Image_Prompt || '',
        })).sort((a: any, b: any) => a.date.localeCompare(b.date)); // Sort chronologically
        setContentList(formatted);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId: id, status: 'Approved' }),
      });
      if (res.ok) {
        setContentList(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item));
      }
    } finally {
      setActionLoading(null);
    }
  };

  const startEditing = (item: any) => {
    setEditingId(item.id);
    setEditValues({ en: item.caption_en, es: item.caption_es });
  };

  const saveEdit = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          recordId: id, 
          caption_en: editValues.en, 
          caption_es: editValues.es 
        }),
      });
      if (res.ok) {
        setContentList(prev => prev.map(item => item.id === id ? { ...item, caption_en: editValues.en, caption_es: editValues.es } : item));
        setEditingId(null);
      }
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-32">
        <div className="text-center animate-pulse">
          <div className="text-3xl mb-4">✨</div>
          <h2 className="text-lg font-serif text-stone-600">Syncing with Teable Core...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12 pt-32">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Alpha Dashboard</span>
               <h1 className="text-4xl font-bold text-green-900 font-serif">Social Hub</h1>
            </div>
            <p className="text-stone-500">Review, approve, and chat with AI about your upcoming content.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
             <button className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-stone-100 transition-all">
                Ask AI Assistant 🤖
             </button>
             <button className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:bg-green-800 transition-all">
                Submit Approved Batch
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-serif text-2xl text-stone-800 mb-4">Upcoming Schedule</h2>
            {contentList.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 relative">
                <div className="flex justify-between items-start mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                    item.status === 'Posted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </div>
                  <div className="text-sm text-stone-400 font-mono flex items-center gap-2">
                    <span className="text-green-600 font-bold bg-green-50 px-2 rounded">#{item.bot_keyword}</span>
                    {item.date}
                  </div>
                </div>
                
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editingId === item.id ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-400">English Caption</label>
                        <textarea 
                          value={editValues.en}
                          onChange={(e) => setEditValues({ ...editValues, en: e.target.value })}
                          className="w-full h-32 p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-400">Spanish Caption</label>
                        <textarea 
                          value={editValues.es}
                          onChange={(e) => setEditValues({ ...editValues, es: e.target.value })}
                          className="w-full h-32 p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                         <p className="text-xs text-stone-400 uppercase font-bold mb-2">English</p>
                         <p className="text-sm text-stone-700 whitespace-pre-wrap">{item.caption_en}</p>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                         <p className="text-xs text-stone-400 uppercase font-bold mb-2">Español</p>
                         <p className="text-sm text-stone-700 whitespace-pre-wrap">{item.caption_es}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* AI Visual Asset Display */}
                <div className="mb-6">
                   <div className="aspect-square md:aspect-video w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 relative group">
                      <img 
                        src={`/assets/social/april/${item.date}-${(item.product_focus || '').toLowerCase().replace(/\s+/g, '-')}.png`} 
                        alt={item.product_focus}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e: any) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 items-center justify-center flex-col text-stone-400 bg-stone-50/10 backdrop-blur-sm">
                        <div className="text-3xl mb-3">🎬</div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-600">Awaiting Aesthetic Approval</p>
                        <p className="text-[9px] mt-2 text-stone-500 max-w-[180px] text-center font-medium leading-relaxed">
                          Once you approve the copy and creative prompt, the 8K High-Fidelity synthesis will be triggered.
                        </p>
                      </div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <div className={`text-[10px] font-black px-3 py-1 rounded-full shadow-lg ${
                          item.status === 'Approved' ? 'bg-green-500 text-white' : 'bg-stone-800 text-white'
                        }`}>
                           {item.status === 'Approved' ? '✅ PRODUCTION READY' : '✨ DRAFT PREVIEW'}
                        </div>
                        {item.bot_keyword.includes('eye') || item.bot_keyword.includes('shampoo') ? (
                           <div className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                              📽️ VIDEO STORYBOARD QUEUED
                           </div>
                        ) : null}
                      </div>
                   </div>
                </div>
                
                <div className="bg-indigo-50/50 p-4 rounded-2xl mb-6 border border-indigo-100">
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">📸 AI Media Generation Prompt:</p>
                  <p className="text-sm text-indigo-700/80 italic">" {item.prompt} "</p>
                </div>
                
                <div className="flex gap-3 mt-4">
                  {editingId === item.id ? (
                    <button 
                      onClick={() => saveEdit(item.id)}
                      disabled={actionLoading === item.id}
                      className="flex-1 bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors"
                    >
                      {actionLoading === item.id ? 'Saving...' : 'Save Changes'}
                    </button>
                  ) : (
                    <>
                      {item.status !== 'Approved' ? (
                        <button 
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoading === item.id}
                          className="flex-1 bg-green-50 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50"
                        >
                          {actionLoading === item.id ? 'Approving...' : 'Approve for Generation'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => alert('🚀 Schedule: This asset is ready. Contact Admin to link Meta API for final launch.')}
                          className="flex-1 bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          🚀 Schedule to Instagram
                        </button>
                      )}
                      <button 
                        onClick={() => startEditing(item)}
                        className="flex-1 bg-stone-100 text-stone-600 font-semibold py-3 rounded-xl hover:bg-stone-200 transition-colors"
                      >
                        Edit Copy
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 h-fit sticky top-32">
             <h2 className="font-serif text-xl text-stone-800 mb-4">Gemini Assistant Database</h2>
             <p className="text-sm text-stone-500 mb-6">Chat natively with your AI. The assistant has full access to reading the Teable inventory, social schedules, and sales tags to help you analyze performance.</p>
             
             <div className="bg-stone-50 rounded-2xl p-4 h-[400px] flex flex-col justify-end border border-stone-100">
                <div className="mb-auto mt-4 mx-2">
                   <div className="bg-green-100 text-green-900 text-sm p-3 rounded-r-xl rounded-bl-xl w-3/4 mb-2 shadow-sm">
                      Hola Meybell! I'm synchronized with your 30-day calendar. Everything looks ready for your review. Once you "Approve" a post, it will enter the queue for high-resolution image generation.
                   </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Ask Gemini to run a report..." 
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
             </div>
             
             <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] font-black uppercase text-amber-700 mb-2">Workflow Note</p>
                <p className="text-[11px] text-amber-800/80 leading-relaxed">
                  Approving a post locks the copy and triggers the <b>AI Graphic Synthesis</b>. Final images will appear in your "Approved" feed within 15 minutes of batch submission.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
