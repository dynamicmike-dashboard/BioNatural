import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; category?: string }>;
}) {
  const { lang = "en", category } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("master_inventory").select("*");
  if (category) query = query.eq("category", category);

  const { data: products, error } = await query;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-16">
      <header className="space-y-6 max-w-3xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] animate-fade-in">
           {lang === "en" ? "Exclusive Wellness Directory" : "Directorio de Bienestar Exclusivo"}
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-black text-foreground tracking-tighter leading-[0.9]">
          {lang === "en" ? "Organic Superstore" : "Tienda Orgánica"}
        </h1>
        <p className="text-xl text-foreground/60 font-medium leading-relaxed">
          {lang === "en" 
            ? "Curated high-protein supplements, bulk superfoods, and holistic essentials delivered to your door." 
            : "Suplementos premium seleccionados, superalimentos y esenciales holísticos entregados a tu puerta."}
        </p>
      </header>

      {/* Categories Filter - Visual Mockup */}
      <div className="flex flex-wrap gap-4 border-b border-foreground/5 pb-8">
        {(lang === 'en' ? ['All', 'Supplements', 'Superfoods', 'Bakery', 'CBD'] : ['Todos', 'Suplementos', 'Superalimentos', 'Panadería', 'CBD']).map((cat) => (
          <button key={cat} className="px-6 py-2 rounded-full border border-foreground/10 text-sm font-bold hover:border-primary hover:text-primary transition-all active:scale-95">
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products?.map((product: any) => (
          <Link 
            key={product.Odoo_ID} 
            href={`/tienda/producto/${product.Odoo_ID}?lang=${lang}`}
            className="group relative bg-muted/30 rounded-[2.5rem] p-4 transition-all hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-transparent hover:border-foreground/5"
          >
            <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden bg-white mb-6">
              {product.image_url ? (
                 <Image 
                    src={product.image_url} 
                    alt={product[`name_${lang}`] || product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-foreground/20 font-display font-black text-2xl p-12 text-center">
                  <span className="opacity-10 mb-4 block">BioNatural</span>
                  {lang === "en" ? "IMAGE PENDING" : "IMAGEN PENDIENTE"}
                </div>
              )}
              
              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 glass-morphism px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/80 z-10 backdrop-blur-md">
                {product.category || "Premium"}
              </div>
            </div>

            <div className="px-4 pb-4 space-y-4">
              <div className="space-y-1">
                 <h3 className="font-display font-black text-xl text-foreground leading-tight tracking-tight line-clamp-1">
                   {product[`name_${lang}`] || product.name}
                 </h3>
                 <p className="text-sm text-foreground/40 line-clamp-2 font-medium leading-relaxed">
                   {product[`description_${lang}`] || product.description || (lang === "en" ? "Holistic wellness support crafted for local residents." : "Apoyo de bienestar holístico creado para residentes locales.") }
                 </p>
              </div>

              <div className="flex items-end justify-between pt-2">
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-foreground/30 uppercase tracking-widest">{lang === "en" ? "Price" : "Precio"}</span>
                   <span className="text-2xl font-display font-black text-primary">${product.price}</span>
                </div>
                <div className="bg-foreground text-background w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110 active:scale-90 shadow-xl shadow-black/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {error && (
        <div className="bg-red-50/50 border border-red-100 p-12 rounded-[32px] text-center space-y-4">
           <p className="text-red-500 font-black text-2xl tracking-tight">System Connection Offline</p>
           <p className="text-red-900/40 font-medium">{error.message}</p>
        </div>
      )}

      {products?.length === 0 && !error && (
        <div className="bg-muted/30 p-24 rounded-[3.5rem] text-center border-2 border-dashed border-foreground/5 space-y-8 animate-fade-in">
           <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <span className="text-4xl animate-bounce">📦</span>
           </div>
           <div className="space-y-4">
              <h2 className="text-3xl font-display font-black tracking-tight">Inventory Pending Sync</h2>
              <p className="font-medium text-foreground/40 max-w-sm mx-auto leading-relaxed">Your Universal Alpha directory is initialized. Run the n8n sync to populate with your 2,000+ items.</p>
           </div>
           <div className="pt-8">
              <button className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                Trigger Manual Sync
              </button>
           </div>
        </div>
      )}
      <Footer lang={lang} />
    </div>
  );
}
