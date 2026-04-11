import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ lang?: string }>
}) {
  const { slug } = await params;
  const { lang = "en" } = await searchParams;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
     return notFound();
  }
  
  const title = post[`title_${lang}`] || post.title_en;
  const content = post[`content_${lang}`] || post.content_en;
  const excerpt = post[`excerpt_${lang}`] || post.excerpt_en;

  return (
    <div className="flex flex-col min-h-screen">
      <article className="flex-1 bg-white">
        {/* Hero Section */}
        <header className="relative py-24 md:py-32 px-6 bg-stone-50 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-stone-900 to-green-600" />
          <div className="max-w-4xl mx-auto relative z-10">
            <Link href={`/blog?lang=${lang}`} className="inline-flex items-center text-green-700 text-sm font-bold mb-8 hover:translate-x-[-4px] transition-transform">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {lang === "en" ? "Back to Blog" : "Volver al Blog"}
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-xs font-bold tracking-widest uppercase text-stone-400">
                <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full">{post.category}</span>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX')}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-stone-900 font-display leading-[1.05] tracking-tight">
                {title}
              </h1>
              
              <p className="text-xl md:text-2xl text-stone-600 font-medium leading-relaxed max-w-3xl border-l-4 border-primary pl-6">
                {excerpt}
              </p>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {post.image_url && (
          <div className="max-w-5xl mx-auto px-6 -mt-16 md:-mt-24 mb-16 md:mb-24">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-900/10 aspect-[21/9] relative">
              <img 
                src={post.image_url} 
                className="w-full h-full object-cover"
                alt={title}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 pb-24">
          <div 
            className="prose prose-stone prose-lg md:prose-xl max-w-none text-stone-700 leading-relaxed font-normal"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
      <Footer lang={lang} />
    </div>
  );
}
