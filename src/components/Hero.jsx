// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* 🧠 Headline poderosa */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
          Transforme mensagens no WhatsApp em orçamentos profissionais com IA
        </h1>

        {/* 💥 Subheadline com benefícios claros */}
        <p className="text-lg sm:text-xl mb-8">
          Pare de perder tempo com planilhas. Impressione seus clientes com PDFs prontos, automáticos e enviados em segundos.
        </p>

        {/* 🔥 Botão com animação pulse */}
        <a
          href="/register"
          className="inline-block bg-white text-blue-700 font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
        >
          Experimente grátis — sem cartão
        </a>

        {/* 🔒 Prova social + garantia */}
        <p className="text-sm text-blue-100 mt-4 italic">
          Mais de 2.000 profissionais já usam o ZapOrçamento para vender mais rápido.
        </p>
        <p className="text-sm text-blue-200 mt-1">
          🔒 Garantia sem risco: cancele a qualquer momento.
        </p>
      </div>
    </section>
  );
}
