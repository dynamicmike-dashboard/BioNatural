import React from 'react';

export default function Profile({ lang }: { lang: 'en' | 'es' }) {
  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto min-h-screen">
      <div className="glass-card p-12 rounded-[3rem] text-center">
        <div className="w-32 h-32 rounded-full bg-emerald-100 mx-auto mb-8 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
          <img alt="User profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqYsWsuLVcuNwBAQ3CbTi1WUjnhVaLK24NIlO3vO3MbsEglSe6YtFJB-oNv_OtJzDuUMxuZJS2ObIe1Agd1YBjaiutTPWnCXXLwZ_sieIemkprzPjaBYo8h-6hpTKpOea4Z-VloAoZc6zxJb26ffJLScRYSJWzJDjt8z0x_ZfGqYn9YPigWKpxD-eWeRSpuZHHYIzl2B2VhcW3zQtVwgvxW78bCeWhHNJQRNT-ii98igQdNB5A0__Zo_lJ8To68KVRPL_zeyefpLg" />
        </div>
        <h2 className="text-3xl font-extrabold font-headline text-emerald-900 mb-2">Dynamic Mike</h2>
        <p className="text-emerald-800/60 mb-12">dynamicmike@gmail.com</p>
        
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-white/40 p-6 rounded-2xl border border-white/20">
            <span className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest block mb-1">
              {lang === 'en' ? 'Orders' : 'Pedidos'}
            </span>
            <span className="text-2xl font-bold text-emerald-900">12</span>
          </div>
          <div className="bg-white/40 p-6 rounded-2xl border border-white/20">
            <span className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest block mb-1">
              {lang === 'en' ? 'Favorites' : 'Favoritos'}
            </span>
            <span className="text-2xl font-bold text-emerald-900">45</span>
          </div>
        </div>
      </div>
    </div>
  );
}
