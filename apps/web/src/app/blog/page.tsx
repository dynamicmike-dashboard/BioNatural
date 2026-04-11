import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Footer from '@/components/Footer';

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang = "en" } = await searchParams;
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-50 py-24 px-6 border-b border-stone-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">
            {lang === "en" ? "Universal Wellness" : "Bienestar Universal"}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-stone-900 mt-4 mb-6 font-display tracking-tight leading-none">
            {lang === "en" ? "BioNatural Blog" : "Blog BioNatural"}
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
            {lang === "en" 
              ? "Expert insights on nutrition, sustainable living, and holistic wellness in the Mexican Caribbean." 
              : "Consejos expertos sobre nutrición, vida sustentable y bienestar holístico en el Caribe Mexicano."}
          </p>
        </div>
      </div>

      {/* Grid Listing */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12 border-b border-stone-100 pb-8">
          <h3 className="text-2xl font-black text-stone-900 font-display uppercase tracking-tight">
            {lang === "en" ? "Latest Articles" : "Últimos Artículos"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts?.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}?lang=${lang}`} className="group">
              <article className="space-y-4">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-stone-100">
                  <img 
                    src={post.image_url || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={post[`title_${lang}`] || post.title_en}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-widest font-bold">
                    <span>{post.category}</span>
                    <span>{new Date(post.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX')}</span>
                  </div>
                  <h4 className="text-2xl font-black text-stone-900 group-hover:text-primary transition-colors font-display leading-tight tracking-tight">
                    {post[`title_${lang}`] || post.title_en}
                  </h4>
                  <p className="text-sm leading-relaxed line-clamp-3 text-stone-500 font-medium">
                    {post[`excerpt_${lang}`] || post.excerpt_en}
                  </p>
                  <div className="pt-2 flex items-center text-primary text-sm font-black group-hover:translate-x-2 transition-transform">
                    {lang === "en" ? "Read more" : "Leer más"}
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
            <h2 className="text-3xl md:text-5xl font-black font-display mb-6 leading-tight tracking-tight">
               {lang === "en" ? "Join our conscious community" : "Únete a nuestra comunidad consciente"}
            </h2>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed font-medium">
               {lang === "en" 
                ? "Weekly health hacks, secret recipes, and early access to our seasonal superfood launches." 
                : "Hacks semanales de salud, recetas secretas y acceso anticipado a nuestros lanzamientos de superfoods."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Email..." 
                className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white placeholder-stone-500"
              />
              <button className="px-12 py-5 bg-white text-stone-900 rounded-2xl font-black hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-xl shadow-black/20">
                {lang === "en" ? "Subscribe" : "Suscribirme"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}

