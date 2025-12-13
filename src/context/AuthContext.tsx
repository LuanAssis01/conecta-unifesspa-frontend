import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    updateUser: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check for saved user and token in localStorage
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const updateUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};