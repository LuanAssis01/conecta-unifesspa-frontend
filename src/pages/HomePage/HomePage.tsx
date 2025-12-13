import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Target } from 'lucide-react';
import { mockProjects } from '../../services/mockData';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button';

const HomePage = () => {
    const navigate = useNavigate();
    const featuredProjects = mockProjects.slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col bg-secondary-50">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-white text-secondary-900 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative max-w-[1400px] mx-auto px-8 py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full">
                                <Sparkles size={18} className="text-primary-600" />
                                <span className="text-sm font-semibold text-primary-600">Plataforma Oficial UNIFESSPA</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-secondary-900">
                                Conectando{' '}
                                <span className="text-primary-500">Projetos</span>
                                {' '}e{' '}
                                <span className="text-primary-500">Pessoas</span>
                            </h1>

                            <p className="text-xl text-secondary-600 leading-relaxed">
                                A plataforma que integra professores, comunidade e projetos universitários da UNIFESSPA.
                                Participe de iniciativas transformadoras e contribua para o desenvolvimento acadêmico.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="primary"
                                    size="large"
                                    onClick={() => navigate('/projetos')}
                                >
                                    Explorar Projetos
                                    <ArrowRight size={20} className="ml-2" />
                                </Button>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src="/src/assets/images/foto_unifesspa.png"
                                    alt="UNIFESSPA Campus"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-[1400px] mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                        <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                            <Target className="text-primary-600" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-3">
                            Projetos de Impacto
                        </h3>
                        <p className="text-secondary-600 leading-relaxed">
                            Participe de iniciativas que transformam a comunidade universitária e geram impacto social real.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                        <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Users className="text-blue-600" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-3">
                            Colaboração
                        </h3>
                        <p className="text-secondary-600 leading-relaxed">
                            Conecte-se com professores e colegas para desenvolver projetos inovadores juntos.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                        <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <Sparkles className="text-green-600" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-3">
                            Desenvolvimento
                        </h3>
                        <p className="text-secondary-600 leading-relaxed">
                            Desenvolva habilidades práticas e enriqueça seu currículo acadêmico com experiências reais.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="max-w-[1400px] mx-auto px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-secondary-900 mb-4">
                        Projetos em Destaque
                    </h2>
                    <p className="text-xl text-secondary-600">
                        Conheça alguns dos projetos que estão transformando a universidade
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onView={(p) => navigate(`/projetos/${p.id}`)}
                        />
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        size="large"
                        onClick={() => navigate('/projetos')}
                    >
                        Ver Todos os Projetos
                        <ArrowRight size={20} className="ml-2" />
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
