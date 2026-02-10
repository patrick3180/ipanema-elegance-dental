

## Prompt 14 — Revisar Conteudo e Reativar Paginas Sobre e Contato

### Resumo
4 alteracoes: reescrever AboutPage, simplificar ContactPage (remover formulario, adicionar WhatsApp CTA), reativar rotas no App.tsx, e corrigir link "Contato" no Header.

---

### Alteracao 1: Reescrever `src/pages/AboutPage.tsx`

Manter intactos: SEOHead, handleWhatsAppClick, PageLayout, OptimizedImage, botao WhatsApp CTA, Separator.

**Conteudo revisado:**

- **Subtitulo**: "Mais de 20 anos dedicados a reabilitacao oral e odontologia estetica em Ipanema"
- **Paragrafo 1** (bio canonica): mencao a 20+ anos em Ipanema, Protese Dentaria + Implantodontia, CRO-RJ 27.509, 8 anos na Marinha
- **Paragrafo 2**: iTero, planejamento digital, cada caso unico
- **Secao "Atencao Individual"** vira **"Como Funciona o Atendimento"**: consulta de 1h, avaliacao completa, materiais de primeira linha
- **Secao "Formacao e Expertise"** vira **"Formacao e Experiencia"**: grid 2x2 com 4 cards (Protese, Implantodontia, Marinha, Tecnologia Digital)
- **Secao Missao/Visao/Valores** removida, substituida por **"O Que Esperar da Primeira Consulta"**: exame clinico, fotografias, escaneamento, plano claro
- **CTA final**: "Agende sua primeira consulta com a Dra. Carla em Ipanema."

Palavras banidas eliminadas: "transformar", "excelencia".

---

### Alteracao 2: Simplificar `src/pages/ContactPage.tsx`

**Remover:** formulario inteiro (nao funciona — apenas console.log), imports de react-hook-form, zod, Form components.

**Adicionar:**
- SEOHead com title, description, canonicalUrl
- Botao WhatsApp proeminente como CTA principal (topo da pagina)
- handleWhatsAppClick com tracking GTM + Google Ads + GCLID (mesmo padrao AboutPage)
- Aviso "NAO TRABALHAMOS COM PLANOS E CONVENIOS" em destaque
- Imports: `sendGCLIDToWebhook`, `MessageCircle`, `SEOHead`

**Manter:** PageLayout, informacoes de contato (endereco, telefone, email), mapa Google, Separator.

**Corrigir:** horario para "Segunda a Sexta: 9h as 19h" (sem sabados, sem "18h").

**Layout final:** WhatsApp CTA no topo, grid com info de contato + mapa abaixo.

---

### Alteracao 3: Reativar rotas em `src/App.tsx`

- Adicionar lazy imports para AboutPage e ContactPage (linhas 18-19 area)
- Linhas 142-143: substituir `<Navigate to="/" replace />` por componentes reais:

```
<Route path="/sobre" element={<AboutPage />} />
<Route path="/contato" element={<ContactPage />} />
```

- Manter `/diferenciais` como redirect para `/`
- NAO alterar nenhuma outra rota

---

### Alteracao 4: Corrigir link "Contato" no Header

**Arquivo:** `src/components/Header.tsx`

Linha 50: "Contato" usa `action: () => handleSectionNavigation("contato")` (scroll para secao da homepage).

**Corrigir para:** `{ title: "Contato", path: "/contato" }` (link direto, mesmo padrao de "Sobre" na linha 46).

"Sobre" ja aponta para `/sobre` via path — esta correto, nao precisa mudar.

---

### Arquivos modificados (total: 4)
1. `src/pages/AboutPage.tsx` — conteudo revisado, palavras banidas removidas
2. `src/pages/ContactPage.tsx` — formulario removido, WhatsApp CTA, SEOHead, aviso planos
3. `src/App.tsx` — rotas /sobre e /contato reativadas
4. `src/components/Header.tsx` — link Contato corrigido de scroll para rota

### O que NAO muda
- Landing pages, configs, componentes ConsultaInicial*
- Service pages
- Tracking existente (GTM, Google Ads, GCLID)
- Outras rotas no App.tsx
- Outros links do Header

