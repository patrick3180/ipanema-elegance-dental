

## Plano: Script pos-build para meta tags estaticas por rota

### Objetivo
Crawlers e bots (WhatsApp, Facebook, Google) recebem sempre as meta tags da homepage porque a SPA serve o mesmo `index.html` para todas as URLs. A solucao e um script pos-build que gera copias do HTML com meta tags corretas para cada rota.

### Alteracoes (3 itens)

**1. Criar `scripts/generate-static-meta.js` (arquivo novo)**
- Script Node.js que roda apos o build do Vite
- Le `dist/index.html` como template base
- Gera um `index.html` customizado em cada subdiretorio de rota (ex: `dist/implantes-dentarios/index.html`)
- Para paginas organicas: title, description, og tags, canonical com dominio `dracarlachristoph.com`
- Para landing pages (`/lp/*`): mesmo tratamento + `noindex, nofollow`
- 14 paginas organicas + 13 landing pages = 27 arquivos gerados

**2. Atualizar `package.json` script de build**
- De: `"build": "vite build"`
- Para: `"build": "vite build && node scripts/generate-static-meta.js"`

**3. `vercel.json` - Sem alteracao necessaria**
- O Vercel ja serve arquivos estaticos existentes antes de aplicar rewrites
- A regra catch-all `/(.*) -> /index.html` so e usada se nao existir arquivo estatico
- Os arquivos gerados (ex: `/implantes-dentarios/index.html`) serao servidos automaticamente

### Seguranca
- Se o script falhar, o build falha mas o site anterior continua no ar
- Para reverter, basta voltar o build command para `"vite build"`
- Nenhum componente React, rota ou estilo e alterado

### Detalhes tecnicos

Rotas organicas (14): `/sobre`, `/servicos`, `/clareamento-dental`, `/implantes-dentarios`, `/lentes-de-contato-dental-e-facetas-de-resina`, `/protese-dentaria`, `/restauracoes-esteticas`, `/tratamento-de-canal`, `/clinica-geral-e-prevencao`, `/saude-da-gengiva`, `/ortodontia`, `/blog`, `/contato`, `/diferenciais`

Landing pages com noindex (13): todas as rotas `/lp/*` existentes no App.tsx

