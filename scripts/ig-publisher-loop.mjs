#!/usr/bin/env node
/**
 * Motion Ventures — Instagram Publisher Loop
 * Polls the marketing_content_queue for approved items and publishes them
 * via instagrapi (scripts/ig-post.py).
 *
 * Usage:
 *   node scripts/ig-publisher-loop.mjs           # run once
 *   LOOP=true node scripts/ig-publisher-loop.mjs  # poll every 5 min
 *   INTERVAL=60 node scripts/ig-publisher-loop.mjs # custom interval (seconds)
 */

import { createClient } from '@supabase/supabase-js';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SB_URL = 'https://wjcmxhymhixonvbjgrhq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY214aHltaGl4b252YmpncmhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE4Mzg1NiwiZXhwIjoyMDg4NzU5ODU2fQ.ifwDFbNTiCEUVfCeYsGCFv0xS1rBTvp6k2bMZwAQb_M';

const supabase = createClient(SB_URL, SB_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const LOOP = process.env.LOOP === 'true';
const INTERVAL = parseInt(process.env.INTERVAL || '300', 10) * 1000;
const PY_CMD = process.platform === 'win32' ? 'py' : 'python3';
const SCRIPT = path.resolve(__dirname, 'ig-post.py');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function publishItem(item) {
  const caption = item.caption || '';
  const mediaType = item.media_type || item.format || 'feed';
  const imageUrl = item.image_url || (item.media_urls?.[0]) || '';
  const videoUrl = item.video_url || '';

  let args;
  if (mediaType === 'carousel' && item.media_urls?.length > 0) {
    args = ['carousel', '--images', item.media_urls.join(','), '--caption', caption];
  } else if (mediaType === 'reel' && videoUrl) {
    args = ['reel', '--video', videoUrl, '--caption', caption];
  } else if (imageUrl) {
    args = ['feed', '--image', imageUrl, '--caption', caption];
  } else {
    return { ok: false, error: 'No media URL' };
  }

  try {
    const { stdout } = await execFileAsync(PY_CMD, [SCRIPT, ...args], {
      env: {
        ...process.env,
        IG_USERNAME: process.env.IG_USERNAME || 'motionventures_co',
        IG_PASSWORD: process.env.IG_PASSWORD || '',
      },
      timeout: 120_000,
    });
    return JSON.parse(stdout.trim());
  } catch (err) {
    if (err.stdout) {
      try { return JSON.parse(err.stdout.trim()); } catch {}
    }
    return { ok: false, error: err.message };
  }
}

async function pollAndPublish() {
  const { data: items, error } = await supabase
    .from('marketing_content_queue')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: true })
    .limit(5);

  if (error) {
    console.error('DB error:', error.message);
    return;
  }

  if (!items || items.length === 0) {
    console.log(`[${new Date().toLocaleTimeString()}] No approved items in queue.`);
    return;
  }

  console.log(`[${new Date().toLocaleTimeString()}] Found ${items.length} approved item(s).`);

  for (const item of items) {
    const label = item.caption?.slice(0, 50) || `#${item.id}`;
    process.stdout.write(`  Publishing: ${label}... `);

    const result = await publishItem(item);

    if (result.ok) {
      console.log(`POSTED (media_id: ${result.media_id})`);
      await supabase
        .from('marketing_content_queue')
        .update({
          status: 'posted',
          instagram_post_id: result.media_id,
          posted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);
    } else {
      console.log(`FAILED: ${result.error}`);
      await supabase
        .from('marketing_content_queue')
        .update({
          status: 'failed',
          publish_error: result.error,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);
    }

    // Rate limit: wait 30s between posts
    await sleep(30_000);
  }
}

async function main() {
  console.log('Motion Ventures — Instagram Publisher');
  console.log(`  Mode: ${LOOP ? `LOOP (every ${INTERVAL / 1000}s)` : 'SINGLE RUN'}`);
  console.log('');

  if (!process.env.IG_PASSWORD) {
    console.error('ERROR: IG_PASSWORD env var is required.');
    process.exit(1);
  }

  await pollAndPublish();

  if (LOOP) {
    while (true) {
      await sleep(INTERVAL);
      await pollAndPublish();
    }
  }
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
