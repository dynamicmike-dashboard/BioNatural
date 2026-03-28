import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Zap, Languages, Home, Library, User, ShoppingBasket, X, Database, Instagram, Search, Loader2, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: 'en' | 'es';
  setLang: (lang: 'en' | 'es') => void;
  showEngine: boolean;
  setShowEngine: (show: boolean) => void;
  products: Product[];
  instaKeyword: string;
  setInstaKeyword: (k: string) => void;
  instaReply: any;
  isSimulatingInsta: boolean;
  simulateInstagram: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  handleSearch: () => void;
  searchResults: any;
  isSearching: boolean;
  routedOrder: any;
  isRouting: boolean;
  simulateOrderRouting: () => void;
  cartCount: number;
  addToCart: (product: Product) => void;
}

export default function Layout({
  children,
  lang,
  setLang,
  showEngine,
  setShowEngine,
  products,
  instaKeyword,
  setInstaKeyword,
  instaReply,
  isSimulatingInsta,
  simulateInstagram,
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchResults,
  isSearching,
  routedOrder,
  isRouting,
  simulateOrderRouting,
  cartCount,
  addToCart
}: LayoutProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-container/30">
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl shadow-sm shadow-emerald-900/5">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-emerald-50 rounded-full transition-colors md:hidden"
            >
              <Menu className="text-emerald-900 w-6 h-6 cursor-pointer" />
            </button>
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <img alt="BioNatural Logo" className="h-8 w-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEhc0XY-Z9xxFBHBHtCfJTed0xIckNwy-Zu7O1f6wv5aiA-t8INoSfcFPmNOkKVu9pPUmQem9CFfsZEC2W6Yr8BO4MEaenSEB1UhIaOe1zKG26u5kzzKI5vk6ywNyeYB5tBcDnbtnJV6LuUHIvPTfHfcC0JoHofHE8Bs_0pSnhMCF-rOGGx7NZlO0QfUnZ_UnFmUVA9MhmaxNajdecb74Yl13risrbQbsXF2fEW_pd-ZjtbFIBqz-QRM5gp4cx42RIgxLbPffJXPc" />
              <span className="text-2xl font-bold tracking-tight text-emerald-900 font-headline">BioNatural</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`${isActive('/') ? 'text-lime-700 font-semibold' : 'text-emerald-800/70'} font-label transition-colors px-2 py-1 rounded hover:bg-lime-50/50`} >Home</Link>
            <Link to="/explore" className={`${isActive('/explore') ? 'text-lime-700 font-semibold' : 'text-emerald-800/70'} font-label transition-colors px-2 py-1 rounded hover:bg-lime-50/50`} >Explore</Link>
            <Link to="/library" className={`${isActive('/library') ? 'text-lime-700 font-semibold' : 'text-emerald-800/70'} font-label transition-colors px-2 py-1 rounded hover:bg-lime-50/50`} >Library</Link>
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
            <Link to="/profile" className="h-8 w-8 rounded-full bg-primary-container/20 flex items-center justify-center overflow-hidden border border-primary/10">
              <img alt="User profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqYsWsuLVcuNwBAQ3CbTi1WUjnhVaLK24NIlO3vO3MbsEglSe6YtFJB-oNv_OtJzDuUMxuZJS2ObIe1Agd1YBjaiutTPWnCXXLwZ_sieIemkprzPjaBYo8h-6hpTKpOea4Z-VloAoZc6zxJb26ffJLScRYSJWzJDjt8z0x_ZfGqYn9YPigWKpxD-eWeRSpuZHHYIzl2B2VhcW3zQtVwgvxW78bCeWhHNJQRNT-ii98igQdNB5A0__Zo_lJ8To68KVRPL_zeyefpLg" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[100] bg-emerald-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="p-8 space-y-8 h-full flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white font-headline">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-white hover:text-primary transition-colors">Home</Link>
                <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-white hover:text-primary transition-colors">Explore</Link>
                <Link to="/library" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-white hover:text-primary transition-colors">Library</Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-white hover:text-primary transition-colors">Profile</Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-white hover:text-primary transition-colors">Cart</Link>
              </div>
              <div className="mt-auto pt-8 border-t border-white/10">
                <button 
                  onClick={() => { setLang(lang === 'en' ? 'es' : 'en'); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Languages className="w-6 h-6" />
                  <span className="text-lg font-bold">{lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

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
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-400 font-bold">${r.price.toFixed(2)}</span>
                                  <button 
                                    onClick={() => addToCart(r)}
                                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                  >
                                    <ShoppingBasket className="w-3 h-3" />
                                  </button>
                                </div>
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

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-md rounded-t-[2rem] z-50 shadow-[0_-4px_20px_0_rgba(25,29,21,0.06)]">
        <Link to="/" className={`flex flex-col items-center justify-center ${isActive('/') ? 'bg-lime-100 text-lime-800' : 'text-emerald-800/60'} rounded-2xl px-5 py-1.5 transition-all duration-300`}>
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Home</span>
        </Link>
        <Link to="/explore" className={`flex flex-col items-center justify-center ${isActive('/explore') ? 'bg-lime-100 text-lime-800' : 'text-emerald-800/60'} rounded-2xl px-5 py-1.5 transition-all duration-300`}>
          <Zap className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Explore</span>
        </Link>
        <Link to="/library" className={`flex flex-col items-center justify-center ${isActive('/library') ? 'bg-lime-100 text-lime-800' : 'text-emerald-800/60'} rounded-2xl px-5 py-1.5 transition-all duration-300`}>
          <Library className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Library</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center justify-center ${isActive('/profile') ? 'bg-lime-100 text-lime-800' : 'text-emerald-800/60'} rounded-2xl px-5 py-1.5 transition-all duration-300`}>
          <User className="w-6 h-6" />
          <span className="text-xs font-medium font-label mt-1">Profile</span>
        </Link>
      </nav>

      {/* Floating Action Button (Cart) */}
      <Link to="/cart" className="fixed bottom-24 right-6 md:bottom-10 md:right-10 h-16 w-16 bg-tertiary-container text-white rounded-full shadow-xl flex items-center justify-center z-40 active:scale-90 transition-transform">
        <div className="relative">
          <ShoppingBasket className="w-8 h-8" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
