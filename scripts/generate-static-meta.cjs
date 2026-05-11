/**
 * Static Pre-rendering Script (Sprint 5 — AI Search Optimization)
 *
 * Generates static HTML pages with:
 * 1. Correct meta tags (title, description, OG, Twitter, canonical)
 * 2. JSON-LD schemas (MedicalProcedure, FAQPage, Dentist) in <head>
 * 3. Semantic fallback content in <div id="root"> for AI bots/crawlers
 *
 * AI bots (ChatGPT, Perplexity, Claude, Google) cannot execute JavaScript,
 * so they see an empty <div id="root"></div> in a React SPA. This script
 * injects real content that crawlers can read, while React replaces it
 * when JS loads for real users.
 *
 * NOTE: FAQ data here mirrors the React components. If FAQs change in
 * the .tsx files, update this script too.
 *
 * Usage: node scripts/generate-static-meta.cjs (runs after vite build)
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// SHARED CONSTANTS
// ============================================================

const BASE_URL = 'https://dracarlachristoph.com';
const OG_IMAGE = BASE_URL + '/lovable-uploads/doutora-em-pe-jaleco.webp';

const PROVIDER = {
  '@type': 'Dentist',
  'name': 'Dra. Carla Christoph',
  'telephone': '+5521993304045',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Rua Visconde de Pirajá, 550 - Sala 1107',
    'addressLocality': 'Ipanema',
    'addressRegion': 'RJ',
    'postalCode': '22410-901',
    'addressCountry': 'BR'
  }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateMedicalProcedureSchema(data, routePath) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    'name': data.procedure.name,
    'description': data.procedure.description,
    'procedureType': 'Dental',
    'url': BASE_URL + routePath,
    'provider': data.provider || PROVIDER
  };
  return JSON.stringify(schema);
}

function generateFAQPageSchema(faqs) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  };
  return JSON.stringify(schema);
}

function generateDentistSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    'name': 'Dra. Carla Christoph',
    'description': 'Dentista especialista em Prótese Dental e Reabilitação Oral em Ipanema, Rio de Janeiro. Mais de 20 anos de experiência.',
    'telephone': '+5521993304045',
    'url': BASE_URL,
    'image': BASE_URL + '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
    'priceRange': '$$$',
    'address': PROVIDER.address,
    'openingHoursSpecification': [
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 'opens': '09:00', 'closes': '19:00' }
    ],
    'hasCredential': { '@type': 'EducationalOccupationalCredential', 'credentialCategory': 'CRO-RJ', 'recognizedBy': { '@type': 'Organization', 'name': 'CRO-RJ' }, 'identifier': '27.509' },
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '5.0', 'reviewCount': '16', 'bestRating': '5' },
    'availableLanguage': ['pt-BR', 'en']
  });
}

function generateFallbackHTML(data, routePath) {
  const faqsHtml = (data.faqs || []).slice(0, 6).map(f =>
    `<dt>${escapeHtml(f.q)}</dt><dd>${escapeHtml(f.a)}</dd>`
  ).join('\n          ');

  return `<header style="padding:16px 0;border-bottom:1px solid #eee">
      <nav>
        <a href="/" style="font-weight:bold;color:#553c6b;text-decoration:none">Dra. Carla Christoph</a> |
        <a href="/servicos">Tratamentos</a> |
        <a href="/sobre">Sobre</a> |
        <a href="/blog">Blog</a> |
        <a href="/contato">Contato</a>
      </nav>
    </header>
    <main style="max-width:800px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#333">
      <nav aria-label="breadcrumb"><a href="/">Inicio</a> &gt; <a href="/servicos">Tratamentos</a> &gt; ${escapeHtml(data.h1)}</nav>
      <h1>${escapeHtml(data.h1)}</h1>
      <p>${escapeHtml(data.quickAnswer || data.description)}</p>
      ${data.faqs && data.faqs.length > 0 ? `<section>
        <h2>Perguntas Frequentes</h2>
        <dl>
          ${faqsHtml}
        </dl>
      </section>` : ''}
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:0.9em">
      <p><strong>Dra. Carla Christoph</strong> — CRO-RJ 27.509</p>
      <p>Rua Visconde de Piraj&aacute;, 550 - Sala 1107, Ipanema, Rio de Janeiro</p>
      <p>Tel: (21) 99330-4045 | Seg-Sex 9h-19h, S&aacute;b 9h-14h</p>
      <p><a href="https://wa.me/5521993304045">Agendar pelo WhatsApp</a></p>
    </footer>`;
}

function generateInfoFallbackHTML(data) {
  return `<header style="padding:16px 0;border-bottom:1px solid #eee">
      <nav>
        <a href="/" style="font-weight:bold;color:#553c6b;text-decoration:none">Dra. Carla Christoph</a> |
        <a href="/servicos">Tratamentos</a> |
        <a href="/sobre">Sobre</a> |
        <a href="/blog">Blog</a> |
        <a href="/contato">Contato</a>
      </nav>
    </header>
    <main style="max-width:800px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#333">
      <h1>${escapeHtml(data.h1 || data.title)}</h1>
      <p>${escapeHtml(data.summary || data.description)}</p>
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:0.9em">
      <p><strong>Dra. Carla Christoph</strong> — CRO-RJ 27.509</p>
      <p>Rua Visconde de Piraj&aacute;, 550 - Sala 1107, Ipanema, Rio de Janeiro</p>
      <p>Tel: (21) 99330-4045 | <a href="https://wa.me/5521993304045">WhatsApp</a></p>
    </footer>`;
}

// ============================================================
// SERVICE PAGES — Full content + schemas + fallback
// ============================================================

const servicePages = {
  '/implantes-dentarios': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência. CRO-RJ 27.509.',
    h1: 'Implantes Dentários e Reabilitação Oral',
    quickAnswer: 'Implantes dentários são raízes artificiais de titânio biocompatível instaladas no osso para substituir dentes perdidos. Na clínica da Dra. Carla Christoph em Ipanema, realizamos planejamento digital 3D com scanner intraoral, técnicas minimamente invasivas e próteses personalizadas. Com mais de 20 anos de experiência (CRO-RJ 27.509), oferecemos desde implantes unitários até reabilitações completas como All-on-4 e protocolo fixo, com tratamentos que duram de 3 a 6 meses conforme o caso.',
    procedure: { name: 'Implante Dentário', description: 'Instalação de implantes de titânio biocompatível no osso maxilar para substituição de dentes perdidos, com planejamento digital 3D e técnicas minimamente invasivas' },
    faqs: [
      { q: 'O que são implantes dentários?', a: 'São pinos de titânio biocompatível instalados cirurgicamente no osso da mandíbula ou maxila, substituindo a raiz do dente perdido. Sobre estes pinos, fixamos coroas, pontes ou próteses completas, restaurando função mastigatória, estética e fonética.' },
      { q: 'O procedimento é doloroso?', a: 'A cirurgia é realizada sob anestesia local, sem dor durante o procedimento. O pós-operatório é geralmente tranquilo, com desconforto leve controlado por medicação. A maioria dos pacientes retorna às atividades normais em 2 a 3 dias.' },
      { q: 'Quanto tempo dura o tratamento completo?', a: 'O tempo varia conforme o caso. Em média, de 4 a 6 meses desde a instalação do implante até a prótese definitiva, incluindo o período de osseointegração (3 a 6 meses). Em casos com carga imediata selecionados, a prótese provisória é instalada conforme planejamento.' },
      { q: 'Qualquer pessoa pode colocar implantes?', a: 'A maioria dos adultos saudáveis é candidata. Avaliamos saúde geral, quantidade e qualidade óssea, hábitos (tabagismo) e condições sistêmicas (diabetes controlado). Em casos de osso insuficiente, enxertos ósseos podem viabilizar o tratamento.' },
      { q: 'Quanto tempo duram os implantes?', a: 'Com higiene adequada e manutenções regulares, implantes podem durar décadas ou a vida toda. Estudos mostram taxa de sucesso acima de 95% em 10 anos. A coroa protética pode precisar ser substituída após 10 a 15 anos dependendo do desgaste.' },
      { q: 'Como é a manutenção dos implantes?', a: 'Higienização rigorosa com escova, fio dental e escovas interdentais específicas. Retornos semestrais para controle profissional, radiografias periódicas e avaliação da saúde peri-implantar. Evitar sobrecarga excessiva e trauma.' },
      { q: 'Existe rejeição de implantes?', a: 'O titânio é biocompatível e não causa rejeição imunológica. Falhas ocorrem por infecção, sobrecarga precoce, tabagismo ou higiene inadequada, não por rejeição. Taxa de sucesso é superior a 95% quando protocolos são seguidos.' },
      { q: 'Posso fazer se tiver pouco osso?', a: 'Sim. Técnicas de enxerto ósseo (autógeno, biomaterial) ou levantamento de seio maxilar podem aumentar volume ósseo. Implantes curtos ou angulados também são alternativas. Os exames de imagem permitem planejar a melhor solução para cada caso.' },
      { q: 'Qual a diferença entre implante e prótese?', a: 'O implante é o pino de titânio fixado no osso (substitui a raiz). A prótese é a parte visível (coroa, ponte ou dentadura) que se conecta ao implante. O conjunto completo restaura função e estética.' },
      { q: 'Fumantes podem fazer implantes?', a: 'Sim, mas o tabagismo reduz a taxa de sucesso (de 95% para aproximadamente 85%) por prejudicar cicatrização e osseointegração. Recomendamos parar de fumar pelo menos 2 semanas antes da cirurgia e durante a cicatrização. Avaliação individual é essencial.' },
      { q: 'Diabéticos podem colocar implantes?', a: 'Sim, desde que o diabetes esteja controlado (hemoglobina glicada abaixo de 7%). Avaliação médica prévia é importante. O controle glicêmico adequado garante cicatrização normal e taxa de sucesso equivalente a não-diabéticos.' },
      { q: 'Vocês atendem convênios odontológicos?', a: 'Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada paciente e utilizar somente materiais de primeira linha. Na primeira consulta, apresentamos um orçamento detalhado e transparente.' }
    ]
  },

  '/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Técnicas seguras para um sorriso mais branco. CRO-RJ 27.509. Agende sua avaliação!',
    h1: 'Clareamento Dental Profissional',
    quickAnswer: 'Clareamento dental é um procedimento estético que clareia os dentes usando gel à base de peróxido. No consultório da Dra. Carla Christoph em Ipanema, oferecemos técnicas de consultório (1-3 sessões de 60-90 minutos) e caseiro supervisionado. Com mais de 20 anos de experiência (CRO-RJ 27.509), trabalhamos com protocolos personalizados que clareiam de 4 a 9 tons com segurança, preservando a saúde dos dentes e gengivas. O tratamento dura de 7 a 21 dias conforme a modalidade escolhida.',
    procedure: { name: 'Clareamento Dental Profissional', description: 'Procedimento estético para clareamento dos dentes com gel de peróxido em consultório ou com moldeiras caseiras supervisionadas' },
    faqs: [
      { q: 'Qual a diferença entre as modalidades?', a: 'O clareamento de consultório utiliza gel de maior concentração (35-37%), com resultados em 1-3 sessões. O caseiro usa concentração menor (10-20%), aplicada gradualmente em 14-21 dias com moldeiras personalizadas. O combinado inicia em consultório e mantém resultado com aplicações caseiras. A indicação depende da análise individual.' },
      { q: 'O clareamento causa sensibilidade?', a: 'Sensibilidade temporária pode ocorrer, mas protocolos modernos minimizam esse desconforto. Utilizamos dessensibilizantes, ajustamos concentrações conforme necessário e aplicamos laser terapêutico quando indicado. A maioria dos pacientes relata pouco ou nenhum desconforto.' },
      { q: 'Quanto tempo dura o resultado?', a: 'Com cuidados adequados, os resultados mantêm-se por 2-3 anos. A durabilidade varia conforme hábitos alimentares e higiene. Protocolo de manutenção com sessões anuais prolonga significativamente os resultados.' },
      { q: 'Posso fazer clareamento com restaurações?', a: 'Sim, mas apenas dentes naturais respondem ao clareamento. Restaurações e próteses mantêm sua cor original. Analisamos seu caso para determinar a melhor estratégia, considerando se há necessidade de substituição posterior das restaurações visíveis.' },
      { q: 'O clareamento é seguro para o esmalte?', a: 'Quando realizado com protocolos adequados, não causa danos ao esmalte. Os géis modernos têm pH balanceado e não provocam desmineralização. Utilizamos produtos com agentes remineralizantes que preservam a integridade dental.' },
      { q: 'Quais cuidados após o clareamento?', a: 'Nas primeiras 48 horas, evitar alimentos e bebidas pigmentados. Manter higiene oral adequada com escovação após refeições. Uso de canudos para bebidas escuras. Consultas semestrais para manutenção profissional.' },
      { q: 'Clareamento funciona em todos os tipos de manchas?', a: 'A eficácia varia conforme o tipo de mancha. Manchas por alimentos e idade respondem muito bem. Manchas por medicamentos têm resposta variável. Na avaliação, analisamos seu caso específico e estabelecemos expectativas realistas.' },
      { q: 'Clareamento e limpeza são diferentes?', a: 'Sim. A limpeza remove tártaro e manchas superficiais, devolvendo a cor natural. O clareamento altera quimicamente a cor interna do dente, clareando além da cor natural. Frequentemente realizamos limpeza antes do clareamento para otimizar resultados.' },
      { q: 'Produtos de farmácia têm o mesmo efeito?', a: 'Produtos sem prescrição contêm concentrações muito baixas devido a regulamentação, oferecendo resultados limitados. O clareamento profissional usa concentrações terapêuticas sob supervisão, garantindo eficácia superior e segurança.' },
      { q: 'Como é feita a escolha da modalidade?', a: 'Na consulta de avaliação, analiso suas características individuais, tipo de mancha, sensibilidade prévia, rotina e expectativas. A indicação considera todos esses fatores para definir o protocolo mais adequado ao seu caso.' }
    ]
  },

  '/lentes-de-contato-dental-e-facetas-de-resina': {
    title: 'Lentes de Contato Dental e Facetas de Resina em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas de resina em Ipanema com Dra. Carla Christoph. Test Drive do Sorriso exclusivo. 20+ anos de experiência. CRO-RJ 27.509.',
    h1: 'Lentes de Contato Dental e Facetas — Test Drive do Sorriso',
    quickAnswer: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) aplicadas sobre os dentes com preparo mínimo, ideais para mudanças estéticas duradouras. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório. No consultório da Dra. Carla Christoph em Ipanema, oferecemos Test Drive do Sorriso (mock-up) para você visualizar o resultado antes. Lentes duram 15-20 anos e não mancham; facetas duram 5-8 anos. O tratamento leva de 2-3 consultas (15-20 dias) para lentes e 1-2 consultas para facetas.',
    procedure: { name: 'Lentes de Contato Dental e Facetas', description: 'Aplicação de lâminas ultrafinas de porcelana ou facetas de resina para correção estética dental com preparo mínimo e Test Drive do Sorriso' },
    faqs: [
      { q: 'Qual a diferença entre lente de contato dental e faceta de resina?', a: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que exigem preparo mínimo do dente, ideais para mudanças estéticas duradouras com máxima naturalidade. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório, com custo mais acessível. Lentes duram 15-20 anos e não mancham, enquanto facetas de resina duram 5-8 anos e podem necessitar polimento periódico.' },
      { q: 'É necessário desgastar muito os meus dentes?', a: 'Não. A filosofia do consultório é a máxima preservação da estrutura dentária. Para lentes, o preparo é mínimo (0,1-0,3mm quando necessário), limitado ao esmalte superficial. Para facetas de resina, o preparo também é conservador.' },
      { q: 'Quanto tempo dura o tratamento completo?', a: 'Lentes de contato dental: 2-3 consultas em 15-20 dias. Primeira consulta para planejamento e moldagem digital, segunda para aprovação do Test Drive do Sorriso, terceira para cimentação. Facetas de resina: 1-2 consultas, pois são confeccionadas diretamente no consultório.' },
      { q: 'O tratamento para melhorar a estética do sorriso dói?', a: 'Não. Todos os procedimentos estéticos são realizados com o máximo de conforto, utilizando anestesia local sempre que necessário. A cimentação das lentes é um processo delicado que não causa dor.' },
      { q: 'O que é o Test Drive do Sorriso (mock-up)?', a: 'É uma técnica onde criamos seu novo sorriso com resina provisória não adesiva diretamente na sua boca, sem desgastar os dentes. Você pode se olhar no espelho, tirar fotos, vídeos, falar, sorrir. Ajustamos juntos até ficar do seu jeito. Só depois de você aprovar 100% é que partimos para o tratamento definitivo.' },
      { q: 'As lentes podem parecer artificiais?', a: 'Quando bem executadas por uma especialista, absolutamente não. Usamos cerâmicas de última geração que mimetizam perfeitamente a beleza do dente natural. O segredo está na análise facial completa, estratificação de cor personalizada e proporções individualizadas.' },
      { q: 'Posso fazer lentes mesmo tendo os dentes tortos?', a: 'Sim, desde que o desalinhamento seja leve. Lentes podem corrigir pequenos desalinhamentos, giros e espaços. Porém, em casos de apinhamento severo ou problemas de mordida significativos, pode ser necessário ortodontia prévia.' },
      { q: 'Preciso fazer em todos os dentes?', a: 'Não necessariamente. Muitos casos envolvem apenas os dentes anteriores superiores (4 a 10 dentes). Na avaliação, analiso seu sorriso para determinar quantos dentes precisam ser incluídos para um resultado harmonioso.' },
      { q: 'Qual o investimento para lentes de contato dental e facetas em Ipanema?', a: 'O investimento varia conforme o número de dentes tratados, complexidade do caso e tipo de material escolhido. Lentes de contato dental requerem maior investimento devido ao material cerâmico importado e durabilidade superior (15-20 anos). Facetas de resina oferecem custo-benefício acessível com resultado imediato. Oferecemos planos de pagamento facilitados.' },
      { q: 'Lentes podem manchar com café, vinho ou cigarro?', a: 'A cerâmica utilizada nas lentes não mancha. Diferente das facetas de resina, o material cerâmico é impermeável e mantém o brilho e cor originais permanentemente. Apenas os dentes naturais adjacentes requerem atenção.' },
      { q: 'Como é a manutenção das lentes e facetas?', a: 'Lentes de cerâmica: higiene oral normal (escova, fio dental, enxaguante), evitar morder objetos duros, uso de placa miorrelaxante se necessário. Retornos semestrais. Facetas de resina: mesmos cuidados, mais polimento profissional a cada 6 meses.' },
      { q: 'Como funciona a consulta de planejamento?', a: 'É uma conversa aprofundada para entendermos seus desejos e expectativas. Realizamos escaneamento digital com iTero 3D e uma análise completa do seu sorriso e face. Juntos, definimos o melhor plano de tratamento, explicando os prós e contras de cada opção.' }
    ]
  },

  '/lentes-de-contato-dental-e-facetas-de-porcelana': {
    title: 'Lentes de Contato Dental e Facetas em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas de porcelana em Ipanema com Dra. Carla Christoph. Resultados naturais e duradouros. CRO-RJ 27.509.',
    h1: 'Lentes de Contato Dental e Facetas — Test Drive do Sorriso',
    quickAnswer: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) aplicadas sobre os dentes com preparo mínimo, ideais para mudanças estéticas duradouras. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório. No consultório da Dra. Carla Christoph em Ipanema, oferecemos Test Drive do Sorriso (mock-up) para você visualizar o resultado antes. Lentes duram 15-20 anos e não mancham; facetas duram 5-8 anos. O tratamento leva de 2-3 consultas (15-20 dias) para lentes e 1-2 consultas para facetas.',
    procedure: { name: 'Lentes de Contato Dental e Facetas de Porcelana', description: 'Aplicação de lâminas ultrafinas de porcelana para correção estética dental com preparo mínimo e resultado natural duradouro' },
    faqs: [
      { q: 'Qual a diferença entre lente de contato dental e faceta de resina?', a: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que exigem preparo mínimo do dente, ideais para mudanças estéticas duradouras com máxima naturalidade. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório, com custo mais acessível. Lentes duram 15-20 anos e não mancham, enquanto facetas de resina duram 5-8 anos e podem necessitar polimento periódico.' },
      { q: 'É necessário desgastar muito os meus dentes?', a: 'Não. A filosofia do consultório é a máxima preservação da estrutura dentária. Para lentes, o preparo é mínimo (0,1-0,3mm quando necessário), limitado ao esmalte superficial.' },
      { q: 'O que é o Test Drive do Sorriso (mock-up)?', a: 'É uma técnica onde criamos seu novo sorriso com resina provisória não adesiva diretamente na sua boca, sem desgastar os dentes. Você pode se olhar no espelho, tirar fotos, vídeos, falar, sorrir. Ajustamos juntos até ficar do seu jeito.' },
      { q: 'As lentes podem parecer artificiais?', a: 'Quando bem executadas por uma especialista, absolutamente não. Usamos cerâmicas de última geração que mimetizam perfeitamente a beleza do dente natural.' },
      { q: 'Quanto tempo dura o tratamento completo?', a: 'Lentes de contato dental: 2-3 consultas em 15-20 dias. Facetas de resina: 1-2 consultas, pois são confeccionadas diretamente no consultório.' },
      { q: 'Como é a manutenção das lentes e facetas?', a: 'Lentes de cerâmica: higiene oral normal, evitar morder objetos duros, retornos semestrais. Facetas de resina: mesmos cuidados mais polimento profissional a cada 6 meses.' }
    ]
  },

  '/protese-dentaria': {
    title: 'Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Prótese dentária fixa e removível em Ipanema. Especialista em reabilitação oral com mais de 20 anos de experiência. Dra. Carla Christoph. CRO-RJ 27.509.',
    h1: 'Prótese Dentária e Reabilitação Oral',
    quickAnswer: 'Prótese dentária é uma estrutura artificial que substitui dentes perdidos, restaurando função mastigatória e estética. Na clínica da Dra. Carla Christoph em Ipanema, oferecemos coroas, pontes e próteses sobre implante em porcelana de alta translucidez. Com mais de 20 anos de experiência (CRO-RJ 27.509) em reabilitação oral, trabalhamos com cerâmicas E-max e zircônia que duram de 15 a 20 anos. O tratamento varia conforme a complexidade, incluindo planejamento, moldagens digitais e próteses provisórias para você nunca ficar sem dentes.',
    procedure: { name: 'Prótese Dentária', description: 'Reabilitação oral com coroas, pontes e próteses sobre implante em porcelana de alta translucidez para substituição de dentes perdidos' },
    faqs: [
      { q: 'Qual tipo de prótese é melhor para meu caso?', a: 'Cada caso é único e requer avaliação individualizada. A escolha depende de fatores como quantidade de dentes perdidos, condição óssea, saúde gengival, expectativas estéticas e estilo de vida. Durante a consulta de planejamento, analisamos todos esses aspectos para indicar a solução ideal para você.' },
      { q: 'Quanto tempo dura uma prótese bem feita?', a: 'Com materiais de qualidade e cuidados adequados, uma coroa ou ponte pode durar de 15 a 20 anos. Próteses sobre implante tendem a durar ainda mais, podendo ultrapassar 20 anos. A longevidade depende da higiene oral, visitas regulares ao dentista e cuidados diários.' },
      { q: 'Prótese sobre implante vale o investimento?', a: 'Para muitos pacientes, sim. A prótese sobre implante oferece vantagens únicas: preservação óssea total, não desgasta dentes vizinhos, maior durabilidade e sensação natural. Considerando a longevidade e qualidade de vida proporcionada, representa custo-benefício a longo prazo.' },
      { q: 'Como é a manutenção das próteses?', a: 'Próteses fixas (coroas, pontes, sobre implante) são higienizadas como dentes naturais, com escovação e fio dental. Próteses removíveis devem ser retiradas para limpeza com produtos específicos. Visitas semestrais ao dentista são essenciais para manutenção profissional.' },
      { q: 'Vou ficar sem dentes durante o tratamento?', a: 'Nunca! Sempre providenciamos uma prótese provisória para que você mantenha estética e função durante todo o tratamento. Nosso compromisso é com seu conforto e vida social.' },
      { q: 'Prótese pode parecer natural?', a: 'Absolutamente! Utilizamos técnicas como estratificação de cerâmica, caracterização individualizada e ajuste de cor personalizado. O resultado são dentes que imitam perfeitamente a natureza, com translucidez, textura e aparência indistinguíveis dos dentes naturais.' },
      { q: 'Qual a diferença entre porcelana e resina?', a: 'A porcelana (cerâmica) oferece superior estética, durabilidade e resistência a manchas. É nossa escolha para casos de longa duração. A resina pode ser usada em provisórios ou situações específicas.' },
      { q: 'É possível fazer prótese com pouco osso?', a: 'Sim! Para próteses convencionais (não sobre implante), a quantidade óssea não é limitante. Para próteses sobre implante, técnicas como enxerto ósseo ou implantes zigomáticos podem viabilizar o tratamento mesmo com pouco osso.' },
      { q: 'Quando trocar uma prótese antiga?', a: 'Sinais de que é hora de trocar: desgaste visível, mudança de cor, infiltrações, desadaptação, desconforto ao mastigar ou problemas gengivais ao redor da prótese. Uma avaliação profissional pode determinar o momento ideal.' },
      { q: 'O procedimento é doloroso?', a: 'Os procedimentos são realizados com anestesia local eficaz e técnicas que priorizam o conforto. A maioria dos pacientes relata menos desconforto do que esperavam.' },
      { q: 'Qual a vantagem de um especialista?', a: 'O especialista tem formação específica de 2-3 anos em prótese, domina técnicas avançadas, trabalha com os melhores laboratórios e tem experiência em casos complexos. Isso se traduz em próteses com melhor adaptação, estética superior e maior durabilidade.' },
      { q: 'Prótese fixa ou removível: como escolher?', a: 'A prótese fixa oferece maior conforto, segurança e sensação natural, mas requer condições específicas. A removível é uma opção quando não há suporte para fixa. Avaliamos todos os fatores para indicar a melhor solução.' }
    ]
  },

  '/restauracoes-esteticas': {
    title: 'Restaurações Estéticas em Ipanema | Dra. Carla Christoph',
    description: 'Restauração dental estética em Ipanema com resina nanoparticulada. Tratamento de cáries, dentes quebrados e trincados. Resultado natural e duradouro. Dra. Carla Christoph CRO-RJ 27.509.',
    h1: 'Restaurações Estéticas em Ipanema',
    quickAnswer: 'Restaurações estéticas são tratamentos que recuperam dentes comprometidos por cáries, fraturas ou trincas usando resinas nanoparticuladas ou cerâmicas de última geração. Na clínica da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), utilizamos materiais de última geração com estratificação de cor que reproduzem perfeitamente a translucidez natural dos dentes. O tratamento é conservador, preservando ao máximo a estrutura dentária, e o resultado é indistinguível dos dentes naturais. Com 20+ anos de experiência, realizamos desde pequenas restaurações até reconstruções complexas em uma ou poucas sessões.',
    procedure: { name: 'Restauração Dental Estética', description: 'Restauração dental estética com resina nanoparticulada para tratamento de cáries, fraturas e trincas com resultado natural' },
    faqs: [
      { q: 'O que é uma restauração dental estética?', a: 'É um procedimento que reconstrói dentes comprometidos por cáries, fraturas ou trincas utilizando materiais de última geração (resina composta ou porcelana) que mimetizam perfeitamente a cor, brilho e textura dos dentes naturais. Diferente das antigas obturações escuras de amálgama, as restaurações estéticas são praticamente invisíveis.' },
      { q: 'Quando uma restauração é necessária?', a: 'Restaurações são indicadas em diversas situações: presença de cáries, fraturas dentais por trauma ou desgaste, trincas que causam sensibilidade, substituição de restaurações antigas escurecidas, correção de formato ou fechamento de pequenos espaços, e reconstrução após tratamento de canal.' },
      { q: 'Qual material é usado nas restaurações estéticas?', a: 'Utilizamos resinas compostas de última geração com nanotecnologia, que oferecem alta resistência, estética natural e durabilidade. Para casos que exigem máxima longevidade, indicamos porcelanas ou resinas laboratoriais (inlay/onlay).' },
      { q: 'Fazer restauração dói?', a: 'Não. Utilizamos anestesia local com técnica confortável. A maioria dos pacientes relata não sentir desconforto durante o procedimento. Após o término do efeito anestésico, pode haver sensibilidade leve por 24-48h, facilmente controlada com analgésicos comuns.' },
      { q: 'Quanto tempo dura uma restauração estética?', a: 'Restaurações diretas em resina duram de 5 a 8 anos em média. Restaurações indiretas (inlay/onlay de porcelana) duram 12 a 15 anos ou mais. Fatores que prolongam a vida útil: boa higiene oral, check-ups regulares e uso de placa para bruxismo quando indicado.' },
      { q: 'Posso trocar minhas restaurações antigas escuras?', a: 'Sim! A substituição de restaurações antigas de amálgama por restaurações estéticas em resina é um dos procedimentos mais procurados. Além do benefício estético, eliminamos o risco de microinfiltrações comuns em restaurações antigas.' },
      { q: 'Restauração em resina mancha com o tempo?', a: 'As resinas compostas modernas apresentam estabilidade de cor. Com cuidados adequados (boa higiene, polimentos periódicos e moderação no consumo de alimentos muito pigmentados como café, vinho tinto e açaí), as restaurações mantêm sua cor original por muitos anos.' },
      { q: 'Qual a diferença entre restauração e obturação?', a: 'Na prática odontológica moderna, os termos são sinônimos — ambos se referem ao preenchimento de uma cavidade dental. Obturação é um termo mais antigo, frequentemente associado às restaurações em amálgama. Restauração é o termo técnico correto e mais abrangente.' }
    ]
  },

  '/tratamento-de-canal': {
    title: 'Tratamento de Canal em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento de canal (endodontia) em Ipanema sem dor. Técnicas modernas e atendimento humanizado. Dra. Carla Christoph. CRO-RJ 27.509.',
    h1: 'Tratamento de Canal em Ipanema',
    quickAnswer: 'Tratamento de canal (endodontia) remove a polpa infectada do dente, aliviando a dor e salvando o dente da extração. No consultório da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), o tratamento é realizado com endodontista especializado e finalizado pela Dra. Carla. O procedimento é confortável com anestesia moderna, geralmente completado em 1-2 sessões. Após o canal, recomenda-se restauração adequada ou coroa para proteger o dente, que pode durar muitos anos com os cuidados corretos.',
    procedure: { name: 'Tratamento de Canal (Endodontia)', description: 'Tratamento endodôntico com acompanhamento completo e finalização restauradora' },
    faqs: [
      { q: 'Tratamento de canal dói?', a: 'Com a anestesia atual, o procedimento é confortável e bem tolerado. O que costuma causar dor é a infecção que levou à necessidade do canal. O tratamento justamente alivia essa dor. No pós-operatório, pode haver sensibilidade leve por alguns dias, controlada com medicação simples.' },
      { q: 'Quantas sessões são necessárias?', a: 'Na maioria dos casos, 1 a 2 sessões. Depende da complexidade do caso — dentes com mais canais ou infecções mais extensas podem precisar de sessões adicionais. O endodontista avalia e informa antes de iniciar.' },
      { q: 'O dente fica frágil depois do canal?', a: 'O dente perde a nutrição interna, o que pode torná-lo mais suscetível a fraturas ao longo do tempo. Por isso a restauração adequada é fundamental. Dependendo do caso, a Dra. Carla pode indicar uma coroa para proteger o dente de forma duradoura.' },
      { q: 'O dente escurece depois do canal?', a: 'Pode acontecer com o tempo, mas não é regra. Quando ocorre, existem opções para resolver — desde clareamento interno até faceta ou coroa. A Dra. Carla avalia a melhor solução durante o acompanhamento.' },
      { q: 'Qual a alternativa ao tratamento de canal?', a: 'A alternativa seria a extração do dente. Mas sempre que possível, preservar o dente natural é a melhor escolha — evita a necessidade de implante ou prótese e mantém a estrutura original da boca.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada caso e trabalhar com profissionais parceiros selecionados. Na consulta, apresentamos o planejamento completo.' }
    ]
  },

  '/saude-da-gengiva': {
    title: 'Tratamento de Gengiva em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento periodontal e saúde da gengiva em Ipanema. Prevenção e tratamento de gengivite e periodontite. Dra. Carla Christoph. CRO-RJ 27.509.',
    h1: 'Saúde da Gengiva em Ipanema',
    quickAnswer: 'Saúde da gengiva (periodontia) trata doenças gengivais como gengivite e periodontite, que causam sangramento, retração e mau hálito. No consultório da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), realizamos avaliação periodontal, limpeza profissional e tratamento das bolsas gengivais. Gengivite é reversível; periodontite é controlável com tratamento e manutenções periódicas. Para pacientes de baixo risco, recomenda-se limpeza a cada 6 meses; em casos de doença periodontal, a cada 3-4 meses para manter estabilidade.',
    procedure: { name: 'Tratamento Periodontal (Saúde da Gengiva)', description: 'Diagnóstico e tratamento de doenças gengivais com acompanhamento integrado ao plano de tratamento completo' },
    faqs: [
      { q: 'Gengiva que sangra ao escovar é normal?', a: 'Não. Sangramento gengival é sinal de inflamação, mesmo que não doa. Pode ser gengivite (reversível) ou periodontite (mais avançada). Vale procurar avaliação para identificar a causa e tratar antes que progrida.' },
      { q: 'Periodontite tem cura?', a: 'Periodontite é controlável, mas não é curável no sentido de desaparecer sozinha. Com tratamento adequado e manutenção periódica, é possível estabilizar a doença e evitar que progrida. A disciplina nas consultas de manutenção é fundamental.' },
      { q: 'Posso fazer lentes ou implantes se tenho problema gengival?', a: 'Primeiro é necessário tratar a gengiva. Lentes, facetas e implantes exigem uma base gengival saudável para funcionar bem e durar. A Dra. Carla integra o tratamento periodontal ao planejamento do caso — um passo de cada vez.' },
      { q: 'Retração gengival tem tratamento?', a: 'Depende da causa e da extensão. Em alguns casos, procedimentos de enxerto gengival podem cobrir a raiz exposta. Em outros, o objetivo é estabilizar a situação e evitar que progrida. A avaliação clínica define a melhor abordagem.' },
      { q: 'Com que frequência devo fazer limpeza no dentista?', a: 'Para a maioria das pessoas, a cada 6 meses. Pacientes com histórico de doença periodontal podem precisar de intervalos menores — a cada 3 ou 4 meses. A frequência ideal é definida individualmente.' },
      { q: 'Mau hálito pode ser problema gengival?', a: 'Sim. Mau hálito persistente (halitose) é frequentemente associado a doença periodontal — bactérias acumuladas em bolsas gengivais produzem compostos com odor. Se o mau hálito não melhora com higiene oral cuidadosa, vale investigar.' }
    ]
  },

  '/ortodontia': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema com Dr. Bruno Neves e Dra. Carla Christoph. Aparelhos fixos, estéticos e alinhadores invisíveis.',
    h1: 'Ortodontia Moderna em Ipanema',
    quickAnswer: 'Ortodontia é a especialidade que corrige a posição dos dentes e maxilares usando aparelhos fixos ou alinhadores invisíveis como Invisalign. No consultório da Dra. Carla Christoph, o tratamento é realizado pelo Dr. Bruno Moreira das Neves, ortodontista especialista com doutorado pela UERJ. A Dra. Carla acompanha toda a jornada do paciente, garantindo atendimento integrado. Utilizamos scanner iTero Element 5D para planejamento digital preciso e oferecemos Invisalign, aparelho estético e tradicional, com tratamentos durando de 6 a 24 meses conforme o caso.',
    procedure: { name: 'Tratamento Ortodôntico', description: 'Correção do posicionamento dos dentes e maxilares usando aparelhos ortodônticos ou alinhadores invisíveis' },
    provider: [
      { '@type': 'Dentist', 'name': 'Dra. Carla Christoph', 'identifier': 'CRO-RJ 27.509', 'description': 'Responsável pelo consultório e acompanhamento integral' },
      { '@type': 'Dentist', 'name': 'Dr. Bruno Moreira das Neves', 'identifier': 'CRO-RJ 41.684', 'description': 'Ortodontista especialista, Doutor pela UERJ' }
    ],
    faqs: [
      { q: 'Como funciona o tratamento ortodôntico no consultório da Dra. Carla?', a: 'O consultório da Dra. Carla Christoph oferece tratamento ortodôntico especializado através do Dr. Bruno Moreira das Neves, ortodontista com doutorado pela UERJ. A Dra. Carla acompanha toda a jornada do paciente, garantindo atendimento integrado e personalizado.' },
      { q: 'Quanto tempo dura o tratamento com Invisalign?', a: 'O tratamento com Invisalign geralmente dura entre 6 a 18 meses para casos simples a moderados, podendo estender-se até 24 meses em casos complexos. Com o scanner iTero Element 5D, conseguimos simular digitalmente o resultado e estimar com precisão o tempo necessário.' },
      { q: 'Qual a idade ideal para começar o tratamento ortodôntico?', a: 'A primeira avaliação ortodôntica é recomendada aos 7 anos para identificar problemas precocemente. Para aparelho fixo, a idade ideal é entre 11-14 anos. Adultos de qualquer idade podem fazer ortodontia — temos pacientes acima de 60 anos.' },
      { q: 'O tratamento ortodôntico dói?', a: 'É normal sentir pressão leve nos primeiros 2-3 dias após colocar um novo alinhador ou após ajustes do aparelho fixo. Essa sensação indica que os dentes estão se movendo conforme planejado. O desconforto é temporário e facilmente controlado.' },
      { q: 'Posso comer de tudo com aparelho ortodôntico?', a: 'Com Invisalign, você remove os alinhadores para comer, podendo desfrutar de qualquer alimento sem restrições. Com aparelho fixo, deve-se evitar alimentos duros e pegajosos e cortar alimentos em pedaços menores.' },
      { q: 'Como funciona o scanner iTero Element 5D?', a: 'O scanner iTero elimina a necessidade das desconfortáveis moldagens com massa. Em poucos minutos, criamos um modelo 3D ultra-preciso dos seus dentes. Você visualiza imediatamente uma simulação do resultado esperado.' },
      { q: 'Qual a diferença entre aparelho estético e tradicional?', a: 'O aparelho estético usa brackets de safira ou porcelana transparentes, sendo muito mais discreto que o tradicional metálico. Ambos têm a mesma eficácia, mas o estético oferece melhor aparência durante o tratamento.' },
      { q: 'O que é contenção e por que é importante?', a: 'A contenção é fundamental para manter os resultados após o tratamento. Oferecemos contenção fixa (fio colado atrás dos dentes) e/ou removível. O uso correto da contenção garante que seus dentes permaneçam alinhados permanentemente.' },
      { q: 'O Invisalign funciona para casos complexos?', a: 'Sim! O Invisalign evoluiu muito e hoje trata desde casos simples até complexos, incluindo mordidas cruzadas, sobremordidas, apinhamento severo e espaçamentos.' },
      { q: 'Como é o acompanhamento durante o tratamento?', a: 'Realizamos consultas regulares (mensais para aparelho fixo, a cada 6-8 semanas para Invisalign) para monitorar progresso e fazer ajustes necessários. A Dra. Carla e o Dr. Bruno trabalham em conjunto.' },
      { q: 'Qual o investimento para o tratamento ortodôntico?', a: 'O investimento varia conforme o tipo de aparelho e complexidade do caso. Oferecemos planos de pagamento facilitados e condições especiais. Fazemos orçamento personalizado durante a consulta de avaliação.' },
      { q: 'Posso trocar de aparelho fixo para Invisalign durante o tratamento?', a: 'Sim, é possível fazer a transição. O Dr. Bruno avaliará seu caso, fará novo planejamento digital e determinará o melhor momento para a mudança.' }
    ]
  },

  '/clinica-geral-e-prevencao': {
    title: 'Clínica Geral e Prevenção em Ipanema | Dra. Carla Christoph',
    description: 'Clínica geral odontológica e prevenção em Ipanema. Check-up dental, limpeza profissional e cuidados preventivos. Dra. Carla Christoph.',
    h1: 'Clínica Geral e Prevenção Odontológica',
    quickAnswer: 'Clínica geral e prevenção odontológica oferece check-up completo para manter a saúde bucal e evitar problemas futuros. Na clínica da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), o check-up inclui exame clínico detalhado, limpeza profissional com ultrassom, scanner digital 3D e avaliação de risco personalizada. Com 20+ anos de experiência, criamos protocolos preventivos individualizados. Recomenda-se consultas a cada 6-8 meses para baixo risco e 3-4 meses para alto risco. Prevenir é sempre mais econômico e confortável do que tratar problemas avançados.',
    procedure: { name: 'Consulta de Prevenção e Check-up Dental', description: 'Check-up odontológico completo com limpeza profissional, scanner digital 3D e protocolo preventivo individualizado' },
    faqs: [
      { q: 'O que está incluído no check-up preventivo?', a: 'O check-up completo inclui exame clínico detalhado, limpeza profissional (profilaxia), avaliação de risco de cáries e doenças gengivais, orientação personalizada de higiene e, quando necessário, solicitação de radiografias.' },
      { q: 'Com que frequência devo fazer consultas preventivas?', a: 'A frequência varia conforme seu perfil de risco. Pacientes de baixo risco podem vir a cada 6-8 meses, enquanto quem tem maior predisposição a cáries ou problemas gengivais deve retornar a cada 3-4 meses.' },
      { q: 'A limpeza profissional dói?', a: 'A limpeza com ultrassom é muito confortável. A maioria dos pacientes relata apenas uma leve sensação de vibração. Em casos de muita sensibilidade, podemos usar anestesia tópica para garantir seu conforto total.' },
      { q: 'Por que prevenir é mais econômico que tratar?', a: 'Uma consulta preventiva custa uma fração do valor de tratamentos como canal, implantes ou enxertos gengivais. Além disso, você evita dor, desconforto e tempo longe do trabalho.' },
      { q: 'Scanner digital 3D substitui as moldagens tradicionais?', a: 'Sim! O scanner captura imagens digitais precisas da sua boca em poucos minutos, sem aquele desconforto das moldeiras com massa. É mais rápido, mais preciso e muito mais confortável.' },
      { q: 'Como vocês identificam cáries no estágio inicial?', a: 'Além do exame clínico, usamos câmeras de alta definição com magnificação e, quando necessário, radiografias digitais. Conseguimos identificar lesões de cárie ainda reversíveis, que podem ser tratadas apenas com aplicação de flúor.' },
      { q: 'O que fazer para prevenir mau hálito?', a: 'Primeiro identificamos a causa — que em 90% dos casos está na boca (língua, gengiva ou dentes). Depois criamos um protocolo específico que pode incluir limpeza profissional, tratamento gengival e orientação sobre limpeza da língua.' },
      { q: 'Aplicação de flúor é só para crianças?', a: 'Não! Adultos com alto risco de cáries, sensibilidade dental, boca seca ou exposição de raízes também se beneficiam muito da aplicação profissional de flúor.' },
      { q: 'Qual a diferença entre limpeza em casa e profissional?', a: 'A escovação e fio dental diários removem a placa bacteriana fresca. Mas o tártaro (placa mineralizada) só pode ser removido com instrumentos profissionais. Além disso, conseguimos limpar áreas que você não alcança em casa.' },
      { q: 'Quando devo procurar prevenção e não tratamento?', a: 'Sempre que não houver dor ou problema ativo! Se faz mais de 6 meses desde sua última consulta, se percebe sangramento gengival, mau hálito ou sensibilidade, é hora de uma avaliação preventiva.' }
    ]
  }
};

// ============================================================
// INFO PAGES — Meta + light fallback (no procedure schemas)
// ============================================================

const infoPages = {
  '/sobre': {
    title: 'Sobre Dra. Carla Christoph | Dentista Especialista em Ipanema',
    description: 'Conheça a Dra. Carla Christoph, dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética.',
    h1: 'Dra. Carla Christoph — Dentista Especialista em Ipanema',
    summary: 'Dra. Carla Christoph é dentista especialista em Prótese Dental e Reabilitação Oral em Ipanema, Rio de Janeiro. Com mais de 20 anos de experiência (CRO-RJ 27.509), oferece tratamentos como implantes dentários, lentes de contato dental, próteses, clareamento e restaurações estéticas. Consultório na Rua Visconde de Pirajá, 550 - Sala 1107, Ipanema. Atendimento de segunda a sexta das 9h às 19h e sábado das 9h às 14h.'
  },
  '/servicos': {
    title: 'Tratamentos Odontológicos em Ipanema | Dra. Carla Christoph',
    description: 'Conheça todos os tratamentos odontológicos oferecidos pela Dra. Carla Christoph em Ipanema: implantes, clareamento, lentes de contato dental, próteses e mais.',
    h1: 'Tratamentos Odontológicos em Ipanema',
    summary: 'A Dra. Carla Christoph oferece tratamentos completos em Ipanema: implantes dentários, lentes de contato dental e facetas, prótese dentária, clareamento dental, restaurações estéticas, tratamento de canal, saúde da gengiva, clínica geral e prevenção, e ortodontia com Dr. Bruno Neves. Mais de 20 anos de experiência, CRO-RJ 27.509.'
  },
  '/blog': {
    title: 'Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema',
    description: 'Blog de odontologia da Dra. Carla Christoph. Dicas de saúde bucal, artigos informativos e novidades sobre tratamentos dentários.',
    h1: 'Blog — Dicas de Saúde Bucal',
    summary: 'Artigos informativos sobre saúde bucal, tratamentos odontológicos e dicas de prevenção pela Dra. Carla Christoph, dentista especialista em Ipanema, Rio de Janeiro.'
  },
  '/contato': {
    title: 'Contato | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Entre em contato com a Dra. Carla Christoph. Consultório em Ipanema, Rio de Janeiro. Agende sua consulta pelo WhatsApp.',
    h1: 'Contato — Agende sua Consulta',
    summary: 'Consultório da Dra. Carla Christoph: Rua Visconde de Pirajá, 550 - Sala 1107, Ipanema, Rio de Janeiro. Telefone: (21) 99330-4045. Horário: segunda a sexta das 9h às 19h, sábado das 9h às 14h. Agende pelo WhatsApp.'
  },
  '/diferenciais': {
    title: 'Diferenciais | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Conheça os diferenciais da Dra. Carla Christoph: mais de 20 anos de experiência, atendimento individualizado e scanner digital 3D em Ipanema.',
    h1: 'Diferenciais da Dra. Carla Christoph',
    summary: 'Os diferenciais da Dra. Carla Christoph incluem mais de 20 anos de experiência como especialista em Prótese Dental (CRO-RJ 27.509), scanner digital iTero 3D, planejamento personalizado, consultório em Ipanema com ambiente acolhedor, e acompanhamento completo de cada paciente.'
  }
};

// ============================================================
// ENGLISH MICRO-SITE — Meta + fallback (English content)
// ============================================================

const englishPages = {
  '/en': {
    title: 'Dentist in Ipanema, Rio de Janeiro | Dra. Carla Christoph',
    description: 'Cosmetic and restorative dentistry in Ipanema, Rio de Janeiro. Dental implants, porcelain veneers, teeth whitening. Personalized 1-hour appointments. CRO-RJ 27.509.',
    h1: 'Dentist in Ipanema — Dra. Carla Christoph',
    summary: 'Dra. Carla Christoph is a dental specialist in Ipanema, Rio de Janeiro, offering cosmetic and restorative dentistry including dental implants, porcelain veneers, teeth whitening, and general dental care. Office at Rua Visconde de Pirajá, 550 - Suite 1107, Ipanema. Monday to Friday 9 AM to 7 PM. CRO-RJ 27.509.'
  },
  '/en/about': {
    title: 'About Dra. Carla Christoph | Dentist in Ipanema, Rio de Janeiro',
    description: 'Meet Dra. Carla Christoph: dental prosthetics and implantology specialist in Ipanema with 20+ years of experience. CRO-RJ 27.509.',
    h1: 'About Dra. Carla Christoph',
    summary: 'Dra. Carla Christoph is a dental specialist in Prosthetic Dentistry and Oral Rehabilitation based in Ipanema, Rio de Janeiro. With over 20 years of experience (CRO-RJ 27.509), she provides personalized care with a minimum of 1 hour per appointment.'
  },
  '/en/contact': {
    title: 'Contact | Dra. Carla Christoph - Dentist in Ipanema',
    description: 'Contact Dra. Carla Christoph in Ipanema. Book via WhatsApp or visit our office at Rua Visconde de Pirajá, 550 - Suite 1107.',
    h1: 'Contact Dra. Carla Christoph',
    summary: 'Office: Rua Visconde de Pirajá, 550 - Suite 1107, Ipanema, Rio de Janeiro. Phone: +55 21 99330-4045. Hours: Monday-Friday 9 AM-7 PM (GMT-3). WhatsApp available 24/7.'
  },
  '/en/dental-implants': {
    title: 'Dental Implants in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Dental implant placement with 3D digital planning in Ipanema. Biocompatible titanium implants, minimally invasive techniques. Dra. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Dental Implants in Ipanema',
    summary: 'Dental implant treatment in Ipanema, Rio de Janeiro by Dra. Carla Christoph. Biocompatible titanium implants with 3D digital planning, minimally invasive techniques, and personalized care. Single teeth, multiple teeth, and full-mouth rehabilitation available.'
  },
  '/en/porcelain-veneers': {
    title: 'Porcelain Veneers in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Porcelain veneers and dental laminates in Ipanema. Smile Test Drive preview, minimal preparation, natural results. Dra. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Porcelain Veneers in Ipanema',
    summary: 'Porcelain veneer treatment in Ipanema, Rio de Janeiro by Dra. Carla Christoph. Ultra-thin ceramic laminates for a natural, beautiful smile. Exclusive Smile Test Drive preview system. Minimal tooth preparation with lasting results.'
  },
  '/en/general-dentistry': {
    title: 'General Dentistry in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Comprehensive dental checkups, cleanings, and preventive care in Ipanema. 3D digital scanner, personalized treatment plans. Dra. Carla Christoph.',
    h1: 'General Dentistry & Prevention in Ipanema',
    summary: 'General dentistry and preventive care in Ipanema, Rio de Janeiro. Dental checkups, professional cleanings, teeth whitening, and personalized prevention protocols. 3D digital scanner for accurate diagnosis.'
  },
  '/en/dental-emergency': {
    title: 'Dental Emergency in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Dental emergency in Ipanema? Toothache, broken tooth, lost filling — contact us via WhatsApp for same-day urgent dental care. Dra. Carla Christoph.',
    h1: 'Dental Emergency in Ipanema',
    summary: 'Urgent dental care in Ipanema, Rio de Janeiro. Same-day appointments for toothache, broken teeth, lost crowns, dental abscesses. Contact via WhatsApp for immediate assistance. Monday-Friday 9 AM-7 PM.'
  },
  '/en/dental-prosthetics': {
    title: 'Dental Prosthetics in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Fixed and removable dental prosthetics in Ipanema. Crowns, bridges, All-on-4 implant-supported dentures. 20+ years of expertise. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Dental Prosthetics & Oral Rehabilitation in Ipanema',
    summary: 'Dental prosthetics and oral rehabilitation in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Crowns, bridges, implant-supported prosthetics, removable dentures, All-on-4 and All-on-6 protocols. E-max and zirconia ceramics with 15-20 year durability. 20+ years of experience, CRO-RJ 27.509.'
  },
  '/en/teeth-whitening': {
    title: 'Teeth Whitening in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Professional teeth whitening in Ipanema. In-office, at-home, and combined protocols. Safe, effective results up to 9 shades whiter. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Professional Teeth Whitening in Ipanema',
    summary: 'Professional teeth whitening in Ipanema, Rio de Janeiro by Dr. Carla Christoph. In-office whitening (1-3 sessions), at-home with custom trays, and combined protocols. Results up to 9 shades whiter with pH-balanced gels. Safe, effective, and long-lasting. CRO-RJ 27.509.'
  },
  '/en/veneers-and-lenses': {
    title: 'Veneers & Contact Lenses in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Porcelain veneers, contact lenses, and composite bonding in Ipanema. Smile Test Drive preview with iTero scanner. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Veneers & Contact Lenses — Smile Test Drive',
    summary: 'Porcelain veneers, dental contact lenses, and composite bonding in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Ultra-thin ceramic laminates (0.2-0.5mm) with minimal preparation. Exclusive Smile Test Drive digital preview with iTero 5D scanner. 15-20 year durability. CRO-RJ 27.509.'
  },
  '/en/orthodontics': {
    title: 'Orthodontics in Ipanema | Dr. Bruno Neves & Dr. Carla Christoph, Rio de Janeiro',
    description: 'Invisalign, ceramic braces, and traditional orthodontics in Ipanema. iTero 5D digital scanner for precise treatment planning. Dr. Bruno Neves & Dr. Carla Christoph.',
    h1: 'Modern Orthodontics in Ipanema',
    summary: 'Orthodontic treatment in Ipanema, Rio de Janeiro. Invisalign clear aligners, ceramic braces, and traditional braces with Dr. Bruno Moreira das Neves (orthodontist, PhD UERJ) and Dr. Carla Christoph. iTero Element 5D digital scanner for precise planning. 6-24 month treatment duration.'
  },
  '/en/root-canal': {
    title: 'Root Canal Treatment in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Pain-free root canal treatment in Ipanema with modern techniques. Save your natural tooth with expert endodontic care. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Root Canal Treatment in Ipanema',
    summary: 'Root canal treatment (endodontics) in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Modern pain-free techniques with specialist endodontist. Save your natural tooth from extraction. Completed in 1-2 sessions. CRO-RJ 27.509.'
  },
  '/en/gum-health': {
    title: 'Gum Health & Periodontics in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Periodontal treatment and gum health in Ipanema. Prevention and treatment of gingivitis and periodontitis. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Gum Health & Periodontal Treatment in Ipanema',
    summary: 'Periodontal treatment and gum health in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Diagnosis and treatment of gingivitis and periodontitis. Professional cleanings every 3-6 months. Integrated care with implant and prosthetic planning. CRO-RJ 27.509.'
  },
  '/en/aesthetic-restorations': {
    title: 'Aesthetic Dental Restorations in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Aesthetic dental restorations in Ipanema. Tooth-colored fillings, composite bonding, inlays and onlays. Natural results. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Aesthetic Dental Restorations in Ipanema',
    summary: 'Aesthetic dental restorations in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Tooth-colored composite fillings with nano-particle technology, ceramic inlays/onlays, and amalgam replacement. Natural-looking results indistinguishable from natural teeth. 20+ years of experience, CRO-RJ 27.509.'
  }
};

// ============================================================
// LANDING PAGES — Meta only + noindex (no fallback/schemas)
// ============================================================

const landingPages = {
  '/lp/limpeza-dental-ipanema': {
    title: 'Limpeza Dental em Ipanema | Dra. Carla Christoph',
    description: 'Agende sua limpeza dental em Ipanema com a Dra. Carla Christoph. Atendimento individualizado e scanner digital 3D.',
  },
  '/lp/profilaxia-dental-ipanema': {
    title: 'Profilaxia Dental em Ipanema | Dra. Carla Christoph',
    description: 'Profilaxia dental profissional em Ipanema. Prevenção e cuidado com sua saúde bucal. Dra. Carla Christoph.',
  },
  '/lp/estetica-dental-ipanema': {
    title: 'Estética Dental em Ipanema | Dra. Carla Christoph',
    description: 'Tratamentos de estética dental em Ipanema. Conquiste o sorriso que você merece com a Dra. Carla Christoph.',
  },
  '/lp/saude-gengival-ipanema': {
    title: 'Saúde Gengival em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento gengival especializado em Ipanema. Cuide da saúde da sua gengiva. Dra. Carla Christoph.',
  },
  '/lp/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema. Sorriso mais branco com segurança. Dra. Carla Christoph.',
  },
  '/lp/consulta-inicial': {
    title: 'Consulta Inicial | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Agende sua primeira consulta com a Dra. Carla Christoph em Ipanema. Avaliação completa e plano de tratamento personalizado.',
  },
  '/lp/ortodontia-ipanema': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema. Aparelhos fixos, estéticos e alinhadores. Dr. Bruno Neves e Dra. Carla Christoph.',
  },
  '/lp/dor-de-dente-urgencia-ipanema': {
    title: 'Dor de Dente Urgência em Ipanema | Dra. Carla Christoph',
    description: 'Atendimento de urgência para dor de dente em Ipanema. Alívio rápido com a Dra. Carla Christoph.',
  },
  '/lp/dente-quebrado-urgencia-ipanema': {
    title: 'Dente Quebrado Urgência em Ipanema | Dra. Carla Christoph',
    description: 'Quebrou um dente? Atendimento de urgência em Ipanema com a Dra. Carla Christoph.',
  },
  '/lp/emergencia-odontologica-ipanema': {
    title: 'Emergência Odontológica em Ipanema | Dra. Carla Christoph',
    description: 'Emergência odontológica em Ipanema. Atendimento rápido e humanizado. Dra. Carla Christoph.',
  },
  '/lp/especialista-protese-ipanema': {
    title: 'Especialista em Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Especialista em prótese dentária em Ipanema. Mais de 20 anos de experiência em reabilitação oral. Dra. Carla Christoph.',
  },
  '/lp/implantes-dentarios-ipanema': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com scanner digital 3D. Reabilitação oral especializada. Dra. Carla Christoph.',
  },
  '/lp/lentes-porcelana-ipanema': {
    title: 'Lentes de Porcelana em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de porcelana e facetas em Ipanema. Resultado natural e duradouro. Dra. Carla Christoph.',
  },
  '/lp/lentes-profissional-ipanema': {
    title: 'Lentes de Contato Dental Porcelana Ipanema | Estética do Sorriso',
    description: 'Lentes de porcelana em Ipanema com resultado natural e duradouro. Planejamento digital com iTero Element 5D e Test Drive do Sorriso. Dra. Carla Christoph.',
  },
  '/lp/facetas-resina-ipanema': {
    title: 'Facetas de Resina em Ipanema | Dra. Carla Christoph',
    description: 'Facetas de resina direta em Ipanema. Transforme seu sorriso em uma única sessão com a Dra. Carla Christoph.',
  },

  // English landing pages (Google Ads — noindex)
  '/en/lp/cosmetic-dentistry': {
    title: 'Cosmetic Dentistry in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Porcelain veneers, composite bonding & smile makeovers in Ipanema. Personalized 1-hour appointments with Dr. Carla Christoph. CRO-RJ 27.509.',
  },
  '/en/lp/dental-implants': {
    title: 'Dental Implants in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Dental implant placement with 3D digital planning in Ipanema. Biocompatible titanium implants, minimally invasive techniques. Dr. Carla Christoph, CRO-RJ 27.509.',
  },
  '/en/lp/dental-emergency': {
    title: 'Dental Emergency in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Dental emergency in Ipanema? Toothache, broken tooth, lost filling — contact us via WhatsApp for same-day urgent dental care. Dr. Carla Christoph.',
  },
  '/en/lp/general-consultation': {
    title: 'General Dental Consultation in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Book your first dental consultation in Ipanema. Comprehensive evaluation with 3D digital scanner. Personalized treatment plan. Dr. Carla Christoph, CRO-RJ 27.509.',
  },
};

// ============================================================
// PAGE GENERATOR
// ============================================================

function generatePage(routePath, meta, options = {}) {
  const { noindex = false, schemas = [], fallbackContent = '', lang = 'pt-BR' } = options;
  let html = indexHtml;

  const fullUrl = BASE_URL + routePath;

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    '<title>' + meta.title + '</title>'
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    '<meta name="description" content="' + meta.description + '"'
  );

  // Replace existing OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    '<meta property="og:title" content="' + meta.title + '" />'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    '<meta property="og:description" content="' + meta.description + '" />'
  );

  // Build extra tags
  const extraTags = [
    '<meta property="og:url" content="' + fullUrl + '" />',
    '<meta property="og:image" content="' + OG_IMAGE + '" />',
    '<meta property="og:site_name" content="Dra. Carla Christoph" />',
    '<meta property="og:locale" content="' + (lang === 'en' ? 'en_US' : 'pt_BR') + '" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + meta.title + '" />',
    '<meta name="twitter:description" content="' + meta.description + '" />',
    '<meta name="twitter:image" content="' + OG_IMAGE + '" />',
    '<link rel="canonical" href="' + fullUrl + '" />',
  ];

  if (noindex) {
    extraTags.push('<meta name="robots" content="noindex, nofollow" />');
  }

  // Add JSON-LD schemas
  for (const schema of schemas) {
    extraTags.push('<script type="application/ld+json">' + schema + '</script>');
  }

  html = html.replace('</head>', '    ' + extraTags.join('\n    ') + '\n  </head>');

  // Inject fallback content into <div id="root">
  if (fallbackContent) {
    html = html.replace(
      '<div id="root"></div>',
      '<div id="root">' + fallbackContent + '</div>'
    );
  }

  return html;
}

// ============================================================
// MAIN EXECUTION
// ============================================================

const distDir = path.join(__dirname, '..', 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

let count = 0;

// 1. Service pages (full schemas + fallback content)
for (const [routePath, data] of Object.entries(servicePages)) {
  // NOTE: FAQPage schema intentionally NOT included here.
  // Each service page .tsx already renders FAQPage via React Helmet.
  // Including it here too caused Google to flag 14 "FAQPage duplicated" errors.
  // See: GSC audit report 04/Mar/2026
  const schemas = [
    generateMedicalProcedureSchema(data, routePath),
    generateDentistSchema()
  ];
  const fallbackContent = generateFallbackHTML(data, routePath);

  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, data, { schemas, fallbackContent }));
  count++;
  console.log('Generated (service + schemas): ' + routePath + '.html');
}

// 2. Info pages (Dentist schema + light fallback)
for (const [routePath, data] of Object.entries(infoPages)) {
  const schemas = [generateDentistSchema()];
  const fallbackContent = generateInfoFallbackHTML(data);

  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, data, { schemas, fallbackContent }));
  count++;
  console.log('Generated (info + schema): ' + routePath + '.html');
}

// 3. English pages (Dentist schema + fallback, lang=en)
for (const [routePath, data] of Object.entries(englishPages)) {
  const schemas = [generateDentistSchema()];
  const fallbackContent = generateInfoFallbackHTML(data);

  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, data, { schemas, fallbackContent, lang: 'en' }));
  count++;
  console.log('Generated (english): ' + routePath + '.html');
}

// 4. Landing pages (noindex, meta only)
for (const [routePath, meta] of Object.entries(landingPages)) {
  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, meta, { noindex: true }));
  count++;
  console.log('Generated (noindex): ' + routePath + '.html');
}

console.log('\nDone! Generated ' + count + ' static HTML files.');
console.log('  - ' + Object.keys(servicePages).length + ' service pages (with schemas + fallback content)');
console.log('  - ' + Object.keys(infoPages).length + ' info pages (with Dentist schema + fallback)');
console.log('  - ' + Object.keys(englishPages).length + ' english pages (lang=en, Dentist schema + fallback)');
console.log('  - ' + Object.keys(landingPages).length + ' landing pages (noindex, meta only)');
