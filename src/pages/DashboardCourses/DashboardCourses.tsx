import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Trash2, Search, BookOpen, Plus, AlertCircle, Loader2 } from 'lucide-react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

interface CreateCourseForm {
    name: string;
}

interface DeleteCourseForm {
    confirmName: string;
}

const DashboardCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // Forms
    const {
        register: registerCreate,
        handleSubmit: handleSubmitCreate,
        reset: resetCreate,
        formState: { errors: errorsCreate }
    } = useForm<CreateCourseForm>();

    const {
        register: registerDelete,
        handleSubmit: handleSubmitDelete,
        reset: resetDelete,
        watch: watchDelete,
        formState: { errors: errorsDelete }
    } = useForm<DeleteCourseForm>();

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await courseService.getAll();
            setCourses(data);
        } catch (err) {
            console.error('Erro ao carregar cursos:', err);
            setError(err instanceof Error ? err.message : 'Erro ao carregar cursos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Handlers
    const handleOpenCreate = () => {
        resetCreate();
        setIsCreateModalOpen(true);
    };

    const handleOpenDelete = (course: Course) => {
        setSelectedCourse(course);
        resetDelete();
        setIsDeleteModalOpen(true);
    };

    const onSubmitCreate = async (data: CreateCourseForm) => {
        try {
            setActionLoading(true);
            await courseService.create({ name: data.name });
            await fetchCourses();
            setIsCreateModalOpen(false);
            alert('Curso criado com sucesso!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao criar curso');
        } finally {
            setActionLoading(false);
        }
    };

    const onSubmitDelete = async () => {
        if (!selectedCourse) return;
        try {
            setActionLoading(true);
            await courseService.delete(selectedCourse.id);
            await fetchCourses();
            setIsDeleteModalOpen(false);
            alert('Curso excluído com sucesso!');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao excluir curso');
        } finally {
            setActionLoading(false);
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">
                            Gerenciar Cursos
                        </h1>
                        <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                            Visualize e gerencie os cursos cadastrados
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleOpenCreate}
                        className="flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Novo Curso
                    </Button>
                </div>

                {/* Content Card */}
                <Card className="bg-white p-0 overflow-hidden border border-[var(--color-border)] shadow-sm">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-[var(--color-border)]">
                        <div className="relative max-w-[400px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar curso..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-[var(--color-border)] rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                            />
                        </div>
                    </div>

                    {/* Table */}
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
                                            Nome do Curso
                                        </th>
                                        <th className="text-center px-6 py-4 bg-[var(--color-surface)] font-semibold text-[0.875rem] text-[var(--color-text-secondary)] uppercase tracking-[0.05em] w-32">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCourses.map((course) => (
                                        <tr key={course.id} className="group hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-[var(--color-text)]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                                        <BookOpen size={16} />
                                                    </div>
                                                    <span className="font-medium">{course.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 border-b border-[var(--color-border)] align-middle text-center">
                                                <button
                                                    className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white inline-flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-red-50 hover:border-red-500 text-gray-500 hover:text-red-600"
                                                    onClick={() => handleOpenDelete(course)}
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCourses.length === 0 && (
                                        <tr>
                                            <td colSpan={2} className="px-6 py-12 text-center text-gray-500">
                                                Nenhum curso encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Card>
            </main>

            {/* Create Course Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Novo Curso"
                className="!max-w-md !rounded-3xl overflow-hidden"
            >
                <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="text-primary-500" size={32} />
                    </div>
                    <p className="text-gray-500 text-sm">
                        Preencha as informações abaixo para adicionar um novo curso à plataforma.
                    </p>
                </div>

                <form onSubmit={handleSubmitCreate(onSubmitCreate)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Nome do Curso
                        </label>
                        <div className="relative group">
                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                            <input
                                {...registerCreate('name', { required: 'O nome do curso é obrigatório' })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="Ex: Engenharia de Software"
                            />
                        </div>
                        {errorsCreate.name && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsCreate.name.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="!rounded-xl flex-1 py-3"
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="!rounded-xl flex-1 py-3 shadow-lg shadow-primary-500/20"
                            disabled={actionLoading}
                        >
                            {actionLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Criar Curso'
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Course Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Excluir Curso"
                className="!max-w-md !rounded-3xl overflow-hidden"
            >
                <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="text-red-500" size={28} />
                    </div>
                    <p className="text-gray-500 text-sm">
                        Tem certeza que deseja excluir o curso <strong>"{selectedCourse?.name}"</strong>? 
                        Esta ação não pode ser desfeita.
                    </p>
                </div>

                <form onSubmit={handleSubmitDelete(onSubmitDelete)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Digite o nome do curso para confirmar
                        </label>
                        <div className="relative group">
                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
                            <input
                                {...registerDelete('confirmName', {
                                    required: 'A confirmação é obrigatória',
                                    validate: (val) => {
                                        if (selectedCourse?.name !== val) {
                                            return "O nome não corresponde";
                                        }
                                    }
                                })}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                                placeholder="Digite o nome do curso"
                            />
                        </div>
                        {errorsDelete.confirmName && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm mt-2 ml-1 animate-fadeIn">
                                <AlertCircle size={14} />
                                <span>{errorsDelete.confirmName.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="!rounded-xl flex-1 py-3"
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <button
                            type="submit"
                            disabled={actionLoading}
                            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Trash2 size={18} />
                                    Excluir
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DashboardCourses;