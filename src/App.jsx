import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import NovoOrcamento from './pages/NovoOrcamento';
import OrcamentoPDF from './pages/OrcamentoPDF';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing'; // ✅ importado

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const Layout = ({ children }) => (
    <>
      <Navbar onLogout={() => setToken(null)} />
      {children}
    </>
  );

  return (
    <Router>
      <Routes>
  {/* ✅ Landing Page como primeira rota */}
  <Route path="/" element={<Landing />} />

  {/* 🟡 Rotas de login e registro */}
  <Route path="/login" element={<Login setToken={setToken} />} />
  <Route path="/register" element={<Register />} />

  {/* 🔒 Rotas protegidas com layout */}
  <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
  <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
  <Route path="/novo" element={<ProtectedRoute><Layout><NovoOrcamento /></Layout></ProtectedRoute>} />
  <Route path="/orcamento/:id" element={<ProtectedRoute><Layout><OrcamentoPDF /></Layout></ProtectedRoute>} />

  {/* ❌ Essa rota wildcard deve ser a última */}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

    </Router>
  );
}

export default App;
