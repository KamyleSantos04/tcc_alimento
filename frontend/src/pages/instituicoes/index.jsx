import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const caminhoIcones = "/assets/icons/instituiçoes/";
const instituicoes = [
  {
    nome: "Projeto Amor em Ação",
    cidade: "São Paulo - SP",
    categoria: "Associações comunitárias",
    publico: "Famílias",
    descricao:
      "Atende famílias em situação de vulnerabilidade social, oferecendo apoio alimentar, educação e atividades para crianças e jovens.",
    icone: "66.png",
  },
  {
    nome: "Associação Semeando Esperança",
    cidade: "Rio de Janeiro - RJ",
    categoria: "Bancos de alimentos",
    publico: "Famílias",
    descricao:
      "Distribui alimentos para famílias em situação de vulnerabilidade e desenvolve projetos de segurança alimentar na comunidade.",
    icone: "77.png",
  },
  {
    nome: "Creche Cantinho Feliz",
    cidade: "Belo Horizonte - MG",
    categoria: "Creches",
    publico: "Crianças",
    descricao:
      "Atende crianças de 0 a 6 anos, oferecendo alimentação, educação e acompanhamento social às famílias.",
    icone: "88.png",
  },
  {
    nome: "Instituto Vida Nova",
    cidade: "Curitiba - PR",
    categoria: "Associações comunitárias",
    publico: "Jovens",
    descricao:
      "Trabalha com jovens em situação de risco, oferecendo cursos, oficinas e apoio para fortalecer seu futuro.",
    icone: "99.png",
  },
  {
    nome: "Banco de Alimentos de Campinas",
    cidade: "Campinas - SP",
    categoria: "Bancos de alimentos",
    publico: "Famílias",
    descricao:
      "Recebe e distribui alimentos para entidades assistenciais, contribuindo para o combate à fome na região.",
    icone: "100.png",
  },
  {
    nome: "Abrigo Nosso Lar",
    cidade: "Salvador - BA",
    categoria: "Abrigos",
    publico: "Adultos e idosos",
    descricao:
      "Oferece moradia, alimentação e cuidado para pessoas em situação de rua e idosos em vulnerabilidade social.",
    icone: "111.png",
  },
];

const categorias = [
  "Todos",
  "Bancos de alimentos",
  "Creches",
  "Associações comunitárias",
  "Abrigos",
  "Outros",
];

export default function Instituicoes() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [cidade, setCidade] = useState("");

  const porPagina = 6;

  const filtradas = instituicoes.filter((instituicao) => {
    const termo = busca.toLowerCase();

    const correspondeBusca =
      instituicao.nome.toLowerCase().includes(termo) ||
      instituicao.cidade.toLowerCase().includes(termo) ||
      instituicao.categoria.toLowerCase().includes(termo) ||
      instituicao.descricao.toLowerCase().includes(termo);

    const correspondeCategoria =
      categoria === "Todos" ||
      instituicao.categoria === categoria ||
      (categoria === "Outros" &&
        !categorias.slice(1, 5).includes(instituicao.categoria));

    const correspondeCidade =
      cidade.trim() === "" ||
      instituicao.cidade.toLowerCase().includes(cidade.toLowerCase());

    return (
      correspondeBusca &&
      correspondeCategoria &&
      correspondeCidade
    );
  });

  const totalPaginas = Math.max(
    1,
    Math.ceil(filtradas.length / porPagina)
  );

  const instituicoesPagina = filtradas.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  function mudarCategoria(novaCategoria) {
    setCategoria(novaCategoria);
    setPagina(1);
  }

  function mudarBusca(valor) {
    setBusca(valor);
    setPagina(1);
  }

return (
  <main className="institutions-page">
    <header className="institution-header">
      <Link to="/" className="institution-brand">
        <img
          src={`${caminhoIcones}logo.png`}
          alt="Alimento que Conecta"
        />
      </Link>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/como-funciona">Como funciona</Link>
        <Link to="/doacoes">Doações</Link>
        <Link to="/instituicoes" className="active">
          Instituições
        </Link>
      </nav>

    </header>


      <div className="institution-layout">
        <aside className="institution-sidebar">
          <div className="sidebar-heart">
          
          </div>

          <h1>Instituições</h1>

          <h2>Juntos podemos fazer a diferença!</h2>

          <p>
            Conheça as instituições que transformam vidas por meio
            da solidariedade e da alimentação.
          </p>

          <div className="institution-benefit">
            <span>
              <img
                src={`${caminhoIcones}33.png`}
                alt=""
                width="46"
                height="46"
              />
            </span>

            <div>
              <strong>Encontre instituições</strong>
              <p>
                Conheça projetos sociais que precisam de ajuda.
              </p>
            </div>
          </div>

          <div className="institution-benefit">
            <span>
              <img
                src={`${caminhoIcones}44.png`}
                alt=""
                width="46"
                height="46"
              />
            </span>

            <div>
              <strong>Faça parte da mudança</strong>
              <p>
                Ajude a levar alimentos a quem mais precisa.
              </p>
            </div>
          </div>

          <div className="institution-benefit">
            <span>
              <img
                src={`${caminhoIcones}55.png`}
                alt=""
                width="46"
                height="46"
              />
            </span>

            <div>
              <strong>Compartilhe esperança</strong>
              <p>
                Cada contribuição pode transformar uma vida.
              </p>
            </div>
          </div>

          <img
            className="institution-sidebar-image"
            src={`${caminhoIcones}22.png`}
            alt="Pessoas compartilhando alimentos"
          />
        </aside>

        <section className="institution-results">
          <div className="institution-search-row">
            <div className="institution-search">
              <span aria-hidden="true">⌕</span>

              <input
                type="search"
                placeholder="Buscar por instituição, cidade ou causa..."
                value={busca}
                onChange={(evento) => mudarBusca(evento.target.value)}
              />
            </div>

            <button
              type="button"
              className="institution-filter-button"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
            >
              ⚙ Filtros
            </button>
          </div>

          {mostrarFiltros && (
            <div className="institution-extra-filters">
              <label>
                Cidade ou estado
                <input
                  type="text"
                  placeholder="Ex.: São Paulo"
                  value={cidade}
                  onChange={(evento) => {
                    setCidade(evento.target.value);
                    setPagina(1);
                  }}
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setBusca("");
                  setCidade("");
                  mudarCategoria("Todos");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}

          <div className="institution-categories">
            {categorias.map((item) => (
              <button
                key={item}
                type="button"
                className={categoria === item ? "selected" : ""}
                onClick={() => mudarCategoria(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="institution-cards">
            {instituicoesPagina.map((instituicao) => (
              <article
                className="institution-card"
                key={instituicao.nome}
              >
                <div className="institution-card-heading">
                  <div className="institution-card-icon">
                    <img
                      src={`${caminhoIcones}${instituicao.icone}`}
                      alt={`Ícone de ${instituicao.nome}`}
                    />
                  </div>

                  <div>
                    <h3>{instituicao.nome}</h3>

                    <div className="institution-location">
                      <span aria-hidden="true">⌖</span>{" "}
                      {instituicao.cidade}
                    </div>
                  </div>
                </div>

                <div className="institution-tags">
                  <span>{instituicao.categoria}</span>
                  <span>{instituicao.publico}</span>
                </div>

                <p className="institution-description">
                  {instituicao.descricao}
                </p>

                <div className="institution-card-actions">
                  <Link
                    to={`/doar?instituicao=${encodeURIComponent(
                      instituicao.nome
                    )}`}
                    className="institution-donate-button"
                  >
                    ♡ Contribuir
                  </Link>

                  <Link
                    to={`/instituicoes/${encodeURIComponent(
                      instituicao.nome
                    )}`}
                    className="institution-details-link"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {instituicoesPagina.length === 0 && (
            <p className="institution-empty">
              Nenhuma instituição encontrada. Tente mudar a busca
              ou os filtros.
            </p>
          )}

          <div className="institution-pagination">
            <button
              type="button"
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
              aria-label="Página anterior"
            >
              ‹
            </button>

            {Array.from(
              { length: totalPaginas },
              (_, indice) => indice + 1
            ).map((numero) => (
              <button
                type="button"
                key={numero}
                className={pagina === numero ? "selected" : ""}
                onClick={() => setPagina(numero)}
              >
                {numero}
              </button>
            ))}

            <button
              type="button"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
              aria-label="Próxima página"
            >
              ›
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
