import { createClient } from "@/lib/supabase/server";

export default async function RestaurantePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang = "en" } = await searchParams;
  const supabase = await createClient();

  const { data: menuItems, error } = await supabase
    .from("Master_Inventory")
    .select("*")
    .eq("is_restaurant_item", true);

  const categories = ['Desayunos', 'Tacos Veganos', 'Juice Bar', 'Bowls'];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-24">
      <header className="space-y-8 text-center max-w-4xl mx-auto animate-fade-in">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em]">
           {lang === "en" ? "Gourmet Health Kitchen" : "Cocina de Salud Gourmet"}
        </span>
        <h1 className="text-6xl md:text-8xl font-display font-black text-foreground leading-[0.8] tracking-tighter">
          {lang === "en" ? "BioNatural Menu" : "Menú BioNatural"}
        </h1>
        <p className="text-xl text-foreground/50 font-medium leading-relaxed max-w-2xl mx-auto">
          {lang === "en" 
            ? "From PDC's most famous vegan tacos to high-protein superfood bowls. Every dish is a tribute to health and local flavor." 
            : "Desde los famosos tacos veganos de PDC hasta bowls de superalimentos. Cada plato es un tributo a la salud y el sabor local."}
        </p>
      </header>

      {/* Menu Sections */}
      <div className="space-y-32">
        {categories.map((category, idx) => {
          const items = menuItems?.filter(i => i.category === category) || [];
          
          return (
            <section key={category} className={`space-y-12 animate-fade-in`} style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="flex items-center gap-8">
                <h2 className="text-4xl md:text-5xl font-display font-black text-foreground tracking-tighter">{category}</h2>
                <div className="flex-1 h-px bg-foreground/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {(items.length > 0 ? items : [1, 2, 3]).map((item: any, i) => (
                   <div key={item.Odoo_ID || i} className="group flex flex-col gap-6 relative">
                      <div className="aspect-[4/3] rounded-[2.5rem] bg-muted/30 overflow-hidden relative border border-transparent group-hover:border-foreground/5 group-hover:shadow-2xl transition-all duration-500">
                         {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-foreground/10 font-display font-black text-xl">
                               PENDING
                            </div>
                         )}
                         <div className="absolute top-4 right-4 glass-morphism px-4 py-2 rounded-2xl">
                            <span className="text-xs font-black text-primary">${item.price || "---"}</span>
                         </div>
                      </div>
                      <div className="space-y-3 px-2">
                         <h3 className="font-display font-black text-2xl text-foreground group-hover:text-primary transition-colors">
                            {item[`name_${lang}`] || item.name || "Signature Dish Name"}
                         </h3>
                         <p className="text-foreground/50 font-medium leading-relaxed line-clamp-2">
                            {item[`description_${lang}`] || item.description || "Freshly sourced local ingredients prepared with artisanal care."}
                         </p>
                         <div className="pt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Chef's Selection</span>
                         </div>
                      </div>
                   </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Reservations CTA */}
      <section className="animate-fade-in delay-700">
        <div className="bg-foreground text-background rounded-[4rem] p-12 md:p-24 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
          {/* Accent Blobs */}
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#f5df4d]/20 rounded-full blur-[100px]" />

          <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none max-w-2xl relative z-10">
            {lang === "en" ? "Planning a visit to the restaurant?" : "¿Planeas una visita al restaurante?"}
          </h3>
          <p className="text-xl text-background/60 font-medium max-w-sm relative z-10">
            Secure your table instantly via our AI-powered concierge for PDC or Tulum.
          </p>
          <button className="px-16 py-6 bg-primary text-white rounded-[2.5rem] font-bold text-xl hover:scale-105 transition-all shadow-2xl shadow-primary/40 active:translate-y-1 relative z-10">
            {lang === "en" ? "Book via WhatsApp" : "Reservar vía WhatsApp"}
          </button>
        </div>
      </section>
    </div>
  );
}
