import Link from "next/link";

export default function Footer({ lang = "en" }: { lang?: string }) {
  return (
    <footer className="bg-stone-900 text-stone-400 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Brand */}
        <div className="space-y-6">
          <h3 className="text-white font-display font-black text-2xl tracking-tighter">BioNatural</h3>
          <p className="text-sm leading-relaxed">
            {lang === "en" 
              ? "The original organic store and vegan restaurant in Playa del Carmen. Wellness since 2011." 
              : "La primera tienda orgánica y restaurante vegano en Playa del Carmen. Bienestar desde 2011."}
          </p>
        </div>

        {/* Locations */}
        <div className="space-y-6 md:col-span-2">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Our Locations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-white font-medium text-sm">Constituyentes</p>
              <p className="text-xs">Ave. 10 entre Constituyentes y 16 Nte.</p>
              <p className="text-xs">Tels: (984) 147 3181 / (984) 267 2208</p>
            </div>
            <div className="space-y-2">
              <p className="text-white font-medium text-sm">Quinta Avenida</p>
              <p className="text-xs">5ta. Avenida, entre 40 y 42 Nte.</p>
              <p className="text-xs">Tel: (984) 859 1017</p>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black">Delivery Available</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-6 text-right">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Internal</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href={`/proveedores?lang=${lang}`} className="hover:text-primary transition-colors">{lang === "en" ? "Providers" : "Proveedores"}</Link></li>
            <li><Link href={`/franquicia?lang=${lang}`} className="hover:text-primary transition-colors">{lang === "en" ? "Franchise" : "Franquicia"}</Link></li>
            <li><Link href={`/restaurante?lang=${lang}`} className="hover:text-primary transition-colors">{lang === "en" ? "Restaurant" : "Restaurante"}</Link></li>
            <li><Link href={`/tienda?lang=${lang}`} className="hover:text-primary transition-colors">{lang === "en" ? "Shop" : "Tienda"}</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
        <p>© 2026 BioNatural - The Bio & Natural Way</p>
        <div className="flex gap-8">
          <Link href={`/privacy?lang=${lang}`} className="hover:text-white transition-colors">{lang === "en" ? "Privacy Policy" : "Política de Privacidad"}</Link>
          <Link href={`/terms?lang=${lang}`} className="hover:text-white transition-colors">{lang === "en" ? "Terms of Service" : "Términos de Servicio"}</Link>
        </div>
      </div>
    </footer>
  );
}
