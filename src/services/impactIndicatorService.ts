import { get, post, put, del } from './api';
import type { ImpactIndicator } from '../types';

export interface CreateImpactIndicatorInput {
    title: string;
    value: number;
}

export interface UpdateImpactIndicatorInput {
    title?: string;
    value?: number;
}

export const impactIndicatorService = {
    /**
     * Criar indicador de impacto em um projeto (requer autenticação)
     */
    async create(projectId: string, data: CreateImpactIndicatorInput): Promise<{ message: string; indicator: ImpactIndicator }> {
        return post(`/projects/${projectId}/impact-indicators`, data);
    },

    /**
     * Atualizar indicador de impacto (requer autenticação)
     */
    async update(projectId: string, indicatorId: string, data: UpdateImpactIndicatorInput): Promise<{ message: string; indicator: ImpactIndicator }> {
        return put(`/projects/${projectId}/impact-indicators/${indicatorId}`, data);
    },

    /**
     * Deletar indicador de impacto (requer autenticação)
     */
    async delete(projectId: string, indicatorId: string): Promise<{ message: string }> {
        return del(`/projects/${projectId}/impact-indicators/${indicatorId}`);
    },

    /**
     * Buscar indicadores de impacto de um projeto (público)
     */
    async getByProject(projectId: string): Promise<ImpactIndicator[]> {
        return get(`/projects/${projectId}/impact-indicators`);
    },
};
