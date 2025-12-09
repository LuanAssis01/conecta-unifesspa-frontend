import type { User } from '../types/userType';
import type { Project } from '../types/projectTypes';
import type { Course } from '../types/courseTypes';
import type { Statistics } from '../types/statisticsTypes';
import type { PendingApproval } from '../types/approvalStatusTypes';

// Mock data for projects
export const mockProjects: Project[] = [
    {
        id: 1,
        title: 'Capacite os Jovens por Mentoria',
        description: 'Programa de mentoria para capacitação de jovens em tecnologia e empreendedorismo',
        image: '/src/assets/images/capacite_os_jovens_por_mentoria.png',
        status: 'ACTIVE',
        category: 'Educação',
        coordinator: 'Prof. João Silva',
        participants: 25,
        startDate: '2024-01-15',
        endDate: '2024-12-15',
    },
    {
        id: 2,
        title: 'Iniciativa Espaços Verdes',
        description: 'Projeto de revitalização e criação de espaços verdes no campus universitário',
        image: '/src/assets/images/iniciativa_espacos_verdes.png',
        status: 'ACTIVE',
        category: 'Meio Ambiente',
        coordinator: 'Profa. Maria Santos',
        participants: 18,
        startDate: '2024-02-01',
        endDate: '2024-11-30',
    },
    {
        id: 3,
        title: 'Iniciativa Saúde Comunitária',
        description: 'Programa de atenção à saúde e bem-estar da comunidade universitária',
        image: '/src/assets/images/iniciativa_saude_comunitaria.png',
        status: 'ACTIVE',
        category: 'Saúde',
        coordinator: 'Prof. Carlos Oliveira',
        participants: 30,
        startDate: '2024-03-01',
        endDate: '2024-12-31',
    },
    {
        id: 4,
        title: 'Montagem e Manutenção',
        description: 'Projeto de manutenção e montagem de equipamentos de informática',
        image: '/src/assets/images/montagem_manutencao.png',
        status: 'SUBMITTED',
        category: 'Tecnologia',
        coordinator: 'Prof. Pedro Costa',
        participants: 12,
        startDate: '2024-04-01',
        endDate: '2024-10-31',
    },
    {
        id: 5,
        title: 'Revitalize Nossa Cidade',
        description: 'Iniciativa de revitalização urbana e melhoria da qualidade de vida',
        image: '/src/assets/images/revitalize_nossa_cidade.png',
        status: 'SUBMITTED',
        category: 'Urbanismo',
        coordinator: 'Profa. Ana Rodrigues',
        participants: 8,
        startDate: '2024-05-01',
        endDate: '2025-05-01',
    },
];

// Mock data for users
export const mockUsers: User[] = [
    {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@unifesspa.edu.br',
        role: 'TEACHER',
        department: 'Ciência da Computação',
        photo: '/src/assets/images/profile_photo.png',
        projects: [1, 4],
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@unifesspa.edu.br',
        role: 'TEACHER',
        department: 'Engenharia Ambiental',
        photo: '/src/assets/images/profile_photo.png',
        projects: [2],
    },
    {
        id: 3,
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@unifesspa.edu.br',
        role: 'TEACHER',
        department: 'Enfermagem',
        photo: '/src/assets/images/profile_photo.png',
        projects: [3],
    },
    {
        id: 4,
        name: 'Ana Rodrigues',
        email: 'ana.rodrigues@unifesspa.edu.br',
        role: 'TEACHER',
        department: 'Arquitetura e Urbanismo',
        photo: '/src/assets/images/profile_photo.png',
        projects: [5],
    },
    {
        id: 5,
        name: 'Pedro Almeida',
        email: 'pedro.almeida@aluno.unifesspa.edu.br',
        role: 'TEACHER',
        course: 'Ciência da Computação',
        photo: '/src/assets/images/profile_photo.png',
        projects: [1, 2],
    },
];

// Mock data for courses
export const mockCourses: Course[] = [
    {
        id: 1,
        name: 'Ciência da Computação',
        code: 'CC',
        department: 'Instituto de Ciências Exatas',
        students: 150,
    },
    {
        id: 2,
        name: 'Engenharia Ambiental',
        code: 'EA',
        department: 'Instituto de Engenharia',
        students: 120,
    },
    {
        id: 3,
        name: 'Enfermagem',
        code: 'ENF',
        department: 'Instituto de Ciências da Saúde',
        students: 200,
    },
    {
        id: 4,
        name: 'Arquitetura e Urbanismo',
        code: 'AU',
        department: 'Instituto de Artes',
        students: 80,
    },
];

// Mock data for dashboard statistics
export const mockStatistics: Statistics = {
    totalProjects: 45,
    activeProjects: 32,
    totalUsers: 1250,
    pendingApprovals: 8,
    totalCourses: 25,
    projectsThisMonth: 12,
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
        submissionDate: '2024-11-18',
        status: 'pendente',
        category: 'Educação',
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
export const getProjectById = (id: number | string): Project | undefined => {
    return mockProjects.find(project => project.id === parseInt(String(id)));
};

export const getUserById = (id: number | string): User | undefined => {
    return mockUsers.find(user => user.id === parseInt(String(id)));
};

export const getCourseById = (id: number | string): Course | undefined => {
    return mockCourses.find(course => course.id === parseInt(String(id)));
};

export const getProjectsByStatus = (status: Project['status']): Project[] => {
    return mockProjects.filter(project => project.status === status);
};