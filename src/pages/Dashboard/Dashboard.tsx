import { useState, useEffect } from 'react';
import { FolderOpen, Home, CheckSquare, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Project, ProjectMetrics } from '../../types';
import { projectService } from '../../services/projectService';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<ProjectMetrics>({ total: 0, active: 0, finished: 0, inactive: 0 });
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Buscar métricas e projetos em paralelo
                const [metricsData, projectsData] = await Promise.all([
                    projectService.getMetrics(),
                    projectService.getAll()
                ]);
                
                setStats(metricsData);
                // Pegar apenas os 5 projetos mais recentes
                setRecentProjects(projectsData.slice(0, 5));
            } catch (err) {
                console.error('Erro ao carregar dashboard:', err);
                setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen bg-secondary-50">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-secondary-800 mb-2">
                            Dashboard
                        </h1>
                        <p className="text-secondary-600 text-lg">
                            Bem-vindo de volta, {user?.name}!
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Total de projetos</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.total}
                                </h3>
                            </div>
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                                <FolderOpen size={24} className="text-primary-600" />
                            </div>
                        </div>
                    </Card>

                    {/* Active */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Projetos ativos</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.active}
                                </h3>
                            </div>
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Home size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </Card>

                    {/* Finished */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Projetos concluídos</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.finished}
                                </h3>
                            </div>
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckSquare size={24} className="text-green-600" />
                            </div>
                        </div>
                    </Card>

                    {/* Inactive */}
                    <Card className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-sm text-secondary-600 mb-2">Projetos inativos</p>
                                <h3 className="text-2xl font-extrabold text-secondary-800 mb-1">
                                    {stats.inactive}
                                </h3>
                            </div>
                            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                                <FolderOpen size={24} className="text-gray-600" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Projects Table */}
                <Card className="bg-white rounded-xl">
                    {loading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                            <span className="ml-2 text-secondary-600">Carregando...</span>
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-600">
                            {error}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-secondary-100">
                                    <tr>
                                        <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                            Projeto
                                        </th>
                                        <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                            Coordenador
                                        </th>
                                        <th className="text-left p-4 font-bold text-secondary-800 text-sm uppercase tracking-wide">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentProjects.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="p-8 text-center text-secondary-500">
                                                Nenhum projeto encontrado
                                            </td>
                                        </tr>
                                    ) : (
                                        recentProjects.map((project) => {
                                            const statusConfig = {
                                                'SUBMITTED': { label: 'Submetido', className: 'bg-yellow-100 text-yellow-700' },
                                                'APPROVED': { label: 'Aprovado', className: 'bg-blue-100 text-blue-700' },
                                                'REJECTED': { label: 'Rejeitado', className: 'bg-red-100 text-red-700' },
                                                'ACTIVE': { label: 'Ativo', className: 'bg-green-100 text-green-700' },
                                                'FINISHED': { label: 'Finalizado', className: 'bg-gray-100 text-gray-700' },
                                            };

                                            const config = statusConfig[project.status] || { label: project.status, className: 'bg-gray-100 text-gray-700' };

                                            return (
                                                <tr key={project.id} className="border-t border-secondary-200">
                                                    <td className="font-semibold text-secondary-800 p-4">
                                                        {project.name}
                                                    </td>
                                                    <td className="p-4 text-secondary-600">
                                                        {project.creator?.name || 'N/A'}
                                                    </td>
                                                    <td className="p-4">
                                                        <span
                                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${config.className}`}
                                                        >
                                                            {config.label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
};

export default Dashboard;