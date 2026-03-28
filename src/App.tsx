import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Product, CartItem } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

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

  const [cart, setCart] = useState<CartItem[]>([]);

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
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Layout
        lang={lang}
        setLang={setLang}
        showEngine={showEngine}
        setShowEngine={setShowEngine}
        products={products}
        instaKeyword={instaKeyword}
        setInstaKeyword={setInstaKeyword}
        instaReply={instaReply}
        isSimulatingInsta={isSimulatingInsta}
        simulateInstagram={simulateInstagram}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        searchResults={searchResults}
        isSearching={isSearching}
        routedOrder={routedOrder}
        isRouting={isRouting}
        simulateOrderRouting={simulateOrderRouting}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        addToCart={addToCart}
      >
        <Routes>
          <Route path="/" element={<Home lang={lang} products={products} addToCart={addToCart} />} />
          <Route path="/explore" element={<Explore lang={lang} />} />
          <Route path="/library" element={<Library lang={lang} />} />
          <Route path="/profile" element={<Profile lang={lang} />} />
          <Route path="/cart" element={<Cart lang={lang} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
