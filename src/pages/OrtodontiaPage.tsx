import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle, Clock, Users, Shield } from "lucide-react";

const OrtodontiaPage = () => {
  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-dental-gold" />,
      title: "Sorriso Alinhado",
      description: "Correção precisa do alinhamento dental para um sorriso harmonioso"
    },
    {
      icon: <Shield className="w-6 h-6 text-dental-gold" />,
      title: "Tecnologia Moderna",
      description: "Aparelhos modernos e discretos para maior conforto durante o tratamento"
    },
    {
      icon: <Clock className="w-6 h-6 text-dental-gold" />,
      title: "Resultados Duradouros",
      description: "Tratamento completo com resultados que permanecem por toda a vida"
    },
    {
      icon: <Users className="w-6 h-6 text-dental-gold" />,
      title: "Acompanhamento Especializado",
      description: "Monitoramento regular com a Dra. Carla Christoph durante todo o processo"
    }
  ];

  const treatmentTypes = [
    {
      title: "Aparelho Fixo Convencional",
      description: "Solução tradicional e eficaz para correção de diversos problemas ortodônticos"
    },
    {
      title: "Aparelho Estético",
      description: "Brackets transparentes ou da cor do dente para maior discrição"
    },
    {
      title: "Aparelho Autoligado",
      description: "Tecnologia avançada que reduz o tempo de tratamento e desconforto"
    },
    {
      title: "Contenção Ortodôntica",
      description: "Manutenção dos resultados após a remoção do aparelho principal"
    }
  ];

  return (
    <PageLayout>
      <Helmet>
        <title>Ortodontia em Ipanema | Aparelhos Dentários | Dra. Carla Christoph</title>
        <meta 
          name="description" 
          content="Tratamento ortodôntico especializado em Ipanema com a Dra. Carla Christoph. Aparelhos modernos para alinhamento dental e correção da mordida." 
        />
        <meta name="keywords" content="ortodontia, aparelho dental, alinhamento dental, mordida, Ipanema, Dra. Carla Christoph" />
      </Helmet>

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <ServiceBreadcrumb serviceName="Ortodontia" />
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="heading-xl mb-6">
              Ortodontia em Ipanema
            </h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-xl text-dental-gray mb-8">
              Correção de problemas de alinhamento dental e mordida com aparelhos modernos e discretos, 
              proporcionando um sorriso harmônico e funcional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-dental-gold hover:bg-dental-gold/90 text-white"
                onClick={() => window.open('https://wa.me/5521999999999?text=Olá! Gostaria de agendar uma consulta para avaliar um tratamento ortodôntico.', '_blank')}
              >
                Agendar Consulta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="heading-lg text-center mb-12">
              Benefícios do Tratamento Ortodôntico
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-shadow elegant-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-lg font-display">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-dental-purple/80">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Treatment Types Section */}
          <div className="mb-16">
            <h2 className="heading-lg text-center mb-12">
              Tipos de Tratamento Ortodôntico
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treatmentTypes.map((type, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow elegant-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-display text-dental-purple">
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-dental-gray text-base">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="heading-lg text-center mb-12">
              Como Funciona o Tratamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-dental-gold">1</span>
                </div>
                <h3 className="text-xl font-display mb-3 text-dental-purple">Avaliação Inicial</h3>
                <p className="text-dental-gray">
                  Consulta completa com exames e diagnóstico personalizado do caso ortodôntico.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-dental-gold">2</span>
                </div>
                <h3 className="text-xl font-display mb-3 text-dental-purple">Planejamento</h3>
                <p className="text-dental-gray">
                  Desenvolvimento do plano de tratamento ideal para seu caso específico.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-dental-gold">3</span>
                </div>
                <h3 className="text-xl font-display mb-3 text-dental-purple">Acompanhamento</h3>
                <p className="text-dental-gray">
                  Consultas regulares para ajustes e monitoramento da evolução do tratamento.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-dental-beige rounded-2xl p-8 md:p-12 text-center">
            <h2 className="heading-lg mb-4">
              Pronto para ter o sorriso alinhado dos seus sonhos?
            </h2>
            <p className="text-xl text-dental-gray mb-8 max-w-2xl mx-auto">
              Agende sua consulta de avaliação ortodôntica e descubra como podemos transformar seu sorriso 
              com segurança e precisão.
            </p>
            <Button 
              size="lg" 
              className="bg-dental-gold hover:bg-dental-gold/90 text-white"
              onClick={() => window.open('https://wa.me/5521999999999?text=Olá! Gostaria de agendar uma consulta para avaliar um tratamento ortodôntico.', '_blank')}
            >
              Agendar Consulta de Avaliação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default OrtodontiaPage;