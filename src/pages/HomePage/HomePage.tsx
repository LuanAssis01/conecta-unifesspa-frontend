import React from "react";
import { useNavigate } from "react-router-dom";
import { mockProjects } from "../../services/mockData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Button from "../../components/Button/Button";
import type { Project } from "../../types/projectTypes";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProjects: Project[] = mockProjects.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-emerald-50 to-emerald-100 py-16 px-8 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 gap-16 items-center lg:grid-cols-1 lg:gap-8">
          <div className="flex flex-col gap-8">
            <h1 className="text-[3.5rem] font-extrabold leading-tight text-(--color-text) lg:text-[2.5rem] md:text-[2rem]">
              Conectando{" "}
              <span className="text-(--color-primary)">Projetos</span> e{" "}
              <span className="text-(--color-primary)">Pessoas</span>
            </h1>
            <p className="text-xl leading-relaxed text-(--color-text-secondary) md:text-base">
              A plataforma que integra alunos, professores e projetos
              universitários da UNIFESSPA. Participe de iniciativas
              transformadoras e contribua para o desenvolvimento acadêmico.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate("/projetos")}
              >
                Explorar Projetos
              </Button>
              <Button
                variant="outline"
                size="large"
                onClick={() => navigate("/cadastro")}
              >
                Cadastre-se Agora
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/src/assets/images/foto_unifesspa.png"
              alt="UNIFESSPA Campus"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-[1400px] mx-auto my-16 px-8 grid grid-cols-4 gap-8 lg:grid-cols-2 md:grid-cols-1 md:gap-4">
        <div className="bg-white p-8 rounded-2xl text-center shadow-md transition-transform hover:-translate-y-2">
          <h3 className="text-5xl font-extrabold text-(--color-primary) mb-2">
            45+
          </h3>
          <p className="text-base text-(--color-text-secondary) font-semibold">
            Projetos Ativos
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl text-center shadow-md transition-transform hover:-translate-y-2">
          <h3 className="text-5xl font-extrabold text-(--color-primary) mb-2">
            1250+
          </h3>
          <p className="text-base text-(--color-text-secondary) font-semibold">
            Estudantes
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl text-center shadow-md transition-transform hover:-translate-y-2">
          <h3 className="text-5xl font-extrabold text-(--color-primary) mb-2">
            150+
          </h3>
          <p className="text-base text-(--color-text-secondary) font-semibold">
            Professores
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl text-center shadow-md transition-transform hover:-translate-y-2">
          <h3 className="text-5xl font-extrabold text-(--color-primary) mb-2">
            25+
          </h3>
          <p className="text-base text-(--color-text-secondary) font-semibold">
            Cursos
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-[1400px] mx-auto my-16 px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-(--color-text) mb-4 md:text-3xl">
            Projetos em Destaque
          </h2>
          <p className="text-lg text-(--color-text-secondary)">
            Conheça alguns dos projetos que estão transformando a universidade
          </p>
        </div>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] mb-12 lg:grid-cols-1">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={(p) => navigate(`/projetos/${p.id}`)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="large"
            onClick={() => navigate("/projetos")}
          >
            Ver Todos os Projetos
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-(--color-primary) to-(--color-primary-dark) text-white py-20 px-8 text-center mt-16">
        <h2 className="text-4xl font-extrabold mb-4 md:text-3xl">
          Pronto para fazer a diferença?
        </h2>
        <p className="text-xl mb-8 opacity-95">
          Junte-se à comunidade UNIFESSPA+ e participe de projetos que
          transformam vidas
        </p>
        <div className="flex justify-center gap-4 flex-wrap md:flex-col md:items-center">
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate("/cadastro")}
          >
            Começar Agora
          </Button>
          <Button
            variant="outline"
            size="large"
            onClick={() => navigate("/contato")}
          >
            Fale Conosco
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
