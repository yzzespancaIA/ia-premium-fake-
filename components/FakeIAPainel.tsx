import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FakeIAPainel() {
  const [usuario] = useState(() => localStorage.getItem('usuarioFake') || 'Usuário');
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [creditos, setCreditos] = useState(10);
  const [loading, setLoading] = useState(false);

  const enviarPergunta = async () => {
    if (!pergunta || creditos <= 0) return;
    setLoading(true);
    setResposta("");
    try {
      const res = await fetch("https://poe-backend-simulado.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: pergunta })
      });
      const data = await res.json();
      setResposta(data.answer);
      setCreditos(prev => prev - 1);
    } catch (err) {
      setResposta("Erro ao acessar IA fake.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h2 className="text-xl font-semibold mb-2">Bem-vindo, {usuario}</h2>
      <p className="text-sm mb-4">Créditos restantes: <span className="text-green-400 font-bold">{creditos}</span></p>
      <textarea
        value={pergunta}
        onChange={(e) => setPergunta(e.target.value)}
        rows={4}
        placeholder="Digite sua pergunta para a IA..."
        className="w-full p-4 mb-4 bg-zinc-800 rounded border border-zinc-700"
      />
      <Button onClick={enviarPergunta} disabled={loading || creditos <= 0} className="bg-green-600">
        {loading ? "Consultando..." : "Perguntar"}
      </Button>

      {resposta && (
        <div className="mt-6 p-4 bg-zinc-800 border border-zinc-700 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Resposta:</h3>
          <p>{resposta}</p>
        </div>
      )}

      {creditos <= 0 && (
        <p className="mt-4 text-red-500 font-bold">Seus créditos acabaram. Adquira o plano vitalício por R$47.</p>
      )}
    </div>
  );
}
