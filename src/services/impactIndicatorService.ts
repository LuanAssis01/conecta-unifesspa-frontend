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
     * O backend espera: { indicators: [{ title, value }] }
     */
    async create(projectId: string, data: CreateImpactIndicatorInput): Promise<ImpactIndicator> {
        const response = await post<{ message: string; indicators: ImpactIndicator[] }>(
            `/projects/${projectId}/impact-indicators`, 
            { indicators: [data] }
        );
        return response.indicators[0];
    },

    /**
     * Criar múltiplos indicadores de impacto em um projeto (requer autenticação)
     */
    async createMultiple(projectId: string, indicators: CreateImpactIndicatorInput[]): Promise<ImpactIndicator[]> {
        const response = await post<{ message: string; indicators: ImpactIndicator[] }>(
            `/projects/${projectId}/impact-indicators`, 
            { indicators }
        );
        return response.indicators;
    },

    /**
     * Atualizar indicador de impacto (requer autenticação)
     * Endpoint: PUT /projects/:projectId/impact-indicators/:indicatorId
     */
    async update(projectId: string, indicatorId: string, data: UpdateImpactIndicatorInput): Promise<ImpactIndicator> {
        const response = await put<{ message: string; indicator: ImpactIndicator }>(
            `/projects/${projectId}/impact-indicators/${indicatorId}`, 
            data
        );
        return response.indicator;
    },

    /**
     * Deletar indicador de impacto (requer autenticação)
     * Endpoint: DELETE /projects/:projectId/impact-indicators/:indicatorId
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
