// src/pages/EditProjectPage/EditProjectPage.tsx
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../services/mockData";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import type { ProjectStatus } from "../../types/projectTypes";

interface ProjectFormData {
    title: string;
    category: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    description: string;
}

const EditProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProjectFormData>();

    useEffect(() => {
        if (id) {
            const project = getProjectById(id);
            if (project) {
                reset(project);
            }
        }
    }, [id, reset]);

    const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
        console.log("Updated project data:", data);
        alert("Projeto atualizado com sucesso!");
        navigate("/dashboard/projetos");
    };

    return (
        <div className="flex min-h-screen bg-(--color-surface)">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto md:p-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
                        Editar Projeto
                    </h1>
                    <p className="text-lg text-(--color-text-secondary)">
                        Atualize as informações do projeto
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

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-(--color-text) text-sm">
                                    Status *
                                </label>
                                <select
                                    {...register("status", { required: true })}
                                    className="w-full px-4 py-3 border border-(--color-border) rounded-lg text-base font-inherit bg-white cursor-pointer transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="ACTIVE">Ativo</option>
                                    <option value="SUBMITTED">Em Análise</option>
                                    <option value="APPROVED">Aprovado</option>
                                    <option value="REJECTED">Rejeitado</option>
                                    <option value="FINISHED">Finalizado</option>
                                </select>
                                {errors.status && (
                                    <span className="text-(--color-error) text-sm">
                                        Este campo é obrigatório
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
                            <Input
                                label="Data de Início"
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
                                label="Data de Término"
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
                                Descrição *
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                rows={5}
                                className="w-full px-4 py-3 border border-(--color-border) rounded-lg text-base font-inherit resize-y transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
                            />
                            {errors.description && (
                                <span className="text-(--color-error) text-sm">
                                    Este campo é obrigatório
                                </span>
                            )}
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
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
};

export default EditProjectPage;
