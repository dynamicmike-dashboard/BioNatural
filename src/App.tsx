import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MapPin, Globe, ArrowRight, CheckCircle2, Loader2, Instagram, Database, Zap, Languages, Menu, Utensils, ShoppingCart, Heart, Home, Library, User, ShoppingBasket, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  ingredients: string[];
  health_benefits: string[];
  price: number;
  direct_url: string;
  image_url: string;
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [showEngine, setShowEngine] = useState(false);
  
  const [instaKeyword, setInstaKeyword] = useState('');
  const [instaReply, setInstaReply] = useState<any>(null);
  const [isSimulatingInsta, setIsSimulatingInsta] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [routedOrder, setRoutedOrder] = useState<any>(null);
  const [isRouting, setIsRouting] = useState(false);

  // Fetch products based on language
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const res = await fetch(`/api/products?lang=${lang}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [lang]);

  const simulateInstagram = async () => {
    if (!instaKeyword) return;
    setIsSimulatingInsta(true);
    try {
      const res = await fetch('/api/automation/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: instaKeyword })
      });
      const data = await res.json();
      setInstaReply(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulatingInsta(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?query=${searchQuery}&lang=${lang}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const simulateOrderRouting = async () => {
    setIsRouting(true);
    try {
      const res = await fetch('/api/orders/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'Rappi',
          customerLocation: { lat: 20.6231, lng: -87.0779 }, // Playa del Carmen
          items: [{ sku: 'BN-HON-01', qty: 2 }]
        })
      });
      const data = await res.json();
      setRoutedOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-container/30">
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl shadow-sm shadow-emerald-900/5">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Menu className="text-emerald-900 w-6 h-6 cursor-pointer" />
            <div className="flex items-center gap-2">
              <img alt="BioNatural Logo" className="h-8 w-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEhc0XY-Z9xxFBHBHtCfJTed0xIckNwy-Zu7O1f6wv5aiA-t8INoSfcFPmNOkKVu9pPUmQem9CFfsZEC2W6Yr8BO4MEaenSEB1UhIaOe1zKG26u5kzzKI5vk6ywNyeYB5tBcDnbtnJV6LuUHIvPTfHfcC0JoHofHE8Bs_0pSnhMCF-rOGGx7NZlO0QfUnZ_UnFmUVA9MhmaxNajdecb74Yl13risrbQbsXF2fEW_pd-ZjtbFIBqz-QRM5gp4cx42RIgxLbPffJXPc" />
              <span className="text-2xl font-bold tracking-tight text-emerald-900 font-headline">BioNatural</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a className="text-lime-700 font-semibold font-label" href="#">Home</a>
            <a className="text-emerald-800/70 hover:bg-lime-50/50 transition-colors font-label px-2 py-1 rounded" href="#">Explore</a>
            <a className="text-emerald-800/70 hover:bg-lime-50/50 transition-colors font-label px-2 py-1 rounded" href="#">Library</a>
            <button 
              onClick={() => setShowEngine(!showEngine)}
              className="flex items-center gap-1 text-emerald-800/70 hover:text-primary transition-colors font-label"
            >
              <Zap className="w-4 h-4" />
              {showEngine ? 'Hide Brain' : 'Show Brain'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
              title={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            >
              <Languages className="w-5 h-5 text-emerald-900" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-container/20 flex items-center justify-center overflow-hidden border border-primary/10">
              <img alt="User profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqYsWsuLVcuNwBAQ3CbTi1WUjnhVaLK24NIlO3vO3MbsEglSe6YtFJB-oNv_OtJzDuUMxuZJS2ObIe1Agd1YBjaiutTPWnCXXLwZ_sieIemkprzPjaBYo8h-6hpTKpOea4Z-VloAoZc6zxJb26ffJLScRYSJWzJDjt8z0x_ZfGqYn9YPigWKpxD-eWeRSpuZHHYIzl2B2VhcW3zQtVwgvxW78bCeWhHNJQRNT-ii98igQdNB5A0__Zo_lJ8To68KVRPL_zeyefpLg" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero Split Section */}
        <section className="flex flex-col md:flex-row h-[795px] min-h-[600px] w-full overflow-hidden">
          {/* Market Side */}
          <div className="relative flex-1 group overflow-hidden cursor-pointer">
            <img alt="Organic Market" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyBDFdyhSxwwp8TzrlyAFDroUSv60bqrUNJeGl4OXGqSuNCIJTQP8rmMQWGRZprvwJe1caa85-39ZjDphRigoFIhspqLc-u_7IUQfOf288aQjJ6e3aljD5QsQRO3oMEQidD8MBHqenfZlOo5mGToxgIoADkBx2iuVp1mmd9sdjey7PxqkIP1_Ec17_30vgsk8gvMexASOFhM4Ot1I7oRurFSDGxhwL-7-oaUF9ZpkAHDyBvmyNRdcBQDqROi2V0PIJHNsqDlVcnOo" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 md:p-16">
              <div className="glass-card p-8 rounded-xl max-w-md">
                <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-emerald-900 leading-tight mb-4">
                  {lang === 'en' ? 'Organic Market' : 'Mercado Orgánico'}
                </h2>
                <p className="text-on-surface-variant mb-8 text-lg">
                  {lang === 'en' 
                    ? 'Freshly harvested botanical wonders delivered straight from our conservatory to your kitchen.' 
                    : 'Maravillas botánicas recién cosechadas entregadas directamente desde nuestro conservatorio a su cocina.'}
                </p>
                <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                  {lang === 'en' ? 'Shop Now' : 'Comprar Ahora'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          {/* Restaurant Side */}
          <div className="relative flex-1 group overflow-hidden cursor-pointer">
            <img alt="Restaurant Dining" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbGVEEPiD4fNGOnLlbzDARKIn1OH0j-6FLu5w36CqUo1g-cyn2Bsjn58ANf5ZNVUJReAWlfN9MLhUsEagfcDRmMO4TTs2jGgNw_Rp3id_tphcFcvIs8nrDebqTtdoRODo6GjI5-2PmeCIO_zh2egwYhgGFmG4fRAja88c7EnGJnXsmGbZZpO_iW2hLcFNrgXdpk2G0bNBWTfmYAXnKQaNAI9ngHy23xVgAhQfcXf727aGHrithEYPmp_U_X2Nm2xROGMNvutRarVY" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 md:p-16">
              <div className="glass-card p-8 rounded-xl max-w-md">
                <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-emerald-900 leading-tight mb-4">
                  {lang === 'en' ? 'Restaurant' : 'Restaurante'}
                </h2>
                <p className="text-on-surface-variant mb-8 text-lg">
                  {lang === 'en'
                    ? "A sensory journey through nature's finest ingredients, curated by culinary artisans."
                    : "Un viaje sensorial a través de los mejores ingredientes de la naturaleza, curado por artesanos culinarios."}
                </p>
                <button className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 active:scale-95">
                  {lang === 'en' ? 'Book a Table' : 'Reservar Mesa'}
                  <Utensils className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Engine Overlay (The Brain) */}
        <AnimatePresence>
          {showEngine && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 z-[60] p-6 md:p-12 pointer-events-none"
            >
              <div className="max-w-7xl mx-auto bg-emerald-900/95 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/10 pointer-events-auto relative overflow-hidden">
                <button 
                  onClick={() => setShowEngine(false)}
                  className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary rounded-2xl">
                        <Database className="text-white w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-extrabold font-headline text-white">The Growth Engine</h3>
                        <p className="text-white/60 text-sm">Supabase Sync & Bilingual Logic Hub</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {products.map(product => (
                        <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                          <div className="flex gap-4">
                            <img src={product.image_url} className="w-16 h-16 rounded-xl object-cover" alt="" />
                            <div className="flex-1">
                              <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{product.sku}</div>
                              <h4 className="text-white font-bold">{product.name}</h4>
                              <p className="text-white/40 text-xs line-clamp-1">{product.description}</p>
                              <div className="mt-1 text-primary font-bold">${product.price.toFixed(2)}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="text-[10px] text-white/40 uppercase font-bold mb-1">
                                {lang === 'en' ? 'Ingredients' : 'Ingredientes'}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {product.ingredients.map((ing, i) => (
                                  <span key={i} className="text-[9px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full">
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/40 uppercase font-bold mb-1">
                                {lang === 'en' ? 'Health Benefits' : 'Beneficios para la Salud'}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {product.health_benefits.map((benefit, i) => (
                                  <span key={i} className="text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white/10 rounded-3xl p-8 border border-white/10">
                      <div className="flex items-center gap-3 mb-6">
                        <Instagram className="text-pink-400 w-6 h-6" />
                        <h4 className="text-white font-bold font-headline">n8n Automation</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          {['MENU', 'SHOP', 'PURE'].map(k => (
                            <button 
                              key={k}
                              onClick={() => setInstaKeyword(k)}
                              className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${instaKeyword === k ? 'bg-pink-500 text-white border-pink-500' : 'border-white/20 text-white/60 hover:border-pink-500'}`}
                            >
                              {k}
                            </button>
                          ))}
                        </div>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={instaKeyword}
                            onChange={(e) => setInstaKeyword(e.target.value.toUpperCase())}
                            className="w-full bg-white/5 border-none rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-pink-500"
                            placeholder="Keyword..."
                          />
                          <button 
                            onClick={simulateInstagram}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-2 rounded-lg"
                          >
                            {isSimulatingInsta ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                          </button>
                        </div>
                        {instaReply && (
                          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-white/80 italic">
                            {instaReply.reply}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/60 text-xs font-bold uppercase tracking-widest">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                      Logic Hub Online
                    </div>

                    <div className="bg-white/10 rounded-3xl p-8 border border-white/10">
                      <div className="flex items-center gap-3 mb-6">
                        <Languages className="text-blue-400 w-6 h-6" />
                        <h4 className="text-white font-bold font-headline">Bilingual Search</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="relative">
                          <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-white/5 border-none rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder={lang === 'en' ? "Search 'supplements'..." : "Busca 'suplementos'..."}
                          />
                          <button 
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg"
                          >
                            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                          </button>
                        </div>
                        {searchResults && (
                          <div className="space-y-2">
                            <div className="text-[10px] text-blue-300 font-bold uppercase tracking-tighter">
                              Mapping: "{searchResults.originalQuery}" → "{searchResults.mappedQuery}"
                            </div>
                            <div className="space-y-1">
                              {searchResults.results.map((r: any) => (
                                <div key={r.id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg text-[10px] text-white/80">
                                  <span>{r.name}</span>
                                  <span className="text-blue-400">${r.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-3xl p-8 border border-white/10">
                      <div className="flex items-center gap-3 mb-6">
                        <MapPin className="text-emerald-400 w-6 h-6" />
                        <h4 className="text-white font-bold font-headline">Logistics Middleware</h4>
                      </div>
                      <div className="space-y-4">
                        <button 
                          onClick={simulateOrderRouting}
                          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                        >
                          {isRouting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                          Simulate Order Routing
                        </button>
                        {routedOrder && (
                          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                            <div className="flex justify-between text-[10px] text-white/40 uppercase font-bold">
                              <span>Platform: {routedOrder.platform}</span>
                              <span>ID: {routedOrder.orderId}</span>
                            </div>
                            <div className="text-xs text-emerald-400 font-bold">
                              Assigned: {routedOrder.assignedSucursal.name}
                            </div>
                            <div className="text-[9px] text-white/60 italic">
                              Status: {routedOrder.status}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Section (Bento Grid) */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-tertiary font-bold tracking-widest text-sm font-headline uppercase">
                {lang === 'en' ? 'The Conservatory Selection' : 'La Selección del Conservatorio'}
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface mt-2">
                {lang === 'en' ? 'Curated Highlights' : 'Destacados Curados'}
              </h3>
            </div>
            <p className="text-on-surface-variant text-lg md:text-right max-w-sm">
              {lang === 'en' 
                ? 'Every element in our collection is hand-picked for its purity and botanical excellence.'
                : 'Cada elemento de nuestra colección es seleccionado a mano por su pureza y excelencia botánica.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Large Feature - Using first product or a special one */}
            {products[1] && (
              <div className="md:col-span-2 md:row-span-2 glass-card rounded-[2rem] p-8 flex flex-col justify-between group overflow-hidden relative">
                <div className="z-10">
                  <div className="bg-primary-container/20 w-fit px-4 py-1 rounded-full text-primary font-bold text-xs mb-4 uppercase">
                    {lang === 'en' ? 'Best Seller' : 'Más Vendido'}
                  </div>
                  <h4 className="text-3xl font-bold font-headline mb-4">{products[1].name}</h4>
                  <p className="text-on-surface-variant">{products[1].description}</p>
                </div>
                <div className="mt-8 flex items-baseline gap-2 z-10">
                  <span className="text-3xl font-bold text-primary">${products[1].price.toFixed(2)}</span>
                </div>
                <img alt={products[1].name} className="absolute bottom-0 right-0 w-2/3 h-2/3 object-contain opacity-40 group-hover:scale-110 transition-transform duration-500" src={products[1].image_url} />
                <button className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary active:scale-90 transition-transform">
                  <ShoppingBasket className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Product Card 1 */}
            {products[0] && (
              <div className="md:col-span-2 glass-card rounded-[2rem] p-6 flex gap-6 items-center">
                <div className="w-1/3 h-full rounded-2xl overflow-hidden">
                  <img alt={products[0].name} className="w-full h-full object-cover" src={products[0].image_url} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold font-headline text-lg">{products[0].name}</h4>
                    <span className="text-tertiary font-bold">${products[0].price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-2 mb-4">{products[0].description}</p>
                  <button className="text-primary font-bold text-sm flex items-center gap-1">
                    {lang === 'en' ? 'Add to Cart' : 'Añadir al Carrito'} <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Product Card 2 */}
            {products[2] && (
              <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between">
                <img alt={products[2].name} className="w-full h-32 object-cover rounded-xl mb-4" src={products[2].image_url} />
                <h4 className="font-bold font-headline">{products[2].name}</h4>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{products[2].description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">${products[2].price.toFixed(2)}</span>
                  <Heart className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors w-5 h-5" />
                </div>
              </div>
            )}

            {/* Product Card 3 */}
            {products[3] && (
              <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between">
                <img alt={products[3].name} className="w-full h-32 object-cover rounded-xl mb-4" src={products[3].image_url} />
                <h4 className="font-bold font-headline">{products[3].name}</h4>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{products[3].description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">${products[3].price.toFixed(2)}</span>
                  <Heart className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors w-5 h-5" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Restaurant Highlights */}
        <section className="bg-surface-container-low py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-tertiary-fixed rounded-full -z-10"></div>
              <img alt="Chef's Creation" className="rounded-[3rem] w-full aspect-square object-cover shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkhAM3-vSCz_ve61zDgTYGYwpG4Up3CYgiha1ROOP8LcoR94wK1JcDNOEy4crWj1GyHK9uQiLRScEhI5WNl3V7UVTI4BHzyeU2hawhvyakkYIaV_YJmz9A5UD8CJbknTyc9kUmF5ZboYzK2_a5wKG2wVOy6pWCMGfMhyQ0acJmNdX_Fp4k4PHoXAEgxpZKADDbAOxUZn8d46Aj4RqE29fdvOklJIU3zZIP73pANcqzNnDY0fX7zG3F2n7gR57TrwQpQk6TnacOYpw" />
              <div className="absolute bottom-10 -right-10 glass-card p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary-container flex items-center justify-center">
                    <Zap className="text-secondary w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase">
                      {lang === 'en' ? 'Farm to Fork' : 'De la Granja a la Mesa'}
                    </p>
                    <p className="text-sm font-semibold">
                      {lang === 'en' ? '100% Traceable Ingredients' : 'Ingredientes 100% Trazables'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-primary font-bold tracking-widest text-sm font-headline uppercase">
                {lang === 'en' ? 'Gastronomic Excellence' : 'Excelencia Gastronómica'}
              </span>
              <h3 className="text-4xl md:text-6xl font-extrabold font-headline text-on-surface mt-4 mb-8 leading-tight">
                {lang === 'en' ? 'Harvesting the Art of Fine Dining' : 'Cosechando el Arte de la Alta Cocina'}
              </h3>
              <p className="text-on-surface-variant text-xl mb-10 leading-relaxed">
                {lang === 'en'
                  ? "Our restaurant isn't just a place to eat—it's an extension of our conservatory. Experience seasonal menus where the gap between the soil and your plate is measured in mere footsteps."
                  : "Nuestro restaurante no es solo un lugar para comer, es una extensión de nuestro conservatorio. Experimente menús de temporada donde la brecha entre el suelo y su plato se mide en simples pasos."}
              </p>
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-tertiary w-6 h-6 mt-1" />
                  <div>
                    <h5 className="font-bold font-headline">
                      {lang === 'en' ? 'Seasonal Tasting Menu' : 'Menú de Degustación Estacional'}
                    </h5>
                    <p className="text-on-surface-variant text-sm">
                      {lang === 'en' ? '7 courses of botanical inspiration changing every solstice.' : '7 platos de inspiración botánica que cambian cada solsticio.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-tertiary w-6 h-6 mt-1" />
                  <div>
                    <h5 className="font-bold font-headline">
                      {lang === 'en' ? 'Conservatory Pairings' : 'Maridajes del Conservatorio'}
                    </h5>
                    <p className="text-on-surface-variant text-sm">
                      {lang === 'en' ? 'Organic wines and house-pressed botanical elixirs.' : 'Vinos orgánicos y elixires botánicos prensados en casa.'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold hover:bg-secondary/90 transition-all active:scale-95">
                  {lang === 'en' ? 'View the Menu' : 'Ver el Menú'}
                </button>
                <button className="border-2 border-primary/20 text-primary px-8 py-4 rounded-lg font-bold hover:bg-primary/5 transition-all">
                  {lang === 'en' ? 'Private Events' : 'Eventos Privados'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="glass-card p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="text-[120px] text-primary" />
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold font-headline mb-6 text-emerald-900">
              {lang === 'en' ? 'Join Our Green Circle' : 'Únete a Nuestro Círculo Verde'}
            </h3>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10">
              {lang === 'en' 
                ? "Subscribe for early access to harvest drops, chef's recipes, and exclusive conservatory event invites."
                : "Suscríbete para acceso anticipado a cosechas, recetas de chefs e invitaciones exclusivas a eventos del conservatorio."}
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-1 px-6 py-4 rounded-xl bg-white/50 border-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/50" placeholder={lang === 'en' ? "Enter your email address" : "Ingresa tu correo electrónico"} type="email" />
              <button className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all" type="submit">
                {lang === 'en' ? 'Join Now' : 'Unirse Ahora'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-md rounded-t-[2rem] z-50 shadow-[0_-4px_20px_0_rgba(25,29,21,0.06)]">
        <a className="flex flex-col items-center justify-center bg-lime-100 text-lime-800 rounded-2xl px-5 py-1.5 transition-all duration-300" href="#">
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/60 hover:text-lime-600 transition-all duration-300" href="#">
          <Zap className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Explore</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/60 hover:text-lime-600 transition-all duration-300" href="#">
          <Library className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Library</span>
        </a>
        <a className="flex flex-col items-center justify-center text-emerald-800/60 hover:text-lime-600 transition-all duration-300" href="#">
          <User className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Profile</span>
        </a>
      </nav>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 h-16 w-16 bg-tertiary-container text-white rounded-full shadow-xl flex items-center justify-center z-40 active:scale-90 transition-transform">
        <ShoppingBasket className="w-8 h-8" />
      </button>
    </div>
  );
}
