import React from 'react';

export default function Library({ lang }: { lang: 'en' | 'es' }) {
  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-extrabold font-headline text-emerald-900 mb-8">
        {lang === 'en' ? 'Botanical Library' : 'Biblioteca Botánica'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 text-emerald-800">
            {lang === 'en' ? 'Research Papers' : 'Documentos de Investigación'}
          </h3>
          <p className="text-emerald-800/60">
            {lang === 'en' ? 'Access our latest studies on organic soil health and nutrient density.' : 'Acceda a nuestros últimos estudios sobre la salud del suelo orgánico y la densidad de nutrientes.'}
          </p>
        </div>
        <div className="glass-card p-10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 text-emerald-800">
            {lang === 'en' ? 'Chef\'s Recipes' : 'Recetas del Chef'}
          </h3>
          <p className="text-emerald-800/60">
            {lang === 'en' ? 'A curated collection of botanical culinary arts.' : 'Una colección curada de artes culinarias botánicas.'}
          </p>
        </div>
      </div>
    </div>
  );
}
