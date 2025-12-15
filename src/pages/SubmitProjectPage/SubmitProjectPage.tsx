import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, Info, AlertCircle, Loader2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Button from '../../components/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { projectService } from '../../services/projectService';
import { courseService } from '../../services/courseService';
import { Course } from '../../types';

interface SubmitProjectForm {
    name: string;
    subtitle: string;
    courseId: string;
    start_date: string;
    duration: number;
    description: string;
    overview: string;
    expected_results: string;
    registration_form_url: string;
    numberVacancies: number;
    audience: 'INTERNAL' | 'EXTERNAL';
    proposal_file: FileList;
    image_file: FileList;
}

const SubmitProjectPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<SubmitProjectForm>();
    
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getAll();
                setCourses(data);
            } catch (error) {
                console.error('Erro ao carregar cursos:', error);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, []);

    const onSubmit = async (data: SubmitProjectForm) => {
        setLoading(true);
        setSubmitError(null);

        try {
            // Criar o projeto com os campos obrigatórios do backend
            const projectData = {
                name: data.name,
                description: data.description,
                expected_results: data.expected_results || 'A definir',
                start_date: data.start_date ? new Date(data.start_date).toISOString() : new Date().toISOString(),
                duration: Number(data.duration) || 12,
                numberVacancies: Number(data.numberVacancies) || 10,
                audience: data.audience || 'EXTERNAL',
                courseId: data.courseId,
            };

            const response = await projectService.create(projectData);
            const createdProject = response.project;

            let hasUploadError = false;

            // Se houver imagem, fazer upload e armazenar localmente
            if (data.image_file && data.image_file.length > 0) {
                try {
                    // Armazenar localmente como backup
                    const imageFile = data.image_file[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Image = reader.result as string;
                        localStorage.setItem(`project_image_${createdProject.id}`, base64Image);
                    };
                    reader.readAsDataURL(imageFile);

                    // Tentar fazer upload para o backend
                    await projectService.updateImage(createdProject.id, imageFile);
                } catch (fileErr: any) {
                    console.warn('Erro ao fazer upload da imagem:', fileErr);
                    hasUploadError = true;
                }
            }

            // Se houver arquivo de proposta, fazer upload
            if (data.proposal_file && data.proposal_file.length > 0) {
                try {
                    await projectService.updateProposal(createdProject.id, data.proposal_file[0]);
                } catch (fileErr: any) {
                    console.warn('Erro ao fazer upload do arquivo:', fileErr);
                    hasUploadError = true;
                }
            }

            if (hasUploadError) {
                alert('Projeto criado com sucesso, mas houve um erro ao anexar alguns arquivos. Você pode anexá-los depois na página de edição.');
            } else {
                alert('Projeto submetido com sucesso! Aguarde a aprovação.');
            }
            navigate('/dashboard/perfil');
        } catch (error: any) {
            console.error('Erro ao submeter projeto:', error);
            setSubmitError(error.message || 'Erro ao submeter projeto. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[var(--color-surface)]">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-[var(--color-text)] mb-2">
                            Novo Projeto de Extensão
                        </h1>
                        <p className="text-[1.125rem] text-[var(--color-text-secondary)]">
                            Preencha as informações abaixo para submeter uma nova proposta.
                        </p>
                    </div>

                    {submitError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {submitError}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] p-8 space-y-8">

                                {/* Basic Info Section */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <FileText className="text-primary-500" size={24} />
                                        Informações Básicas
                                    </h2>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Nome do Projeto *
                                            </label>
                                            <input
                                                {...register('name', { required: 'O nome é obrigatório' })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                                placeholder="Ex: Inclusão Digital para Idosos"
                                            />
                                            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subtítulo
                                            </label>
                                            <input
                                                {...register('subtitle')}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                                placeholder="Ex: Capacitação tecnológica para a terceira idade"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Curso Vinculado *
                                                </label>
                                                <select
                                                    {...register('courseId', { required: 'Selecione um curso' })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none bg-white"
                                                    disabled={loadingCourses}
                                                >
                                                    <option value="">Selecione...</option>
                                                    {courses.map(course => (
                                                        <option key={course.id} value={course.id}>{course.name}</option>
                                                    ))}
                                                </select>
                                                {errors.courseId && <span className="text-red-500 text-sm mt-1">{errors.courseId.message}</span>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Coordenador Responsável
                                                </label>
                                                <input
                                                    value={user?.name || 'Usuário não identificado'}
                                                    disabled
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">O coordenador é definido automaticamente.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <CheckCircle className="text-primary-500" size={24} />
                                        Detalhes da Execução
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Data de Início Prevista *
                                            </label>
                                            <input
                                                type="date"
                                                {...register('start_date', { required: 'Data de início é obrigatória' })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                            />
                                            {errors.start_date && <span className="text-red-500 text-sm mt-1">{errors.start_date.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Duração (em meses) *
                                            </label>
                                            <input
                                                type="number"
                                                {...register('duration', { required: 'Duração é obrigatória', min: { value: 1, message: 'Duração mínima é 1 mês' } })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                                placeholder="Ex: 12"
                                            />
                                            {errors.duration && <span className="text-red-500 text-sm mt-1">{errors.duration.message}</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Número de Vagas *
                                            </label>
                                            <input
                                                type="number"
                                                {...register('numberVacancies', { required: 'Número de vagas é obrigatório', min: { value: 1, message: 'Mínimo 1 vaga' } })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                                placeholder="Ex: 20"
                                            />
                                            {errors.numberVacancies && <span className="text-red-500 text-sm mt-1">{errors.numberVacancies.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Público-alvo *
                                            </label>
                                            <select
                                                {...register('audience', { required: 'Público-alvo é obrigatório' })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none bg-white"
                                            >
                                                <option value="EXTERNAL">Externo (Comunidade)</option>
                                                <option value="INTERNAL">Interno (Universidade)</option>
                                            </select>
                                            {errors.audience && <span className="text-red-500 text-sm mt-1">{errors.audience.message}</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Descrição Breve *
                                        </label>
                                        <textarea
                                            {...register('description', { required: 'Descrição é obrigatória' })}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none resize-none"
                                            placeholder="Uma breve descrição do projeto..."
                                        />
                                        {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Visão Geral / Descrição Completa
                                        </label>
                                        <textarea
                                            {...register('overview')}
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none resize-none"
                                            placeholder="Descreva os objetivos, metodologia e público-alvo do projeto..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Resultados Esperados
                                        </label>
                                        <textarea
                                            {...register('expected_results')}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none resize-none"
                                            placeholder="Quais impactos e resultados são esperados com este projeto?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Link do Formulário de Inscrição
                                        </label>
                                        <input
                                            type="url"
                                            {...register('registration_form_url')}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition outline-none"
                                            placeholder="https://forms.google.com/..."
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Link para o formulário de inscrição de participantes (opcional).</p>
                                    </div>
                                </div>

                                {/* File Upload Section */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <Upload className="text-primary-500" size={24} />
                                        Documentação e Imagem
                                    </h2>

                                    {/* Imagem de Capa */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Imagem de Capa do Projeto
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 hover:bg-primary-50 transition cursor-pointer group">
                                            <input
                                                type="file"
                                                id="image-upload"
                                                accept="image/jpeg,image/jpg,image/png,image/gif"
                                                {...register('image_file')}
                                                className="hidden"
                                            />
                                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                                                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                                    <Upload size={28} />
                                                </div>
                                                <span className="text-base font-semibold text-gray-700 mb-1">Clique para fazer upload da imagem</span>
                                                <span className="text-xs text-gray-400 mt-1">JPG, JPEG, PNG ou GIF (Máx. 5MB) - Opcional</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Documento da Proposta */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Documento da Proposta
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 hover:bg-primary-50 transition cursor-pointer group">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                accept=".pdf,.doc,.docx"
                                                {...register('proposal_file')}
                                                className="hidden"
                                            />
                                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                                <div className="w-14 h-14 bg-blue-50 text-primary-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                                    <Upload size={28} />
                                                </div>
                                                <span className="text-base font-semibold text-gray-700 mb-1">Clique para fazer upload do documento</span>
                                                <span className="text-xs text-gray-400 mt-1">PDF, DOC ou DOCX (Máx. 10MB) - Opcional</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex items-center justify-end gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate('/dashboard/projetos')}
                                        className="flex-1"
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="px-8"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" size={18} />
                                                Enviando...
                                            </>
                                        ) : (
                                            'Submeter Projeto'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar Info Section */}
                        <div className="space-y-6">
                            {/* Guidelines Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Info size={20} className="text-blue-500" />
                                    Diretrizes de Submissão
                                </h3>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>Certifique-se de que o projeto está alinhado com as diretrizes de extensão da universidade.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>O arquivo anexo deve conter o detalhamento completo, incluindo cronograma e orçamento.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>Projetos com duração superior a 12 meses requerem aprovação especial.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                                <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <AlertCircle size={20} />
                                    Precisa de Ajuda?
                                </h3>
                                <p className="text-sm text-blue-700 mb-4">
                                    Se tiver dúvidas sobre o preenchimento ou documentação necessária, consulte o manual ou entre em contato.
                                </p>
                                <button className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline">
                                    Baixar Manual de Extensão &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubmitProjectPage;
