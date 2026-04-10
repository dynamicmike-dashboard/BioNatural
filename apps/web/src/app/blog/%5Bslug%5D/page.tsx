import React from 'react';
import Link from 'next/link';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // In a real app, we would fetch the post from Supabase using the slug
  // For now, we show a premium template
  
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative py-24 md:py-32 px-6 bg-stone-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-stone-900 to-green-600" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/blog" className="inline-flex items-center text-green-700 text-sm font-bold mb-8 hover:translate-x-[-4px] transition-transform">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Blog
          </Link>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-xs font-bold tracking-widest uppercase text-stone-400">
              <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full">Nutrición</span>
              <span>•</span>
              <span>Lectura de 8 min</span>
              <span>•</span>
              <span>10 de Abril, 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 font-serif leading-[1.15]">
              El Poder del Magnesio: Tu Aliado para el Bienestar Tropical
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed max-w-3xl border-l-4 border-green-600 pl-6">
              Descubre por qué el magnesio es fundamental para mantener el equilibrio en climas cálidos y cómo puede transformar tu sueño y niveles de energía.
            </p>
          </div>
        </div>
      </header>

      {/* Main Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-16 md:-mt-24 mb-16 md:mb-24">
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10">
          <img 
            src="https://images.unsplash.com/photo-1611073229767-172901a88481?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-auto"
            alt="Magnesium Crystals"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-stone prose-lg md:prose-xl max-w-none text-stone-700 leading-relaxed font-light">
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-stone-900 first-letter:mr-3 first-letter:float-left first-letter:font-serif">
            Vivir en el trópico es un privilegio, pero las altas temperaturas y la humedad constante exigen un cuidado especial de nuestro equilibrio electrolítico. Entre todos los minerales esenciales, el magnesio destaca como el maestro director de más de 300 funciones bioquímicas en nuestro cuerpo.
          </p>
          
          <h2 className="text-3xl font-bold text-stone-900 font-serif mt-12 mb-6 tracking-tight">¿Por qué lo necesitamos más en Playa del Carmen?</h2>
          
          <p>
            Cuando sudamos profusamente debido al calor del Caribe, no solo perdemos agua; también expulsamos minerales vitales. El magnesio es uno de los primeros en agotarse, lo que puede provocar fatiga, irritabilidad y calambres musculares que a menudo confundimos con simple agotamiento por el sol.
          </p>

          <blockquote className="bg-stone-50 border-stone-200 border-2 rounded-3xl p-8 my-12 italic text-stone-600 text-center font-serif leading-relaxed">
            "El magnesio no es solo un suplemento; es el combustible invisible que mantiene encendida la chispa de nuestra calma interior en un mundo siempre en movimiento."
          </blockquote>

          <h3 className="text-2xl font-bold text-stone-900 font-serif mt-12 mb-6">Beneficios Clave:</h3>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex items-start space-x-4">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs mt-1">1</span>
              <span><strong>Relajación Muscular:</strong> Ideal para recuperarse después de un día de surf, paddle o simplemente caminar por la Quinta Avenida.</span>
            </li>
            <li className="flex items-start space-x-4">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs mt-1">2</span>
              <span><strong>Calidad del Sueño:</strong> Ayuda a entrar en un estado de reposo profundo, contrarrestando el insomnio ligero provocado por el calor.</span>
            </li>
            <li className="flex items-start space-x-4">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs mt-1">3</span>
              <span><strong>Gestión del Estrés:</strong> Regula el cortisol, permitiéndote disfrutar de la paz caribeña sin importar el ritmo diario.</span>
            </li>
          </ul>

          <div className="my-16 p-8 bg-green-900 rounded-3xl text-white">
            <h4 className="text-2xl font-bold font-serif mb-4">Encuéntralo en BioNatural</h4>
            <p className="text-green-100 mb-6">En nuestra tienda contamos con las versiones más bio-disponibles de Magnesio (Citrato y Glicinato) para asegurar que tu cuerpo lo absorba eficientemente.</p>
            <Link href="/tienda" className="inline-block px-8 py-3 bg-white text-green-900 rounded-xl font-bold hover:bg-stone-100 transition-colors">
              Ver Suplementos
            </Link>
          </div>

          <p>
            En conclusión, asegurar niveles óptimos de este "mineral milagroso" es uno de los pasos más sencillos pero potentes que puedes dar hacia tu salud integral. En Playa del Carmen, no es opcional; es parte de vivir en balance.
          </p>
        </div>

        {/* Footer of Post */}
        <div className="mt-24 pt-12 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-full bg-stone-100 border-2 border-green-600 overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Bio+Natural&background=5a774b&color=fff" alt="Author" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">Escrito por el Equipo BioNatural</p>
              <p className="text-xs text-stone-500">Expertos en Nutrición y Bienestar Consciente</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="p-3 bg-stone-50 rounded-full text-stone-400 hover:text-stone-900 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
            <button className="p-3 bg-stone-50 rounded-full text-stone-400 hover:text-stone-900 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608.975-.975 2.242-1.25 3.608-1.312 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.337-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
