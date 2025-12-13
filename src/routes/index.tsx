import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardProjects from '../pages/DashboardProjects/DashboardProjects';
import DashboardCourses from '../pages/DashboardCourses/DashboardCourses';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import EditProjectPage from '../pages/EditProjectPage/EditProjectPage';
import SubmitProjectPage from '../pages/SubmitProjectPage/SubmitProjectPage';
import DashboardProfessors from '../pages/DashboardProfessors/DashboardProfessors';
import AboutPage from '../pages/AboutPage/AboutPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import PublicProjectsPage from '../pages/PublicProjectsPage/PublicProjectsPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage/ProjectDetailsPage';
import ProtectedRoute from './ProtectedRoute';



const router = createBrowserRouter([
    {
        element: (
            <>
                <ScrollToTop />
                <Outlet />
            </>
        ),
        children: [
            // Public Routes
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/contato',
                element: <ContactPage />,
            },
            {
                path: '/sobre',
                element: <AboutPage />,
            },
            {
                path: '/projetos/novo',
                element: <SubmitProjectPage />,
            },
            {
                path: '/projetos/editar/:id',
                element: <EditProjectPage />,
            },
            {
                path: '/projetos',
                element: <PublicProjectsPage />,
            },
            {
                path: '/projetos/:id',
                element: <ProjectDetailsPage />,
            },

            // Dashboard Routes (Admin/Professor)
            {
                path: '/dashboard',
                element: <ProtectedRoute allowedRoles={['admin', 'teacher']} />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: 'projetos',
                        element: <DashboardProjects />,
                    },
                    {
                        path: 'projetos/novo',
                        element: <SubmitProjectPage />,
                    },
                    {
                        path: 'projetos/editar/:id',
                        element: <EditProjectPage />,
                    },
                    {
                        path: 'cursos',
                        element: <DashboardCourses />,
                    },
                    {
                        path: 'professores',
                        element: <DashboardProfessors />,
                    },
                    {
                        path: 'perfil',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'config',
                        element: <SettingsPage />,
                    },
                ],
            },

            // Catch all
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
