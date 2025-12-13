import { createContext, useState, useEffect, ReactNode } from 'react';
import { Project, Course } from '../types';

interface UserPreferences {
    theme: string;
    notifications: boolean;
    language: string;
}

export interface UserContextType {
    userPreferences: UserPreferences;
    updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
    userProjects: Project[];
    setUserProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    removeProject: (projectId: number) => void;
    updateProject: (projectId: number, updatedData: Partial<Project>) => void;
    userCourses: Course[];
    setUserCourses: (courses: Course[]) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        theme: 'light',
        notifications: true,
        language: 'pt-BR',
    });

    const [userProjects, setUserProjects] = useState<Project[]>([]);
    const [userCourses, setUserCourses] = useState<Course[]>([]);

    useEffect(() => {
        // Load user preferences from localStorage
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            try {
                setUserPreferences(JSON.parse(savedPreferences));
            } catch (error) {
                console.error('Error parsing preferences:', error);
            }
        }
    }, []);

    const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
        const updated = { ...userPreferences, ...newPreferences };
        setUserPreferences(updated);
        localStorage.setItem('userPreferences', JSON.stringify(updated));
    };

    const addProject = (project: Project) => {
        setUserProjects([...userProjects, project]);
    };

    const removeProject = (projectId: number) => {
        setUserProjects(userProjects.filter(p => p.id !== projectId));
    };

    const updateProject = (projectId: number, updatedData: Partial<Project>) => {
        setUserProjects(
            userProjects.map(p => p.id === projectId ? { ...p, ...updatedData } : p)
        );
    };

    const value = {
        userPreferences,
        updatePreferences,
        userProjects,
        setUserProjects,
        addProject,
        removeProject,
        updateProject,
        userCourses,
        setUserCourses,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
