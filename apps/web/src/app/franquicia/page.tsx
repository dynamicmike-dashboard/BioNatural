'use client';

import React, { useState } from 'react';

export default function FranchisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
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
          <h2 className="text-2xl font-bold text-stone-900 mb-2">¡Solicitud Recibida!</h2>
          <p className="text-stone-600 mb-6">
            Agradecemos tu interés en formar parte de la familia BioNatural. Nuestro equipo de expansión revisará tu perfil cuidadosamente.
          </p>
          <button onClick={() => setSubmitted(false)} className="w-full py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors">Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-green-600 font-bold tracking-[0.3em] uppercase text-xs">Oportunidad de Inversión</span>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 font-serif">Franquicias BioNatural</h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Únete al movimiento de bienestar consciente líder en la Riviera Maya. Un modelo probado, sustentable y con propósito.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="p-8 md:p-16 space-y-16">
            
            {/* Section 1: Introduction */}
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-600 italic border-l-4 border-green-600 pl-6 leading-relaxed">
                Agradecemos su interés en nuestra franquicia BIO-Natural. Debido a la importancia de su proyecto de inversión le solicitamos leer cuidadosamente y contestar el presente cuestionario.
              </p>
            </div>

            {/* Section 2: Personal Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-stone-900 font-serif border-b border-stone-100 pb-4">1. Datos de Contacto y Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Nombre completo *</label>
                  <input required type="text" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Correo electrónico *</label>
                  <input required type="email" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Teléfono *</label>
                  <input required type="tel" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Edad *</label>
                  <input required type="number" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Nivel de estudios *</label>
                  <select required className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none">
                    <option value="">Seleccionar...</option>
                    <option value="licenciatura">Licenciatura</option>
                    <option value="maestria">Maestría o Post-grado</option>
                    <option value="preparatoria">Educación Preparatoria</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Experience */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-stone-900 font-serif border-b border-stone-100 pb-4">2. Experiencia Profesional</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">¿Tiene experiencia en negocios relacionados con alimentos y bebidas? *</label>
                  <textarea required className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" rows={3}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">¿Ha tenido experiencia en negocios propios o franquicias anteriores? *</label>
                  <textarea required className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" rows={3}></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Ocupación Actual *</label>
                    <input required type="text" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Ingreso Mensual Promedio *</label>
                    <input required type="text" placeholder="Incluya moneda" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Operación y Finanzas */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-stone-900 font-serif border-b border-stone-100 pb-4">3. Operación y Perfil de Inversión</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">¿Quién operaría la franquicia? *</label>
                  <input required type="text" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Capital disponible para invertir *</label>
                  <input required type="text" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-stone-700 mb-1">Ciudad o ciudades de interés *</label>
                    <input required type="text" className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">¿Por qué desea adquirir una franquicia BioNatural? *</label>
                  <textarea required className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" rows={4}></textarea>
                </div>
              </div>
            </div>

            {/* Section 5: Legal */}
            <div className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100">
              <div className="flex items-start space-x-4">
                <input required type="checkbox" className="mt-1 w-5 h-5 text-green-600 rounded border-stone-300 focus:ring-green-500" />
                <p className="text-sm text-stone-500 leading-relaxed">
                  Manifiesto que toda la información presentada en este cuestionario es correcta y verdadera. Estoy enterado de que cualquier falsedad puede constituir motivo para la rescisión del futuro contrato.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 p-8 md:px-16 flex items-center justify-between mt-auto">
            <p className="text-stone-400 text-sm hidden md:block">BioNatural Expansion Hub © 2026</p>
            <button 
              disabled={loading}
              type="submit" 
              className={`w-full md:w-auto px-16 py-5 bg-white text-stone-900 rounded-2xl font-bold text-xl hover:bg-stone-50 transition-all transform active:scale-95 flex items-center justify-center space-x-2 ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
