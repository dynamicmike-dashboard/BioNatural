import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Footer from "@/components/Footer";

export default async function RestaurantePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang = "en" } = await searchParams;
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("master_inventory")
    .select("*")
    .eq("is_restaurant_item", true);

  const categories = lang === "en" 
    ? [
        { id: 'Desayunos', label: 'Breakfast' },
        { id: 'Tacos Veganos', label: 'Vegan Tacos' },
        { id: 'Juice Bar', label: 'Juice Bar' },
        { id: 'Bowls', label: 'Bowls' }
      ]
    : [
        { id: 'Desayunos', label: 'Desayunos' },
        { id: 'Tacos Veganos', label: 'Tacos Veganos' },
        { id: 'Juice Bar', label: 'Juice Bar' },
        { id: 'Bowls', label: 'Bowls' }
      ];

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
        {categories.map((cat) => {
          const categoryItems = items?.filter(item => item.category === cat.id) || [];
          
          return (
            <section key={cat.id} className="space-y-12">
              <div className="flex items-center gap-6">
                <h2 className="text-4xl font-display font-black tracking-tighter text-stone-900">{cat.label}</h2>
                <div className="h-px flex-1 bg-stone-100" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {(categoryItems.length > 0 ? categoryItems : []).map((item: any, i) => {
                  const dishName = item[`name_${lang}`] || item.name || "Signature Dish";
                  const waMessage = encodeURIComponent(lang === "en" 
                    ? `Hi! I'd like to order the ${dishName} from the Restaurant menu.` 
                    : `¡Hola! Me gustaría ordenar el ${dishName} del menú del Restaurante.`);
                  const waLink = `https://wa.me/529841473181?text=${waMessage}`;

                  return (
                    <Link 
                      key={item.odoo_id || i} 
                      href={`/tienda/producto/${item.odoo_id}?lang=${lang}`}
                      className="group flex flex-col gap-6 relative transition-all"
                    >
                        <div className="aspect-[4/3] rounded-[2.5rem] bg-muted/30 overflow-hidden relative border border-transparent group-hover:border-foreground/5 group-hover:shadow-2xl transition-all duration-500">
                          {item.image_url ? (
                              <img src={item.image_url} alt={dishName} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center text-foreground/10 font-display font-black text-xl">
                                {lang === "en" ? "PENDING" : "PENDIENTE"}
                              </div>
                          )}
                          <div className="absolute top-4 right-4 glass-morphism px-4 py-2 rounded-2xl">
                              <span className="text-xs font-black text-primary">${item.price || "---"}</span>
                          </div>
                          {/* Animated Plus overlay */}
                          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                             </div>
                          </div>
                        </div>
                        <div className="space-y-3 px-2">
                          <h4 className="font-display font-black text-2xl text-foreground group-hover:text-primary transition-colors">
                              {dishName}
                          </h4>
                          <p className="text-foreground/50 font-medium leading-relaxed line-clamp-2">
                              {item[`description_${lang}`] || item.description || (lang === "en" ? "Freshly sourced local ingredients prepared with artisanal care." : "Ingredientes locales frescos preparados con cuidado artesanal.")}
                          </p>
                          <div className="pt-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">{lang === "en" ? "Chef's Selection" : "Selección del Chef"}</span>
                          </div>
                        </div>
                    </Link>
                  );
                })}
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
            {lang === "en" ? "Secure your table instantly via our concierge for our Playa del Carmen locations." : "Reserva tu mesa al instante vía conserje para nuestras ubicaciones en Playa del Carmen."}
          </p>
          <a 
            href="https://wa.me/529841473181?text=Hola!%20Quisiera%20reservar%20una%20mesa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-16 py-6 bg-primary text-white rounded-[2.5rem] font-bold text-xl hover:scale-105 transition-all shadow-2xl shadow-primary/40 active:translate-y-1 relative z-10"
          >
            {lang === "en" ? "Book via WhatsApp" : "Reservar vía WhatsApp"}
          </a>
        </div>
      </section>
      <Footer lang={lang} />
    </div>
  );
}
