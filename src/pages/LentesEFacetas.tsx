import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
const LentesEFacetas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <PageLayout className="pt-16">
      <Helmet>
        <title>Lentes de Contato e Facetas em Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Conquiste o sorriso dos sonhos com lentes de contato dental em Ipanema. Dra. Carla Christoph oferece facetas de porcelana." />
      </Helmet>

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <Button variant="outline" asChild className="mb-6 border-dental-gray text-dental-purple hover:bg-dental-beige/50">
            <Link to="/servicos">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para tratamentos
            </Link>
          </Button>
          
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="heading-lg mb-4">Lentes de Contato Dental e Facetas de Porcelana em Ipanema</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <p className="body-md">
              Descubra a arte de um sorriso naturalmente deslumbrante com as lentes de contato dental e facetas de porcelana oferecidas pela Dra. Carla Christoph em nossa clínica em Ipanema. Essas finas lâminas de porcelana são a chave para uma transformação do sorriso completo, corrigindo imperfeições de cor, forma e alinhamento com resultados estéticos excepcionais e duradouros.
            </p>
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto">
            {/* Seção 1 */}
            <div className="my-12">
              <h2 className="heading-md mb-4">O Que São Lentes de Contato Dental e Facetas de Porcelana?</h2>
              <p className="body-md">
                As lentes de contato dental e as facetas de porcelana são peças ultrafinas de cerâmica pura, moldadas individualmente para cada paciente e cimentadas sobre a superfície dos dentes. Embora ambas visem aprimorar a estética do sorriso, as lentes de contato são tipicamente mais finas e requerem mínimo ou nenhum desgaste dental, sendo ideais para correções mais sutis. Já as facetas de porcelana, um pouco mais espessas, permitem correções mais significativas. Ambas as técnicas, realizadas com maestria pela Dra. Carla Christoph em Ipanema, proporcionam um resultado incrivelmente natural, mimetizando a translucidez e o brilho dos dentes naturais, para uma verdadeira transformação do sorriso com lentes dentais.
              </p>
            </div>

            {/* Seção 2 */}
            <div className="my-12">
              <h2 className="heading-md mb-4">Indicações: Quando Optar por Lentes de Contato Dental ou Facetas?</h2>
              <p className="body-md">
                Se você busca um sorriso mais harmônico e esteticamente agradável em Ipanema, as lentes de contato dental ou facetas de porcelana podem ser a solução ideal. Estes tratamentos são indicados para: Corrigir dentes manchados, escurecidos ou com alteração de cor que não respondem bem ao clareamento dental; Fechar espaços entre os dentes (diastemas); Restaurar dentes lascados, fraturados ou desgastados; Melhorar a forma e o tamanho de dentes desproporcionais ou dentes pequenos; Promover um alinhamento estético para dentes levemente desalinhados; Proporcionar um rejuvenescimento geral do sorriso. Uma avaliação cuidadosa com a Dra. Carla Christoph, sua dentista especialista em lentes de contato dental em Ipanema, definirá qual a melhor abordagem para o seu caso.
              </p>
            </div>

            {/* Seção 3 */}
            <div className="my-12">
              <h2 className="heading-md mb-4">Benefícios que Vão Além da Estética: Lentes e Facetas</h2>
              <p className="body-md mb-4">
                Optar por lentes de contato dental ou facetas de porcelana na clínica da Dra. Carla Christoph em Ipanema oferece múltiplos benefícios:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="body-md"><strong>Resultados Altamente Estéticos:</strong> A porcelana possui características ópticas semelhantes ao esmalte dental, conferindo naturalidade incomparável.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="body-md"><strong>Durabilidade e Resistência:</strong> São peças resistentes a manchas e ao desgaste, mantendo a beleza do sorriso por muitos anos com os devidos cuidados.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="body-md"><strong>Preservação da Estrutura Dental:</strong> Especialmente com as lentes de contato, o desgaste do dente é mínimo ou inexistente.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="body-md"><strong>Melhora da Autoestima:</strong> Um sorriso renovado impacta positivamente a confiança e a forma como você se apresenta ao mundo.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="body-md"><strong>Planejamento Personalizado:</strong> Com o auxílio do Design Digital do Sorriso (DSD), você participa ativamente da criação do seu novo sorriso.</span>
                </li>
              </ul>
            </div>

            {/* Seção 4 */}
            <div className="my-12">
              <h2 className="heading-md mb-4">Seu Tratamento com Lentes ou Facetas em Ipanema: Passo a Passo</h2>
              <p className="body-md mb-4">
                O processo para a transformação do seu sorriso com lentes dentais ou facetas na nossa clínica em Ipanema é realizado com precisão e cuidado pela Dra. Carla Christoph:
              </p>
              <ol className="space-y-4">
                <li className="body-md">
                  <strong>1. Avaliação e Planejamento:</strong> Uma consulta inicial detalhada para entender seus desejos e avaliar a saúde bucal. Fotografias, radiografias e, quando indicado, o escaneamento intraoral são realizados.
                </li>
                <li className="body-md">
                  <strong>2. Design Digital do Sorriso (DSD):</strong> Em muitos casos, utilizamos o Design Digital do Sorriso. Essa tecnologia permite que você visualize uma simulação do resultado final e aprove o planejamento antes de qualquer intervenção.
                </li>
                <li className="body-md">
                  <strong>3. Preparo Dental (se necessário):</strong> Um mínimo desgaste pode ser realizado para garantir o encaixe perfeito das peças. Para lentes de contato, muitas vezes não há necessidade de desgaste.
                </li>
                <li className="body-md">
                  <strong>4. Moldagem/Escaneamento:</strong> Realizamos a moldagem ou escaneamento preciso dos seus dentes.
                </li>
                <li className="body-md">
                  <strong>5. Confecção das Lâminas:</strong> As lentes ou facetas são confeccionadas artisticamente em laboratório especializado, seguindo o planejamento digital.
                </li>
                <li className="body-md">
                  <strong>6. Cimentação:</strong> As peças são provadas e, após sua aprovação, cimentadas aos dentes com adesivos de alta performance, garantindo uma união forte e duradoura.
                </li>
              </ol>
            </div>

            {/* Seção 5 */}
            <div className="my-12">
              <h2 className="heading-md mb-4">Cuidados Essenciais para a Durabilidade das suas Lentes e Facetas</h2>
              <p className="body-md">
                Para garantir a longevidade e a beleza das suas lentes de contato dental ou facetas de porcelana, alguns cuidados são importantes: Mantenha uma excelente higiene bucal, com escovação e uso de fio dental regulares. Realize visitas periódicas à Dra. Carla Christoph em Ipanema para acompanhamento e profilaxia. Evite hábitos como roer unhas ou morder objetos duros. Se você tem bruxismo, o uso de uma placa miorrelaxante pode ser recomendado. Com os cuidados com facetas de porcelana e lentes adequados, seu novo sorriso permanecerá impecável por muitos anos.
              </p>
            </div>

            {/* Seção 6 - FAQ */}
            <div className="my-12">
              <h2 className="heading-md mb-6">Perguntas Frequentes sobre Lentes de Contato Dental e Facetas</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-medium text-dental-purple">
                    Lentes de contato dental e facetas de porcelana são a mesma coisa?
                  </AccordionTrigger>
                  <AccordionContent className="body-md">
                    Embora similares, as lentes são mais finas e geralmente requerem menos preparo dental que as facetas. A Dra. Carla Christoph avaliará qual a melhor opção para seu caso em nossa clínica em Ipanema.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base font-medium text-dental-purple">
                    Qual a durabilidade das lentes de contato dental e das facetas?
                  </AccordionTrigger>
                  <AccordionContent className="body-md">
                    Com os devidos cuidados e acompanhamento profissional, podem durar de 10 a 15 anos, ou até mais. A durabilidade das lentes de contato dental e facetas é excelente.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base font-medium text-dental-purple">
                    O tratamento com lentes de contato dental desgasta os dentes?
                  </AccordionTrigger>
                  <AccordionContent className="body-md">
                    As lentes de contato dental são conhecidas por exigirem mínimo ou nenhum desgaste do esmalte dental. Casos com facetas podem requerer um preparo um pouco maior, sempre realizado de forma conservadora pela Dra. Carla Christoph.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base font-medium text-dental-purple">
                    Como é feito o planejamento com o Design Digital do Sorriso (DSD) em Ipanema?
                  </AccordionTrigger>
                  <AccordionContent className="body-md">
                    O DSD utiliza fotos e vídeos para criar um projeto digital do seu novo sorriso, permitindo ajustes e sua aprovação antes do tratamento. É uma ferramenta poderosa para a transformação do sorriso com previsibilidade.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-base font-medium text-dental-purple">
                    Quais os cuidados necessários após colocar lentes ou facetas?
                  </AccordionTrigger>
                  <AccordionContent className="body-md">
                    Higienização rigorosa, visitas regulares ao dentista e evitar hábitos parafuncionais são essenciais. Detalharemos todos os cuidados com facetas de porcelana e lentes.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-base font-medium text-dental-purple">
                    Lentes de resina são uma alternativa às de porcelana? Quais as diferenças em termos de estética e investimento?
                  </AccordionTrigger>
                  <AccordionContent className="body-md">
                    Sim, facetas em resina são uma alternativa. Elas podem ser feitas em uma única sessão e geralmente têm um investimento inicial menor. No entanto, a porcelana oferece maior resistência a manchas, maior durabilidade e uma estética superior em termos de translucidez e brilho. A Dra. Carla poderá discutir a melhor opção para suas expectativas e orçamento em Ipanema.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-base font-medium text-dental-purple">
                    É possível colocar lentes de contato dental em apenas um dente?
                  </AccordionTrigger>
                  <AccordionContent className="body-md">
                    Sim, é possível aplicar em apenas um dente ou em vários, dependendo da necessidade estética e do planejamento individualizado feito pela nossa dentista especialista em lentes de contato dental em Ipanema.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Seção 7 - CTA Final */}
            <div className="my-12 bg-dental-beige/50 p-8 rounded-lg border border-dental-gold/20">
              <h2 className="heading-md mb-4 text-center">Pronto para Conquistar o Sorriso dos Seus Sonhos em Ipanema?</h2>
              <p className="body-md text-center mb-8">
                Se você deseja uma transformação do sorriso com lentes de contato dental ou facetas de porcelana, agende uma avaliação com a Dra. Carla Christoph. Em nossa clínica em Ipanema, estamos prontos para desenhar o sorriso perfeito para você.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-6 py-5" onClick={() => window.open("https://wa.me/5521999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação%20para%20lentes%20de%20contato%20dental%20ou%20facetas", "_blank")}>
                  Agendar Avaliação para Lentes/Facetas
                </Button>
                <Button variant="outline" className="border-dental-gold text-dental-gold hover:bg-dental-gold/10" asChild>
                  <Link to="/servicos">
                    Ver Outros Tratamentos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>;
};
export default LentesEFacetas;