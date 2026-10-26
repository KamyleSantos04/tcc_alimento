
import { useState } from "react";
import { Link } from "react-router-dom";
import { doacoes } from "../../data/doacoes";
import "./index.scss";

const caminhoImagens = "/assets/images/";

export default function Doacoes() {
  const [busca, setBusca] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState("Todos");

  const doacoesFiltradas = doacoes.filter((doacao) => {
    const termo = busca.toLowerCase();

    const correspondeBusca =
      doacao.nome.toLowerCase().includes(termo) ||
      doacao.estabelecimento.toLowerCase().includes(termo);

    const correspondeStatus =
      statusFiltro === "Todos" || doacao.status === statusFiltro;

    return correspondeBusca && correspondeStatus;
  });

  return (
    <main className="doacoes-page">
      <aside className="doacoes-sidebar">
        <Link to="/" className="sidebar-logo">
          <img
            src={`${caminhoImagens}logobranca.png`}
            alt="Alimento que Conecta"
          />
        </Link>

        <nav className="sidebar-menu">
          <Link to="/">
            <span>⌂</span>
            Início
          </Link>

          <Link to="/doacoes" className="active">
            <span>⌕</span>
            Buscar doações
          </Link>
        </nav>

        <Link to="/login" className="sidebar-sair">
          <span>⇥</span>
          Sair
        </Link>
      </aside>

      <section className="doacoes-conteudo">
        <header className="doacoes-cabecalho">
          <h1>Doações disponíveis</h1>
          <p>
            Encontre alimentos que podem ser doados e faça sua solicitação.
          </p>
        </header>

        <div className="doacoes-toolbar">
          <div className="doacoes-busca">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Buscar por alimento ou estabelecimento..."
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />
          </div>

          <button
            type="button"
            className="doacoes-filtros"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            aria-expanded={mostrarFiltros}
          >
            ☷ Filtros
          </button>
        </div>

        {mostrarFiltros && (
          <div className="doacoes-filtro-opcoes">
            <label htmlFor="status-doacao">Status da doação</label>
            <select
              id="status-doacao"
              value={statusFiltro}
              onChange={(evento) => setStatusFiltro(evento.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Disponível">Disponíveis</option>
              <option value="Reservado">Reservados</option>
            </select>
          </div>
        )}

        <div className="doacoes-lista">
          {doacoesFiltradas.map((doacao) => (
            <article className="doacao-card" key={doacao.id}>
              <div className="doacao-imagem">
                <img
                  src={`${caminhoImagens}${doacao.imagem}`}
                  alt={doacao.nome}
                />
              </div>

              <div className="doacao-informacoes">
                <h2>{doacao.nome}</h2>
                <p className="doacao-quantidade">
                  {doacao.quantidade}
                </p>

                <div className="doacao-estabelecimento">
                  <span aria-hidden="true">♟</span>
                  {doacao.estabelecimento}
                </div>

                <div className="doacao-detalhes">
                  <span>
                    <span aria-hidden="true">⌖</span>
                    {doacao.distancia}
                  </span>
                  <span>
                    <span aria-hidden="true">◷</span>
                    Retirada até {doacao.retirada}
                  </span>
                </div>
              </div>

              <div className="doacao-acoes">
                <span
                  className={`doacao-status ${
                    doacao.status === "Disponível"
                      ? "disponivel"
                      : "reservado"
                  }`}
                >
                  {doacao.status}
                </span>

                {doacao.status === "Disponível" ? (
                  <Link
                    to={`/doacoes/solicitar-doacao/${doacao.id}`}
                    className="doacao-botao"
                  >
                    Solicitar
                  </Link>
                ) : (
                  <Link
                    to={`/doacoes/${doacao.id}`}
                    className="doacao-botao detalhes"
                  >
                    Ver detalhes
                  </Link>
                )}
              </div>
            </article>
          ))}

          {doacoesFiltradas.length === 0 && (
            <p className="doacoes-vazio">
              Nenhuma doação encontrada. Tente alterar sua pesquisa ou seus
              filtros.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
