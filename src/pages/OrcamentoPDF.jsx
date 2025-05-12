import { useParams } from 'react-router-dom';

export default function OrcamentoPDF() {
  const { id } = useParams();
  const pdfUrl = `${import.meta.env.VITE_API_URL}/api/orcamentos/${id}/pdf`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Visualizar Orçamento</h2>
      <iframe src={pdfUrl} title="Orçamento PDF"
        className="w-full max-w-4xl h-[90vh] border rounded shadow" />
    </div>
  );
}