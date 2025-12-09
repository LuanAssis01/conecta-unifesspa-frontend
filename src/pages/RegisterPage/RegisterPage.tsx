import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import type { User, UserRole } from "../../types/userType";

interface RegisterFormData {
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  course?: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    // Mock user registration
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      course: data.course,
      photo: "/src/assets/images/profile_photo.png",
      projects: [],
    };

    login(newUser, "mock-token-" + Date.now());

    if (data.role === "TEACHER") {
      navigate("/professor/projetos");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2 lg:grid-cols-1">
      {/* Image Section */}
      <div className="relative overflow-hidden lg:hidden">
        <img
          src="/src/assets/images/foto_unifesspa.png"
          alt="UNIFESSPA Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600/90 to-emerald-700/95 flex flex-col items-center justify-center px-8 text-white">
          <img
            src="/src/assets/logos/logo.png"
            alt="UNIFESSPA+"
            className="w-[100px] h-auto mb-6"
          />
          <h1 className="text-5xl font-extrabold mb-2">UNIFESSPA+</h1>
          <p className="text-xl opacity-95">Junte-se à nossa comunidade</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center px-8 py-8 bg-(--color-surface) overflow-y-auto">
        <div className="w-full max-w-[500px]">
          <h2 className="text-3xl font-extrabold text-(--color-text) mb-2">
            Crie sua conta
          </h2>
          <p className="text-(--color-text-secondary) mb-8">
            Preencha os dados abaixo para começar
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              label="Nome Completo"
              name="name"
              type="text"
              placeholder="Seu nome completo"
              register={(fieldName: string) =>
                register(fieldName as keyof RegisterFormData, {
                  required: true,
                })
              }
              error={errors.name}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="seu.email@unifesspa.edu.br"
              register={(fieldName: string) =>
                register(fieldName as keyof RegisterFormData, {
                  required: true,
                })
              }
              error={errors.email}
              required
            />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-(--color-text) text-sm">
                  Tipo de Usuário *
                </label>
                <select
                  {...register("role", { required: true })}
                  className="w-full px-4 py-3 border border-(--color-border) rounded-lg text-base font-inherit bg-white cursor-pointer transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Selecione...</option>
                  <option value="STUDENT">Aluno</option>
                  <option value="TEACHER">Professor</option>
                </select>
                {errors.role && (
                  <span className="text-(--color-error) text-sm">
                    Campo obrigatório
                  </span>
                )}
              </div>

              <Input
                label="Curso/Departamento"
                name="department"
                type="text"
                placeholder="Ex: Ciência da Computação"
                register={(fieldName: string) =>
                  register(fieldName as keyof RegisterFormData)
                }
              />
            </div>

            <Input
              label="Senha"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              register={(fieldName: string) =>
                register(fieldName as keyof RegisterFormData, {
                  required: true,
                })
              }
              error={errors.password}
              required
            />

            <Input
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              placeholder="Digite novamente a senha"
              register={(fieldName: string) =>
                register(fieldName as keyof RegisterFormData, {
                  required: true,
                })
              }
              error={errors.confirmPassword}
              required
            />

            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-2 text-sm text-(--color-text-secondary) cursor-pointer">
                <input
                  type="checkbox"
                  {...register("terms", { required: true })}
                  className="mt-1 cursor-pointer"
                />
                Eu aceito os termos de uso e política de privacidade
              </label>
              {errors.terms && (
                <span className="text-(--color-error) text-sm">
                  Você deve aceitar os termos
                </span>
              )}
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Criar Conta
            </Button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-(--color-border) text-(--color-text-secondary)">
            <p>
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="text-(--color-primary) font-semibold no-underline hover:underline"
              >
                Faça login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
