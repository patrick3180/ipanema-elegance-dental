# REDESIGN — Seções Empáticas Sprint 6

**Data:** 16 de Fevereiro de 2026
**Issue:** Seções empáticas não ficaram harmônicas nem cativantes
**Páginas afetadas:** Implantes, Clareamento, Ortodontia, Restaurações

---

## 🎯 OBJETIVO

Redesign das seções empáticas para:
1. ✅ Criar hierarquia visual clara
2. ✅ Adicionar elementos visuais (ícones, cores)
3. ✅ Melhorar contraste e breathing room
4. ✅ Transmitir qualidade premium sem ser genérico
5. ✅ Manter brand voice (seguro, acolhedor, direto)

---

## 🎨 OPÇÃO 1 — Elegante Minimalista (RECOMENDADA)

**Conceito:** Cards com borda colorida esquerda + ícones sutis

### Características:
- Background: `bg-gradient-to-br from-dental-beige/20 to-white`
- Cards: Borda lateral colorida (purple/gold alternando)
- Ícones: Lucide-react em dental-purple/40
- Box "Importante": Destaque visual maior

### Preview Visual:
```
┌─────────────────────────────────────────────────┐
│    Você se identifica com alguma dessas         │
│            situações?                           │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┃  [ícone] Você evita certos alimentos        │
│  ┃  duros por medo...                           │
│  ┃                                              │
│  ├─ (borda dental-purple)                      │
│                                                 │
│  ┃  [ícone] Sente insegurança com prótese      │
│  ┃  móvel...                                    │
│  ┃                                              │
│  ├─ (borda dental-gold)                        │
│                                                 │
│  ┃  [ícone] Percebe perda óssea                │
│  ┃  progressiva...                              │
│  ┃                                              │
│  ├─ (borda dental-purple-soft)                 │
│                                                 │
│  ╔═══════════════════════════════╗             │
│  ║ ⚠️ IMPORTANTE                  ║             │
│  ║ A perda óssea acelera...      ║             │
│  ╚═══════════════════════════════╝             │
└─────────────────────────────────────────────────┘
```

### Código:

```tsx
{/* Seção Empática - Sprint 6 #1 - REDESIGNED */}
<section className="py-16 bg-gradient-to-br from-dental-beige/20 via-white to-dental-beige/10">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-display font-bold text-dental-purple mb-8 text-center">
      Você se identifica com alguma dessas situações?
    </h2>

    <div className="space-y-5">
      {/* Card 1 - Baixa urgência */}
      <div className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-dental-purple shadow-soft hover:shadow-elegant transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dental-purple/10 flex items-center justify-center group-hover:bg-dental-purple/20 transition-colors">
            <Shield className="w-6 h-6 text-dental-purple" />
          </div>
          <div className="flex-1">
            <p className="text-dental-gray leading-relaxed">
              <strong className="text-dental-purple font-semibold block mb-1">Você evita certos alimentos duros</strong>
              por medo de machucar a gengiva ou de que a prótese móvel saia do lugar?
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 - Média urgência */}
      <div className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-dental-gold shadow-soft hover:shadow-elegant transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center group-hover:bg-dental-gold/20 transition-colors">
            <AlertCircle className="w-6 h-6 text-dental-gold" />
          </div>
          <div className="flex-1">
            <p className="text-dental-gray leading-relaxed">
              <strong className="text-dental-purple font-semibold block mb-1">Sente insegurança com prótese móvel que solta ao falar</strong>
              ou que precisa de adesivo diariamente?
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 - Alta urgência */}
      <div className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-dental-purple-soft shadow-soft hover:shadow-elegant transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dental-purple-soft/10 flex items-center justify-center group-hover:bg-dental-purple-soft/20 transition-colors">
            <Activity className="w-6 h-6 text-dental-purple-soft" />
          </div>
          <div className="flex-1">
            <p className="text-dental-gray leading-relaxed">
              <strong className="text-dental-purple font-semibold block mb-1">Percebe perda óssea progressiva</strong>
              e teme que a situação piore com o tempo, dificultando o tratamento no futuro?
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Texto conclusivo */}
    <p className="text-center text-dental-gray mt-8 text-lg">
      Implantes dentários devolvem segurança para comer, falar e sorrir sem preocupação. Vamos avaliar a melhor solução para o seu caso.
    </p>

    {/* Box IMPORTANTE - destaque maior */}
    <div className="max-w-2xl mx-auto mt-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-dental-gold/20 to-dental-purple/20 rounded-xl blur-sm"></div>
      <div className="relative bg-white p-6 rounded-xl border-2 border-dental-gold shadow-elegant">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dental-gold/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-dental-gold" />
          </div>
          <div>
            <p className="text-dental-purple font-semibold text-lg mb-2">Importante</p>
            <p className="text-dental-gray leading-relaxed">
              A perda óssea acelera após extração — quanto mais tempo sem dente, mais osso é perdido, podendo exigir enxerto. Tratar cedo preserva sua estrutura óssea natural.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Imports necessários:**
```tsx
import { Shield, AlertCircle, Activity, Clock } from "lucide-react";
```

---

## 🎨 OPÇÃO 2 — Gradação Emocional (ALTERNATIVA)

**Conceito:** Cards com intensidade visual crescente matching urgência

### Características:
- Card 1 (baixa urgência): Sutil, border-l-2
- Card 2 (média): Mais proeminente, border-l-3
- Card 3 (alta): Muito destacado, border-l-4 + background colorido

### Preview Visual:
```
Card 1: ┃  (fino, dental-purple/50)
Card 2: ┃┃ (médio, dental-gold)
Card 3: ┃┃┃ (grosso, dental-purple + bg colorido)
```

### Código:

```tsx
{/* OPÇÃO 2: Gradação Emocional */}
<section className="py-16 bg-white">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-display font-bold text-dental-purple mb-8 text-center">
      Você se identifica com alguma dessas situações?
    </h2>

    <div className="space-y-5">
      {/* Card 1 - Baixa urgência (sutil) */}
      <div className="bg-dental-beige/10 p-6 rounded-xl border-l-2 border-dental-purple/50 hover:border-dental-purple transition-all">
        <p className="text-dental-gray leading-relaxed">
          <strong className="text-dental-purple">Você evita certos alimentos duros</strong> por medo de machucar a gengiva ou de que a prótese móvel saia do lugar?
        </p>
      </div>

      {/* Card 2 - Média urgência (moderado) */}
      <div className="bg-dental-beige/20 p-6 rounded-xl border-l-3 border-dental-gold shadow-soft hover:shadow-elegant transition-all">
        <p className="text-dental-gray leading-relaxed">
          <strong className="text-dental-purple">Sente insegurança com prótese móvel que solta ao falar</strong> ou que precisa de adesivo diariamente?
        </p>
      </div>

      {/* Card 3 - Alta urgência (proeminente) */}
      <div className="bg-gradient-to-r from-dental-purple/5 to-dental-purple/10 p-6 rounded-xl border-l-4 border-dental-purple shadow-elegant hover:shadow-2xl transition-all">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-dental-purple flex-shrink-0 mt-0.5" />
          <p className="text-dental-gray leading-relaxed">
            <strong className="text-dental-purple text-lg">Percebe perda óssea progressiva</strong> e teme que a situação piore com o tempo, dificultando o tratamento no futuro?
          </p>
        </div>
      </div>
    </div>

    {/* Resto igual à Opção 1 */}
  </div>
</section>
```

---

## 🎨 OPÇÃO 3 — Card + Imagem (MÁXIMO IMPACTO)

**Conceito:** Seção em 2 colunas (desktop): perguntas à esquerda, imagem/gráfico à direita

### Características:
- Desktop: Grid 2 colunas
- Coluna esquerda: Cards empáticos
- Coluna direita: Imagem ilustrativa ou infográfico
- Mobile: Stacked

### Código:

```tsx
{/* OPÇÃO 3: Com Imagem */}
<section className="py-16 bg-gradient-to-br from-dental-beige/20 to-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-display font-bold text-dental-purple mb-12 text-center">
      Você se identifica com alguma dessas situações?
    </h2>

    <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-center">
      {/* Coluna esquerda: Perguntas */}
      <div className="space-y-4">
        {/* Cards iguais à Opção 1 */}
      </div>

      {/* Coluna direita: Imagem */}
      <div className="relative rounded-2xl overflow-hidden shadow-elegant">
        <img
          src="/lovable-uploads/implante-antes-depois.webp"
          alt="Comparação antes e depois de implante dentário"
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dental-purple/90 to-transparent p-6">
          <p className="text-white text-sm font-semibold">
            Resultado natural e função completa
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 📊 COMPARAÇÃO DAS OPÇÕES

| Aspecto | Opção 1 (Elegante) | Opção 2 (Gradação) | Opção 3 (Imagem) |
|---------|-------------------|-------------------|------------------|
| **Impacto Visual** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Simplicidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Brand Alignment** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Mobile-friendly** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Conversion Focus** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**RECOMENDAÇÃO:** **Opção 1 — Elegante Minimalista**

**Por quê:**
- ✅ Equilibra impacto visual com simplicidade
- ✅ Mantém brand elegante e premium
- ✅ Não requer imagens adicionais
- ✅ 100% mobile-friendly
- ✅ Fácil de replicar nas 4 páginas

---

## 🎯 PLANO DE IMPLEMENTAÇÃO

### Página 1: Implantes (linha 179-210)
**Status:** Pronto para implementar
**Tempo estimado:** 15 min

### Página 2: Clareamento
**Ajustes:**
- Trocar ícones (Shield → Droplet, AlertCircle → Sparkles, Activity → Heart)
- Manter estrutura idêntica

### Página 3: Ortodontia
**Ajustes:**
- Trocar ícones (Shield → Smile, AlertCircle → Clock, Activity → Award)

### Página 4: Restaurações
**Ajustes:**
- Trocar ícones (Shield → Heart, AlertCircle → Sparkles, Activity → CheckCircle)

---

## ✅ CHECKLIST ANTES DO DEPLOY

- [ ] Imports de ícones Lucide-react adicionados
- [ ] Testar em mobile (375px, 390px, 428px)
- [ ] Testar hover states (desktop)
- [ ] Verificar contrast ratio (WCAG AA: 4.5:1 mínimo)
- [ ] Testar com screen reader (accessibility)
- [ ] npm run build (verificar warnings)
- [ ] npm run dev (testar localmente)
- [ ] Git commit com mensagem clara
- [ ] Deploy e verificar em produção

---

**Pronto para aprovar e implementar?**
