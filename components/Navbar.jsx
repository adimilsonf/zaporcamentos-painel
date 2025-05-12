// components/Navbar.jsx

import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 mb-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        ZapOrçamento Pro
      </Link>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Orçamentos
        </Link>
        <Link to="/novo" className="text-gray-700 hover:text-blue-600">
          Novo
        </Link>
        <button onClick={handleLogout} className="text-red-500 hover:underline">
          Sair
        </button>
      </div>
    </nav>
  );
}
