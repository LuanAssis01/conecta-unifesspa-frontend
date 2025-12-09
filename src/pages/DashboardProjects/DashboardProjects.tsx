// src/pages/DashboardProjects/DashboardProjects.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockProjects } from "../../services/mockData";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import type { Project, ProjectStatus } from "../../types/projectTypes";

const DashboardProjects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: string | number) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: ProjectStatus) => {
    const statusConfig: Record<ProjectStatus, { label: string; classes: string }> = {
      ACTIVE: {
        label: "Ativo",
        classes: "bg-emerald-100 text-(--color-success)",
      },
      SUBMITTED: {
        label: "Em Análise",
        classes: "bg-amber-100 text-(--color-warning)",
      },
      APPROVED: {
        label: "Aprovado",
        classes: "bg-blue-100 text-blue-600",
      },
      REJECTED: {
        label: "Rejeitado",
        classes: "bg-red-100 text-red-600",
      },
      FINISHED: {
        label: "Finalizado",
        classes: "bg-gray-100 text-gray-600",
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${config.classes}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto md:p-4">
        <div className="flex justify-between items-center mb-8 md:flex-col md:items-start md:gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
              Gerenciar Projetos
            </h1>
            <p className="text-lg text-(--color-text-secondary)">
              Visualize e gerencie todos os projetos cadastrados
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/dashboard/projetos/novo")}
          >
            + Novo Projeto
          </Button>
        </div>

        <Card className="bg-white p-0 overflow-hidden">
          <div className="p-6 border-b border-(--color-border)">
            <input
              type="text"
              placeholder="Buscar por título ou coordenador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-(--color-border) rounded-lg text-sm transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-(--color-surface)">
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Projeto
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Coordenador
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 border-b border-(--color-border) align-middle">
                      <div className="flex items-center gap-4">
                        <img
                          src={project.image}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-(--color-text)">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) text-(--color-text) align-middle">
                      {project.category}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) text-(--color-text) align-middle">
                      {project.coordinator}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) align-middle">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) align-middle">
                      <div className="flex gap-2">
                        <button
                          className="w-8 h-8 rounded-lg border border-(--color-border) bg-white flex items-center justify-center cursor-pointer transition-all hover:bg-(--color-surface) hover:border-(--color-primary)"
                          onClick={() =>
                            navigate(`/dashboard/projetos/editar/${project.id}`)
                          }
                          title="Editar"
                        >
                          <img
                            src="/src/assets/icons/edit.svg"
                            alt="Editar"
                            className="w-4 h-4"
                          />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg border border-(--color-border) bg-white flex items-center justify-center cursor-pointer transition-all hover:border-(--color-error) hover:bg-red-50"
                          onClick={() => handleDelete(project.id)}
                          title="Excluir"
                        >
                          <img
                            src="/src/assets/icons/trash.svg"
                            alt="Excluir"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DashboardProjects;
