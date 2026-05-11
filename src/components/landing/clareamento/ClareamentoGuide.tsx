import React, { useState } from 'react';
import { CheckCircle, Award, Users, Clock } from 'lucide-react';

interface ClareamentoGuideProps {
  title: string;
  subtitle: string;
}

const ClareamentoGuide: React.FC<ClareamentoGuideProps> = ({
  title,
  subtitle
}) => {
  const [activeTab, setActiveTab] = useState('consultorio');

  const credentials = [
    { icon: Award, text: "Dra. Carla Christoph" },
    { icon: Award, text: "CRO-RJ 27509" },
    { icon: Award, text: "Especialista em Prótese Dental" },
    { icon: Award, text: "Especialista em Implantodontia" },
    { icon: Clock, text: "20+ anos de experiência" },
    { icon: Users, text: "4.000+ pacientes atendidos" }
  ];

  const processSteps = {
    consultorio: [
      {
        number: "1",
        title: "Consulta Personalizada",
        description: "Análise completa do seu caso, histórico e expectativas para definir a melhor abordagem de clareamento"
      },
      {
        number: "2",
        title: "Proteção e Preparação",
        description: "Preparação cuidadosa das gengivas e tecidos moles para máxima segurança durante o procedimento"
      },
      {
        number: "3",
        title: "Aplicação do Gel Clareador (45-60 min)",
        description: "Aplicação profissional do gel clareador de alta concentração com monitoramento contínuo"
      },
      {
        number: "4",
        title: "Acompanhamento Contínuo",
        description: "Suporte completo pós-tratamento com orientações para manutenção dos resultados"
      }
    ],
    caseiro: [
      {
        number: "1",
        title: "Moldagem Personalizada",
        description: "Confecção de moldeiras individuais para perfeito encaixe e distribuição uniforme do gel"
      },
      {
        number: "2",
        title: "Entrega do Kit Personalizado",
        description: "Kit completo com moldeiras, gel clareador e instruções detalhadas de uso"
      },
      {
        number: "3",
        title: "Aplicação Domiciliar (14-21 dias)",
        description: "Uso gradual e controlado das moldeiras conforme protocolo personalizado"
      },
      {
        number: "4",
        title: "Monitoramento Profissional",
        description: "Acompanhamento regular para ajustes e segurança do procedimento"
      }
    ]
  };

  return (
    <section className="bg-[#CFCBB4] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
            <p className="text-lg text-[#333333] leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Credentials Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-[#381F47] text-center mb-6">
              Sua Especialista em Clareamento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credentials.map((credential, index) => {
                const IconComponent = credential.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <IconComponent size={20} className="text-[#B3955F]" />
                    <span className="text-[#333333] font-medium">{credential.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Process Tabs */}
          <div className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-2 shadow-md">
                <button
                  onClick={() => setActiveTab('consultorio')}
                  className={`px-6 py-3 rounded-md transition-colors duration-300 ${
                    activeTab === 'consultorio'
                      ? 'bg-[#381F47] text-white'
                      : 'text-[#381F47] hover:bg-gray-100'
                  }`}
                >
                  Clareamento de Consultório
                </button>
                <button
                  onClick={() => setActiveTab('caseiro')}
                  className={`px-6 py-3 rounded-md transition-colors duration-300 ${
                    activeTab === 'caseiro'
                      ? 'bg-[#381F47] text-white'
                      : 'text-[#381F47] hover:bg-gray-100'
                  }`}
                >
                  Clareamento Caseiro Supervisionado
                </button>
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps[activeTab as keyof typeof processSteps].map((step, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#381F47] text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <h4 className="text-lg font-semibold text-[#381F47]">
                      {step.title}
                    </h4>
                    <p className="text-[#333333] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClareamentoGuide;