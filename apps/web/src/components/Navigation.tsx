"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navigation() {
  const { cartCount, cartTotal, cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  const links = [
    { name_en: "Shop", name_es: "Tienda", href: "/tienda" },
    { name_en: "Restaurant", name_es: "Restaurante", href: "/restaurante" },
    { name_en: "Blog", name_es: "Blog", href: "/blog" },
    { name_en: "Breakfast", name_es: "Desayuno", href: "/breakfast-surprise" },
  ];

  const switchLang = (newLang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", newLang);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/80 backdrop-blur-md rounded-full hidden lg:flex items-center gap-12 shadow-xl border border-white/20">
        <Link href={`/?lang=${lang}`} className="font-serif font-black text-2xl text-forest tracking-tighter">
          BioNatural
        </Link>
        
        <div className="flex items-center gap-8 font-medium text-sm">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={`${link.href}?lang=${lang}`}
              className={`transition-colors hover:text-sand ${pathname.startsWith(link.href) ? 'text-sand font-bold' : 'text-stone-500'}`}
            >
              {lang === "en" ? link.name_en : link.name_es}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-stone-400">
            <Link href={switchLang("en")} className={lang === "en" ? "text-forest" : "hover:text-stone-600"}>EN</Link>
            <span className="opacity-20">|</span>
            <Link href={switchLang("es")} className={lang === "es" ? "text-forest" : "hover:text-stone-600"}>ES</Link>
          </div>
          <div className="h-4 w-px bg-stone-200" />
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 rounded-full hover:bg-stone-50 transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-sand text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[60] lg:hidden p-4 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
         <Link href={`/?lang=${lang}`} className="font-serif font-black text-xl text-forest tracking-tighter">
            BioNatural
         </Link>
         <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
               {cartCount > 0 && <span className="absolute top-0 right-0 bg-sand text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">{cartCount}</span>}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
               <div className="w-6 h-0.5 bg-forest mb-1.5 rounded-full" />
               <div className="w-4 h-0.5 bg-forest mb-1.5 rounded-full ml-auto" />
               <div className="w-6 h-0.5 bg-forest rounded-full" />
            </button>
         </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
         <div className="fixed inset-0 z-[70] bg-forest flex flex-col p-12 lg:hidden animate-in fade-in slide-in-from-top duration-500">
            <button onClick={() => setIsMenuOpen(false)} className="self-end text-white text-5xl font-light mb-12">×</button>
            <div className="flex flex-col gap-8">
               {links.map((link) => (
                  <Link 
                     key={link.href}
                     href={`${link.href}?lang=${lang}`}
                     onClick={() => setIsMenuOpen(false)}
                     className="text-4xl font-serif text-white/50 hover:text-sand hover:pl-4 transition-all"
                  >
                     {lang === "en" ? link.name_en : link.name_es}
                  </Link>
               ))}
            </div>
            <div className="mt-auto flex gap-6 text-xs font-black tracking-widest text-white/40 uppercase">
               <Link href={switchLang("en")} className={lang === "en" ? "text-sand" : ""}>Eng</Link>
               <span>|</span>
               <Link href={switchLang("es")} className={lang === "es" ? "text-sand" : ""}>Esp</Link>
            </div>
         </div>
      )}

      {/* Mini Cart Drawer (Unchanged but with silk/sand styling) */}
      {isCartOpen && (
        <div className="fixed top-24 right-4 w-[calc(100vw-32px)] md:w-96 bg-silk rounded-3xl shadow-2xl border border-stone-200 p-8 animate-in slide-in-from-right duration-300 z-[80]">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-serif font-black text-xl text-forest tracking-tighter uppercase italic">Your Selection</h4>
            <button onClick={() => setIsCartOpen(false)} className="text-3xl opacity-20 hover:opacity-100">×</button>
          </div>
          
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <span className="text-4xl">🍃</span>
              <p className="text-sm font-medium text-stone-400">Your bag is awaiting wellness.</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto space-y-4 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-12 h-12 rounded-xl bg-white overflow-hidden shadow-sm flex-shrink-0">
                      {item.image && <img src={item.image} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-forest truncate tracking-tight uppercase">{item.name}</p>
                      <p className="text-[10px] font-black text-sand uppercase tracking-wider">${item.price} × {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-300 font-bold p-2">×</button>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-stone-200 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">Total Investment</span>
                  <span className="text-2xl font-serif font-black text-forest">${cartTotal}</span>
                </div>
                <button 
                  onClick={() => {
                     const msg = encodeURIComponent(`Hola BioNatural! I want to complete my order:\n${cart.map(i => `- ${i.name} (${i.quantity}x)`).join('\n')}\nTotal: $${cartTotal}`);
                     window.open(`https://wa.me/529841473181?text=${msg}`);
                  }}
                  className="w-full bg-forest text-white rounded-2xl py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-sand transition-all animate-pulse"
                >
                  Confirm by WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
