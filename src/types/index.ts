// Enums
export type ProjectStatus = 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'FINISHED';
export type AudienceType = 'INTERNAL' | 'EXTERNAL';
export type UserRole = 'admin' | 'teacher';

// Keyword
export interface Keyword {
    id: string;
    name: string;
}

// Impact Indicator
export interface ImpactIndicator {
    id: string;
    title: string;
    value: number;
    projectId?: string;
}

// Course
export interface Course {
    id: string;
    name: string;
}

// User
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    photo?: string;
    projects?: string[];
}

// Project - corresponde ao backend
export interface Project {
    id: string;
    name: string;
    subtitle?: string | null;
    overview?: string | null;
    description?: string | null;
    expected_results?: string | null;
    start_date: string;
    duration: number;
    proposal_document_url?: string | null;
    img_url?: string | null;
    registration_form_url?: string | null;
    numberVacancies: number;
    status: ProjectStatus;
    audience: AudienceType;
    courseId?: string | null;
    creatorId?: string | null;
    course?: Course | null;
    creator?: {
        id: string;
        name: string;
        email: string;
        role?: string;
    } | null;
    keywords?: Keyword[];
    impactIndicators?: ImpactIndicator[];
}

// Input types para criação/atualização
export interface CreateProjectInput {
    name: string;
    description: string;
    expected_results: string;
    start_date: string;
    duration: number;
    numberVacancies: number;
    audience: AudienceType;
    courseId: string;
}

export interface UpdateProjectInput {
    name?: string;
    description?: string;
    expected_results?: string;
    start_date?: string;
    duration?: number;
    numberVacancies?: number;
    audience?: AudienceType;
    subtitle?: string;
    overview?: string;
    registration_form_url?: string;
    status?: ProjectStatus;
}

export interface ProjectFilters {
    keywords?: string;
    course?: string;
    status?: ProjectStatus;
    search?: string;
}

// Statistics/Metrics
export interface ProjectMetrics {
    total: number;
    active: number;
    finished: number;
    inactive: number;
}

// User input types
export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface UpdateUserInput {
    name?: string;
    email?: string;
    password?: string;
}

// Pending Approval (para compatibilidade)
export interface PendingApproval {
    id: string;
    projectTitle: string;
    submittedBy: string;
    submissionDate: string;
    status: 'pendente' | 'aprovado' | 'rejeitado';
    category: string;
}

// Project Subscription (para compatibilidade futura)
export interface ProjectSubscription {
    id: string;
    projectId: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    submittedAt: string;
    status: 'pending' | 'approved' | 'rejected';
}
