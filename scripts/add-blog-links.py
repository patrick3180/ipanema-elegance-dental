#!/usr/bin/env python3
"""
add-blog-links.py
Adds contextual internal links to priority blog posts in Contentful.
Uses Rich Text JSON manipulation.
"""

import json
import os
import sys
import copy
import urllib.request
import urllib.error
import urllib.parse

SPACE = "g8ip8odd5vbl"
ENV = "master"
TOKEN = os.environ.get("CONTENTFUL_MGMT_TOKEN", "")
if not TOKEN:
    raise SystemExit("ERROR: Set CONTENTFUL_MGMT_TOKEN env var before running.")
BASE = f"https://api.contentful.com/spaces/{SPACE}/environments/{ENV}"

# --- Link Map ---------------------------------------------------------------
# entry_id: { search_text, link_text, url }
# search_text: substring to find in a paragraph
# link_text: exact words within that paragraph to turn into a hyperlink
# url: internal URL

LINK_MAP = [
    {
        "entry_id": "7Hcfc3bTAM40wErZ5Csc9t",  # periodontite
        "slug": "saude-bucal-periodontite-causas-tratamento",
        "search": "perda dentária",
        "link_text": "perda dentária",
        "url": "/saude-da-gengiva",
        "description": "Links 'perda dentaria' -> /saude-da-gengiva"
    },
    {
        "entry_id": "7feXloXnHanpixD0jT3mCU",  # dente quebrou
        "slug": "emergencia-dente-quebrou",
        "search": "faceta",
        "link_text": "faceta",
        "url": "/lentes-de-contato-dental-e-facetas",
        "description": "Links 'faceta' -> /lentes-de-contato-dental-e-facetas"
    },
    {
        "entry_id": "2IwMlKIxSleBOLn4f1075W",  # carie oculta
        "slug": "saude-bucal-carie-oculta",
        "search": "restauração",
        "link_text": "restauração",
        "url": "/restauracoes-esteticas",
        "description": "Links 'restauracao' -> /restauracoes-esteticas"
    },
    {
        "entry_id": "6Uv3BjVRGgQjQ7K4cTs1OF",  # dente trincado
        "slug": "saude-bucal-dente-trincado",
        "search": "faceta",
        "link_text": "faceta",
        "url": "/lentes-de-contato-dental-e-facetas",
        "description": "Links 'faceta' -> /lentes-de-contato-dental-e-facetas"
    },
    {
        "entry_id": "1Wnfv8qmGseaPuV8spUDdG",  # mau halito
        "slug": "saude-bucal-mau-halito",
        "search": "doença periodontal",
        "link_text": "doença periodontal",
        "url": "/saude-da-gengiva",
        "description": "Links 'doenca periodontal' -> /saude-da-gengiva"
    },
    {
        "entry_id": "1v37v1xAOpG1oe9a6Y2cjb",  # alimentos amido
        "slug": "saude-bucal-alimentos-com-amido-causam-caries",
        "search": "prevenção",
        "link_text": "prevenção",
        "url": "/clinica-geral-e-prevencao",
        "description": "Links 'prevencao' -> /clinica-geral-e-prevencao"
    },
    {
        "entry_id": "581aWNLZ95LoODLKavBb2I",  # jejum intermitente
        "slug": "saude-bucal-jejum-intermitente",
        "search": "check-up",
        "link_text": "check-up",
        "url": "/clinica-geral-e-prevencao",
        "description": "Links 'check-up' -> /clinica-geral-e-prevencao"
    },
    {
        "entry_id": "2WV0Q3sNa3UD6DEZtZ50Td",  # bruxismo
        "slug": "saude-bucal-bruxismo-e-estresse",
        "search": "placa",
        "link_text": "placa",
        "url": "/clinica-geral-e-prevencao",
        "description": "Links 'placa' -> /clinica-geral-e-prevencao"
    },
    {
        "entry_id": "1VBrhpyzPKanA8Jskak3HC",  # clareamento estetica
        "slug": "estetica-clareamento-dental",
        "search": "lentes",
        "link_text": "lentes",
        "url": "/lentes-de-contato-dental-e-facetas",
        "description": "Links 'lentes' -> /lentes-de-contato-dental-e-facetas"
    },
    {
        "entry_id": "4cWFpVDxUOHuVymnXunHf",  # dentes amarelos
        "slug": "saude-bucal-dentes-amarelos",
        "search": "clareamento",
        "link_text": "clareamento",
        "url": "/clareamento-dental",
        "description": "Links 'clareamento' -> /clareamento-dental"
    },
]


# --- Contentful helpers ------------------------------------------------------

def cf_get(path):
    req = urllib.request.Request(
        f"{BASE}{path}",
        headers={"Authorization": f"Bearer {TOKEN}"}
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def cf_put(path, data, version):
    payload = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=payload,
        method="PUT",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/vnd.contentful.management.v1+json",
            "X-Contentful-Version": str(version),
        }
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def cf_publish(path, version):
    req = urllib.request.Request(
        f"{BASE}{path}/published",
        method="PUT",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "X-Contentful-Version": str(version),
        }
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


# --- Rich Text helpers -------------------------------------------------------

def make_hyperlink_node(text, url):
    """Creates a Contentful Rich Text hyperlink node."""
    return {
        "nodeType": "hyperlink",
        "data": {"uri": url},
        "content": [
            {
                "nodeType": "text",
                "value": text,
                "marks": [],
                "data": {}
            }
        ]
    }


def inject_link_into_node(node, search_text, link_text, url, link_inserted):
    """
    Recursively walks rich text nodes and injects a hyperlink
    for the FIRST occurrence of link_text within a paragraph that
    contains search_text.
    Returns (modified_node, was_link_inserted).
    """
    if link_inserted[0]:
        return node  # already done

    node_type = node.get("nodeType", "")

    # Only modify paragraph-level nodes (not headings, lists, etc.)
    if node_type == "paragraph":
        # Check if this paragraph contains the search text
        full_text = "".join(
            c.get("value", "") for c in node.get("content", [])
            if c.get("nodeType") == "text"
        )
        if search_text.lower() not in full_text.lower():
            return node  # skip this paragraph

        # Found target paragraph — inject link into first matching text node
        new_content = []
        for child in node.get("content", []):
            if link_inserted[0]:
                new_content.append(child)
                continue

            if child.get("nodeType") == "text":
                val = child.get("value", "")
                idx = val.lower().find(link_text.lower())
                if idx != -1:
                    # Check not already linked
                    actual_link_text = val[idx: idx + len(link_text)]
                    before = val[:idx]
                    after = val[idx + len(link_text):]
                    marks = child.get("marks", [])

                    parts = []
                    if before:
                        parts.append({"nodeType": "text", "value": before, "marks": marks, "data": {}})
                    link_node = make_hyperlink_node(actual_link_text, url)
                    # Copy marks to hyperlink text
                    link_node["content"][0]["marks"] = marks
                    parts.append(link_node)
                    if after:
                        parts.append({"nodeType": "text", "value": after, "marks": marks, "data": {}})

                    new_content.extend(parts)
                    link_inserted[0] = True
                    continue
            new_content.append(child)

        modified = copy.deepcopy(node)
        modified["content"] = new_content
        return modified

    # Recurse into children
    if "content" in node:
        new_children = []
        for child in node["content"]:
            new_child = inject_link_into_node(child, search_text, link_text, url, link_inserted)
            new_children.append(new_child)
        modified = copy.deepcopy(node)
        modified["content"] = new_children
        return modified

    return node


def already_has_link(document, url):
    """Returns True if the document already contains a hyperlink to url."""
    doc_str = json.dumps(document)
    return f'"uri": "{url}"' in doc_str


# --- Main --------------------------------------------------------------------

def process_post(item):
    entry_id = item["entry_id"]
    slug = item["slug"]
    search_text = item["search"]
    link_text = item["link_text"]
    url = item["url"]
    desc = item["description"]

    print(f"\n{'-'*60}")
    print(f"POST: {slug}")
    print(f"ACTION: {desc}")

    try:
        entry = cf_get(f"/entries/{entry_id}")
    except Exception as e:
        print(f"  [FAIL] Failed to fetch entry: {e}")
        return False

    version = entry["sys"]["version"]
    fields = entry.get("fields", {})
    content_field = fields.get("content", {})

    # Contentful stores fields as {locale: value}
    # Get locale
    locale = list(content_field.keys())[0] if content_field else "pt-BR"
    document = content_field.get(locale, content_field.get("pt-BR", {}))

    if not document or document.get("nodeType") != "document":
        print(f"  [FAIL] No valid rich text document found")
        return False

    # Check if link already exists
    if already_has_link(document, url):
        print(f"  [WARN]  Link to {url} already exists — skipping")
        return False

    # Inject link
    link_inserted = [False]
    new_document = inject_link_into_node(
        copy.deepcopy(document),
        search_text, link_text, url, link_inserted
    )

    if not link_inserted[0]:
        print(f"  [WARN]  Text '{link_text}' (searching in paragraphs containing '{search_text}') NOT FOUND in content")
        # Show available text snippets for debugging
        all_text = json.dumps(document, ensure_ascii=False)
        if search_text.lower() in all_text.lower():
            print(f"     Note: '{search_text}' exists in document but not in a paragraph")
        else:
            print(f"     Note: '{search_text}' does NOT exist in document at all")
        return False

    # Update entry
    new_fields = copy.deepcopy(fields)
    new_fields["content"][locale] = new_document

    # Ensure required field schemaType exists (older entries may not have it)
    if "schemaType" not in new_fields:
        new_fields["schemaType"] = {locale: "Article"}

    try:
        updated = cf_put(f"/entries/{entry_id}", {"fields": new_fields}, version)
        new_version = updated["sys"]["version"]
        print(f"  [OK] Entry updated (v{version} -> v{new_version})")
    except Exception as e:
        print(f"  [FAIL] Failed to update entry: {e}")
        return False

    # Publish
    try:
        cf_publish(f"/entries/{entry_id}", new_version)
        print(f"  [OK] Published!")
    except Exception as e:
        print(f"  [FAIL] Failed to publish: {e}")
        return False

    return True


def main():
    results = {"success": [], "skipped": [], "failed": []}

    for item in LINK_MAP:
        ok = process_post(item)
        if ok is True:
            results["success"].append(item["slug"])
        elif ok is False:
            # Check if skip or fail happened
            results["failed"].append(item["slug"])

    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"  [OK] Updated & Published: {len(results['success'])}")
    print(f"  [FAIL] Failed/Not found:    {len(results['failed'])}")
    if results["success"]:
        print("\n  SUCCESS:")
        for s in results["success"]:
            print(f"    - {s}")
    if results["failed"]:
        print("\n  NEEDS MANUAL REVIEW:")
        for s in results["failed"]:
            print(f"    - {s}")


if __name__ == "__main__":
    main()
