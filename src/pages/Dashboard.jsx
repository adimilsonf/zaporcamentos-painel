import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/menu.png'; // imagem com texto MENU estilizado

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        {/* Logo + Badge/Upgrade */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="ZapOrçamento" className="h-8 md:h-10" />
          {plano === 'Pro' ? (
            <span className="px-2 py-1 text-xs bg-yellow-400 text-white rounded-full">Plano Ouro</span>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm sm:text-xs">
              <span className="px-2 py-1 bg-amber-700 text-white rounded-full text-center">
                Plano Bronze
              </span>
              <button
  onClick={criarCheckout}
  className="animate-pulse bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 hover:scale-105 transition transform duration-200"
>
  Fazer upgrade
</button>

            </div>
          )}
        </div>

        {/* Ações: novo orçamento / ver perfil */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {atingiuLimite ? (
            <div className="text-sm bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-center">
              ⚠️ Você atingiu o limite de 1 orçamento no plano gratuito.
              <button
  onClick={criarCheckout}
  className="mt-2 animate-pulse bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 hover:scale-105 transition w-full sm:w-fit"
>
  Fazer upgrade para o Pro
</button>
            </div>
          ) : (
            <Link
              to="/novo"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
            >
              Novo Orçamento
            </Link>
          )}
          <Link
            to="/perfil"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm text-center"
          >
            Ver Perfil
          </Link>
        </div>
      </div>

      {/* Lista de orçamentos */}
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
