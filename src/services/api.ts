import type { ErrorResponse } from '../types/errorResponse';

// Configuração da URL base da API
const getApiBaseUrl = (): string => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    
    // Se não houver URL configurada, usa fallback
    if (!envUrl) {
        console.warn('VITE_API_BASE_URL não configurada, usando /api como fallback');
        return '/api';
    }
    
    return envUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Log para debug em desenvolvimento
if (import.meta.env.DEV) {
    console.log('API_BASE_URL:', API_BASE_URL);
}

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const createAuthHeaders = (additionalHeaders: Record<string, string> = {}, includeContentType: boolean = true): Record<string, string> => {
    const token = getToken();
    const headers: Record<string, string> = {
        ...additionalHeaders,
    };

    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const authenticatedFetch = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    // Se o body for FormData, não incluir Content-Type
    const isFormData = options.body instanceof FormData;
    
    // DELETE sem body não deve incluir Content-Type
    const shouldIncludeContentType = !isFormData && !(options.method === 'DELETE' && !options.body);
    
    const defaultOptions: RequestInit = {
        headers: createAuthHeaders(options.headers as Record<string, string> || {}, shouldIncludeContentType),
    };

    const fetchOptions: RequestInit = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    const response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return response;
};

export const get = async <T = any>(endpoint: string): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'GET',
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.error || error.message || 'Erro na requisição');
    }

    return response.json();
};

export const post = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.error || error.message || 'Erro na requisição');
    }

    return response.json();
};

export const put = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.error || error.message || 'Erro na requisição');
    }

    return response.json();
};

export const del = async <T = any>(endpoint: string): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.error || error.message || 'Erro na requisição');
    }

    return response.json();
};

export const patch = async <T = any>(endpoint: string, data: any): Promise<T> => {
    const response = await authenticatedFetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.error || error.message || 'Erro na requisição');
    }

    return response.json();
};
