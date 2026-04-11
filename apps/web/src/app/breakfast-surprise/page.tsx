import React from 'react';
import Footer from "@/components/Footer";

export default async function BreakfastSurprisePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ lang?: string }> 
}) {
  const { lang = "en" } = await searchParams;
  const whatsappNumber = "529841473181"; 
  const whatsappMessage = encodeURIComponent(lang === "en" 
    ? "I want to order the Breakfast Surprise! (Source: Website)" 
    : "¡Quiero pedir el Desayuno Sorpresa! (Fuente: Sitio Web)");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-149485981460c-3c0a9c6a594d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-80"
            alt="Organic Breakfast"
          />
          <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <span className="text-white/80 font-bold tracking-[0.3em] uppercase text-sm mb-6 block drop-shadow-md">
            {lang === "en" ? "The Bio&Natural Way" : "El Estilo Bio&Natural"}
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 font-display leading-[0.8] tracking-tighter drop-shadow-2xl">
            {lang === "en" ? "Start Your Playa Day with a Story," : "Empieza tu Día en Playa con una Historia,"} <br/>
            <span className="text-primary">{lang === "en" ? "Not Just a Meal." : "No Solo una Comida."}</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-100 font-medium leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md">
            {lang === "en" 
              ? "A curated ritual of organic seasonal harvest, delivered to your doorstep." 
              : "Un ritual curado de cosecha orgánica de temporada, entregado en tu puerta."}
          </p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-primary/40"
          >
            {lang === "en" ? "Order via WhatsApp" : "Pedir vía WhatsApp"}
          </a>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-stone-900 font-display leading-[0.9] tracking-tighter">
                {lang === "en" 
                  ? "A Semantic Ritual of Wellness Gastronomy" 
                  : "Un Ritual Semántico de Gastronomía de Bienestar"}
              </h2>
              <div className="w-20 h-2 bg-primary" />
              <p className="text-xl text-stone-600 leading-relaxed font-medium">
                {lang === "en"
                  ? "In the heart of Playa del Carmen, we believe the first meal of the day should be a ritual."
                  : "En el corazón de Playa del Carmen, creemos que la primera comida del día debe ser un ritual."}
                {lang === "en"
                  ? "Our Breakfast Surprise is a curated selection of BioNatural’s finest organic offerings, hand-picked each morning."
                  : "Nuestro Desayuno Sorpresa es una selección curada de las mejores ofertas orgánicas de BioNatural."}
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100">
                  <h4 className="font-black text-stone-900 mb-2 uppercase tracking-widest text-xs">
                    {lang === "en" ? "Digital Nomads" : "Nómadas Digitales"}
                  </h4>
                  <p className="text-sm text-stone-600 font-medium lowercase first-letter:uppercase">
                    {lang === "en" 
                      ? "Fuel your focus with nutrient-dense, brain-boosting ingredients." 
                      : "Alimenta tu enfoque con ingredientes densos en nutrientes."}
                  </p>
                </div>
                <div className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100">
                  <h4 className="font-black text-stone-900 mb-2 uppercase tracking-widest text-xs">
                    {lang === "en" ? "Wellness Travelers" : "Viajeros de Bienestar"}
                  </h4>
                  <p className="text-sm text-stone-600 font-medium lowercase first-letter:uppercase">
                    {lang === "en" 
                      ? "Experience authentic flavors, 100% gluten-free and vegan-optional." 
                      : "Vive sabores auténticos, 100% libres de gluten y opción vegana."}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 z-0" />
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl mt-12" alt="Breakfast detail" />
                <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl" alt="Organic bowl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang as string} />
    </div>
  );
}
