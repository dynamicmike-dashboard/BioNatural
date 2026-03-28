import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  lang: 'en' | 'es';
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

export default function Cart({ lang, cart, updateQuantity, removeFromCart }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto min-h-screen">
      <h2 className="text-4xl font-extrabold font-headline text-emerald-900 mb-12 flex items-center gap-4">
        <ShoppingBag className="w-10 h-10" />
        {lang === 'en' ? 'Your Botanical Basket' : 'Tu Cesta Botánica'}
      </h2>

      {cart.length === 0 ? (
        <div className="glass-card p-20 rounded-[3rem] text-center">
          <p className="text-emerald-800/40 text-xl italic mb-8">
            {lang === 'en' ? 'Your basket is currently empty.' : 'Tu cesta está vacía actualmente.'}
          </p>
          <Link to="/" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-primary/90 transition-all">
            {lang === 'en' ? 'Return to Market' : 'Volver al Mercado'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-3xl flex gap-6 items-center border border-white/20">
                <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-emerald-900">{item.name}</h4>
                  <p className="text-emerald-800/60 text-sm mb-4 line-clamp-1">{item.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/40 rounded-full px-2 border border-white/20">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-emerald-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-900">${(item.price * item.quantity).toFixed(2)}</div>
                  <div className="text-xs text-emerald-800/40">${item.price.toFixed(2)} / unit</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 rounded-[2rem] border border-white/20">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">
                {lang === 'en' ? 'Order Summary' : 'Resumen del Pedido'}
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-emerald-800/60">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-800/60">
                  <span>{lang === 'en' ? 'Shipping' : 'Envío'}</span>
                  <span>{lang === 'en' ? 'Free' : 'Gratis'}</span>
                </div>
                <div className="h-px bg-emerald-900/10 my-4"></div>
                <div className="flex justify-between text-2xl font-bold text-emerald-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                {lang === 'en' ? 'Checkout Now' : 'Pagar Ahora'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
