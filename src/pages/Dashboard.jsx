import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orcamentos`);
        setOrcamentos(res.data);
      } catch (err) {
        console.error('Erro ao buscar orçamentos', err);
      }
    };
    fetchOrcamentos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Meus Orçamentos</h1>
        <div className="flex gap-2">
          <Link to="/perfil" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Perfil
          </Link>
          <Link to="/novo" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Novo Orçamento
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
