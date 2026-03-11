#!/usr/bin/env node
/**
 * Motion Ventures — Instagram Agent Marketing Team
 * 7 AI agents that collaborate to create and publish Instagram content.
 *
 * Agents:
 *   1. CATALYST  — Content Strategist (generates content ideas)
 *   2. MAVEN     — Research Analyst (researches trends & angles)
 *   3. ECHO      — Copywriter (writes the caption)
 *   4. TAGS      — Hashtag Expert (generates hashtags)
 *   5. GUARDIAN   — Brand Checker (reviews for quality & safety)
 *   6. COURIER   — Scheduler (queues the approved post)
 *   7. PUBLISHER — Post Executor (handled by ig-publisher-loop.mjs)
 *
 * Usage:
 *   node scripts/agent-team.mjs                    # generate 1 post
 *   POSTS=3 node scripts/agent-team.mjs            # generate 3 posts
 *   LOOP=true node scripts/agent-team.mjs          # generate 1 post every 4 hours
 *   AUTO_APPROVE=true node scripts/agent-team.mjs  # skip Guardian review, auto-approve
 */

import { createClient } from '@supabase/supabase-js';

// ─── Config ─────────────────────────────────────────────────────────
const GEMINI_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAyDqVpIEozKnOweTWd-hShVth6RoOs9OE';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

const SB_URL = 'https://wjcmxhymhixonvbjgrhq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY214aHltaGl4b252YmpncmhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE4Mzg1NiwiZXhwIjoyMDg4NzU5ODU2fQ.ifwDFbNTiCEUVfCeYsGCFv0xS1rBTvp6k2bMZwAQb_M';

const supabase = createClient(SB_URL, SB_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const POSTS_PER_RUN = parseInt(process.env.POSTS || '1', 10);
const LOOP = process.env.LOOP === 'true';
const LOOP_INTERVAL = parseInt(process.env.INTERVAL || '14400', 10) * 1000; // 4hrs default
const AUTO_APPROVE = process.env.AUTO_APPROVE === 'true';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Brand Context ──────────────────────────────────────────────────
const BRAND = {
  name: 'Motion Ventures',
  tagline: 'AI Studio building ventures and shipping practical automations',
  location: 'Fresno, CA',
  services: [
    'Modern website design & development',
    'AI-powered business automations',
    'CRM setup & lead generation',
    'SEO & digital marketing',
    'E-commerce & online stores',
    'Business software & tools',
  ],
  audience: 'Small to medium Fresno-area businesses with outdated or no websites',
  tone: 'Professional but approachable, confident, slightly edgy, tech-forward',
  instagram: '@motionventures_co',
  cta: 'DM us for a free website audit',
  avoid: ['pushy sales language', 'guarantees', 'bashing competitors', 'generic motivational quotes'],
};

const CONTENT_THEMES = [
  'website redesign before/after concept',
  'why your website matters more than your business card',
  'local Fresno business success story (fictional but relatable)',
  'common website mistakes small businesses make',
  'how AI is changing small business operations',
  'the cost of NOT having a modern website',
  'mobile-first design tips for local businesses',
  'SEO basics every Fresno business owner should know',
  'why your competitors are getting more customers online',
  'automation tips that save business owners 10+ hours/week',
  'the difference between a $500 and $5000 website',
  'what your customers think when they see your old website',
  'how to turn your website into a lead generation machine',
  'Fresno small business spotlight / community love',
  'behind the scenes at Motion Ventures',
  'web design trends that actually convert',
  'why DIY website builders are costing you customers',
  'the power of a professional online presence',
  'digital transformation for traditional businesses',
  'free tools every small business owner should use',
];

// ─── Gemini AI Helper ───────────────────────────────────────────────
async function askGemini(systemPrompt, userPrompt) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n---\n\n${userPrompt}` }] },
      ],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ─── Agent Functions ────────────────────────────────────────────────

// AGENT 1: CATALYST — Content Strategist
async function runCatalyst() {
  const theme = CONTENT_THEMES[Math.floor(Math.random() * CONTENT_THEMES.length)];
  const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];

  console.log('  [CATALYST] Generating content idea...');
  const idea = await askGemini(
    `You are CATALYST, a content strategist for ${BRAND.name} — ${BRAND.tagline}. Located in ${BRAND.location}. Target audience: ${BRAND.audience}. Tone: ${BRAND.tone}.`,
    `Today is ${dayOfWeek}. Generate a single Instagram post idea based on this theme: "${theme}"

Return ONLY a JSON object with these fields:
{
  "topic": "short topic title",
  "angle": "the specific angle or hook for this post",
  "format": "feed",
  "visual_direction": "brief description of what the image should convey"
}

No markdown, no code fences, just the JSON.`
  );

  try {
    const cleaned = idea.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { topic: theme, angle: 'general awareness', format: 'feed', visual_direction: 'clean modern design' };
  }
}

// AGENT 2: MAVEN — Research Analyst
async function runMaven(idea) {
  console.log('  [MAVEN] Researching angles & data points...');
  const research = await askGemini(
    `You are MAVEN, a research analyst for ${BRAND.name}. You find compelling statistics, trends, and angles that make social media content more engaging. Focus on the Fresno/Central Valley market.`,
    `Research this topic for an Instagram post: "${idea.topic}" with angle: "${idea.angle}"

Provide 2-3 bullet points of interesting data, stats, or insights that would make this post more compelling. Keep it brief and factual. Return plain text, no JSON.`
  );
  return research.trim();
}

// AGENT 3: ECHO — Copywriter
async function runEcho(idea, research) {
  console.log('  [ECHO] Writing caption...');
  const caption = await askGemini(
    `You are ECHO, an Instagram copywriter for ${BRAND.name} (${BRAND.instagram}).
Services: ${BRAND.services.join(', ')}.
Tone: ${BRAND.tone}.
CTA: ${BRAND.cta}.
AVOID: ${BRAND.avoid.join(', ')}.

Write captions that are scroll-stopping, authentic, and drive engagement. Use line breaks for readability. Include a clear CTA. Keep it under 2000 characters.`,
    `Write an Instagram caption for:
Topic: ${idea.topic}
Angle: ${idea.angle}
Research: ${research}

Rules:
- Start with a hook (question, bold statement, or relatable pain point)
- 3-5 short paragraphs with line breaks
- End with a CTA
- Do NOT include hashtags (another agent handles those)
- Do NOT use code fences or JSON formatting
- Return ONLY the caption text, nothing else`
  );
  return caption.trim().replace(/^["']|["']$/g, '');
}

// AGENT 4: TAGS — Hashtag Expert
async function runTags(idea, caption) {
  console.log('  [TAGS] Generating hashtags...');
  const tags = await askGemini(
    `You are TAGS, a hashtag strategist for ${BRAND.name} in ${BRAND.location}. You create hashtag sets that maximize reach while staying relevant.`,
    `Generate hashtags for this Instagram post:
Topic: ${idea.topic}
Caption preview: ${caption.slice(0, 200)}...

Rules:
- 15-20 hashtags total
- Mix of: 5 high-volume (100K+ posts), 5 medium (10K-100K), 5 niche/local
- Always include: #MotionVentures #FresnoCA #FresnoWebDesign
- Include industry-specific and local tags
- Return ONLY the hashtags on a single line, space-separated, each starting with #
- No commentary, no JSON, no formatting`
  );
  return tags.trim().replace(/\n/g, ' ');
}

// AGENT 5: GUARDIAN — Brand Checker
async function runGuardian(caption, hashtags) {
  console.log('  [GUARDIAN] Reviewing for brand safety...');
  const review = await askGemini(
    `You are GUARDIAN, a brand safety reviewer for ${BRAND.name}. You check content for:
- Brand voice consistency (${BRAND.tone})
- No prohibited language (${BRAND.avoid.join(', ')})
- Professional quality
- Appropriate for Instagram business account
- Not spammy or overly promotional
- No factual claims that could be problematic`,
    `Review this Instagram post:

CAPTION:
${caption}

HASHTAGS:
${hashtags}

Return ONLY a JSON object:
{
  "approved": true or false,
  "score": 1-10,
  "issues": ["list of issues if any"],
  "suggestion": "optional improvement suggestion or empty string"
}

No markdown, no code fences.`
  );

  try {
    const cleaned = review.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { approved: true, score: 7, issues: [], suggestion: '' };
  }
}

// AGENT 6: COURIER — Scheduler (queues the post)
async function runCourier(caption, hashtags, idea, guardianReview) {
  console.log('  [COURIER] Queuing approved post...');

  const fullCaption = `${caption}\n\n${hashtags}`;

  // Generate a placeholder image URL with the topic
  const topicEncoded = encodeURIComponent(idea.topic.slice(0, 30));
  const imageUrl = `https://placehold.co/1080x1080/0a0a1a/00ff88.png?text=${topicEncoded}`;

  const status = AUTO_APPROVE ? 'approved' : 'draft';

  const { data, error } = await supabase
    .from('marketing_content_queue')
    .insert({
      platform: 'instagram',
      media_type: 'feed',
      image_url: imageUrl,
      caption: fullCaption,
      status,
      agent_id: 'courier',
      format: 'feed',
      topic: idea.topic,
      hook: idea.angle,
      compliance: guardianReview,
    })
    .select()
    .single();

  if (error) {
    console.error('  [COURIER] Queue error:', error.message);
    return null;
  }

  return data;
}

// ─── Orchestrator ───────────────────────────────────────────────────
async function generatePost(postNum, totalPosts) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`POST ${postNum}/${totalPosts} — ${new Date().toLocaleTimeString()}`);
  console.log('═'.repeat(60));

  // 1. CATALYST generates the idea
  const idea = await runCatalyst();
  console.log(`  [CATALYST] Topic: "${idea.topic}"`);
  console.log(`  [CATALYST] Angle: "${idea.angle}"`);

  // 2. MAVEN researches
  const research = await runMaven(idea);
  console.log(`  [MAVEN] Research complete (${research.length} chars)`);

  // 3. ECHO writes the caption
  const caption = await runEcho(idea, research);
  console.log(`  [ECHO] Caption: "${caption.slice(0, 80)}..."`);

  // 4. TAGS generates hashtags
  const hashtags = await runTags(idea, caption);
  const tagCount = (hashtags.match(/#/g) || []).length;
  console.log(`  [TAGS] ${tagCount} hashtags generated`);

  // 5. GUARDIAN reviews
  const review = await runGuardian(caption, hashtags);
  console.log(`  [GUARDIAN] Score: ${review.score}/10 | Approved: ${review.approved}`);
  if (review.issues?.length > 0) {
    console.log(`  [GUARDIAN] Issues: ${review.issues.join(', ')}`);
  }

  if (!review.approved && !AUTO_APPROVE) {
    console.log('  [GUARDIAN] REJECTED — skipping this post.');
    return null;
  }

  // 6. COURIER queues it
  const queued = await runCourier(caption, hashtags, idea, review);
  if (queued) {
    console.log(`  [COURIER] Queued as #${queued.id} (status: ${queued.status})`);
    if (queued.status === 'approved') {
      console.log('  [PUBLISHER] Will be picked up by ig-publisher-loop.mjs');
    } else {
      console.log('  [COURIER] Waiting for manual approval in Mission Control');
    }
  }

  return queued;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║       MOTION VENTURES — AGENT MARKETING TEAM            ║
║                                                          ║
║  CATALYST  🧙 Content Strategist                         ║
║  MAVEN     🔍 Research Analyst                           ║
║  ECHO      ✍️  Copywriter                                ║
║  TAGS      #️⃣  Hashtag Expert                            ║
║  GUARDIAN   🛡️  Brand Checker                             ║
║  COURIER   📮 Scheduler                                  ║
║  PUBLISHER ⚔️  Post Executor (separate loop)             ║
║                                                          ║
║  Mode: ${LOOP ? 'CONTINUOUS LOOP' : `${POSTS_PER_RUN} POST(S)`}${' '.repeat(Math.max(0, 38 - (LOOP ? 15 : String(POSTS_PER_RUN).length + 9)))}║
║  Auto-approve: ${AUTO_APPROVE ? 'YES' : 'NO '}${' '.repeat(35)}║
╚══════════════════════════════════════════════════════════╝
`);

  let totalGenerated = 0;

  do {
    for (let i = 1; i <= POSTS_PER_RUN; i++) {
      try {
        const result = await generatePost(i, POSTS_PER_RUN);
        if (result) totalGenerated++;
      } catch (err) {
        console.error(`  [ERROR] Post ${i} failed:`, err.message);
      }

      // Wait between posts to avoid rate limits
      if (i < POSTS_PER_RUN) {
        console.log('\n  Cooling down 15s before next post...');
        await sleep(15_000);
      }
    }

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`Total posts generated this session: ${totalGenerated}`);

    if (LOOP) {
      const nextRun = new Date(Date.now() + LOOP_INTERVAL);
      console.log(`Next run at: ${nextRun.toLocaleTimeString()}`);
      console.log('─'.repeat(60));
      await sleep(LOOP_INTERVAL);
    }
  } while (LOOP);

  console.log('\nAgent team signing off. ✌️');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
