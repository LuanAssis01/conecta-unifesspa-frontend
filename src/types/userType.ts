export type UserRole = 'TEACHER' | 'ADMIN';

export type User = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    department?: string;
    course?: string;
    photo?: string;
    projects?: number[];
}

export type AuthResponse = {
    user: User;
    token: string;
}

export type VerifyTokenResponse = {
    user: User;
}

export type RegisterData = {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    department?: string;
    course?: string;
}