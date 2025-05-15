// components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Crie orçamentos em PDF via WhatsApp com IA</h1>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Automatize seus orçamentos, ganhe tempo e impressione seus clientes com propostas profissionais em minutos.
      </p>
      <a href="/register" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100">
        Comece agora gratuitamente
      </a>
    </section>
  );
}

// components/Beneficios.jsx
export default function Beneficios() {
  const beneficios = [
    "Orçamentos em PDF instantâneos",
    "Envio automático pelo WhatsApp",
    "IA entende mensagens de texto ou voz",
    "Painel para acompanhar seus orçamentos",
    "Plano gratuito disponível"
  ];

  return (
    <section id="beneficios" className="py-16 bg-gray-100 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Benefícios do ZapOrçamento</h2>
      <ul className="grid gap-4 max-w-3xl mx-auto">
        {beneficios.map((b, idx) => (
          <li key={idx} className="bg-white p-4 rounded shadow text-center font-medium">
            ✅ {b}
          </li>
        ))}
      </ul>
    </section>
  );
}

// components/Planos.jsx
export default function Planos() {
  return (
    <section id="planos" className="py-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Escolha seu plano</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="bg-white border p-6 rounded shadow w-full max-w-sm text-center">
          <h3 className="text-xl font-bold mb-2">Gratuito</h3>
          <p className="mb-4">Ideal para testar o sistema</p>
          <p className="text-3xl font-bold mb-4">R$ 0</p>
          <ul className="mb-6 text-sm">
            <li>✅ 1 orçamento</li>
            <li>✅ Painel de controle</li>
            <li>❌ Suporte prioritário</li>
          </ul>
          <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
            Começar grátis
          </a>
        </div>
        <div className="bg-yellow-100 border-2 border-yellow-400 p-6 rounded shadow w-full max-w-sm text-center">
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <p className="mb-4">Para profissionais e empresas</p>
          <p className="text-3xl font-bold mb-4">R$ 19,90/mês</p>
          <ul className="mb-6 text-sm">
            <li>✅ Orçamentos ilimitados</li>
            <li>✅ Suporte prioritário</li>
            <li>✅ Logo no PDF</li>
          </ul>
          <a href="/register" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 inline-block">
            Assinar agora
          </a>
        </div>
      </div>
    </section>
  );
}

// components/FAQ.jsx
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

// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="py-6 bg-gray-800 text-white text-center text-sm">
      <p>© {new Date().getFullYear()} ZapOrçamento. Todos os direitos reservados.</p>
    </footer>
  );
}
