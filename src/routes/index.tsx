// routes/AppRoutes.tsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import StudentProjectsPage from "../pages/StudentProjectsPage/StudentProjectPage";
import ActiveProjectsPage from "../pages/ActiveProjectsPage/ActiveProjectsPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardProjects from "../pages/DashboardProjects/DashboardProjects";
import DashboardApprovals from "../pages/DashboardApprovals/DashboardApprovals";
import DashboardCourses from "../pages/DashboardCourses/DashboardCourses";
import DashboardUsers from "../pages/DashboardUsers/DashboardUsers";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import EditProjectPage from "../pages/EditProjectPage/EditProjectPage";
import SubmitProjectPage from "../pages/SubmitProjectPage/SubmitProjectPage";
import ProtectedRoute from "./ProjectedRoutes";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>{title}</h1>
    <p>Em desenvolvimento...</p>
  </div>
);

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cadastro",
    element: <RegisterPage />,
  },
  {
    path: "/contato",
    element: <ContactPage />,
  },
  {
    path: "/projetos",
    element: <StudentProjectsPage />,
  },
  {
    path: "/projetos/:id",
    element: <PlaceholderPage title="Detalhes do Projeto" />,
  },

  // Student Routes
  {
    path: "/professor",
    element: <ProtectedRoute allowedRoles={["TEACHER"]} />,
    children: [
      {
        path: "projetos",
        element: <StudentProjectsPage />,
      },
      {
        path: "meus-projetos",
        element: <ActiveProjectsPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "projetos",
        element: <DashboardProjects />,
      },
      {
        path: "projetos/novo",
        element: <SubmitProjectPage />,
      },
      {
        path: "projetos/editar/:id",
        element: <EditProjectPage />,
      },
      {
        path: "aprovacoes",
        element: <DashboardApprovals />,
      },
      {
        path: "cursos",
        element: <DashboardCourses />,
      },
      {
        path: "usuarios",
        element: <DashboardUsers />,
      },
      {
        path: "perfil",
        element: <ProfilePage />,
      },
      {
        path: "config",
        element: <PlaceholderPage title="Configurações" />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
