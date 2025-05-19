import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');
  const [faturas, setFaturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchPerfil = async () => {
    const token = localStorage.getItem('token');

    try {
      const status = new URLSearchParams(window.location.search).get('status');

      // ✅ 1. Faz login e obtém perfil
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(res.data);

      // ✅ 2. Se vier da confirmação do Stripe, chama upgrade
      if (status === 'success') {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/upgrade`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('✅ Plano Pro ativado com sucesso!');
        window.location.href = '/perfil'; // limpa a URL após upgrade
      }
    } catch (err) {
      console.error('Erro ao carregar perfil', err);
      setErro('Erro ao carregar dados do usuário.');
    }
  };

  const fetchFaturas = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/stripe/faturas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFaturas(res.data);
    } catch (err) {
      console.error('Erro ao carregar faturas:', err);
    }
  };

  fetchPerfil();
  fetchFaturas();
}, []);


    const fetchFaturas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/stripe/faturas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaturas(res.data);
      } catch (err) {
        console.error('Erro ao carregar faturas:', err);
      }
    };

    fetchPerfil();
    fetchFaturas();
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

        {/* Histórico de Faturas */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Histórico de Faturas</h3>
          {faturas.length === 0 ? (
            <p className="text-gray-500">Nenhuma fatura encontrada.</p>
          ) : (
            <ul className="text-sm space-y-2">
              {faturas.map((fatura, index) => (
                <li key={index} className="border-b pb-2">
                  <span className="block">💳 <strong>Valor:</strong> R$ {(fatura.amount_paid / 100).toFixed(2)}</span>
                  <span className="block">🗓️ <strong>Data:</strong> {new Date(fatura.created * 1000).toLocaleDateString('pt-BR')}</span>
                  <span className="block">📄 <strong>Status:</strong> {fatura.paid ? 'Paga' : 'Pendente'}</span>
                  {fatura.invoice_pdf && (
                    <a href={fatura.invoice_pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Ver Fatura PDF
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

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
