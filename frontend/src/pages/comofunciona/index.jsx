
import { Link } from "react-router-dom";
import "./index.scss";

function Icone({ tipo }) {
  const icones = {
    alimento: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21V11" />
        <path d="M12 14C4 14 3 7 3 4c6 0 9 3 9 10Z" />
        <path d="M12 17c0-6 4-9 9-9 0 5-2 9-9 9Z" />
      </svg>
    ),
    pessoas: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2" />
        <path d="M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </svg>
    ),
  };

  return <span className="como-icone">{icones[tipo]}</span>;
}

export default function ComoFunciona() {
  return (
    <main className="como-page">
      <header className="como-header">
        <Link to="/" className="como-logo">
          <img
            src="/assets/images/logo.png"
            alt="Alimento que Conecta"
          />
        </Link>

        <nav className="como-nav">
          <Link to="/">Início</Link>
          <Link to="/ComoFunciona" className="ativo">
            Como funciona
          </Link>
          <Link to="/Doacoes">Doações</Link>
          <Link to="/Instituicoes">Instituições</Link>
        </nav>

        <div className="como-header-acoes">
          <Link to="/login" className="como-entrar">
            Entrar
          </Link>

          <Link to="/Criar" className="como-cadastrar">
            Criar conta
          </Link>
        </div>
      </header>

      <section className="como-hero">
        <div className="como-hero-conteudo">
          <span className="como-etiqueta">
            <Icone tipo="alimento" />
            Solidariedade que alimenta
          </span>

          <h1>
            Conectar alimentos.
            <br />
            <span>Transformar vidas.</span>
          </h1>

          <p>
            Aproximamos quem tem alimentos para doar de quem precisa
            deles. Uma conexão simples para reduzir o desperdício e
            levar esperança a mais pessoas.
          </p>

          <div className="como-botoes">
            <Link to="/QueroDoar" className="como-botao-principal">
              Quero doar alimentos →
            </Link>

            <Link to="/Doacoes" className="como-botao-secundario">
              Encontrar doações
            </Link>
          </div>

          <div className="como-impacto">
            <Icone tipo="check" />

            <div>
              <strong>Uma atitude solidária</strong>
              <span>Um impacto positivo na comunidade</span>
            </div>
          </div>
        </div>

        <div className="como-hero-visual">
          <img
            src="/assets/images/frutas.jpg"
            alt="Alimentos frescos para doação"
            className="como-imagem-principal"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="como-cartao-flutuante">
            <Icone tipo="check" />

            <div>
              <strong>Pequenas ações, grandes mudanças</strong>
              <span>Juntos contra o desperdício alimentar</span>
            </div>
          </div>
        </div>
      </section>

      <section className="como-etapas">
        <div className="como-titulo-secao">
          <span>É simples fazer a diferença</span>
          <h2>Como funciona?</h2>
          <p>
            Três passos para transformar alimentos excedentes em
            oportunidades para quem precisa.
          </p>
        </div>

        <div className="como-etapas-lista">
          <article className="como-etapa-card">
            <div className="como-numero">01</div>
            <Icone tipo="alimento" />
            <h3>Cadastre os alimentos</h3>
            <p>
              Doadores cadastram alimentos disponíveis, informando a
              quantidade e o prazo para retirada.
            </p>
          </article>

          <article className="como-etapa-card">
            <div className="como-numero">02</div>
            <Icone tipo="pessoas" />
            <h3>Encontre uma doação</h3>
            <p>
              Instituições e pessoas interessadas podem consultar as
              doações disponíveis na plataforma.
            </p>
          </article>

          <article className="como-etapa-card">
            <div className="como-numero">03</div>
            <Icone tipo="check" />
            <h3>Combine a retirada</h3>
            <p>
              Após a solicitação, doador e instituição combinam a
              retirada dos alimentos.
            </p>
          </article>
        </div>
      </section>

      <section className="como-publico">
        <div className="como-publico-texto">
          <span>Todo mundo pode participar</span>
          <h2>Uma rede de pessoas que fazem o bem.</h2>
          <p>
            Seja você um estabelecimento com alimentos excedentes ou
            uma instituição que ajuda pessoas, existe um lugar para
            você nessa rede.
          </p>
        </div>

        <div className="como-publico-cards">
          <article>
            <Icone tipo="alimento" />
            <h3>Para quem doa</h3>
            <p>
              Compartilhe alimentos que ainda podem ser aproveitados
              e ajude a diminuir o desperdício.
            </p>
            <Link to="/QueroDoar">Quero contribuir →</Link>
          </article>

          <article>
            <Icone tipo="pessoas" />
            <h3>Para instituições</h3>
            <p>
              Encontre alimentos disponíveis e fortaleça o atendimento
              às pessoas da sua comunidade.
            </p>
            <Link to="/Instituicoes">Conhecer instituições →</Link>
          </article>
        </div>
      </section>

      <section className="como-final">
        <h2>O próximo passo pode começar com você.</h2>
        <p>
          Faça parte de uma comunidade que acredita que alimento bom
          não deve ser desperdiçado.
        </p>

        <Link to="/Criar" className="como-botao-principal">
          Fazer parte da rede →
        </Link>
      </section>

      <footer className="como-footer">
        <img
          src="/assets/images/logobranca.png"
          alt="Alimento que Conecta"
        />

        <p>Conectando alimentos, pessoas e oportunidades.</p>
        <span>© 2026 Alimento que Conecta</span>
      </footer>
    </main>
  );
}
