import React from 'react';

export default function Explore({ lang }: { lang: 'en' | 'es' }) {
  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-extrabold font-headline text-emerald-900 mb-8">
        {lang === 'en' ? 'Explore Our Conservatory' : 'Explora Nuestro Conservatorio'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-3xl h-64 flex items-center justify-center text-emerald-800/40 italic">
          {lang === 'en' ? 'Botanical Collections Coming Soon' : 'Colecciones Botánicas Próximamente'}
        </div>
        <div className="glass-card p-8 rounded-3xl h-64 flex items-center justify-center text-emerald-800/40 italic">
          {lang === 'en' ? 'Seasonal Harvest Maps' : 'Mapas de Cosecha Estacional'}
        </div>
        <div className="glass-card p-8 rounded-3xl h-64 flex items-center justify-center text-emerald-800/40 italic">
          {lang === 'en' ? 'Virtual Tours' : 'Recorridos Virtuales'}
        </div>
      </div>
    </div>
  );
}
