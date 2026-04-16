'use client';

import React, { useState, useEffect } from 'react';

export default function SocialDashboardPage() {
  const [contentList, setContentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center animate-pulse">
          <div className="text-3xl mb-4">✨</div>
          <h2 className="text-lg font-serif text-stone-600">Syncing with Teable Core...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-green-900 font-serif mb-2">Social Hub</h1>
            <p className="text-stone-500">Review, approve, and chat with AI about your upcoming content.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
             <button className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-stone-100 transition-all">
                Ask AI Assistant 🤖
             </button>
             <button className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:bg-green-800 transition-all">
                Publish Approved
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
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                     <p className="text-xs text-stone-400 uppercase font-bold mb-2">English</p>
                     <p className="text-sm text-stone-700 whitespace-pre-wrap">{item.caption_en}</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                     <p className="text-xs text-stone-400 uppercase font-bold mb-2">Español</p>
                     <p className="text-sm text-stone-700 whitespace-pre-wrap">{item.caption_es}</p>
                  </div>
                </div>
                
                <div className="bg-indigo-50/50 p-4 rounded-2xl mb-6 border border-indigo-100">
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">📸 AI Media Generation Prompt:</p>
                  <p className="text-sm text-indigo-700/80 italic">" {item.prompt} "</p>
                </div>
                
                {item.status !== 'Approved' && (
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => handleApprove(item.id)}
                      disabled={actionLoading === item.id}
                      className="flex-1 bg-green-50 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === item.id ? 'Approving...' : 'Approve Media'}
                    </button>
                    <button className="flex-1 bg-stone-100 text-stone-600 font-semibold py-3 rounded-xl hover:bg-stone-200 transition-colors">
                      Edit Copy
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 h-fit sticky top-6">
             <h2 className="font-serif text-xl text-stone-800 mb-4">Gemini Assistant Database</h2>
             <p className="text-sm text-stone-500 mb-6">Chat natively with your AI. The assistant has full access to reading the Teable inventory, social schedules, and sales tags to help you analyze performance.</p>
             
             <div className="bg-stone-50 rounded-2xl p-4 h-[400px] flex flex-col justify-end border border-stone-100">
                <div className="mb-auto mt-4 mx-2">
                   <div className="bg-green-100 text-green-900 text-sm p-3 rounded-r-xl rounded-bl-xl w-3/4 mb-2 shadow-sm">
                      Hola Meybell! I'm synchronized with your 30-day calendar. Everything looks ready for your review. Would you like me to analyze which products are missing SEO?
                   </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Ask Gemini to run a report..." 
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
