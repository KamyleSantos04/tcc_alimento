
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const caminhoImagens = "/assets/images/";
const api = "http://localhost:3001/api/doacoes";

function formatarData(data) {
  if (!data) return "Não informada";

  const dataFormatada = new Date(data);

  if (Number.isNaN(dataFormatada.getTime())) {
    return "Não informada";
  }

  return dataFormatada.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}

function formatarHorario(data) {
  if (!data) return "Não informado";

  const dataFormatada = new Date(data);

  if (Number.isNaN(dataFormatada.getTime())) {
    return "Não informado";
  }

  return dataFormatada.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
}

function escolherImagem(doacao) {
  const categoria = (doacao.categoria || "").toLowerCase();
  const nome = (doacao.nome_alimento || "").toLowerCase();

  if (
    categoria.includes("hortifruti") ||
    categoria.includes("fruta") ||
    categoria.includes("legume") ||
    nome.includes("fruta") ||
    nome.includes("legume")
  ) {
    return "frutas.png";
  }

  if (
    categoria.includes("padaria") ||
    nome.includes("pão") ||
    nome.includes("paes") ||
    nome.includes("bolo")
  ) {
    return "paes.png";
  }

  return "refeicoes.png";
}

function normalizarDoacao(doacao) {
  return {
    ...doacao,
    nome: doacao.nome_alimento,
    quantidade: `${Number(doacao.quantidade).toLocaleString("pt-BR")} ${
      doacao.unidade
    }`,
    status: doacao.status,
    imagem: escolherImagem(doacao),
  };
}

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [busca, setBusca] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function buscarDoacoes() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(api, {
          signal: controller.signal,
        });

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as doações.");
        }

        const dados = await resposta.json();

        setDoacoes(dados.map(normalizarDoacao));
      } catch (erroConsulta) {
        if (erroConsulta.name !== "AbortError") {
          setErro(
            "Não foi possível carregar as doações. Verifique se o backend está funcionando."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCarregando(false);
        }
      }
    }

    buscarDoacoes();

    return () => controller.abort();
  }, []);

  const doacoesFiltradas = doacoes.filter((doacao) => {
    const termo = busca.trim().toLowerCase();

    const nome = (doacao.nome || "").toLowerCase();
    const estabelecimento = (doacao.estabelecimento || "").toLowerCase();
    const categoria = (doacao.categoria || "").toLowerCase();

    const correspondeBusca =
      nome.includes(termo) ||
      estabelecimento.includes(termo) ||
      categoria.includes(termo);

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
            <span aria-hidden="true">⌂</span>
            Início
          </Link>

          <Link to="/ComoFunciona">
            <span aria-hidden="true">ⓘ</span>
            Como funciona
          </Link>

          <Link to="/Doacoes" className="active">
            <span aria-hidden="true">⌕</span>
            Buscar doações
          </Link>

          <Link to="/Instituicoes">
            <span aria-hidden="true">♡</span>
            Instituições
          </Link>

          <Link to="/QueroDoar">
            <span aria-hidden="true">♧</span>
            Quero doar
          </Link>

          <Link to="/Estabelecimento">
            <span aria-hidden="true">⌂</span>
            Estabelecimentos
          </Link>
        </nav>

        <Link to="/login" className="sidebar-sair">
          <span aria-hidden="true">⇥</span>
          Sair
        </Link>
      </aside>

      <section className="doacoes-conteudo">
        <header className="doacoes-cabecalho">
          <div>
            <span className="doacoes-subtitulo">
              ALIMENTO QUE CONECTA
            </span>

            <h1>Doações disponíveis</h1>

            <p>
              Encontre alimentos que podem ser doados e faça sua solicitação.
            </p>
          </div>
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
            <span aria-hidden="true">☷</span>
            Filtros
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
              <option value="Todos">Todas as disponíveis</option>
              <option value="disponivel">Disponíveis</option>
              <option value="reservada">Reservadas</option>
            </select>
          </div>
        )}

        <div className="doacoes-lista">
          {carregando && (
            <p className="doacoes-vazio">
              Carregando doações...
            </p>
          )}

          {!carregando && erro && (
            <div className="doacoes-vazio">
              <p>{erro}</p>

              <button
                type="button"
                className="doacao-botao"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!carregando &&
            !erro &&
            doacoesFiltradas.map((doacao) => (
              <article className="doacao-card" key={doacao.id}>
                <div className="doacao-imagem">
                  <img
                    src={`${caminhoImagens}${doacao.imagem}`}
                    alt={doacao.nome}
                    onError={(evento) => {
                      evento.currentTarget.style.visibility = "hidden";
                    }}
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
                      {doacao.cidade && doacao.estado
                        ? `${doacao.cidade} - ${doacao.estado}`
                        : doacao.endereco_retirada || "Local não informado"}
                    </span>

                    <span>
                      <span aria-hidden="true">◷</span>
                      Retirada até {formatarHorario(doacao.retirada_ate)}
                    </span>

                    <span>
                      Validade: {formatarData(doacao.validade)}
                    </span>
                  </div>
                </div>

                <div className="doacao-acoes">
                  <span
                    className={`doacao-status ${
                      doacao.status === "disponivel"
                        ? "disponivel"
                        : "reservado"
                    }`}
                  >
                    {doacao.status === "disponivel"
                      ? "Disponível"
                      : doacao.status === "reservada"
                        ? "Reservado"
                        : doacao.status}
                  </span>

                  {doacao.status === "disponivel" ? (
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

          {!carregando &&
            !erro &&
            doacoesFiltradas.length === 0 && (
              <p className="doacoes-vazio">
                Nenhuma doação encontrada. Tente alterar sua pesquisa ou
                seus filtros.
              </p>
            )}
        </div>
      </section>
    </main>
  );
}
