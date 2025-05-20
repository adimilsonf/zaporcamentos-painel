import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, BadgeCheck, Clock, CreditCard, Calendar, FileText, ArrowLeft } from 'lucide-react';

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

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6 text-blue-700">
          <BadgeCheck className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Meu Perfil</h2>
        </div>

        <div className="space-y-2 text-gray-800">
          <p className="flex items-center gap-2"><User className="w-4 h-4" /><strong>Nome:</strong> {usuario.nome}</p>
          <p className="flex items-center gap-2"><Mail className="w-4 h-4" /><strong>Email:</strong> {usuario.email}</p>
          <p className="flex items-center gap-2"><Phone className="w-4 h-4" /><strong>Telefone:</strong> {usuario.telefone || 'Não informado'}</p>
          <p className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            <strong>Plano:</strong> {usuario.plano === 'Pro' ? <span className="text-green-600 font-semibold">Pro</span> : <span className="text-yellow-600 font-semibold">Gratuito</span>}
          </p>
          {usuario.plano === 'Pro' && dataExpira && (
            <p className="flex items-center gap-2"><Clock className="w-4 h-4" /><strong>Expira em:</strong> {dataExpira}</p>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-gray-700">📦 Recursos do plano:</h3>
          {usuario.plano === 'Pro' ? (
            <ul className="list-disc list-inside text-green-700">
              <li>Orçamentos ilimitados</li>
              <li>Logo no PDF</li>
              <li>Suporte prioritário</li>
            </ul>
          ) : (
            <ul className="list-disc list-inside text-gray-600">
              <li>Limite de 1 orçamento</li>
              <li>Sem personalização de PDF</li>
              <li>
                <button
                  onClick={iniciarUpgrade}
                  className="mt-2 text-blue-600 font-semibold hover:underline"
                >
                  🚀 Fazer upgrade para Pro
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-gray-800" />
            <h3 className="text-lg font-bold text-gray-800">Histórico de Faturas</h3>
          </div>
          {faturas.length === 0 ? (
            <p className="text-gray-500">Nenhuma fatura encontrada.</p>
          ) : (
            <ul className="text-sm space-y-4">
              {faturas.map((fatura, index) => (
                <li
                  key={index}
                  className="bg-gray-50 rounded-md shadow-sm px-4 py-3 border flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="flex items-center gap-1"><CreditCard className="w-4 h-4" /><strong>Valor:</strong> R$ {fatura.total.toFixed(2)}</p>
                    <p className="flex items-center gap-1"><Calendar className="w-4 h-4" /><strong>Data:</strong> {new Date(fatura.data).toLocaleDateString('pt-BR')}</p>
                    <p className="flex items-center gap-1"><FileText className="w-4 h-4" /><strong>Status:</strong> <span className={fatura.status === 'paid' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>{fatura.status === 'paid' ? 'Paga' : 'Pendente'}</span></p>
                  </div>
                  {fatura.link && (
                    <a
                      href={fatura.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 sm:mt-0 text-blue-600 font-medium hover:underline"
                    >
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
          className="mt-8 w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o Dashboard
        </button>
      </div>
    </div>
  );
}
