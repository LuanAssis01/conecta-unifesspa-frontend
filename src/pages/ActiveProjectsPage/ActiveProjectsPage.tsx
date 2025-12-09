// src/pages/ActiveProjectsPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { mockProjects } from "../../services/mockData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Button from "../../components/Button/Button";

const ActiveProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const activeProjects = mockProjects.filter(
    (project) => user?.projects && user.projects.includes(project.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-(--color-background)">
      <Header />

      <div className="max-w-[1400px] mx-auto px-8 py-12 flex-1 w-full md:px-4 md:py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-(--color-text) mb-3 md:text-3xl">
            Meus Projetos Ativos
          </h1>
          <p className="text-lg text-(--color-text-secondary)">
            Acompanhe os projetos em que você está participando
          </p>
        </div>

        {activeProjects.length > 0 ? (
          <div
            className="
              grid gap-8
              grid-cols-[repeat(auto-fit,minmax(350px,1fr))]
              md:grid-cols-1
            "
          >
            {activeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showActions={true}
                onView={(p) => navigate(`/projetos/${p.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center px-8 py-16 bg-(--color-surface) rounded-2xl flex flex-col items-center gap-6">
            <img
              src="/src/assets/icons/projetos.svg"
              alt=""
              className="w-16 h-16 opacity-20 grayscale"
            />
            <h3 className="text-2xl font-bold text-(--color-text)">
              Você não tem projetos ativos
            </h3>
            <p className="text-(--color-text-secondary) max-w-md">
              Explore os projetos disponíveis e inscreva-se para participar.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate("/aluno/projetos")}
              className="mt-4"
            >
              Explorar Projetos
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ActiveProjectsPage;
