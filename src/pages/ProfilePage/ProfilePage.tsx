import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { Plus, Edit, Mail, Loader2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!user?.id) return;
      
      try {
        // Buscar todos os projetos e filtrar pelo criador
        const allProjects = await projectService.getAll();
        const myProjects = allProjects.filter(p => p.creator_id === user.id);
        setUserProjects(myProjects);
      } catch (err: any) {
        console.error('Erro ao carregar projetos:', err);
        setError('Erro ao carregar seus projetos');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [user?.id]);

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      <Sidebar />

      <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">Meu Perfil</h1>
            <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
              Gerencie suas informações e visualize suas atividades
            </p>
          </div>
          {(user?.role === 'teacher' || user?.role === 'admin') && (
            <Button
              variant="primary"
              onClick={() => navigate('/dashboard/projetos/novo')}
              className="flex items-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 transition-all"
            >
              <Plus size={20} />
              Submeter Projeto
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* User Info Card */}
          <Card className="h-fit bg-white border border-[var(--color-border)] shadow-sm p-0 overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent p-8 flex flex-col items-center text-center">
              <div className="mb-4 relative group">
                <div className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <img
                  src={user?.photo || '/src/assets/images/profile_photo.png'}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">{user?.name}</h2>
                <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-wider mb-3 bg-[var(--color-primary)]/10 px-3 py-1 rounded-full inline-block">
                  {user?.role === 'teacher'
                    ? 'Professor'
                    : user?.role === 'admin'
                      ? 'Administrador'
                      : 'Professor'}
                </p>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-3 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[var(--color-text-secondary)] text-xs font-medium uppercase tracking-wide">Email</span>
                  <span className="text-[var(--color-text)] font-semibold text-sm">{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-2">
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/dashboard/config')}
                className="!border-[var(--color-border)] hover:!bg-gray-50 hover:!text-[var(--color-primary)] !rounded-xl"
              >
                Editar Perfil
              </Button>
            </div>
          </Card>

          {/* Activity / Projects Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-3">
              Meus Projetos
              <span className="text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-primary)]/20">
                {userProjects.length}
              </span>
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="animate-spin text-primary-500" size={48} />
              </div>
            ) : error ? (
              <Card className="col-span-full p-8 text-center text-red-500">
                {error}
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {userProjects.length > 0 ? (
                  userProjects.map(project => (
                    <div key={project.id} className="relative group">
                      <ProjectCard
                        project={project}
                        showActions={true}
                        showDate={false}
                        showCourse={false}
                        showImage={false}
                        onView={
                          (project.status === 'APPROVED' || project.status === 'ACTIVE' || project.status === 'FINISHED')
                            ? () => navigate(`/projetos/${project.id}`)
                            : undefined
                        }
                      />
                      {/* Edit Button - Always Visible for Active/Approved */}
                      {(project.status === 'ACTIVE' || project.status === 'APPROVED') && (
                        <div className="absolute top-4 right-4 z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/dashboard/projetos/editar/${project.id}`);
                            }}
                            className="bg-white/90 backdrop-blur-sm text-[var(--color-text)] p-2.5 rounded-full shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 border border-gray-100 hover:scale-110 active:scale-95"
                            title="Editar Projeto"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <Card className="col-span-full flex flex-col items-center justify-center gap-6 p-16 text-[var(--color-text-secondary)] text-center border-dashed border-2 border-[var(--color-border)] bg-gray-50/50 rounded-2xl">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm border border-gray-100">
                      <Plus className="text-gray-400" size={40} />
                    </div>
                    <div className="max-w-md">
                      <p className="font-bold text-xl text-[var(--color-text)] mb-2">Nenhum projeto encontrado</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">Você ainda não submeteu nenhum projeto. Comece agora mesmo a compartilhar suas iniciativas.</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/dashboard/projetos/novo')}
                      className="!rounded-xl px-8 shadow-lg shadow-[var(--color-primary)]/20"
                    >
                      Submeter Primeiro Projeto
                    </Button>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
