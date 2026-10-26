import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doacoes } from "../../../data/doacoes";
import "./index.scss";

export default function SolicitarDoacao() {
  const { id } = useParams();
  const doacao = doacoes.find((item) => item.id === Number(id));

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarSolicitacao(evento) {
    evento.preventDefault();

    if (!nome.trim() || !telefone.trim() || !quantidade) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    if (Number(quantidade) <= 0 || Number(quantidade) > 100000) {
      setMensagem("Informe uma quantidade válida.");
      return;
    }

    setMensagem(
      "Solicitação registrada nesta demonstração! Para confirmar a retirada, entre em contato com o estabelecimento."
    );
  }

  if (!doacao) {
    return (
      <main className="solicitar-page">
        <h1>Doação não encontrada</h1>
        <Link to="/doacoes">Voltar para as doações</Link>
      </main>
    );
  }

  if (doacao.status !== "Disponível") {
    return (
      <main className="solicitar-page">
        <h1>Doação indisponível</h1>
        <p>Esta doação não está disponível para novas solicitações.</p>
        <Link to={`/doacoes/${doacao.id}`}>Ver detalhes</Link>
      </main>
    );
  }

  return (
    <main className="solicitar-page">
      <section className="solicitar-card">
        <Link to="/doacoes" className="solicitar-voltar">
          ← Voltar para doações
        </Link>

        <h1>Solicitar doação</h1>
        <p className="solicitar-subtitulo">
          Confira os dados e preencha o formulário para solicitar o alimento.
        </p>

        <div className="solicitar-resumo">
          <img
            src={`/assets/images/${doacao.imagem}`}
            alt={doacao.nome}
          />

          <div>
            <h2>{doacao.nome}</h2>
            <p>{doacao.quantidade}</p>
            <p>{doacao.estabelecimento}</p>
            <p>Retirada até {doacao.retirada}</p>
          </div>
        </div>

        <form onSubmit={enviarSolicitacao}>
          <label htmlFor="nome">Nome completo *</label>
          <input
            id="nome"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            placeholder="Digite seu nome"
            required
          />

          <label htmlFor="telefone">Telefone para contato *</label>
          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(evento) => setTelefone(evento.target.value)}
            placeholder="(11) 99999-9999"
            required
          />

          <label htmlFor="quantidade">Quantidade desejada *</label>
          <input
            id="quantidade"
            type="number"
            min="1"
            max="100000"
            value={quantidade}
            onChange={(evento) => setQuantidade(evento.target.value)}
            placeholder="Informe a quantidade"
            required
          />

          <label htmlFor="observacoes">Observações</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(evento) => setObservacoes(evento.target.value)}
            placeholder="Informações adicionais (opcional)"
            rows="4"
          />

          <button type="submit">Enviar solicitação</button>

          {mensagem && (
            <p className="solicitar-mensagem" role="status">
              {mensagem}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
