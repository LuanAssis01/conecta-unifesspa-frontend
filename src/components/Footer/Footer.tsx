// Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--color-text) text-white mt-auto">
      <div
        className="
          max-w-[1400px] mx-auto 
          px-8 py-12 
          grid gap-8 
          grid-cols-1 md:grid-cols-3
          md:px-8
        "
      >
        {/* Brand / Descrição */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <img
              src="/src/assets/logos/logo.png"
              alt="UNIFESSPA+"
              className="w-10 h-auto"
            />
            <h3 className="text-2xl font-extrabold text-(--color-primary)">
              UNIFESSPA+
            </h3>
          </div>
          <p className="text-white/80 leading-relaxed">
            Plataforma de gestão e integração de projetos universitários da
            UNIFESSPA.
          </p>
        </div>

        {/* Links rápidos */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold mb-2">Links Rápidos</h4>
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              className="text-white/80 no-underline transition-colors duration-200 hover:text-(--color-primary)"
            >
              Início
            </Link>
            <Link
              to="/projetos"
              className="text-white/80 no-underline transition-colors duration-200 hover:text-(--color-primary)"
            >
              Projetos
            </Link>
            <Link
              to="/contato"
              className="text-white/80 no-underline transition-colors duration-200 hover:text-(--color-primary)"
            >
              Contato
            </Link>
            <Link
              to="/sobre"
              className="text-white/80 no-underline transition-colors duration-200 hover:text-(--color-primary)"
            >
              Sobre
            </Link>
          </nav>
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold mb-2">Contato</h4>
          <div className="flex flex-col gap-2 text-white/80">
            <p>Email: contato@unifesspa.edu.br</p>
            <p>Telefone: (94) 2101-5900</p>
            <p>Marabá - PA, Brasil</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-8 py-6 text-center text-white/60 text-sm">
        <p>&copy; {year} UNIFESSPA+. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
