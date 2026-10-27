
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

export default function Inicio() {
    const navigate = useNavigate();

    return (
        <div className="principal">
            <header className="cima">
                <Link to="/" aria-label="Página inicial">
                    <img
                        src="/assets/images/logo.png"
                        alt="Alimento que Conecta"
                    />
                </Link>

                <Link className="ini" to="/">
                    Início
                </Link>

                <Link to="/ComoFunciona">
                    Como funciona
                </Link>

                <Link to="/Doacoes">
                    Doações
                </Link>

                <Link to="/Instituicoes">
                    Instituições
                </Link>

                <button
                    className="um"
                    type="button"
                    onClick={() => navigate("/Login")}
                >
                    Entrar
                </button>

                <Link className="link-criar" to="/Criar">
                    <button className="dois" type="button">
                        Criar conta
                    </button>
                </Link>
            </header>

            <main>
                <section className="maior">
                    <div className="texto">
                        <h1 className="menos">
                            Menos desperdício.
                            <br />
                            <span>Mais alimento</span>
                            <br />
                            chegando a quem precisa.
                        </h1>

                        <p className="conectamos">
                            Conectamos estabelecimentos que possuem
                            <br />
                            excedentes alimentares a instituições
                            <br />
                            que precisam deles.
                        </p>
                    </div>

                    <div className="foto">
                        <img
                            src="/assets/images/bonequinhos.png"
                            alt="Pessoas conectadas pela solidariedade"
                            width={400}
                        />
                    </div>
                </section>

                <section className="botoes">
                    <Link to="/QueroDoar">
                        <button className="doar" type="button">
                            Quero doar
                        </button>
                    </Link>

                    <Link to="/Doacoes">
                        <button className="doardois" type="button">
                            Preciso de alimentos
                        </button>
                    </Link>
                </section>

                <section className="bege">
                    <div className="icons">
                        <img
                            src="/assets/images/maca.png"
                            alt="Maçã representando alimentos"
                            width={150}
                        />

                        <img
                            src="/assets/images/pessoas.png"
                            alt="Pessoas da comunidade"
                            width={150}
                        />

                        <img
                            src="/assets/images/folha.png"
                            alt="Folha representando sustentabilidade"
                            width={150}
                        />
                    </div>

                    <div className="testu">
                        <p>Conecta estabelecimentos e instituições</p>
                        <p>Combate a fome e o desperdício</p>
                        <p className="sim">Fortalece as comunidades</p>
                    </div>
                </section>
            </main>
        </div>
    );
}
