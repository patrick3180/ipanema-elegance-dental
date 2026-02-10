

## Reescrever Tratamento de Canal com Template Rico

### Resumo
Reescrever completamente `src/pages/TratamentoDeCanal.tsx`, removendo o `TreatmentPageTemplate` generico e criando uma pagina manual rica seguindo o padrao visual de `ProteseDentaria.tsx` e `ImplantesDentarios.tsx`. O tom e ajustado: a Dra. Carla acompanha e finaliza, mas o procedimento e feito por endodontista parceiro.

### Arquivo alterado
**`src/pages/TratamentoDeCanal.tsx`** -- reescrita completa

### Estrutura da pagina (10 secoes)

1. **Helmet** com title, meta description, keywords, Open Graph, canonical, Schema MedicalProcedure + FAQPage JSON-LD
2. **FastServerResponseOptimizer + CriticalCSSOptimizer** (performance)
3. **TreatmentHero** -- titulo, badges (Acompanhamento Completo, Endodontista Especializado, CRO-RJ 27.509), foto padrao, breadcrumbs
4. **SectionDivider** (Shield) + **Secao empatica** -- 3 paragrafos em prosa sobre desmistificar o canal
5. **SectionDivider** (AlertCircle) + **3 cards com icones** (Zap, AlertCircle, Sparkles) -- sinais de quando o canal e necessario
6. **Secao diferencial** (bg-gradient-purple-soft) -- foto da Dra. + badge "Jornada Completa" + 2 paragrafos + grid 2x2 de credenciais (Coordenacao, Finalizacao, Experiencia, Abordagem)
7. **SectionDivider** + **ProcessTimeline** (4 steps: Diagnostico, Tratamento com Endodontista, Restauracao pela Dra. Carla, Acompanhamento)
8. **Secao informativa** (bg-white) -- 2 paragrafos sobre o procedimento em tom acessivel
9. **SectionDivider** (HelpCircle) + **FAQ com Accordion** (6 perguntas) + Schema FAQPage no Helmet
10. **CTA Final** (gradiente dental-purple para dental-gold) -- icone Shield, titulo "Dor de Dente Precisa de Atencao", botao WhatsApp com tracking completo

### Imports e tracking
- Mesmos imports de performance: `FastServerResponseOptimizer`, `CriticalCSSOptimizer`, `useCriticalImagePreload`, `useScrollTracking`
- `handleWhatsAppClick` async com dataLayer push, Google Ads conversion (`AW-16894364517/OQZvCMXV0foZEOqP7vY9`), e `sendGCLIDToWebhook`
- Icones Lucide: Shield, AlertCircle, Zap, Sparkles, Heart, Search, HelpCircle, CheckCircle, Calendar

### Detalhes tecnicos
- Remove dependencia do `TreatmentPageTemplate` e `FAQ` type import
- Usa mesmos componentes: `PageLayout`, `TreatmentHero`, `SectionDivider`, `ProcessTimeline`, `Accordion`
- FAQPage structured data adicionado ao Helmet com as 6 FAQs
- Todas as classes CSS seguem o design system existente (dental-purple, dental-gold, dental-beige, dental-gray)
- Responsividade mobile com grid md:grid-cols-3 nos cards e md:grid-cols-[300px,1fr] na secao da especialista

### Tom de voz
- Dra. Carla **acompanha** e **finaliza** (restauracao, coroa, protese)
- O procedimento de canal e feito por **endodontista parceiro especializado**
- Sem palavras proibidas: "perfeito", "excelencia", "humanizado", "tecnologia de ponta"
- Sem precos

### O que NAO muda
- Nenhum outro arquivo
- Design system, paleta, tipografia
- Componentes reutilizaveis (TreatmentHero, SectionDivider, ProcessTimeline, Accordion)
- Rota no App.tsx (ja existe /tratamento-de-canal)

