"""
PSI field+lab probe — LP Consulta Inicial (diagnostico QS LP Experience, 2026-06-21).
Le a API key do arquivo da agencia (mesma usada pelos scripts de PSI deles).
Foco: dados de CAMPO (CrUX) — origin_fallback indica se a URL tem dados reais de usuario
suficientes (o que alimenta o componente 'Landing Page Experience' do Quality Score).
"""
import json, sys, urllib.request, urllib.parse

KEY_FILE = r"C:\IA\Projetos\Agencia de MKT\auth\pagespeed-api-key.txt"
with open(KEY_FILE) as f:
    API_KEY = f.read().strip()

# URL via argumento (replicavel para qualquer LP); default = consulta-inicial.
# Uso: python scripts/_psi_field_consulta.py [path-ou-url]
#   ex.: python scripts/_psi_field_consulta.py /lp/especialista-protese-ipanema
_arg = sys.argv[1] if len(sys.argv) > 1 else "/lp/consulta-inicial"
URL = _arg if _arg.startswith("http") else "https://dracarlachristoph.com" + _arg

def psi(url, strategy):
    api = ("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?"
           + urllib.parse.urlencode({"url": url, "strategy": strategy,
                                     "category": "performance", "key": API_KEY}))
    req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.load(resp)

def fmt_metric(m):
    if not m: return "n/a"
    return f"p75={m.get('percentile')} cat={m.get('category')}"

def show_field(label, le):
    if not le:
        print(f"  {label}: (ausente)")
        return
    of = le.get("origin_fallback", False)
    print(f"  {label}:")
    print(f"    overall_category : {le.get('overall_category')}")
    print(f"    origin_fallback  : {of}  <-- True = SEM dados de campo proprios da URL (caiu p/ origem)")
    mets = le.get("metrics", {})
    nice = {
        "LARGEST_CONTENTFUL_PAINT_MS": "LCP",
        "INTERACTION_TO_NEXT_PAINT": "INP",
        "CUMULATIVE_LAYOUT_SHIFT_SCORE": "CLS",
        "FIRST_CONTENTFUL_PAINT_MS": "FCP",
        "EXPERIMENTAL_TIME_TO_FIRST_BYTE": "TTFB",
    }
    for k, lab in nice.items():
        if k in mets:
            print(f"    {lab:5}: {fmt_metric(mets[k])}")

for strat in ("mobile", "desktop"):
    print("=" * 70)
    print(f"ESTRATEGIA: {strat.upper()}  —  {URL}")
    print("=" * 70)
    try:
        d = psi(URL, strat)
    except Exception as e:
        print(f"  ERRO: {type(e).__name__}: {str(e)[:200]}")
        continue
    # LAB
    lr = d.get("lighthouseResult", {})
    score = lr.get("categories", {}).get("performance", {}).get("score")
    a = lr.get("audits", {})
    def dv(k): return a.get(k, {}).get("displayValue", "-")
    print("\n[LAB / Lighthouse]")
    print(f"    Score: {round(score*100) if score is not None else '?'}/100")
    print(f"    LCP={dv('largest-contentful-paint')}  TBT={dv('total-blocking-time')}  "
          f"CLS={dv('cumulative-layout-shift')}  FCP={dv('first-contentful-paint')}  SI={dv('speed-index')}")
    # FIELD (CrUX)
    print("\n[CAMPO / CrUX — usuarios reais, ultimos 28d]")
    show_field("URL (loadingExperience)", d.get("loadingExperience"))
    show_field("ORIGEM (originLoadingExperience)", d.get("originLoadingExperience"))
    print()
