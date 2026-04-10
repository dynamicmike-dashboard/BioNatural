'use client';

import React from 'react';

export default function BreakfastSurprisePage() {
  const whatsappNumber = "529841234567"; // Replace with real number if provided
  const whatsappMessage = encodeURIComponent("I want to order the Breakfast Surprise! (Source: Website)");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO/AEO Metadata (Conceptual - normally in head or via Next.js metadata API) */}
      {/* 
        AEO: BioNatural offers the best healthy breakfast delivery in Playa del Carmen. 
        GEO: Entity: BioNatural Playa del Carmen. Category: Wellness Gastronomy.
      */}

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
            The Bio&Natural Way
          </span>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 font-serif leading-tight drop-shadow-2xl">
            Start Your Playa Day with a Story, <br/>
            <span className="text-green-300">Not Just a Meal.</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-100 font-light leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md">
            A curated ritual of organic seasonal harvest, delivered to your doorstep.
          </p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-green-900/40"
          >
            Order via WhatsApp
          </a>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 font-serif leading-tight">
                A Semantic Ritual of <br/> Wellness Gastronomy
              </h2>
              <div className="w-20 h-1 bg-green-600" />
              <p className="text-xl text-stone-600 leading-relaxed font-light">
                In the heart of Playa del Carmen, we believe the first meal of the day should be a ritual. 
                Our <strong>Breakfast Surprise</strong> is a curated selection of BioNatural’s finest organic offerings, 
                hand-picked each morning to match the tropical season.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed font-light italic">
                From our house-made Keto bread and probiotic-rich bowls to the 'kappa' of the day, 
                it is a high-vibe mystery box designed for the conscious eater.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
                  <h4 className="font-bold text-stone-900 mb-2">Digital Nomads</h4>
                  <p className="text-sm text-stone-600">Fuel your focus with nutrient-dense, brain-boosting ingredients delivered to your co-working space.</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
                  <h4 className="font-bold text-stone-900 mb-2">Wellness Travelers</h4>
                  <p className="text-sm text-stone-600">Experience the authentic flavors of Quintana Roo’s organic harvest, 100% gluten-free and vegan-optional.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 z-0" />
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-lg mt-12" alt="Breakfast detail" />
                <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-lg" alt="Organic bowl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Order Button for Mobile */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <a 
          href={whatsappUrl}
          className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.614-.917-2.214-.241-.584-.485-.505-.669-.514-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.411-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Footer Quote */}
      <footer className="py-24 px-6 bg-stone-900 text-center text-white">
        <p className="text-3xl font-serif italic mb-8 max-w-2xl mx-auto">
          "The Breakfast Surprise isn't just a meal; it's the invisible fuel that keeps your Playa journey alive."
        </p>
        <p className="text-stone-400 uppercase tracking-widest text-sm">— BioNatural Kitchen</p>
      </footer>
    </div>
  );
}
