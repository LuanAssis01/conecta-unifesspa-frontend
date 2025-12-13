import { ErrorResponse } from '../types/errorResponse';
import { AuthResponse, VerifyTokenResponse, RegisterData } from '../types/userType';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const json = await response.json(); // lê o body só uma vez

            if (!response.ok) {
                const errorData = json as ErrorResponse;
                throw new Error(errorData.error || errorData.message || 'Erro ao fazer login');
            }

            // json tem a forma:
            // { success: true, message: string, data: { token, user } }
            const userData = json.data.user;
            
            // Normaliza o role para minúsculo para compatibilidade
            if (userData.role) {
                userData.role = userData.role.toLowerCase();
            }
            
            return {
                user: userData,
                token: json.data.token,
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },


    /**
     * Logout user
     */
    async logout(token: string): Promise<void> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error('Logout failed on server');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    /**
     * Verify if token is still valid
     */
    async verifyToken(token: string): Promise<VerifyTokenResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Token inválido');
            }

            const data: VerifyTokenResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Token verification error:', error);
            throw error;
        }
    },

    /**
     * Register a new user
     */
    async register(userData: RegisterData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(errorData.message || 'Erro ao registrar usuário');
            }

            const data: AuthResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
};
