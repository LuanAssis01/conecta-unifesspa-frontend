import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './LoginPage.module.css';
import type { User } from '../../types/userType';
import type { LoginFormData } from '../../types/loginTypes';

interface LoginResponse {
    user: User;
    token: string;
}

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setIsLoading(true);

        try {
            const response: LoginResponse = await authService.login(data.email, data.password);

            login(response.user, response.token);

            if (response.User.role === 'aluno') {
                navigate('/aluno/projetos');
            } else {
                navigate('/dashboard');
            }

        } catch (error: any) {
            setError('email', { 
                type: 'manual', 
                message: error?.message || 'Email ou senha incorretos' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.imageSection}>
                <img
                    src="/src/assets/images/foto_unifesspa.png"
                    alt="UNIFESSPA Campus"
                    className={styles.backgroundImage}
                />
                <div className={styles.overlay}>
                    <img
                        src="/src/assets/logos/logo.png"
                        alt="UNIFESSPA+"
                        className={styles.logo}
                    />
                    <h1 className={styles.brandTitle}>UNIFESSPA+</h1>
                    <p className={styles.brandSubtitle}>Conectando Projetos e Pessoas</p>
                </div>
            </div>

            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Bem-vindo de volta!</h2>
                    <p className={styles.formSubtitle}>
                        Entre com suas credenciais para acessar sua conta
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

                        <div className={styles.formOptions}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" className={styles.checkbox} />
                                Lembrar-me
                            </label>
                            <a href="#" className={styles.forgotLink}>Esqueceu a senha?</a>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>

                    <div className={styles.formFooter}>
                        <p>
                            Não tem uma conta?  
                            <a href="/cadastro" className={styles.signupLink}> Cadastre-se</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
