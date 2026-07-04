# Manutenção do site (Astro) — como editar e publicar

> **O site está em Astro** (estático) desde 03/07/2026. Produção = `dracarlachristoph.com`, servida pela Vercel a partir da branch **`main`**.
> **Regra de ouro:** o deploy é **automático a cada `git push origin main`** — a Vercel roda o build do Astro sozinha (`cd astro && npm install && npm run build`). Ninguém precisa "rodar o Astro" na mão para publicar.

---

## Fluxo A — Editar uma PÁGINA ou LANDING PAGE (código)

Páginas e LPs são arquivos `.astro` no repo. Editar → conferir → push → no ar.

1. **Editar a copy/estrutura:**
   - **LPs:** a copy vive no **config** da LP (mesmos arquivos de sempre): `src/config/<nome>Config.ts`. Ver o mapa abaixo. Alterar headline, benefícios, depoimentos, FAQ, mensagem do WhatsApp, título/description de SEO → é só editar o config.
   - **Páginas de serviço / institucionais / home / EN:** editar o `.astro` em `astro/src/pages/...` (a copy está no próprio arquivo).
2. **Conferir ANTES de subir (obrigatório):**
   ```bash
   cd astro
   npm run build          # gera o site (lê Contentful p/ o blog)
   node qa-check.mjs      # duplo-check: SEO, links, tracking, CTAs, noindex, imagens
   npm run preview        # abre localhost:4321 p/ ver com os olhos
   ```
   O `qa-check.mjs` precisa passar **100% verde** antes do push.
3. **Publicar:**
   ```bash
   git add -A && git commit -m "..." && git push origin main
   ```
   A Vercel builda e troca em ~1–2 min (deploy **atômico**: se o build falhar, o site atual continua no ar).
4. **Registrar** a mudança em `Agencia de MKT/HISTORICO_MUDANCAS.md` (regra de marketing — antes/depois).

### Mapa LP → arquivo de config (onde está a copy)
| Rota | Config |
|---|---|
| `/lp/consulta-inicial` | `src/config/consultaInicialConfig.ts` |
| `/lp/clareamento-dental` | `src/config/clareamentoConfig.ts` |
| `/lp/lentes-porcelana-ipanema` | `src/config/lentesPorcelanaAcolhedorConfig.ts` |
| `/lp/lentes-profissional-ipanema` | `src/config/lentesPorcelanaProfissionalConfig.ts` |
| `/lp/lentes-resina-ou-porcelana-ipanema` | `src/config/lentesComparacaoConfig.ts` |
| `/lp/facetas-resina-ipanema` | `src/config/facetasResinaDiretaConfig.ts` |
| `/lp/implantes-dentarios-ipanema` | `src/config/implantesDentariosConfig.ts` |
| `/lp/estetica-dental-ipanema` | `src/config/esteticaSorrisoGenericaConfig.ts` |
| `/lp/especialista-protese-ipanema` (V2) | `src/config/especialistaProteseV2Config.ts` |
| `/lp/especialista-protese-ipanema-v1` | `src/config/especialistaProteseConfig.ts` |
| `/lp/ortodontia-ipanema` | `src/config/ortodontiaConfig.ts` |
| `/lp/limpeza-dental-ipanema` | `src/config/limpezaDentalConfig.ts` |
| `/lp/profilaxia-dental-ipanema` | `src/config/profilaxiaConfig.ts` |
| `/lp/saude-gengival-ipanema` | `src/config/saudeGengivalConfig.ts` |
| `/lp/dor-de-dente-urgencia-ipanema` | `src/config/dorDeDenteConfig.ts` |
| `/lp/dente-quebrado-urgencia-ipanema` | `src/config/denteQuebradoConfig.ts` |
| `/lp/emergencia-odontologica-ipanema` | `src/config/emergenciaOdontologicaConfig.ts` |
| `/en/lp/cosmetic-dentistry` | `src/config/enCosmeticDentistryLPConfig.ts` |
| `/en/lp/dental-implants` | `src/config/enDentalImplantsLPConfig.ts` |
| `/en/lp/dental-emergency` | `src/config/enDentalEmergencyLPConfig.ts` |
| `/en/lp/general-consultation` | `src/config/enGeneralConsultationLPConfig.ts` |

> A estrutura visual de cada LP fica em `astro/src/pages/lp/<rota>.astro` + componentes em `astro/src/components/lp/`. Para mudar **texto**, mexe no config; para mudar **layout/seções**, no `.astro`.

---

## Fluxo B — Publicar/editar um POST do BLOG (Contentful)

O conteúdo do blog vive no **Contentful** (a Dra. Carla revisa/aprova lá, ou a skill `blog-carla-pipeline` gera o draft). **Isso não muda.**

⚠️ **Ponto importante:** o Astro lê o Contentful **no momento do build**. Então **publicar um post no Contentful NÃO o coloca no ar sozinho** — é preciso disparar um build.

**Como o post novo vai ao ar:**
- **Hoje (manual):** qualquer `git push` na `main` OU um "Redeploy" no painel da Vercel reconstrói e traz os posts novos.
- **Recomendado (automático):** configurar **1× um webhook Contentful → Vercel Deploy Hook**. Aí, quando a Dra. Carla publica no Contentful, a Vercel rebuilda sozinha (~1–2 min) e o post entra. *(Ainda não configurado — posso fazer com você.)*

---

## Respostas diretas

- **"Preciso rodar o Astro na mão?"** Não para publicar — **a Vercel roda automaticamente no push**. Localmente eu rodo `npm run build` + `qa-check.mjs` só para **conferir antes de subir** (garante que nada quebrado vai ao ar).
- **"E as automações (N8N/Sofia)?"** Intactas. Só a leitura do site mudou; o pipeline de conteúdo e o WhatsApp continuam iguais.
- **Rollback de emergência:** `git revert -m 1 c44eb5b && git push` → o site React antigo (ainda no repo, em `src/`) volta a buildar.

---

## Pendências conhecidas
- [ ] Webhook Contentful → Vercel (auto-deploy do blog ao publicar).
- [ ] `CLAUDE.md` da raiz ainda descreve a stack como "React/Vite" — atualizar para Astro.
- [ ] PSI mobile formal (número "depois") — via agente de Marketing.
