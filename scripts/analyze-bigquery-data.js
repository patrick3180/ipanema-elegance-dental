// Comprehensive BigQuery Data Analysis
// Analyzes Google Ads + GA4 data to generate complete performance report

import { BigQuery } from '@google-cloud/bigquery';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize BigQuery
const credentialsPath = join(__dirname, '..', 'bigquery-credentials.json');
const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
const bigquery = new BigQuery({
  projectId: credentials.project_id,
  credentials: credentials,
});

const PROJECT_ID = credentials.project_id;
const ADS_DATASET = 'clinica_dra_carla_ads';
const GA4_DATASET = 'analytics_477782713';

// Helper to run query
async function runQuery(query, description) {
  console.log(`\n🔍 ${description}...`);
  try {
    const [rows] = await bigquery.query(query);
    console.log(`   ✅ ${rows.length} resultados encontrados`);
    return rows;
  } catch (error) {
    console.error(`   ❌ Erro: ${error.message}`);
    return [];
  }
}

// ============================================================================
// GOOGLE ADS ANALYSIS
// ============================================================================

async function analyzeGoogleAds() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 ANÁLISE GOOGLE ADS');
  console.log('='.repeat(80));

  const results = {};

  // 1. Campaign Performance (Last 90 days)
  const campaignQuery = `
    SELECT
      c.name AS campaign_name,
      c.status AS campaign_status,
      COUNT(DISTINCT cs._DATA_DATE) AS days_active,
      SUM(cs.impressions) AS impressions,
      SUM(cs.clicks) AS clicks,
      ROUND(SUM(cs.clicks) / NULLIF(SUM(cs.impressions), 0) * 100, 2) AS ctr,
      ROUND(SUM(cs.cost) / 1000000, 2) AS cost_brl,
      ROUND(SUM(cs.cost) / NULLIF(SUM(cs.clicks), 0) / 1000000, 2) AS cpc_brl,
      ROUND(SUM(cs.conversions), 0) AS conversions,
      ROUND(SUM(cs.cost) / NULLIF(SUM(cs.conversions), 0) / 1000000, 2) AS cost_per_conversion_brl
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Campaign_2110204878\` c
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_CampaignStats_2110204878\` cs
      ON c.id = cs.campaign_id
    WHERE cs._DATA_DATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
      AND c.status = 'ENABLED'
    GROUP BY c.name, c.status
    ORDER BY conversions DESC, cost_brl DESC
  `;
  results.campaigns = await runQuery(campaignQuery, 'Performance por Campanha (90 dias)');

  // 2. Campaign Conversions Breakdown
  const conversionQuery = `
    SELECT
      c.name AS campaign_name,
      COUNT(DISTINCT ccs._DATA_DATE) AS days_with_conversions,
      SUM(ccs.conversions) AS total_conversions,
      SUM(ccs.all_conversions) AS total_all_conversions,
      ROUND(AVG(ccs.conversions), 2) AS avg_conversions_per_day,
      MAX(ccs.conversions) AS max_conversions_single_day,
      SUM(ccs.view_through_conversions) AS view_through_conversions
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Campaign_2110204878\` c
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_CampaignConversionStats_2110204878\` ccs
      ON c.id = ccs.campaign_id
    WHERE ccs._DATA_DATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
      AND c.status = 'ENABLED'
    GROUP BY c.name
    ORDER BY total_conversions DESC
  `;
  results.campaignConversions = await runQuery(conversionQuery, 'Conversões Detalhadas por Campanha');

  // 3. Top Keywords Performance
  const keywordQuery = `
    SELECT
      k.text AS keyword,
      k.match_type AS match_type,
      ag.name AS ad_group_name,
      c.name AS campaign_name,
      SUM(ks.impressions) AS impressions,
      SUM(ks.clicks) AS clicks,
      ROUND(SUM(ks.clicks) / NULLIF(SUM(ks.impressions), 0) * 100, 2) AS ctr,
      ROUND(SUM(ks.cost) / 1000000, 2) AS cost_brl,
      ROUND(SUM(ks.conversions), 0) AS conversions,
      ROUND(SUM(ks.cost) / NULLIF(SUM(ks.conversions), 0) / 1000000, 2) AS cost_per_conversion
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Keyword_2110204878\` k
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_KeywordStats_2110204878\` ks
      ON k.id = ks.keyword_id
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_AdGroup_2110204878\` ag
      ON k.ad_group_id = ag.id
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Campaign_2110204878\` c
      ON ag.campaign_id = c.id
    WHERE ks._DATA_DATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
      AND k.status = 'ENABLED'
    GROUP BY k.text, k.match_type, ag.name, c.name
    HAVING clicks > 0
    ORDER BY conversions DESC, clicks DESC
    LIMIT 50
  `;
  results.topKeywords = await runQuery(keywordQuery, 'Top 50 Keywords por Performance');

  // 4. Search Queries (Actual User Searches)
  const searchQueryQuery = `
    SELECT
      sqs.search_term AS search_term,
      COUNT(DISTINCT sqs._DATA_DATE) AS days_seen,
      SUM(sqs.impressions) AS impressions,
      SUM(sqs.clicks) AS clicks,
      ROUND(SUM(sqs.clicks) / NULLIF(SUM(sqs.impressions), 0) * 100, 2) AS ctr,
      ROUND(SUM(sqs.cost) / 1000000, 2) AS cost_brl,
      SUM(sqs.conversions) AS conversions
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_SearchQueryStats_2110204878\` sqs
    WHERE sqs._DATA_DATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
    GROUP BY sqs.search_term
    HAVING clicks > 0
    ORDER BY conversions DESC, clicks DESC
    LIMIT 100
  `;
  results.searchQueries = await runQuery(searchQueryQuery, 'Top 100 Search Queries (buscas reais dos usuários)');

  // 5. Landing Pages Performance
  const landingPageQuery = `
    SELECT
      lps.unexpanded_final_url AS landing_page,
      SUM(lps.impressions) AS impressions,
      SUM(lps.clicks) AS clicks,
      ROUND(SUM(lps.clicks) / NULLIF(SUM(lps.impressions), 0) * 100, 2) AS ctr,
      ROUND(SUM(lps.cost) / 1000000, 2) AS cost_brl,
      ROUND(SUM(lps.conversions), 0) AS conversions,
      ROUND(SUM(lps.conversions) / NULLIF(SUM(lps.clicks), 0) * 100, 2) AS conversion_rate
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_LandingPageStats_2110204878\` lps
    WHERE lps._DATA_DATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
    GROUP BY lps.unexpanded_final_url
    HAVING clicks > 0
    ORDER BY conversions DESC, clicks DESC
    LIMIT 30
  `;
  results.landingPages = await runQuery(landingPageQuery, 'Top 30 Landing Pages');

  // 6. Demographics - Age & Gender
  const demographicsQuery = `
    SELECT
      ar.type AS age_range,
      g.type AS gender,
      SUM(ars.impressions) AS impressions,
      SUM(ars.clicks) AS clicks,
      ROUND(SUM(ars.clicks) / NULLIF(SUM(ars.impressions), 0) * 100, 2) AS ctr,
      SUM(arcs.conversions) AS conversions
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_AgeRangeStats_2110204878\` ars
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_AgeRange_2110204878\` ar
      ON ars.criteria_id = ar.id
    LEFT JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_GenderStats_2110204878\` gs
      ON ars.campaign_id = gs.campaign_id AND ars._DATA_DATE = gs._DATA_DATE
    LEFT JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Gender_2110204878\` g
      ON gs.criteria_id = g.id
    LEFT JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_AgeRangeConversionStats_2110204878\` arcs
      ON ars.criteria_id = arcs.criteria_id AND ars._DATA_DATE = arcs._DATA_DATE
    WHERE ars._DATA_DATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
    GROUP BY ar.type, g.type
    HAVING clicks > 0
    ORDER BY conversions DESC, clicks DESC
    LIMIT 20
  `;
  results.demographics = await runQuery(demographicsQuery, 'Performance por Demografia (Idade & Gênero)');

  return results;
}

// ============================================================================
// GA4 ANALYSIS
// ============================================================================

async function analyzeGA4() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 ANÁLISE GA4 (GOOGLE ANALYTICS 4)');
  console.log('='.repeat(80));

  const results = {};

  // 1. Top Pages by Views (Last 90 days)
  const topPagesQuery = `
    SELECT
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') AS page_url,
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_title') AS page_title,
      COUNT(*) AS page_views,
      COUNT(DISTINCT user_pseudo_id) AS unique_users,
      ROUND(AVG((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'engagement_time_msec')) / 1000, 2) AS avg_engagement_time_sec
    FROM \`${PROJECT_ID}.${GA4_DATASET}.events_*\`
    WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY))
                          AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
      AND event_name = 'page_view'
    GROUP BY page_url, page_title
    HAVING page_url IS NOT NULL
    ORDER BY page_views DESC
    LIMIT 50
  `;
  results.topPages = await runQuery(topPagesQuery, 'Top 50 Páginas por Visualizações (90 dias)');

  // 2. WhatsApp Click Events (Conversions)
  const whatsappClicksQuery = `
    SELECT
      DATE(PARSE_TIMESTAMP('%Y%m%d', event_date)) AS date,
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') AS page_url,
      COUNT(*) AS whatsapp_clicks,
      COUNT(DISTINCT user_pseudo_id) AS unique_users
    FROM \`${PROJECT_ID}.${GA4_DATASET}.events_*\`
    WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY))
                          AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
      AND event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
    GROUP BY date, page_url
    ORDER BY date DESC, whatsapp_clicks DESC
    LIMIT 200
  `;
  results.whatsappClicks = await runQuery(whatsappClicksQuery, 'Cliques WhatsApp por Data e Página');

  // 3. User Journey - Entry Pages to Conversion
  const entryPagesQuery = `
    SELECT
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') AS entry_page,
      COUNT(DISTINCT user_pseudo_id) AS total_sessions,
      COUNT(DISTINCT CASE
        WHEN event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
        THEN user_pseudo_id
      END) AS sessions_with_conversion,
      ROUND(COUNT(DISTINCT CASE
        WHEN event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
        THEN user_pseudo_id
      END) / COUNT(DISTINCT user_pseudo_id) * 100, 2) AS conversion_rate
    FROM \`${PROJECT_ID}.${GA4_DATASET}.events_*\`
    WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY))
                          AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
      AND event_name IN ('session_start', 'whatsapp_click', 'click', 'contact_whatsapp')
    GROUP BY entry_page
    HAVING entry_page IS NOT NULL AND total_sessions > 10
    ORDER BY sessions_with_conversion DESC, conversion_rate DESC
    LIMIT 30
  `;
  results.entryPages = await runQuery(entryPagesQuery, 'Páginas de Entrada e Taxa de Conversão');

  // 4. Traffic Sources
  const trafficSourcesQuery = `
    SELECT
      traffic_source.source AS source,
      traffic_source.medium AS medium,
      traffic_source.name AS campaign,
      COUNT(DISTINCT user_pseudo_id) AS users,
      COUNT(*) AS sessions,
      COUNT(DISTINCT CASE
        WHEN event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
        THEN user_pseudo_id
      END) AS conversions
    FROM \`${PROJECT_ID}.${GA4_DATASET}.events_*\`
    WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY))
                          AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
      AND event_name = 'session_start'
    GROUP BY source, medium, campaign
    ORDER BY conversions DESC, users DESC
    LIMIT 30
  `;
  results.trafficSources = await runQuery(trafficSourcesQuery, 'Fontes de Tráfego e Conversões');

  // 5. Device Performance
  const deviceQuery = `
    SELECT
      device.category AS device_category,
      device.operating_system AS os,
      COUNT(DISTINCT user_pseudo_id) AS users,
      COUNT(*) AS page_views,
      COUNT(DISTINCT CASE
        WHEN event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
        THEN user_pseudo_id
      END) AS conversions,
      ROUND(COUNT(DISTINCT CASE
        WHEN event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
        THEN user_pseudo_id
      END) / COUNT(DISTINCT user_pseudo_id) * 100, 2) AS conversion_rate
    FROM \`${PROJECT_ID}.${GA4_DATASET}.events_*\`
    WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY))
                          AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
    GROUP BY device_category, os
    ORDER BY users DESC
    LIMIT 20
  `;
  results.devices = await runQuery(deviceQuery, 'Performance por Dispositivo');

  return results;
}

// ============================================================================
// GENERATE REPORT
// ============================================================================

async function generateReport() {
  const timestamp = new Date().toISOString();

  console.log('\n' + '='.repeat(80));
  console.log('🚀 INICIANDO ANÁLISE COMPLETA DE DADOS');
  console.log(`📅 Data/Hora: ${timestamp}`);
  console.log('='.repeat(80));

  // Run all analyses
  const adsResults = await analyzeGoogleAds();
  const ga4Results = await analyzeGA4();

  // Combine results
  const fullReport = {
    metadata: {
      generated_at: timestamp,
      period: 'Last 90 days',
      data_sources: {
        google_ads: `${PROJECT_ID}.${ADS_DATASET}`,
        ga4: `${PROJECT_ID}.${GA4_DATASET}`
      }
    },
    google_ads: adsResults,
    ga4: ga4Results
  };

  // Save to JSON file
  const outputPath = join(__dirname, '..', 'BIGQUERY-DATA-ANALYSIS-RESULTS.json');
  writeFileSync(outputPath, JSON.stringify(fullReport, null, 2), 'utf8');

  console.log('\n' + '='.repeat(80));
  console.log('✅ ANÁLISE COMPLETA!');
  console.log('='.repeat(80));
  console.log(`\n📄 Relatório salvo em: ${outputPath}`);
  console.log('\n📊 Resumo dos Dados Coletados:');
  console.log(`   Google Ads:`);
  console.log(`   - ${adsResults.campaigns?.length || 0} campanhas ativas`);
  console.log(`   - ${adsResults.topKeywords?.length || 0} keywords com performance`);
  console.log(`   - ${adsResults.searchQueries?.length || 0} search queries analisadas`);
  console.log(`   - ${adsResults.landingPages?.length || 0} landing pages`);
  console.log(`\n   GA4:`);
  console.log(`   - ${ga4Results.topPages?.length || 0} páginas mais visitadas`);
  console.log(`   - ${ga4Results.whatsappClicks?.length || 0} registros de cliques WhatsApp`);
  console.log(`   - ${ga4Results.entryPages?.length || 0} páginas de entrada analisadas`);
  console.log(`   - ${ga4Results.trafficSources?.length || 0} fontes de tráfego`);
  console.log('\n');
}

// Run the analysis
generateReport().catch(console.error);
