import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button/Button';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-gray-900 shadow-lg sticky top-0 z-[100]">
            <div
                className="
                    max-w-[1400px] mx-auto 
                    px-4 md:px-8 py-4 
                    flex items-center justify-between gap-8 
                    flex-wrap md:flex-nowrap
                "
            >
                {/* LOGO */}
                <Link
                    to="/"
                    className="
                        flex items-center gap-3 
                        no-underline 
                        transition-opacity duration-200 
                        hover:opacity-80
                    "
                >
                    <img
                        src="/src/assets/logos/logo.png"
                        alt="Conecta Unifesspa"
                        className="h-10 w-auto"
                    />
                    <span className="text-2xl md:text-[1.5rem] font-extrabold text-primary-400">
                        Conecta Unifesspa
                    </span>
                </Link>

                {/* NAVIGATION */}
                <nav
                    className="
                        flex items-center gap-8 justify-center
                        order-3 w-full pt-4 border-t md:border-none 
                        md:order-none md:w-auto md:pt-0 
                        md:absolute md:left-1/2 md:-translate-x-1/2
                        border-gray-700 md:border-0
                    "
                >
                    {["Home", "Sobre", "Projetos", "Contato"].map((label, i) => {
                        const path = `/${label === "Home" ? "" : label.toLowerCase()}`;
                        const isActive = label === "Home"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(path);

                        return (
                            <Link
                                key={i}
                                to={path}
                                className={`
                                    relative font-semibold text-base no-underline
                                    transition-colors duration-200
                                    hover:text-primary-400
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                                    after:h-[2px] after:bg-primary-400 
                                    after:transition-all after:duration-300
                                    hover:after:w-full
                                    ${isActive ? 'text-primary-400 after:w-full' : 'text-gray-300 after:w-0'}
                                `}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="font-semibold text-gray-300 hidden md:inline">
                                Olá, {user?.name}
                            </span>

                            <Button
                                variant="outline"
                                size="small"
                                onClick={() => {
                                    if (user?.role === 'admin') {
                                        navigate('/dashboard');
                                    } else {
                                        navigate('/dashboard/perfil');
                                    }
                                }}
                                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                                Gerenciar Projetos
                            </Button>

                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleLogout}
                            >
                                Sair
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="small"
                                onClick={() => navigate('/login')}
                                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                                Entrar
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
