// FIXED: Comprehensive BigQuery Data Analysis
// Uses correct schema field names discovered from table inspection

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
// GOOGLE ADS ANALYSIS (FIXED)
// ============================================================================

async function analyzeGoogleAds() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 ANÁLISE GOOGLE ADS');
  console.log('='.repeat(80));

  const results = {};

  // 1. Campaign Performance (Last 90 days) - FIXED
  const campaignQuery = `
    SELECT
      c.campaign_name,
      c.campaign_status,
      COUNT(DISTINCT cs.segments_date) AS days_active,
      SUM(cs.metrics_impressions) AS impressions,
      SUM(cs.metrics_clicks) AS clicks,
      ROUND(SAFE_DIVIDE(SUM(cs.metrics_clicks), SUM(cs.metrics_impressions)) * 100, 2) AS ctr,
      ROUND(SUM(cs.metrics_cost_micros) / 1000000, 2) AS cost_brl,
      ROUND(SAFE_DIVIDE(SUM(cs.metrics_cost_micros), SUM(cs.metrics_clicks)) / 1000000, 2) AS cpc_brl,
      ROUND(SUM(cs.metrics_conversions), 0) AS conversions,
      ROUND(SAFE_DIVIDE(SUM(cs.metrics_cost_micros), SUM(cs.metrics_conversions)) / 1000000, 2) AS cost_per_conversion_brl
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Campaign_2110204878\` c
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_CampaignStats_2110204878\` cs
      ON c.campaign_id = cs.campaign_id AND c.customer_id = cs.customer_id
    WHERE cs.segments_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
      AND (c.campaign_status = 'ENABLED' OR c.campaign_status = 'PAUSED')
    GROUP BY c.campaign_name, c.campaign_status
    HAVING impressions > 0
    ORDER BY conversions DESC, cost_brl DESC
  `;
  results.campaigns = await runQuery(campaignQuery, 'Performance por Campanha (90 dias)');

  // 2. Campaign Conversions Breakdown - FIXED
  const conversionQuery = `
    SELECT
      c.campaign_name,
      ccs.segments_conversion_action_name,
      COUNT(DISTINCT ccs.segments_date) AS days_with_conversions,
      SUM(ccs.metrics_conversions) AS total_conversions,
      ROUND(AVG(ccs.metrics_conversions), 2) AS avg_conversions_per_day,
      MAX(ccs.metrics_conversions) AS max_conversions_single_day,
      SUM(ccs.metrics_conversions_value) AS total_value
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Campaign_2110204878\` c
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_CampaignConversionStats_2110204878\` ccs
      ON c.campaign_id = ccs.campaign_id AND c.customer_id = ccs.customer_id
    WHERE ccs.segments_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
      AND (c.campaign_status = 'ENABLED' OR c.campaign_status = 'PAUSED')
    GROUP BY c.campaign_name, ccs.segments_conversion_action_name
    ORDER BY total_conversions DESC
  `;
  results.campaignConversions = await runQuery(conversionQuery, 'Conversões Detalhadas por Campanha');

  // 3. Top Keywords Performance - FIXED
  const keywordQuery = `
    SELECT
      k.ad_group_criterion_keyword_text AS keyword,
      k.ad_group_criterion_keyword_match_type AS match_type,
      k.ad_group_criterion_quality_info_quality_score AS quality_score,
      c.campaign_name,
      SUM(ks.metrics_impressions) AS impressions,
      SUM(ks.metrics_clicks) AS clicks,
      ROUND(SAFE_DIVIDE(SUM(ks.metrics_clicks), SUM(ks.metrics_impressions)) * 100, 2) AS ctr,
      ROUND(SUM(ks.metrics_cost_micros) / 1000000, 2) AS cost_brl,
      ROUND(SUM(ks.metrics_conversions), 0) AS conversions,
      ROUND(SAFE_DIVIDE(SUM(ks.metrics_cost_micros), SUM(ks.metrics_conversions)) / 1000000, 2) AS cost_per_conversion
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Keyword_2110204878\` k
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_KeywordStats_2110204878\` ks
      ON k.ad_group_criterion_criterion_id = ks.ad_group_criterion_criterion_id
      AND k.campaign_id = ks.campaign_id
      AND k.ad_group_id = ks.ad_group_id
    JOIN \`${PROJECT_ID}.${ADS_DATASET}.p_ads_Campaign_2110204878\` c
      ON k.campaign_id = c.campaign_id AND k.customer_id = c.customer_id
    WHERE ks.segments_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
      AND k.ad_group_criterion_status = 'ENABLED'
      AND k.ad_group_criterion_negative = FALSE
    GROUP BY k.ad_group_criterion_keyword_text, k.ad_group_criterion_keyword_match_type,
             k.ad_group_criterion_quality_info_quality_score, c.campaign_name
    HAVING clicks > 0
    ORDER BY conversions DESC, clicks DESC
    LIMIT 100
  `;
  results.topKeywords = await runQuery(keywordQuery, 'Top 100 Keywords por Performance');

  // 4. Search Queries (Actual User Searches) - FIXED
  const searchQueryQuery = `
    SELECT
      sqs.search_term_view_search_term AS search_term,
      sqs.segments_search_term_match_type AS match_type,
      sqs.search_term_view_status AS status,
      COUNT(DISTINCT sqs.segments_date) AS days_seen,
      SUM(sqs.metrics_impressions) AS impressions,
      SUM(sqs.metrics_clicks) AS clicks,
      ROUND(SAFE_DIVIDE(SUM(sqs.metrics_clicks), SUM(sqs.metrics_impressions)) * 100, 2) AS ctr,
      ROUND(SUM(sqs.metrics_cost_micros) / 1000000, 2) AS cost_brl,
      SUM(sqs.metrics_conversions) AS conversions
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_SearchQueryStats_2110204878\` sqs
    WHERE sqs.segments_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
    GROUP BY sqs.search_term_view_search_term, sqs.segments_search_term_match_type, sqs.search_term_view_status
    HAVING clicks > 0
    ORDER BY conversions DESC, clicks DESC
    LIMIT 200
  `;
  results.searchQueries = await runQuery(searchQueryQuery, 'Top 200 Search Queries (buscas reais dos usuários)');

  // 5. Landing Pages Performance - FIXED
  const landingPageQuery = `
    SELECT
      lps.landing_page_view_unexpanded_final_url AS landing_page,
      lps.campaign_name,
      SUM(lps.metrics_impressions) AS impressions,
      SUM(lps.metrics_clicks) AS clicks,
      ROUND(SAFE_DIVIDE(SUM(lps.metrics_clicks), SUM(lps.metrics_impressions)) * 100, 2) AS ctr,
      ROUND(SUM(lps.metrics_cost_micros) / 1000000, 2) AS cost_brl,
      ROUND(AVG(lps.metrics_speed_score), 0) AS avg_speed_score
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_LandingPageStats_2110204878\` lps
    WHERE lps.segments_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
    GROUP BY lps.landing_page_view_unexpanded_final_url, lps.campaign_name
    HAVING clicks > 0
    ORDER BY clicks DESC
    LIMIT 50
  `;
  results.landingPages = await runQuery(landingPageQuery, 'Top 50 Landing Pages');

  // 6. Daily Performance Trend (Last 30 days for chart)
  const dailyTrendQuery = `
    SELECT
      cs.segments_date AS date,
      SUM(cs.metrics_impressions) AS impressions,
      SUM(cs.metrics_clicks) AS clicks,
      ROUND(SUM(cs.metrics_cost_micros) / 1000000, 2) AS cost_brl,
      ROUND(SUM(cs.metrics_conversions), 0) AS conversions
    FROM \`${PROJECT_ID}.${ADS_DATASET}.p_ads_CampaignStats_2110204878\` cs
    WHERE cs.segments_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
    GROUP BY cs.segments_date
    ORDER BY cs.segments_date DESC
  `;
  results.dailyTrend = await runQuery(dailyTrendQuery, 'Tendência Diária (30 dias)');

  return results;
}

// ============================================================================
// GA4 ANALYSIS (Already working)
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
      ROUND(SAFE_DIVIDE(COUNT(DISTINCT CASE
        WHEN event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
        THEN user_pseudo_id
      END), COUNT(DISTINCT user_pseudo_id)) * 100, 2) AS conversion_rate
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
      ROUND(SAFE_DIVIDE(COUNT(DISTINCT CASE
        WHEN event_name IN ('whatsapp_click', 'click', 'contact_whatsapp')
        THEN user_pseudo_id
      END), COUNT(DISTINCT user_pseudo_id)) * 100, 2) AS conversion_rate
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
  console.log('🚀 INICIANDO ANÁLISE COMPLETA DE DADOS (FIXED VERSION)');
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
      },
      analysis_version: 'v2-fixed'
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
  console.log(`   - ${adsResults.campaigns?.length || 0} campanhas analisadas`);
  console.log(`   - ${adsResults.topKeywords?.length || 0} keywords com performance`);
  console.log(`   - ${adsResults.searchQueries?.length || 0} search queries analisadas`);
  console.log(`   - ${adsResults.landingPages?.length || 0} landing pages`);
  console.log(`   - ${adsResults.dailyTrend?.length || 0} dias de tendência`);
  console.log(`\n   GA4:`);
  console.log(`   - ${ga4Results.topPages?.length || 0} páginas mais visitadas`);
  console.log(`   - ${ga4Results.whatsappClicks?.length || 0} registros de cliques WhatsApp`);
  console.log(`   - ${ga4Results.entryPages?.length || 0} páginas de entrada analisadas`);
  console.log(`   - ${ga4Results.trafficSources?.length || 0} fontes de tráfego`);
  console.log('\n');
}

// Run the analysis
generateReport().catch(console.error);
