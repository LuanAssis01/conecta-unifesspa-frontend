// src/pages/LoginPage.tsx
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      login(response.user, response.token);

      if (response.user.role === 'TEACHER') {
        navigate('/professor/projetos');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError('email', {
        type: 'manual',
        message: error?.message || 'Email ou senha incorretos',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface">
      {/* Seção imagem / branding */}
      <div className="relative overflow-hidden hidden lg:block">
        <img
          src="/src/assets/images/foto_unifesspa.png"
          alt="UNIFESSPA Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/90 to-emerald-700/95 flex flex-col items-center justify-center px-8 text-white">
          <img
            src="/src/assets/logos/logo.png"
            alt="UNIFESSPA+"
            className="w-24 h-auto mb-6"
          />
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
            UNIFESSPA+
          </h1>
          <p className="text-lg opacity-95 text-center">
            Conectando Projetos e Pessoas
          </p>
        </div>
      </div>

      {/* Seção formulário */}
      <div className="flex items-center justify-center px-6 py-8 bg-surface">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-text mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-textSecondary mb-8">
            Entre com suas credenciais para acessar sua conta
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="seu.email@unifesspa.edu.br"
              register={register}
              error={errors.email}
              required
            />

            <Input
              label="Senha"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              register={register}
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between -my-2">
              <label className="flex items-center gap-2 text-sm text-textSecondary cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                />
                Lembrar-me
              </label>
              <a
                href="#"
                className="text-sm text-primary font-semibold hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-border text-textSecondary">
            <p>
              Não tem uma conta?{' '}
              <a
                href="/cadastro"
                className="text-primary font-semibold hover:underline"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
