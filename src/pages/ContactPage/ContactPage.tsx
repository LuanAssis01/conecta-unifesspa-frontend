// src/pages/ContactPage/ContactPage.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log("Contact form data:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-(--color-background)">
      <Header />

      <div className="max-w-[1400px] mx-auto px-8 py-16 flex-1 md:px-4 md:py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-(--color-text) mb-4 md:text-3xl">
            Entre em Contato
          </h1>
          <p className="text-lg text-(--color-text-secondary)">
            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid gap-16 grid-cols-[1.5fr_1fr] lg:grid-cols-1 lg:gap-8">
          {/* Formulário */}
          <div className="bg-white p-10 rounded-2xl shadow-md md:p-6">
            {submitted && (
              <div className="mb-6 bg-emerald-100 text-(--color-success) px-4 py-3 rounded-lg font-semibold border-l-4 border-(--color-success)">
                ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
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
                <label
                  htmlFor="message"
                  className="font-semibold text-(--color-text) text-sm"
                >
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: true })}
                  placeholder="Digite sua mensagem aqui..."
                  rows={6}
                  className="w-full px-4 py-3 border border-(--color-border) rounded-lg text-base font-inherit resize-y transition-all focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-emerald-100"
                />
                {errors.message && (
                  <span className="text-(--color-error) text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <Button type="submit" variant="primary" size="large" fullWidth>
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Informações de contato */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-bold text-(--color-text) mb-3">
                📧 Email
              </h3>
              <p className="text-(--color-text-secondary) leading-relaxed">
                contato@unifesspa.edu.br
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-bold text-(--color-text) mb-3">
                📞 Telefone
              </h3>
              <p className="text-(--color-text-secondary) leading-relaxed">
                (94) 2101-5900
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-bold text-(--color-text) mb-3">
                📍 Endereço
              </h3>
              <p className="text-(--color-text-secondary) leading-relaxed">
                Folha 31, Quadra 07, Lote Especial
                <br />
                Nova Marabá - Marabá/PA
                <br />
                CEP: 68507-590
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-bold text-(--color-text) mb-3">
                🕒 Horário de Atendimento
              </h3>
              <p className="text-(--color-text-secondary) leading-relaxed">
                Segunda a Sexta-feira
                <br />
                08:00 às 18:00
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
