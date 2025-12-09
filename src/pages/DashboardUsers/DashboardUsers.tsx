// src/pages/DashboardUsers/DashboardUsers.tsx
import React, { useState } from "react";
import { mockUsers } from "../../services/mockData";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import type { User, UserRole } from "../../types/userType";

const DashboardUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const handleDelete = (id: string | number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    const roleConfig: Record<UserRole, { label: string; classes: string }> = {
      TEACHER: {
        label: "Professor",
        classes: "bg-blue-100 text-blue-600",
      },
      ADMIN: {
        label: "Admin",
        classes: "bg-red-100 text-(--color-error)",
      },
    };

    const config = roleConfig[role];
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${config.classes}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto md:p-4">
        <div className="flex justify-between items-center mb-8 md:flex-col md:items-start md:gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
              Gerenciar Usuários
            </h1>
            <p className="text-lg text-(--color-text-secondary)">
              Administre os usuários da plataforma
            </p>
          </div>
          <Button variant="primary">+ Novo Usuário</Button>
        </div>

        <Card className="bg-white p-0 overflow-hidden">
          <div className="p-6 border-b border-(--color-border) flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] max-w-md px-4 py-3 border border-(--color-border) rounded-lg text-sm transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 border border-(--color-border) rounded-lg bg-white text-sm cursor-pointer"
            >
              <option value="all">Todos os tipos</option>
              <option value="TEACHER">Professores</option>
              <option value="STUDENT">Alunos</option>
              <option value="ADMIN">Administradores</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-(--color-surface)">
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Departamento/Curso
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 border-b border-(--color-border) align-middle">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.photo}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-semibold text-(--color-text)">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) text-(--color-text) align-middle">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) align-middle">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) text-(--color-text) align-middle">
                      {user.department || user.course || "-"}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) align-middle">
                      <div className="flex gap-2">
                        <button
                          className="w-8 h-8 rounded-lg border border-(--color-border) bg-white flex items-center justify-center cursor-pointer transition-all hover:bg-(--color-surface) hover:border-(--color-primary)"
                          title="Editar"
                        >
                          <img
                            src="/src/assets/icons/edit.svg"
                            alt="Editar"
                            className="w-4 h-4"
                          />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg border border-(--color-border) bg-white flex items-center justify-center cursor-pointer transition-all hover:border-(--color-error) hover:bg-red-50"
                          onClick={() => handleDelete(user.id)}
                          title="Excluir"
                        >
                          <img
                            src="/src/assets/icons/trash.svg"
                            alt="Excluir"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DashboardUsers;
