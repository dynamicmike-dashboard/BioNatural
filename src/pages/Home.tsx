import React from 'react';
import { ShoppingBag, MapPin, Globe, ArrowRight, CheckCircle2, Utensils, Zap } from 'lucide-react';
import { Product } from '../types';

interface HomeProps {
  lang: 'en' | 'es';
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function Home({ lang, products, addToCart }: HomeProps) {
  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-16 pb-24 md:pb-0">
      {/* Hero Split Section */}
      <section className="flex flex-col md:flex-row h-[795px] min-h-[600px] w-full overflow-hidden">
        {/* Market Side */}
        <div className="relative flex-1 group overflow-hidden cursor-pointer" onClick={scrollToProducts}>
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
              <button 
                onClick={(e) => { e.stopPropagation(); scrollToProducts(); }}
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
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
              <button 
                onClick={() => alert(lang === 'en' ? 'Reservations coming soon!' : '¡Reservaciones próximamente!')}
                className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 active:scale-95"
              >
                {lang === 'en' ? 'Book a Table' : 'Reservar Mesa'}
                <Utensils className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section (Bento Grid) */}
      <section id="products-section" className="max-w-7xl mx-auto px-6 py-20">
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
          {products[1] && (
            <div className="md:col-span-2 md:row-span-2 glass-card rounded-[2rem] p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className="z-10">
                <div className="bg-primary-container/20 w-fit px-4 py-1 rounded-full text-primary font-bold text-xs mb-4 uppercase">
                  {lang === 'en' ? 'Best Seller' : 'Más Vendido'}
                </div>
                <h4 className="text-3xl font-bold font-headline mb-4">{products[1].name}</h4>
                <p className="text-on-surface-variant">{products[1].description}</p>
              </div>
              <div className="mt-8 flex items-center justify-between z-10">
                <span className="text-3xl font-bold text-primary">${products[1].price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(products[1])}
                  className="bg-primary text-on-primary p-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-90"
                >
                  <ShoppingBag className="w-6 h-6" />
                </button>
              </div>
              <img alt={products[1].name} className="absolute bottom-0 right-0 w-2/3 h-2/3 object-contain opacity-40 group-hover:scale-110 transition-transform duration-500" src={products[1].image_url} />
            </div>
          )}

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
                <button 
                  onClick={() => addToCart(products[0])}
                  className="text-primary font-bold text-sm flex items-center gap-1 hover:text-primary/80 transition-colors"
                >
                  {lang === 'en' ? 'Add to Cart' : 'Añadir al Carrito'} <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {products[2] && (
            <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between">
              <img alt={products[2].name} className="w-full h-32 object-cover rounded-xl mb-4" src={products[2].image_url} />
              <h4 className="font-bold font-headline">{products[2].name}</h4>
              <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{products[2].description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-primary">${products[2].price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(products[2])}
                  className="p-2 bg-primary-container/20 text-primary rounded-lg hover:bg-primary-container/30 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {products[3] && (
            <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between">
              <img alt={products[3].name} className="w-full h-32 object-cover rounded-xl mb-4" src={products[3].image_url} />
              <h4 className="font-bold font-headline">{products[3].name}</h4>
              <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{products[3].description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-primary">${products[3].price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(products[3])}
                  className="p-2 bg-primary-container/20 text-primary rounded-lg hover:bg-primary-container/30 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
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
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => alert(lang === 'en' ? 'Menu coming soon!' : '¡Menú próximamente!')}
                className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold hover:bg-secondary/90 transition-all active:scale-95"
              >
                {lang === 'en' ? 'View the Menu' : 'Ver el Menú'}
              </button>
              <button 
                onClick={() => alert(lang === 'en' ? 'Private events inquiry coming soon!' : '¡Consulta de eventos privados próximamente!')}
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-bold hover:bg-secondary/5 transition-all active:scale-95"
              >
                {lang === 'en' ? 'Private Events' : 'Eventos Privados'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-5xl font-extrabold font-headline mb-6">
            {lang === 'en' ? 'Join the Botanical Circle' : 'Únete al Círculo Botánico'}
          </h3>
          <p className="text-white/60 text-lg mb-10">
            {lang === 'en' 
              ? 'Receive exclusive harvest updates, seasonal recipes, and invitations to our conservatory events.'
              : 'Reciba actualizaciones exclusivas de cosecha, recetas de temporada e invitaciones a nuestros eventos del conservatorio.'}
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input 
              type="email" 
              placeholder={lang === 'en' ? 'Your email address' : 'Su dirección de correo electrónico'}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button type="submit" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95">
              {lang === 'en' ? 'Join Now' : 'Unirse Ahora'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
