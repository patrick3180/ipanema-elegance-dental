// Test BigQuery Access
// Verifica acesso ao BigQuery e lista datasets/tabelas disponíveis

import { BigQuery } from '@google-cloud/bigquery';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testBigQueryAccess() {
  try {
    console.log('🔍 Testando acesso ao BigQuery...\n');

    // Load credentials
    const credentialsPath = join(__dirname, '..', 'bigquery-credentials.json');
    const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));

    console.log(`✅ Credenciais carregadas`);
    console.log(`   Project: ${credentials.project_id}`);
    console.log(`   Service Account: ${credentials.client_email}\n`);

    // Initialize BigQuery client
    const bigquery = new BigQuery({
      projectId: credentials.project_id,
      credentials: credentials,
    });

    console.log('📊 Listando datasets disponíveis...\n');

    // List all datasets
    const [datasets] = await bigquery.getDatasets();

    if (datasets.length === 0) {
      console.log('⚠️  Nenhum dataset encontrado no projeto.');
      return;
    }

    console.log(`✅ Encontrados ${datasets.length} dataset(s):\n`);

    // For each dataset, list tables
    for (const dataset of datasets) {
      console.log(`📁 Dataset: ${dataset.id}`);

      try {
        const [tables] = await dataset.getTables();

        if (tables.length === 0) {
          console.log('   └─ (vazio)\n');
          continue;
        }

        console.log(`   └─ ${tables.length} tabela(s):`);

        for (const table of tables) {
          // Get table metadata
          const [metadata] = await table.getMetadata();
          const numRows = metadata.numRows || 'unknown';
          const sizeGB = metadata.numBytes ? (metadata.numBytes / 1024 / 1024 / 1024).toFixed(2) : 'unknown';

          console.log(`      ├─ ${table.id}`);
          console.log(`      │  Linhas: ${numRows} | Tamanho: ${sizeGB} GB`);
        }
        console.log('');
      } catch (tableError) {
        console.log(`   └─ Erro ao listar tabelas: ${tableError.message}\n`);
      }
    }

    console.log('\n✅ Teste de acesso concluído com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Identificar dataset do GA4 (geralmente: analytics_XXXXXXXXX)');
    console.log('   2. Identificar dataset do Google Ads (geralmente: ads_XXXXXXXXX ou dentro do GA4)');
    console.log('   3. Executar queries de análise');

  } catch (error) {
    console.error('\n❌ Erro ao acessar BigQuery:');
    console.error(`   ${error.message}`);

    if (error.message.includes('permission')) {
      console.error('\n💡 Solução:');
      console.error('   Verifique se a service account tem as permissões:');
      console.error('   - BigQuery Data Viewer');
      console.error('   - BigQuery Job User');
    }

    process.exit(1);
  }
}

testBigQueryAccess();
