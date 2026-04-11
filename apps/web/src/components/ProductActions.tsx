"use client";

import { useCart } from "@/context/CartContext";

export default function ProductActions({ product, lang }: { product: any, lang: string }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.odoo_id,
      name: product[`name_${lang}`] || product.name_en,
      price: product.price,
      image: product.image_url,
      quantity: 1
    });
  };

  return (
    <div className="flex flex-col sm:row gap-4 pt-4 border-b border-gray-100 pb-12">
      <button 
        onClick={() => {
          handleAddToCart();
          // Optionally auto-open cart or redirect
        }}
        className="flex-2 px-10 py-6 bg-[#2E7D32] text-white rounded-[28px] font-black text-xl hover:bg-[#1B5E20] transition-all transform shadow-2xl shadow-[#2E7D32]/30 active:scale-95"
      >
        {lang === "en" ? "Add to Cart" : "Agregar al Carrito"}
      </button>
      <button 
        onClick={handleAddToCart}
        className="px-10 py-6 bg-white text-[#2E7D32] border-4 border-[#F1F8E9] rounded-[28px] font-black text-xl hover:bg-[#F1F8E9] transition-all"
      >
        {lang === "en" ? "Just Wishlist" : "Solo Guardar"}
      </button>
    </div>
  );
}
