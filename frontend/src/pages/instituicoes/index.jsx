
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
    const [detalhesAbertos, setDetalhesAbertos] = useState([]);

    const porPagina = 6;

    const filtradas = instituicoes.filter((instituicao) => {
        const termo = busca.trim().toLowerCase();
        const termoCidade = cidade.trim().toLowerCase();

        const correspondeBusca =
            instituicao.nome.toLowerCase().includes(termo) ||
            instituicao.cidade.toLowerCase().includes(termo) ||
            instituicao.categoria.toLowerCase().includes(termo) ||
            instituicao.publico.toLowerCase().includes(termo) ||
            instituicao.descricao.toLowerCase().includes(termo);

        const correspondeCategoria =
            categoria === "Todos" ||
            instituicao.categoria === categoria ||
            (categoria === "Outros" &&
                !categorias.slice(1, 5).includes(instituicao.categoria));

        const correspondeCidade =
            termoCidade === "" ||
            instituicao.cidade.toLowerCase().includes(termoCidade);

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

    const paginaAtual = Math.min(pagina, totalPaginas);

    const instituicoesPagina = filtradas.slice(
        (paginaAtual - 1) * porPagina,
        paginaAtual * porPagina
    );

    function mudarCategoria(novaCategoria) {
        setCategoria(novaCategoria);
        setPagina(1);
    }

    function mudarBusca(valor) {
        setBusca(valor);
        setPagina(1);
    }

    function mudarCidade(valor) {
        setCidade(valor);
        setPagina(1);
    }

    function limparFiltros() {
        setBusca("");
        setCidade("");
        setCategoria("Todos");
        setPagina(1);
    }

    function alternarDetalhes(nome) {
        setDetalhesAbertos((atuais) =>
            atuais.includes(nome)
                ? atuais.filter((item) => item !== nome)
                : [...atuais, nome]
        );
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
                    <Link to="/ComoFunciona">Como funciona</Link>
                    <Link to="/Doacoes">Doações</Link>
                    <Link to="/Instituicoes" className="active">
                        Instituições
                    </Link>
                </nav>
            </header>

            <div className="institution-layout">
                <aside className="institution-sidebar">
                    <div className="sidebar-heart" aria-hidden="true">
                        ♡
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
                                onChange={(evento) =>
                                    mudarBusca(evento.target.value)
                                }
                            />
                        </div>

                        <button
                            type="button"
                            className="institution-filter-button"
                            onClick={() =>
                                setMostrarFiltros((atual) => !atual)
                            }
                            aria-expanded={mostrarFiltros}
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
                                    placeholder="Ex.: São Paulo ou SP"
                                    value={cidade}
                                    onChange={(evento) =>
                                        mudarCidade(evento.target.value)
                                    }
                                />
                            </label>

                            <button
                                type="button"
                                onClick={limparFiltros}
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
                                className={
                                    categoria === item ? "selected" : ""
                                }
                                onClick={() => mudarCategoria(item)}
                                aria-pressed={categoria === item}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <p className="institution-count">
                        {filtradas.length}{" "}
                        {filtradas.length === 1
                            ? "instituição encontrada"
                            : "instituições encontradas"}
                    </p>

                    <div className="institution-cards">
                        {instituicoesPagina.map((instituicao) => {
                            const detalhesVisiveis =
                                detalhesAbertos.includes(instituicao.nome);

                            return (
                                <article
                                    className="institution-card"
                                    key={instituicao.nome}
                                >
                                    <div className="institution-card-heading">
                                        <div className="institution-card-icon">
                                            <img
                                                src={`${caminhoIcones}${instituicao.icone}`}
                                                alt=""
                                            />
                                        </div>

                                        <div>
                                            <h3>{instituicao.nome}</h3>

                                            <div className="institution-location">
                                                <span aria-hidden="true">
                                                    ⌖
                                                </span>{" "}
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

                                    {detalhesVisiveis && (
                                        <div className="institution-details">
                                            <p>
                                                <strong>Localização:</strong>{" "}
                                                {instituicao.cidade}
                                            </p>
                                            <p>
                                                <strong>Categoria:</strong>{" "}
                                                {instituicao.categoria}
                                            </p>
                                            <p>
                                                <strong>Público atendido:</strong>{" "}
                                                {instituicao.publico}
                                            </p>
                                        </div>
                                    )}

                                    <div className="institution-card-actions">
                                        <Link
                                            to="/QueroDoar"
                                            className="institution-donate-button"
                                        >
                                            ♡ Contribuir
                                        </Link>

                                        <button
                                            type="button"
                                            className="institution-details-link"
                                            onClick={() =>
                                                alternarDetalhes(
                                                    instituicao.nome
                                                )
                                            }
                                            aria-expanded={detalhesVisiveis}
                                        >
                                            {detalhesVisiveis
                                                ? "Ocultar detalhes ↑"
                                                : "Ver detalhes →"}
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {instituicoesPagina.length === 0 && (
                        <div className="institution-empty">
                            <h3>Nenhuma instituição encontrada</h3>
                            <p>
                                Tente mudar o termo da busca ou selecionar
                                outra categoria.
                            </p>

                            <button
                                type="button"
                                onClick={limparFiltros}
                            >
                                Limpar busca e filtros
                            </button>
                        </div>
                    )}

                    {filtradas.length > porPagina && (
                        <div className="institution-pagination">
                            <button
                                type="button"
                                disabled={paginaAtual === 1}
                                onClick={() =>
                                    setPagina((atual) =>
                                        Math.max(1, atual - 1)
                                    )
                                }
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
                                    className={
                                        paginaAtual === numero
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() => setPagina(numero)}
                                    aria-label={`Página ${numero}`}
                                    aria-current={
                                        paginaAtual === numero
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {numero}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={paginaAtual === totalPaginas}
                                onClick={() =>
                                    setPagina((atual) =>
                                        Math.min(totalPaginas, atual + 1)
                                    )
                                }
                                aria-label="Próxima página"
                            >
                                ›
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
