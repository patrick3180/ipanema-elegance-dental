

## Prompt 10 — Correcoes no Hero das LPs: Grid de Benefits e Cor de Fundo

### Resumo
Duas correcoes pontuais no hero das LPs: trocar layout dos benefits de flex-wrap para grid 2x2, e clarear o fundo do hero para harmonizar com a foto da doutora.

---

### Arquivos alterados (3)

**1. `src/components/landing/consulta/ConsultaInicialHero.tsx`**

- **Linha 60**: Trocar background do gradiente escuro para claro
  - De: `linear-gradient(180deg, #D4D0B8 0%, #CFCBB4 50%, #C9C4AE 100%)`
  - Para: `linear-gradient(170deg, #FAF7F2 0%, #F5F0E8 40%, #EDE8DC 100%)`

- **Linha 67**: Ajustar opacidade do radial-gradient decorativo
  - De: `rgba(179,149,95,0.03)`
  - Para: `rgba(179,149,95,0.05)`

- **Linha 96**: Trocar benefits de flex-wrap para grid 2x2
  - De: `<div className="flex flex-wrap gap-3">`
  - Para: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">`

**2. `src/components/landing/HeroSection.tsx`**

- **Linha 70**: Mesmo ajuste de background
  - De: `linear-gradient(180deg, #D4D0B8 0%, #CFCBB4 50%, #C9C4AE 100%)`
  - Para: `linear-gradient(170deg, #FAF7F2 0%, #F5F0E8 40%, #EDE8DC 100%)`

- **Linha 80**: Ajustar opacidade do radial-gradient
  - De: `rgba(179,149,95,0.03)`
  - Para: `rgba(179,149,95,0.05)`

- **Linha 107**: Trocar benefits para grid 2x2 centralizado
  - De: `<div className="flex flex-wrap justify-center gap-3 mb-10">`
  - Para: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto">`

**3. `src/components/performance/CriticalCSSInline.tsx`**

- **Linha 12**: Trocar cor de fundo do `.hero-section`
  - De: `background: #CFCBB4;`
  - Para: `background: #FAF7F2;`

- **Linha 131**: Trocar `.bg-accent`
  - De: `background: #CFCBB4;`
  - Para: `background: #FAF7F2;`

### O que NAO muda
- Conteudo dos configs
- Tracking (GTM, GCLID, Google Ads)
- Foto da doutora e badge flutuante
- Tipografia (headline, subtitulo)
- handleWhatsAppClick / handleCTAClick

