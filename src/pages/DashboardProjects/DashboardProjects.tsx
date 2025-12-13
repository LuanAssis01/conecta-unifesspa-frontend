import { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, Calendar, Clock, User, BookOpen, FileText, Loader2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';

const DashboardProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await projectService.getAll();
            setProjects(data);
        } catch (err) {
            console.error('Erro ao carregar projetos:', err);
            setError(err instanceof Error ? err.message : 'Erro ao carregar projetos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleViewDetails = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleAccept = async () => {
        if (!selectedProject) return;
        try {
            setActionLoading(true);
            await projectService.updateStatus(selectedProject.id, 'APPROVED');
            await fetchProjects();
            setIsModalOpen(false);
            alert(`Projeto "${selectedProject.name}" aprovado com sucesso!`);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao aprovar projeto');
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedProject) return;
        try {
            setActionLoading(true);
            await projectService.updateStatus(selectedProject.id, 'REJECTED');
            await fetchProjects();
            setIsModalOpen(false);
            alert(`Projeto "${selectedProject.name}" rejeitado.`);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao rejeitar projeto');
        } finally {
            setActionLoading(false);
        }
    };

    const filteredProjects = projects.filter(
        (project) =>
            project.status === 'SUBMITTED' &&
            (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.creator?.name || '').toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const statusConfig = {
        'SUBMITTED': { label: 'Submetido', className: 'bg-yellow-100 text-yellow-700' },
        'APPROVED': { label: 'Aprovado', className: 'bg-blue-100 text-blue-700' },
        'REJECTED': { label: 'Rejeitado', className: 'bg-red-100 text-red-700' },
        'ACTIVE': { label: 'Ativo', className: 'bg-green-100 text-green-700' },
        'FINISHED': { label: 'Finalizado', className: 'bg-gray-100 text-gray-700' },
    };

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">
                            Aprovações
                        </h1>
                        <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                            Gerencie os projetos submetidos para aprovação
                        </p>
                    </div>
                </div>

                {/* Card de conteúdo */}
                <Card className="bg-white p-0 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-[var(--color-border)]">
                        <input
                            type="text"
                            placeholder="Buscar por título ou coordenador..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-[400px] px-4 py-3 border border-[var(--color-border)] rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                        />
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                                <span className="ml-2 text-secondary-600">Carregando...</span>
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center text-red-600">{error}</div>
                        ) : (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                            Projeto
                                        </th>
                                        <th className="text-left px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                            Coordenador
                                        </th>
                                        <th className="text-center px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                            Status
                                        </th>
                                        <th className="text-center px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em]">
                                            Visualização
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProjects.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                                Nenhum projeto pendente de aprovação
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProjects.map((project) => {
                                            const config = statusConfig[project.status] || { label: project.status, className: 'bg-gray-100 text-gray-700' };

                                            return (
                                                <tr key={project.id}>
                                                    <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                                        <div className="flex items-center gap-4">
                                                            {project.img_url && (
                                                                <img
                                                                    src={project.img_url}
                                                                    alt=""
                                                                    className="w-10 h-10 rounded-lg object-cover"
                                                                />
                                                            )}
                                                            <span className="font-semibold">{project.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                                        {project.creator?.name || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-center">
                                                        <span
                                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${config.className}`}
                                                        >
                                                            {config.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                                                                onClick={() => handleViewDetails(project)}
                                                                title="Visualizar Detalhes"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Card>
            </main>

            {/* Project Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Detalhes do Projeto"
                className="max-w-2xl"
            >
                {selectedProject && (
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                            {selectedProject.img_url && (
                                <img
                                    src={selectedProject.img_url}
                                    alt={selectedProject.name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedProject.name}</h3>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <BookOpen size={16} />
                                    <span>{selectedProject.course?.name || 'Sem curso'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                    <User size={16} />
                                    <span>{selectedProject.creator?.name || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Descrição</h4>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {selectedProject.description || 'Sem descrição'}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
                                    <Calendar size={18} />
                                    <span>Início</span>
                                </div>
                                <p className="text-gray-600">{new Date(selectedProject.start_date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
                                    <Clock size={18} />
                                    <span>Duração</span>
                                </div>
                                <p className="text-gray-600">{selectedProject.duration ? `${selectedProject.duration} meses` : 'N/A'}</p>
                            </div>
                        </div>

                        {/* Results */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Resultados Esperados</h4>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {selectedProject.expected_results || 'Não informado.'}
                            </p>
                        </div>

                        {/* File */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Documentação</h4>
                            {selectedProject.proposal_document_url ? (
                                <a
                                    href={selectedProject.proposal_document_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition group"
                                >
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 group-hover:text-primary-600 transition">Proposta do Projeto</p>
                                        <p className="text-xs text-gray-500">Clique para visualizar</p>
                                    </div>
                                </a>
                            ) : (
                                <p className="text-sm text-gray-500 italic">Nenhum arquivo anexado.</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-6 border-t border-gray-100">
                            <button
                                onClick={handleReject}
                                disabled={actionLoading}
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-red-200 text-red-600 rounded-lg font-bold hover:bg-red-50 transition disabled:opacity-50"
                            >
                                {actionLoading ? <Loader2 size={20} className="animate-spin" /> : <XCircle size={20} />}
                                Rejeitar
                            </button>
                            <button
                                onClick={handleAccept}
                                disabled={actionLoading}
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-md hover:shadow-lg disabled:opacity-50"
                            >
                                {actionLoading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                                Aprovar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DashboardProjects;