// src/pages/SubmitProjectPage/SubmitProjectPage.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

interface ProjectFormData {
  title: string;
  category: string;
  coordinator: string;
  startDate: string;
  endDate: string;
  description: string;
  image?: FileList;
}

const SubmitProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
    console.log("New project data:", data);
    alert("Projeto submetido com sucesso! Aguarde a aprovação.");
    navigate("/dashboard/projetos");
  };

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto md:p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
            Novo Projeto
          </h1>
          <p className="text-lg text-(--color-text-secondary)">
            Cadastre um novo projeto de extensão
          </p>
        </div>

        <Card className="bg-white p-8 max-w-[800px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
              <Input
                label="Título do Projeto"
                name="title"
                placeholder="Ex: Inclusão Digital na Comunidade"
                register={(fieldName: string) =>
                  register(fieldName as keyof ProjectFormData, {
                    required: true,
                  })
                }
                error={errors.title}
                required
                className="col-span-2 md:col-span-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-(--color-text) text-sm">
                  Categoria *
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full px-4 py-3 border border-(--color-border) rounded-lg text-base font-inherit bg-white cursor-pointer transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Selecione...</option>
                  <option value="Educação">Educação</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Meio Ambiente">Meio Ambiente</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Urbanismo">Urbanismo</option>
                </select>
                {errors.category && (
                  <span className="text-(--color-error) text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <Input
                label="Coordenador"
                name="coordinator"
                placeholder="Nome do coordenador"
                register={(fieldName: string) =>
                  register(fieldName as keyof ProjectFormData, {
                    required: true,
                  })
                }
                error={errors.coordinator}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
              <Input
                label="Data de Início Prevista"
                name="startDate"
                type="date"
                register={(fieldName: string) =>
                  register(fieldName as keyof ProjectFormData, {
                    required: true,
                  })
                }
                error={errors.startDate}
                required
              />
              <Input
                label="Data de Término Prevista"
                name="endDate"
                type="date"
                register={(fieldName: string) =>
                  register(fieldName as keyof ProjectFormData, {
                    required: true,
                  })
                }
                error={errors.endDate}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-(--color-text) text-sm">
                Descrição Detalhada *
              </label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Descreva os objetivos, metodologia e público-alvo do projeto..."
                rows={6}
                className="w-full px-4 py-3 border border-(--color-border) rounded-lg text-base font-inherit resize-y transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
              />
              {errors.description && (
                <span className="text-(--color-error) text-sm">
                  Este campo é obrigatório
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-(--color-text) text-sm">
                Imagem de Capa
              </label>
              <div className="border-2 border-dashed border-(--color-border) px-8 py-8 rounded-lg text-center transition-all hover:border-(--color-primary) hover:bg-emerald-50">
                <input
                  type="file"
                  {...register("image")}
                  className="mb-2"
                  accept="image/jpeg,image/png"
                />
                <span className="block text-xs text-(--color-text-secondary)">
                  Formatos aceitos: JPG, PNG. Máx: 5MB
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-(--color-border)">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/projetos")}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Submeter Projeto
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default SubmitProjectPage;
