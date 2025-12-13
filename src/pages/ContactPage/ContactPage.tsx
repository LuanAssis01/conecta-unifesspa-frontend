import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit: SubmitHandler<ContactForm> = (data) => {
        console.log('Contact form data:', data);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'contato@unifesspa.edu.br',
            color: 'blue'
        },
        {
            icon: Phone,
            title: 'Telefone',
            content: '(94) 2101-5900',
            color: 'green'
        },
        {
            icon: MapPin,
            title: 'Endereço',
            content: (
                <>
                    Folha 31, Quadra 07, Lote Especial<br />
                    Nova Marabá - Marabá/PA<br />
                    CEP: 68507-590
                </>
            ),
            color: 'red'
        },
        {
            icon: Clock,
            title: 'Horário de Atendimento',
            content: (
                <>
                    Segunda a Sexta-feira<br />
                    08:00 às 18:00
                </>
            ),
            color: 'purple'
        }
    ];

    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        red: 'bg-red-100 text-red-600',
        purple: 'bg-purple-100 text-purple-600'
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary-50">
            <Header />

            <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 flex-1 w-full">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-secondary-900 mb-4">
                        Entre em Contato
                    </h1>
                    <p className="text-lg sm:text-xl text-secondary-600 max-w-2xl mx-auto">
                        Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-secondary-100">
                        {submitted && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 font-semibold border-l-4 border-green-500 flex items-center gap-3">
                                <CheckCircle size={20} className="flex-shrink-0" />
                                <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
                            <Input
                                label="Nome Completo"
                                name="name"
                                type="text"
                                placeholder="Seu nome"
                                register={register}
                                error={errors.name}
                                required
                            />

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                register={register}
                                error={errors.email}
                                required
                            />

                            <Input
                                label="Assunto"
                                name="subject"
                                type="text"
                                placeholder="Sobre o que você quer falar?"
                                register={register}
                                error={errors.subject}
                                required
                            />

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="font-semibold text-secondary-800 text-sm">
                                    Mensagem *
                                </label>
                                <textarea
                                    id="message"
                                    {...register('message', { required: true })}
                                    placeholder="Digite sua mensagem aqui..."
                                    className="w-full py-3 px-4 border border-secondary-200 rounded-lg text-base focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 resize-none"
                                    rows={6}
                                />
                                {errors.message && (
                                    <span className="text-red-600 text-sm">Este campo é obrigatório</span>
                                )}
                            </div>

                            <Button type="submit" variant="primary" size="large" fullWidth>
                                <Send size={20} className="mr-2" />
                                Enviar Mensagem
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="flex flex-col gap-6">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-md border border-secondary-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-lg ${colorClasses[info.color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0`}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-secondary-900 mb-2">
                                                {info.title}
                                            </h3>
                                            <p className="text-secondary-600 leading-relaxed">
                                                {info.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
