import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NovoOrcamento from './pages/NovoOrcamento';
import OrcamentoPDF from './pages/OrcamentoPDF';
import Navbar from './components/Navbar';

function App() {
  // 🟢 Inicializa token direto do localStorage
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
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
        <Route path="/novo" element={token ? <Layout><NovoOrcamento /></Layout> : <Navigate to="/login" />} />
        <Route path="/orcamento/:id" element={token ? <Layout><OrcamentoPDF /></Layout> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
