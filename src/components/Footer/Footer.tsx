import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div
                className="
                    max-w-[1400px] mx-auto 
                    grid gap-8 
                    px-8 py-12 
                    md:grid-cols-3
                    [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]
                "
            >
                {/* BRAND */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 mb-2">
                        <img
                            src="/src/assets/logos/logo.png"
                            alt="Conecta Unifesspa"
                            className="w-10 h-auto"
                        />
                        <h3 className="text-2xl font-extrabold text-primary-400">
                            Conecta Unifesspa
                        </h3>
                    </div>

                    <p className="text-white/80 leading-relaxed">
                        Plataforma de gestão e integração de projetos universitários da UNIFESSPA.
                    </p>
                </div>

                {/* LINKS */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-lg font-bold mb-2">Links Rápidos</h4>

                    <nav className="flex flex-col gap-3">
                        <Link
                            to="/"
                            className="text-white/80 hover:text-green-500 transition-colors"
                        >
                            Home
                        </Link>

                        <Link
                            to="/sobre"
                            className="text-white/80 hover:text-green-500 transition-colors"
                        >
                            Sobre
                        </Link>

                        <Link
                            to="/projetos"
                            className="text-white/80 hover:text-green-500 transition-colors"
                        >
                            Projetos
                        </Link>

                        <Link
                            to="/contato"
                            className="text-white/80 hover:text-green-500 transition-colors"
                        >
                            Contato
                        </Link>
                    </nav>
                </div>

                {/* CONTATO */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-lg font-bold mb-2">Contato</h4>

                    <div className="flex flex-col gap-2 text-white/80">
                        <p>Email: contato@unifesspa.edu.br</p>
                        <p>Telefone: (94) 2101-5900</p>
                        <p>Marabá - PA, Brasil</p>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-white/10 px-8 py-6 text-center text-white/60 text-sm">
                <p>
                    &copy; {new Date().getFullYear()} Conecta Unifesspa. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
