"""Sprint 4 Smoke Tests - SEO Quick Wins"""
from playwright.sync_api import sync_playwright
import json
import sys

BASE = "http://localhost:8090"
passed = 0
failed = 0

def test(name, condition):
    global passed, failed
    if condition:
        print(f"  PASS: {name}")
        passed += 1
    else:
        print(f"  FAIL: {name}")
        failed += 1

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # --- Test 1: RestaureacoesEsteticas schemas ---
    print("\n[1] RestaureacoesEsteticas.tsx schemas")
    page.goto(f"{BASE}/restauracoes-esteticas")
    page.wait_for_load_state("networkidle")

    scripts = page.locator('script[type="application/ld+json"]').all()
    schemas = []
    for s in scripts:
        try:
            schemas.append(json.loads(s.inner_text()))
        except:
            pass

    schema_types = [s.get("@type") for s in schemas]
    test("Has MedicalProcedure schema", "MedicalProcedure" in schema_types)
    test("Has FAQPage schema", "FAQPage" in schema_types)

    faq_schema = next((s for s in schemas if s.get("@type") == "FAQPage"), None)
    if faq_schema:
        test("FAQPage has 8 questions", len(faq_schema.get("mainEntity", [])) == 8)
    else:
        test("FAQPage has 8 questions", False)

    og_image = page.locator('meta[property="og:image"]').get_attribute("content")
    test("og:image is absolute URL", og_image and og_image.startswith("https://"))

    # --- Test 2: ClinicaGeralPrevencao schemas ---
    print("\n[2] ClinicaGeralPrevencao.tsx schemas")
    page.goto(f"{BASE}/clinica-geral-e-prevencao")
    page.wait_for_load_state("networkidle")

    scripts = page.locator('script[type="application/ld+json"]').all()
    schemas = []
    for s in scripts:
        try:
            schemas.append(json.loads(s.inner_text()))
        except:
            pass

    schema_types = [s.get("@type") for s in schemas]
    test("Has MedicalProcedure schema", "MedicalProcedure" in schema_types)
    test("Has FAQPage schema", "FAQPage" in schema_types)

    faq_schema = next((s for s in schemas if s.get("@type") == "FAQPage"), None)
    if faq_schema:
        test("FAQPage has 10 questions", len(faq_schema.get("mainEntity", [])) == 10)
    else:
        test("FAQPage has 10 questions", False)

    # --- Test 3: ProteseDentaria FAQPage + title ---
    print("\n[3] ProteseDentaria.tsx FAQPage + title")
    page.goto(f"{BASE}/protese-dentaria")
    page.wait_for_load_state("networkidle")

    title = page.title()
    test("Title has brand name", "Dra. Carla Christoph" in title)

    scripts = page.locator('script[type="application/ld+json"]').all()
    schemas = []
    for s in scripts:
        try:
            schemas.append(json.loads(s.inner_text()))
        except:
            pass

    schema_types = [s.get("@type") for s in schemas]
    test("Has MedicalProcedure schema", "MedicalProcedure" in schema_types)
    test("Has FAQPage schema", "FAQPage" in schema_types)

    faq_schema = next((s for s in schemas if s.get("@type") == "FAQPage"), None)
    if faq_schema:
        test("FAQPage has 12 questions", len(faq_schema.get("mainEntity", [])) == 12)
    else:
        test("FAQPage has 12 questions", False)

    # --- Test 4: og:image absolute in LPs ---
    print("\n[4] og:image absolute URLs in LPs")
    for lp_path, lp_name in [
        ("/lp/consulta-inicial", "ConsultaInicial"),
        ("/lp/ortodontia-ipanema", "Ortodontia"),
        ("/lp/limpeza-dental-ipanema", "Profilaxia"),
    ]:
        page.goto(f"{BASE}{lp_path}")
        page.wait_for_load_state("networkidle")
        og = page.locator('meta[property="og:image"]').get_attribute("content")
        test(f"{lp_name} og:image absolute", og and og.startswith("https://"))

    # --- Test 5: SEODashboard noindex ---
    print("\n[5] SEODashboard noindex")
    page.goto(f"{BASE}/seo-dashboard")
    page.wait_for_load_state("networkidle")
    robots = page.locator('meta[name="robots"]').get_attribute("content")
    test("Has noindex", robots and "noindex" in robots)

    # --- Test 6: Key pages still load ---
    print("\n[6] Key pages smoke test")
    for path, name in [
        ("/", "Homepage"),
        ("/implantes-dentarios", "Implantes"),
        ("/clareamento-dental", "Clareamento"),
        ("/blog", "Blog"),
        ("/servicos", "Servicos"),
    ]:
        resp = page.goto(f"{BASE}{path}")
        test(f"{name} loads (200)", resp and resp.status == 200)

    browser.close()

print(f"\n{'='*40}")
print(f"Results: {passed} passed, {failed} failed out of {passed+failed}")
print(f"{'='*40}")

sys.exit(0 if failed == 0 else 1)
