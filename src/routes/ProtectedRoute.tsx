import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.some(role => role.toLowerCase() === user.role?.toLowerCase())) {
        // Redirect to home for unauthorized access
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
