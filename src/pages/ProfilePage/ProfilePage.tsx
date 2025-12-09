import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { mockProjects } from "../../services/mockData";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import type { Project } from "../../types/projectTypes";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  // Mock getting user's projects
  const userProjects: Project[] = mockProjects.filter(
    (p) =>
      p.coordinator === user?.name ||
      (user?.projects && user.projects.includes(p.id))
  );

  const getRoleLabel = () => {
    if (user?.role === "TEACHER") return "Professor";
    if (user?.role === "ADMIN") return "Administrador";
    if (user?.role === "STUDENT") return "Aluno";
    return "Usuário";
  };

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto md:p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
            Meu Perfil
          </h1>
          <p className="text-lg text-(--color-text-secondary)">
            Gerencie suas informações e visualize suas atividades
          </p>
        </div>

        <div className="grid grid-cols-[350px_1fr] gap-8 lg:grid-cols-1">
          {/* User Info Card */}
          <Card className="h-fit bg-white lg:max-w-[500px] lg:mx-auto lg:w-full">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4">
                <img
                  src={user?.photo || "/src/assets/images/profile_photo.png"}
                  alt={user?.name}
                  className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-(--color-primary) border-2 border-white rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                  <img
                    src="/src/assets/icons/edit.svg"
                    alt="Alterar foto"
                    className="w-4 h-4 brightness-0 invert"
                  />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-(--color-text) mb-1">
                  {user?.name}
                </h2>
                <p className="text-(--color-primary) font-semibold text-sm uppercase mb-1">
                  {getRoleLabel()}
                </p>
                <p className="text-(--color-text-secondary) text-sm">
                  {user?.department || user?.course}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-(--color-border) mb-6">
              <div className="flex justify-between items-center">
                <span className="text-(--color-text-secondary) text-sm">
                  Email
                </span>
                <span className="text-(--color-text) font-semibold text-sm">
                  {user?.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-(--color-text-secondary) text-sm">
                  Telefone
                </span>
                <span className="text-(--color-text) font-semibold text-sm">
                  (94) 99999-9999
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-(--color-text-secondary) text-sm">
                  Matrícula/SIAPE
                </span>
                <span className="text-(--color-text) font-semibold text-sm">
                  2024001234
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="primary" fullWidth>
                Editar Perfil
              </Button>
              <Button variant="outline" fullWidth>
                Alterar Senha
              </Button>
            </div>
          </Card>

          {/* Activity/Projects Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-(--color-text)">
              Meus Projetos
            </h3>
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {userProjects.length > 0 ? (
                userProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    showActions={true}
                    onView={() => {}}
                  />
                ))
              ) : (
                <Card className="text-center px-12 py-12 flex flex-col items-center gap-4 text-(--color-text-secondary) col-span-full bg-white">
                  <p>Você ainda não participa de nenhum projeto.</p>
                  <Button variant="outline" size="small">
                    Explorar Projetos
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
