// src/components/Hero.jsx
import { ShieldCheck, Users } from 'lucide-react';

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

        {/* 🧩 Prova social e garantia com estilo e ícones */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-blue-100">
            <Users className="w-5 h-5 text-white" />
            <span className="italic">
              Utilizado por mais de <span className="font-semibold text-white">2.000 profissionais</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>
              <span className="font-semibold text-white">Garantia sem risco:</span> cancele a qualquer momento
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
