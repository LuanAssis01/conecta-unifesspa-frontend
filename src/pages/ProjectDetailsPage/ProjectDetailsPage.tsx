import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Mail, Loader2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

const ProjectDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const data = await projectService.getById(id);
                setProject(data);
            } catch (err) {
                console.error('Erro ao carregar projeto:', err);
                setError(err instanceof Error ? err.message : 'Erro ao carregar projeto');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
                    <span className="ml-3 text-secondary-600 text-lg">Carregando projeto...</span>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                            {error || 'Projeto não encontrado'}
                        </h1>
                        <Button onClick={() => navigate('/projetos')}>Voltar para Projetos</Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Status labels and colors
    // Status labels and colors
    const statusLabels: Record<string, string> = {
        SUBMITTED: 'Submetido',
        APPROVED: 'Aprovado',
        REJECTED: 'Rejeitado',
        ACTIVE: 'Ativo',
        FINISHED: 'Finalizado',
    };

    const statusColors: Record<string, string> = {
        SUBMITTED: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        APPROVED: 'bg-blue-100 text-blue-700 border-blue-200',
        REJECTED: 'bg-red-100 text-red-700 border-red-200',
        ACTIVE: 'bg-green-100 text-green-700 border-green-200',
        FINISHED: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    const handleSubscribe = () => {
        if (project.registration_form_url) {
            window.open(project.registration_form_url, '_blank');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary-50">
            <Header />

            <main className="flex-1">
                {/* Hero Section with Gradient */}
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-12">
                    <div className="max-w-[1000px] mx-auto px-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
                            <Link to="/projetos" className="hover:text-white transition">
                                Projetos
                            </Link>
                            <ChevronRight size={16} />
                            <span className="text-white font-medium">{project.name}</span>
                        </nav>

                        {/* Title & Status */}
                        <div className="flex items-start justify-between gap-6 mb-4">
                            <h1 className="text-4xl font-extrabold leading-tight flex-1">
                                {project.name}
                            </h1>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 bg-white ${statusColors[project.status]}`}>
                                {statusLabels[project.status]}
                            </span>
                        </div>

                        {/* Subtitle */}
                        {project.subtitle && (
                            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mb-4">
                                {project.subtitle}
                            </p>
                        )}

                        {/* Description (Short) */}
                        <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                            {project.description || 'Sem descrição disponível.'}
                        </p>


                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-[1000px] mx-auto px-8 py-12">
                    {/* Main Grid - Image + Content */}
                    <div className="grid grid-cols-[400px_1fr] gap-12 mb-12 lg:grid-cols-1">
                        {/* Left Column - Image */}
                        <div>
                            <div className="sticky top-8">
                                {project.img_url ? (
                                    <img
                                        src={project.img_url}
                                        alt={project.name}
                                        className="w-full rounded-xl shadow-lg"
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl shadow-lg flex items-center justify-center">
                                        <span className="text-primary-600 font-bold text-6xl">{project.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-10">
                            {/* Visão Geral */}
                            <section>
                                <h2 className="text-2xl font-bold text-secondary-900 mb-4 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                                    Visão geral do projeto
                                </h2>
                                <p className="text-secondary-700 leading-relaxed text-lg">
                                    {project.overview || project.description || 'Sem descrição detalhada disponível.'}
                                </p>
                            </section>

                            {/* Resultados Esperados */}
                            {project.expected_results && (
                                <section>
                                    <h2 className="text-2xl font-bold text-secondary-900 mb-4 flex items-center gap-3">
                                        <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                                        Resultados Esperados
                                    </h2>
                                    <p className="text-secondary-700 leading-relaxed text-lg">
                                        {project.expected_results}
                                    </p>
                                </section>
                            )}

                            {/* Indicadores de Impacto */}
                            {project.impactIndicators && project.impactIndicators.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-3">
                                        <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                                        Indicadores de Impacto
                                    </h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        {project.impactIndicators.map((indicator, index) => {
                                            const colors = [
                                                { bg: 'from-primary-50', border: 'border-primary-100', text: 'text-primary-600' },
                                                { bg: 'from-blue-50', border: 'border-blue-100', text: 'text-blue-600' },
                                                { bg: 'from-green-50', border: 'border-green-100', text: 'text-green-600' },
                                            ];
                                            const color = colors[index % colors.length];
                                            return (
                                                <div key={indicator.id} className={`bg-gradient-to-br ${color.bg} to-white p-6 rounded-xl border ${color.border} shadow-sm hover:shadow-md transition`}>
                                                    <p className={`text-sm ${color.text} font-semibold mb-2 uppercase tracking-wide`}>
                                                        {indicator.title}
                                                    </p>
                                                    <p className={`text-4xl font-extrabold ${color.text}`}>
                                                        {indicator.value}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Project Info */}
                            <section className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
                                <h2 className="text-xl font-bold text-secondary-900 mb-4">Informações do Projeto</h2>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Curso:</span>
                                        <span className="text-secondary-900 font-medium">{project.course?.name || 'Não informado'}</span>
                                    </div>

                                    {project.start_date && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Data início:</span>
                                            <span className="text-secondary-900 font-medium">
                                                {new Date(project.start_date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    )}

                                    {project.duration && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Duração:</span>
                                            <span className="text-secondary-900 font-medium">{project.duration}</span>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Status:</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                                            {statusLabels[project.status]}
                                        </span>
                                    </div>

                                    {project.keywords && project.keywords.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-sm font-semibold text-secondary-500 min-w-[120px]">Palavras-chave:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {project.keywords.map(keyword => (
                                                    <span
                                                        key={keyword.id}
                                                        className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold border border-primary-100"
                                                    >
                                                        #{keyword.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Creator/Coordinator */}
                            {project.creator && (
                                <section className="bg-gradient-to-br from-secondary-50 to-white p-6 rounded-xl border border-secondary-200 shadow-sm">
                                    <h2 className="text-xl font-bold text-secondary-900 mb-4">Coordenador do Projeto</h2>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center border-4 border-white shadow-md">
                                            <span className="text-primary-600 font-bold text-2xl">
                                                {project.creator.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-secondary-900 text-lg">
                                                {project.creator.name}
                                            </h3>
                                            <p className="text-sm text-secondary-600">
                                                {project.course?.name || 'Professor'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-secondary-200">
                                        <p className="text-sm text-secondary-600 mb-2">
                                            Dúvidas? Entre em contato:
                                        </p>
                                        <a
                                            href={`mailto:${project.creator.email}`}
                                            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition group"
                                        >
                                            <Mail size={18} className="group-hover:scale-110 transition" />
                                            {project.creator.email}
                                        </a>
                                    </div>
                                </section>
                            )}

                            {/* CTA Button */}
                            {project.registration_form_url && project.status === 'ACTIVE' && (
                                <div className="pt-6">
                                    <Button
                                        variant="primary"
                                        onClick={handleSubscribe}
                                        className="w-full py-4 text-lg font-bold"
                                    >
                                        Candidate-se ao Projeto
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetailsPage;
