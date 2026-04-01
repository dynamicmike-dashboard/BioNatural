import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Filter as FilterIcon, Plus as Add, Minus as Remove, MapPin as LocationOn, ChevronDown as ExpandMore, Leaf as Eco, Flower2 as Spa, Sparkles as AutoAwesome, ArrowRight as ArrowForward, Truck as DeliveryDining, Settings as Tune } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import { getCookie, setCookie } from './lib/cookies';

export default function App() {
  const [lang, setLang] = useState<'en' | 'es'>((getCookie('locale') as 'en' | 'es') || 'es');
  const [location, setLocation] = useState<'1' | '2'>('1'); // 1: Quinta Avenida, 2: 10 Avenida
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reservationStatus, setReservationStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Fetch products based on lang and location
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products?lang=${lang}&location=${location}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [lang, location]);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    setCookie('locale', newLang, 365);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, location: location === '1' ? 'Quinta Avenida' : '10 Avenida' }),
      });
      const result = await res.json();
      if (res.ok) {
        setReservationStatus({ type: 'success', message: lang === 'en' ? 'Reservation confirmed!' : '¡Reservación confirmada!' });
      } else {
        setReservationStatus({ type: 'error', message: result.error || 'Failed to book' });
      }
    } catch (error) {
      setReservationStatus({ type: 'error', message: 'Network error' });
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-secondary-container">
      {/* TopAppBar */}
      <nav className="bg-stone-50/70 backdrop-blur-xl sticky top-0 z-50 border-b border-stone-200/20">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-serif text-emerald-900 italic font-semibold">
              BioNatural.mx
            </div>
            {/* Branch Selector */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full cursor-pointer hover:bg-stone-200/50 transition-colors group relative">
              <LocationOn className="text-primary text-sm" />
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value as '1' | '2')}
                className="bg-transparent border-none p-0 text-xs font-label tracking-tight text-on-surface-variant focus:ring-0 cursor-pointer appearance-none pr-6"
              >
                <option value="1">Quinta Avenida</option>
                <option value="2">10 Avenida</option>
              </select>
              <ExpandMore className="text-xs absolute right-3 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 items-center">
              <a className="text-emerald-800 font-semibold tracking-tight" href="#">{lang === 'en' ? 'Curated' : 'Curaduría'}</a>
              <a className="text-stone-500 hover:text-emerald-700 transition-colors tracking-tight" href="#">{lang === 'en' ? 'Wellness' : 'Bienestar'}</a>
              <a className="text-stone-500 hover:text-emerald-700 transition-colors tracking-tight" href="#">{lang === 'en' ? 'Organic' : 'Orgánico'}</a>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleLang} className="text-stone-500 font-label text-sm font-semibold hover:text-primary transition-colors">
                {lang === 'en' ? 'ES' : 'EN'}
              </button>
              <div className="w-px h-4 bg-outline-variant opacity-30"></div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-stone-200/50 transition-all text-primary"
              >
                <ShoppingBag />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24 overflow-hidden">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[11px] font-bold uppercase tracking-[0.2em]">
              {location === '1' ? 'Quinta Avenida' : '10 Avenida'} • {lang === 'en' ? 'Seasonal' : 'De Temporada'}
            </div>
            <h1 className="text-6xl md:text-8xl font-headline italic text-primary leading-[0.9] tracking-tighter">
              {lang === 'en' ? 'Organic Soul,' : 'Alma Orgánica,'} <br/>
              {lang === 'en' ? 'Botanical Heart.' : 'Corazón Botánico.'}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md font-light leading-relaxed">
              {lang === 'en' 
                ? 'A curated culinary experience where the raw textures of the Mayan jungle meet sophisticated organic gastronomy.'
                : 'Una experiencia culinaria curada donde las texturas crudas de la selva maya se encuentran con la sofisticada gastronomía orgánica.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#reserve" className="bg-primary text-on-primary px-8 py-4 rounded-DEFAULT font-semibold hover:opacity-90 transition-all editorial-shadow">
                {lang === 'en' ? 'Reserve Table' : 'Reservar Mesa'}
              </a>
              <button className="bg-surface-container-highest text-primary px-8 py-4 rounded-DEFAULT font-semibold hover:bg-surface-container-high transition-all">
                {lang === 'en' ? 'View Full Menu' : 'Ver Menú Completo'}
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/5] md:aspect-[16/10] rounded-xl overflow-hidden editorial-shadow transform rotate-1 translate-x-4">
              <img alt="Botanical salad" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxg8_s7mrKzvnvSWP-Yo0FwahCEoMqmhVXYId5YSI5j2c08GmQEIMU68sjsmhqooCFUeYP5CbG614eAVmwbLX-clKNIHtkrsTlQVnikrzFI8ZVklTzD_e801hC6P_P_OIcHV8130QqX7NFzRPWhLAE_dsPnhzHNySqdp_D6aQOOsa5OutX_QvKorv-UTHmp-dy71fWNAJurgKvc0Ud_4coB7OeD79o6BH86o5zzyQwksc1An5jk2IRMGxNMd-prH9pk78z9ZDyzRU"/>
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-80 rounded-xl overflow-hidden editorial-shadow border-8 border-surface hidden md:block transform -rotate-3 transition-transform hover:rotate-0 duration-700">
              <img alt="Healthy bowl" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxrHVLdK8jhFhQ1dSZyhRxQokH5V0QWML9d3JLk8zxAX1RTKixDJzV4TxTiGSmK4EjXwETvH_NMRTTtuxlUg_w1p93bleeEKJnDYvSg2hlID_MKXSxHkeA2fJtinhCrnFklZUnX42-Lpx-sifYwT-m8IXcSyQ8QoJELXMRS0QP3gWW_Wtt8klAo3Im7gYPNFoNX7JDSUAn9OUI-NEV3uKp1IMeGJdXBvf5vmH2uYseK69sQSa8nJbvF5oZpxyhk8xuorXT_1hipvE"/>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline italic text-primary mb-4">
                {lang === 'en' ? 'Seasonal Botanical Creations' : 'Creaciones Botánicas de Temporada'}
              </h2>
              <p className="text-on-surface-variant max-w-xl">
                {lang === 'en' 
                  ? 'Every dish is a dialogue between local farmers and our kitchen, celebrating the limestone soil and Caribbean sun.'
                  : 'Cada plato es un diálogo entre los agricultores locales y nuestra cocina, celebrando el suelo calizo y el sol del Caribe.'}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-6 py-2 bg-surface-container-high rounded-full text-sm font-semibold text-primary">
                <Spa className="text-sm" />
                {lang === 'en' ? 'Plant-Based' : 'Basado en Plantas'}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={product.id} 
                  className="flex flex-col group"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low relative mb-4">
                    <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.image_url} />
                    <button 
                      onClick={() => addToCart(product)}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-surface-container-lowest/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
                    >
                      <Add />
                    </button>
                    <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-lg text-primary">{product.name}</h4>
                  <p className="text-sm text-on-surface-variant mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-secondary font-bold font-body">${product.price.toFixed(2)} <span className="text-[10px] text-outline font-normal">MXN</span></p>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Order Now Integration */}
        <section className="mb-32 bg-primary-container rounded-xl overflow-hidden flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-1/2 p-12 lg:p-20 space-y-8">
            <h2 className="text-4xl md:text-5xl font-headline italic text-on-primary-container leading-tight">
              {lang === 'en' ? "Can't leave your oasis?" : "¿No puedes dejar tu oasis?"} <br/>
              {lang === 'en' ? "We'll bring the garden to you." : "Te llevamos el jardín a casa."}
            </h2>
            <p className="text-on-primary-fixed-variant max-w-md">
              {lang === 'en' 
                ? 'Our full delivery-ready menu is optimized for flavor preservation and sustainable packaging.'
                : 'Nuestro menú completo listo para entrega está optimizado para la preservación del sabor y empaque sustentable.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a className="flex items-center justify-center gap-3 bg-white px-8 py-4 rounded-DEFAULT text-primary font-bold hover:bg-stone-100 transition-all" href="#">
                <DeliveryDining />
                Order on Rappi
              </a>
              <a className="flex items-center justify-center gap-3 bg-surface-container-high/20 border border-white/20 text-white px-8 py-4 rounded-DEFAULT font-bold hover:bg-white/10 transition-all" href="#">
                UberEats
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 min-h-[300px] relative">
            <img alt="Delivery concept" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvYMtfkkkhYRepsgrmWKYbruOXRpEzooUcVhd44hpyU9lRttqnCLoBtpUKgTYxG1VhZ0Wp34hk9EVuF5JmoIw3CyZrb7VG-QpUQXtz8Id0M4ASRHjBb40t9vuOIFqIq2SBNEcgYgOjubeJ-e8Mx2fb7HlHPh4PCFw5CawD2Pes-FbauKdKesbdVSr2LvyrNOk9tef5Ki0BaFIKM0LseFVl8Zkyqa748Wl6_9u-aEqg0cXy5KoYwt7ltPQb08GN5r7P0LMMatRgSd0"/>
          </div>
        </section>

        {/* Reservation Section */}
        <section id="reserve" className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden editorial-shadow flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 bg-jungle-gradient p-12 text-on-primary flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-headline italic mb-4">{lang === 'en' ? 'Reserve Your Table' : 'Reserva tu Mesa'}</h3>
              <p className="text-sm font-light opacity-80">
                {lang === 'en' 
                  ? 'Experience the magic of BioNatural under the Playa starlight or in our airy limestone patio.'
                  : 'Vive la magia de BioNatural bajo la luz de las estrellas de Playa o en nuestro aireado patio de piedra caliza.'}
              </p>
            </div>
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-secondary-fixed">phone</span>
                +52 (984) 123 4567
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-secondary-fixed">mail</span>
                concierge@bionatural.mx
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5 p-12 bg-surface-container-low">
            <form onSubmit={handleReservation} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">{lang === 'en' ? 'Date' : 'Fecha'}</label>
                  <input name="date" required className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 py-2 outline-none transition-all" type="date"/>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">{lang === 'en' ? 'Time' : 'Hora'}</label>
                  <select name="time" required className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 py-2 outline-none transition-all appearance-none">
                    <option>19:00</option>
                    <option>19:30</option>
                    <option>20:00</option>
                    <option>20:30</option>
                    <option>21:00</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">{lang === 'en' ? 'Party Size' : 'Personas'}</label>
                <input name="party_size" type="number" min="1" max="10" defaultValue="2" required className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 py-2 outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">{lang === 'en' ? 'Name' : 'Nombre'}</label>
                <input name="customer_name" required className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 py-2 outline-none transition-all" type="text"/>
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-DEFAULT font-bold uppercase tracking-widest text-xs mt-4 hover:opacity-90 transition-all">
                {lang === 'en' ? 'Confirm Reservation' : 'Confirmar Reservación'}
              </button>
              {reservationStatus && (
                <p className={`text-center text-sm font-bold ${reservationStatus.type === 'success' ? 'text-emerald-600' : 'text-error'}`}>
                  {reservationStatus.message}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low pt-24 pb-40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-3xl font-serif italic text-primary mb-6">BioNatural.mx</div>
            <p className="text-on-surface-variant max-w-sm leading-relaxed">
              {lang === 'en' 
                ? 'A sanctuary for conscious living in the heart of Playa del Carmen. We believe in food as medicine and dining as a ritual.'
                : 'Un santuario para la vida consciente en el corazón de Playa del Carmen. Creemos en la comida como medicina y en el cenar como un ritual.'}
            </p>
          </div>
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-6">{lang === 'en' ? 'Branches' : 'Sucursales'}</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li className="hover:text-primary cursor-pointer transition-colors">Quinta Avenida</li>
              <li className="hover:text-primary cursor-pointer transition-colors">10 Avenida & Calle 12</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Tulum Pueblo (Coming Soon)</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-6">Newsletter</h5>
            <div className="flex items-center gap-2 border-b border-outline-variant py-2">
              <input className="bg-transparent text-sm w-full outline-none" placeholder={lang === 'en' ? "Your email" : "Tu correo"} type="email"/>
              <button className="text-primary"><ArrowForward /></button>
            </div>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile) */}
      <nav className="bg-stone-50/80 backdrop-blur-2xl fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 rounded-t-3xl border-t border-stone-200/20 shadow-[0_-10px_40px_rgba(27,29,14,0.04)] md:hidden">
        <div className="flex flex-col items-center justify-center text-stone-500 px-5 py-2 hover:text-emerald-700 transition-colors">
          <AutoAwesome />
          <span className="font-sans text-[11px] uppercase tracking-widest mt-1">Curated</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-stone-200/50 text-emerald-900 rounded-full px-5 py-2 scale-110 transition-transform duration-300 ease-out">
          <Spa />
          <span className="font-sans text-[11px] uppercase tracking-widest mt-1">Wellness</span>
        </div>
        <div className="flex flex-col items-center justify-center text-stone-500 px-5 py-2 hover:text-emerald-700 transition-colors">
          <Eco />
          <span className="font-sans text-[11px] uppercase tracking-widest mt-1">Organic</span>
        </div>
        <div onClick={() => setIsCartOpen(true)} className="flex flex-col items-center justify-center text-stone-500 px-5 py-2 hover:text-emerald-700 transition-colors cursor-pointer">
          <div className="relative">
            <ShoppingBag />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
          </div>
          <span className="font-sans text-[11px] uppercase tracking-widest mt-1">Cart</span>
        </div>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-headline italic text-primary">{lang === 'en' ? 'Your Basket' : 'Tu Canasta'}</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <Remove />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image_url} className="w-20 h-20 rounded-lg object-cover" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-primary">{item.name}</h4>
                      <p className="text-xs text-on-surface-variant">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-stone-100 rounded border border-stone-200"><Remove className="text-xs" /></button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-stone-100 rounded border border-stone-200"><Add className="text-xs" /></button>
                      </div>
                    </div>
                    <div className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                {cart.length === 0 && (
                  <div className="text-center py-20 text-on-surface-variant italic">
                    {lang === 'en' ? 'Your basket is empty' : 'Tu canasta está vacía'}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-stone-100 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Total</span>
                  <span className="text-3xl font-headline italic text-primary">${cartTotal.toFixed(2)} MXN</span>
                </div>
                <button className="w-full bg-primary text-on-primary py-4 rounded-DEFAULT font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all">
                  {lang === 'en' ? 'Checkout' : 'Pagar'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick Shop FAB (Mobile) */}
      <button className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-40">
        <Tune />
      </button>
    </div>
  );
}
