import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang = "en" } = await searchParams;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("master_inventory")
    .select("*")
    .eq("odoo_id", id)
    .single();

  if (!product || error) {
    notFound();
  }

  const name = product[`name_${lang.toLowerCase()}`] || product.name_en;
  const description = product[`description_${lang.toLowerCase()}`] || product.description_en;
  const seoTag = product.seo_stealth_tag;

  // Semantic Recommendations Logic
  const clusters: Record<string, string[]> = {
    'Stress & Sleep': ['BN-004', 'BN-006', 'BN-008', 'BN-009', 'BN-053'],
    'Detox & Gut': ['BN-001', 'BN-015', 'BN-025', 'BN-026', 'BN-028', 'BN-029'],
    'Energy & Focus': ['BN-002', 'BN-007', 'BN-013', 'BN-044', 'BN-056']
  };

  const currentCluster = Object.values(clusters).find(c => c.includes(product.odoo_id)) || [];
  const relatedIds = currentCluster.filter(id => id !== product.odoo_id).slice(0, 3);

  const { data: relatedProducts } = await supabase
    .from("master_inventory")
    .select("*")
    .in("odoo_id", relatedIds);

  return (
    <article className="max-w-7xl mx-auto p-8 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ... existing product detail content ... */}
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-[40px] overflow-hidden relative shadow-2xl border border-gray-100 group transition-transform hover:scale-[1.01]">
            {product.image_url ? (
              <Image 
                src={product.image_url} 
                alt={`${name} - BioNatural Organic Store`} 
                fill 
                className="object-contain p-12 transition-all group-hover:p-8"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-2xl italic">No Image Available</div>
            )}
            {/* Wellness Badge */}
            <div className="absolute top-8 left-8 bg-[#8BC34A]/20 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-sm border border-white/30 text-[#2E7D32] font-black uppercase text-[10px] tracking-[0.2em]">
              Premium BioNatural
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-10">
          <header className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F1F8E9] text-[#2E7D32] rounded-full text-xs font-black uppercase tracking-wider">
                {product.category || "Organic Selection"}
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-[#1B5E20] tracking-tighter leading-[0.85]">
                {name}
             </h1>
             {seoTag && (
               <p className="text-[#8BC34A] font-bold text-sm uppercase tracking-widest bg-[#F1F8E9]/50 inline-block px-4 py-1 rounded-lg">
                 {seoTag}
               </p>
             )}
             <div className="flex items-center gap-3 pt-4">
                <span className="text-4xl font-black text-[#2E7D32]">${product.price}</span>
                <span className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">{product.currency || "MXN"}</span>
             </div>
          </header>

          <div className="prose prose-lg text-gray-600 font-medium leading-relaxed max-w-none border-t border-gray-100 pt-8">
            <p className="whitespace-pre-line">{description}</p>
          </div>

          {/* Action Buttons */}
          <ProductActions product={product} lang={lang} />
        </div>
      </div>

      {/* Semantic Recommendations - The SEOLLM Hub */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-24 pt-24 border-t-4 border-[#F1F8E9]">
          <h2 className="text-4xl font-black text-[#1B5E20] tracking-tighter mb-12">Complete Your Wellness</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel: any) => (
              <Link 
                key={rel.odoo_id}
                href={`/tienda/producto/${rel.odoo_id}?lang=${lang}`}
                className="group p-6 bg-white rounded-[40px] border border-gray-100 hover:border-[#8BC34A] transition-all shadow-xl hover:shadow-2xl hover:shadow-[#8BC34A]/10"
              >
                <div className="aspect-square bg-[#F9FBE7] rounded-[30px] mb-6 relative overflow-hidden">
                  {rel.image_url ? (
                    <Image src={rel.image_url} alt={rel.name_en} fill className="object-contain p-8 group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8BC34A] font-black">BioNatural</div>
                  )}
                </div>
                <h3 className="text-xl font-black text-[#1B5E20] group-hover:text-[#2E7D32]">{rel[`name_${lang.toLowerCase()}`] || rel.name_en}</h3>
                <p className="text-sm font-bold text-[#8BC34A] mt-2 uppercase tracking-widest">{rel.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {/* AEO / JSON-LD Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": name,
            "description": description,
            "brand": { "@type": "Brand", "name": "BioNatural" },
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": product.currency || "MXN",
              "availability": product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "isRelatedTo": relatedProducts?.map(rel => ({
              "@type": "Product",
              "name": rel.name_en,
              "url": `https://bio-natural.vercel.app/tienda/producto/${rel.odoo_id}`
            }))
          })
        }}
      />
    </article>
  );
}
