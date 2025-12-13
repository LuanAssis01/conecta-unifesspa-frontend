import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { courseService } from '../../services/courseService';
import { Project, Course } from '../../types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

const PublicProjectsPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [projectsData, coursesData] = await Promise.all([
                    projectService.getAllFiltered({
                        status: selectedStatus as any || undefined,
                        course: selectedCourse || undefined,
                        search: searchTerm || undefined,
                    }),
                    courseService.getAll()
                ]);
                setProjects(projectsData);
                setCourses(coursesData);
            } catch (err) {
                console.error('Erro ao carregar projetos:', err);
                setError(err instanceof Error ? err.message : 'Erro ao carregar projetos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, selectedCourse, selectedStatus]);

    // Pagination
    const projectsPerPage = 9;
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const paginatedProjects = projects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (value: string) => {
            setter(value);
            setCurrentPage(1);
        };
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCourse('');
        setSelectedStatus('');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchTerm || selectedCourse || selectedStatus;

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

    return (
        <div className="min-h-screen flex flex-col bg-secondary-50">
            <Header />

            <main className="flex-1">
                {/* Hero Section - Light Background */}
                <div className="bg-white border-b border-secondary-200 pt-16 pb-20 px-8">
                    <div className="max-w-[1400px] mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 mb-4">
                            Projetos de Extensão
                        </h1>
                        <p className="text-xl text-secondary-600 max-w-2xl mx-auto mb-10">
                            Explore as iniciativas que estão transformando a comunidade acadêmica e a sociedade.
                        </p>

                        {/* Search Bar - Floating Effect */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center bg-white border-2 border-secondary-200 rounded-full shadow-lg overflow-hidden focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10 transition-all">
                                <Search className="ml-6 text-secondary-400 flex-shrink-0" size={24} />
                                <input
                                    type="text"
                                    placeholder="Busque por projetos, temas ou palavras-chave..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full px-4 py-4 text-lg outline-none border-none ring-0 focus:ring-0 focus:outline-none text-secondary-900 placeholder:text-secondary-400"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="p-2 mr-2 text-secondary-400 hover:text-secondary-600 rounded-full hover:bg-secondary-100"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-[1400px] mx-auto px-8 py-12">
                    {/* Filters Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <div className="flex items-center gap-2 text-secondary-500 font-medium mr-2">
                                <Filter size={20} />
                                <span className="whitespace-nowrap">Filtrar por:</span>
                            </div>

                            <select
                                value={selectedCourse}
                                onChange={(e) => handleFilterChange(setSelectedCourse)(e.target.value)}
                                className="py-2 px-4 bg-white border border-secondary-200 rounded-lg text-sm font-medium text-secondary-700 hover:border-primary-500 focus:outline-none focus:border-primary-500 transition cursor-pointer shadow-sm"
                            >
                                <option value="">Todos os Cursos</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>

                            <select
                                value={selectedStatus}
                                onChange={(e) => handleFilterChange(setSelectedStatus)(e.target.value)}
                                className="py-2 px-4 bg-white border border-secondary-200 rounded-lg text-sm font-medium text-secondary-700 hover:border-primary-500 focus:outline-none focus:border-primary-500 transition cursor-pointer shadow-sm"
                            >
                                <option value="">Todos os Status</option>
                                <option value="ACTIVE">Ativo</option>
                                <option value="FINISHED">Finalizado</option>
                            </select>

                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-2 hover:bg-red-50 rounded-lg transition whitespace-nowrap"
                                >
                                    Limpar filtros
                                </button>
                            )}
                        </div>

                        <div className="text-secondary-500 font-medium whitespace-nowrap">
                            {projects.length} {projects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
                            <span className="ml-3 text-secondary-600 text-lg">Carregando projetos...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-24 bg-white rounded-2xl border border-red-200">
                            <p className="text-red-600">{error}</p>
                        </div>
                    ) : paginatedProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                            {paginatedProjects.map(project => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-secondary-100 flex flex-col"
                                >
                                    {/* Image */}
                                    <div
                                        className="relative h-48 overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/projetos/${project.id}`)}
                                    >
                                        <div className="absolute inset-0 bg-secondary-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                        {project.img_url ? (
                                            <img
                                                src={project.img_url}
                                                alt={project.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                <span className="text-primary-600 font-bold text-4xl">{project.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 z-20">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[project.status]} shadow-sm`}>
                                                {statusLabels[project.status]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2 block">
                                                {project.course?.name || 'Sem curso'}
                                            </span>
                                            <h3 className="text-lg font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-secondary-600 text-sm line-clamp-3 leading-relaxed">
                                                {project.description || project.overview || 'Sem descrição'}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-secondary-100 flex items-center justify-end">
                                            <button
                                                onClick={() => navigate(`/projetos/${project.id}`)}
                                                className="text-primary-600 font-bold text-sm hover:underline"
                                            >
                                                Ver detalhes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-2xl border border-secondary-100 border-dashed">
                            <div className="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="text-secondary-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-900 mb-2">Nenhum projeto encontrado</h3>
                            <p className="text-secondary-600 mb-6">
                                Tente ajustar seus filtros ou buscar por outros termos.
                            </p>
                            <Button variant="outline" onClick={clearFilters}>
                                Limpar todos os filtros
                            </Button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-secondary-200 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-secondary-600"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`
                                        w-10 h-10 flex items-center justify-center rounded-lg font-bold transition
                                        ${currentPage === page
                                            ? 'bg-primary-500 text-white shadow-md'
                                            : 'text-secondary-600 hover:bg-secondary-50 border border-transparent hover:border-secondary-200'
                                        }
                                    `}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-secondary-200 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-secondary-600"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PublicProjectsPage;
