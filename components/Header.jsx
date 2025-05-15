// Header.jsx
export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">ZapOrçamento</h1>
      <nav className="space-x-4">
        <a href="#beneficios" className="text-gray-700 hover:text-blue-600">Benefícios</a>
        <a href="#planos" className="text-gray-700 hover:text-blue-600">Planos</a>
        <a href="#faq" className="text-gray-700 hover:text-blue-600">Dúvidas</a>
        <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Acessar Painel</a>
      </nav>
    </header>
  );
}
