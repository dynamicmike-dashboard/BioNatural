import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    .from("Master_Inventory")
    .select("*")
    .eq("Odoo_ID", id)
    .single();

  if (!product || error) {
    notFound();
  }

  const name = product[`name_${lang.toLowerCase()}`] || product.name_en;
  const description = product[`description_${lang.toLowerCase()}`] || product.description_en;
  const seoTag = product.seo_stealth_tag;

  return (
    <article className="max-w-7xl mx-auto p-8 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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

          {/* Key Benefits - New Section */}
          {product.benefits_en && product.benefits_en.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product[`benefits_${lang.toLowerCase()}`]?.map((benefit: string, index: number) => (
                <div key={index} className="flex items-center gap-3 bg-[#F9FBE7] p-4 rounded-2xl border border-[#DCEDC8]">
                  <div className="w-2 h-2 rounded-full bg-[#8BC34A]" />
                  <p className="text-sm font-bold text-[#33691E]">{benefit}</p>
                </div>
              ))}
            </div>
          )}

          <div className="prose prose-lg text-gray-600 font-medium leading-relaxed max-w-none border-t border-gray-100 pt-8">
            <p className="whitespace-pre-line">{description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button className="flex-2 px-10 py-6 bg-[#2E7D32] text-white rounded-[28px] font-black text-xl hover:bg-[#1B5E20] transition-all transform shadow-2xl shadow-[#2E7D32]/30 active:scale-95">
                {lang === "en" ? "Proceed to Checkout" : "Continuar al Pago"}
             </button>
             <button className="px-10 py-6 bg-white text-[#2E7D32] border-4 border-[#F1F8E9] rounded-[28px] font-black text-xl hover:bg-[#F1F8E9] transition-all">
                {lang === "en" ? "Add to Cart" : "Agregar"}
             </button>
          </div>

          <footer className="pt-8 border-t border-gray-50">
             <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Free Local Delivery</span>
                <span>•</span>
                <span>Secure Checkout</span>
                <span>•</span>
                <span>BioNatural Quality</span>
             </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
