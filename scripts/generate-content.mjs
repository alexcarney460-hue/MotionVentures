#!/usr/bin/env node
/**
 * Motion Ventures — Content Generator with Real Images + Video Reels
 *
 * Uses:
 *   - Pollinations.ai for AI image generation (free, no key)
 *   - FFmpeg for slideshow video reels from images
 *   - instagrapi for posting (feed + reels)
 *
 * Usage:
 *   node scripts/generate-content.mjs              # generate 1 post with image
 *   REEL=true node scripts/generate-content.mjs    # generate a reel
 *   BATCH=3 node scripts/generate-content.mjs      # generate 3 posts
 */

import { createClient } from '@supabase/supabase-js';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SB_URL = 'https://wjcmxhymhixonvbjgrhq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY214aHltaGl4b252YmpncmhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE4Mzg1NiwiZXhwIjoyMDg4NzU5ODU2fQ.ifwDFbNTiCEUVfCeYsGCFv0xS1rBTvp6k2bMZwAQb_M';
const supabase = createClient(SB_URL, SB_KEY, { auth: { persistSession: false } });

const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const BATCH = parseInt(process.env.BATCH || '1', 10);
const MAKE_REEL = process.env.REEL === 'true';
const PY_CMD = process.platform === 'win32' ? 'py' : 'python3';
const IG_SCRIPT = path.resolve(__dirname, 'ig-post.py');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Download file from URL ────────────────────────────────────────
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', reject);
  });
}

// ─── Generate image via Pollinations ────────────────────────────────
async function generateImage(prompt, outputPath) {
  const encoded = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1080&height=1080&nologo=true&seed=${Date.now()}`;

  console.log('  Generating image via Pollinations...');

  // Pollinations can be slow, retry with delays
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await sleep(attempt * 5000); // wait longer each attempt
      await downloadFile(url, outputPath);
      const stat = fs.statSync(outputPath);
      if (stat.size > 10000) {
        console.log(`  Image saved: ${outputPath} (${(stat.size / 1024).toFixed(0)}KB)`);
        return outputPath;
      }
      // Too small = probably error JSON
      const content = fs.readFileSync(outputPath, 'utf8');
      if (content.includes('Too Many Requests')) {
        console.log(`  Rate limited, waiting ${attempt * 15}s...`);
        await sleep(attempt * 15000);
      }
    } catch (err) {
      console.log(`  Attempt ${attempt} failed: ${err.message}`);
    }
  }
  return null;
}

// ─── Create slideshow reel from images using FFmpeg ─────────────────
async function createReel(imagePaths, captionText, outputPath) {
  console.log('  Creating reel from images...');

  // Create a file list for FFmpeg
  const listPath = path.resolve(__dirname, '../tmp-ffmpeg-list.txt');
  const lines = imagePaths.map(p => `file '${p.replace(/\\/g, '/')}'\nduration 3`).join('\n');
  fs.writeFileSync(listPath, lines + `\nfile '${imagePaths[imagePaths.length - 1].replace(/\\/g, '/')}'`);

  try {
    await execFileAsync('ffmpeg', [
      '-y',
      '-f', 'concat', '-safe', '0', '-i', listPath,
      '-vf', 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black,fps=30',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
      '-t', '15',
      outputPath,
    ], { timeout: 60000 });

    fs.unlinkSync(listPath);
    const stat = fs.statSync(outputPath);
    console.log(`  Reel created: ${outputPath} (${(stat.size / 1024 / 1024).toFixed(1)}MB)`);
    return outputPath;
  } catch (err) {
    console.error('  FFmpeg error:', err.message);
    try { fs.unlinkSync(listPath); } catch {}
    return null;
  }
}

// ─── Post to Instagram ──────────────────────────────────────────────
async function postToIG(type, mediaPath, caption) {
  const args = type === 'reel'
    ? ['reel', '--video', mediaPath, '--caption', caption]
    : ['feed', '--image', mediaPath, '--caption', caption];

  try {
    const { stdout } = await execFileAsync(PY_CMD, [IG_SCRIPT, ...args], {
      env: {
        ...process.env,
        IG_USERNAME: process.env.IG_USERNAME || 'motionventures_co',
        IG_PASSWORD: process.env.IG_PASSWORD || '',
      },
      timeout: 120000,
    });
    return JSON.parse(stdout.trim());
  } catch (err) {
    if (err.stdout) try { return JSON.parse(err.stdout.trim()); } catch {}
    return { ok: false, error: err.message };
  }
}

// ─── Content Templates ──────────────────────────────────────────────
const CONTENT = [
  {
    topic: 'Website Before/After',
    prompt: 'Professional photo of a modern sleek website displayed on a MacBook Pro in a dark office with blue and green neon ambient lighting. Clean minimal desk setup. Web design agency portfolio piece. Ultra realistic, cinematic lighting, 4K quality.',
    caption: `Your customers are judging your business by your website.\n\nAnd honestly? They should be.\n\nA modern, fast, mobile-first website isn't a luxury anymore — it's the bare minimum. 73% of consumers judge a company's credibility based on web design alone.\n\nIf your site still looks like it was built in 2015, you're not just losing style points. You're losing customers.\n\nWe build websites that actually work — fast load times, clean design, and built to convert visitors into paying customers.\n\nDM us "AUDIT" for a free website review.\n\n#MotionVentures #FresnoCA #FresnoWebDesign #WebDesign #SmallBusiness #DigitalMarketing #ModernWebsite #BusinessGrowth #WebDevelopment #FresnoBusinesses #EntrepreneurLife #SmallBusinessTips #DesignMatters`,
  },
  {
    topic: 'AI Automation',
    prompt: 'Futuristic holographic AI dashboard floating above a desk in a dark modern office. Purple and blue neon glow. Shows automated chat messages, scheduling calendar, and analytics graphs. Professional tech aesthetic. Cinematic 4K quality.',
    caption: `What if your business never missed a lead — even at 2 AM?\n\nAI automation isn't science fiction. It's what separates businesses that scale from ones that stall.\n\nAutomatic responses in under 60 seconds. Smart follow-up sequences. Appointment booking without lifting a finger.\n\n75% of small businesses are already investing in AI. The question isn't IF you should — it's how fast your competitors already did.\n\nFor every $1 spent on digital marketing, the average return is $5.\n\nStop working harder. Start working smarter.\n\nDM us for a free automation assessment.\n\n#MotionVentures #FresnoCA #AIAutomation #SmallBusinessAutomation #ArtificialIntelligence #FresnoTech #BusinessGrowth #Productivity #FresnoWebDesign #TechForBusiness #AutomationTools #WorkSmarter`,
  },
  {
    topic: 'Fresno Growth',
    prompt: 'Aerial view of Fresno California downtown skyline at golden hour sunset. Modern buildings, construction cranes, vibrant city growing. Warm golden light with dramatic clouds. Professional photography, 4K cinematic quality.',
    caption: `Fresno is BUILDING.\n\n$2.5 BILLION in construction starts projected for 2026. New businesses opening every week. More competition than ever.\n\nBut here's the thing — most of them still don't have a real online presence.\n\nThat's your window.\n\nThe businesses that invest in their digital game NOW will own the market for the next decade. The ones that wait will be playing catch-up forever.\n\nYour website. Your SEO. Your automation. Your brand online.\n\nAll of it matters. And all of it is what we build.\n\nTag a Fresno business owner who's ready to level up.\n\n#MotionVentures #FresnoCA #FresnoWebDesign #FresnoBusiness #CentralValley #SupportLocal #DigitalTransformation #BusinessGrowth #FresnoStrong #Entrepreneur #SmallBusiness #BuildingFresno`,
  },
  {
    topic: 'SEO Dominance',
    prompt: 'Close-up of a smartphone screen showing Google search results with the number 1 result highlighted with a bright green glow. Dark blurred background. Professional marketing photography. Clean minimal tech aesthetic. 4K quality.',
    caption: `500+ people in Fresno are searching for YOUR exact service every month.\n\nRight now. On Google. Ready to buy.\n\nAnd they're finding your competitor instead.\n\nNot because they're better. Because they showed up on page 1 and you didn't.\n\nLocal SEO in a mid-size market like Fresno is WIDE OPEN. Most businesses aren't doing it, which means the first movers win big.\n\n3 quick wins:\n→ Optimize your Google Business Profile\n→ Add local keywords to your website\n→ Get consistent business citations\n\nDrop your business name in the comments. We'll tell you where you rank — free.\n\n#MotionVentures #FresnoCA #FresnoWebDesign #SEO #LocalSEO #GoogleRanking #FresnoSEO #SmallBusinessSEO #DigitalMarketing #SearchEngineOptimization #FresnoMarketing #GetFound`,
  },
  {
    topic: 'The $200 Website Trap',
    prompt: 'Dramatic image of cracked broken phone screen showing a glitchy outdated website with error messages. Red warning symbols and dollar signs floating away. Dark moody background with red accent lighting. Conceptual marketing photography. 4K quality.',
    caption: `"My nephew built our website for $200."\n\nCool. How many customers has it brought in?\n\n*crickets*\n\nThat silence costs more than you think.\n\nEvery visitor who bounces because your site loads slow? Customer gone.\nEvery person who can't find you on Google? Revenue lost.\nEvery mobile user who sees a broken layout? Trust destroyed.\n\n0.1 seconds faster = 8.4% more conversions.\nThat's not our opinion. That's Google's data.\n\nYour website should be your hardest-working employee. If it's not generating leads 24/7, it's not a website — it's a liability.\n\nDM "UPGRADE" for a free revenue leak analysis.\n\n#MotionVentures #FresnoCA #FresnoWebDesign #WebDesignTips #ROI #SmallBusinessGrowth #InvestInYourBusiness #ProfessionalDesign #QualityMatters #FresnoWebDeveloper #WebDesignMatters`,
  },
];

// ─── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log('\nMotion Ventures — Content Generator');
  console.log(`  Batch: ${BATCH} | Reel: ${MAKE_REEL}\n`);

  const tmpDir = path.resolve(__dirname, '..', 'tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const postsToMake = CONTENT.slice(0, BATCH);
  let published = 0;

  for (let i = 0; i < postsToMake.length; i++) {
    const content = postsToMake[i];
    console.log(`\n[${ i + 1}/${postsToMake.length}] ${content.topic}`);

    const imgPath = path.join(tmpDir, `post-${i + 1}.jpg`);
    const generated = await generateImage(content.prompt, imgPath);

    if (!generated) {
      console.log('  Skipping — image generation failed');
      continue;
    }

    let mediaPath = imgPath;
    let postType = 'feed';

    if (MAKE_REEL) {
      const reelPath = path.join(tmpDir, `reel-${i + 1}.mp4`);
      // Create a simple reel from the image (zoom effect)
      try {
        await execFileAsync('ffmpeg', [
          '-y', '-loop', '1', '-i', imgPath,
          '-vf', 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black,zoompan=z=min(zoom+0.002\\,1.3):d=300:s=1080x1920:fps=30',
          '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
          '-t', '10', reelPath,
        ], { timeout: 120000 });
        mediaPath = reelPath;
        postType = 'reel';
        console.log('  Reel created with zoom effect');
      } catch (err) {
        console.log(`  FFmpeg reel failed: ${err.message}, falling back to feed post`);
      }
    }

    // Post to Instagram
    if (process.env.IG_PASSWORD) {
      console.log(`  Posting ${postType} to Instagram...`);
      const result = await postToIG(postType, mediaPath, content.caption);
      if (result.ok) {
        console.log(`  POSTED! Media ID: ${result.media_id}`);
        published++;

        // Log to DB
        await supabase.from('marketing_content_queue').insert({
          platform: 'instagram',
          media_type: postType,
          format: postType,
          caption: content.caption,
          topic: content.topic,
          status: 'posted',
          agent_id: 'publisher',
          instagram_post_id: result.media_id,
          posted_at: new Date().toISOString(),
        });

        await supabase.from('agent_activity_log').insert({
          agent_id: 'publisher',
          action: `Published ${postType}: ${content.topic}`,
          details: { media_id: result.media_id, type: postType },
          status: 'success',
        });
      } else {
        console.log(`  FAILED: ${result.error}`);
        await supabase.from('agent_activity_log').insert({
          agent_id: 'publisher',
          action: `Failed to publish: ${content.topic}`,
          details: { error: result.error },
          status: 'error',
        });
      }
    } else {
      console.log('  IG_PASSWORD not set — skipping post');
    }

    // Wait between posts
    if (i < postsToMake.length - 1) {
      console.log('  Waiting 60s before next post...');
      await sleep(60000);
    }
  }

  console.log(`\n========== DONE ==========`);
  console.log(`  Published: ${published}/${postsToMake.length}`);

  // Cleanup tmp
  try {
    const files = fs.readdirSync(tmpDir);
    for (const f of files) fs.unlinkSync(path.join(tmpDir, f));
    fs.rmdirSync(tmpDir);
  } catch {}
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
