import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png'; // se você estiver usando logo

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 🔹 Faz o cadastro
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        nome, email, telefone, senha
      });

      // 🔹 Faz o login automático
      const loginRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        senha
      });

      // 🔹 Salva o token e redireciona para o dashboard
      const { token } = loginRes.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');

    } catch (err) {
      setErro('Erro ao registrar. Tente outro email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="ZapOrçamento" className="h-10" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Criar Conta</h2>
        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
        <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded" required />
        <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded" />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded" required />
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Criar Conta
        </button>
      </form>
    </div>
  );
}
