
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const TermsOfUse = () => {
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-4">Termos de Uso</h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-dental-gray mb-6">
              As regras para utilização do nosso site
            </p>
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto">
            <h2>1. Termos</h2>
            
            <p>
              Ao acessar o site Ipanema Elegance Dental, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </p>
            
            <h2>2. Uso de Licença</h2>
            
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Ipanema Elegance Dental, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            
            <ul>
              <li>modificar ou copiar os materiais;</li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Ipanema Elegance Dental;</li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
            </ul>
            
            <p>
              Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Ipanema Elegance Dental a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
            </p>
            
            <h2>3. Isenção de responsabilidade</h2>
            
            <p>
              Os materiais no site da Ipanema Elegance Dental são fornecidos 'como estão'. Ipanema Elegance Dental não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
            </p>
            
            <p>
              Além disso, o Ipanema Elegance Dental não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a tais materiais ou em sites vinculados a este site.
            </p>
            
            <h2>4. Limitações</h2>
            
            <p>
              Em nenhum caso o Ipanema Elegance Dental ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Ipanema Elegance Dental, mesmo que Ipanema Elegance Dental ou um representante autorizado da Ipanema Elegance Dental tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.
            </p>
            
            <h2>5. Precisão dos materiais</h2>
            
            <p>
              Os materiais exibidos no site da Ipanema Elegance Dental podem incluir erros técnicos, tipográficos ou fotográficos. Ipanema Elegance Dental não garante que qualquer material em seu site seja preciso, completo ou atual. Ipanema Elegance Dental pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Ipanema Elegance Dental não se compromete a atualizar os materiais.
            </p>
            
            <h2>6. Links</h2>
            
            <p>
              O Ipanema Elegance Dental não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Ipanema Elegance Dental do site. O uso de qualquer site vinculado é por conta e risco do usuário.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfUse;
