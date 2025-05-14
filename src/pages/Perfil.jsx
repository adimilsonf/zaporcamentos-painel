import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');
  const [faturas, setFaturas] = useState([]); // ✅ Novo estado para histórico de pagamentos
  const navigate = useNavigate();

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

        // ✅ Busca histórico de faturas
        const faturasRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/stripe/faturas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaturas(faturasRes.data);
      } catch (err) {
        console.error('Erro ao carregar perfil', err);
        setErro('Erro ao carregar dados do usuário.');
      }
    };
    fetchPerfil();
  }, []);

  const iniciarUpgrade = async () => {
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
  };

  if (erro) return <div className="p-4 text-red-500">{erro}</div>;
  if (!usuario) return <div className="p-4">Carregando...</div>;

  const dataExpira = usuario.pro_expira_em
    ? new Date(usuario.pro_expira_em).toLocaleDateString('pt-BR')
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Perfil do Usuário</h2>
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Telefone:</strong> {usuario.telefone || 'Não informado'}</p>
        <p><strong>Plano:</strong> {usuario.plano || 'Gratuito'}</p>
        {usuario.plano === 'Pro' && dataExpira && (
          <p><strong>Plano Pro expira em:</strong> {dataExpira}</p>
        )}

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
              <li>Limite de 1 orçamento</li>
              <li>Sem personalização de PDF</li>
              <li>
                <button onClick={iniciarUpgrade} className="text-blue-600 hover:underline">
                  Fazer upgrade para Pro
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* ✅ Histórico de faturas */}
        {faturas.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Histórico de Pagamentos</h3>
            <ul className="text-sm text-gray-800">
              {faturas.map((fatura, idx) => (
                <li key={idx} className="border-b py-2">
                  <strong>Data:</strong> {new Date(fatura.data).toLocaleDateString('pt-BR')}<br />
                  <strong>Status:</strong> {fatura.status}<br />
                  <strong>Valor:</strong> R$ {(fatura.valor / 100).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Voltar para o Dashboard
        </button>
      </div>
    </div>
  );
}
