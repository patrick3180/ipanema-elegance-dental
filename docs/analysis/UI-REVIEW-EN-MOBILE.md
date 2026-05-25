# UI Review — English Micro-Site (Mobile-First, iPhone 14 Pro Max 430×932)

**Audited:** 2026-05-22
**Reviewer:** GSD UI Auditor (code-only audit; no dev server available)
**Baseline:** Abstract 6-pillar standards + project BRAND.md / CLAUDE.md
**Viewport focus:** iPhone 14 Pro Max @ 430 CSS pixels (DPR 3)
**Weight:** Pillars 4 (Typography), 5 (Spacing), 6 (Experience) at 2x — mobile overflow is the reported user pain.

---

## 1. Executive Summary

**Overall site mobile-readiness score: 64 / 100** — "Needs Work / Ship-Blocking on a few pages."

The English micro-site is generally well structured (responsive `text-3xl md:text-4xl` patterns dominate, `EnHeader` collapses to hamburger at `md` correctly, all grids use `md:grid-cols-*` so they stack <768 px). However, three classes of problems are causing the iPhone overflow reports:

1. **Tailwind `container` is configured with a 32 px padding on every breakpoint** (`tailwind.config.ts:14-19`). Combined with the `container-custom` utility that adds `px-6` (24 px) **on top of** the container's own padding, you can end up with ~50–56 px effective horizontal padding on a 430 px viewport — only ~374 px of usable width for English copy that is already 20–30 % longer than the Portuguese source.
2. **The EnHomePage hero forces a fixed-width image** (`w-[280px]`) at the `<sm` breakpoint *inside a 2-column grid that does NOT collapse to 1 column on mobile*. The grid uses `grid lg:grid-cols-[1.1fr_0.9fr]` so on `<lg` it stacks correctly — BUT the image's own `w-[280px]` floor in combination with hero animations and the heading-xl text "Cosmetic Dentistry in Ipanema, Rio de Janeiro" set in `text-balance` is the primary culprit reported by the user.
3. **CRO/Brand violations in EN copy** that block ship independently of overflow: "40-60 % less" pricing claim (cosmetic LP), "transparent pricing" wording on two LPs, "Amazing", "brilliant", "Excellent" in testimonials (banned tone words per BRAND.md §6).

### Mobile-Readiness Verdict
**Ship blocked.** Three CRITICAL issues + at least nine HIGH overflow risks. About 70 % of fixes are 1-line changes (responsive variants); the other 30 % require trimming English copy or fixing the `container` config once.

### Top 5 Issues (one-line each)
1. **CRO violation — pricing reference**: cosmetic LP FAQ says "40-60 % less than US/UK". Must be removed today.
2. **Tailwind container padding stack**: `container` (2 rem) + `container-custom` (px-6) double-pads on mobile, eating ~50 px of viewport.
3. **EnHomePage hero image hard-floor of `w-[280px] h-[420px]`** with a sibling text column at `heading-xl` (text-4xl = 36 px) on the same row at `<lg` — this is the most likely root cause of the user's reported overflow.
4. **Banned tone words in testimonials** ("Amazing", "Excellent", "brilliant") across three LP configs.
5. **`whitespace-nowrap` on the WhatsApp CTA button** in `EnDentalEmergencyPage.tsx:186` combined with `text-lg px-8 py-4` content "WhatsApp Now" — fine alone, but the surrounding `flex-col md:flex-row` parent at the breakpoint transition risks horizontal overflow on devices around 375–430 px.

---

## 2. Scoring Table

Pillars: 1 Copywriting · 2 Visuals · 3 Color · 4 Typography · 5 Spacing · 6 Experience.
Pillars 4/5/6 are **doubled** in the weighted total (max = 4×6 + 4×3 extra = 36 → normalized to 100).

| Page / Component | P1 | P2 | P3 | P4 | P5 | P6 | Weighted Total |
|---|---|---|---|---|---|---|---|
| EnHomePage.tsx | 3 | 3 | 4 | 3 | 2 | 3 | 67 |
| EnAboutPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnContactPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnDentalImplantsPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnGeneralDentistryPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnDentalEmergencyPage.tsx | 2 | 3 | 3 | 3 | 2 | 2 | 56 |
| EnDentalProstheticsPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnTeethWhiteningPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnVeneersAndLensesPage.tsx | 3 | 3 | 3 | 2 | 2 | 3 | 56 |
| EnAestheticRestorationsPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnOrthodonticsPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnRootCanalPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnGumHealthPage.tsx | 3 | 3 | 4 | 3 | 3 | 3 | 72 |
| EnCosmeticDentistryLP.tsx (config) | **1** | 3 | 4 | 3 | 3 | 3 | 56 |
| EnDentalImplantsLP.tsx (config) | 2 | 3 | 4 | 3 | 3 | 3 | 67 |
| EnDentalEmergencyLP.tsx (config) | 2 | 3 | 4 | 3 | 3 | 3 | 67 |
| EnGeneralConsultationLP.tsx (config) | 2 | 3 | 4 | 3 | 3 | 3 | 67 |
| EnHeader.tsx | 3 | 4 | 4 | 4 | 3 | 3 | 78 |
| EnFooter.tsx | 4 | 3 | 4 | 4 | 3 | 3 | 78 |
| EnStatsBar.tsx | 4 | 3 | 4 | 3 | 2 | 3 | 67 |
| EnInternationalPatients.tsx | 4 | 4 | 4 | 4 | 3 | 4 | 89 |
| EnLPHero.tsx | 3 | 3 | 4 | 4 | 3 | 3 | 78 |

**Site-wide mobile-readiness: 64 / 100** (un-weighted mean of weighted totals).

---

## 3. Systemic Patterns (Highest-ROI Fixes)

These fixes touch one file each and propagate across many pages. **Do these first.**

### Systemic #1 — `tailwind.config.ts` container padding is 32 px at every breakpoint
**File:** `tailwind.config.ts:14-19`
```ts
container: {
  center: true,
  padding: "2rem",   // 32 px on ALL breakpoints, including mobile
  screens: { "2xl": "1400px" },
},
```
Combined with `container-custom { @apply container mx-auto px-6 lg:px-8; }` in `src/index.css:133-135`, the result on a 430 px viewport is roughly **32 px (container) + 24 px (px-6) = 56 px of side padding** on every page that uses `container-custom`, leaving ~318 px of content width. **CRITICAL** mobile overflow risk for any English headline above 6 words at `text-3xl` or larger.

**Fix (one line, 17 pages affected):**
```ts
padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
```
Or alternatively remove `px-6` from `.container-custom` since the container provides its own padding.

### Systemic #2 — `heading-xl` has no `sm:` step
**File:** `src/index.css:146-148`
```css
.heading-xl { @apply text-4xl md:text-4xl xl:text-5xl ... }
```
The class jumps from `text-4xl` (36 px) at `<md` straight to `text-5xl` (48 px) at `xl`. On the EnHomePage hero (`EnHomePage.tsx:186`) the headline "Cosmetic Dentistry in **Ipanema**, Rio de Janeiro" wraps onto two lines on iPhone, but the gold-styled `<span>Ipanema</span>` can cause an awkward break with `text-balance`. Plus the hero column sits at `lg:grid-cols-[1.1fr_0.9fr]` which means at md (768 px) the image is competing for horizontal space.

**Fix:**
```css
.heading-xl { @apply text-3xl sm:text-4xl xl:text-5xl ... }
```

### Systemic #3 — Banned tone words in testimonials across 3 of the 4 LP configs
**Files:**
- `src/config/enCosmeticDentistryLPConfig.ts:57-58` — "**Excellent** dentist", "outcome was **brilliant**", "**Amazing** experience"
- `src/config/enDentalImplantsLPConfig.ts:57-58` — same testimonials
- `src/config/enDentalEmergencyLPConfig.ts:57-58` — same
- `src/config/enGeneralConsultationLPConfig.ts:57-58` — same

BRAND.md §6 / "Regras de Depoimentos" forbids `incrível` / `perfeita` / `maravilhosa` — the EN equivalents "Amazing", "Excellent", "brilliant" violate the same spirit. These look like real Google Reviews; if they are, lightly edit retaining the **concrete facts** ("3 porcelain fillings", "chipped tooth fixed") and remove the marketing-tone adjectives.

### Systemic #4 — Pricing language across LPs (CRO compliance, NOT aesthetic)
**Files:**
- `enCosmeticDentistryLPConfig.ts:76` — "Cosmetic dental procedures in Brazil typically cost **40-60 % less** than in the US or UK" → **CRITICAL CRO violation**.
- `enDentalEmergencyLPConfig.ts:75` — "We provide **transparent pricing** before any procedure begins" → CRO violation (implies advertised pricing).
- `enGeneralConsultationLPConfig.ts:29` — "**Transparent pricing — no surprises**" benefit → CRO violation.
- `enGeneralConsultationLPConfig.ts:74` — "clear, detailed **cost** estimates" → borderline; safe to keep but soft-edit.

Single fix: scrub the four files. About 10 minutes of work, but **legally** the highest-priority change in the entire audit.

### Systemic #5 — 13 navigation links in EnFooter form a tall single column on mobile
**File:** `src/components/en/EnFooter.tsx:43-67`
Navigation list has 13 items + language switch. With `space-y-2` and ~24 px line-height each, that's ~360 px of vertical scroll inside the footer alone on mobile. Not an overflow bug, but a UX odor — the Navigation column is the only one of three with this density.

**Fix:** split into a 2-col sub-grid on mobile (`grid grid-cols-2 gap-x-4`) inside the existing column, or trim to the 6 highest-value links.

### Systemic #6 — All service-page section titles use `text-3xl md:text-4xl` (no `sm:` and no `xl:`)
**Files:** 10 occurrences across `EnVeneersAndLensesPage.tsx`, `EnAestheticRestorationsPage.tsx`, `EnDentalImplantsPage.tsx`, `EnTeethWhiteningPage.tsx`, `EnDentalProstheticsPage.tsx`.

On a 430 px viewport with the doubled container padding (Systemic #1), a `text-3xl` (30 px) heading like "Digital Technology: iTero Element 5D Scanner" (45 chars) sits at ~317 px width and risks wrapping awkwardly mid-product-name. The fix here is downstream of Systemic #1 — once container padding is reduced, these survive at `text-3xl`.

### Systemic #7 — Mobile menu animation flash + 9-item dropdown
**File:** `src/components/en/EnHeader.tsx:188-326`
The mobile menu uses `fixed inset-0` with `pt-24 px-6`, which is correct, but the "Treatments" dropdown reveals 9 items inline inside the menu (a `flex-col gap-3` of 9 entries × ~28 px = 252 px). Together with the 6 top-level items + WhatsApp CTA + language switches, the mobile menu is ~700 px tall — scrolls correctly but the user must scroll inside the menu. Acceptable; flagged as MEDIUM polish.

---

## 4. Findings by Page

> Severity legend: **CRITICAL** (overflow / illegible / regulation breach) · **HIGH** (degrades UX) · **MEDIUM** (polish) · **LOW** (nice-to-have).

### 4.1 EnHomePage.tsx — 67/100

**Findings (ordered by severity):**

1. **CRITICAL — Hero image fixed width competes with hero text column on tablet/small desktop**
   `EnHomePage.tsx:250` —
   ```tsx
   className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[460px] h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px]"
   ```
   At `md` (768 px) the grid is still single-column (`grid lg:grid-cols-[1.1fr_0.9fr]` only activates at `lg`), so the image displays at `w-[400px]` inside a 768-px-wide viewport with `container-custom` padding (~56 px) — usable column is ~712 px. Fine at md. BUT at `sm` (640 px) the image is `w-[320px]` and centered (`justify-center`), which is also OK. **The actual problem is iPhone 14 Pro Max @ 430 px**: image is `w-[320px]` (sm: kicks in at 640 — so at 430 we get `w-[280px]`), which means the image card uses 280 of 374 usable px (75 %). Combined with the gradient mask making the right edge translucent, the visual works — *but if the user has Dynamic Type or zoom enabled in iOS, the image rect stays fixed at 280 px and pushes content past the viewport.* Add `max-w-full` to be safe.
   **Fix:** `className="w-[280px] max-w-full sm:w-[320px] ..."` (add `max-w-full`).

2. **HIGH — Hero headline + gold span risks awkward break with `text-balance`**
   `EnHomePage.tsx:186-189` —
   ```tsx
   <h1 className="hero-animate-2 heading-xl mb-6 text-balance">
     Cosmetic Dentistry in{' '}
     <span className="text-dental-gold">Ipanema</span>, Rio de Janeiro
   </h1>
   ```
   `text-balance` re-flows lines to balance — on iPhone, the gold "Ipanema" can end up alone on a line, separating it from ", Rio de Janeiro". Aesthetically not catastrophic but breaks the rhythm. Pair with Systemic #2 (`heading-xl` size step).

3. **HIGH — Hero CTA button uses `flex-col text-left leading-tight` inside the Button**
   `EnHomePage.tsx:217-221` — Primary button has *two* stacked spans ("Book Your Appointment" + "We reply in your language") with `ArrowRight` icon. On mobile the two `flex-wrap gap-4` CTAs stack vertically (good), but the inner two-line button text plus icon means **button height is ~76 px on mobile** — comfortable touch target (✅ exceeds 44 px), but it looks heavy. MEDIUM polish.

4. **MEDIUM — Trust badges row `gap-x-6 gap-y-3` of 3 items can wrap to 3 lines on 430 px**
   `EnHomePage.tsx:196-209` — "20+ Years in Ipanema", "CRO-RJ 27.509", "1h+ Per Appointment" each ~150 px → all 3 will not fit on one line on iPhone. `flex-wrap` handles it cleanly. ✅ functional, but visually heavy. Could reduce to `gap-x-4` on mobile.

5. **MEDIUM — `min-h-screen` on hero plus `paddingTop: var(--header-height, 112px)`** — `EnHomePage.tsx:177` — Hero forces full viewport height. On a 932-px iPhone in landscape (430 wide × something) this can crop content; in portrait it's fine. Acceptable.

### 4.2 EnAboutPage.tsx — 72/100

1. **HIGH — Credentials row uses `grid md:grid-cols-4` with NO `grid-cols-2` for mobile**
   `EnAboutPage.tsx:145` — At `<md` (default), 4 stat cards stack as 4 vertical cards (`grid-cols-1` implicit). For Award/Anchor/CRO-RJ/iTero — 4 vertical cards is fine but visually wasteful. **Recommended:** `grid grid-cols-2 md:grid-cols-4`.

2. **LOW — Long paragraphs ~3 lines** in the Background section render comfortably; no issue.

### 4.3 EnContactPage.tsx — 72/100

1. **MEDIUM — Email address `contato@dracarlachristoph.com` (27 chars) without `break-all`**
   `EnContactPage.tsx:160` and `EnFooter.tsx:104-106` — On 430 px viewport inside a `p-8` card with the contact icon column, ~243 px is needed. Fits, but on iPhone SE (375 px) it would overlap. Add `break-all` for safety.
   **Fix:** wrap email span with `className="break-all"`.

2. **LOW — iframe map at `aspect-video`** inside a `p-8 bg-white` card — fine, gets `w-full`.

### 4.4 EnDentalImplantsPage.tsx — 72/100

1. **HIGH — Card overlay text inside `aspect-[5/4]` images uses `min-h-28 sm:min-h-32 md:min-h-36`**
   `EnDentalImplantsPage.tsx:164-168` — The overlay caption inside each implant card has `p-8 text-white` with a 4-line clamped paragraph. On a 430 px viewport in a single-column grid (since the row is `grid md:grid-cols-2 lg:grid-cols-4`), the card is full width — overlay paragraph fits. But the `p-8` (32 px) inside a `p-4` outer card seems excessive on mobile. MEDIUM.

2. **MEDIUM — Card grid `gap-6` between 4 cards stacked = 72 px of inter-card whitespace on mobile**; consider `gap-4 md:gap-6`.

### 4.5 EnDentalEmergencyPage.tsx — 56/100 ⚠️ second-worst score

1. **CRITICAL — `whitespace-nowrap` on the "WhatsApp Now" CTA button**
   `EnDentalEmergencyPage.tsx:186` —
   ```tsx
   className="... px-8 py-4 ... text-lg whitespace-nowrap"
   ```
   The parent on line 170 is `flex flex-col md:flex-row gap-6 items-center justify-between`. On `<md` (mobile) the parent stacks vertically so the button has full width — `whitespace-nowrap` is harmless there. But if a future translator changes "WhatsApp Now" to a longer string (e.g. "Send WhatsApp Message Now"), the `whitespace-nowrap` will push width beyond the card. Defensive fix: remove it.

2. **HIGH — Bottom CTA section heading uses raw `text-3xl` with no responsive variant**
   `EnDentalEmergencyPage.tsx:275` — `<h2 className="text-3xl font-display mb-4">Don't Wait — Get Help Now</h2>`. At 430 px viewport with container double-padding, "Don't Wait — Get Help Now" at 30 px Playfair Display measures ~360 px wide — borderline. Wrap is acceptable.

3. **HIGH — The Urgency Hero uses `from-red-50/50` background but the CTA is green**
   `EnDentalEmergencyPage.tsx:156` and `:186` — Red urgency context + green WhatsApp CTA visually clash. Brand-system-wise the WhatsApp green is locked; consider an outline red secondary call-out or a small red icon next to the green button to harmonize.

4. **MEDIUM — Quick Info grid `md:grid-cols-3`** stacks fine on mobile.

5. **MEDIUM (Copy) — "Same-Day Care" in hero (`EnDentalEmergencyLPConfig.ts:17`) and "Same-Day Emergency Availability" in stats** verge on "guaranteed result" — CLAUDE.md §1.1 forbids guarantees. The current copy mitigates with "when available" and the disclaimer, but the headline alone reads as a guarantee. Soften to "Same-Day When Possible".

### 4.6 EnVeneersAndLensesPage.tsx — 56/100 ⚠️ worst score

1. **CRITICAL — `text-7xl` decorative quote marks**
   `EnVeneersAndLensesPage.tsx:602-603` —
   ```tsx
   <div className="absolute top-8 left-8 text-7xl text-dental-gold/20 font-serif leading-none">"</div>
   <div className="absolute bottom-8 right-8 text-7xl text-dental-gold/20 font-serif leading-none">"</div>
   ```
   `text-7xl` = 72 px. Decorative absolute-positioned with low opacity, but they live inside `p-12 rounded-3xl` (48 px padding). On 430 px viewport, `p-12` already eats 96 px → content area ~278 px. The two oversized quotes at `top-8 left-8 / bottom-8 right-8` may extend below/right beyond the card on iOS Safari subpixel rendering. Reduce to `text-5xl sm:text-7xl`.

2. **CRITICAL — `text-8xl` number background**
   `EnVeneersAndLensesPage.tsx:546` —
   ```tsx
   <div className="absolute top-4 right-6 text-8xl font-display font-bold text-dental-purple/5 select-none">{item.num}</div>
   ```
   `text-8xl` = 96 px. Absolute positioned, but on a `rounded-2xl shadow-md` card with `p-8`, a 96-px digit in the corner can push past the rounded corner clip if `overflow-hidden` is absent. The card *does* have `overflow-hidden` (line 545), so visually it's clipped — ✅ safe — but the visual is heavy on mobile.

3. **HIGH — Heading "What Few Explain About Lenses and Veneers"**
   `EnVeneersAndLensesPage.tsx:528` — `text-4xl md:text-5xl` (40 px / 48 px) — 7-word headline at 40 px on mobile = ~28 chars wide × 28 px = ~390 px line. Wraps to 2 lines, OK. But if the surrounding container has Systemic #1 padding stack, line-1 may include only "What Few Explain About" before wrapping ungracefully.

4. **HIGH — Comparison table at `overflow-x-auto`**
   `EnVeneersAndLensesPage.tsx:383` — Comparison table wrapped in `overflow-x-auto`. On mobile this means horizontal scroll *inside the page*, which conflicts with vertical scroll gestures on iOS. Consider stacking into 2 cards on mobile via a CSS class swap rather than horizontal scroll.

5. **HIGH — Italic pull-quote `text-2xl md:text-3xl text-dental-purple italic font-display leading-relaxed`**
   `EnVeneersAndLensesPage.tsx:605` — 24 px italic Playfair inside `p-12` (96 px total) container on a 430 px viewport leaves ~278 px content. A 30+ word quote will wrap into 7–8 lines. Acceptable but visually dense.

6. **MEDIUM — Grid `md:grid-cols-2 lg:grid-cols-3`** for indication cards — collapses cleanly to 1 column on mobile.

### 4.7 EnDentalProstheticsPage.tsx — 72/100

1. **MEDIUM — Typo / class error**: `text-dental-navy` on line 229. **This class does not exist** in `tailwind.config.ts` (only `dental-purple/gold/beige/gray` and variations defined). It will silently render unstyled. Replace with `text-dental-purple`.
2. **LOW** — Cards `grid md:grid-cols-2 lg:grid-cols-3` stack fine.

### 4.8 EnTeethWhiteningPage.tsx, EnGeneralDentistryPage.tsx, EnOrthodonticsPage.tsx, EnRootCanalPage.tsx, EnGumHealthPage.tsx, EnAestheticRestorationsPage.tsx — 72/100 each

These pages follow the established `text-3xl md:text-4xl` heading pattern and `grid md:grid-cols-*` mobile-collapsing grids. Findings are *systemic* (covered in §3) rather than page-specific. No CRITICAL items.

- **MEDIUM (Orthodontics)** — `EnOrthodonticsPage.tsx:369` — `w-32 h-32` fixed avatar inside a `text-center mb-4` block, with `mask-image-gradient` (a custom class I cannot find in `index.css` — verify it exists).
- **MEDIUM (Aesthetic Restorations)** — `EnAestheticRestorationsPage.tsx:153, 233` — `aspect-[4/3]` images inside `rounded-2xl` cards, sound.

### 4.9 EnCosmeticDentistryLP.tsx (config) — 56/100 ⚠️ blocking on copy

1. **CRITICAL — Price/discount reference** — `enCosmeticDentistryLPConfig.ts:76` — "**40-60 % less** than US/UK." This is a direct CRO/CFO violation per CLAUDE.md §1.1: "NUNCA mencionar preços — proibido pelo CRO em qualquer canal". **Remove this entire sentence.** Substitute: "Treatment investment varies by case. Send photos via WhatsApp and we'll discuss your specific plan."
2. **HIGH — Banned tone words in testimonials** ("Amazing", "Excellent", "brilliant") — see Systemic #3.
3. **MEDIUM — `urgency` field text** is gentle, OK.

### 4.10 EnDentalImplantsLP.tsx (config) — 67/100

1. **HIGH — Testimonials banned tone words** — same 3 quotes copy-pasted across 4 LP configs.
2. **MEDIUM — Stat "95%+ Implant Success Rate"** — `enDentalImplantsLPConfig.ts:63`. While this is a defensible clinical statistic (industry-standard for osseointegrated implants 90-98 %), citing it as a brand stat without a source can read as guaranteeing results. CLAUDE.md §1.1 forbids "garantir resultados". Soft fix: keep the stat but add an inline tooltip-style source ("industry literature, 5-year follow-up").

### 4.11 EnDentalEmergencyLP.tsx (config) — 67/100

1. **HIGH — "Transparent pricing"** — `enDentalEmergencyLPConfig.ts:75`. See Systemic #4. CRO violation.
2. **HIGH — Banned tone words in testimonials** — see Systemic #3.
3. **MEDIUM — "Same-Day Emergency Availability"** stat — guarantees a service that has a real Mon-Fri 9-7 constraint elsewhere on the page. Soften.

### 4.12 EnGeneralConsultationLP.tsx (config) — 67/100

1. **HIGH — "Transparent pricing — no surprises" in benefits** — `enGeneralConsultationLPConfig.ts:29`. CRO violation.
2. **HIGH — "clear, detailed cost estimates"** — line 74. Borderline. Safer: "clear, detailed treatment plan".
3. **HIGH — Banned tone words in testimonials** — see Systemic #3.

### 4.13 EnHeader.tsx — 78/100

1. **MEDIUM — Logo + Star badge + Hamburger on a 430 px row**
   `EnHeader.tsx:65-184` — Three elements horizontally: "Dr. Carla Christoph" at `text-2xl` (24 px Playfair) ~210 px wide + star badge (`px-2 py-1`) ~64 px + Menu icon 40 px + container padding ~48 px = **362 px total**. Tight but fits on 430 px. On 375 px (iPhone SE) it would clip.
   **Fix:** at mobile, shorten the logo to "Dra. Carla" or render at `text-xl`. Or hide the rating badge below `sm` and surface it in the mobile menu.

2. **LOW — Mobile menu is `fixed inset-0` with `pt-24`** — fully covers the viewport, scrollable. ✅

### 4.14 EnFooter.tsx — 78/100

1. **MEDIUM — 13-item navigation list in one column** (Systemic #5).
2. **MEDIUM — Email link without `break-all`** (Systemic finding).
3. **LOW — `grid md:grid-cols-3`** stacks cleanly on mobile.

### 4.15 EnStatsBar.tsx — 67/100

1. **HIGH — `grid grid-cols-2 md:grid-cols-4` with `gap-6 md:gap-8`**
   `EnStatsBar.tsx:130` — On 430 px viewport: usable width ≈ 374 px (container padding) → each column ~167 px. Each StatCounter renders icon (40 px) + gap-3 (12 px) + value (text-lg = 18 px, "4,000+" ≈ 65 px) + label below. Fits. BUT on 375 px viewport, column width drops to ~140 px and the icon takes 40 of those — "Years of Experience" label at `text-xs` (12 px) needs to wrap onto 2 lines.
   **Fix:** allow label wrap (it does), but consider `gap-2` instead of `gap-3` on mobile.

2. **MEDIUM — "27509" number is shown unanimated (CRO is not counted-up)** ✅ correct decision; just noting.

### 4.16 EnLPHero.tsx — 78/100

1. **HIGH — Long CTA text inside button**
   `EnLPHero.tsx:89-98` — Button shows `{ctaText}` which for cosmetic LP is "**Book Your Consultation — We Reply in Your Language**" (~46 chars). At `text-base sm:text-lg` (16/18 px), the full text consumes ~410 px at text-lg — would overflow the 374-px usable mobile content. **However**: the button is `w-full sm:w-auto`, so on mobile it's full width and the text wraps naturally (no `whitespace-nowrap`). ✅ safe, but tall.

2. **MEDIUM — Benefits list at `text-sm` with 6 items + checkmarks** — fine on mobile.

3. **LOW — `min-h-[100dvh]`** uses dynamic viewport — modern, correct for iOS.

---

## 5. Prioritized Execution Plan

### Wave 1 — CRITICAL, blocks ship today (≈ 1-2 hours)

| # | Action | File(s) | Effort |
|---|---|---|---|
| 1 | Remove "40-60 % less than US/UK" pricing claim | `enCosmeticDentistryLPConfig.ts:76` | 1-line edit |
| 2 | Remove "Transparent pricing — no surprises" benefit | `enGeneralConsultationLPConfig.ts:29` | 1-line edit |
| 3 | Remove "transparent pricing" FAQ answer | `enDentalEmergencyLPConfig.ts:75` | 1-line edit |
| 4 | Edit testimonials to drop "Amazing"/"Excellent"/"brilliant" while keeping the concrete facts | 4 LP configs | 4× rewrites, ~15 min total |
| 5 | Reduce `tailwind.config.ts` container padding to responsive scale | `tailwind.config.ts:14-19` | 1-line edit, propagates to ALL EN pages |
| 6 | Add `sm:` step to `.heading-xl` | `src/index.css:146-148` | 1-line edit |
| 7 | Add `max-w-full` to hero image fixed-width container | `EnHomePage.tsx:250` | 1-line edit |

After Wave 1 the site is shippable. Visual breathing room on iPhone will improve noticeably.

### Wave 2 — HIGH, hurts conversion (≈ 3-4 hours)

| # | Action | File(s) | Effort |
|---|---|---|---|
| 8 | Add `grid-cols-2` mobile default to credentials & stat grids that currently use `grid md:grid-cols-4` | `EnAboutPage.tsx:145`, others | 30 min |
| 9 | Replace `text-7xl` decorative quotes with `text-5xl sm:text-7xl` | `EnVeneersAndLensesPage.tsx:602,603` | 5 min |
| 10 | Replace `text-8xl` number bg with `text-6xl sm:text-8xl` | `EnVeneersAndLensesPage.tsx:546` | 5 min |
| 11 | Convert comparison table to stacked mobile cards | `EnVeneersAndLensesPage.tsx:380-` | 1-2 hours (restructuring) |
| 12 | Remove `whitespace-nowrap` on emergency CTA | `EnDentalEmergencyPage.tsx:186` | 1 line |
| 13 | Soften "Same-Day Care" to "Same-Day When Possible" in emergency LP hero & stats | `EnDentalEmergencyLPConfig.ts:17,62`, `EnDentalEmergencyPage.tsx:163` | 10 min |
| 14 | Fix `text-dental-navy` typo → `text-dental-purple` | `EnDentalProstheticsPage.tsx:229` | 1 line |
| 15 | Shrink EnHeader logo on `<sm` (use `text-xl sm:text-2xl`) and hide reviews badge on `<sm` | `EnHeader.tsx:66,75-85` | 5 min |
| 16 | Source-cite or soften "95%+ implant success rate" stat | `enDentalImplantsLPConfig.ts:63` | 5 min |
| 17 | Cite source or remove "90% of oral diseases are preventable" | `enGeneralConsultationLPConfig.ts:64` | 5 min |

### Wave 3 — MEDIUM polish (≈ 2-3 hours)

| # | Action | File(s) | Effort |
|---|---|---|---|
| 18 | Add `break-all` to email links | `EnContactPage.tsx:160`, `EnFooter.tsx:106` | 2 × 1-line |
| 19 | Split EnFooter Navigation column into 2-col sub-grid on mobile | `EnFooter.tsx:43-67` | 10 min |
| 20 | Tighten trust-badge gaps on EnHomePage hero | `EnHomePage.tsx:196` | 1 line |
| 21 | Verify `mask-image-gradient` custom class exists | `EnOrthodonticsPage.tsx:369`, `index.css` | 10 min |
| 22 | Reduce stats-bar `gap-3` to `gap-2` on mobile | `EnStatsBar.tsx:106` | 1 line |
| 23 | Soften "Excellent restorative results" / hyper-claim language across service pages | All service pages | 30 min audit |

### Shared-Component-First Recommendation

**One file change in `tailwind.config.ts` + one in `src/index.css` resolves the majority of mobile-overflow risk across all 17 EN pages.** Do those two edits before touching any individual page file. They are:

```ts
// tailwind.config.ts
container: {
  center: true,
  padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
  screens: { "2xl": "1400px" },
},
```

```css
/* src/index.css */
.heading-xl { @apply text-3xl sm:text-4xl xl:text-5xl font-display font-semibold leading-tight; }
.container-custom { @apply container mx-auto; } /* drop px-6 lg:px-8 — container already pads */
```

Together: **3 lines, 17 pages improved.**

---

## 6. Appendix — Tailwind Responsive Recipes for Recurring Patterns

### Recipe A — Hero headline
```tsx
<h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold leading-[1.15] text-balance">
  {headline}
</h1>
```
Always start at `text-3xl` on mobile; step at `sm` (640 px), not `md` (768 px).

### Recipe B — Multi-column card grid that must stack on mobile
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
```
Never write `grid md:grid-cols-3` alone — explicit `grid-cols-1` clarifies intent and helps purge-resistant.

### Recipe C — Stats / number bar
```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
```
2-up on mobile, 4-up at `sm`. Avoid `grid-cols-2 md:grid-cols-4` (the jump at md leaves a long stretch of 2-col on iPad portrait).

### Recipe D — Long CTA buttons
```tsx
<button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto rounded-lg">
```
Always `w-full sm:w-auto` for primary CTAs. Never `whitespace-nowrap` on user-facing text — only on numeric/SKU tokens.

### Recipe E — Long emails / URLs in cards
```tsx
<a href="mailto:..." className="break-all hover:text-dental-gold">contato@dracarlachristoph.com</a>
```

### Recipe F — Decorative oversized typography (quote marks, ghost numbers)
```tsx
<span className="text-5xl sm:text-7xl xl:text-8xl text-dental-gold/10 select-none pointer-events-none">"</span>
```
Always start small on mobile; combine with `overflow-hidden` on the parent.

### Recipe G — Container padding (already covered above)
```ts
container: { padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" } }
```
Never use a flat `padding: "2rem"` — it's the single most common source of mobile overflow on responsive Tailwind sites.

### Recipe H — Safe-area / notch handling for fixed headers
```tsx
<header className="fixed top-0 inset-x-0 pt-[env(safe-area-inset-top)] ...">
```
`EnHeader` currently does NOT account for the iOS safe-area inset — on iPhone 14 Pro Max the notch sits behind a `top-0` header. MEDIUM. Add `pt-[env(safe-area-inset-top)]` or wrap content in `pt-safe`.

---

## UI REVIEW COMPLETE
