import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NovoOrcamento() {
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descricao, setDescricao] = useState('');
  const [itens, setItens] = useState([{ item: '', quantidade: 1, preco_unitario: 0 }]);
  const [gerando, setGerando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [mostrarUpgrade, setMostrarUpgrade] = useState(false);
  const navigate = useNavigate();

  const handleAddItem = () => {
    setItens([...itens, { item: '', quantidade: 1, preco_unitario: 0 }]);
  };

  const handleChangeItem = (index, field, value) => {
    const novosItens = [...itens];
    novosItens[index][field] = field === 'quantidade' || field === 'preco_unitario' ? parseFloat(value) : value;
    setItens(novosItens);
  };

  const valorTotal = itens.reduce((total, i) => total + (i.quantidade * i.preco_unitario), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGerando(true);
    setMensagem('');
    setMostrarUpgrade(false);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orcamentos`,
        {
          nomeCliente,
          telefone,
          descricao,
          itens,
          valorTotal
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ Nova lógica para buscar e abrir o PDF
      const pdfRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orcamentos/${res.data.id}/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );
      const url = window.URL.createObjectURL(new Blob([pdfRes.data], { type: 'application/pdf' }));
      window.open(url, '_blank');

      setMensagem('✅ Orçamento gerado com sucesso!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      if (err.response?.data?.error?.includes('limite')) {
        setMensagem('⚠️ Você atingiu o limite do plano gratuito. Faça upgrade para o plano Pro.');
        setMostrarUpgrade(true);
      } else {
        console.error('Erro ao criar orçamento:', err);
        setMensagem('❌ Erro ao gerar orçamento. Tente novamente.');
      }
    } finally {
      setGerando(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/stripe/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.url;
    } catch (err) {
      alert('Erro ao redirecionar para o checkout.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Novo Orçamento</h2>
        {mensagem && (
          <div className="mb-4 p-3 bg-yellow-100 text-sm text-yellow-800 rounded">
            {mensagem}
            {mostrarUpgrade && (
              <button
                type="button"
                onClick={handleUpgrade}
                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Fazer Upgrade
              </button>
            )}
          </div>
        )}
        <input type="text" placeholder="Nome do cliente" value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded" required />
        <input type="tel" placeholder="Telefone" value={telefone}
          onChange={(e) => setTelefone(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded" required />
        <textarea placeholder="Descrição do serviço" value={descricao}
          onChange={(e) => setDescricao(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded" rows={3} />
        <h3 className="font-medium mb-2">Itens</h3>
        {itens.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input type="text" placeholder="Serviço" value={item.item}
              onChange={(e) => handleChangeItem(idx, 'item', e.target.value)}
              className="flex-1 px-2 py-1 border rounded" required />
            <input type="number" placeholder="Qtd" value={item.quantidade}
              onChange={(e) => handleChangeItem(idx, 'quantidade', e.target.value)}
              className="w-20 px-2 py-1 border rounded" required />
            <input type="number" placeholder="Preço" value={item.preco_unitario}
              onChange={(e) => handleChangeItem(idx, 'preco_unitario', e.target.value)}
              className="w-24 px-2 py-1 border rounded" required />
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className="text-blue-600 text-sm mb-4">+ Adicionar item</button>
        <p className="font-semibold mb-4">Total: R$ {valorTotal.toFixed(2)}</p>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" disabled={gerando}>
          {gerando ? 'Gerando...' : 'Gerar Orçamento'}
        </button>
      </form>
    </div>
  );
}
