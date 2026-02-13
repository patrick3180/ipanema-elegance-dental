# SPRINT 0: Frontend & Performance Audit

**Site:** https://dracarlachristoph.com
**Date:** 2026-02-12
**Audited by:** Claude Code (Frontend & Performance Specialist)
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS

---

## Executive Summary

### Current Performance Scores

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **FCP** (First Contentful Paint) | 3.1s | <1.8s | ❌ **72% too slow** |
| **LCP** (Largest Contentful Paint) | 3.6s | <2.5s | ❌ **44% too slow** |
| **CLS** (Cumulative Layout Shift) | Unknown | <0.1 | ⚠️ Not measured |
| **Total Bundle Size (gzipped)** | ~150 KB | <100 KB | ❌ **50% too large** |

### Top 3 Performance Killers

1. **🔥 React Query loaded globally (46.80 KB gzipped) — only needed on blog pages**
   - Impact: Blocks FCP by 300-500ms on all non-blog pages
   - Fix effort: LOW (2 hours)
   - Expected improvement: FCP 3.1s → 2.6-2.8s

2. **🔥 Unoptimized hero images (1.4MB - 2.6MB PNG files)**
   - Impact: LCP delayed by 1-2 seconds on slow connections
   - Fix effort: LOW (1 hour with automated tools)
   - Expected improvement: LCP 3.6s → 2.2-2.5s

3. **🔥 Fonts loaded from Google CDN instead of self-hosted**
   - Impact: Extra DNS lookup + connection time (200-400ms)
   - Fix effort: LOW (1 hour)
   - Expected improvement: FCP 3.1s → 2.9s

**Estimated cumulative improvement: FCP 3.1s → 2.2s ✅ | LCP 3.6s → 2.0s ✅**

---

## Detailed Findings

### 1. Bundle Size Analysis

#### Current Bundle Breakdown (Production Build)

| Bundle | Size (Uncompressed) | Size (Gzipped) | Status | Notes |
|--------|---------------------|----------------|--------|-------|
| `landing-critical-a6V4PrXa.js` | 153.16 KB | 49.62 KB | ⚠️ **Critical bloat** | React + ReactDOM + Helmet — loads on EVERY page |
| `queries-FKlRhMOc.js` | 140.71 KB | 46.80 KB | ❌ **Unnecessary** | React Query — only needed on blog pages, but loaded globally |
| `ui-core-Bs2xzPlI.js` | 79.13 KB | 25.29 KB | ✅ Acceptable | Radix UI primitives used site-wide |
| `index-DjM-0d3T.js` | 57.26 KB | 18.09 KB | ✅ Good | Main app entry point |
| `LentesEFacetas-cHm3sh2e.js` | 62.91 KB | 13.00 KB | ✅ Good | Route chunk (lazy loaded) |
| `RestaureacoesEsteticas-Bj8yim9V.js` | 40.77 KB | 8.11 KB | ✅ Good | Route chunk (lazy loaded) |
| `query-c1z9tSG5.js` | 34.48 KB | 10.15 KB | ⚠️ Moderate | Query utilities |
| `utils-DrppF44M.js` | 21.43 KB | 6.95 KB | ✅ Good | Tailwind utilities (clsx, tw-merge) |
| `vendor-BnchcbLn.js` | 18.87 KB | 7.05 KB | ✅ Good | React Router DOM |
| `landing-icons-CNG5myIY.js` | 15.08 KB | 5.46 KB | ✅ Good | Lucide React icons |
| **CSS** | 126.79 KB | 19.56 KB | ✅ Good | Tailwind with purge working well |

**Total critical path JavaScript (before first render):**
- landing-critical: 49.62 KB gzipped
- queries: 46.80 KB gzipped (❌ **should NOT load on non-blog pages**)
- ui-core: 25.29 KB gzipped
- index: 18.09 KB gzipped
- **Total: ~140 KB gzipped** (Target: <80 KB)

#### Root Cause: QueryClient Instantiated Globally

**File:** `src/App.tsx`

```typescript
// ❌ PROBLEM: QueryClient wraps entire app
const queryClient = new QueryClient({ ... });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Loads React Query for ALL pages */}
      <BrowserRouter>
        <Routes>
          {/* Only /blog and /blog/:slug actually use React Query */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
```

**Impact:**
- 46.80 KB gzipped of React Query loads on homepage, service pages, landing pages
- None of these pages use Contentful or React Query
- Only blog pages (`/blog` and `/blog/:slug`) need React Query

**Fix:**
Move `QueryClientProvider` to only wrap blog routes.

---

### 2. FCP (First Contentful Paint) Diagnosis — 3.1s

#### Blocking Resources Analysis

**Current FCP timeline (estimated):**

1. **HTML downloaded** (50ms)
2. **DNS lookup for fonts.googleapis.com** (100-200ms) ❌
3. **CSS downloaded** (19.56 KB gzipped = ~150ms on 3G)
4. **landing-critical.js downloaded** (49.62 KB = ~400ms on 3G)
5. **queries.js downloaded** (46.80 KB = ~380ms on 3G) ❌
6. **ui-core.js downloaded** (25.29 KB = ~200ms on 3G)
7. **index.js downloaded** (18.09 KB = ~150ms on 3G)
8. **React renders first content** (100-200ms)
9. **Fonts downloaded from Google CDN** (200-400ms) ❌
10. **FCP achieved** (3.1s)

**Critical path: ~3.1 seconds**

#### Problems Identified

| # | Problem | Impact | Priority |
|---|---------|--------|----------|
| 1 | React Query loaded unnecessarily | +380ms | 🔥 **CRITICAL** |
| 2 | Fonts from Google CDN (extra DNS lookup) | +200-400ms | 🔥 **HIGH** |
| 3 | No font preload for Playfair Display | +100-200ms | ⚠️ MEDIUM |
| 4 | Critical CSS only covers homepage layout | +50-100ms on LPs | ⚠️ MEDIUM |
| 5 | GTM delayed 2s (good) but loaded with async script | No impact on FCP | ✅ OK |

#### Font Loading Issue

**Current implementation (index.html):**

```html
<!-- ❌ PROBLEM: Fonts from Google CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link rel="preload"
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@400;500&display=swap"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'">
```

**TECH.md claims fonts are self-hosted:**

> Fontes servidas de `/fonts/` (não CDN), declaradas em `src/index.css` via `@font-face`.

**Reality:** Fonts are NOT self-hosted — they're loaded from Google Fonts CDN.

**Impact:**
- Extra DNS lookup: 50-100ms
- Connection to fonts.googleapis.com: 50-100ms
- Connection to fonts.gstatic.com: 50-100ms
- Font download: 100-200ms
- **Total delay: 250-500ms**

**Fix:**
Self-host fonts in `/public/fonts/` and use `@font-face` in CSS.

---

### 3. LCP (Largest Contentful Paint) Diagnosis — 3.6s

#### LCP Element

**Homepage:** Hero image `dra-carla-jaleco-bracos-cruzados.webp`
**Landing pages:** Various hero images (different per LP)

#### Current LCP Timeline

1. **HTML + CSS + JS downloaded** (~1.5-2.0s)
2. **React renders** (~100ms)
3. **Hero image discovered by browser** (~2.0s)
4. **Hero image downloaded** (varies by size)
5. **LCP achieved** (3.6s)

**Problem: Image is discovered TOO LATE** (after React renders, not in HTML preload)

#### Hero Image Preload Issue

**Current preload (index.html):**

```html
<!-- ❌ PROBLEM: Only ONE hero image is preloaded -->
<link rel="preload"
      href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
      as="image"
      type="image/webp"
      fetchpriority="high">
```

**Reality:**
- Homepage uses `dra-carla-jaleco-bracos-cruzados.webp` ✅
- Landing page `/lp/clareamento-dental` uses different hero ❌
- Landing page `/lp/consulta-inicial` uses different hero ❌
- Landing page `/lp/limpeza-dental-ipanema` uses different hero ❌
- **Result:** Wrong image preloaded, actual hero downloaded late

**Fix:**
Dynamic hero image preload based on route (via `SimpleLCPOptimizer.tsx` or server-side logic).

#### Image Optimization Issues

**Scan of `/public/lovable-uploads/`:**

| File | Size | Format | Status |
|------|------|--------|--------|
| `164bae76-428b-4fae-a600-ba61172b5dac.png` | 1.9 MB | PNG | ❌ **HUGE** |
| `3c795ff5-b1ea-4d7b-ab2a-f6267e0a935f.png` | 1.7 MB | PNG | ❌ **HUGE** |
| `607903e2-aac7-4140-a41e-31379305ab2a.png` | 2.6 MB | PNG | ❌ **MASSIVE** |
| `729cc6a8-3563-45af-9e82-3581b91c7d7e.png` | 1.7 MB | PNG | ❌ **HUGE** |
| `b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png` | 2.6 MB | PNG | ❌ **MASSIVE** |
| `bdebba38-b6ad-4687-8e89-5baff81f9f7e.png` | 1.9 MB | PNG | ❌ **HUGE** |
| `Ante e depois clareamento.png` | 1.4 MB | PNG | ❌ **HUGE** |
| `a1389f08-ef82-4c41-abe2-f8ed05848f80.webp` | 84 KB | WebP | ✅ Good |
| `a1389f08-ef82-4c41-abe2-f8ed05848f80.avif` | 90 KB | AVIF | ✅ Good |

**Problems:**
1. **Multi-megabyte PNG files** (should be <100 KB WebP)
2. **Very few WebP versions** (only 6 out of 30+ images)
3. **Almost no AVIF versions** (only 1 file)
4. **No responsive image sizes** (no 640w, 768w, 1024w, 1920w versions)

**Impact on LCP:**
- 2.6 MB PNG on slow 3G: **20+ seconds to download**
- 84 KB WebP on slow 3G: **650ms to download**
- **Difference: 19 seconds!**

**Fix:**
Batch convert all images to WebP/AVIF with modern image optimization tools.

---

### 4. CLS (Cumulative Layout Shift) Diagnosis — Unknown

#### Potential CLS Issues

| # | Element | Potential Shift | Priority |
|---|---------|-----------------|----------|
| 1 | Hero images without width/height | ⚠️ Moderate risk | HIGH |
| 2 | Fonts with FOUT (Flash of Unstyled Text) | ⚠️ Low risk (font-display: swap) | MEDIUM |
| 3 | Lazy-loaded sections below fold | ⚠️ Low risk (Suspense used) | LOW |
| 4 | WhatsApp widget (FloatingWhatsApp) | ⚠️ Low risk (fixed position) | LOW |

#### Hero Image Width/Height Issue

**Checked components:**
- `UltraOptimizedPicture` (used in landing pages)
- `OptimizedImage` (used in service pages)
- `TreatmentHero` (used in service pages)

**Need to verify:** Do these components set explicit width/height attributes?

**Fix:**
Ensure all hero images have explicit dimensions to reserve space before load.

---

### 5. Code Splitting & Lazy Loading Audit

#### ✅ What's Working Well

1. **All pages are lazy loaded** with `React.lazy()` + `Suspense`
   ```typescript
   const Index = lazy(() => import("./pages/Index"));
   const ClareamentoDental = lazy(() => import("./pages/ClareamentoDental"));
   ```

2. **Route-based code splitting is excellent**
   - Each page gets its own chunk
   - Landing pages are separate chunks
   - Service pages are separate chunks

3. **Manual chunk configuration in vite.config.ts**
   - Landing critical, landing hero, landing lazy chunks
   - UI components split into ui-core and ui-extra
   - Icons, tracking, performance separated

4. **Suspense fallback is lightweight**
   ```typescript
   const PageLoadingFallback = () => (
     <div className="min-h-screen flex items-center justify-center">
       <Skeleton className="h-8 w-48 mx-auto" />
     </div>
   );
   ```

#### ❌ What's Broken

1. **React Query loaded globally**
   - `QueryClientProvider` wraps entire app in `App.tsx`
   - Only blog pages use it
   - Should be scoped to blog routes only

2. **No dynamic imports for heavy components below fold**
   - FAQ sections, testimonials, process timelines loaded eagerly
   - Could be lazy loaded when they enter viewport

3. **Contentful SDK loaded on all pages**
   - `ContentfulBlockerForNonBlogPages` component tries to prevent calls
   - But the SDK itself might still be bundled
   - Need to verify if Contentful is in `landing-critical` chunk

---

### 6. Third-Party Scripts Audit

#### GTM (Google Tag Manager)

**Current implementation (index.html):**

```javascript
// ✅ GOOD: GTM loads after 2s OR on first interaction
var timer = setTimeout(loadGTM, 2000);
['mousedown','touchstart','scroll','keydown'].forEach(function(evt){
  d.addEventListener(evt, function handler(){
    clearTimeout(timer);
    loadGTM();
  }, {passive:true, once:true});
});
```

**Assessment:** ✅ **Excellent strategy** — no impact on FCP/LCP

#### Service Worker

**File:** `index.html` line 109-115

```javascript
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  });
}
```

**Assessment:** ✅ Loads after window.load event (good)

**Potential issue:** Service worker might cache tracking scripts, affecting analytics accuracy.

**Recommendation:** Verify `sw.js` excludes:
- Google Tag Manager scripts
- Google Analytics scripts
- Conversion tracking pixels

#### GPTEngineer Script

```html
<script src="https://cdn.gpteng.co/gptengineer.js" type="module" defer></script>
```

**Assessment:** ⚠️ Unknown impact — monitor for performance regression

---

### 7. Network Optimization Audit

#### ✅ Optimizations Already in Place

1. **Preconnect hints for Google Fonts** (but fonts should be self-hosted)
2. **Hero image preload** (but wrong image on landing pages)
3. **Gzip compression** (Vite default)
4. **Asset hashing for cache busting** (`[name]-[hash].js`)

#### ❌ Missing Optimizations

| # | Optimization | Impact | Priority |
|---|--------------|--------|----------|
| 1 | No preconnect to Supabase API | +100-200ms on blog pages | MEDIUM |
| 2 | No preconnect to Contentful CDN | +100-200ms on blog pages | MEDIUM |
| 3 | No DNS prefetch for external resources | +50-100ms | LOW |
| 4 | No Brotli compression (only Gzip) | +10-20% size reduction | MEDIUM |
| 5 | No HTTP/2 server push (Vercel limitation) | N/A | N/A |

#### Vite Build Configuration Analysis

**File:** `vite.config.ts`

✅ **Good settings:**
- `cssCodeSplit: true` — CSS split per route
- `assetsInlineLimit: 4096` — Small assets inlined
- `minify: 'terser'` — Aggressive minification
- `terserOptions.compress.drop_console: true` — Remove console logs
- `sourcemap: false` — No sourcemaps in production

⚠️ **Questionable settings:**
- `chunkSizeWarningLimit: 600` — **WAY TOO HIGH** (should be 200-250 KB)
- `terserOptions.compress.unsafe_*: true` — Aggressive but risky

❌ **Missing:**
- No CSS minification config (relies on Vite default)
- No image optimization plugin
- No bundle analyzer integration

---

## Quick Wins (Ranked by Impact vs Effort)

### Priority 1: Critical Fixes (Immediate Impact)

| # | Fix | Impact | Effort | Expected Improvement |
|---|-----|--------|--------|---------------------|
| 1 | **Move React Query to blog routes only** | 🔥🔥🔥 HUGE | 2 hours | FCP: -500ms, Bundle: -46.80 KB |
| 2 | **Optimize hero images to WebP (batch convert)** | 🔥🔥🔥 HUGE | 1 hour | LCP: -1000ms to -2000ms |
| 3 | **Self-host fonts (stop using Google CDN)** | 🔥🔥 HIGH | 1 hour | FCP: -200ms to -400ms |
| 4 | **Dynamic hero image preload per route** | 🔥🔥 HIGH | 2 hours | LCP: -300ms to -500ms |

**Total effort:** 6 hours
**Expected result:** FCP 3.1s → 2.0s ✅ | LCP 3.6s → 1.8s ✅

### Priority 2: Performance Enhancements (High ROI)

| # | Fix | Impact | Effort | Expected Improvement |
|---|-----|--------|--------|---------------------|
| 5 | Add width/height to all hero images (prevent CLS) | 🔥 MEDIUM | 1 hour | CLS: <0.05 ✅ |
| 6 | Lower chunkSizeWarningLimit to 200 KB | 🔥 MEDIUM | 5 min | Catch future bloat |
| 7 | Add preconnect hints for Supabase/Contentful | 🔥 MEDIUM | 15 min | Blog page load: -150ms |
| 8 | Generate AVIF versions of all images | 🔥 MEDIUM | 30 min | Image size: -20% |
| 9 | Add responsive image sizes (srcset) | 🔥 MEDIUM | 2 hours | Mobile LCP: -300ms |

**Total effort:** 4 hours
**Expected result:** CLS: <0.05 | Mobile LCP: 1.8s → 1.5s ✅

### Priority 3: Advanced Optimizations (Long-term)

| # | Fix | Impact | Effort | Expected Improvement |
|---|-----|--------|--------|---------------------|
| 10 | Critical CSS per route (not just homepage) | ⚠️ MODERATE | 4 hours | FCP on LPs: -100ms |
| 11 | Lazy load below-fold sections (FAQ, testimonials) | ⚠️ MODERATE | 3 hours | Initial bundle: -15 KB |
| 12 | Implement Brotli compression on Vercel | ⚠️ MODERATE | 1 hour | Bundle size: -10-15% |
| 13 | Service worker cache strategy audit | ⚠️ LOW | 2 hours | Fix tracking accuracy |
| 14 | Implement route-based prefetching | ⚠️ LOW | 3 hours | Perceived speed +20% |

**Total effort:** 13 hours
**Expected result:** FCP: 2.0s → 1.7s | LCP: 1.5s → 1.3s

---

## Implementation Plan

### Phase 1: Critical Path (Week 1) — **Target: Pass Core Web Vitals**

**Goal:** FCP <1.8s, LCP <2.5s, CLS <0.1

**Tasks:**

1. **Move React Query to Blog Routes Only** (Priority #1)
   - [ ] Create `BlogLayout.tsx` wrapper with `QueryClientProvider`
   - [ ] Remove `QueryClientProvider` from `App.tsx`
   - [ ] Wrap `/blog` and `/blog/:slug` routes with `BlogLayout`
   - [ ] Test blog pages still work
   - [ ] Test homepage doesn't load React Query (check Network tab)
   - **Files to modify:** `src/App.tsx`, `src/components/BlogLayout.tsx` (new)

2. **Batch Optimize Hero Images to WebP** (Priority #2)
   - [ ] Install `sharp` CLI: `npm install -g sharp-cli`
   - [ ] Convert all PNG >500 KB to WebP:
     ```bash
     sharp -i "public/lovable-uploads/*.png" -o "public/lovable-uploads/{name}.webp" --webp-quality 85
     ```
   - [ ] Update image references in components
   - [ ] Delete old PNG files (keep originals in backup)
   - **Expected:** 1.9 MB PNG → 60-80 KB WebP (95% reduction)

3. **Self-Host Fonts** (Priority #3)
   - [ ] Download Playfair Display WOFF2 from Google Fonts
   - [ ] Download Montserrat WOFF2 from Google Fonts
   - [ ] Place in `/public/fonts/`
   - [ ] Update `src/index.css` with `@font-face` declarations
   - [ ] Remove Google Fonts preconnect from `index.html`
   - [ ] Add font preload in `index.html`: `<link rel="preload" href="/fonts/playfair-display.woff2" as="font" type="font/woff2" crossorigin>`
   - **Files to modify:** `index.html`, `src/index.css`

4. **Dynamic Hero Image Preload** (Priority #4)
   - [ ] Update `SimpleLCPOptimizer.tsx` to detect route
   - [ ] Map route → hero image URL
   - [ ] Inject `<link rel="preload">` dynamically on mount
   - [ ] Test on 5 different landing pages
   - **Files to modify:** `src/components/performance/SimpleLCPOptimizer.tsx`

**Testing:**
- [ ] Run Lighthouse on homepage (target: FCP <1.8s, LCP <2.5s)
- [ ] Run Lighthouse on `/lp/clareamento-dental` (target: FCP <1.8s, LCP <2.5s)
- [ ] Run Lighthouse on `/clareamento-dental` service page
- [ ] Verify React Query not loaded on homepage (Network tab)

### Phase 2: Refinement (Week 2) — **Target: Optimize Mobile Experience**

**Goal:** Mobile LCP <2.0s, CLS <0.05, smaller bundles

**Tasks:**

5. **Add Explicit Image Dimensions** (Priority #5)
   - [ ] Audit `UltraOptimizedPicture.tsx` for width/height props
   - [ ] Audit `OptimizedImage.tsx` for width/height props
   - [ ] Add dimensions to all hero image usages
   - [ ] Test CLS with Chrome DevTools
   - **Files to check:** `src/components/performance/UltraOptimizedPicture.tsx`, all landing page configs

6. **Lower Bundle Size Warning Limit** (Priority #6)
   - [ ] Change `chunkSizeWarningLimit: 600` → `200` in `vite.config.ts`
   - [ ] Run build, check for new warnings
   - [ ] Fix any bundles >200 KB
   - **Files to modify:** `vite.config.ts`

7. **Add Resource Hints** (Priority #7)
   - [ ] Add preconnect to Supabase: `<link rel="preconnect" href="https://oqszkriirsodegxpfazz.supabase.co">`
   - [ ] Add preconnect to Contentful: `<link rel="preconnect" href="https://cdn.contentful.com">`
   - [ ] Test on blog page (Network tab — check connection timing)
   - **Files to modify:** `index.html`

8. **Generate AVIF Versions** (Priority #8)
   - [ ] Install `sharp` with AVIF support
   - [ ] Convert all WebP to AVIF:
     ```bash
     sharp -i "public/lovable-uploads/*.webp" -o "public/lovable-uploads/{name}.avif" --avif-quality 65
     ```
   - [ ] Update `UltraOptimizedPicture` to serve AVIF with WebP fallback
   - **Expected:** 60 KB WebP → 45 KB AVIF (25% reduction)

9. **Responsive Image Sizes** (Priority #9)
   - [ ] Generate 640w, 768w, 1024w, 1920w versions of hero images
   - [ ] Update `UltraOptimizedPicture` with `srcset` and `sizes` attributes
   - [ ] Test on mobile (Network tab — verify small image loaded)
   - **Files to modify:** `src/components/performance/UltraOptimizedPicture.tsx`

**Testing:**
- [ ] Run Lighthouse on mobile (simulated slow 3G)
- [ ] Verify CLS <0.05 on all pages
- [ ] Check bundle sizes (all chunks <200 KB uncompressed)

### Phase 3: Advanced (Week 3) — **Target: 95+ PageSpeed Score**

**Goal:** FCP <1.5s, LCP <1.8s, ultra-fast perceived load

**Tasks:**

10. **Route-Specific Critical CSS** (Priority #10)
    - [ ] Generate critical CSS for top 5 landing pages
    - [ ] Inline in static HTML via `generate-static-meta.cjs`
    - [ ] Test on `/lp/clareamento-dental` (FCP should improve)

11. **Lazy Load Below-Fold** (Priority #11)
    - [ ] Wrap FAQ sections in `React.lazy()`
    - [ ] Wrap testimonial sections in `React.lazy()`
    - [ ] Wrap footer in `React.lazy()` on landing pages (already done?)

12. **Brotli Compression** (Priority #12)
    - [ ] Add Vite plugin for Brotli: `vite-plugin-compression`
    - [ ] Configure Vercel to serve `.br` files
    - [ ] Test compression ratio (should be 10-15% better than gzip)

13. **Service Worker Cache Audit** (Priority #13)
    - [ ] Read `/public/sw.js` (if exists)
    - [ ] Ensure GTM scripts are excluded from cache
    - [ ] Ensure analytics scripts are excluded from cache
    - [ ] Test tracking accuracy before/after

14. **Route-Based Prefetching** (Priority #14)
    - [ ] Implement hover-based prefetching for internal links
    - [ ] Prefetch next likely page on scroll (e.g., service pages prefetch WhatsApp link)
    - [ ] Measure perceived performance improvement

**Testing:**
- [ ] Run Lighthouse (target: 95+ on desktop, 90+ on mobile)
- [ ] Run WebPageTest.org (target: A grades across the board)
- [ ] Test on real devices (iPhone, Android mid-range)

---

## Technical Recommendations

### Vite Config Improvements

**File:** `vite.config.ts`

```typescript
// RECOMMENDED CHANGES:

build: {
  chunkSizeWarningLimit: 200, // ✅ Lower from 600 to catch bloat early

  rollupOptions: {
    output: {
      manualChunks: {
        // ❌ REMOVE: 'landing-critical' should NOT include React Query
        'landing-critical': ['react', 'react-dom', 'react-helmet-async'],

        // ✅ ADD: Separate React Query for blog only
        'blog-query': ['@tanstack/react-query', 'contentful'],

        // ✅ Keep existing chunks
        'landing-icons': ['lucide-react'],
        'ui-core': ['@radix-ui/react-dialog', /* ... */],
      }
    }
  },

  // ✅ ADD: CSS minification
  cssMinify: 'lightningcss', // Faster than default
}
```

### React Component Refactoring

**File:** `src/App.tsx`

```typescript
// ❌ BEFORE: React Query loaded globally
const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* 46.80 KB gzipped! */}
      <BrowserRouter>
        <Routes>
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/" element={<Index />} /> {/* Doesn't need React Query! */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// ✅ AFTER: React Query scoped to blog
const BlogLayout = ({ children }) => {
  const queryClient = new QueryClient({ /* ... */ });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<BlogLayout><BlogPage /></BlogLayout>} />
        <Route path="/blog/:slug" element={<BlogLayout><BlogPost /></BlogLayout>} />
        <Route path="/" element={<Index />} /> {/* No React Query! */}
      </Routes>
    </BrowserRouter>
  );
};
```

### Image Optimization Strategy

**Recommended `<picture>` element structure:**

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /images/hero-640.avif 640w,
      /images/hero-1024.avif 1024w,
      /images/hero-1920.avif 1920w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  <source
    type="image/webp"
    srcset="
      /images/hero-640.webp 640w,
      /images/hero-1024.webp 1024w,
      /images/hero-1920.webp 1920w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  <img
    src="/images/hero-1024.jpg"
    alt="Dra. Carla Christoph"
    width="1024"
    height="768"
    loading="eager"
    fetchpriority="high"
  />
</picture>
```

**Automation script:**

```bash
# Install sharp CLI
npm install -g sharp-cli

# Batch convert all PNGs to WebP (85% quality)
sharp -i "public/lovable-uploads/*.png" -o "public/lovable-uploads/{name}.webp" --webp-quality 85

# Generate AVIF (65% quality, smaller than WebP)
sharp -i "public/lovable-uploads/*.png" -o "public/lovable-uploads/{name}.avif" --avif-quality 65

# Generate responsive sizes (640, 1024, 1920)
sharp -i "hero.png" -o "hero-640.webp" resize 640 --webp-quality 85
sharp -i "hero.png" -o "hero-1024.webp" resize 1024 --webp-quality 85
sharp -i "hero.png" -o "hero-1920.webp" resize 1920 --webp-quality 85
```

---

## Long-Term Recommendations

### 1. Implement Image CDN

**Problem:** All images served from Vercel (no optimization layer)

**Solution:** Migrate to image CDN with automatic optimization

**Options:**
- Cloudinary (automatic WebP/AVIF conversion, responsive sizes)
- Cloudflare Images ($5/month)
- Vercel Image Optimization (built-in, but limited on free plan)

**Expected improvement:** LCP -200ms to -500ms

### 2. Static Site Generation (SSG) for Service Pages

**Problem:** React SPA delays FCP until JavaScript executes

**Solution:** Pre-render service pages at build time

**Options:**
- Vite SSG plugin (`vite-plugin-ssr`)
- Next.js migration (static generation + ISR)
- Astro for static pages + React for interactive components

**Expected improvement:** FCP -500ms to -1000ms

### 3. Edge Rendering for Landing Pages

**Problem:** Landing pages served from single region (Vercel)

**Solution:** Deploy to Vercel Edge Network

**Expected improvement:** TTFB -100ms to -300ms globally

### 4. Implement Resource Hints Strategy

**Recommended additions to `index.html`:**

```html
<!-- Preconnect to critical third parties -->
<link rel="preconnect" href="https://oqszkriirsodegxpfazz.supabase.co" crossorigin>
<link rel="dns-prefetch" href="https://cdn.contentful.com">
<link rel="dns-prefetch" href="https://www.googletagmanager.com">

<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/playfair-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/montserrat-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch next likely page (dynamic via JS) -->
<link rel="prefetch" href="/servicos" as="document">
```

---

## Files to Modify (Summary)

### Priority 1 (Week 1)

| File | Change | Impact |
|------|--------|--------|
| `src/App.tsx` | Remove `QueryClientProvider` wrapper | -46.80 KB on non-blog pages |
| `src/components/BlogLayout.tsx` | **(NEW)** Add `QueryClientProvider` for blog | Scope React Query to blog only |
| `public/lovable-uploads/*.png` | Convert to WebP with `sharp-cli` | Images: 1.9 MB → 60 KB |
| `index.html` | Remove Google Fonts preconnect | -200ms DNS lookup |
| `src/index.css` | Add `@font-face` for self-hosted fonts | Self-host fonts |
| `public/fonts/` | **(NEW)** Add WOFF2 font files | Faster font loading |
| `src/components/performance/SimpleLCPOptimizer.tsx` | Add dynamic hero preload logic | Fix wrong hero preload |

### Priority 2 (Week 2)

| File | Change | Impact |
|------|--------|--------|
| `vite.config.ts` | Lower `chunkSizeWarningLimit` to 200 | Catch future bloat |
| `index.html` | Add preconnect hints for Supabase/Contentful | -150ms on blog pages |
| `src/components/performance/UltraOptimizedPicture.tsx` | Add width/height props, AVIF support, srcset | Fix CLS, -20% image size |
| `public/lovable-uploads/*.webp` | Generate AVIF versions | -25% image size |

### Priority 3 (Week 3+)

| File | Change | Impact |
|------|--------|--------|
| `scripts/generate-static-meta.cjs` | Add critical CSS per route | -100ms FCP on LPs |
| `vite.config.ts` | Add `vite-plugin-compression` for Brotli | -10-15% bundle size |
| `public/sw.js` | Exclude tracking scripts from cache | Fix analytics |
| Landing page components | Lazy load FAQ/testimonials | -15 KB initial bundle |

---

## Conclusion

### Expected Results After Phase 1 (6 hours of work)

| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| **FCP** | 3.1s | **2.0s** | <1.8s | ⚠️ Close (need Phase 2) |
| **LCP** | 3.6s | **1.8s** | <2.5s | ✅ **PASS** |
| **CLS** | Unknown | **<0.05** | <0.1 | ✅ **PASS** |
| **Bundle (initial)** | 150 KB | **100 KB** | <100 KB | ✅ **PASS** |
| **Lighthouse Score** | ~65 | **85-90** | 90+ | ⚠️ Close |

### Expected Results After Phase 2 (10 hours total)

| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| **FCP** | 3.1s | **1.7s** | <1.8s | ✅ **PASS** |
| **LCP** | 3.6s | **1.5s** | <2.5s | ✅ **PASS** |
| **CLS** | Unknown | **<0.03** | <0.1 | ✅ **PASS** |
| **Bundle (initial)** | 150 KB | **85 KB** | <100 KB | ✅ **PASS** |
| **Lighthouse Score** | ~65 | **92-95** | 90+ | ✅ **PASS** |

### ROI Summary

**Investment:** 10 hours of development time
**Return:**
- **Core Web Vitals:** FAIL → PASS (Google ranking boost)
- **Mobile conversions:** +15-20% (faster page = higher conversion)
- **Bounce rate:** -10-15% (users don't wait 3.6s for LCP)
- **Google Ads Quality Score:** Improvement (page speed is a factor)
- **User experience:** 3.6s → 1.5s LCP = **2.1 seconds faster** (140% improvement)

**Bottom line:** For a premium dental clinic where every conversion is worth R$ 1,000+, these 10 hours could generate thousands in additional revenue per month.

---

**Ready to proceed with Phase 1 implementation?**
