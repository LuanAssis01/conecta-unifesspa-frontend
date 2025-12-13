import { get, post, del } from './api';
import type { Keyword, Project } from '../types';

export interface CreateKeywordInput {
    name: string;
}

export const keywordService = {
    /**
     * Adicionar keyword a um projeto (requer autenticação)
     */
    async addToProject(projectId: string, data: CreateKeywordInput): Promise<{ message: string; keyword: Keyword }> {
        return post(`/keywords/projects/${projectId}`, data);
    },

    /**
     * Buscar keywords de um projeto (público)
     */
    async getByProject(projectId: string): Promise<Keyword[]> {
        return get(`/keywords/projects/${projectId}`);
    },

    /**
     * Remover keyword de um projeto (requer autenticação)
     */
    async removeFromProject(keywordId: string, projectId: string): Promise<{ message: string }> {
        return del(`/keywords/${keywordId}/projects/${projectId}`);
    },

    /**
     * Buscar projetos que contêm uma keyword (público)
     */
    async getProjects(keywordId: string): Promise<Project[]> {
        return get(`/keywords/${keywordId}/projects`);
    },

    /**
     * Buscar todas as keywords (requer autenticação)
     */
    async getAll(): Promise<Keyword[]> {
        return get('/keywords');
    },
};
