#!/usr/bin/env node

/**
 * Motion Ventures Lead Scraper
 * Finds medium-sized, established Fresno businesses with old or nonexistent websites.
 * Uses Brave Search API (NOT Google Places — too expensive).
 *
 * Usage:
 *   node scripts/scrape-fresno-leads.mjs
 *   DRY_RUN=1 node scripts/scrape-fresno-leads.mjs
 *   MAX_LEADS=50 node scripts/scrape-fresno-leads.mjs
 */

import { createClient } from '@supabase/supabase-js';

// ── Config ──────────────────────────────────────────────────────────────────
const DEFAULT_SB_URL = 'https://wjcmxhymhixonvbjgrhq.supabase.co';
const DEFAULT_SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY214aHltaGl4b252YmpncmhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE4Mzg1NiwiZXhwIjoyMDg4NzU5ODU2fQ.ifwDFbNTiCEUVfCeYsGCFv0xS1rBTvp6k2bMZwAQb_M';

const BRAVE_API_KEY = process.env.BRAVE_SEARCH_API_KEY || 'BSAcMxzO8AD021dICd0f-5Zq5vuJJ8F';
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').startsWith('http') ? process.env.NEXT_PUBLIC_SUPABASE_URL : DEFAULT_SB_URL;
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').startsWith('ey') ? process.env.SUPABASE_SERVICE_ROLE_KEY : DEFAULT_SB_KEY;


const DRY_RUN = process.env.DRY_RUN === '1';
const MAX_LEADS = Number(process.env.MAX_LEADS) || 500;
const DELAY_MS = 1200; // respect Brave rate limits

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ── Search Queries ──────────────────────────────────────────────────────────
// Target established, medium-sized businesses likely to need web services
const FRESNO_AREAS = [
  'Fresno CA',
  'Clovis CA',
  'Madera CA',
  'Visalia CA',
  'Hanford CA',
  'Tulare CA',
  'Selma CA',
  'Sanger CA',
  'Reedley CA',
  'Kerman CA',
  'Kingsburg CA',
  'Lemoore CA',
  'Coalinga CA',
  'Dinuba CA',
  'Porterville CA',
];

const INDUSTRY_QUERIES = [
  'plumbing company',
  'HVAC contractor',
  'electrician',
  'roofing company',
  'landscaping company',
  'auto repair shop',
  'dental office',
  'law firm',
  'accounting firm',
  'insurance agency',
  'real estate agency',
  'veterinary clinic',
  'restaurant',
  'catering company',
  'construction company',
  'pest control',
  'cleaning service',
  'property management',
  'printing company',
  'auto dealership',
  'furniture store',
  'flooring company',
  'painting contractor',
  'moving company',
  'trucking company',
  'warehouse',
  'manufacturing',
  'welding shop',
  'machine shop',
  'towing company',
  'tire shop',
  'body shop',
  'daycare center',
  'gym fitness center',
  'salon barbershop',
  'spa massage',
  'photography studio',
  'wedding venue',
  'funeral home',
  'storage facility',
];

// ── Brave Search ────────────────────────────────────────────────────────────
async function braveSearch(query, offset = 0) {
  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', '20');
  url.searchParams.set('offset', String(offset));
  url.searchParams.set('result_filter', 'web');

  const res = await fetch(url.toString(), {
    headers: { 'X-Subscription-Token': BRAVE_API_KEY, Accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[brave] ${res.status}: ${text.slice(0, 200)}`);
    return [];
  }

  const json = await res.json();
  return json.web?.results || [];
}

// ── Brave Local Search (for phone/address) ──────────────────────────────────
async function braveLocalSearch(query) {
  const url = new URL('https://api.search.brave.com/res/v1/local/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', '20');

  const res = await fetch(url.toString(), {
    headers: { 'X-Subscription-Token': BRAVE_API_KEY, Accept: 'application/json' },
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json.results || [];
}

// ── Website Age Detection ───────────────────────────────────────────────────
async function checkWebsite(domain) {
  if (!domain) return { age: 'none', notes: 'No website found' };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://${domain}`, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    clearTimeout(timeout);

    if (!res.ok) return { age: 'none', notes: `HTTP ${res.status}` };

    const html = await res.text();
    const lower = html.toLowerCase();

    // Signals of an outdated website
    const outdatedSignals = [
      lower.includes('wordpress starter') || lower.includes('starter theme'),
      lower.includes('under construction') || lower.includes('coming soon'),
      lower.includes('parked domain') || lower.includes('this domain'),
      lower.includes('godaddy') && lower.includes('website builder'),
      lower.includes('wix.com') && html.length < 5000,
      !lower.includes('viewport') && !lower.includes('responsive'),
      lower.includes('table cellpadding') || lower.includes('table cellspacing'),
      lower.includes('marquee') || lower.includes('blink'),
      lower.includes('frontpage') || lower.includes('dreamweaver'),
      /<table[^>]*width\s*=\s*["']?\d+/i.test(html), // table-based layout
      lower.includes('copyright 20') && !lower.includes('copyright 2025') && !lower.includes('copyright 2026'),
      html.length < 2000, // suspiciously small
    ];

    const outdatedCount = outdatedSignals.filter(Boolean).length;
    const notes = [];

    if (outdatedCount >= 3) {
      notes.push('Multiple outdated signals detected');
    }
    if (!lower.includes('viewport')) notes.push('Not mobile-responsive');
    if (lower.includes('table cellpadding')) notes.push('Table-based layout');
    if (html.length < 2000) notes.push('Very thin content');
    if (lower.includes('under construction') || lower.includes('coming soon')) notes.push('Under construction/Coming soon');

    const copyrightMatch = html.match(/copyright\s*(?:©|\(c\))?\s*(20\d{2})/i);
    if (copyrightMatch) {
      const year = Number(copyrightMatch[1]);
      if (year < 2023) notes.push(`Copyright ${year}`);
    }

    if (outdatedCount >= 3) return { age: 'outdated', notes: notes.join('; ') };
    if (outdatedCount >= 1) return { age: 'aging', notes: notes.join('; ') };
    return { age: 'modern', notes: notes.join('; ') || 'Appears modern' };
  } catch (err) {
    if (err.name === 'AbortError') return { age: 'none', notes: 'Website timeout (8s)' };
    return { age: 'none', notes: `Error: ${err.message}` };
  }
}

// ── Extract Domain ──────────────────────────────────────────────────────────
function extractDomain(url) {
  if (!url) return null;
  try {
    const d = new URL(url).hostname.replace(/^www\./, '');
    // Skip aggregator/directory domains
    const skip = ['yelp.com', 'facebook.com', 'yellowpages.com', 'bbb.org', 'google.com',
      'mapquest.com', 'angieslist.com', 'thumbtack.com', 'homeadvisor.com', 'nextdoor.com',
      'linkedin.com', 'instagram.com', 'twitter.com', 'tiktok.com', 'pinterest.com'];
    if (skip.some(s => d.includes(s))) return null;
    return d;
  } catch {
    return null;
  }
}

// ── Extract Business Info from Brave Results ────────────────────────────────
function parseResult(result, area, industry) {
  const domain = extractDomain(result.url);
  const name = result.title
    ?.replace(/\s*[-|–—]\s*.*/g, '') // strip " - Yelp", " | Home"
    ?.replace(/\s*\(.*\)/, '') // strip parenthetical
    ?.trim();

  if (!name || name.length < 3 || name.length > 80) return null;

  // Skip directory/aggregator listings
  const skipPatterns = [
    /^the best \d+/i, /^top \d+/i, /^\d+ best/i,
    /near me/i, /in fresno/i, /in clovis/i, /in madera/i,
    /reviews/i, /yelp/i, /bbb/i, /yellowpages/i, /angi/i,
    /home ?advisor/i, /thumbtack/i, /nextdoor/i,
  ];
  if (skipPatterns.some((p) => p.test(name))) return null;

  return {
    name,
    domain,
    city: area.replace(/ CA$/, ''),
    state: 'CA',
    industry,
    source: 'brave_search',
    website_age: 'unknown', // will be checked later
  };
}

// ── Dedup ───────────────────────────────────────────────────────────────────
function dedup(leads) {
  const seen = new Set();
  return leads.filter((lead) => {
    const key = (lead.domain || lead.name).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('=== Motion Ventures Lead Scraper ===');
  console.log(`Target: Fresno-area businesses with old/no websites`);
  console.log(`Max leads: ${MAX_LEADS} | Dry run: ${DRY_RUN}`);
  console.log(`Areas: ${FRESNO_AREAS.length} | Industries: ${INDUSTRY_QUERIES.length}`);
  console.log(`Total query combinations: ${FRESNO_AREAS.length * INDUSTRY_QUERIES.length}\n`);

  let allLeads = [];
  let queryCount = 0;

  for (const area of FRESNO_AREAS) {
    if (allLeads.length >= MAX_LEADS) break;

    for (const industry of INDUSTRY_QUERIES) {
      if (allLeads.length >= MAX_LEADS) break;

      const query = `${industry} ${area}`;
      queryCount++;
      process.stdout.write(`[${queryCount}] "${query}" ... `);

      try {
        const results = await braveSearch(query);
        const parsed = results
          .map((r) => parseResult(r, area, industry))
          .filter(Boolean);

        console.log(`${parsed.length} results`);
        allLeads.push(...parsed);
      } catch (err) {
        console.log(`ERROR: ${err.message}`);
      }

      // Rate limit
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  // Dedup
  allLeads = dedup(allLeads);
  console.log(`\nTotal unique leads after dedup: ${allLeads.length}`);

  // Check website quality (the key filter)
  console.log('\nChecking website quality...');
  const hotLeads = [];
  let checked = 0;

  for (const lead of allLeads) {
    if (hotLeads.length >= MAX_LEADS) break;
    checked++;

    if (checked % 10 === 0) {
      process.stdout.write(`  Checked ${checked}/${allLeads.length} — ${hotLeads.length} hot leads\r`);
    }

    const { age, notes } = await checkWebsite(lead.domain);
    lead.website_age = age;
    lead.website_notes = notes;

    // Only keep businesses with no website, outdated, or aging websites
    if (['none', 'outdated', 'aging'].includes(age)) {
      hotLeads.push(lead);
    }
  }

  console.log(`\nHot leads (no/outdated website): ${hotLeads.length}`);

  // Stats
  const byAge = {};
  for (const l of hotLeads) {
    byAge[l.website_age] = (byAge[l.website_age] || 0) + 1;
  }
  console.log('By website status:', byAge);

  const byIndustry = {};
  for (const l of hotLeads) {
    byIndustry[l.industry] = (byIndustry[l.industry] || 0) + 1;
  }
  console.log('Top industries:', Object.entries(byIndustry).sort((a, b) => b[1] - a[1]).slice(0, 10));

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would insert:', hotLeads.length, 'companies');
    console.log('Sample:', hotLeads.slice(0, 5));
    return;
  }

  // Push to Supabase
  console.log('\nInserting into Supabase...');
  const BATCH = 200;
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < hotLeads.length; i += BATCH) {
    const batch = hotLeads.slice(i, i + BATCH);

    const { data, error } = await supabase
      .from('companies')
      .upsert(batch, { onConflict: 'google_place_id', ignoreDuplicates: true })
      .select('id');

    if (error) {
      console.error(`Batch insert error: ${error.message}`);
      // Fallback: insert one by one
      for (const lead of batch) {
        const { error: singleErr } = await supabase
          .from('companies')
          .insert(lead);
        if (singleErr) {
          skipped++;
        } else {
          inserted++;
        }
      }
    } else {
      inserted += data?.length || batch.length;
    }
  }

  console.log(`\nDone! Inserted: ${inserted} | Skipped: ${skipped}`);

  // Also try to enrich with local search for phone numbers
  console.log('\nEnriching top leads with phone numbers...');
  let enriched = 0;

  for (const lead of hotLeads.slice(0, 50)) {
    try {
      const locals = await braveLocalSearch(`${lead.name} ${lead.city} CA`);
      if (locals.length > 0) {
        const local = locals[0];
        const updates = {};
        if (local.phone) updates.phone = local.phone;
        if (local.address?.streetAddress) updates.address = local.address.streetAddress;

        if (Object.keys(updates).length > 0) {
          await supabase
            .from('companies')
            .update(updates)
            .eq('name', lead.name)
            .eq('city', lead.city);
          enriched++;
        }
      }
      await new Promise((r) => setTimeout(r, DELAY_MS));
    } catch {
      // skip enrichment errors
    }
  }

  console.log(`Enriched ${enriched} leads with phone/address`);
  console.log('\n=== Scraper Complete ===');
}

main().catch(console.error);
