import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import { FAQ } from "@/components/treatment/types";

const ClinicaGeralPrevencao = () => {
  // Define the FAQs
  const faqs: FAQ[] = [
    {
      question: "Qual a base científica para consultas preventivas semestrais?",
      answer: "A frequência semestral baseia-se em evidências científicas sobre o ciclo de formação do biofilme bacteriano e desenvolvimento de lesões cariosas. Estudos demonstram que lesões incipientes podem ser revertidas em 3-6 meses com intervenção adequada, enquanto a formação de tártaro significativo ocorre entre 90-180 dias. A retração gengival, que afeta 58% da população adulta, progride gradualmente e pode ser detectada precocemente neste intervalo. Para pacientes de alto risco (doença periodontal, diabetes, xerostomia), intervalos de 3-4 meses são mais apropriados."
    },
    {
      question: "Como o ultrassom odontológico revoluciona a limpeza preventiva?",
      answer: "O ultrassom odontológico opera em frequências de 25.000-30.000 Hz, criando micromovimentos que fragmentam biofilme e cálculo dentário sem causar danos aos tecidos saudáveis. Comparado aos métodos tradicionais, oferece maior conforto (os pacientes relatam sensação de 'cócegas' suaves), eficiência superior (procedimentos 30-40% mais rápidos), e melhor acesso a áreas de difícil alcance. A irrigação simultânea remove bactérias e mantém a área resfriada, proporcionando limpeza mais completa."
    },
    {
      question: "Por que 90% dos casos de mau hálito têm origem bucal?",
      answer: "A cavidade bucal oferece condições ideais para bactérias anaeróbicas produtoras de compostos sulfurados voláteis - principais responsáveis pelo odor desagradável. A saburra lingual (camada esbranquiçada na língua), cáries, doenças gengivais, xerostomia e acúmulo de biofilme criam ambientes propícios para essas bactérias. Apenas 10% dos casos têm origem extra-bucal (problemas renais, hepáticos, diabetes descompensado). Por isso, a prevenção odontológica é fundamental para controlar a halitose."
    },
    {
      question: "Como prevenir a retração gengival que afeta 58% dos adultos?",
      answer: "A retração gengival resulta principalmente de escovação agressiva, doenças periodontais, fatores genéticos e bruxismo. A prevenção inclui: técnica de escovação suave com escovas de cerdas macias, movimentos circulares delicados, uso correto do fio dental, tratamento de doenças gengivais, controle do bruxismo com placas de proteção, e consultas regulares para monitoramento. Pessoas com gengiva naturalmente fina têm maior predisposição e necessitam cuidados especiais."
    },
    {
      question: "Qual o processo científico da formação de cáries e como prevenir?",
      answer: "A cárie é uma doença multifatorial envolvendo quatro fatores: bactérias específicas (principalmente Streptococcus mutans), açúcares fermentáveis, dente susceptível e tempo. As bactérias metabolizam açúcares produzindo ácidos que desmineralizam o esmalte. A prevenção baseia-se em: higiene adequada para remoção do biofilme, uso de flúor para remineralização, controle da dieta açucarada, estimulação da produção de saliva, e diagnóstico precoce através de check-ups regulares."
    },
    {
      question: "Como a tecnologia digital revoluciona o diagnóstico preventivo?",
      answer: "O check-up digital utiliza câmeras intraorais com magnificação de 50-100x, permitindo detecção de alterações invisíveis ao exame convencional. Inclui análise de fluorescência para cáries incipientes, transiluminação para trincas, documentação fotográfica padronizada para acompanhamento longitudinal, e sistemas de análise computadorizada. Esta tecnologia aumenta a precisão diagnóstica em 40-60% comparada ao exame visual tradicional, permitindo intervenção em estágios reversíveis."
    },
    {
      question: "Qual a relação entre xerostomia e problemas bucais múltiplos?",
      answer: "A xerostomia (boca seca) compromete as funções protetivas da saliva: neutralização de ácidos, remineralização do esmalte, controle bacteriano e limpeza natural. Sua redução aumenta significativamente o risco de cáries (especialmente na raiz), mau hálito (pela proliferação bacteriana), doenças gengivais e maior susceptibilidade a infecções. Pode ser causada por medicamentos, diabetes, síndrome de Sjögren, radioterapia ou envelhecimento. O tratamento inclui hidratação adequada, substitutos salivares e acompanhamento intensificado."
    },
    {
      question: "Como a prevenção se integra com tratamentos estéticos posteriores?",
      answer: "A saúde periodontal ótima é pré-requisito para tratamentos estéticos, garantindo estabilidade gengival e ausência de inflamação que comprometeria resultados. O controle de biofilme adequado prolonga longevidade de restaurações estéticas em 30-50%. Protocolos preventivos específicos incluem aplicação de flúor pós-clareamento para reduzir sensibilidade, técnicas especiais de higiene para pacientes com lentes de contato dental ou facetas, e monitoramento de retração gengival que pode comprometer a estética."
    },
    {
      question: "Qual o impacto econômico da prevenção versus tratamentos curativos?",
      answer: "Estudos econômicos demonstram que cada real investido em prevenção economiza 8-50 reais em tratamentos curativos. Uma consulta preventiva custa tipicamente 10-15% de um tratamento endodôntico, 5% de um implante dental, 3% de um enxerto gengival, e 2-3% de uma reabilitação protética extensa. Considerando longevidade da dentição natural, qualidade de vida e ausência de dor, o retorno do investimento preventivo é extraordinário a longo prazo."
    },
    {
      question: "Como personalizar protocolos preventivos conforme fatores de risco?",
      answer: "A personalização baseia-se em análise multifatorial: índice de risco de cáries (CAMBRA), condição periodontal, análise salivar (fluxo, pH, capacidade tampão), hábitos alimentares, medicações xerostômicas, presença de restaurações, fatores sistêmicos e genéticos. Pacientes de baixo risco podem ter intervalos de 6-8 meses, enquanto alto risco necessita 3-4 meses com protocolos intensificados de flúor, antimicrobianos, orientação específica sobre higiene e controle de fatores causais como bruxismo."
    }
  ];

  return (
    <TreatmentPageTemplate
      slug="clinica-geral-e-prevencao"
      title="Clínica Geral e Prevenção Odontológica em Ipanema"
      metaDescription="Prevenção odontológica científica em Ipanema com Dra. Carla Christoph. Ultrassom 25.000-30.000 Hz, check-up digital com magnificação 50-100x, protocolos baseados em evidências. Prevenção de cáries, retração gengival (58% dos adultos) e mau hálito (90% origem bucal)."
      introduction="A base para um sorriso saudável e duradouro começa com a prevenção científica e os cuidados de rotina baseados em evidências consolidadas. Na clínica da Dra. Carla Christoph em Ipanema, oferecemos um acompanhamento completo em clínica geral, focado em manter sua saúde bucal através de protocolos avançados que podem prevenir até 90% dos problemas bucais. Com mais de 20 anos de experiência clínica e especialização em Prótese Dental e Implantodontia, nossa [abordagem integral da saúde bucal](/blog/odontologia-estetica-sorriso-natural) combina prevenção baseada em evidências científicas, tecnologia de ponta e diagnóstico precoce de condições como [cáries em estágios reversíveis](/blog/saude-bucal-carie-dental-prevencao), problemas gengivais e [halitose de origem bucal](/blog/saude-bucal-mau-halito), oferecendo cuidados personalizados que podem reduzir em até 90% a necessidade de tratamentos complexos futuros."
      sections={[
        {
          id: "ciencia-prevencao",
          title: "A Ciência da Prevenção Odontológica: Fundamentos e Evidências",
          content: "A Clínica Geral Odontológica moderna baseia-se em sólidos fundamentos científicos que comprovam a eficácia da prevenção na manutenção da saúde bucal integral. Estudos longitudinais demonstram que protocolos preventivos adequados podem reduzir a incidência de cáries em 20-40%, de doença periodontal em até 60%, e controlar efetivamente 90% dos casos de mau hálito que têm origem bucal. A prevenção de retração gengival - condição que afeta 58% da população adulta mundial - é especialmente importante, pois uma vez instalada, frequentemente requer intervenções cirúrgicas complexas. A abordagem preventiva atual utiliza conceitos de análise de risco individual, baseando-se em fatores como capacidade salivar, microbiota bucal, hábitos alimentares, condições sistêmicas e predisposição genética. O modelo CAMBRA (Caries Management by Risk Assessment) permite estratificação precisa dos pacientes, personalizando intervalos de consulta e protocolos terapêuticos. Na nossa clínica em Ipanema, a Dra. Carla Christoph implementa esses conceitos científicos através de tecnologia avançada, incluindo análise salivar quando indicada, teste de atividade de cáries, monitoramento digital longitudinal e protocolos específicos para cada tipo de risco. Esta abordagem baseada em evidências transforma a prevenção de uma prática empírica em ciência aplicada, oferecendo resultados mensuráveis e previsíveis.",
          type: "default"
        },
        {
          id: "tecnologia-ultrassom",
          title: "Ultrassom Odontológico: Revolução na Prevenção e Limpeza Profissional",
          content: "O [ultrassom odontológico representa uma revolução](/blog/saude-bucal-ultrassom-odontologico) na odontologia preventiva, utilizando vibrações ultrassônicas de 25.000 a 30.000 Hz para realizar limpezas mais eficazes, confortáveis e precisas. Esta tecnologia funciona através de micromovimentos que conseguem quebrar e fragmentar depósitos de biofilme dental e cálculo dentário sem causar danos aos tecidos saudáveis dos dentes e gengivas. **Vantagens Técnicas Comprovadas:** Maior conforto para o paciente (sensação de vibração suave vs pressão dos instrumentos manuais), otimização do tempo de atendimento (redução de 30-40% no tempo de procedimento), melhor assepsia com remoção superior de bactérias em áreas de difícil acesso, e irrigação simultânea que mantém a área limpa e resfriada. **Aplicações Específicas:** Remoção eficaz de biofilme que causa cáries e mau hálito, tratamento de doenças gengivais com acesso a bolsas periodontais profundas, alisamento radicular para prevenção de recolonização bacteriana, e limpeza delicada que não traumatiza a gengiva (prevenindo retração). A experiência dos pacientes é significativamente superior: muitos relatam que procedimentos que anteriormente evitavam devido ao desconforto se tornam toleráveis e até relaxantes com o ultrassom. Esta tecnologia é especialmente benéfica para pacientes com sensibilidade dental, ansiedade odontológica, ou grande quantidade de tártaro acumulado.",
          type: "default"
        },
        {
          id: "prevencao-integrada",
          title: "Prevenção Integrada: Cáries, Doenças Gengivais, Mau Hálito e Retração",
          content: [
            "**Prevenção de Cáries Baseada em Evidências:** A cárie é uma doença multifatorial envolvendo bactérias específicas (principalmente Streptococcus mutans), açúcares fermentáveis, dentes susceptíveis e tempo. Protocolos incluem controle de biofilme, fluoretação adequada, modificação da dieta cariogênica, estímulo da produção salivar e monitoramento de lesões incipientes através de métodos de fluorescência.",
            "**Controle do Mau Hálito de Origem Bucal:** Como 90% dos casos de halitose têm origem na cavidade bucal, focamos na remoção da saburra lingual, tratamento de cáries ocultas, controle de doenças gengivais, e manejo da xerostomia. Protocolos específicos incluem limpeza adequada da língua, uso de antimicrobianos quando indicado, e controle dos fatores que favorecem bactérias anaeróbicas produtoras de compostos sulfurados.",
            "**Prevenção de Retração Gengival:** Condição que afeta 58% da população adulta, requer educação sobre técnica correta de escovação (movimentos circulares suaves, escovas de cerdas macias), uso adequado do fio dental, tratamento precoce de doenças periodontais, controle do bruxismo, e monitoramento de pacientes com predisposição genética.",
            "**Manejo de Xerostomia:** A boca seca aumenta drasticamente o risco de cáries, mau hálito e doenças gengivais. Protocolos incluem identificação de medicamentos xerostômicos, hidratação adequada, uso de substitutos salivares, estímulo mecânico da produção salivar, e acompanhamento intensificado com aplicações frequentes de flúor.",
            "**Detecção Precoce com Tecnologia Digital:** Check-up com câmeras intraorais de alta definição, magnificação óptica de 50-100x, transiluminação para detecção de trincas, análise de fluorescência para lesões incipientes, e documentação fotográfica padronizada para acompanhamento longitudinal das condições bucais."
          ],
          type: "benefits"
        },
        {
          id: "diagnostico-precoce-avancado",
          title: "Diagnóstico Precoce Avançado: Identificando Problemas Antes dos Sintomas",
          content: "O diagnóstico precoce representa a essência da odontologia preventiva moderna, utilizando tecnologias e protocolos científicos que identificam alterações em estágios reversíveis ou facilmente tratáveis. **Detecção de Lesões Cariosas Incipientes:** Métodos de fluorescência quantitativa (DIAGNOdent) identificam alterações metabólicas bacterianas antes da cavitação visível, permitindo remineralização através de protocolos específicos com flúor, cálcio e fosfato. Estas lesões podem ser completamente revertidas sem necessidade de restaurações. **Identificação de Problemas Gengivais Precoces:** Análise do fluido crevicular, sondagem periodontal computadorizada, e detecção de sangramento marginal identificam alterações inflamatórias antes da perda de inserção ou retração gengital visível. **Diagnóstico de Retração Gengival Incipiente:** A [retração gengival em estágios iniciais](/blog/saude-bucal-retracao-gengival) é detectada através de análise comparativa fotográfica, medições precisas da margem gengival, e avaliação de fatores de risco como trauma de escovação e doenças periodontais. **Análise de Fatores Causais do Mau Hálito:** Investigação sistemática incluindo análise da saburra lingual, teste de fluxo salivar, identificação de cáries ocultas, avaliação de doenças gengivais, e correlação com fatores sistêmicos quando indicado. **Detecção de Dentes Trincados:** A [identificação precoce de trincas invisíveis](/blog/saude-bucal-dente-trincado) através de transiluminação, teste de mordida específico, e análise de sintomatologia permite tratamento conservador antes da evolução para fraturas que comprometeriam a preservação dental. Esta abordagem diagnóstica transforma o conceito de 'aguardar sintomas aparecerem' em 'prevenir problemas antes que se desenvolvam'.",
          type: "default"
        },
        {
          id: "protocolos-personalizados",
          title: "Protocolos Preventivos Personalizados: Ciência Aplicada à Individualidade",
          content: "A personalização dos protocolos preventivos baseia-se em análise científica multifatorial que considera características biológicas, comportamentais e sistêmicas de cada paciente. **Estratificação de Risco de Cáries:** Aplicação do modelo CAMBRA considerando capacidade salivar (fluxo, pH, capacidade tampão), microbiota cariogênica, frequência de exposição a açúcares, presença de restaurações, uso de medicamentos xerostômicos, e histórico familiar. Pacientes de alto risco recebem protocolos intensificados com flúor de alta concentração, antimicrobianos específicos, e consultas trimestrais. **Avaliação de Risco Periodontal:** Utilização de índices padronizados (PSR/BPE), análise de fatores genéticos, avaliação de hábitos como tabagismo, controle de diabetes, e identificação de fatores traumáticos como [bruxismo](/blog/saude-bucal-bruxismo-e-estresse). **Protocolo para Prevenção de Retração Gengival:** Análise da técnica de higiene bucal, avaliação da espessura gengival (pacientes com gengiva fina têm maior predisposição), controle de doenças periodontais, manejo do bruxismo, e orientação específica sobre produtos adequados (escovas de cerdas ultramacias quando indicado). **Manejo Personalizado da Halitose:** Investigação das causas específicas (90% têm origem bucal), protocolos de limpeza lingual adequados, controle de xerostomia, tratamento de doenças gengivais associadas, e modificação de fatores comportamentais. **Integração com Condições Sistêmicas:** Diabéticos recebem protocolos específicos para controle glicêmico e prevenção de complicações periodontais, gestantes têm acompanhamento adaptado às alterações hormonais, e pacientes com medicações xerostômicas recebem cuidados intensificados para xerostomia.",
          type: "default"
        },
        {
          id: "casos-especiais-complexos",
          title: "Casos Especiais: Prevenção em Situações Complexas e Multifatoriais",
          content: "Determinadas condições clínicas e sistêmicas requerem protocolos preventivos específicos e cuidados intensificados para manutenção da saúde bucal. **Prevenção em Diabéticos:** Pacientes diabéticos apresentam risco 2-3 vezes maior de desenvolver doença periodontal, sendo essencial controle glicêmico rigoroso, consultas preventivas trimestrais, monitoramento intensificado de inflamação gengival, protocolo específico de higiene bucal, e coordenação com o endocrinologista para controle metabólico. A doença periodontal pode desestabilizar o controle glicêmico, criando um ciclo vicioso que deve ser quebrado através de prevenção eficaz. **Manejo Preventivo na Gravidez:** As alterações hormonais da gestação aumentam significativamente o risco de gengivite gravídica e exacerbação de problemas periodontais existentes. Protocolos específicos incluem consultas durante cada trimestre, orientação sobre técnicas adaptadas de higiene (considerando náuseas e sensibilidade), controle rigoroso de placa bacteriana, e tratamento precoce de alterações gengivais. **Prevenção em Pacientes com Medicações Xerostômicas:** Mais de 400 medicamentos podem causar xerostomia, incluindo antidepressivos, anti-hipertensivos, diuréticos e antihistamínicos. Protocolos incluem identificação de medicamentos causais, coordenação com médicos para possível substituição, uso de substitutos salivares, estímulo mecânico da produção salivar, aplicações frequentes de flúor, e acompanhamento intensificado devido ao alto risco de cáries radiculares. **Prevenção em Pacientes com Ansiedade Odontológica:** A ansiedade pode levar ao adiamento de cuidados preventivos, criando ciclo de deterioração. Protocolos incluem técnicas de manejo da ansiedade, sedação consciente quando necessário, consultas mais frequentes e menos invasivas, educação específica sobre a importância da prevenção, e criação de ambiente acolhedor que reduz o estresse. **Protocolos para Idosos:** O envelhecimento traz desafios específicos como xerostomia medicamentosa, retração gengival fisiológica, dificuldades motoras para higiene, maior risco de cáries radiculares, e necessidade de coordenação com múltiplas especialidades médicas. Protocolos adaptados incluem técnicas facilitadas de higiene, acompanhamento geriátrico integrado, e prevenção específica de complicações age-related.",
          type: "default"
        },
        {
          id: "integracao-saude-sistemica",
          title: "Integração entre Saúde Bucal e Sistêmica: Prevenção Holística",
          content: "A odontologia moderna reconhece as complexas interrelações entre saúde bucal e sistêmica, estabelecendo protocolos preventivos que considerem o paciente como um todo integrado. **Prevenção de Doenças Cardiovasculares:** Evidências científicas comprovam associação entre doença periodontal e risco cardiovascular aumentado. Bactérias bucais como Porphyromonas gingivalis podem induzir aterosclerose e estados pró-trombóticos. Protocolos preventivos incluem controle rigoroso de placa bacteriana, tratamento precoce de gengivites, coordenação com cardiologistas para pacientes de alto risco, e educação sobre a importância da saúde bucal na prevenção cardiovascular. **Prevenção em Pacientes com Artrite Reumatoide:** A associação bidireccional entre doença periodontal e artrite reumatoide está bem estabelecida. Protocolos incluem consultas preventivas mais frequentes, controle inflamatório rigoroso, coordenação com reumatologistas, adaptação de técnicas de higiene para limitações motoras, e uso de antimicrobianos específicos quando indicado. **Manejo Preventivo em Câncer:** Pacientes oncológicos, especialmente aqueles em radioterapia ou quimioterapia, apresentam riscos específicos como mucosite, xerostomia severa, e infecções oportunistas. Protocolos incluem avaliação odontológica pré-tratamento oncológico, eliminação de focos infecciosos, protocolos específicos de higiene durante tratamento, uso de substitutos salivares e flúor de alta concentração, e acompanhamento multidisciplinar. **Prevenção Respiratória:** Aspiração de bactérias bucais pode causar pneumonia, especialmente em idosos e pacientes debilitados. Protocolos incluem higiene bucal intensificada em pacientes hospitalizados, controle de biofilme em próteses dentárias, e educação sobre técnicas específicas de higiene para reduzir carga bacteriana. **Integração com Medicina do Trabalho:** Protocolos preventivos específicos para profissões de risco incluem trabalhadores expostos a ácidos (indústrias químicas), açúcares (confeitarias), ou situações de estresse extremo que podem levar ao bruxismo. A prevenção é adaptada aos riscos ocupacionais específicos de cada paciente.",
          type: "default"
        },
        {
          id: "protocolo-consulta-preventiva",
          title: "Protocolo de Consulta Preventiva Avançada: Excelência Científica Aplicada",
          content: [
            "**Anamnese Detalhada e Estratificação de Risco:** Avaliação completa incluindo histórico médico e odontológico, medicações em uso, hábitos alimentares e de higiene, fatores de risco sistêmicos (diabetes, doenças cardiovasculares, artrite reumatoide), histórico familiar de problemas bucais, e análise de ansiedade odontológica.",
            "**Exame Clínico Sistematizado:** Inspeção extraoral e intraoral completa, avaliação de tecidos moles, exame periodontal com sondagem quando indicado, teste de vitalidade dental em casos suspeitos, avaliação oclusal e detecção de sinais de bruxismo, e documentação fotográfica padronizada para acompanhamento longitudinal.",
            "**Diagnóstico por Imagem Personalizado:** Radiografias interproximais para detecção de cáries incipientes, panorâmica quando indicada para avaliação geral, e tecnologias avançadas como DIAGNOdent para lesões iniciais ou transiluminação para trincas, conforme necessidade individual.",
            "**Profilaxia Avançada com Ultrassom:** Remoção completa de biofilme e cálculo através de ultrassom 25.000-30.000 Hz, irrigação com soluções antimicrobianas quando indicado, polimento seletivo preservando estrutura dental, e aplicação de flúor adequada ao risco individual (gel, verniz ou flúor de alta concentração).",
            "**Educação Personalizada e Técnicas de Higiene:** Demonstração de técnica correta de escovação adaptada à anatomia individual, orientação sobre uso adequado do fio dental e escovas interdentais, recomendação de produtos específicos (cremes dentais, enxaguatórios, escovas), e educação sobre fatores de risco modificáveis.",
            "**Planejamento Preventivo Individualizado:** Definição de intervalos de retorno baseados em análise de risco individual, protocolo domiciliar personalizado, identificação de necessidades de especialistas (periodontista, endodontista), integração com cuidados médicos quando necessário, e estabelecimento de metas mensuráveis para próxima consulta.",
            "**Monitoramento e Acompanhamento:** Registro digital de todos os parâmetros clínicos para acompanhamento longitudinal, fotografias comparativas para documentação de mudanças, análise de tendências individuais (melhora, estabilidade, piora), e ajustes de protocolo baseados em resposta individual ao tratamento preventivo."
          ],
          type: "steps"
        }
      ]}
      faqs={faqs}
      whatsappMessage="Olá! Gostaria de agendar uma consulta de prevenção odontológica e saber mais sobre os protocolos científicos de clínica geral."
      ctaHeading="Agende Sua Consulta de Prevenção Científica"
    />
  );
};

export default ClinicaGeralPrevencao;