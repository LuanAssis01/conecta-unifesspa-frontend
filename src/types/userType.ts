export type UserRole = 'TEACHER' | 'ADMIN';

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    department?: string;
    course?: string;
    photo?: string;
    projects?: string[];
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