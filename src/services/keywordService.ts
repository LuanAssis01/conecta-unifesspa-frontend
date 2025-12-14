import { get, post, del } from './api';
import type { Keyword, Project } from '../types';

export const keywordService = {
    /**
     * Adicionar keywords a um projeto (requer autenticação)
     * O backend espera: { keywords: string[] }
     */
    async addToProject(projectId: string, keywordName: string): Promise<Keyword> {
        const response = await post<{ message: string; keywords: Keyword[] }>(
            `/keywords/projects/${projectId}`, 
            { keywords: [keywordName] }
        );
        // Retorna a primeira keyword criada (ou a que corresponde ao nome)
        return response.keywords.find(k => k.name === keywordName) || response.keywords[0];
    },

    /**
     * Adicionar múltiplas keywords a um projeto (requer autenticação)
     */
    async addMultipleToProject(projectId: string, keywordNames: string[]): Promise<Keyword[]> {
        const response = await post<{ message: string; keywords: Keyword[] }>(
            `/keywords/projects/${projectId}`, 
            { keywords: keywordNames }
        );
        return response.keywords;
    },

    /**
     * Buscar keywords de um projeto (público)
     */
    async getByProject(projectId: string): Promise<Keyword[]> {
        return get(`/keywords/projects/${projectId}`);
    },

    /**
     * Remover keyword de um projeto (requer autenticação)
     * Endpoint: DELETE /keywords/:keywordId/projects/:projectId
     */
    async removeFromProject(projectId: string, keywordId: string): Promise<{ message: string }> {
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
