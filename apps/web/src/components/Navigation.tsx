"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  const links = [
    { name_en: "Shop", name_es: "Tienda", href: "/tienda" },
    { name_en: "Restaurant", name_es: "Restaurante", href: "/restaurante" },
    { name_en: "Blog", name_es: "Blog", href: "/blog" },
    { name_en: "Providers", name_es: "Proveedores", href: "/proveedores" },
    { name_en: "Breakfast", name_es: "Desayuno", href: "/breakfast-surprise" },
    { name_en: "Franchise", name_es: "Franquicia", href: "/franquicia" },
  ];

  const switchLang = (newLang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", newLang);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 glass-morphism rounded-full flex items-center gap-12 shadow-xl border border-white/20">
      <Link href="/" className="font-display font-black text-2xl text-gradient tracking-tighter">
        BioNatural
      </Link>
      
      <div className="flex items-center gap-8 font-medium text-sm">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={`${link.href}?lang=${lang}`}
            className={`transition-colors hover:text-primary ${pathname.startsWith(link.href) ? 'text-primary font-bold' : 'text-gray-500'}`}
          >
            {lang === "en" ? link.name_en : link.name_es}
          </Link>
        ))}
      </div>

      <div className="h-4 w-px bg-gray-200" />

      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
        <Link href={switchLang("en")} className={lang === "en" ? "text-primary" : "hover:text-gray-600"}>EN</Link>
        <span className="opacity-20">|</span>
        <Link href={switchLang("es")} className={lang === "es" ? "text-primary" : "hover:text-gray-600"}>ES</Link>
      </div>
    </nav>
  );
}
