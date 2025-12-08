import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export type Theme = "light" | "dark";

export interface UserPreferences {
  theme: Theme;
  notifications: boolean;
  language: string;
}

export interface UserProject {
  id: string | number;
  [key: string]: any;
}

export interface UserCourse {
  id: string | number;
  [key: string]: any;
}

export interface UserContextType {
  userPreferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;

  userProjects: UserProject[];
  setUserProjects: Dispatch<SetStateAction<UserProject[]>>;
  addProject: (project: UserProject) => void;
  removeProject: (projectId: UserProject["id"]) => void;
  updateProject: (
    projectId: UserProject["id"],
    updatedData: Partial<UserProject>
  ) => void;

  userCourses: UserCourse[];
  setUserCourses: Dispatch<SetStateAction<UserCourse[]>>;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    theme: "light",
    notifications: true,
    language: "pt-BR",
  });

  const [userProjects, setUserProjects] = useState<UserProject[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences) as Partial<UserPreferences>;
        setUserPreferences((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Error parsing preferences:", error);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updated: UserPreferences = { ...userPreferences, ...newPreferences };
    setUserPreferences(updated);
    localStorage.setItem("userPreferences", JSON.stringify(updated));
  };

  const addProject = (project: UserProject) => {
    setUserProjects((prev) => [...prev, project]);
  };

  const removeProject = (projectId: UserProject["id"]) => {
    setUserProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const updateProject = (
    projectId: UserProject["id"],
    updatedData: Partial<UserProject>
  ) => {
    setUserProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updatedData } : p))
    );
  };

  const value: UserContextType = {
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
