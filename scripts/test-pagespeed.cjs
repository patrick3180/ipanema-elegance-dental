/**
 * PageSpeed Insights mobile strategy audit runner (CommonJS version).
 * Usage: node scripts/test-pagespeed.cjs
 */

const https = require('https');

const PAGES = {
  'consulta-inicial': 'https://dracarlachristoph.com/lp/consulta-inicial',
  'general-consultation': 'https://dracarlachristoph.com/en/lp/general-consultation',
  'home': 'https://dracarlachristoph.com/',
  'protese': 'https://dracarlachristoph.com/lp/especialista-protese-ipanema',
  'facetas': 'https://dracarlachristoph.com/lp/facetas-resina-ipanema',
  'clareamento': 'https://dracarlachristoph.com/lp/clareamento-dental'
};

const fs = require('fs');
const path = require('path');

let API_KEY = process.env.PAGESPEED_API_KEY;
try {
  const keyPath = path.join(__dirname, '..', '.secrets', 'pagespeed-api-key.txt');
  if (fs.existsSync(keyPath)) {
    API_KEY = fs.readFileSync(keyPath, 'utf8').trim();
  }
} catch (e) {}

if (!API_KEY) {
  console.warn("⚠️ Warning: PAGESPEED_API_KEY not found in environment or .secrets/pagespeed-api-key.txt. The script may fail or use default quota.");
}


function runTest(name, url) {
  console.log(`Running PSI mobile audit for ${name}: ${url}...`);
  return new Promise((resolve) => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&key=${API_KEY}`;
    
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            console.error(`❌ Error testing ${name}: ${json.error.message}`);
            resolve({ name, url, error: json.error.message });
            return;
          }
          const lh = json.lighthouseResult;
          const score = Math.round(lh.categories.performance.score * 100);
          const lcp = lh.audits['largest-contentful-paint'].displayValue;
          const tbt = lh.audits['total-blocking-time'].displayValue;
          const cls = lh.audits['cumulative-layout-shift'].displayValue;
          const fcp = lh.audits['first-contentful-paint'].displayValue;
          
          resolve({ name, url, score, lcp, tbt, cls, fcp, error: null });
        } catch (e) {
          console.error(`❌ Parsing error testing ${name}: ${e.message}`);
          resolve({ name, url, error: `Parsing error: ${e.message}` });
        }
      });
    }).on('error', (e) => {
      console.error(`❌ Request error testing ${name}: ${e.message}`);
      resolve({ name, url, error: e.message });
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const targetPage = args[0]; // e.g. "home", "protese", etc.

  let pagesToTest = Object.entries(PAGES);
  if (targetPage && PAGES[targetPage]) {
    pagesToTest = [[targetPage, PAGES[targetPage]]];
  } else if (targetPage) {
    console.error(`Unknown page key: "${targetPage}". Valid keys: ${Object.keys(PAGES).join(', ')}`);
    process.exit(1);
  }

  const results = [];
  for (const [name, url] of pagesToTest) {
    const res = await runTest(name, url);
    results.push(res);
    // Add small delay to respect API limits
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n================================================================================');
  console.log('PSI Mobile Performance Audit Results:');
  console.log('================================================================================\n');

  console.table(results.map(r => {
    if (r.error) {
      return { Page: r.name, Score: 'ERROR', LCP: r.error, TBT: '-', CLS: '-', FCP: '-' };
    }
    return {
      Page: r.name,
      Score: `${r.score}/100`,
      LCP: r.lcp,
      TBT: r.tbt,
      CLS: r.cls,
      FCP: r.fcp
    };
  }));

  console.log('\nDone.');
}

main();
