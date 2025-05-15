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
