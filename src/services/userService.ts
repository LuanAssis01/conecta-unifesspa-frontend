import { get, post, put, del } from './api';
import type { User, CreateUserInput, UpdateUserInput } from '../types';

export const userService = {
    /**
     * Criar novo usuário (Admin only)
     */
    async create(data: CreateUserInput): Promise<{ message: string; user: User }> {
        return post('/user', data);
    },

    /**
     * Buscar todos os usuários (Admin only)
     */
    async getAll(): Promise<User[]> {
        return get('/users');
    },

    /**
     * Atualizar perfil do usuário logado
     */
    async updateProfile(data: UpdateUserInput): Promise<{ message: string; user: User }> {
        return put('/profile', data);
    },

    /**
     * Deletar usuário (Admin only)
     */
    async delete(id: string): Promise<{ message: string }> {
        return del(`/user/${id}`);
    },
};
