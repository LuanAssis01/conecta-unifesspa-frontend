import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  BookOpen,
  User,
  Settings,
  GraduationCap,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, roles: ['admin'] },
    { path: '/dashboard/projetos', label: 'Aprovações', icon: CheckSquare, roles: ['admin'] },
    { path: '/dashboard/cursos', label: 'Cursos', icon: BookOpen, roles: ['admin'] },
    { path: '/dashboard/professores', label: 'Professores', icon: GraduationCap, roles: ['admin'] },
    { path: '/dashboard/perfil', label: 'Perfil', icon: User },
    { path: '/dashboard/config', label: 'Configurações', icon: Settings },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || 'teacher');
  });

  return (
    <aside
      className="
        w-[280px] min-h-screen bg-gray-900 border-r border-gray-800
        flex flex-col sticky top-0 left-0
        max-[1024px]:w-[80px]
        max-[768px]:hidden
        shadow-xl z-50
      "
    >
      {/* HEADER */}
      <Link
        to="/"
        className="
          block
          hover:opacity-80
          transition-opacity
        "
      >
        <div
          className="
            p-8 px-6 flex items-center gap-4 border-b border-gray-800
            max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:p-6 max-[1024px]:px-2
          "
        >
          <img
            src="/src/assets/logos/logo.png"
            className="w-10 h-auto"
            alt="Logo UNIFESSPA"
          />

          <span
            className="
              text-xl font-extrabold text-primary-500
              max-[1024px]:hidden
            "
          >
            Conecta Unifesspa
          </span>
        </div>
      </Link>


      {/* NAV */}
      <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center gap-4 px-4 py-3.5 font-medium rounded-xl
                transition-all duration-200 group
                ${isActive
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
                max-[1024px]:justify-center max-[1024px]:px-3
              `}
            >
              {/* ICON */}
              <Icon
                size={22}
                className={`
                  transition-transform duration-200
                  ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                `}
              />

              {/* LABEL */}
              <span className="max-[1024px]:hidden">{item.label}</span>

              {/* Active Indicator Dot (Mobile/Collapsed) */}
              {isActive && (
                <div className="hidden max-[1024px]:block absolute right-2 w-1.5 h-1.5 rounded-full bg-white"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* USER INFO */}
      <div className="p-4 border-t border-gray-800">
        <div
          className="
            p-3 rounded-xl bg-gray-800/50 border border-gray-700
            flex items-center gap-3
            max-[1024px]:justify-center max-[1024px]:p-2 max-[1024px]:bg-transparent max-[1024px]:border-none
          "
        >
          <img
            src={user?.photo || '/src/assets/images/profile_photo.png'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
          />

          <div className="flex-1 min-w-0 max-[1024px]:hidden">
            <p className="font-bold text-white text-sm truncate">
              {user?.name || 'Usuário'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.role === 'teacher'
                ? 'Professor'
                : user?.role === 'admin'
                  ? 'Administrador'
                  : 'Professor'}
            </p>
          </div>

          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors max-[1024px]:hidden"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside >
  );
};

export default Sidebar;
