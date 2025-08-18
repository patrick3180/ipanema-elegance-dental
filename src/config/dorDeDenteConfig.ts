import { LandingPageConfig } from "@/types/LandingPageConfig";

export const dorDeDenteConfig: LandingPageConfig = {
  campaign: 'dor-de-dente-urgencia',
  
  messageMatch: {
    adGroup: 'dor-de-dente-ipanema',
    keyword: 'dor de dente ipanema'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Estou com uma dor de dente forte e preciso de atendimento urgente. Podem me ajudar?'
  },
  
  hero: {
    headline: 'Dor de Dente Forte? Atendimento Prioritário para Alívio da Dor em Ipanema',
    subheadline: 'Não ignore a dor. Faremos o possível para encaixá-lo no primeiro horário disponível e investigar a causa do seu desconforto. Dra. Carla Christoph, especialista há mais de 20 anos.',
    ctaText: 'Quero Aliviar Minha Dor',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },
  
  benefits: [
    'Atendimento prioritário - nos esforçamos para investigar a causa no mesmo dia',
    'Alívio rápido e seguro para o seu desconforto',
    'Diagnóstico preciso para tratar a origem da dor, não apenas o sintoma',
    'WhatsApp 24h para agendamentos e orientações urgentes'
  ],
  
  problem: {
    title: 'Sabemos Como a Dor de Dente Pode Ser Insuportável',
    description: 'Uma dor de dente intensa não espera. Ela afeta seu sono, sua concentração, seu trabalho e seu bem-estar. Na clínica da Dra. Carla Christoph, tratamos urgências com a prioridade que merecem, focando em diagnosticar a causa e aliviar sua dor o mais rápido possível.',
    problems: [
      'Dor latejante que não passa com analgésicos comuns',
      'Noites mal dormidas por causa do incômodo',
      'Dificuldade para se concentrar nas tarefas do dia a dia',
      'Medo de que seja um problema sério, como um canal',
      'Sensibilidade extrema que impede de comer ou beber',
      'Urgência para resolver antes de um compromisso importante'
    ]
  },
  
  guide: {
    title: 'Sua Jornada Rumo ao Alívio da Dor',
    subtitle: 'Nosso processo para diagnosticar e tratar sua dor com agilidade e precisão',
    steps: [
      { number: '1', title: 'Contato Imediato via WhatsApp', description: 'Entre em contato e descreva sua dor. Nossa equipe responde 24h e já orienta sobre os primeiros cuidados.' },
      { number: '2', title: 'Agendamento Prioritário', description: 'Faremos o máximo para encaixá-lo no primeiro horário vago, muitas vezes no mesmo dia.' },
      { number: '3', title: 'Avaliação e Diagnóstico Preciso', description: 'Análise clínica detalhada e exames de imagem (se necessário) para identificar a causa exata da dor.' },
      { number: '4', title: 'Ação Imediata para Alívio', description: 'Dependendo do diagnóstico (cárie profunda, canal, inflamação), iniciamos o procedimento para remover a dor ou aplicamos uma medicação local e agendamos a continuação do tratamento.' },
      { number: '5', title: 'Plano de Tratamento', description: 'Você sai da consulta com alívio da dor, clareza sobre o problema e com os próximos passos do tratamento definitivo já definidos.' }
    ]
  },
  
  socialProof: {
    title: 'O Que Nossos Pacientes Dizem Sobre o Atendimento de Urgência',
    testimonials: [
      { name: 'Marcelo C.., Jornalista', text: 'Acordei com uma dor de dente terrível no domingo. Mandei um WhatsApp e consegui um encaixe para segunda de manhã. A Dra. Carla foi incrível, diagnosticou o problema e o alívio foi imediato. Salvo pela agilidade e competência!', rating: 5 },
      { name: 'Maria L., Aposentada', text: 'Meu dente começou a doer de forma insuportável. A Dra. Carla me encaixou no mesmo dia. Foi extremamente cuidadosa, me explicou tudo sobre o tratamento de canal que eu precisava. O atendimento humanizado fez toda a diferença.', rating: 5 },
      { name: 'Roberto P., Contador', text: 'Estava com uma dor que irradiava para o rosto todo. O atendimento foi focado em resolver a dor primeiro. Saí de lá muito melhor e com o tratamento já encaminhado. Recomendo pela seriedade e eficiência.', rating: 5 }
    ],
    stats: [
      { number: '20+', label: 'Anos de Experiência' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: '1 hora', label: 'Mínimo por Agendamento' },
      { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },
  
  faq: {
    title: 'Dúvidas Frequentes Sobre Dor de Dente',
    questions: [
        { question: 'Consigo atendimento no mesmo dia?', answer: 'Sim, faremos todo o possível. Urgências com dor são sempre priorizadas em nossa agenda para garantir seu alívio o quanto antes.' },
        { question: 'O tratamento para dor vai doer?', answer: 'Não. Utilizamos as mais modernas técnicas de anestesia para garantir que o procedimento seja o mais confortável possível. Nosso foco é eliminar a sua dor, não causar mais.' },
        { question: 'O que pode ser a minha dor de dente?', answer: 'As causas são variadas, de cáries profundas a problemas de canal ou inflamações na gengiva. Somente uma avaliação clínica e, se necessário, radiográfica, pode determinar a causa exata.' },
        { question: 'Posso tomar algum remédio antes de ir?', answer: 'Não podemos prescrever medicamentos sem uma avaliação. Evite a automedicação. Entre em contato pelo WhatsApp que iremos acelerar seu agendamento para resolver a causa da dor de forma segura.' },
        { question: 'E se a dor começar no fim de semana?', answer: 'Nosso WhatsApp 24h permite que você entre em contato imediatamente. Você receberá orientações e agendaremos seu atendimento para o primeiro horário útil disponível.' },
        { question: 'Quanto tempo dura a consulta de urgência?', answer: 'Geralmente entre 45 e 90 minutos. Reservamos tempo suficiente para diagnosticar corretamente e realizar o procedimento necessário para o alívio da sua dor.' }
    ]
  },
  
  cta: {
    title: 'Não Sofra com Dor - Resolva a Causa do Problema',
    subtitle: 'Entre em contato imediatamente pelo WhatsApp 24h. Faremos o possível para atendê-lo ainda hoje.',
    buttonText: 'Quero Agendar Minha Urgência'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Estou com uma dor de dente forte e preciso de atendimento urgente.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Clínica Odontológica Premium Ipanema'
  },
  
  seo: {
    title: 'Dor de Dente Urgência Ipanema | Alívio Rápido | Dra. Carla',
    description: 'Dor de dente em Ipanema? Atendimento prioritário para alívio da dor. Diagnóstico preciso e tratamento no mesmo dia. WhatsApp 24h. Dra. Carla Christoph CRO-RJ 27509.',
    keywords: [
      'dor de dente ipanema',
      'urgência dor de dente ipanema',
      'dentista dor ipanema',
      'aliviar dor de dente',
      'dor de dente forte',
      'tratamento de canal ipanema',
      'dentista 24h ipanema dor',
      'dente doendo rio de janeiro'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
