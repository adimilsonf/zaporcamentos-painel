import { Facebook, Instagram, Mail } from 'lucide-react';
import logo from '../assets/logo.png'; // ✅ Caminho para sua logo

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 px-6 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* ✅ Substituído por imagem da logo */}
        <div className="text-center md:text-left">
          <img src={logo} alt="ZapOrçamento" className="h-8 mb-1 mx-auto md:mx-0" />
          <p className="text-gray-400">© {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>

        {/* Links de navegação rápida */}
        <div className="flex gap-4 text-gray-300">
          <a href="#beneficios" className="hover:text-white transition">Benefícios</a>
          <a href="#planos" className="hover:text-white transition">Planos</a>
          <a href="#faq" className="hover:text-white transition">Dúvidas</a>
        </div>

        {/* Ícones sociais */}
        <div className="flex gap-4 text-gray-400">
          <a href="#" className="hover:text-white"><Instagram size={18} /></a>
          <a href="#" className="hover:text-white"><Facebook size={18} /></a>
          <a href="mailto:contato@zaporcamento.com" className="hover:text-white"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
