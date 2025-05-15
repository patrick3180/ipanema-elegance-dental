import React from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// This data would be better coming from an API or CMS, but for now, we'll hardcode it
const serviceData = {
  "lentes-e-facetas": {
    title: "Lentes de Contato Dental e Facetas de Porcelana",
    description: "Transforme seu sorriso com finas lâminas de porcelana, corrigindo cor, forma e imperfeições com naturalidade e precisão estética.",
    fullContent: "As lentes de contato dental e facetas de porcelana são lâminas ultrafinas que são aplicadas sobre a superfície visível dos dentes para transformar completamente o sorriso. Este tratamento é ideal para corrigir dentes manchados, desgastados, quebrados, desalinhados ou com espaçamentos. Na clínica da Dra. Carla Christoph em Ipanema, utilizamos materiais de alta qualidade e técnicas modernas para garantir resultados naturais e duradouros.",
    detailPageUrl: "/lentes-de-contato-dental-e-facetas-de-porcelana"
  },
  "clareamento-dental": {
    title: "Clareamento Dental Profissional",
    description: "Conquiste dentes visivelmente mais brancos e um sorriso radiante com nossas técnicas de clareamento seguras e eficazes.",
    fullContent: "O clareamento dental profissional é um procedimento rápido e eficaz para remover manchas e clarear o tom natural dos seus dentes. Em nossa clínica odontológica em Ipanema, oferecemos tanto o clareamento em consultório quanto o supervisionado para uso em casa. A Dra. Carla Christoph utiliza produtos de alta qualidade que clareiam os dentes sem danificar o esmalte dental, proporcionando um sorriso mais branco e radiante com segurança.",
    detailPageUrl: "/clareamento-dental"
  },
  "proteses-dentarias": {
    title: "Próteses Dentárias",
    description: "Recupere a função mastigatória e a estética do seu sorriso com próteses dentárias personalizadas.",
    fullContent: "As próteses dentárias são soluções personalizadas para substituir dentes perdidos, restaurando tanto a função mastigatória quanto a estética do sorriso. Como especialista em Prótese Dental, a Dra. Carla Christoph projeta próteses fixas (coroas e pontes) e removíveis que se integram perfeitamente à sua boca. Utilizamos materiais modernos que garantem conforto, durabilidade e aparência natural.",
    detailPageUrl: "/protese-dentaria"
  },
  "implantes-dentarios": {
    title: "Implantes Dentários",
    description: "A solução definitiva para a perda de dentes. Implantes seguros e duradouros para restaurar seu sorriso.",
    fullContent: "Os implantes dentários são a solução mais avançada para substituir dentes perdidos. Eles funcionam como raízes artificiais, proporcionando uma base sólida para dentes fixos ou removíveis. Com profundo conhecimento em Implantodontia, a Dra. Carla Christoph oferece implantes de alta qualidade que se integram naturalmente ao osso maxilar, garantindo durabilidade e função idêntica à dos dentes naturais. Este tratamento não apenas restaura seu sorriso, mas também previne a perda óssea e mantém a estrutura facial intacta.",
    detailPageUrl: ""
  },
  "clinica-geral-e-prevencao": {
    title: "Clínica Geral e Prevenção",
    description: "Cuide da sua saúde bucal com nossos check-ups digitais e planos de prevenção personalizados.",
    fullContent: "A prevenção é o pilar da odontologia moderna. Em nossa clínica em Ipanema, a Dra. Carla Christoph oferece check-ups completos com tecnologia digital para identificar problemas em estágio inicial. Nossos serviços incluem limpeza profissional (profilaxia), aplicação de flúor, orientação de higiene bucal personalizada e planos preventivos. Investir na prevenção significa menos tratamentos invasivos no futuro e uma saúde bucal duradoura.",
    detailPageUrl: ""
  },
  "restauracoes-esteticas": {
    title: "Restaurações Estéticas",
    description: "Tratamento de cáries e reconstrução de dentes com materiais que imitam a cor natural dos dentes.",
    fullContent: "As restaurações estéticas são tratamentos que reparam dentes danificados por cáries, fraturas ou desgastes, devolvendo tanto a função quanto a beleza natural. A Dra. Carla Christoph utiliza resinas compostas da mais alta qualidade, que imitam perfeitamente a cor e a translucidez dos dentes naturais. O resultado são restaurações praticamente invisíveis, que se integram harmoniosamente ao seu sorriso enquanto devolvem a força e a função aos dentes afetados.",
    detailPageUrl: ""
  },
  "tratamento-de-canal": {
    title: "Tratamento de Canal (Endodontia)",
    description: "Alivie a dor e preserve seu dente natural com nosso tratamento de canal com técnicas avançadas.",
    fullContent: "O tratamento de canal é um procedimento que salva dentes severamente infectados ou danificados, eliminando a necessidade de extração. Em nossa clínica em Ipanema, a Dra. Carla Christoph realiza este procedimento com técnicas modernas e instrumentos de precisão, tornando o processo confortável e eficaz. O procedimento remove a polpa infectada, limpa o interior do dente, desinfeta os canais e os sela para prevenir futuras infecções, preservando seu dente natural.",
    detailPageUrl: ""
  },
  "saude-da-gengiva": {
    title: "Saúde da Gengiva (Periodontia)",
    description: "Tratamento especializado para gengivite e periodontite, cuidando da base do seu sorriso.",
    fullContent: "A saúde das gengivas é fundamental para a manutenção dos dentes e do sorriso como um todo. Nossa clínica em Ipanema oferece diagnóstico e tratamento de problemas gengivais, desde a gengivite inicial até casos mais avançados de periodontite. Os tratamentos incluem limpeza profunda, raspagem e alisamento radicular, e orientações personalizadas de higiene. A Dra. Carla Christoph trabalha para reverter problemas gengivais existentes e prevenir futuros danos, garantindo uma base sólida para seu sorriso.",
    detailPageUrl: ""
  }
};

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = serviceSlug ? serviceData[serviceSlug as keyof typeof serviceData] : null;
  
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <Button
            variant="outline"
            asChild
            className="mb-8 border-dental-gray text-dental-purple hover:bg-dental-beige/50"
          >
            <Link to="/servicos">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para tratamentos
            </Link>
          </Button>
          
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg mb-4">{service?.title || "Tratamento"}</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto">
            {service ? (
              <>
                <p className="body-md mb-6">{service.description}</p>
                <p className="body-md">{service.fullContent}</p>
                
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-6 py-5"
                    onClick={() => window.open("https://wa.me/5521999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20" + encodeURIComponent(service.title), "_blank")}
                  >
                    Agendar consulta
                  </Button>
                  
                  {service.detailPageUrl && (
                    <Button 
                      variant="outline" 
                      className="border-dental-gold text-dental-gold hover:bg-dental-gold/10"
                      asChild
                    >
                      <Link to={service.detailPageUrl}>
                        Ver detalhes do tratamento
                      </Link>
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <p className="body-md">
                Informações detalhadas sobre este tratamento não foram encontradas. Por favor, entre em contato conosco para mais informações.
              </p>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
