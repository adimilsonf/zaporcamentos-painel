import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      pergunta: 'Preciso pagar para testar?',
      resposta: 'Não! Temos um plano gratuito com 1 orçamento para você testar à vontade.'
    },
    {
      pergunta: 'Funciona com áudio também?',
      resposta: 'Sim. A IA interpreta áudios ou mensagens escritas no WhatsApp.'
    },
    {
      pergunta: 'É preciso instalar algo?',
      resposta: 'Não, tudo funciona direto do seu WhatsApp e navegador.'
    },
    {
      pergunta: 'Posso cancelar quando quiser?',
      resposta: 'Claro! O plano Pro é mensal e pode ser cancelado a qualquer momento.'
    }
  ];

  const [aberto, setAberto] = useState(null);

  const toggleFAQ = (index) => {
    setAberto(aberto === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Dúvidas Frequentes
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            onClick={() => toggleFAQ(idx)}
            className="cursor-pointer border-l-4 border-blue-600 bg-gray-50 hover:bg-gray-100 p-5 rounded shadow transition duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-gray-800">{faq.pergunta}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${aberto === idx ? 'rotate-180' : ''
                  }`}
              />
            </div>

            {aberto === idx && (
              <p className="text-sm text-gray-700 mt-3">{faq.resposta}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
