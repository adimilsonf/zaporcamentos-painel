import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/menu.png'; // ✅ Importa a imagem menu

export default function Dashboard() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [plano, setPlano] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [orcRes, userRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/orcamentos`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, { headers })
        ]);

        setOrcamentos(orcRes.data);
        setPlano(userRes.data.plano);
      } catch (err) {
        console.error('Erro ao buscar orçamentos ou plano', err);
      }
    };
    fetchOrcamentos();
  }, []);

  const criarCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/stripe/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error('Erro ao iniciar upgrade com Stripe:', err);
    }
  };

  const atingiuLimite = plano === 'Gratuito' && orcamentos.length >= 1;

  const badge = plano === 'Pro' ? (
    <span className="ml-2 px-2 py-1 text-xs bg-yellow-400 text-white rounded-full">Plano Ouro</span>
  ) : (
    <span className="ml-2 px-2 py-1 text-xs bg-amber-700 text-white rounded-full">Plano Bronze</span>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          {/* ✅ Logo do sistema */}
          <img src={logo} alt="ZapOrçamento" className="h-8 sm:h-10" />
          {badge}
        </div>

        {/* ✅ Botões adaptados para mobile: empilhados no mobile, lado a lado no desktop */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {atingiuLimite ? (
            <div className="text-sm bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow">
              ⚠️ Você atingiu o limite de 1 orçamento no plano gratuito.
              <button
                onClick={criarCheckout}
                className="mt-2 sm:mt-0 sm:ml-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
              >
                Fazer upgrade
              </button>
            </div>
          ) : (
            <Link
              to="/novo"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center text-sm"
            >
              Novo Orçamento
            </Link>
          )}
          <Link
            to="/perfil"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-center text-sm"
          >
            Ver Perfil
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded p-4">
        {orcamentos.length === 0 ? (
          <p className="text-gray-500">Nenhum orçamento cadastrado ainda.</p>
        ) : (
          <ul>
            {orcamentos.map((orc) => (
              <li key={orc.id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <p className="font-medium">{orc.nome_cliente}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(orc.data_criacao).toLocaleDateString()}
                  </p>
                </div>
                <Link to={`/orcamento/${orc.id}`} className="text-blue-600 hover:underline text-sm">
                  Ver PDF
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
