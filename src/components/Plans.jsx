import { CheckCircle, XCircle, Star } from 'lucide-react'; // ✅ Ícones do Lucide

export default function Planos() {
  return (
    <section id="planos" className="py-16 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-10">Escolha seu plano</h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        {/* Plano Gratuito */}
        <div className="bg-white border p-6 rounded shadow w-full max-w-sm text-center">
          <h3 className="text-xl font-bold mb-2">Gratuito</h3>
          <p className="mb-4 text-gray-600">Ideal para testar o sistema</p>
          <p className="text-3xl font-bold mb-6">R$ 0</p>
          <ul className="mb-6 text-sm text-left space-y-3">
            <li className="flex items-center gap-2 text-gray-800"><CheckCircle size={16} className="text-green-600" /> 1 orçamento</li>
            <li className="flex items-center gap-2 text-gray-800"><CheckCircle size={16} className="text-green-600" /> Painel de controle</li>
            <li className="flex items-center gap-2 text-gray-500"><XCircle size={16} className="text-red-400" /> Suporte prioritário</li>
            <li className="flex items-center gap-2 text-gray-500"><XCircle size={16} className="text-red-400" /> Logo no PDF</li>
            <li className="flex items-center gap-2 text-gray-500"><XCircle size={16} className="text-red-400" /> Envio automático por WhatsApp</li>
          </ul>
          <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
            Começar grátis
          </a>
        </div>

        {/* Plano Pro com destaque */}
        <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded shadow w-full max-w-sm text-center relative">
          {/* Selo de destaque */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star size={14} className="text-white" />
            Mais Popular
          </div>
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <p className="mb-4 text-gray-600">Para profissionais e empresas</p>
          <p className="text-3xl font-bold mb-6">R$ 37,90/mês</p>
          <ul className="mb-6 text-sm text-left space-y-3">
            <li className="flex items-center gap-2 text-gray-800"><CheckCircle size={16} className="text-green-600" /> Orçamentos ilimitados</li>
            <li className="flex items-center gap-2 text-gray-800"><CheckCircle size={16} className="text-green-600" /> Suporte prioritário</li>
            <li className="flex items-center gap-2 text-gray-800"><CheckCircle size={16} className="text-green-600" /> Logo no PDF</li>
            <li className="flex items-center gap-2 text-gray-800"><CheckCircle size={16} className="text-green-600" /> Envio automático por WhatsApp</li>
            <li className="flex items-center gap-2 text-gray-800"><CheckCircle size={16} className="text-green-600" /> Histórico de faturas</li>
          </ul>
          <a href="/register" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 inline-block">
            Assinar agora
          </a>
        </div>
      </div>
    </section>
  );
}
