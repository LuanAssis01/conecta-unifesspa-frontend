// src/pages/DashboardCourses/DashboardCourses.tsx
import React, { useState } from "react";
import { mockCourses } from "../../services/mockData";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

interface Course {
  id: string | number;
  name: string;
  code: string;
  department: string;
  students: number;
}

const DashboardCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: string | number) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto md:p-4">
        <div className="flex justify-between items-center mb-8 md:flex-col md:items-start md:gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
              Gerenciar Cursos
            </h1>
            <p className="text-lg text-(--color-text-secondary)">
              Visualize e gerencie os cursos da instituição
            </p>
          </div>
          <Button variant="primary">+ Novo Curso</Button>
        </div>

        <Card className="bg-white p-0 overflow-hidden">
          <div className="p-6 border-b border-(--color-border)">
            <input
              type="text"
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-(--color-border) rounded-lg text-sm transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-(--color-surface)">
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Código
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Nome do Curso
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Departamento
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Estudantes
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-(--color-text-secondary) text-sm uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 border-b border-(--color-border) align-middle">
                      <span className="font-mono bg-(--color-surface) px-2 py-1 rounded font-semibold text-(--color-text-secondary)">
                        {course.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) text-(--color-text) font-semibold align-middle">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) text-(--color-text) align-middle">
                      {course.department}
                    </td>
                    <td className="px-6 py-4 border-b border-(--color-border) text-(--color-text) align-middle">
                      {course.students}
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
                          onClick={() => handleDelete(course.id)}
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

export default DashboardCourses;
