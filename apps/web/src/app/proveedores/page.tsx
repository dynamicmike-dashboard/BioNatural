'use client';

import React, { useState } from 'react';

export default function ProviderSurveyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Logic to save to Supabase and trigger n8n will go here
    // For now, we simulate success
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">¡Solicitud Enviada!</h2>
          <p className="text-stone-600 mb-6">
            Gracias por interesarte en ser parte de BioNatural. Hemos recibido tus datos y nuestro equipo los revisará en breve.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4 font-serif">Nuevos Proveedores</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            ¿Eres productor de alimentos orgánicos, agro-ecológicos o saludables? Únete a la red de bienestar más reconocida de Playa del Carmen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8 sm:p-12 space-y-8">
            {/* Section 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nombre de tu empresa *</label>
                <input required type="text" name="company_name" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Razón social *</label>
                <input required type="text" name="business_name" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">RFC *</label>
                <input required type="text" name="rfc" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Tipo de Productos *</label>
                <select required name="product_type" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all">
                  <option value="">Selecciona una opción</option>
                  <option value="organico">Orgánico</option>
                  <option value="agro-ecologico">Agro-ecológico</option>
                  <option value="gluten-free">Gluten Free</option>
                  <option value="saludable">Saludable</option>
                </select>
              </div>
            </div>

            {/* Section 2: Detailed Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">¿Qué características tienen tus productos? *</label>
                <textarea required name="characteristics" rows={3} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">¿Qué certificaciones poseen?</label>
                <input type="text" name="certifications" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            {/* Section 3: Market & Credit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">¿Vendes en Playa del Carmen? *</label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="sold_in_pdc" value="yes" className="text-green-600 focus:ring-green-500" />
                    <span>Sí</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="sold_in_pdc" value="no" className="text-green-600 focus:ring-green-500" />
                    <span>No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">¿Dónde? (opcional)</label>
                <input type="text" name="sold_where" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Tiempo en el mercado *</label>
                <input required type="text" name="time_in_market" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">¿Crédito de 1 mes? *</label>
                <select required name="credit_capacity" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all">
                  <option value="">Selecciona una opción</option>
                  <option value="yes">Sí, tengo capacidad</option>
                  <option value="no">No por el momento</option>
                </select>
              </div>
            </div>

            {/* Section 4: Contact */}
            <div className="border-t border-stone-100 pt-8 mt-8">
              <h3 className="text-lg font-semibold text-stone-900 mb-6 font-serif">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Representante *</label>
                  <input required type="text" name="rep_name" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
                  <input required type="email" name="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Teléfono *</label>
                  <input required type="tel" name="phone" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Section 5: Files (Placeholders) */}
            <div className="bg-stone-50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-2 border-dashed border-stone-200">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Catálogo o Ficha Técnica *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-stone-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p className="mb-2 text-sm text-stone-500"><span className="font-semibold">Subir archivo</span></p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Lista de Precios *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-stone-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p className="mb-2 text-sm text-stone-500"><span className="font-semibold">Subir archivo</span></p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 p-8 sm:px-12 flex items-center justify-between">
            <p className="text-stone-400 text-sm hidden sm:block">
              * Campos obligatorios
            </p>
            <button 
              disabled={loading}
              type="submit" 
              className={`w-full sm:w-auto px-12 py-4 bg-white text-stone-900 rounded-xl font-bold hover:bg-stone-100 transition-all transform active:scale-95 flex items-center justify-center space-x-2 ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-stone-900" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Procesando...</span>
                </>
              ) : (
                <span>Enviar Solicitud</span>
              )}
            </button>
          </div>
        </form>
        
        <p className="text-center mt-12 text-stone-500 text-sm italic">
          "The Bio&Natural way® – Logrando un estilo de vida en balance."
        </p>
      </div>
    </div>
  );
}
