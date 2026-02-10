

## Reescrever Saude da Gengiva com Template Rico

### Resumo
Reescrever completamente `src/pages/SaudeDaGengiva.tsx`, removendo o `TreatmentPageTemplate` generico e criando uma pagina manual rica seguindo o padrao exato de `TratamentoDeCanal.tsx`. O tom segue o mesmo modelo: a Dra. Carla coordena e integra o tratamento periodontal ao plano completo, mas o procedimento e feito por periodontista parceiro.

### Arquivo alterado
**`src/pages/SaudeDaGengiva.tsx`** -- reescrita completa

### Estrutura da pagina (10 secoes)

1. **Helmet** com title, meta description, keywords, Open Graph, canonical, Schema MedicalProcedure + FAQPage JSON-LD (6 FAQs)
2. **FastServerResponseOptimizer + CriticalCSSOptimizer** (performance)
3. **TreatmentHero** -- titulo "Saude da Gengiva em Ipanema", badges (Saude Periodontal, Acompanhamento Integrado, CRO-RJ 27.509), foto padrao, breadcrumbs
4. **SectionDivider** (AlertCircle) + **Secao empatica** -- "Sinais que Muita Gente Ignora" -- 3 paragrafos em prosa sobre sangramento, periodontite silenciosa e sinais de alerta
5. **SectionDivider** (Shield) + **3 cards com icones** (Activity, AlertCircle, ArrowRight) -- Gengivite, Periodontite, Retracao Gengival
6. **Secao diferencial** (bg-gradient-purple-soft) -- foto da Dra. + badge "Cuidado Integrado" + 2 paragrafos + grid 2x2 credenciais (Visao integrada, Parceria especializada, Experiencia, Abordagem)
7. **SectionDivider** + **ProcessTimeline** (4 steps: Avaliacao, Tratamento Periodontal, Reavaliacao, Manutencao Periodica)
8. **Secao informativa** (bg-white) -- "A Relacao entre Gengiva e Saude Geral" -- 2 paragrafos
9. **SectionDivider** (HelpCircle) + **FAQ com Accordion** (6 perguntas) + Schema FAQPage no Helmet
10. **CTA Final** (gradiente dental-purple para dental-gold) -- icone Heart, titulo "Cuide da Base do Seu Sorriso", botao WhatsApp com tracking completo

### Imports e tracking
- `FastServerResponseOptimizer`, `CriticalCSSOptimizer`, `useCriticalImagePreload`, `useScrollTracking`
- `handleWhatsAppClick` async com dataLayer push, Google Ads conversion (`AW-16894364517/OQZvCMXV0foZEOqP7vY9`), e `sendGCLIDToWebhook`
- Icones Lucide: Shield, AlertCircle, Activity, ArrowRight, Heart, Search, HelpCircle, CheckCircle

### Detalhes tecnicos
- Remove dependencia do `TreatmentPageTemplate` e `FAQ` type import
- Usa mesmos componentes: `PageLayout`, `TreatmentHero`, `SectionDivider`, `ProcessTimeline`, `Accordion`
- FAQPage structured data com as 6 FAQs
- Classes CSS do design system (dental-purple, dental-gold, dental-beige, dental-gray)
- Responsividade mobile: grid md:grid-cols-3 nos cards, md:grid-cols-[300px,1fr] na secao da especialista
- Estrutura identica ao TratamentoDeCanal.tsx recentemente implementado

### Tom de voz
- Dra. Carla **coordena, acompanha e integra** o cuidado periodontal ao plano de tratamento
- O tratamento periodontal e feito por **periodontista parceiro**
- Saude gengival posicionada como **pre-requisito** para outros tratamentos (lentes, implantes, protese)
- Sem palavras proibidas: "perfeito", "excelencia", "humanizado", "tecnologia de ponta"
- Sem precos

### O que NAO muda
- Nenhum outro arquivo
- Design system, paleta, tipografia
- Componentes reutilizaveis
- Rota no App.tsx (ja existe /saude-da-gengiva)

