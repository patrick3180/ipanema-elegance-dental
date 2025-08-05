import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import { FAQ, TreatmentSection } from "@/components/treatment/types";

const LentesEFacetas = () => {
  // Define the page sections according to the content structure
  const sections: TreatmentSection[] = [
    {
      id: "o-que-sao",
      title: "Ciência e Arte: O Que São Lentes de Contato Dental e Facetas de Porcelana?",
      content: "As lentes de contato dental e facetas de porcelana representam o ápice da odontologia estética minimamente invasiva. São peças ultrafinas de cerâmica pura de última geração, moldadas individualmente e cimentadas sobre a superfície dos dentes com precisão artística. A principal diferença técnica está na espessura: as lentes de contato dental possuem entre 0,2mm a 0,5mm - similar à espessura de uma lente de contato ocular - enquanto as facetas de porcelana variam entre 0,7mm a 1,2mm. Esta diferença determina o grau de invasividade do procedimento: as lentes de contato exigem desgaste mínimo ou inexistente da estrutura dental, sendo ideais para correções sutis, enquanto as facetas permitem correções mais significativas. As cerâmicas modernas utilizadas possuem características ópticas extraordinárias, com translucidez e resistência que mimetizam perfeitamente o esmalte dental natural, criando resultados indistinguíveis dos dentes originais. O objetivo é sempre alcançar resultados naturais que respeitem a individualidade de cada pessoa, harmonizando-se perfeitamente com as características faciais.",
      type: "default",
    },
    {
      id: "como-funciona",
      title: "Como Funciona a Tecnologia das Lentes de Contato Dental",
      content: "O processo científico por trás das lentes de contato dental envolve uma engenharia de precisão que combina materiais de excelência com técnicas de cimentação avançadas. As cerâmicas de última geração utilizadas possuem propriedades biomecânicas similares ao esmalte dental, incluindo coeficiente de expansão térmica compatível e resistência à fadiga. O sistema de adesão utiliza primers e adesivos de alta performance que criam uma união química e micromecânica entre a cerâmica e o dente, garantindo uma integração que pode durar décadas. A biocompatibilidade dos materiais elimina riscos de rejeição ou irritação gengival, enquanto a lisura da superfície cerâmica facilita a higienização e reduz o acúmulo de placa bacteriana. Esta tecnologia permite que as lentes se comportem como parte integrante do dente, respondendo naturalmente às forças mastigatórias e mantendo a funcionalidade completa.",
      type: "default",
    },
    {
      id: "indicacoes",
      title: "Indicações Técnicas: Quando Optar por Lentes de Contato Dental ou Facetas?",
      content: "A escolha entre lentes de contato dental e facetas de porcelana baseia-se em critérios técnicos precisos estabelecidos através de uma <a href=\"/blog/odontologia-estetica-sorriso-natural\"><strong>avaliação facial e dental integrada</strong></a>. As lentes de contato dental são idealmente indicadas para: correção de diastemas (espaços entre dentes) até 2mm, alterações leves de cor que não respondem ao clareamento profissional, pequenas correções de formato e contorno, dentes com desgastes mínimos, e casos onde a preservação máxima da estrutura dental é prioritária. As facetas de porcelana são recomendadas para: correções mais extensas de cor e formato, dentes com fraturas ou desgastes mais significativos, necessidade de alteração da dimensão vertical dos dentes, casos de fluorose severa ou manchas por tetraciclina, e situações que requerem mudanças mais dramáticas na forma dental. A análise inclui fatores como espessura do esmalte disponível, padrão oclusal, características periodontais e expectativas estéticas do paciente. Uma avaliação criteriosa com a Dra. Carla Christoph, considerando fotografias, modelos de estudo e análise facial, definirá a abordagem mais adequada para cada caso específico.",
      type: "default",
    },
    {
      id: "beneficios",
      title: "Benefícios Científicos e Estéticos: Além da Aparência",
      content: [
        "<strong>Biomimetismo Excepcional:</strong> As cerâmicas modernas possuem índice de refração similar ao esmalte dental (1,62), conferindo translucidez e fluorescência naturais que se integram perfeitamente à dentição.",
        "<strong>Durabilidade Comprovada:</strong> Estudos clínicos demonstram longevidade superior a 15 anos com taxa de sucesso acima de 95% quando realizadas com técnica adequada e materiais de excelência.",
        "<strong>Preservação Estrutural Máxima:</strong> As lentes de contato dental preservam até 95% da estrutura dental original, seguindo os princípios da odontologia minimamente invasiva.",
        "<strong>Biocompatibilidade Superior:</strong> Material inerte que não causa reações alérgicas, mantém a saúde gengival e facilita a higienização pela lisura superficial.",
        "<strong>Estabilidade de Cor:</strong> Resistência total a pigmentação por alimentos, bebidas ou tabaco, mantendo a cor original por décadas.",
        "<strong>Melhora Funcional:</strong> Dentes com formato adequado otimizam a mastigação, facilitam a fonética e reduzem o acúmulo de placa bacteriana.",
        "<strong>Impacto Psicológico Positivo:</strong> Estudos demonstram melhora significativa na autoestima, confiança social e oportunidades profissionais.",
        "<strong>Planejamento Digital Avançado:</strong> Tecnologia DSD permite previsibilidade total dos resultados, aumentando a satisfação do paciente."
      ],
      type: "benefits",
    },
    {
      id: "como-e-feito",
      title: "Protocolo Técnico: Seu Tratamento Passo a Passo",
      content: [
        {
          title: "Diagnóstico e Planejamento Integrado",
          description: "Consulta inicial com análise facial completa, avaliação da harmonia entre dentes, lábios e face. Exames complementares incluem fotografias padronizadas, radiografias, modelos de estudo e análise oclusal. Consideramos aspectos como linha do sorriso, proporção áurea, fonética e características periodontais."
        },
        {
          title: "Design Digital do Sorriso (DSD)",
          description: "Utilização de tecnologia de ponta para simulação digital dos resultados. O DSD permite visualizar o resultado final, fazer ajustes conforme suas preferências e garantir aprovação antes de qualquer intervenção irreversível. Esta ferramenta aumenta significativamente a previsibilidade e satisfação do tratamento."
        },
        {
          title: "Preparo Dental Conservador",
          description: "Para lentes de contato: desgaste mínimo (0,1-0,3mm) ou inexistente, preservando totalmente a estrutura dental. Para facetas: preparo conservador limitado ao esmalte (0,5-0,8mm). Utilizamos guias de redução para garantir uniformidade e preservação máxima da estrutura."
        },
        {
          title: "Moldagem de Precisão ou Escaneamento Digital",
          description: "Moldagem com materiais de alta precisão ou escaneamento intraoral digital para captura exata da geometria dental. A precisão desta etapa é fundamental para o encaixe perfeito e longevidade das peças."
        },
        {
          title: "Confecção Laboratorial Artística",
          description: "As lentes são confeccionadas em laboratório especializado utilizando cerâmicas de última geração. Cada peça é individualizada considerando cor, translucidez, textura superficial e características anatômicas específicas do paciente."
        },
        {
          title: "Prova e Cimentação Definitiva",
          description: "Prova das peças com aprovação estética e funcional. Cimentação com adesivos de alta performance após tratamento de superfície específico, garantindo união química duradoura. Ajustes oclusais finais e polimento para integração funcional perfeita."
        }
      ],
      type: "steps",
    },
    {
      id: "seguranca-cuidados",
      title: "Segurança e Protocolos: Prevenção de Complicações",
      content: "A segurança nos procedimentos com lentes de contato dental baseia-se em protocolos rigorosos desenvolvidos ao longo de mais de 20 anos de experiência clínica. A seleção criteriosa dos casos é fundamental: pacientes com bruxismo severo não controlado, expectativas irreais ou saúde periodontal comprometida não são candidatos ideais. O protocolo de cimentação segue normas internacionais, incluindo isolamento absoluto, tratamento de superfície padronizado e controle rigoroso da umidade. O acompanhamento pós-operatório inclui avaliações em 48 horas, 1 semana, 1 mês e semestralmente. Possíveis intercorrências como sensibilidade transitória (menos de 5% dos casos) ou pequenos ajustes oclusais são rapidamente resolvidas. A experiência militar da Dra. Carla Christoph na Odontoclínica Central da Marinha consolidou uma visão preventiva e protocolos de segurança que garantem resultados previsíveis e duradouros.",
      type: "default",
    },
    {
      id: "casos-especiais",
      title: "Casos Especiais: Lentes de Contato Dental em Situações Complexas",
      content: "Algumas situações requerem expertise técnica avançada e planejamento multidisciplinar. Em pacientes com dentes desgastados, danificados ou com restaurações antigas, as lentes podem ser integradas a um planejamento que inclui <a href=\"/tratamentos/restauracoes-esteticas\"><strong>restaurações dentárias estéticas</strong></a> para uma reabilitação completa, considerando proporções dentárias, suporte labial e harmonia geral. Para casos de bruxismo controlado - condição cada vez mais comum devido ao <a href=\"/blog/saude-bucal-bruxismo-e-estresse\"><strong>estresse e seus impactos na saúde bucal</strong></a> - utilizamos cerâmicas de maior resistência à flexão e planejamento oclusal específico, sempre com proteção noturna obrigatória. Em situações de dentes muito pequenos (microdoncia) ou com desgastes significativos, adaptamos a técnica de preparo e utilizamos sistemas adesivos específicos para garantir retenção adequada. Pacientes que necessitam reabilitação ampla podem se beneficiar da combinação entre lentes de contato dental e <a href=\"/tratamentos/implantes-dentarios\"><strong>implantes dentários</strong></a>, criando uma integração estética perfeita entre dentes naturais e implantados. A experiência de mais de 20 anos permite o manejo seguro dessas situações complexas, sempre priorizando resultados naturais, funcionais e duradouros.",
      type: "default",
    },
    {
      id: "fatores-individuais",
      title: "Personalização Total: Fatores Individuais na Escolha do Tratamento",
      content: "Cada sorriso é único, e a personalização é fundamental para resultados excepcionais. A análise individual considera fatores biológicos como idade, sexo, características étnicas e perfil facial. Aspectos funcionais incluem padrão mastigatório, hábitos parafuncionais, histórico de sensibilidade e expectativas de longevidade. Fatores estéticos envolvem preferências pessoais de cor, formato, textura e grau de naturalidade desejado. Em alguns casos, pode ser necessário combinar lentes com <a href=\"/tratamentos/restauracoes-esteticas\"><strong>restaurações estéticas em outros dentes</strong></a> para garantir harmonia total do sorriso. A personalidade do paciente também influencia: pessoas mais conservadoras tendem a preferir mudanças sutis, enquanto outras desejam transformações mais dramáticas. Consideramos ainda aspectos profissionais - profissionais da mídia podem ter necessidades diferentes de executivos ou professores. A idade influencia as escolhas: jovens podem priorizar formato e alinhamento, enquanto adultos maduros podem focar no rejuvenescimento. Esta análise multifatorial garante que cada tratamento seja verdadeiramente individualizado, resultando em sorrisos autenticamente pessoais que se integram naturalmente à personalidade e estilo de vida de cada paciente.",
      type: "default",
    },
    {
      id: "cuidados",
      title: "Manutenção e Longevidade: Cuidados para Resultados Duradouros",
      content: "A longevidade das lentes de contato dental e facetas de porcelana depende fundamentalmente dos cuidados pós-tratamento e manutenção adequada. A higienização deve ser rigorosa mas cuidadosa: escovação com cerdas macias, uso obrigatório de fio dental e enxaguante bucal sem álcool. Visitas regulares a cada 6 meses à Dra. Carla Christoph em Ipanema são essenciais para acompanhamento, profilaxia profissional e detecção precoce de qualquer alteração. Hábitos alimentares devem ser moderados: evitar morder objetos duros, abrir embalagens com os dentes ou roer unhas. Para pacientes com bruxismo, o uso de placa miorrelaxante noturna é obrigatório para proteger as peças e a dentição natural. O <a href=\"/tratamentos/clareamento-dental\"><strong>clareamento dental supervisionado</strong></a> pode ser realizado previamente ao tratamento para otimizar a cor de base. Com cuidados adequados, as lentes e facetas podem manter sua beleza e funcionalidade por 15-20 anos ou mais, representando um investimento duradouro na sua saúde e autoestima.",
      type: "default",
    }
  ];

  // Define FAQs
  const faqs: FAQ[] = [
    {
      question: "Qual a diferença técnica entre lentes de contato dental e facetas de porcelana?",
      answer: "As diferenças principais estão na espessura e invasividade. Lentes de contato dental possuem 0,2mm a 0,5mm de espessura, requerendo desgaste mínimo (0,1-0,3mm) ou inexistente da estrutura dental. Facetas de porcelana têm 0,7mm a 1,2mm, necessitando preparo de 0,5-0,8mm. As lentes são ideais para correções sutis preservando máximo de estrutura dental, enquanto facetas permitem correções mais significativas. A Dra. Carla Christoph avaliará qual técnica oferece melhor resultado para seu caso específico."
    },
    {
      question: "Qual a durabilidade real das lentes de contato dental com base em estudos?",
      answer: "Estudos clínicos longitudinais demonstram longevidade superior a 15 anos com taxa de sucesso acima de 95% quando realizadas com técnica adequada e materiais de excelência. Fatores que influenciam a durabilidade incluem: qualidade da cimentação, cuidados de higiene, hábitos parafuncionais e acompanhamento profissional regular. Com os protocolos da Dra. Carla Christoph e manutenção adequada, podem durar 20 anos ou mais."
    },
    {
      question: "As lentes de contato dental realmente não desgastam os dentes?",
      answer: "As lentes de contato dental preservam até 95% da estrutura dental original. O desgaste necessário é mínimo (0,1-0,3mm) e limitado ao esmalte superficial, ou em muitos casos inexistente. Esta abordagem segue os princípios da odontologia minimamente invasiva, contrastando com procedimentos mais antigos que requeriam desgastes significativos. A Dra. Carla utiliza guias de redução para garantir precisão e preservação máxima."
    },
    {
      question: "Como funciona tecnicamente o Design Digital do Sorriso (DSD)?",
      answer: "O DSD utiliza fotografias e vídeos padronizados do paciente para criar um projeto digital tridimensional do novo sorriso. Software especializado analisa proporções faciais, linha do sorriso, características labiais e permite simulação de diferentes opções de formato, tamanho e cor dos dentes. Esta tecnologia oferece previsibilidade de 95% dos resultados, permitindo ajustes antes do tratamento e garantindo maior satisfação do paciente."
    },
    {
      question: "Quais cuidados específicos são necessários após o tratamento?",
      answer: "Cuidados essenciais incluem: higiene rigorosa com escova de cerdas macias e fio dental, visitas semestrais para manutenção, evitar morder objetos duros ou usar dentes como ferramenta, uso de placa noturna se houver bruxismo. Alimentos muito duros devem ser consumidos com cuidado. Enxaguantes com álcool devem ser evitados. Com estes cuidados, a durabilidade é maximizada significativamente."
    },
    {
      question: "Lentes de resina versus porcelana: qual a diferença na durabilidade e estética?",
      answer: "Diferenças significativas em longevidade e estética: Porcelana oferece 15-20 anos de durabilidade versus 3-5 anos da resina. Esteticamente, a porcelana possui translucidez natural, resistência total a manchas e características ópticas similares ao esmalte. Resina pode amarelar com o tempo e manchar com café, vinho e tabaco. Apesar do investimento inicial maior, a porcelana oferece melhor custo-benefício a longo prazo e resultados estéticos superiores."
    },
    {
      question: "É possível fazer lentes em apenas alguns dentes mantendo harmonia?",
      answer: "Sim, mas requer planejamento cuidadoso para manter harmonia estética. Para resultados ideais, recomenda-se tratar pelo menos os 4-6 dentes anteriores superiores em conjunto. Tratamentos isolados podem criar discrepâncias de cor e formato. A Dra. Carla utiliza análise facial detalhada e simulação digital para determinar quantos dentes devem ser incluídos para garantir naturalidade e harmonia do conjunto."
    },
    {
      question: "Quais as contraindicações para lentes de contato dental?",
      answer: "Contraindicações incluem: bruxismo severo não controlado, má oclusão severa não tratada, falta de esmalte dental suficiente, expectativas irreais, higiene bucal deficiente persistente, doença periodontal ativa não tratada, e pacientes muito jovens com dentição ainda em desenvolvimento. Uma avaliação detalhada com a Dra. Carla Christoph determinará se você é candidato ideal para o tratamento."
    }
  ];

  return (
    <TreatmentPageTemplate
      slug="lentes-e-facetas"
      title="Lentes de Contato Dental e Facetas de Porcelana em Ipanema"
      metaDescription="Lentes de contato dental em Ipanema com Dra. Carla Christoph. Ultrafinas (0,2-0,5mm), desgaste mínimo, resultados naturais. Mais de 20 anos de experiência. Facetas de porcelana para transformação completa do sorriso."
      introduction="Descubra a arte de um sorriso naturalmente deslumbrante com as lentes de contato dental e facetas de porcelana oferecidas pela Dra. Carla Christoph em nossa clínica em Ipanema. Essas ultrafinas lâminas de cerâmica de última geração representam o que há de mais moderno em preservação da estrutura dentária, permitindo transformações estéticas significativas com mínimo ou nenhum desgaste do dente natural. Com mais de 20 anos de experiência e formação como especialista em Prótese Dental e Implantodontia, a odontologia estética moderna da Dra. Carla combina ciência, arte e tecnologia para criar sorrisos que parecem ter nascido assim, priorizando sempre a individualidade e as características únicas de cada paciente."
      sections={sections}
      faqs={faqs}
      whatsappMessage="Olá, gostaria de agendar uma avaliação para lentes de contato dental"
      ctaHeading="Transforme seu Sorriso com Lentes de Contato Dental em Ipanema!"
    />
  );
};

export default LentesEFacetas;