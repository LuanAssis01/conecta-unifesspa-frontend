import { Project, User, Course, Statistics, PendingApproval } from '../types';

// Mock data for projects
export const mockProjects: Project[] = [
    {
        id: 1,
        title: 'Capacite os Jovens por Mentoria',
        description: 'Programa de mentoria para capacitação de jovens em tecnologia e empreendedorismo',
        image: '/src/assets/images/capacite_os_jovens_por_mentoria.png',
        status: 'ACTIVE',
        course: 'Ciência da Computação',
        coordinator: 'Prof. João Silva',
        participants: 25,
        startDate: '2024-01-15',
        duration: 12,
        results: 'Mais de 50 jovens capacitados e inseridos no mercado de trabalho.',
        fileUrl: '/documents/projeto_mentoria.pdf',
        keywords: ['educação', 'mentoria', 'tecnologia', 'empreendedorismo'],
        isPublic: true,
        subtitle: 'Capacitando a próxima geração de líderes tecnológicos',
        overview: 'Este projeto visa oferecer mentoria técnica e de carreira para jovens estudantes do ensino médio e superior, conectando-os com profissionais experientes do mercado.',
    },
    {
        id: 2,
        title: 'Iniciativa Espaços Verdes',
        description: 'Projeto de revitalização e criação de espaços verdes no campus universitário',
        image: '/src/assets/images/iniciativa_espacos_verdes.png',
        status: 'ACTIVE',
        course: 'Engenharia Ambiental',
        coordinator: 'Profa. Maria Santos',
        participants: 18,
        startDate: '2024-02-01',
        duration: 10,
        results: 'Criação de 3 novos jardins e horta comunitária.',
        fileUrl: '/documents/projeto_verde.pdf',
        keywords: ['meio ambiente', 'sustentabilidade', 'extensão'],
        isPublic: true,
        subtitle: 'Transformando o campus em um ambiente mais sustentável',
        overview: 'A iniciativa busca promover a conscientização ambiental e melhorar a qualidade de vida no campus através da criação e manutenção de áreas verdes.',
    },
    {
        id: 3,
        title: 'Iniciativa Saúde Comunitária',
        description: 'Programa de atenção à saúde e bem-estar da comunidade universitária',
        image: '/src/assets/images/iniciativa_saude_comunitaria.png',
        status: 'ACTIVE',
        course: 'Enfermagem',
        coordinator: 'Prof. Carlos Oliveira',
        participants: 30,
        startDate: '2024-03-01',
        duration: 9,
        results: 'Atendimento a mais de 200 pessoas em feiras de saúde.',
        fileUrl: '/documents/projeto_saude.pdf',
        keywords: ['saúde', 'comunidade', 'extensão', 'bem-estar'],
        isPublic: true,
        subtitle: 'Cuidando de quem cuida do futuro',
        overview: 'Oferecemos serviços básicos de saúde, campanhas de vacinação e palestras educativas para toda a comunidade acadêmica e externa.',
    },
    {
        id: 4,
        title: 'Montagem e Manutenção',
        description: 'Projeto de manutenção e montagem de equipamentos de informática',
        image: '/src/assets/images/montagem_manutencao.png',
        status: 'ACTIVE',
        course: 'Ciência da Computação',
        coordinator: 'Prof. Pedro Costa',
        participants: 12,
        startDate: '2024-04-01',
        duration: 6,
        results: 'Recuperação de 50 computadores para laboratórios.',
        fileUrl: '/documents/projeto_manutencao.pdf',
        keywords: ['tecnologia', 'informática', 'manutenção'],
        isPublic: true,
        subtitle: 'Recuperando tecnologia, reduzindo lixo eletrônico',
        overview: 'Nosso objetivo é estender a vida útil dos equipamentos de informática da universidade e de escolas públicas parceiras, através de manutenção preventiva e corretiva.',
    },
    {
        id: 5,
        title: 'Revitalize Nossa Cidade',
        description: 'Iniciativa de revitalização urbana e melhoria da qualidade de vida',
        image: '/src/assets/images/revitalize_nossa_cidade.png',
        status: 'SUBMITTED',
        course: 'Arquitetura e Urbanismo',
        coordinator: 'Profa. Ana Rodrigues',
        participants: 8,
        startDate: '2024-05-01',
        duration: 12,
        results: 'Mapeamento de áreas de risco e propostas de intervenção.',
        fileUrl: '/documents/projeto_urbanismo.pdf',
        keywords: ['urbanismo', 'revitalização', 'comunidade'],
        isPublic: true,
        subtitle: 'Planejando cidades mais humanas e inclusivas',
        overview: 'Trabalhamos em conjunto com a comunidade para identificar problemas urbanos e propor soluções criativas e viáveis para melhorar o espaço público.',
    },
];

// Mock data for users
export const mockUsers: User[] = [
    {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@unifesspa.edu.br',
        role: 'teacher',
        department: 'Ciência da Computação',
        photo: '/src/assets/images/profile_photo.png',
        projects: [1, 4],
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@unifesspa.edu.br',
        role: 'teacher',
        department: 'Engenharia Ambiental',
        photo: '/src/assets/images/profile_photo.png',
        projects: [2],
    },
    {
        id: 3,
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@unifesspa.edu.br',
        role: 'teacher',
        department: 'Enfermagem',
        photo: '/src/assets/images/profile_photo.png',
        projects: [3],
    },
    {
        id: 4,
        name: 'Ana Rodrigues',
        email: 'ana.rodrigues@unifesspa.edu.br',
        role: 'teacher',
        department: 'Arquitetura e Urbanismo',
        photo: '/src/assets/images/profile_photo.png',
        projects: [5],
    },
    {
        id: 5,
        name: 'Gabriel Silva',
        email: 'gabriel.silva@unifesspa.edu.br',
        role: 'admin',
        department: 'Arquitetura e Urbanismo',
        photo: '/src/assets/images/profile_photo.png',
        projects: [5],
    },

];

// Mock data for courses
export const mockCourses: Course[] = [
    {
        id: 1,
        name: 'Engenharia da Computação',
    },
    {
        id: 2,
        name: 'Sistemas de Informação',
    },
    {
        id: 3,
        name: 'Engenharia Civil',
    },
    {
        id: 4,
        name: 'Agronomia',
    },
    {
        id: 5,
        name: 'Direito',
    },
];
// Mock data for dashboard statistics
export const mockStatistics: Statistics = {
    total: 45,
    active: 32,
    finished: 10,
    inactive: 3,
};

// Mock data for pending approvals
export const mockPendingApprovals: PendingApproval[] = [
    {
        id: 1,
        projectTitle: 'Novo Projeto de Extensão Digital',
        submittedBy: 'Prof. Fernando Lima',
        submissionDate: '2024-11-20',
        status: 'pendente',
        category: 'Tecnologia',
    },
    {
        id: 2,
        projectTitle: 'Programa de Alfabetização Infantil',
        submittedBy: 'Profa. Juliana Mendes',
        submissionDate: '2024-03-10',
        status: 'pendente',
        category: 'Urbanismo',
    },
    {
        id: 3,
        projectTitle: 'Horta Comunitária Sustentável',
        submittedBy: 'Prof. Roberto Nunes',
        submissionDate: '2024-11-15',
        status: 'pendente',
        category: 'Meio Ambiente',
    },
];

// Helper functions
export const getProjectById = (id: number | string) => {
    return mockProjects.find(project => project.id === parseInt(id.toString()));
};

export const getUserById = (id: number | string) => {
    return mockUsers.find(user => user.id === parseInt(id.toString()));
};

export const getCourseById = (id: number | string) => {
    return mockCourses.find(course => course.id === parseInt(id.toString()));
};

// Keywords for project filtering
export const projectKeywords = [
    'educação',
    'mentoria',
    'tecnologia',
    'empreendedorismo',
    'meio ambiente',
    'sustentabilidade',
    'extensão',
    'saúde',
    'comunidade',
    'bem-estar',
    'informática',
    'manutenção',
    'urbanismo',
    'revitalização',
];

export const getProjectsByStatus = (status: Project['status']) => {
    return mockProjects.filter(project => project.status === status);
};

export const getUsersByRole = (role: User['role']) => {
    return mockUsers.filter(user => user.role === role);
};
