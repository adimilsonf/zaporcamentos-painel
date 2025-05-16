// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* 🧠 Headline com promessa poderosa */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
          Transforme mensagens no WhatsApp em orçamentos profissionais com IA
        </h1>

        {/* 💥 Subheadline com apelo emocional + benefício direto */}
        <p className="text-lg sm:text-xl mb-8">
          Pare de perder tempo com planilhas. Impressione seus clientes com PDFs prontos, automáticos e enviados em segundos.
        </p>

        {/* 🔥 CTA forte com senso de urgência e sem risco */}
        <a
          href="/register"
          className="bg-white text-blue-700 font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Experimente grátis — sem cartão
        </a>

        {/* 🔒 Selo de segurança e prova social leve */}
        <p className="text-sm text-blue-100 mt-4 italic">
          Mais de 2.000 profissionais já usam o ZapOrçamento para vender mais rápido.
        </p>
      </div>
    </section>
  );
}
