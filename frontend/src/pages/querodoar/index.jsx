
import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

function Icon({ nome, tamanho = 20 }) {
  const propriedades = {
    width: tamanho,
    height: tamanho,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (nome) {
    case "inicio":
      return (
        <svg {...propriedades}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v12h14V9M9 21v-7h6v7" />
        </svg>
      );

    case "conta":
      return (
        <svg {...propriedades}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    case "doar":
      return (
        <svg {...propriedades}>
          <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );

    case "caixa":
      return (
        <svg {...propriedades}>
          <path d="m3 7 9-4 9 4-9 5-9-5Z" />
          <path d="M3 7v10l9 4 9-4V7M12 12v9M7.5 4.8l9 5" />
        </svg>
      );

    case "mais":
      return (
        <svg {...propriedades}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "relogio":
      return (
        <svg {...propriedades}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "check":
      return (
        <svg {...propriedades}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "sair":
      return (
        <svg {...propriedades}>
          <path d="M10 17l5-5-5-5M15 12H3" />
          <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
        </svg>
      );

    case "buscar":
      return (
        <svg {...propriedades}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      );

    default:
      return null;
  }
}

const doacoesIniciais = [
  {
    id: 1,
    nome: "Pães franceses",
    categoria: "Padaria",
    quantidade: "30 unidades",
    validade: "",
    retirada: "18:30",
    observacoes: "Pães frescos preparados hoje.",
    status: "Disponível",
  },
  {
    id: 2,
    nome: "Frutas e legumes",
    categoria: "Frutas e verduras",
    quantidade: "15 kg",
    validade: "",
    retirada: "16:00",
    observacoes: "Alimentos selecionados em boas condições.",
    status: "Reservado",
  },
];

export default function QueroDoar() {
  const [doacoes, setDoacoes] = useState(doacoesIniciais);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [filtro, setFiltro] = useState("Todas");

  const [formulario, setFormulario] = useState({
    nome: "",
    categoria: "Padaria",
    quantidade: "",
    validade: "",
    retirada: "",
    observacoes: "",
  });

  const [mensagem, setMensagem] = useState("");

  const totalDoacoes = doacoes.length;

  const totalDisponiveis = doacoes.filter(
    (doacao) => doacao.status === "Disponível"
  ).length;

  const totalReservadas = doacoes.filter(
    (doacao) => doacao.status === "Reservado"
  ).length;

  const doacoesFiltradas = doacoes.filter((doacao) => {
    return filtro === "Todas" || doacao.status === filtro;
  });

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function cadastrarDoacao(evento) {
    evento.preventDefault();
    setMensagem("");

    const novaDoacao = {
      id: Date.now(),
      nome: formulario.nome.trim(),
      categoria: formulario.categoria,
      quantidade: formulario.quantidade.trim(),
      validade: formulario.validade,
      retirada: formulario.retirada,
      observacoes: formulario.observacoes.trim(),
      status: "Disponível",
    };

    setDoacoes((atuais) => [novaDoacao, ...atuais]);

    setFormulario({
      nome: "",
      categoria: "Padaria",
      quantidade: "",
      validade: "",
      retirada: "",
      observacoes: "",
    });

    setMostrarFormulario(false);
    setFiltro("Todas");
    setMensagem("Doação cadastrada com sucesso!");
  }

  function alterarStatus(id, novoStatus) {
    setDoacoes((atuais) =>
      atuais.map((doacao) =>
        doacao.id === id
          ? { ...doacao, status: novoStatus }
          : doacao
      )
    );
  }

  function excluirDoacao(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta doação?"
    );

    if (!confirmar) return;

    setDoacoes((atuais) =>
      atuais.filter((doacao) => doacao.id !== id)
    );
  }

  return (
    <main className="quero-doar-page">
      <aside className="qd-sidebar">
        <Link to="/" className="qd-logo">
          <img
            src="/assets/images/logobranca.png"
            alt="Alimento que Conecta"
          />
        </Link>

        <nav className="qd-menu">
          <Link to="/" className="qd-link">
            <Icon nome="inicio" />
            <span>Início</span>
          </Link>

          <Link to="/login" className="qd-link">
            <Icon nome="conta" />
            <span>Minha conta</span>
          </Link>

          <Link to="/Doacoes" className="qd-link">
            <Icon nome="buscar" />
            <span>Buscar doações</span>
          </Link>

          <Link to="/QueroDoar" className="qd-link ativo">
            <Icon nome="doar" />
            <span>Quero doar</span>
          </Link>
        </nav>

        <Link to="/login" className="qd-sair">
          <Icon nome="sair" />
          <span>Sair</span>
        </Link>
      </aside>

      <section className="qd-conteudo">
        <header className="qd-cabecalho">
          <div>
            <span className="qd-etiqueta">ÁREA DO DOADOR</span>
            <h1>Minhas doações</h1>
            <p>
              Compartilhe alimentos e acompanhe suas doações em um só lugar.
            </p>
          </div>

          <button
            type="button"
            className="qd-botao-principal"
            onClick={() => {
              setMostrarFormulario(!mostrarFormulario);
              setMensagem("");
            }}
          >
            <Icon nome="mais" />
            {mostrarFormulario ? "Cancelar" : "Cadastrar doação"}
          </button>
        </header>

        {mensagem && (
          <div className="qd-mensagem" role="status">
            <Icon nome="check" tamanho={19} />
            {mensagem}
          </div>
        )}

        <section className="qd-resumo" aria-label="Resumo das doações">
          <article className="qd-resumo-card">
            <div className="qd-resumo-icone verde">
              <Icon nome="caixa" tamanho={23} />
            </div>
            <div>
              <span>Total de doações</span>
              <strong>{totalDoacoes}</strong>
            </div>
          </article>

          <article className="qd-resumo-card">
            <div className="qd-resumo-icone claro">
              <Icon nome="check" tamanho={23} />
            </div>
            <div>
              <span>Disponíveis</span>
              <strong>{totalDisponiveis}</strong>
            </div>
          </article>

          <article className="qd-resumo-card">
            <div className="qd-resumo-icone terra">
              <Icon nome="relogio" tamanho={23} />
            </div>
            <div>
              <span>Reservadas</span>
              <strong>{totalReservadas}</strong>
            </div>
          </article>
        </section>

        {mostrarFormulario && (
          <section className="qd-formulario-card">
            <div className="qd-formulario-cabecalho">
              <div>
                <h2>Cadastrar nova doação</h2>
                <p>Preencha as informações dos alimentos que deseja doar.</p>
              </div>
            </div>

            <form onSubmit={cadastrarDoacao}>
              <div className="qd-campos">
                <div className="qd-campo">
                  <label htmlFor="nome">Nome do alimento *</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Ex.: Pães franceses"
                    value={formulario.nome}
                    onChange={atualizarCampo}
                    required
                  />
                </div>

                <div className="qd-campo">
                  <label htmlFor="categoria">Categoria *</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formulario.categoria}
                    onChange={atualizarCampo}
                    required
                  >
                    <option value="Padaria">Padaria</option>
                    <option value="Frutas e verduras">Frutas e verduras</option>
                    <option value="Refeições prontas">Refeições prontas</option>
                    <option value="Alimentos não perecíveis">
                      Alimentos não perecíveis
                    </option>
                    <option value="Laticínios">Laticínios</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="qd-campo">
                  <label htmlFor="quantidade">Quantidade *</label>
                  <input
                    id="quantidade"
                    name="quantidade"
                    type="text"
                    placeholder="Ex.: 20 unidades ou 5 kg"
                    value={formulario.quantidade}
                    onChange={atualizarCampo}
                    required
                  />
                </div>

                <div className="qd-campo">
                  <label htmlFor="validade">Validade</label>
                  <input
                    id="validade"
                    name="validade"
                    type="date"
                    value={formulario.validade}
                    onChange={atualizarCampo}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="qd-campo">
                  <label htmlFor="retirada">Horário limite para retirada *</label>
                  <input
                    id="retirada"
                    name="retirada"
                    type="time"
                    value={formulario.retirada}
                    onChange={atualizarCampo}
                    required
                  />
                </div>

                <div className="qd-campo qd-campo-completo">
                  <label htmlFor="observacoes">Observações</label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    placeholder="Informe condições dos alimentos ou orientações para retirada."
                    value={formulario.observacoes}
                    onChange={atualizarCampo}
                    rows={3}
                  />
                </div>
              </div>

              <div className="qd-formulario-acoes">
                <button
                  type="button"
                  className="qd-botao-secundario"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="qd-botao-principal">
                  <Icon nome="check" />
                  Publicar doação
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="qd-minhas-doacoes">
          <div className="qd-lista-cabecalho">
            <div>
              <h2>Alimentos cadastrados</h2>
              <p>Gerencie as doações que você está oferecendo.</p>
            </div>

            <div className="qd-filtro">
              <label htmlFor="filtro-status">Status:</label>
              <select
                id="filtro-status"
                value={filtro}
                onChange={(evento) => setFiltro(evento.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Disponível">Disponíveis</option>
                <option value="Reservado">Reservadas</option>
                <option value="Concluído">Concluídas</option>
              </select>
            </div>
          </div>

          <div className="qd-lista">
            {doacoesFiltradas.map((doacao) => (
              <article className="qd-doacao-card" key={doacao.id}>
                <div className="qd-doacao-icone">
                  <Icon nome="caixa" tamanho={28} />
                </div>

                <div className="qd-doacao-info">
                  <div className="qd-doacao-titulo">
                    <h3>{doacao.nome}</h3>

                    <span
                      className={`qd-status ${doacao.status
                        .toLowerCase()
                        .replace("í", "i")}`}
                    >
                      {doacao.status}
                    </span>
                  </div>

                  <p className="qd-categoria">{doacao.categoria}</p>

                  <div className="qd-doacao-detalhes">
                    <span>
                      <Icon nome="caixa" tamanho={16} />
                      {doacao.quantidade}
                    </span>

                    {doacao.validade && (
                      <span>
                        Validade:{" "}
                        {new Date(
                          `${doacao.validade}T12:00:00`
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    )}

                    {doacao.retirada && (
                      <span>
                        <Icon nome="relogio" tamanho={16} />
                        Retirada até {doacao.retirada}
                      </span>
                    )}
                  </div>

                  {doacao.observacoes && (
                    <p className="qd-observacoes">
                      {doacao.observacoes}
                    </p>
                  )}
                </div>

                <div className="qd-doacao-acoes">
                  {doacao.status === "Disponível" && (
                    <button
                      type="button"
                      className="qd-acao-secundaria"
                      onClick={() =>
                        alterarStatus(doacao.id, "Reservado")
                      }
                    >
                      Marcar reservada
                    </button>
                  )}

                  {doacao.status === "Reservado" && (
                    <button
                      type="button"
                      className="qd-acao-secundaria"
                      onClick={() =>
                        alterarStatus(doacao.id, "Concluído")
                      }
                    >
                      Concluir doação
                    </button>
                  )}

                  {doacao.status === "Concluído" && (
                    <button
                      type="button"
                      className="qd-acao-secundaria"
                      onClick={() =>
                        alterarStatus(doacao.id, "Disponível")
                      }
                    >
                      Disponibilizar novamente
                    </button>
                  )}

                  <button
                    type="button"
                    className="qd-acao-excluir"
                    onClick={() => excluirDoacao(doacao.id)}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}

            {doacoesFiltradas.length === 0 && (
              <div className="qd-vazio">
                <div className="qd-vazio-icone">
                  <Icon nome="doar" tamanho={30} />
                </div>

                <h3>Nenhuma doação encontrada</h3>
                <p>
                  Cadastre uma nova doação ou altere o filtro selecionado.
                </p>

                <button
                  type="button"
                  className="qd-botao-principal"
                  onClick={() => {
                    setMostrarFormulario(true);
                    setMensagem("");
                  }}
                >
                  <Icon nome="mais" />
                  Cadastrar doação
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
