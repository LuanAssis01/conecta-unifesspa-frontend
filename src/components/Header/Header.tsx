import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button/Button';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 transition-transform duration-200 hover:scale-105"
                >
                    <img
                        src="/src/assets/logos/logo.png"
                        alt="UNIFESSPA+"
                        className="h-10 w-auto"
                    />
                    <span className="text-2xl font-extrabold text-primary md:text-3xl">
                        UNIFESSPA+
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6 order-3 w-full md:w-auto md:order-0 justify-start md:justify-center border-t md:border-none pt-3 md:pt-0">
                    <Link
                        to="/"
                        className="relative font-semibold text-gray-700 hover:text-primary transition-colors"
                    >
                        Início
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full"></span>
                    </Link>

                    <Link
                        to="/projetos"
                        className="relative font-semibold text-gray-700 hover:text-primary transition-colors"
                    >
                        Projetos
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full"></span>
                    </Link>

                    <Link
                        to="/contato"
                        className="relative font-semibold text-gray-700 hover:text-primary transition-colors"
                    >
                        Contato
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full"></span>
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3 ml-auto">
                    {isAuthenticated ? (
                        <>
                            <span className="font-semibold text-gray-700 hidden md:inline">
                                Olá, {user?.name}
                            </span>

                            <Button
                                variant="outline"
                                size="small"
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                            </Button>

                            <Button
                                variant="secondary"
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
                            >
                                Entrar
                            </Button>

                            <Button
                                variant="primary"
                                size="small"
                                onClick={() => navigate('/cadastro')}
                            >
                                Cadastrar
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
