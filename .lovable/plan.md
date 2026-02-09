

## Acessibilidade + Formulario de Contato Funcional

### PARTE 1 -- Formulario de Contato (ContactSection.tsx)

**a) State para campos do formulario**
Adicionar `useState` para `name`, `phone`, `email`, `message` e `isSubmitting`.

**b) Labels acessiveis**
Adicionar `<Label>` visivel com `htmlFor` para cada campo:
- Nome (id="contact-name")
- Telefone (id="contact-phone")
- E-mail (id="contact-email")
- Mensagem (id="contact-message")

Manter placeholders como texto de ajuda. Adicionar `required` em todos os campos.

**c) API serverless (api/contact.js)**
Criar `api/contact.js` com Vercel Serverless Function que:
- Recebe POST com `{ name, phone, email, message }`
- Valida campos obrigatorios
- Envia via Web3Forms (com placeholder `SUA_ACCESS_KEY_AQUI`)
- Retorna 200/400/500

**d) handleFormSubmit funcional**
- Validar campos preenchidos (toast de erro se vazio)
- Estado de loading no botao ("Enviando..." + disabled)
- POST para `/api/contact`
- Sucesso: toast + limpar campos
- Erro: toast de erro
- Manter GTM tracking e GCLID existentes

**e) Title no iframe do Google Maps**
Adicionar `title="Localizacao da clinica Dra. Carla Christoph no Google Maps - Ipanema, Rio de Janeiro"`

### PARTE 2 -- Acessibilidade global

**a) Cor dental-gray mais escura (tailwind.config.ts)**
Alterar `gray: "#808080"` para `gray: "#6B6B6B"` -- contraste 5.4:1.

**b) Link "Pular para o conteudo" (Header.tsx)**
Adicionar como primeiro elemento dentro do `<header>`:
```text
<a href="#main-content" className="sr-only focus:not-sr-only ...">
  Pular para o conteudo
</a>
```

**c) id="main-content" no PageLayout (PageLayout.tsx)**
Adicionar `id="main-content"` ao `<main>` existente (ja usa tag `<main>`).

**d) Remover link LinkedIn do Footer (Footer.tsx)**
Remover o `<a>` com `href="#"` e `aria-label="LinkedIn"`. Manter Instagram e Facebook.

**e) prefers-reduced-motion (src/index.css)**
Adicionar media query ao final do arquivo para desabilitar animacoes quando o usuario prefere reducao de movimento.

### Resumo de arquivos

| Arquivo | Mudanca |
|---------|---------|
| src/components/ContactSection.tsx | Labels + state + form funcional + title no iframe |
| api/contact.js | NOVO -- serverless function Web3Forms |
| tailwind.config.ts | dental-gray #808080 para #6B6B6B |
| src/components/Header.tsx | Link "Pular para o conteudo" |
| src/components/PageLayout.tsx | id="main-content" no main |
| src/components/Footer.tsx | Remover link LinkedIn |
| src/index.css | prefers-reduced-motion |

### O que NAO muda
- Design visual (labels seguem estilo existente)
- Tracking GTM/GCLID
- vercel.json
- Nenhum outro componente

### Nota importante
A access_key do Web3Forms ficara como placeholder `SUA_ACCESS_KEY_AQUI`. Para o formulario funcionar em producao, voce precisa criar uma conta gratuita em https://web3forms.com, gerar a chave para o email contato@dracarlachristoph.com, e substituir o placeholder no arquivo `api/contact.js`.
