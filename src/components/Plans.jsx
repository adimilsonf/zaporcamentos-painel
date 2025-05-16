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
          <p className="text-3xl font-bold mb-4">R$ 37,90/mês</p>
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
