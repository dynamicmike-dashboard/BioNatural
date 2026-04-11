import Footer from "@/components/Footer";

export default function PrivacyPage({ searchParams }: { searchParams: { lang?: string } }) {
  const lang = searchParams.lang || "en";
  return (
    <div className="min-h-screen pt-32">
      <main className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <h1 className="text-4xl font-black font-display text-stone-900 border-b border-stone-100 pb-8 tracking-tighter">
          {lang === "en" ? "Privacy Policy" : "Política de Privacidad"}
        </h1>
        <div className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed font-medium">
          <p>
            {lang === "en" 
              ? "Your privacy is important to us. It is BioNatural's policy to respect your privacy regarding any information we may collect from you across our website." 
              : "Su privacidad es importante para nosotros. Es política de BioNatural respetar su privacidad con respecto a cualquier información que podamos recopilar de usted a través de nuestro sitio web."}
          </p>
          <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-6">1. Information We Collect</h2>
          <p>
            {lang === "en"
              ? "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent."
              : "Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. La recopilamos por medios justos y legales, con su conocimiento y consentimiento."}
          </p>
          {/* Add more filler content if needed */}
        </div>
      </main>
      <Footer lang={lang as string} />
    </div>
  );
}
