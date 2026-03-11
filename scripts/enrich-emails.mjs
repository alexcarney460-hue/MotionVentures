#!/usr/bin/env node
/**
 * Motion Ventures — Email Enrichment
 * Scrapes company websites for owner/founder emails and names.
 * Creates contacts tagged as "Hot Lead" when owner info is found.
 *
 * Usage:
 *   node scripts/enrich-emails.mjs
 *   DRY_RUN=true node scripts/enrich-emails.mjs
 *   BATCH_SIZE=50 OFFSET=0 node scripts/enrich-emails.mjs
 */

import { createClient } from '@supabase/supabase-js';

const DEFAULT_SB_URL = 'https://wjcmxhymhixonvbjgrhq.supabase.co';
const DEFAULT_SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY214aHltaGl4b252YmpncmhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE4Mzg1NiwiZXhwIjoyMDg4NzU5ODU2fQ.ifwDFbNTiCEUVfCeYsGCFv0xS1rBTvp6k2bMZwAQb_M';

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').startsWith('http') ? process.env.NEXT_PUBLIC_SUPABASE_URL : DEFAULT_SB_URL;
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').startsWith('ey') ? process.env.SUPABASE_SERVICE_ROLE_KEY : DEFAULT_SB_KEY;
const DRY_RUN = process.env.DRY_RUN === 'true';
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '0', 10);
const OFFSET = parseInt(process.env.OFFSET || '0', 10);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

const JUNK_DOMAINS = new Set([
  'example.com', 'domain.com', 'mysite.com', 'sentry.io', 'w3.org',
  'schema.org', 'googleapis.com', 'google.com', 'facebook.com',
  'twitter.com', 'instagram.com', 'youtube.com', 'tiktok.com',
  'godaddy.com', 'wixpress.com', 'squarespace.com', 'wordpress.com',
  'shopify.com', 'cloudflare.com', 'jquery.com', 'bootstrapcdn.com',
]);

function isValidEmail(email) {
  const lower = email.toLowerCase();
  if (lower.length > 80) return false;
  if (/\.(png|jpg|svg|webp|gif|css|js)$/.test(lower)) return false;
  const domain = lower.split('@')[1];
  if (!domain) return false;
  for (const junk of JUNK_DOMAINS) {
    if (domain === junk || domain.endsWith('.' + junk)) return false;
  }
  if (/^(filler|example|user|name|your|test|noreply|no-reply)/.test(lower)) return false;
  return true;
}

const OWNER_PATTERNS = [
  /(?:owner|founder|proprietor|ceo|president|managing\s+director)[:\s\-–—]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/gi,
  /([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})[,\s\-–—]+(?:owner|founder|proprietor|ceo|president|co-founder)/gi,
  /"name"\s*:\s*"([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})"[^}]*"(?:jobTitle|title)"\s*:\s*"(?:owner|founder|ceo|president|managing director)"/gi,
  /(?:meet|about)\s+(?:the\s+)?(?:owner|founder)[:\s\-–—]*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/gi,
  /(?:owned|founded|started|created)\s+by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/gi,
];

async function fetchPage(url, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MotionVentures Lead Enrichment)' },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function scrapeOwnerInfo(domain) {
  if (!domain) return null;

  const pagesToCheck = [
    `https://${domain}`,
    `https://${domain}/about`,
    `https://${domain}/about-us`,
    `https://${domain}/our-story`,
    `https://${domain}/team`,
    `https://${domain}/contact`,
    `https://${domain}/contact-us`,
    `https://www.${domain}`,
    `https://www.${domain}/about`,
    `https://www.${domain}/contact`,
  ];

  const allEmails = new Set();
  let ownerName = null;

  for (const url of pagesToCheck) {
    const html = await fetchPage(url);
    if (!html) continue;

    const emailMatches = html.match(EMAIL_RE) || [];
    for (const email of emailMatches) {
      if (isValidEmail(email)) allEmails.add(email.toLowerCase());
    }

    const mailtoRe = /mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g;
    let m;
    while ((m = mailtoRe.exec(html)) !== null) {
      if (isValidEmail(m[1])) allEmails.add(m[1].toLowerCase());
    }

    if (!ownerName) {
      for (const pattern of OWNER_PATTERNS) {
        pattern.lastIndex = 0;
        const match = pattern.exec(html);
        if (match && match[1]) {
          const name = match[1].trim();
          if (/^[A-Z][a-z]+(\s+[A-Z][a-z]+){1,2}$/.test(name)) {
            ownerName = name;
            break;
          }
        }
      }
    }

    if (allEmails.size >= 3 && ownerName) break;
    await sleep(300);
  }

  const emails = [...allEmails].sort((a, b) => {
    const aGeneric = /^(info|contact|hello|support|admin|sales|order)@/.test(a);
    const bGeneric = /^(info|contact|hello|support|admin|sales|order)@/.test(b);
    if (aGeneric && !bGeneric) return 1;
    if (!aGeneric && bGeneric) return -1;
    return 0;
  });

  if (emails.length === 0 && !ownerName) return null;

  return {
    emails,
    ownerName,
    isHot: !!ownerName || emails.some(e => !/^(info|contact|hello|support|admin|sales|order)@/.test(e)),
  };
}

async function getCompaniesWithDomains() {
  const companies = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, domain, phone, city, state')
      .not('domain', 'is', null)
      .neq('domain', '')
      .range(from, from + pageSize - 1);

    if (error) { console.error('Fetch error:', error.message); break; }
    if (!data || data.length === 0) break;

    companies.push(...data);
    from += pageSize;
    if (data.length < pageSize) break;
  }

  return companies.filter(c =>
    c.domain &&
    c.domain.length > 3 &&
    !c.domain.includes('instagram.com') &&
    !c.domain.includes('facebook.com') &&
    !c.domain.includes('twitter.com') &&
    !c.domain.includes('tiktok.com') &&
    !c.domain.includes('youtube.com') &&
    !c.domain.includes('yelp.com') &&
    !c.domain.includes('bbb.org')
  );
}

async function getExistingEmails() {
  const emails = new Set();
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data } = await supabase
      .from('contacts')
      .select('email')
      .not('email', 'is', null)
      .neq('email', '')
      .range(from, from + pageSize - 1);

    if (!data || data.length === 0) break;
    for (const row of data) emails.add(row.email.toLowerCase());
    from += pageSize;
    if (data.length < pageSize) break;
  }

  return emails;
}

async function main() {
  console.log(`\nMotion Ventures — Email Enrichment`);
  console.log(`   Offset: ${OFFSET} | Batch: ${BATCH_SIZE || 'ALL'}`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`);

  console.log('Fetching companies with domains...');
  const withDomain = await getCompaniesWithDomains();
  console.log(`  ${withDomain.length} companies with valid domains\n`);

  console.log('Fetching existing contact emails (to skip duplicates)...');
  const existingEmails = await getExistingEmails();
  console.log(`  ${existingEmails.size} existing emails\n`);

  const toProcess = BATCH_SIZE > 0
    ? withDomain.slice(OFFSET, OFFSET + BATCH_SIZE)
    : withDomain.slice(OFFSET);

  let processed = 0;
  let contactsCreated = 0;
  let hotLeads = 0;
  let skippedDuplicates = 0;

  for (const company of toProcess) {
    const domain = company.domain;
    const name = company.name || domain;
    processed++;

    if (processed % 50 === 0) {
      console.log(`\n--- Progress: ${processed}/${toProcess.length} | Contacts: ${contactsCreated} | Hot: ${hotLeads} | Dupes skipped: ${skippedDuplicates} ---\n`);
    }

    process.stdout.write(`[${processed}/${toProcess.length}] ${name} (${domain})... `);

    const info = await scrapeOwnerInfo(domain);

    if (!info) {
      console.log('nothing found');
      continue;
    }

    const tag = info.isHot ? ' [HOT]' : '';
    console.log(`${info.emails.length} emails${info.ownerName ? `, owner: ${info.ownerName}` : ''}${tag}`);

    if (info.isHot) hotLeads++;
    if (DRY_RUN) continue;

    for (const email of info.emails.slice(0, 3)) {
      if (existingEmails.has(email.toLowerCase())) {
        skippedDuplicates++;
        continue;
      }

      let firstName = '', lastName = '';
      if (info.ownerName) {
        const parts = info.ownerName.split(' ');
        firstName = parts[0] || '';
        lastName = parts.slice(1).join(' ') || '';
      }

      const role = info.ownerName ? 'owner' : null;

      const { data, error } = await supabase.from('contacts').insert({
        company_id: company.id,
        email,
        firstname: firstName || null,
        lastname: lastName || null,
        phone: company.phone || null,
        city: company.city || null,
        state: company.state || null,
        role,
        source: 'website_scrape',
        lead_status: info.isHot ? 'OPEN' : 'NEW',
        lifecycle_stage: 'lead',
      }).select('id').single();

      if (data) {
        contactsCreated++;
        existingEmails.add(email.toLowerCase());
      } else if (error) {
        skippedDuplicates++;
      }
    }
  }

  console.log(`\n========== RESULTS ==========`);
  console.log(`  Processed: ${processed} companies`);
  console.log(`  Contacts created: ${contactsCreated}`);
  console.log(`  Hot leads (owner found): ${hotLeads}`);
  console.log(`  Duplicate emails skipped: ${skippedDuplicates}`);
  console.log(`  Resume with: OFFSET=${OFFSET + processed}`);
}

main().catch((err) => { console.error('Fatal error:', err); process.exit(1); });
