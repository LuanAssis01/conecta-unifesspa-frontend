// src/pages/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  mockStatistics,
  mockProjects,
} from "../../services/mockData";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import type { Project, ProjectStatus } from "../../types/projectTypes";



const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = mockStatistics;
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    setRecentProjects(mockProjects.slice(0, 5));
  }, []);

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
        className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${config.classes}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto md:p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-(--color-text-secondary)">
              Bem-vindo de volta, {user?.name}!
            </p>
          </div>
          <img
            src="/src/assets/icons/sino.svg"
            alt="Notificações"
            className="w-8 h-8 cursor-pointer transition-transform hover:scale-110"
          />
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mb-8 md:grid-cols-1">
          <Card className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-(--color-text-secondary) mb-2">
                  Total de Projetos
                </p>
                <h3 className="text-3xl font-extrabold text-(--color-text) mb-1">
                  {stats.totalProjects}
                </h3>
                <p className="text-sm text-(--color-text-secondary)">
                  +{stats.projectsThisMonth} este mês
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <img
                  src="/src/assets/icons/projetos.svg"
                  alt="Projetos"
                  className="w-7 h-7"
                />
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-(--color-text-secondary) mb-2">
                  Projetos Ativos
                </p>
                <h3 className="text-3xl font-extrabold text-(--color-text) mb-1">
                  {stats.activeProjects}
                </h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Em andamento
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <img
                  src="/src/assets/icons/home.svg"
                  alt="Ativos"
                  className="w-7 h-7"
                />
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-(--color-text-secondary) mb-2">
                  Total de Usuários
                </p>
                <h3 className="text-3xl font-extrabold text-(--color-text) mb-1">
                  {stats.totalUsers}
                </h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Participantes
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <img
                  src="/src/assets/icons/usuarios.svg"
                  alt="Usuários"
                  className="w-7 h-7"
                />
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-(--color-text-secondary) mb-2">
                  Aprovações Pendentes
                </p>
                <h3 className="text-3xl font-extrabold text-(--color-text) mb-1">
                  {stats.pendingApprovals}
                </h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Aguardando
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <img
                  src="/src/assets/icons/aprovacoes.svg"
                  alt="Aprovações"
                  className="w-7 h-7"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Projects Table */}
        <Card title="Projetos Recentes" className="bg-white">
          <div className="overflow-x-auto md:overflow-x-scroll">
            <table className="w-full border-collapse">
              <thead className="bg-(--color-surface)">
                <tr>
                  <th className="text-left px-4 py-4 font-bold text-(--color-text) text-sm uppercase tracking-wider">
                    Projeto
                  </th>
                  <th className="text-left px-4 py-4 font-bold text-(--color-text) text-sm uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="text-left px-4 py-4 font-bold text-(--color-text) text-sm uppercase tracking-wider">
                    Coordenador
                  </th>
                  <th className="text-left px-4 py-4 font-bold text-(--color-text) text-sm uppercase tracking-wider">
                    Participantes
                  </th>
                  <th className="text-left px-4 py-4 font-bold text-(--color-text) text-sm uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-4 py-4 border-t border-(--color-border) font-semibold text-(--color-text)">
                      {project.title}
                    </td>
                    <td className="px-4 py-4 border-t border-(--color-border) text-(--color-text-secondary)">
                      {project.category}
                    </td>
                    <td className="px-4 py-4 border-t border-(--color-border) text-(--color-text-secondary)">
                      {project.coordinator}
                    </td>
                    <td className="px-4 py-4 border-t border-(--color-border) text-(--color-text-secondary)">
                      {project.participants}
                    </td>
                    <td className="px-4 py-4 border-t border-(--color-border)">
                      {getStatusBadge(project.status)}
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

export default Dashboard;
