// src/components/Beneficios.jsx
import { CheckCircle, Zap, Bot, ClipboardList, Gift } from 'lucide-react';

export default function Beneficios() {
  const beneficios = [
    {
      titulo: "PDF instantâneo",
      descricao: "Crie orçamentos profissionais em segundos.",
      icone: <ClipboardList className="w-8 h-8 text-white" />,
      gradiente: "from-blue-500 to-indigo-600"
    },
    {
      titulo: "Envio por WhatsApp",
      descricao: "Envie automaticamente os orçamentos para seus clientes.",
      icone: <Zap className="w-8 h-8 text-white" />,
      gradiente: "from-green-500 to-emerald-600"
    },
    {
      titulo: "IA inteligente",
      descricao: "Entende mensagens de texto e voz para gerar orçamentos.",
      icone: <Bot className="w-8 h-8 text-white" />,
      gradiente: "from-purple-500 to-fuchsia-600"
    },
    {
      titulo: "Painel de controle",
      descricao: "Acompanhe e organize seus orçamentos com facilidade.",
      icone: <CheckCircle className="w-8 h-8 text-white" />,
      gradiente: "from-yellow-500 to-amber-600"
    },
    {
      titulo: "Plano gratuito",
      descricao: "Comece agora mesmo sem pagar nada.",
      icone: <Gift className="w-8 h-8 text-white" />,
      gradiente: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <section id="beneficios" className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Benefícios do <span className="text-blue-600">ZapOrçamento</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {beneficios.map((b, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 bg-gradient-to-br ${b.gradiente} text-white`}
            style={{ animation: `fadeIn 0.3s ease ${idx * 0.1}s both` }}
          >
            <div className="flex justify-center mb-4">{b.icone}</div>
            <h3 className="text-xl font-semibold mb-2 text-center">{b.titulo}</h3>
            <p className="text-sm text-center opacity-90">{b.descricao}</p>
          </div>
        ))}
      </div>

      {/* Fade-in animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
}
