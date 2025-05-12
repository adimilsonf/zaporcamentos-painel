// src/pages/Perfil.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`);
        setUsuario(res.data);
      } catch (err) {
        console.error('Erro ao carregar perfil', err);
        setErro('Erro ao carregar dados do usuário.');
      }
    };
    fetchPerfil();
  }, []);

  if (erro) return <div className="p-4 text-red-500">{erro}</div>;
  if (!usuario) return <div className="p-4">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Perfil do Usuário</h2>
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Telefone:</strong> {usuario.telefone || 'Não informado'}</p>
        <p><strong>Plano:</strong> {usuario.plano || 'Gratuito'}</p>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Recursos do plano:</h3>
          {usuario.plano === 'Pro' ? (
            <ul className="list-disc list-inside text-green-700">
              <li>Orçamentos ilimitados</li>
              <li>Logo no PDF</li>
              <li>Suporte prioritário</li>
            </ul>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              <li>Limite de 5 orçamentos</li>
              <li>Sem personalização de PDF</li>
              <li>
                <a href="/upgrade" className="text-blue-600 hover:underline">
                  Fazer upgrade para Pro
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
