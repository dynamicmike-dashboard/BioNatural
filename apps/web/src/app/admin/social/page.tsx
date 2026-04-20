'use client';

import React, { useState, useEffect } from 'react';

const ImageWithPlaceholder = ({ item, type }: { item: any, type: string }) => {
  const [error, setError] = useState(false);
  
  // Reset error state when forcing a type change or status change
  useEffect(() => {
    setError(false);
  }, [type, item.status]);

  const imagePath = type === 'reel' ? (
    (item.product_focus || '').toLowerCase().includes('shampoo') ? 'video-shampoo' : 'video-eyegel'
  ) : (
    `${item.date}-${(item.product_focus || '').toLowerCase().replace(/[^a-z0-9]/g, '')}`
  );

  const fallbackPath = `/assets/products/${(item.product_focus || '').toLowerCase().replace(/[^a-z0-9]/g, '')}.webp`;

  return (
    <div className="aspect-square md:aspect-video w-full bg-silk rounded-[2rem] overflow-hidden border border-stone-200 relative group shadow-inner">
      {!error ? (
        <img 
          src={!error ? `/assets/social/april/${imagePath}.webp?v=${item.status}` : fallbackPath} 
          alt={item.product_focus}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${type === 'reel' ? 'brightness-50 blur-[1px]' : ''}`}
          onError={(e: any) => {
             if (e.target.src.includes('social/april')) {
                e.target.src = fallbackPath;
             } else {
                setError(true);
             }
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center flex-col text-stone-400 bg-silk/80 backdrop-blur-md px-12 text-center animate-in fade-in">
          <div className="text-4xl mb-4 italic serif">
             {item.status === 'Approved' ? '✨ Final 8K Mastering' : '🎬 Aesthetic Pending'}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-forest mb-4">
             {item.status === 'Approved' ? 'Synthesizing High-Fidelity Asset' : 'Draft Narrative Approval Required'}
          </p>
          <p className="text-[11px] text-stone-500 font-medium leading-relaxed max-w-sm">
            {item.status === 'Approved' 
              ? 'Our graphics engine is now generating the production-ready 8K file based on your approval.' 
              : 'Once you approve the copy and art direction, the high-fidelity render engine will be triggered.'}
          </p>
        </div>
      )}
      
      {type === 'reel' && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
           </div>
        </div>
      )}

      <div className="absolute top-6 left-6 flex gap-3">
        <div className={`text-[9px] font-black px-4 py-1.5 rounded-full shadow-xl tracking-[0.2em] backdrop-blur-md ${
          item.status === 'Approved' ? 'bg-green-500/80 text-white' : 'bg-forest/80 text-white'
        }`}>
           {item.status === 'Approved' ? '✅ PRODUCTION READY' : '✨ DRAFT STORYBOARD'}
        </div>
      </div>
    </div>
  );
};

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
          product_focus: r.fields.Product_Focus || '',
          caption_en: r.fields.Caption_EN || '',
          caption_es: r.fields.Caption_ES || '',
          bot_keyword: r.fields.Bot_Keyword || '',
          status: r.fields.Status || 'Draft',
          prompt: r.fields.Image_Prompt || '',
          media_type: (r.fields.Bot_Keyword || '').toLowerCase().includes('video') ? 'reel' : 'static'
        })).sort((a: any, b: any) => a.date.localeCompare(b.date));
        setContentList(formatted);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleType = (id: string, type: 'static' | 'reel') => {
    setContentList(prev => prev.map(item => item.id === id ? { ...item, media_type: type } : item));
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
      <div className="min-h-screen flex items-center justify-center bg-silk pt-32">
        <div className="text-center animate-pulse">
          <div className="text-3xl mb-4 text-sand">✨</div>
          <h2 className="text-lg font-serif text-forest italic">Synchronizing Intelligence Hub...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-silk p-6 md:p-12 pt-32 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="bg-sand/10 text-sand px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-sand/20">Alpha Intelligence</span>
               <h1 className="text-4xl font-bold text-forest font-serif italic">Marketing Hub</h1>
            </div>
            <p className="text-stone-500 text-sm font-medium">Design, refine, and schedule your social strategy with BioNatural AI.</p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
             <button className="bg-white border border-stone-200 text-stone-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-stone-100 transition-all">
                Analytics 📊
             </button>
             <button className="bg-forest text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-sand transition-all">
                Publish Batch 🚀
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="font-serif text-3xl text-forest italic mb-8">Editorial Queue</h2>
            {contentList.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 relative overflow-hidden group/card hover:shadow-xl transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    item.status === 'Posted' ? 'bg-blue-100 text-blue-700' : 'bg-sand/10 text-sand'
                  }`}>
                    {item.status}
                  </div>
                  <div className="text-sm text-stone-400 font-mono flex items-center gap-2">
                    <span className="text-sand font-bold bg-silk px-2 py-0.5 rounded border border-sand/10 text-[11px]">#{item.bot_keyword}</span>
                    <span className="text-stone-300">/</span>
                    <span className="font-bold text-[11px] text-stone-500">{item.date}</span>
                  </div>
                </div>
                
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {editingId === item.id ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">English Capture</label>
                        <textarea 
                          value={editValues.en}
                          onChange={(e) => setEditValues({ ...editValues, en: e.target.value })}
                          className="w-full h-40 p-5 bg-silk border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-sand outline-none font-medium text-forest"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Español Capture</label>
                        <textarea 
                          value={editValues.es}
                          onChange={(e) => setEditValues({ ...editValues, es: e.target.value })}
                          className="w-full h-40 p-5 bg-silk border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-sand outline-none font-medium text-forest"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-silk p-6 rounded-2xl border border-stone-100 group hover:border-sand transition-all">
                         <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-3">Narrative (EN)</p>
                         <p className="text-sm text-forest leading-relaxed font-medium">{item.caption_en}</p>
                      </div>
                      <div className="bg-silk p-6 rounded-2xl border border-stone-100 group hover:border-sand transition-all">
                         <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-3">Narrativa (ES)</p>
                         <p className="text-sm text-forest leading-relaxed font-medium">{item.caption_es}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="mb-8">
                   <div className="flex justify-between items-center mb-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-sand">Asset Production Engine</p>
                      <div className="flex bg-silk p-1 rounded-xl gap-1 border border-stone-200 shadow-inner">
                         <button 
                            onClick={() => handleToggleType(item.id, 'static')}
                            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${item.media_type === 'static' ? 'bg-white shadow-md text-forest' : 'text-stone-300'}`}
                         >📸 STATIC</button>
                         <button 
                            onClick={() => handleToggleType(item.id, 'reel')}
                            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${item.media_type === 'reel' ? 'bg-white shadow-md text-clay' : 'text-stone-300'}`}
                         >🎬 REEL</button>
                      </div>
                   </div>
                   <ImageWithPlaceholder item={item} type={item.media_type} />
                </div>
                
                {!editingId && (
                  <div className="bg-silk p-6 rounded-2xl mb-8 border border-stone-100 flex justify-between items-center group cursor-pointer hover:bg-white transition-all shadow-inner">
                    <div className="max-w-[75%]">
                      <p className="text-[10px] text-sand font-black uppercase tracking-[0.2em] mb-2">📸 Visual Narrative Control</p>
                      <p className="text-[13px] text-stone-500 italic font-serif leading-relaxed">" {item.prompt || 'Minimalist Japandi aesthetic, morning light.'} "</p>
                    </div>
                    <button 
                      onClick={() => alert('🔄 Aesthetic Reshoot Request Sent: The AI is re-synthesizing this scene.')}
                      className="text-sand border border-sand/30 bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-sand hover:text-white transition-all"
                    >
                      🔄 Reshoot
                    </button>
                  </div>
                )}

                <div className="flex gap-4">
                  {editingId === item.id ? (
                    <button 
                      onClick={() => saveEdit(item.id)}
                      disabled={actionLoading === item.id}
                      className="flex-1 bg-forest text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-2xl shadow-xl hover:bg-sand transition-all animate-pulse"
                    >
                      {actionLoading === item.id ? 'Securing Data...' : 'Confirm Edits'}
                    </button>
                  ) : (
                    <>
                      {item.status !== 'Approved' ? (
                        <button 
                          onClick={() => handleApprove(item.id)}
                          disabled={actionLoading === item.id}
                          className="flex-3 bg-silk text-forest border border-forest/20 font-black uppercase tracking-widest text-[11px] py-4 rounded-2xl hover:bg-forest hover:text-white transition-all shadow-sm"
                        >
                          {actionLoading === item.id ? 'Validating...' : 'Approve Media Strategy'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => alert('🚀 Schedule: This asset is primed. Deployment to Meta Ads Manager ready.')}
                          className="flex-3 bg-forest text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-2xl hover:bg-sand transition-all shadow-xl flex items-center justify-center gap-3"
                        >
                          🚀 Launch to Instagram
                        </button>
                      )}
                      <button 
                        onClick={() => startEditing(item)}
                        className="flex-1 bg-white border border-stone-200 text-stone-500 font-black uppercase tracking-widest text-[11px] py-4 rounded-2xl hover:bg-stone-50 transition-all font-bold"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-stone-100 h-fit sticky top-32">
             <div className="mb-8 pb-8 border-b border-stone-100">
                <h2 className="font-serif text-2xl text-forest italic mb-3">AI Content Concierge</h2>
                <p className="text-sm text-stone-500 leading-relaxed font-medium">Ask Gemini to analyze market trends or regenerate captions based on your tone of voice.</p>
             </div>
             
             <div className="bg-silk rounded-3xl p-6 h-[450px] flex flex-col justify-end border border-stone-50 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 p-6 overflow-y-auto no-scrollbar pb-24 font-medium">
                   <div className="bg-white text-forest text-[13px] leading-relaxed p-4 rounded-2xl rounded-bl-none w-4/5 mb-4 shadow-sm border border-stone-50">
                      Hola Meybell! I've synchronized your 30-day strategy. We have all high-res assets ready for launch. Simply "Approve" the narratives to lock the production.
                   </div>
                   <div className="bg-sand/10 border border-sand/20 text-sand text-[13px] leading-relaxed p-4 rounded-2xl rounded-br-none w-4/5 mb-4 ml-auto shadow-sm">
                      Muestra el plan para el Chlorophyll.
                   </div>
                </div>
                <div className="relative mt-auto">
                   <input 
                     type="text" 
                     placeholder="Message Gemini..." 
                     className="w-full px-5 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sand text-sm shadow-md"
                   />
                </div>
             </div>
             
             <div className="mt-10 p-6 bg-sand/5 rounded-[2.5rem] border border-sand/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-sand mb-3">System Health</p>
                <div className="flex gap-2 mb-4 items-center">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[11px] text-stone-500 font-black uppercase tracking-tighter">Teable Engine Online</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                  Approving a media strategy locks the draft and initiates the <b>Aesthetic Synthesis Engine</b>. High-fidelity renders propagate instantly.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
