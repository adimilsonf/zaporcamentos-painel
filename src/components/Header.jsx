// components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // ✅ Importa a nova logo azul

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* ✅ Substitui o texto pelo logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Zap Orçamento" className="h-10 w-auto" />
        </div>

        {/* Botão menu mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6">
          <a href="#beneficios" className="text-gray-700 hover:text-blue-600">Benefícios</a>
          <a href="#planos" className="text-gray-700 hover:text-blue-600">Planos</a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600">Dúvidas</a>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Acessar Painel
          </Link>
        </nav>
      </div>

      {/* Menu mobile dropdown */}
      {menuAberto && (
        <div className="md:hidden bg-white shadow px-4 py-3 space-y-2">
          <a href="#beneficios" className="block text-gray-700 hover:text-blue-600">Benefícios</a>
          <a href="#planos" className="block text-gray-700 hover:text-blue-600">Planos</a>
          <a href="#faq" className="block text-gray-700 hover:text-blue-600">Dúvidas</a>
          <Link
            to="/login"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Acessar Painel
          </Link>
        </div>
      )}
    </header>
  );
}
