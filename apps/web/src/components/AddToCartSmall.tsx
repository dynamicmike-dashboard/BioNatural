"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartSmall({ product, lang }: { product: any, lang: string }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
          id: product.odoo_id,
          name: product[`name_${lang}`] || product.name,
          price: product.price,
          image: product.image_url,
          quantity: 1
        });
      }}
      className="bg-foreground text-background w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:bg-primary hover:scale-110 active:scale-90 shadow-xl shadow-black/10 relative z-20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    </button>
  );
}
