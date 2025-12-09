// src/pages/StudentProjectsPage/StudentProjectsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockProjects } from "../../services/mockData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import type { Project } from "../../types/projectTypes";

const StudentProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProjects: Project[] = mockProjects.filter((project) => {
    const matchesFilter = filter === "all" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories: string[] = [
    ...new Set(mockProjects.map((p) => p.category)),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-(--color-background)">
      <Header />

      <div className="max-w-[1400px] mx-auto px-8 py-12 flex-1 md:px-4 md:py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-(--color-text) mb-3 md:text-3xl">
            Projetos Disponíveis
          </h1>
          <p className="text-lg text-(--color-text-secondary)">
            Explore e participe dos projetos da UNIFESSPA
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-6">
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-[500px] px-5 py-3.5 border border-(--color-border) rounded-lg text-base transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
          />

          <div className="flex gap-3 flex-wrap">
            <button
              className={`px-5 py-2.5 border rounded-lg font-semibold cursor-pointer transition-all ${
                filter === "all"
                  ? "bg-(--color-primary) text-white border-(--color-primary)"
                  : "border-(--color-border) bg-white hover:border-(--color-primary) hover:text-(--color-primary)"
              }`}
              onClick={() => setFilter("all")}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2.5 border rounded-lg font-semibold cursor-pointer transition-all ${
                  filter === category
                    ? "bg-(--color-primary) text-white border-(--color-primary)"
                    : "border-(--color-border) bg-white hover:border-(--color-primary) hover:text-(--color-primary)"
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(350px,1fr))] md:grid-cols-1">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showActions={true}
                onView={(p) => navigate(`/projetos/${p.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center px-8 py-16 text-(--color-text-secondary) text-lg">
            <p>Nenhum projeto encontrado com os critérios selecionados.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StudentProjectsPage;
