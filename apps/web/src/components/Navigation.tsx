"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navigation() {
  const { cartCount, cartTotal, cart, removeFromCart, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 glass-morphism rounded-full flex items-center gap-12 shadow-xl border border-white/20">
      <Link href={`/?lang=${lang}`} className="font-display font-black text-2xl text-gradient tracking-tighter">
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

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link href={switchLang("en")} className={lang === "en" ? "text-primary" : "hover:text-gray-600"}>EN</Link>
          <span className="opacity-20">|</span>
          <Link href={switchLang("es")} className={lang === "es" ? "text-primary" : "hover:text-gray-600"}>ES</Link>
        </div>

        <div className="h-4 w-px bg-gray-200" />

        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative group p-2 rounded-full hover:bg-primary/5 transition-all active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900 group-hover:text-primary"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce-short shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mini Cart Drawer */}
      {isCartOpen && (
        <div className="absolute top-24 right-0 w-80 bg-white rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.15)] border border-stone-100 p-8 animate-fade-in z-[60] text-stone-900">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-display font-black text-xl tracking-tighter">Your Bag</h4>
            <button onClick={() => setIsCartOpen(false)} className="text-xl opacity-20 hover:opacity-100">×</button>
          </div>
          
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <span className="text-4xl">🍃</span>
              <p className="text-sm font-medium text-stone-400">Your bag is empty. Start shopping for wellness!</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto space-y-4 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-12 h-12 rounded-xl bg-stone-50 overflow-hidden flex-shrink-0">
                      {item.image && <img src={item.image} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate tracking-tight">{item.name}</p>
                      <p className="text-[10px] font-black text-primary uppercase">${item.price} × {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="opacity-0 group-hover:opacity-100 text-red-400 font-bold p-2 transition-all">×</button>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-stone-50 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black uppercase tracking-widest text-stone-300">Total</span>
                  <span className="text-2xl font-display font-black text-stone-900">${cartTotal}</span>
                </div>
                <button 
                  onClick={() => {
                     const msg = encodeURIComponent(`Hola BioNatural! I want to complete my order:\n${cart.map(i => `- ${i.name} (${i.quantity}x)`).join('\n')}\nTotal: $${cartTotal}`);
                     window.open(`https://wa.me/529841473181?text=${msg}`);
                  }}
                  className="w-full bg-stone-900 text-white rounded-2xl py-4 font-black uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all active:scale-95"
                >
                  Confirm & Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
