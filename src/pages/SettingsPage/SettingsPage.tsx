import { useState, useRef } from 'react';
import { Save, Bell, Lock, User as UserIcon, Globe, Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'appearance';

const SettingsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '(94) 99999-9999',
        siape: '2024001234',
        photo: user?.photo || '/src/assets/images/profile_photo.png',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        newProjects: true,
        approvals: true,
        messages: false,
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Arquivo muito grande! Máximo 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({ ...profileData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleToggle = (key: keyof typeof notifications) => {
        setNotifications({
            ...notifications,
            [key]: !notifications[key],
        });
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Perfil atualizado com sucesso!');
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres!');
            return;
        }
        alert('Senha alterada com sucesso!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const tabs = [
        { id: 'profile' as SettingsTab, label: 'Perfil', icon: UserIcon },
        { id: 'security' as SettingsTab, label: 'Segurança', icon: Lock },
        { id: 'notifications' as SettingsTab, label: 'Notificações', icon: Bell },
        { id: 'appearance' as SettingsTab, label: 'Aparência', icon: Globe },
    ];

    return (
        <div className="flex min-h-screen bg-secondary-50">
            <Sidebar />

            <main className="flex-1 p-8 sm:p-6 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-secondary-900 mb-1">Configurações</h1>
                    <p className="text-secondary-600 text-lg">
                        Gerencie suas preferências e configurações da conta
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-secondary-200 mb-6 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center gap-2 px-6 py-3 font-semibold text-sm
                  border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                                        ? 'border-primary-500 text-primary-500'
                                        : 'border-transparent text-secondary-600 hover:text-secondary-900'
                                    }
                `}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-4xl">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <UserIcon size={20} className="text-primary-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-secondary-900">Informações do Perfil</h2>
                                    <p className="text-sm text-secondary-600">Atualize sua foto e dados pessoais</p>
                                </div>
                            </div>

                            <form onSubmit={handleSaveProfile} className="space-y-6">
                                {/* Photo Upload */}
                                <div className="flex items-center gap-6 pb-6 border-b border-secondary-200">
                                    <div className="relative">
                                        <img
                                            src={profileData.photo}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 border-2 border-white rounded-full flex items-center justify-center hover:scale-110 transition"
                                        >
                                            <Camera size={16} className="text-white" />
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="hidden"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-secondary-900 mb-1">Foto de Perfil</p>
                                        <p className="text-sm text-secondary-600">
                                            Clique no ícone para alterar. JPG, PNG ou GIF. Máximo 2MB.
                                        </p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <Input
                                    label="Nome Completo"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleProfileChange}
                                    required
                                />
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    required
                                />
                                <Input
                                    label="Telefone"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                />
                                <Input
                                    label="SIAPE/Matrícula"
                                    name="siape"
                                    value={profileData.siape}
                                    onChange={handleProfileChange}
                                />

                                <div className="flex justify-end pt-2">
                                    <Button type="submit" variant="primary">
                                        <Save size={18} className="mr-2" />
                                        Salvar Alterações
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <Lock size={20} className="text-primary-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-secondary-900">Segurança</h2>
                                    <p className="text-sm text-secondary-600">Altere sua senha de acesso</p>
                                </div>
                            </div>

                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <Input
                                    label="Senha Atual"
                                    name="currentPassword"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <Input
                                    label="Nova Senha"
                                    name="newPassword"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <Input
                                    label="Confirmar Nova Senha"
                                    name="confirmPassword"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Dica:</strong> Use uma senha forte com no mínimo 6 caracteres, incluindo letras, números e símbolos.
                                    </p>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button type="submit" variant="primary">
                                        <Lock size={18} className="mr-2" />
                                        Alterar Senha
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <Bell size={20} className="text-primary-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-secondary-900">Notificações</h2>
                                    <p className="text-sm text-secondary-600">Gerencie suas preferências de notificação</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <ToggleSwitch
                                    label="Notificações por Email"
                                    description="Receba atualizações importantes por email"
                                    checked={notifications.emailNotifications}
                                    onChange={() => handleToggle('emailNotifications')}
                                />
                                <ToggleSwitch
                                    label="Novos Projetos"
                                    description="Notificar quando novos projetos forem publicados"
                                    checked={notifications.newProjects}
                                    onChange={() => handleToggle('newProjects')}
                                />
                                <ToggleSwitch
                                    label="Aprovações Pendentes"
                                    description="Alertas sobre projetos aguardando aprovação"
                                    checked={notifications.approvals}
                                    onChange={() => handleToggle('approvals')}
                                />
                                <ToggleSwitch
                                    label="Mensagens"
                                    description="Notificações de novas mensagens"
                                    checked={notifications.messages}
                                    onChange={() => handleToggle('messages')}
                                />
                            </div>

                            <div className="flex justify-end pt-6 border-t border-secondary-200 mt-6">
                                <Button
                                    variant="primary"
                                    onClick={() => alert('Preferências de notificação salvas!')}
                                >
                                    <Save size={18} className="mr-2" />
                                    Salvar Preferências
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <Card>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <Globe size={20} className="text-primary-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-secondary-900">Aparência</h2>
                                    <p className="text-sm text-secondary-600">Personalize a interface do sistema</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block font-semibold text-secondary-900 text-sm mb-2">
                                        Idioma
                                    </label>
                                    <select className="w-full py-3 px-4 border border-secondary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition bg-white text-secondary-900">
                                        <option value="pt-BR">Português (Brasil)</option>
                                        <option value="en-US" disabled>English (US) - Em breve</option>
                                        <option value="es-ES" disabled>Español - Em breve</option>
                                    </select>
                                    <p className="text-sm text-secondary-600 mt-2">
                                        Selecione o idioma de sua preferência para a interface
                                    </p>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">
                                        <strong>Em breve:</strong> Tema escuro e outras opções de personalização estarão disponíveis.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
};

// Toggle Switch Component
interface ToggleSwitchProps {
    label: string;
    description?: string;
    checked: boolean;
    onChange: () => void;
}

const ToggleSwitch = ({ label, description, checked, onChange }: ToggleSwitchProps) => {
    return (
        <div className="flex items-center justify-between py-3 border-b border-secondary-100 last:border-0">
            <div className="flex-1">
                <p className="font-semibold text-secondary-900">{label}</p>
                {description && <p className="text-sm text-secondary-600 mt-0.5">{description}</p>}
            </div>
            <button
                type="button"
                onClick={onChange}
                className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${checked ? 'bg-primary-500' : 'bg-secondary-300'}
        `}
            >
                <span
                    className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
                />
            </button>
        </div>
    );
};

export default SettingsPage;
