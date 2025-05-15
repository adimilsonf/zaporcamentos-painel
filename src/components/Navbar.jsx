// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // ✅ Importa sua logo

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* ✅ Substituído o texto pela logo */}
      <Link to="/dashboard" className="flex items-center">
        <img src={logo} alt="ZapOrçamento" className="h-10" />
      </Link>

      <div className="flex items-center space-x-6 text-sm">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Orçamentos</Link>
        <Link to="/novo" className="text-gray-700 hover:text-blue-600">Novo</Link>
        <button onClick={sair} className="text-red-500 hover:underline">Sair</button>
      </div>
    </nav>
  );
}
