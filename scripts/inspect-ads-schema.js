// Inspect Google Ads Table Schema
// Discovers the actual field names in the Google Ads tables

import { BigQuery } from '@google-cloud/bigquery';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const credentialsPath = join(__dirname, '..', 'bigquery-credentials.json');
const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
const bigquery = new BigQuery({
  projectId: credentials.project_id,
  credentials: credentials,
});

const PROJECT_ID = credentials.project_id;
const ADS_DATASET = 'clinica_dra_carla_ads';

async function inspectSchema(tableName) {
  console.log(`\n📋 Schema para: ${tableName}`);
  console.log('='.repeat(80));

  try {
    const [metadata] = await bigquery
      .dataset(ADS_DATASET)
      .table(tableName)
      .getMetadata();

    console.log(`Campos disponíveis:`);
    metadata.schema.fields.forEach(field => {
      console.log(`  - ${field.name}: ${field.type}`);
    });
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
  }
}

async function sampleData(tableName, limit = 5) {
  console.log(`\n📊 Amostra de dados (${limit} linhas): ${tableName}`);
  console.log('='.repeat(80));

  try {
    const query = `
      SELECT *
      FROM \`${PROJECT_ID}.${ADS_DATASET}.${tableName}\`
      LIMIT ${limit}
    `;

    const [rows] = await bigquery.query(query);
    if (rows.length > 0) {
      console.log(JSON.stringify(rows[0], null, 2));
      console.log(`\n... mais ${rows.length - 1} linhas`);
    } else {
      console.log('❌ Tabela vazia');
    }
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
  }
}

async function main() {
  console.log('🔍 INSPEÇÃO DE SCHEMA - GOOGLE ADS TABLES\n');

  // Tables with actual data (from previous test)
  const tablesToInspect = [
    'p_ads_CampaignStats_2110204878',
    'p_ads_Campaign_2110204878',
    'p_ads_CampaignConversionStats_2110204878',
    'p_ads_KeywordStats_2110204878',
    'p_ads_Keyword_2110204878',
    'p_ads_SearchQueryStats_2110204878',
    'p_ads_LandingPageStats_2110204878'
  ];

  for (const table of tablesToInspect) {
    await inspectSchema(table);
    await sampleData(table, 2);
    console.log('\n');
  }
}

main().catch(console.error);
