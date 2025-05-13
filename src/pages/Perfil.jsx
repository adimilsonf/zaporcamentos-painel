// src/pages/Perfil.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);

        const status = new URLSearchParams(window.location.search).get('status');
        if (status === 'success') {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/upgrade`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert('✅ Plano Pro ativado com sucesso!');
          window.location.href = '/perfil';
        }
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
                <button
  onClick={async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/stripe/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.url;
    } catch (err) {
      alert('Erro ao iniciar upgrade com Stripe');
    }
  }}
  className="text-blue-600 hover:underline"
>
  Fazer upgrade para Pro
</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
