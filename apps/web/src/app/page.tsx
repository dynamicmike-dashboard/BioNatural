import Link from "next/link";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import Footer from "@/components/Footer";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang = "en" } = await searchParams;
  const t = lang === "en" ? en.common : es.common;

  const locations = [
    { name: "Sucursal Constituyentes", slug: "pdc-10", status: "Open Now", address: "Ave. 10 entre Constituyentes y 16 Nte." },
    { name: "Sucursal Quinta Avenida", slug: "pdc-5ta", status: "Open Now", address: "5ta. Avenida, entre 40 y 42 Nte." },
  ];

  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-white pt-24">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[100vh] -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f5df4d]/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-24 md:py-40 flex flex-col items-center text-center space-y-12">
        <div className="space-y-6 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em]">
            {lang === "en" ? "Playa del Carmen · The Heart of Wellness" : "Playa del Carmen · El Corazón del Bienestar"}
          </span>
          <h1 className="text-6xl md:text-9xl font-display font-black text-foreground leading-[0.85] tracking-tighter max-w-5xl mx-auto">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-2xl mx-auto font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 animate-fade-in delay-200">
          <Link 
            href={`/tienda?lang=${lang}`}
            className="px-12 py-6 bg-foreground text-background rounded-[2.5rem] font-black text-xl hover:bg-primary hover:scale-105 transition-all shadow-2xl shadow-black/10 active:translate-y-1"
          >
            {t.hero.cta}
          </Link>
          <Link 
            href={`/restaurante?lang=${lang}`}
            className="px-12 py-6 glass-morphism border border-foreground/10 text-foreground rounded-[2.5rem] font-black text-xl hover:bg-white hover:scale-105 transition-all active:translate-y-1"
          >
            {lang === "en" ? "Explore Menu" : "Ver Menú"}
          </Link>
        </div>

        {/* Location Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl pt-32 animate-fade-in delay-500 text-left">
          {locations.map((loc) => (
            <div key={loc.name} className="group p-8 rounded-[2.5rem] bg-muted/30 border border-transparent hover:border-foreground/5 transition-all hover:bg-white hover:shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">{loc.status}</span>
              <h3 className="text-3xl font-display font-black tracking-tight mb-2">{loc.name}</h3>
              <p className="text-sm text-foreground/40 font-bold mb-4">{loc.address}</p>
              <p className="text-sm text-foreground/60 font-medium leading-relaxed mb-6">
                {lang === "en" ? "Experience BioNatural's holistic synergy at our premier location." : "Vive la sinergia holística de BioNatural en nuestra ubicación principal."}
              </p>
              <div className="w-12 h-1 bg-foreground/5 rounded-full group-hover:bg-primary group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Promotions Section */}
        <div className="w-full pt-40 animate-fade-in delay-700">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter">Daily Perks & Promos</h2>
            <Link href={`/promociones?lang=${lang}`} className="text-primary font-bold hover:underline flex items-center gap-2">
              View All <span className="text-xl">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Early Bird", desc: "Free coffee before 11am", tag: "EVERYDAY" },
              { title: "Hard Kombucha", desc: "2x250 Cocktails 5pm-10pm", tag: "HAPPY HOUR" },
              { title: "Pure Essence", desc: "Discounts up to 20% off", tag: "TUESDAYS" }
            ].map((promo, idx) => (
              <div key={idx} className="glass-morphism p-10 rounded-[3rem] border border-foreground/5 space-y-6 hover:border-primary/20 transition-all group">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest">{promo.tag}</span>
                <h4 className="text-3xl font-display font-black tracking-tight">{promo.title}</h4>
                <p className="text-foreground/50 font-medium leading-relaxed">{promo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer lang={lang} />
    </div>
  );
}

