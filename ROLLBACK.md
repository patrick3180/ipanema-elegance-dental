# 🔄 Guia de Rollback & Documentação Técnica de Alterações (Sprint de Performance)

Este documento descreve detalhadamente as otimizações aplicadas no projeto **Ipanema Elegance Dental** para atingir **Score 90+ Mobile no PageSpeed Insights**, e fornece instruções claras e seguras sobre como reverter as alterações caso ocorra algum problema inesperado em produção.

---

## 📅 Resumo Geral
- **Data:** 01 de Junho de 2026
- **Objetivo:** Resolver gargalos críticos de LCP (Largest Contentful Paint) e TBT (Total Blocking Time) em dispositivos móveis, mantendo total integridade visual e segurança nas conversões do WhatsApp/Google Ads.
- **Commit Estável Anterior:** `c18c002b6f6e453c04a5fa8b1a4747f739605896`

---

## 🛠️ Modificações Realizadas & Justificativas

Abaixo estão detalhadas as modificações feitas no código-fonte, agrupadas por componente ou propósito técnico:

### 1. Segurança de Rastreamento & Gating de Scripts (`index.html`)
- **O que foi feito:** 
  - Adicionado um buffer global resiliente no `<head>` para a função `window.gtag` (`window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };`).
  - Condicionado o carregamento do script do Lovable (`gptengineer.js`) para rodar apenas em ambientes locais ou de staging/preview (`localhost`, `lovable.dev`, `lovable`, `127.0.0.1`), impedindo-o de rodar em produção.
- **Motivo:** Evitar falhas no envio de eventos de conversão (ex: cliques rápidos em botões de WhatsApp antes do GTM terminar de carregar) e remover o peso do editor visual de desenvolvimento da thread principal em produção (ganho imediato de TBT).

### 2. Inlining de Heros Estáticos (`scripts/generate-static-meta.cjs`)
- **O que foi feito:**
  - Adicionadas as rotas `/lp/lentes-porcelana-ipanema` e `/lp/lentes-profissional-ipanema` ao mapeamento do script de build estático (`ROUTE_HERO_MAP`).
  - Implementada a injeção do markup completo `<picture>` de heroes responsivos direto no HTML compilado (utilizando as versões `-480.avif` e `-1024.avif` otimizadas).
  - Adicionada lógica pós-build para reescrever o `dist/index.html` estático da Homepage, inserindo os preloads de imagem e o hero inlined.
- **Motivo:** Garantir que o browser descubra a imagem do Hero instantaneamente na análise do HTML e carregue a versão responsiva correta em AVIF de forma síncrona. Isso elimina o atraso causado pela montagem do React e resolve a métrica de LCP de forma robusta.

### 3. Hidratação Preguiçosa Abaixo da Dobra (`src/pages/Index.tsx`)
- **O que foi feito:**
  - Envolvidos todos os componentes que residem abaixo da dobra visual inicial da Homepage (como *Sobre*, *Diferenciais*, *Tratamentos*, *Tecnologia*, *Depoimentos*, *Blog*, *CTA*, *Contato*) no componente especializado `<LazySection>`.
- **Motivo:** Reduzir drasticamente o tempo de processamento JavaScript na thread principal durante o carregamento inicial. A hidratação e o carregamento do código desses componentes só ocorrem à medida que o usuário faz o scroll da página, eliminando o bloqueio de TBT.

### 4. Segmentação de Bundles (`vite.config.ts`)
- **O que foi feito:**
  - Configurada a propriedade `manualChunks` do Rollup no arquivo Vite para isolar de forma limpa os componentes de landing pages em inglês (`/components/en/lp/`) e arquivos locais das LPs principais em chunks separados.
- **Motivo:** Reduzir o tamanho do bundle principal (`index.js`). Páginas em português não baixam o JavaScript das páginas em inglês e vice-versa, mitigando o desperdício de código baixado.

### 5. Remoção de Otimizadores de Runtime Redundantes (`src/pages/*LandingPage.tsx`)
- **O que foi feito:**
  - Nas LPs de Protese, Lentes de Contato Profissional, Lentes de Porcelana, e Ortodontia, removeu-se os antigos wrappers e tags de runtime de otimização excessivos (`CriticalCSSInline`, `SmartContentfulCache`, `CoreWebVitalsMonitor`, etc.).
- **Motivo:** Menos é mais. O excesso de otimizadores baseados em React/JS no lado do cliente (`useEffect`) estava consumindo centenas de milissegundos na CPU móvel. A transição dessas otimizações para a geração estática no build-time resolveu o TBT sem perda de funcionalidades.

---

## ⏪ Como Fazer Rollback (Voltar Atrás)

Se algo der errado na produção da Vercel ou caso queira simplesmente restaurar o estado do projeto exatamente para onde estava antes do início desta sprint, siga os procedimentos descritos abaixo.

### Opção A: Desfazer Alterações Locais (Se ainda não foram commitadas ou enviadas)
Para apagar as alterações locais não confirmadas no diretório atual:
```bash
git restore .
```

### Opção B: Reverter para o Commit Estável Anterior na Branch Principal
Se as alterações já foram enviadas ao GitHub e você precisa retornar a produção ao commit estável imediatamente:

1. **Abra o terminal na pasta do projeto:** `c:\IA\Projetos\Teste site Carla\ipanema-elegance-dental\`
2. **Crie uma branch de backup** para garantir que as alterações atuais não sejam perdidas caso decida reanalisá-las no futuro:
   ```bash
   git checkout -b backup-performance-sprint-2026
   ```
3. **Volte para a branch principal (`main`):**
   ```bash
   git checkout main
   ```
4. **Resete de forma forçada para o commit estável anterior (`c18c002`):**
   ```bash
   git reset --hard c18c002b6f6e453c04a5fa8b1a4747f739605896
   ```
5. **Envie as alterações revertidas de forma forçada para o GitHub:**
   ```bash
   git push origin main --force
   ```
   *Nota: Isso acionará instantaneamente um novo deploy de Rollback na Vercel.*

---

## 🔍 Como Validar Localmente
Antes de fazer alterações futuras, você pode rodar o build e a geração estática localmente para assegurar a conformidade:

1. Executar o build de produção do Vite:
   ```bash
   cmd /c npm run build
   ```
2. Executar o script de inlining de heros e geração das 48 páginas HTML estáticas:
   ```bash
   cmd /c node scripts/generate-static-meta.cjs
   ```
3. Verificar a pasta `/dist` para se certificar de que os arquivos foram gerados corretamente.
