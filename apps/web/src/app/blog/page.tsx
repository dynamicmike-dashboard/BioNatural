'use client';

import React from 'react';
import Link from 'next/link';

// Mock data for the blog listing
const posts = [
  {
    slug: 'el-poder-del-magnesio',
    title: 'El Poder del Magnesio: Tu Aliado para el Bienestar Tropical',
    excerpt: 'Descubre por qué el magnesio es fundamental para mantener el equilibrio en climas cálidos...',
    image: 'https://images.unsplash.com/photo-1611073229767-172901a88481?auto=format&fit=crop&q=80&w=800',
    date: '10 de Abril, 2026',
    category: 'Nutrición'
  },
  {
    slug: 'receta-smoothie-organico',
    title: 'Smoothie Orgánico de Playa: Receta Detox',
    excerpt: 'Una combinación perfecta de frutas locales y superfoods para empezar tu día con energía...',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=800',
    date: '8 de Abril, 2026',
    category: 'Recetas'
  },
  {
    slug: 'vida-sustentable-en-el-caribe',
    title: '5 Pasos para una Vida Más Sustentable en el Caribe',
    excerpt: 'Pequeños cambios en tu rutina diaria que pueden tener un gran impacto en nuestro ecosistema...',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800',
    date: '5 de Abril, 2026',
    category: 'Estilo de Vida'
  }
];

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-50 py-24 px-6 border-b border-stone-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-600 font-bold tracking-widest uppercase text-xs">Bienestar Interior</span>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mt-4 mb-6 font-serif">BioNatural Blog</h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Explora artículos sobre nutrición, estilo de vida sustentable y bienestar integral en el corazón del Caribe Mexicano.
          </p>
        </div>
      </div>

      {/* Featured Post (Visual only for now) */}
      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-700 hover:shadow-green-100/50">
          <img 
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt="Wellness Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">Destacado</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 max-w-3xl leading-tight">La Guía Definitiva de Superfoods para la Temporada de Calor</h2>
            <p className="text-stone-300 max-w-xl text-lg mb-6 line-clamp-2">Aprende qué alimentos te mantendrán hidratado y lleno de energía durante los meses más cálidos en Playa del Carmen.</p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-stone-100 border-2 border-green-600 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Bio+Natural&background=5a774b&color=fff" alt="Author" />
              </div>
              <div>
                <p className="font-bold text-sm">Equipo BioNatural</p>
                <p className="text-stone-400 text-xs">Lectura de 8 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Listing */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12 border-b border-stone-100 pb-8">
          <h3 className="text-2xl font-bold text-stone-900 font-serif">Últimos Artículos</h3>
          <div className="flex space-x-6 text-sm">
            <button className="text-green-600 font-bold border-b-2 border-green-600 pb-1">Todos</button>
            <button className="text-stone-400 hover:text-stone-900 transition-colors">Nutrición</button>
            <button className="text-stone-400 hover:text-stone-900 transition-colors">Recetas</button>
            <button className="text-stone-400 hover:text-stone-900 transition-colors">Sustentabilidad</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="space-y-4">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={post.image} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={post.title}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-widest font-bold">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 group-hover:text-green-700 transition-colors font-serif leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-stone-50 text-sm leading-relaxed line-clamp-3 text-stone-600">
                    {post.excerpt}
                  </p>
                  <div className="pt-2 flex items-center text-green-700 text-sm font-bold group-hover:translate-x-2 transition-transform">
                    Leer más 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter Callout */}
        <div className="mt-32 bg-stone-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-900/40 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800/40 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">Suscríbete a nuestra dosis semanal de bienestar</h2>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed font-light">Recibe consejos de salud, recetas exclusivas y acceso anticipado a nuestras promociones directamente en tu bandeja de entrada.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Tu email aquí..." 
                className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-white placeholder-stone-500"
              />
              <button className="px-12 py-5 bg-white text-stone-900 rounded-2xl font-bold hover:bg-stone-100 transition-all transform active:scale-95 shadow-xl shadow-black/20">
                Suscribirme
              </button>
            </form>
            <p className="mt-6 text-stone-500 text-xs">Respetamos tu privacidad. Puedes darte de baja en cualquier momento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
