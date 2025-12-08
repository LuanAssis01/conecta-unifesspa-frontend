// Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Role = "aluno" | "professor" | "admin";

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  roles?: Role[];
}

const menuItems: MenuItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: "/src/assets/icons/home.svg" },
  {
    path: "/dashboard/projetos",
    label: "Projetos",
    icon: "/src/assets/icons/projetos.svg",
  },
  {
    path: "/dashboard/aprovacoes",
    label: "Aprovações",
    icon: "/src/assets/icons/aprovacoes.svg",
    roles: ["professor", "admin"],
  },
  {
    path: "/dashboard/cursos",
    label: "Cursos",
    icon: "/src/assets/icons/cursos.svg",
    roles: ["professor", "admin"],
  },
  {
    path: "/dashboard/usuarios",
    label: "Usuários",
    icon: "/src/assets/icons/usuarios.svg",
    roles: ["admin"],
  },
  {
    path: "/dashboard/perfil",
    label: "Perfil",
    icon: "/src/assets/icons/perfil.svg",
  },
  {
    path: "/dashboard/config",
    label: "Configurações",
    icon: "/src/assets/icons/config.svg",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes((user?.role as Role) || "aluno");
  });

  const getRoleLabel = (role?: string) => {
    if (role === "professor") return "Professor";
    if (role === "admin") return "Administrador";
    return "Aluno";
  };

  return (
    <aside
      className={`
        w-[280px] min-h-screen bg-white border-r border-(--color-border)
        flex flex-col sticky top-0 left-0
        lg:w-20
        md:hidden
      `}
    >
      {/* Cabeçalho */}
      <div
        className="
          flex items-center gap-4 
          border-b border-(--color-border) 
          px-6 py-8 
          lg:flex-col lg:items-center lg:px-2 lg:py-6
        "
      >
        <img
          src="/src/assets/logos/logo.png"
          alt="UNIFESSPA+"
          className="w-10 h-auto"
        />
        <h2 className="text-2xl font-extrabold text-(--color-primary) lg:hidden">
          UNIFESSPA+
        </h2>
      </div>

      {/* Navegação */}
      <nav className="flex-1 flex flex-col gap-2 py-6">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center gap-4 
                px-6 py-4 
                font-semibold 
                transition-all duration-200 
                no-underline
                text-(--color-text-secondary)
                hover:bg-(--color-surface) hover:text-(--color-text)
                before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 
                before:w-1 before:bg-(--color-primary) before:scale-y-0 before:transition-transform before:duration-200
                ${isActive ? "bg-emerald-500/10 text-(--color-primary) before:scale-y-100" : ""}
                lg:justify-center lg:px-4 lg:py-4
              `}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`
                  w-6 h-6 
                  filter grayscale opacity-60 
                  transition-all duration-200
                  group
                  ${isActive ? "grayscale-0 opacity-100" : ""}
                `}
              />
              <span className="lg:hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Info usuário */}
      <div
        className="
          flex items-center gap-4 
          px-6 py-6 
          border-t border-(--color-border)
          lg:justify-center lg:px-2
        "
      >
        <img
          src={user?.photo || "/src/assets/images/profile_photo.png"}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-(--color-primary)"
        />
        <div className="flex-1 min-w-0 lg:hidden">
          <p className="font-bold text-(--color-text) mb-1 truncate">
            {user?.name || "Usuário"}
          </p>
          <p className="text-sm text-(--color-text-secondary)">
            {getRoleLabel(user?.role)}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
