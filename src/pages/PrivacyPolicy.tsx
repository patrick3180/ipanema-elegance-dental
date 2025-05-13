
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <section className="section-spacing bg-dental-beige">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg text-dental-purple mb-4">Política de Privacidade</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md text-gray-700 mb-6">
              A privacidade dos nossos pacientes é de extrema importância para o consultório da Dra. Carla Christoph. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Informações Coletadas</h2>
            <p className="body-md text-gray-700 mb-6">
              Coletamos informações pessoais como nome, endereço, telefone, e-mail, histórico médico e dados de saúde bucal relevantes para seu tratamento odontológico.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Uso das Informações</h2>
            <p className="body-md text-gray-700 mb-6">
              As informações coletadas são utilizadas exclusivamente para:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="body-md text-gray-700 mb-2">Fornecer tratamento odontológico adequado</li>
              <li className="body-md text-gray-700 mb-2">Comunicação sobre consultas e tratamentos</li>
              <li className="body-md text-gray-700 mb-2">Processamento de pagamentos</li>
              <li className="body-md text-gray-700 mb-2">Melhorar nossos serviços</li>
            </ul>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Proteção de Dados</h2>
            <p className="body-md text-gray-700 mb-6">
              Implementamos medidas de segurança técnicas, físicas e administrativas para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou divulgação.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Compartilhamento de Informações</h2>
            <p className="body-md text-gray-700 mb-6">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Compartilhamos informações apenas quando:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="body-md text-gray-700 mb-2">Necessário para seu tratamento (ex: laboratórios, especialistas)</li>
              <li className="body-md text-gray-700 mb-2">Exigido por lei</li>
              <li className="body-md text-gray-700 mb-2">Com seu consentimento explícito</li>
            </ul>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Cookies e Tecnologias Semelhantes</h2>
            <p className="body-md text-gray-700 mb-6">
              Nosso site pode utilizar cookies para melhorar sua experiência de navegação. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Seus Direitos</h2>
            <p className="body-md text-gray-700 mb-6">
              Você tem direito a:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="body-md text-gray-700 mb-2">Acessar seus dados pessoais</li>
              <li className="body-md text-gray-700 mb-2">Solicitar correção de informações imprecisas</li>
              <li className="body-md text-gray-700 mb-2">Solicitar a exclusão de seus dados (quando aplicável por lei)</li>
              <li className="body-md text-gray-700 mb-2">Retirar seu consentimento a qualquer momento</li>
            </ul>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Alterações na Política de Privacidade</h2>
            <p className="body-md text-gray-700 mb-6">
              Esta política pode ser atualizada periodicamente. Recomendamos verificá-la regularmente.
            </p>
            
            <h2 className="heading-md text-dental-purple mt-10 mb-4">Contato</h2>
            <p className="body-md text-gray-700 mb-6">
              Para questões relacionadas à privacidade, entre em contato através do email: contato@dracarlachristoph.com
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

export default PrivacyPolicy;
