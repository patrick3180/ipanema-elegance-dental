#!/usr/bin/env python3
"""
Sprint 5 — AI Search Optimization — Smoke Tests

Verifica que o pre-rendering está funcionando:
1. Service pages têm schemas JSON-LD (MedicalProcedure + FAQPage + Dentist)
2. Service pages têm conteúdo fallback no <div id="root">
3. Pages têm schemas no HTML estático (não via React)
4. Blog posts foram gerados
"""

import sys
import time
import os
from pathlib import Path
from playwright.sync_api import sync_playwright


BASE_URL = "http://localhost:8090"
DIST_DIR = Path(__file__).parent.parent / "dist"


def test_service_page_schemas(page):
    """Testa schemas em uma service page"""
    # Read static HTML file directly (before React)
    html_path = DIST_DIR / "implantes-dentarios.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        raw_html = f.read()

    # Verify schemas are in raw HTML (not injected by React)
    assert '"@type":"MedicalProcedure"' in raw_html, "MedicalProcedure schema missing"
    assert '"@type":"FAQPage"' in raw_html, "FAQPage schema missing"
    assert '"@type":"Dentist"' in raw_html, "Dentist schema missing"
    assert 'CRO-RJ' in raw_html, "CRO-RJ credential missing"
    print(f"[OK] Service page has all 3 schemas in static HTML")


def test_service_page_fallback_content(page):
    """Testa conteúdo fallback no <div id='root'>"""
    # Read static HTML file directly
    html_path = DIST_DIR / "clareamento-dental.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract content between <div id="root"> and </div> (first occurrence)
    root_start = html.find('<div id="root">')
    root_end = html.find('</div>', root_start + 15)  # Find closing div after the opening
    root_content = html[root_start:root_end+6]

    # Verify fallback content exists
    assert "<header" in root_content, "[X] Fallback header missing"
    assert "<main" in root_content, "[X] Fallback main missing"
    assert "<footer" in root_content, "[X] Fallback footer missing"
    assert "Clareamento Dental" in root_content, "[X] H1 missing in fallback"
    assert "<dt>" in root_content, "[X] FAQ questions missing in fallback"
    assert "CRO-RJ 27.509" in root_content, "[X] CRO missing in fallback footer"
    print(f"[OK] Service page has semantic fallback content in <div id='root'>")


def test_all_service_pages_have_schemas(page):
    """Testa que todas as 10 service pages têm schemas"""
    service_pages = [
        "implantes-dentarios.html",
        "clareamento-dental.html",
        "lentes-de-contato-dental-e-facetas-de-resina.html",
        "lentes-de-contato-dental-e-facetas-de-porcelana.html",
        "protese-dentaria.html",
        "restauracoes-esteticas.html",
        "tratamento-de-canal.html",
        "saude-da-gengiva.html",
        "ortodontia.html",
        "clinica-geral-e-prevencao.html"
    ]

    for filename in service_pages:
        html_path = DIST_DIR / filename
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()

        assert '"@type":"MedicalProcedure"' in html or '"@type":"Person"' in html, f"[X] {filename} missing procedure/person schema"
        assert '"@type":"FAQPage"' in html, f"[X] {filename} missing FAQPage schema"
        assert '"@type":"Dentist"' in html, f"[X] {filename} missing Dentist schema"

    print(f"[OK] All {len(service_pages)} service pages have required schemas")


def test_info_pages_have_dentist_schema(page):
    """Testa que info pages têm Dentist schema"""
    info_pages = ["sobre.html", "servicos.html", "blog.html", "contato.html", "diferenciais.html"]

    for filename in info_pages:
        html_path = DIST_DIR / filename
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()

        assert '"@type":"Dentist"' in html, f"[X] {filename} missing Dentist schema"
        assert 'CRO-RJ' in html, f"[X] {filename} missing CRO credential"

    print(f"[OK] All {len(info_pages)} info pages have Dentist schema")


def test_landing_pages_have_noindex(page):
    """Testa que landing pages têm noindex"""
    lps = [
        "lp/limpeza-dental-ipanema.html",
        "lp/consulta-inicial.html",
        "lp/ortodontia-ipanema.html"
    ]

    for filepath in lps:
        html_path = DIST_DIR / filepath
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()

        assert 'noindex' in html, f"[X] {filepath} missing noindex tag"

    print(f"[OK] All {len(lps)} tested landing pages have noindex")


def test_faq_schema_has_real_data(page):
    """Testa que FAQPage schema tem dados reais (não placeholders)"""
    html_path = DIST_DIR / "implantes-dentarios.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Verify specific FAQ data from our script
    assert "O que são implantes dentários?" in html, "[X] FAQ question missing"
    assert "titânio biocompatível" in html, "[X] FAQ answer missing"
    assert "osseointegração" in html, "[X] Technical term missing in FAQ"
    print(f"[OK] FAQPage schema contains real FAQ data")


def test_blog_posts_exist(page):
    """Testa que posts de blog foram gerados"""
    # Test a few known blog slugs
    test_slugs = [
        "blog/implante-dentario-beneficios-e-recuperacao/index.html",
        "blog/odontologia-estetica-clareamento-dental-caseiro/index.html"
    ]

    for filepath in test_slugs:
        html_path = DIST_DIR / filepath
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()

        assert ('"@type":"BlogPosting"' in html or '"@type": "BlogPosting"' in html), f"[X] {filepath} missing BlogPosting schema"
        assert 'CRO-RJ' in html, f"[X] {filepath} missing author credentials in schema"
        assert 'Ver artigo completo no site' in html, f"[X] {filepath} missing CTA"

    print(f"[OK] Blog posts are pre-rendered with schemas")


def test_blog_author_schema_enriched(page):
    """Testa que o author schema do blog está enriquecido"""
    html_path = DIST_DIR / "blog/implante-dentario-beneficios-e-recuperacao/index.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Check for enriched author data
    assert ('"jobTitle":"Dentista Especialista em Prótese Dental"' in html or '"jobTitle": "Dentista Especialista em Prótese Dental"' in html), "[X] Author jobTitle missing"
    assert ('"credentialCategory":"CRO-RJ"' in html or '"credentialCategory": "CRO-RJ"' in html), "[X] Author credential missing"
    assert ('"identifier":"27.509"' in html or '"identifier": "27.509"' in html), "[X] CRO number missing"
    assert '"worksFor"' in html, "[X] Author worksFor missing"
    print(f"[OK] Blog author schema is enriched with credentials")


def test_blog_no_redirect_meta_tags(page):
    """Testa que os redirects foram removidos do blog"""
    html_path = DIST_DIR / "blog/implante-dentario-beneficios-e-recuperacao/index.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Verify redirect tags are NOT present
    assert 'http-equiv="refresh"' not in html, "[X] Meta refresh redirect still present!"
    assert 'window.location.href' not in html, "[X] JS redirect still present!"
    print(f"[OK] Blog posts have no redirect meta tags (AI bot friendly)")


def test_fallback_content_semantic_html(page):
    """Testa que o fallback usa HTML semântico"""
    html_path = DIST_DIR / "ortodontia.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract content from <div id="root">
    root_start = html.find('<div id="root">')
    root_end = html.find('</div>', root_start + 15)
    root_html = html[root_start:root_end+6]

    # Check semantic structure
    assert "<header" in root_html, "[X] Missing semantic <header>"
    assert "<main" in root_html, "[X] Missing semantic <main>"
    assert "<footer" in root_html, "[X] Missing semantic <footer>"
    assert "<h1>" in root_html, "[X] Missing <h1>"
    assert "<dl>" in root_html, "[X] Missing <dl> for FAQs"
    assert "<dt>" in root_html, "[X] Missing <dt> for FAQ questions"
    assert "<dd>" in root_html, "[X] Missing <dd> for FAQ answers"
    print(f"[OK] Fallback content uses semantic HTML5 elements")


def test_service_page_loads_with_react(page):
    """Testa que React ainda carrega normalmente (não quebramos nada)"""
    page.goto(f"{BASE_URL}/implantes-dentarios.html")
    time.sleep(1)  # Wait for React to hydrate

    # Check for React-rendered content
    hero_visible = page.locator("h1").is_visible()
    assert hero_visible, "[X] Page not rendering with React"
    print(f"[OK] Service page renders normally with React (backward compatible)")


def main():
    print("Sprint 5 - AI Search Optimization - Smoke Tests")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        tests = [
            ("Service page schemas (static HTML)", test_service_page_schemas),
            ("Service page fallback content", test_service_page_fallback_content),
            ("All 10 service pages have schemas", test_all_service_pages_have_schemas),
            ("Info pages have Dentist schema", test_info_pages_have_dentist_schema),
            ("Landing pages have noindex", test_landing_pages_have_noindex),
            ("FAQPage schema has real data", test_faq_schema_has_real_data),
            ("Blog posts exist and are pre-rendered", test_blog_posts_exist),
            ("Blog author schema enriched", test_blog_author_schema_enriched),
            ("Blog has no redirect meta tags", test_blog_no_redirect_meta_tags),
            ("Fallback content is semantic HTML", test_fallback_content_semantic_html),
            ("React still works (backward compatible)", test_service_page_loads_with_react),
        ]

        passed = 0
        failed = 0

        for name, test_func in tests:
            try:
                print(f"\n[TEST] {name}...")
                test_func(page)
                passed += 1
            except Exception as e:
                print(f"[FAIL] {name}")
                print(f"   Error: {e}")
                failed += 1

        browser.close()

    print("\n" + "=" * 60)
    print(f"[OK] Passed: {passed}/{len(tests)}")
    if failed > 0:
        print(f"[FAIL] Failed: {failed}/{len(tests)}")
        sys.exit(1)
    else:
        print("All tests passed!")
        sys.exit(0)


if __name__ == "__main__":
    main()
