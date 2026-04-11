import Footer from "@/components/Footer";

export default function TermsPage({ searchParams }: { searchParams: { lang?: string } }) {
  const lang = searchParams.lang || "en";
  return (
    <div className="min-h-screen pt-32">
      <main className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <h1 className="text-4xl font-black font-display text-stone-900 border-b border-stone-100 pb-8 tracking-tighter">
          {lang === "en" ? "Terms of Service" : "Términos de Servicio"}
        </h1>
        <div className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed font-medium">
          <p>
            {lang === "en" 
              ? "By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations." 
              : "Al acceder a nuestro sitio web, usted acepta estar sujeto a estos términos de servicio, a todas las leyes y regulaciones aplicables."}
          </p>
          <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-6">1. Usage License</h2>
          <p>
            {lang === "en"
              ? "Permission is granted to temporarily download one copy of the materials (information or software) on BioNatural's website for personal, non-commercial transitory viewing only."
              : "Se otorga permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de BioNatural solo para visualización transitoria personal y no comercial."}
          </p>
        </div>
      </main>
      <Footer lang={lang as string} />
    </div>
  );
}
