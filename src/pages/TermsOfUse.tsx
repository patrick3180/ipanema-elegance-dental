
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const TermsOfUse = () => {
  return (
    <PageLayout>
      <section className="section-spacing bg-dental-beige">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg text-dental-purple mb-4">Termos de Uso</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md text-gray-700 mb-6">
              Bem-vindo ao site da Dra. Carla Christoph. Ao acessar e utilizar este site, você concorda com os termos e condições descritos abaixo.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Uso do Site</h2>
            <p className="body-md text-gray-700 mb-6">
              Este site destina-se a fornecer informações sobre nossos serviços odontológicos. O conteúdo apresentado tem finalidade informativa e não substitui uma consulta odontológica profissional.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Propriedade Intelectual</h2>
            <p className="body-md text-gray-700 mb-6">
              Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, imagens e software, é propriedade da Dra. Carla Christoph ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Informações Médicas</h2>
            <p className="body-md text-gray-700 mb-6">
              As informações odontológicas fornecidas neste site são de natureza geral e não devem ser usadas para autodiagnóstico ou automedicação. Sempre consulte um profissional de saúde qualificado para obter aconselhamento médico.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Agendamento e Consultas</h2>
            <p className="body-md text-gray-700 mb-6">
              O agendamento de consultas através do site está sujeito à disponibilidade e confirmação. Reservamo-nos o direito de reprogramar ou cancelar consultas quando necessário, mediante aviso prévio.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Limitação de Responsabilidade</h2>
            <p className="body-md text-gray-700 mb-6">
              A Dra. Carla Christoph não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do acesso ou uso deste site, ou da incapacidade de acessá-lo ou utilizá-lo.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Links para Outros Sites</h2>
            <p className="body-md text-gray-700 mb-6">
              Este site pode conter links para sites de terceiros. Não temos controle sobre o conteúdo ou as práticas de privacidade desses sites e não nos responsabilizamos por eles.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Modificações nos Termos</h2>
            <p className="body-md text-gray-700 mb-6">
              Reservamo-nos o direito de modificar estes termos de uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. O uso continuado do site após tais modificações constitui sua aceitação dos novos termos.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Lei Aplicável</h2>
            <p className="body-md text-gray-700 mb-6">
              Estes termos de uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada a este site será resolvida nos tribunais da cidade do Rio de Janeiro.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Contato</h2>
            <p className="body-md text-gray-700 mb-6">
              Para questões relacionadas aos termos de uso, entre em contato através do email: contato@dracarlachristoph.com
            </p>
            
            <p className="body-md text-gray-700 mb-6 italic mt-10">
              Última atualização: Maio de 2025
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfUse;
