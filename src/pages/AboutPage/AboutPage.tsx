import { GraduationCap, Users, Building2, Target, Heart, Globe } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            {/* Hero Section - Light Background for Contrast */}
            <section className="relative bg-white pt-20 pb-24 px-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>

                <div className="relative max-w-[1000px] mx-auto text-center z-10">
                    <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full mb-8 border border-primary-100">
                        <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                        <span className="text-sm font-semibold text-primary-700 tracking-wide uppercase">Conheça nossa história</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold text-secondary-900 mb-6 tracking-tight">
                        Sobre a <span className="text-primary-500">Conecta Unifesspa</span>
                    </h1>

                    <p className="text-xl text-secondary-600 leading-relaxed max-w-3xl mx-auto">
                        Uma plataforma inovadora que visa conectar pessoas, ideias e ações por meio de
                        projetos de extensão da Universidade Federal do Sul e Sudeste do Pará.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-secondary-50 py-20 px-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-secondary-900 mb-4">Nossa Missão</h2>
                                <p className="text-lg text-secondary-600 leading-relaxed">
                                    Democratizar o acesso a iniciativas sociais e acadêmicas,
                                    promovendo um impacto positivo tanto na comunidade acadêmica quanto na sociedade em geral.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100">
                                    <Target className="text-primary-500 mb-4" size={32} />
                                    <h3 className="font-bold text-secondary-900 mb-2">Objetivo</h3>
                                    <p className="text-sm text-secondary-600">Facilitar a conexão entre projetos e pessoas interessadas.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary-100">
                                    <Heart className="text-red-500 mb-4" size={32} />
                                    <h3 className="font-bold text-secondary-900 mb-2">Impacto</h3>
                                    <p className="text-sm text-secondary-600">Transformar realidades através da extensão universitária.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-2xl transform rotate-3"></div>
                            <div className="relative rounded-xl overflow-hidden shadow-xl">
                                <img
                                    src="/src/assets/images/people.png"
                                    alt="Colaboração"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audience Section */}
            <section className="bg-white py-20 px-8 border-y border-secondary-100">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary-900 mb-4">Pra quem é a plataforma?</h2>
                        <p className="text-secondary-600 max-w-2xl mx-auto">
                            A Conecta Unifesspa foi desenvolvida pensando em todos os atores que compõem o ecossistema universitário e a comunidade externa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group p-8 rounded-2xl bg-secondary-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                                <GraduationCap size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-900 mb-3">Comunidade Acadêmica</h3>
                            <p className="text-secondary-600 leading-relaxed">
                                Estudantes, professores e técnicos encontram projetos alinhados aos
                                seus interesses para contribuir com iniciativas inovadoras.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group p-8 rounded-2xl bg-secondary-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-900 mb-3">Comunidade Externa</h3>
                            <p className="text-secondary-600 leading-relaxed">
                                Pessoas, ONGs e empresas podem conectar com projetos e colaborar
                                em ações que beneficiam a comunidade.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group p-8 rounded-2xl bg-secondary-50 hover:bg-primary-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                <Building2 size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-900 mb-3">Gestores</h3>
                            <p className="text-secondary-600 leading-relaxed">
                                Coordenadores podem divulgar projetos, gerenciar inscrições e acompanhar
                                as ações de extensão de forma centralizada.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-8 mb-20 text-white bg-secondary-50">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="text-5xl font-extrabold text-primary-400 mb-2">10+</div>
                        <div className="text-secondary-400 font-medium uppercase tracking-wider text-sm">Projetos Ativos</div>
                    </div>
                    <div>
                        <div className="text-5xl font-extrabold text-primary-400 mb-2">50+</div>
                        <div className="text-secondary-400 font-medium uppercase tracking-wider text-sm">Participantes</div>
                    </div>
                    <div>
                        <div className="text-5xl font-extrabold text-primary-400 mb-2">200+</div>
                        <div className="text-secondary-400 font-medium uppercase tracking-wider text-sm">Pessoas Impactadas</div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
