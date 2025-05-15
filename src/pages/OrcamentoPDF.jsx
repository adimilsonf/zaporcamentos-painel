import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrcamentoPDF() {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orcamentos/${id}/pdf`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob' // PDF binário
          }
        );
        const blobUrl = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        setPdfUrl(blobUrl);
      } catch (err) {
        console.error('Erro ao carregar PDF:', err);
      }
    };

    fetchPDF();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Visualizar Orçamento</h2>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="Orçamento PDF"
          className="w-full max-w-4xl h-[90vh] border rounded shadow"
        />
      ) : (
        <p>Carregando PDF...</p>
      )}
    </div>
  );
}
