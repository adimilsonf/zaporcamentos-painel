// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const sair = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* ✅ Logo */}
      <Link to="/dashboard" className="flex items-center">
        <img src={logo} alt="ZapOrçamento" className="h-10" />
      </Link>

      {/* ✅ Botão de menu mobile */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* ✅ Menu desktop */}
      <div className="hidden md:flex items-center space-x-6 text-sm">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Orçamentos</Link>
        <Link to="/novo" className="text-gray-700 hover:text-blue-600">Novo</Link>
        <button onClick={sair} className="text-red-500 hover:underline">Sair</button>
      </div>

      {/* ✅ Menu mobile (dropdown) */}
      {menuAberto && (
        <div className="absolute top-16 left-0 w-full bg-white border-t md:hidden shadow z-50 px-6 py-4 space-y-3 text-sm">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuAberto(false)}>Orçamentos</Link>
          <Link to="/novo" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuAberto(false)}>Novo</Link>
          <button onClick={sair} className="block text-red-500 hover:underline">Sair</button>
        </div>
      )}
    </nav>
  );
}
