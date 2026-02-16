const fs = require('fs');
const data = JSON.parse(fs.readFileSync('contentful_posts.json', 'utf8'));
const posts = data.items.filter(item => item.sys.contentType?.sys?.id === 'blogCarla');

// Find Probióticos post
const probioticos = posts.find(p => p.fields.slug === 'saude-bucal-probioticos');

if (probioticos) {
  console.log('='.repeat(80));
  console.log('PROBIOTICOS POST - THE 28.57% CONVERSION OUTLIER');
  console.log('='.repeat(80));
  console.log('Title:', probioticos.fields.title);
  console.log('Slug:', probioticos.fields.slug);
  console.log('Meta:', probioticos.fields.metaDescription);
  console.log('');
  console.log('Quick Answer Box:');
  console.log(probioticos.fields.quickAnswerBoquickAnswerBoxx || 'NONE');
  console.log('');
  console.log('Has FAQs:', probioticos.fields.faqStructured ? 'YES' : 'NO');
  console.log('Has Key Takeaways:', probioticos.fields.keyTakeaways ? 'YES' : 'NO');
  console.log('');
  console.log('First 3 paragraphs of content:');

  // Extract first few paragraphs
  let paragraphCount = 0;
  function traverse(node, depth = 0) {
    if (paragraphCount >= 3) return;

    if (node.nodeType === 'paragraph') {
      paragraphCount++;
      console.log(`\nParagraph ${paragraphCount}:`);
      let text = '';
      function getText(n) {
        if (n.nodeType === 'text') text += n.value;
        if (n.content) n.content.forEach(getText);
      }
      getText(node);
      console.log(text);
    }
    if (node.content) {
      node.content.forEach(n => traverse(n, depth + 1));
    }
  }

  traverse(probioticos.fields.content);

  // Check for internal links
  console.log('');
  console.log('='.repeat(80));
  console.log('INTERNAL LINKS ANALYSIS');
  console.log('='.repeat(80));

  const links = [];
  function findLinks(node) {
    if (node.nodeType === 'hyperlink') {
      links.push({
        url: node.data.uri,
        text: node.content.map(c => c.value || '').join('')
      });
    }
    if (node.content) {
      node.content.forEach(findLinks);
    }
  }
  findLinks(probioticos.fields.content);

  console.log('Total links found:', links.length);
  links.forEach((link, i) => {
    console.log(`${i+1}. ${link.url}`);
    console.log(`   Link text: "${link.text}"`);
  });

  // Full content word count
  let fullText = '';
  function getAllText(node) {
    if (node.nodeType === 'text') fullText += node.value + ' ';
    if (node.content) node.content.forEach(getAllText);
  }
  getAllText(probioticos.fields.content);

  console.log('');
  console.log('Word count:', fullText.split(/\s+/).length);
}
