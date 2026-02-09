

## Plano: Substituicao de Dominios Antigos

### Problema
Dois arquivos ainda contem referencias a dominios antigos que precisam ser substituidos por `https://dracarlachristoph.com`:

### Arquivos a Modificar

**1. `src/pages/ConsultaInicialLandingPage.tsx`** (3 ocorrencias)
- Linha 115: `og:url` - `dracarla.lovable.app` -> `dracarlachristoph.com`
- Linha 124: `twitter:url` - `dracarla.lovable.app` -> `dracarlachristoph.com`
- Linha 136: Schema.org `url` - `dracarla.lovable.app` -> `dracarlachristoph.com`

**2. `src/pages/EsteticaSorrisoLandingPage.tsx`** (7 ocorrencias)
- Linha 91: Schema.org `@id` - `dracarlaodonto.com` -> `dracarlachristoph.com`
- Linha 93: Schema.org `url` - `dracarlaodonto.com` -> `dracarlachristoph.com`
- Linha 130: `og:url` - `dracarlaodonto.com` -> `dracarlachristoph.com`
- Linha 131: `og:image` - `dracarlaodonto.com` -> `dracarlachristoph.com`
- Linha 137: `twitter:image` - `dracarlaodonto.com` -> `dracarlachristoph.com`
- Linha 140: `canonical` - `dracarlaodonto.com` -> `dracarlachristoph.com`

### Abordagem
Substituicao direta de texto (find/replace) sem alterar nenhum outro conteudo dos arquivos.

### Resultado
Todos os dominios antigos serao padronizados para `https://dracarlachristoph.com`, alinhando com a memoria de SEO do projeto.
