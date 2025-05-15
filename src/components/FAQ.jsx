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

  return (
    <section id="faq" className="py-16 px-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8">Dúvidas Frequentes</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded shadow">
            <p className="font-semibold">❓ {faq.pergunta}</p>
            <p className="text-sm text-gray-700 mt-1">{faq.resposta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
