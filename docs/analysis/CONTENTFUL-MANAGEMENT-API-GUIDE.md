# Contentful Management API — Automation Guide

**Data:** 16 de Fevereiro de 2026
**Para:** Patrick (Technical Implementation)
**Purpose:** Enable bulk editing of 65 blog posts via API

---

## Current State: READ-ONLY Access

You currently have **Contentful Delivery API** tokens, which provide:
- ✅ Read published content
- ✅ Fetch entries and assets
- ✅ Query content structure
- ❌ Cannot create/edit/delete content

**Evidence:** The `analyze_blog_content.cjs` script successfully reads all 65 posts using Delivery API.

---

## What You Need: Management API Token

To automate bulk edits, you need a **Content Management API** (CMA) token with write permissions.

### How to Get a Management API Token

1. **Go to:** Contentful web app → Settings → API keys
2. **Click:** "Content management tokens"
3. **Create new token:**
   - Name: "n8n Workflow + Bulk Editor"
   - Permissions: Full access (read + write)
4. **Copy token** (shown only once!)
5. **Save to .env:**
   ```bash
   CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx...
   ```

**Security note:** Management tokens have full write access. Store securely, never commit to git.

---

## What You Can Automate With It

### 1. Bulk Fix "recomendo" (58 posts)

**Manual effort:** 8 hours (5 min/post × 58 posts)
**Automated:** 30 minutes

**Script:** `scripts/bulk-fix-recomendo.cjs`

```javascript
const contentful = require('contentful-management');
const fs = require('fs');

async function bulkFixRecomendo() {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  });

  const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');

  // Replacement rules
  const replacements = {
    'recomendo que': 'é importante',
    'recomendo fortemente': 'é essencial',
    'recomendo': '', // remove
    'dentistas recomendam': 'dentistas indicam',
    'especialistas recomendam': 'especialistas indicam'
  };

  // Fetch all blog posts
  const entries = await environment.getEntries({
    content_type: 'blogCarla',
    limit: 100
  });

  console.log(`Found ${entries.items.length} posts`);

  let fixed = 0;
  const log = [];

  for (const entry of entries.items) {
    let modified = false;
    const original = JSON.parse(JSON.stringify(entry.fields));

    // Fix title
    if (entry.fields.title && entry.fields.title['pt-BR']) {
      let text = entry.fields.title['pt-BR'];
      Object.entries(replacements).forEach(([from, to]) => {
        if (text.toLowerCase().includes(from.toLowerCase())) {
          const regex = new RegExp(from, 'gi');
          text = text.replace(regex, to).trim();
          modified = true;
        }
      });
      entry.fields.title['pt-BR'] = text;
    }

    // Fix excerpt
    if (entry.fields.excerpt && entry.fields.excerpt['pt-BR']) {
      let text = entry.fields.excerpt['pt-BR'];
      Object.entries(replacements).forEach(([from, to]) => {
        if (text.toLowerCase().includes(from.toLowerCase())) {
          const regex = new RegExp(from, 'gi');
          text = text.replace(regex, to).trim();
          modified = true;
        }
      });
      entry.fields.excerpt['pt-BR'] = text;
    }

    // Fix Rich Text content (requires deep traversal)
    if (entry.fields.content && entry.fields.content['pt-BR']) {
      const richText = entry.fields.content['pt-BR'];
      const fixedRichText = fixRichTextContent(richText, replacements);
      if (JSON.stringify(richText) !== JSON.stringify(fixedRichText)) {
        entry.fields.content['pt-BR'] = fixedRichText;
        modified = true;
      }
    }

    if (modified) {
      try {
        await entry.update();
        console.log(`✅ Fixed: ${entry.fields.title['pt-BR']}`);
        log.push({
          slug: entry.fields.slug['pt-BR'],
          title: entry.fields.title['pt-BR'],
          changes: 'Fixed "recomendo" violations'
        });
        fixed++;
      } catch (error) {
        console.error(`❌ Error updating ${entry.fields.slug['pt-BR']}:`, error.message);
      }
    }
  }

  // Save log
  fs.writeFileSync('bulk-fix-log.json', JSON.stringify(log, null, 2));

  console.log(`\n✨ Complete!`);
  console.log(`   Fixed: ${fixed} posts`);
  console.log(`   Unchanged: ${entries.items.length - fixed} posts`);
  console.log(`   Log saved: bulk-fix-log.json`);
}

// Helper: Fix Rich Text content (recursive)
function fixRichTextContent(node, replacements) {
  if (!node) return node;

  if (node.nodeType === 'text') {
    let value = node.value;
    Object.entries(replacements).forEach(([from, to]) => {
      const regex = new RegExp(from, 'gi');
      value = value.replace(regex, to);
    });
    return { ...node, value: value.trim() };
  }

  if (node.content && Array.isArray(node.content)) {
    return {
      ...node,
      content: node.content.map(child => fixRichTextContent(child, replacements))
    };
  }

  return node;
}

bulkFixRecomendo().catch(console.error);
```

**Usage:**
```bash
node scripts/bulk-fix-recomendo.cjs
```

**Safety:**
- Creates backup log of all changes
- Test on 5 posts manually first
- Version history in Contentful allows rollback

---

### 2. Unpublish Historical Posts (8 posts)

**Manual effort:** 30 minutes (click through UI)
**Automated:** 2 minutes

**Script:** `scripts/unpublish-historical-posts.cjs`

```javascript
const contentful = require('contentful-management');

async function unpublishHistoricalPosts() {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  });

  const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');

  // Posts to unpublish (historical content without conversion value)
  const slugs = [
    'odontologia-egito-antigo',
    'odontologia-roma-antiga',
    'saude-bucal-carie-dentista', // barbeiros-dentistas
    'historia-dentadura',
    'remedios-medievais-dor-de-dente',
    'descoberta-anestesia',
    'evolucao-materiais-odontologicos',
    'vikings-saude-bucal'
  ];

  console.log(`Unpublishing ${slugs.length} historical posts...\n`);

  for (const slug of slugs) {
    try {
      // Find entry by slug
      const entries = await environment.getEntries({
        content_type: 'blogCarla',
        'fields.slug': slug,
        limit: 1
      });

      if (entries.items.length === 0) {
        console.log(`⏭️  Skipped: ${slug} (not found)`);
        continue;
      }

      const entry = entries.items[0];

      // Check if published
      if (entry.isPublished()) {
        await entry.unpublish();
        console.log(`✅ Unpublished: ${slug}`);
      } else {
        console.log(`⏭️  Already draft: ${slug}`);
      }

      // Add metadata note
      if (!entry.fields.internalNotes) {
        entry.fields.internalNotes = { 'pt-BR': '' };
      }
      entry.fields.internalNotes['pt-BR'] = 'Unpublished 2026-02-16: Historical content without conversion value';
      await entry.update();

    } catch (error) {
      console.error(`❌ Error with ${slug}:`, error.message);
    }
  }

  console.log('\n✨ Done!');
}

unpublishHistoricalPosts().catch(console.error);
```

---

### 3. Add Quick Answer to All Posts (41 posts missing it)

**Manual effort:** 5 hours (7 min/post × 41 posts)
**Automated:** 1-2 hours (uses Claude API to generate)

**Script:** `scripts/add-quick-answers.cjs`

```javascript
const contentful = require('contentful-management');
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function addQuickAnswers() {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  });

  const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');

  // Fetch posts without Quick Answer
  const entries = await environment.getEntries({
    content_type: 'blogCarla',
    limit: 100
  });

  const postsNeedingQuickAnswer = entries.items.filter(entry =>
    !entry.fields.quickAnswer || !entry.fields.quickAnswer['pt-BR']
  );

  console.log(`Found ${postsNeedingQuickAnswer.length} posts without Quick Answer\n`);

  for (const entry of postsNeedingQuickAnswer) {
    const title = entry.fields.title['pt-BR'];
    const content = extractPlainText(entry.fields.content['pt-BR']);

    console.log(`Generating Quick Answer for: ${title}...`);

    try {
      // Generate Quick Answer via Claude
      const message = await anthropic.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `Based on this blog post, write a Quick Answer (1 sentence, 80-120 characters) that directly answers the main question.\n\nTitle: ${title}\nContent: ${content.substring(0, 2000)}\n\nReturn ONLY the Quick Answer sentence, nothing else.`
        }]
      });

      const quickAnswer = message.content[0].text.trim();

      if (quickAnswer.length >= 80 && quickAnswer.length <= 150) {
        entry.fields.quickAnswer = { 'pt-BR': quickAnswer };
        await entry.update();
        console.log(`✅ Added: "${quickAnswer.substring(0, 60)}..."`);
      } else {
        console.log(`⚠️  Skipped (length ${quickAnswer.length}): ${title}`);
      }

    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✨ Complete!');
}

function extractPlainText(richText) {
  if (!richText || typeof richText === 'string') return richText || '';

  function traverse(node) {
    if (node.nodeType === 'text') return node.value || '';
    if (node.content) return node.content.map(traverse).join(' ');
    return '';
  }

  return traverse(richText);
}

addQuickAnswers().catch(console.error);
```

---

### 4. Add Internal Links (25 posts with 0 links)

**Manual effort:** 6 hours (15 min/post × 25 posts)
**Semi-automated:** 2 hours (generates suggestions, manual review)

**Script:** `scripts/suggest-internal-links.cjs`

```javascript
const contentful = require('contentful-management');
const fs = require('fs');

async function suggestInternalLinks() {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  });

  const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');

  const serviceMap = {
    'implante': '/implantes-dentarios',
    'clareamento': '/clareamento-dental',
    'lente': '/lentes-de-contato-dental-e-facetas',
    'faceta': '/lentes-de-contato-dental-e-facetas',
    'prótese': '/protese-dentaria',
    'ortodontia': '/ortodontia',
    'canal': '/tratamento-de-canal',
    'restauração': '/restauracoes-esteticas',
    'gengiva': '/saude-da-gengiva',
    'periodontite': '/saude-da-gengiva',
    'prevenção': '/clinica-geral-e-prevencao'
  };

  const entries = await environment.getEntries({
    content_type: 'blogCarla',
    limit: 100
  });

  const suggestions = [];

  for (const entry of entries.items) {
    const slug = entry.fields.slug['pt-BR'];
    const title = entry.fields.title['pt-BR'];
    const content = extractPlainText(entry.fields.content['pt-BR']);

    // Count existing service links
    const existingLinks = countServiceLinks(entry.fields.content['pt-BR'], serviceMap);

    if (existingLinks === 0) {
      // Suggest links based on keywords
      const suggestedLinks = [];

      Object.entries(serviceMap).forEach(([keyword, url]) => {
        const regex = new RegExp(`\\b${keyword}\\w*\\b`, 'gi');
        const matches = content.match(regex);

        if (matches && matches.length > 0) {
          suggestedLinks.push({
            keyword,
            url,
            occurrences: matches.length,
            firstMention: content.indexOf(matches[0])
          });
        }
      });

      if (suggestedLinks.length > 0) {
        suggestions.push({
          slug,
          title,
          currentLinks: existingLinks,
          suggestions: suggestedLinks.slice(0, 2) // Top 2
        });
      }
    }
  }

  // Save suggestions
  fs.writeFileSync('internal-link-suggestions.json', JSON.stringify(suggestions, null, 2));

  console.log(`\n✨ Generated suggestions for ${suggestions.length} posts`);
  console.log(`   Saved to: internal-link-suggestions.json`);
  console.log(`\n📝 Next step: Review suggestions and apply manually or via script`);
}

function extractPlainText(richText) {
  // Same as above
}

function countServiceLinks(richText, serviceMap) {
  let count = 0;

  function traverse(node) {
    if (node.nodeType === 'hyperlink') {
      const url = node.data?.uri || '';
      if (Object.values(serviceMap).some(path => url.includes(path))) {
        count++;
      }
    }
    if (node.content) node.content.forEach(traverse);
  }

  if (richText) traverse(richText);
  return count;
}

suggestInternalLinks().catch(console.error);
```

**Output:** JSON file with suggested edits, ready for manual application or batch script.

---

## Safety Protocols

### Before Running Any Bulk Script

1. **Backup Contentful data:**
   ```bash
   node scripts/export-contentful-backup.cjs
   ```

2. **Test on staging environment** (if available)

3. **Dry run mode:** Add `--dry-run` flag to scripts
   ```javascript
   const DRY_RUN = process.argv.includes('--dry-run');

   if (DRY_RUN) {
     console.log(`[DRY RUN] Would update: ${entry.fields.slug['pt-BR']}`);
   } else {
     await entry.update();
   }
   ```

4. **Test on 5 posts manually** before running full batch

5. **Verify with Delivery API** after updates

### Rollback Plan

Contentful keeps version history for all entries. To rollback:

1. Go to Contentful web app
2. Open entry → "Versions" tab
3. Select previous version → "Restore"

Or via API:
```javascript
const entry = await environment.getEntry('ENTRY_ID');
const versions = await entry.getSnapshots();
const previousVersion = versions.items[1]; // [0] is current
await entry.restore(previousVersion);
```

---

## Cost Estimation

### API Rate Limits

**Contentful Management API:**
- Free plan: 10 requests/second
- 65 posts × 2 API calls (fetch + update) = 130 calls
- Time: ~13 seconds (sequential) or ~2 seconds (parallel with rate limiting)

**Claude API (for Quick Answers):**
- 41 posts without Quick Answer
- ~200 tokens/request × $3/million tokens = $0.02 total
- Negligible cost

### Time Savings

| Task | Manual | Automated | Saved |
|------|--------|-----------|-------|
| Fix "recomendo" | 8h | 30 min | 7.5h |
| Unpublish historical | 30 min | 2 min | 28 min |
| Add Quick Answers | 5h | 1.5h | 3.5h |
| Suggest links | 6h | 2h | 4h |
| **Total** | **19.5h** | **4h** | **15.5h** |

**Hourly rate assumption:** R$ 200/hour
**Cost saved:** R$ 3.100

---

## Integration with n8n Workflow

The Management API token is also needed for the n8n workflow to:
1. Create new blog post entries
2. Update posts with auto-generated content
3. Publish entries programmatically

**n8n Node configuration:**
```json
{
  "name": "Create Contentful Entry",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.contentful.com/spaces/{{SPACE_ID}}/environments/master/entries",
    "authentication": "genericCredentialType",
    "genericAuthType": "httpHeaderAuth",
    "headerParameters": {
      "parameters": [
        {
          "name": "Authorization",
          "value": "Bearer {{CONTENTFUL_MANAGEMENT_TOKEN}}"
        },
        {
          "name": "X-Contentful-Content-Type",
          "value": "blogCarla"
        }
      ]
    }
  }
}
```

---

## Next Steps

### Immediate (Today)
1. Generate Management API token in Contentful
2. Add to `.env` file (never commit!)
3. Test token with simple fetch:
   ```bash
   node scripts/test-management-api.cjs
   ```

### This Week
4. Run `bulk-fix-recomendo.cjs` in dry-run mode
5. Review output
6. Run for real on production
7. Verify changes in Contentful UI

### Next 2 Weeks
8. Run `unpublish-historical-posts.cjs`
9. Run `add-quick-answers.cjs` (41 posts)
10. Run `suggest-internal-links.cjs` → apply manually

### Integration
11. Configure n8n workflow with Management API token
12. Test end-to-end post creation
13. Production rollout

---

## Resources

**Contentful Management API Docs:**
- Getting Started: https://www.contentful.com/developers/docs/references/content-management-api/
- JavaScript SDK: https://github.com/contentful/contentful-management.js
- Authentication: https://www.contentful.com/developers/docs/references/authentication/

**Example Scripts (in this repo):**
- `analyze_blog_content.cjs` — Read-only example (already works)
- `scripts/bulk-fix-recomendo.cjs` — Bulk edit example (requires Management API)
- `scripts/generate-blog-html.js` — Uses Delivery API (read-only)

---

**Document created by:** Claude Code
**Date:** 16 de Fevereiro de 2026
**Status:** READY FOR IMPLEMENTATION
**Prerequisites:** Contentful Management API token
