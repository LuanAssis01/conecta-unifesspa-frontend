import { get, post, del } from './api';
import type { Course } from '../types';

export interface CreateCourseInput {
    name: string;
}

export const courseService = {
    /**
     * Criar novo curso (Admin only)
     */
    async create(data: CreateCourseInput): Promise<{ message: string; course: Course }> {
        return post('/courses', data);
    },

    /**
     * Buscar todos os cursos (público)
     */
    async getAll(): Promise<Course[]> {
        return get('/courses');
    },

    /**
     * Buscar curso por ID (público)
     */
    async getById(id: string): Promise<Course> {
        return get(`/courses/${id}`);
    },

    /**
     * Deletar curso (requer autenticação)
     */
    async delete(id: string): Promise<{ message: string }> {
        return del(`/courses/${id}`);
    },
};
