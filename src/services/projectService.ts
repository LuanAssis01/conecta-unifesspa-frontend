import { get, post, put, del, patch, authenticatedFetch } from './api';
import type { Project, CreateProjectInput, UpdateProjectInput, ProjectFilters, ProjectMetrics } from '../types';

export const projectService = {
    /**
     * Criar um novo projeto (requer autenticação)
     */
    async create(data: CreateProjectInput): Promise<{ message: string; project: Project }> {
        return post('/projects', data);
    },

    /**
     * Buscar todos os projetos (Admin only)
     */
    async getAll(): Promise<Project[]> {
        return get('/projects-admin');
    },

    /**
     * Buscar projetos com filtros (público)
     */
    async getAllFiltered(filters?: ProjectFilters): Promise<Project[]> {
        const params = new URLSearchParams();
        
        if (filters?.keywords) params.append('keywords', filters.keywords);
        if (filters?.course) params.append('course', filters.course);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.search) params.append('search', filters.search);
        
        const queryString = params.toString();
        const endpoint = queryString ? `/projects?${queryString}` : '/projects';
        
        return get(endpoint);
    },

    /**
     * Buscar projeto por ID (público)
     */
    async getById(id: string): Promise<Project> {
        return get(`/projects/${id}`);
    },

    /**
     * Atualizar projeto (requer autenticação)
     */
    async update(id: string, data: UpdateProjectInput): Promise<{ message: string; project: Project }> {
        return put(`/projects/${id}`, data);
    },

    /**
     * Deletar projeto (requer autenticação)
     */
    async delete(id: string): Promise<{ message: string }> {
        return del(`/projects/${id}`);
    },

    /**
     * Atualizar proposta do projeto (upload de arquivo)
     */
    async updateProposal(id: string, file: File): Promise<{ message: string; project: Project }> {
        const formData = new FormData();
        formData.append('proposal', file);

        const response = await authenticatedFetch(`/projects/${id}/proposal`, {
            method: 'POST',
            headers: {}, // Remove Content-Type para deixar o browser definir com boundary
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.error || 'Erro ao atualizar proposta');
        }

        return response.json();
    },

    /**
     * Atualizar imagem do projeto (upload de arquivo)
     */
    async updateImage(id: string, file: File): Promise<{ message: string; project: Project }> {
        const formData = new FormData();
        formData.append('image', file);

        const response = await authenticatedFetch(`/projects/${id}/image`, {
            method: 'POST',
            headers: {}, // Remove Content-Type para deixar o browser definir com boundary
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.error || 'Erro ao atualizar imagem');
        }

        return response.json();
    },

    /**
     * Atualizar status do projeto (Admin only)
     */
    async updateStatus(id: string, status: 'APPROVED' | 'REJECTED'): Promise<{ message: string; project: Project }> {
        return patch(`/projects/${id}/status`, { status });
    },

    /**
     * Buscar métricas de projetos (Admin only)
     */
    async getMetrics(): Promise<ProjectMetrics> {
        return get('/projects/metrics');
    },
};
