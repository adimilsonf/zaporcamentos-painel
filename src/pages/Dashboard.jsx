import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Meus Orçamentos</h1>
        <div className="flex gap-2 items-center">
          {!atingiuLimite ? (
            <Link to="/novo" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Novo Orçamento
            </Link>
          ) : (
            <div className="flex flex-col text-sm text-red-600">
              <span>Limite do plano gratuito atingido</span>
              <button
                onClick={criarCheckout}
                className="mt-1 text-blue-600 hover:underline text-xs bg-blue-100 px-2 py-1 rounded w-fit"
              >
                Fazer upgrade para o plano Pro
              </button>
            </div>
          )}
          <Link
            to="/perfil"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm"
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
                  <p className="text-sm text-gray-500">{new Date(orc.data_criacao).toLocaleDateString()}</p>
                </div>
                <Link to={`/orcamento/${orc.id}`} className="text-blue-600 hover:underline">
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
