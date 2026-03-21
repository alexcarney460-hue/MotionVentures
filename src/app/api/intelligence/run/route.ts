import { NextRequest } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-02-25.clover" });
}

function getGeminiKey() {
  return process.env.GEMINI_API_KEY!;
}

async function callGemini(prompt: string, systemInstruction: string): Promise<string> {
  const res = await fetch(`${GEMINI_URL}?key=${getGeminiKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 8192 },
    }),
  });
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  // Verify payment
  const checkoutSession = await getStripe().checkout.sessions.retrieve(sessionId);
  if (checkoutSession.payment_status !== "paid") {
    return new Response(JSON.stringify({ error: "Payment not confirmed" }), { status: 402 });
  }

  const { product, tier, question, audienceDescription, stimulusType } = checkoutSession.metadata as Record<string, string>;
  const personaCount = tier === "deep" ? 50 : 20;

  // Create SSE stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      try {
        if (product === "crowdtest") {
          await runCrowdTest(controller, send, { question, audienceDescription, stimulusType, personaCount });
        } else if (product === "thinktank") {
          await runThinkTank(controller, send, { question });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Session failed";
        send("error", { message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// ---------------------------------------------------------------------------
// CrowdTest flow
// ---------------------------------------------------------------------------

interface CrowdTestParams {
  question: string;
  audienceDescription: string;
  stimulusType: string;
  personaCount: number;
}

interface PersonaResponse {
  persona_name: string;
  persona_age?: number;
  persona_gender?: string;
  persona_location?: string;
  persona_occupation?: string;
  reaction?: string;
  sentiment?: string;
  sentiment_score?: number;
  would_buy?: boolean | null;
  would_use?: boolean | null;
  price_willing?: string | null;
  objections?: string[];
  key_quotes?: string[];
}

async function runCrowdTest(
  _controller: ReadableStreamDefaultController,
  send: (event: string, data: unknown) => void,
  params: CrowdTestParams,
) {
  const { question, audienceDescription, personaCount } = params;

  // Phase 1: Generate personas
  send("status", { phase: "generating_personas", message: "Creating synthetic personas..." });

  const personaPrompt = `Generate ${personaCount} unique synthetic personas for this audience: "${audienceDescription || "General US adults 25-55"}".

Each persona needs: name, age, gender, location, occupation, income_bracket, personality_traits (array), values (array), pain_points (array), tech_savviness, decision_style.

Make them DIVERSE. Include skeptics, enthusiasts, and indifferent people. Vary age, gender, location, income.

Return ONLY valid JSON: {"personas": [...]}`;

  const personaSystem = "You are a market research expert. Generate diverse, realistic synthetic personas. Return only valid JSON.";
  const personaResult = await callGemini(personaPrompt, personaSystem);

  let personas: Record<string, unknown>[];
  try {
    const cleaned = personaResult.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    personas = JSON.parse(cleaned).personas;
  } catch {
    personas = Array.from({ length: personaCount }, (_, i) => ({
      name: `Persona ${i + 1}`, age: 25 + i, gender: i % 2 === 0 ? "female" : "male",
      location: "US", occupation: "Professional", income_bracket: "$50k-$70k",
      personality_traits: [], values: [], pain_points: [],
    }));
  }

  send("personas", { count: personas.length, sample: personas.slice(0, 3) });

  // Phase 2: Evaluate stimulus in batches
  send("status", { phase: "running", message: "Running focus group..." });

  const batchSize = 10;
  const allResponses: PersonaResponse[] = [];

  for (let i = 0; i < personas.length; i += batchSize) {
    const batch = personas.slice(i, i + batchSize);
    const batchDescriptions = batch
      .map((p, idx) =>
        `PERSONA ${idx + 1}: ${p.name}, ${p.age}, ${p.gender}, ${p.location}. ${p.occupation}, ${p.income_bracket}. Personality: ${(p.personality_traits as string[] || []).join(", ")}. Values: ${(p.values as string[] || []).join(", ")}. Pain points: ${(p.pain_points as string[] || []).join(", ")}.`,
      )
      .join("\n\n");

    const evalPrompt = `CONTENT TO EVALUATE:
---
${question}
---

PERSONAS:
${batchDescriptions}

For EACH persona, react AS THAT PERSON. Return JSON:
{"responses": [{"persona_name": "...", "reaction": "2-3 sentences", "sentiment": "very_positive|positive|neutral|negative|very_negative", "sentiment_score": <-1.0 to 1.0>, "would_buy": true/false, "would_use": true/false, "price_willing": "$X/mo or nothing", "objections": ["..."], "key_quotes": ["..."]}]}`;

    const evalSystem = "You embody specific people and react authentically. Skeptics should be skeptical. Include negative reactions. Return only valid JSON.";
    const evalResult = await callGemini(evalPrompt, evalSystem);

    try {
      const cleaned = evalResult.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);
      const batchResponses: PersonaResponse[] = (parsed.responses || []).map((r: PersonaResponse, idx: number) => ({
        ...r,
        persona_name: r.persona_name || (batch[idx]?.name as string),
        persona_age: batch[idx]?.age as number,
        persona_gender: batch[idx]?.gender as string,
        persona_location: batch[idx]?.location as string,
        persona_occupation: batch[idx]?.occupation as string,
      }));
      allResponses.push(...batchResponses);
      send("progress", { completed: allResponses.length, total: personas.length });
      send("batch", { responses: batchResponses });
    } catch {
      send("error", { message: `Batch ${i / batchSize + 1} parse error, continuing...` });
    }
  }

  // Phase 3: Analyze
  send("status", { phase: "analyzing", message: "Analyzing results..." });

  const sentimentCounts: Record<string, number> = {};
  allResponses.forEach((r) => {
    const s = r.sentiment || "unknown";
    sentimentCounts[s] = (sentimentCounts[s] || 0) + 1;
  });

  const avgSentiment =
    allResponses.reduce((sum, r) => sum + (r.sentiment_score || 0), 0) / (allResponses.length || 1);

  const buyResponses = allResponses.filter((r) => r.would_buy !== null && r.would_buy !== undefined);
  const buyRate = buyResponses.length > 0 ? buyResponses.filter((r) => r.would_buy).length / buyResponses.length : 0;

  const useResponses = allResponses.filter((r) => r.would_use !== null && r.would_use !== undefined);
  const useRate = useResponses.length > 0 ? useResponses.filter((r) => r.would_use).length / useResponses.length : 0;

  // Count objections
  const objectionCounts: Record<string, number> = {};
  allResponses.forEach((r) =>
    (r.objections || []).forEach((o) => {
      objectionCounts[o] = (objectionCounts[o] || 0) + 1;
    }),
  );
  const topObjections = Object.entries(objectionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([objection, count]) => ({ objection, count }));

  // Count praise
  const praiseCounts: Record<string, number> = {};
  allResponses
    .filter((r) => (r.sentiment_score || 0) > 0.2)
    .forEach((r) =>
      (r.key_quotes || []).forEach((q) => {
        praiseCounts[q] = (praiseCounts[q] || 0) + 1;
      }),
    );
  const topPraise = Object.entries(praiseCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([quote, count]) => ({ quote, count }));

  // Price distribution
  const priceCounts: Record<string, number> = {};
  allResponses.forEach((r) => {
    if (r.price_willing && r.price_willing !== "null") {
      priceCounts[r.price_willing] = (priceCounts[r.price_willing] || 0) + 1;
    }
  });

  const results = {
    sentiment_breakdown: sentimentCounts,
    avg_sentiment: Math.round(avgSentiment * 1000) / 1000,
    buy_rate: Math.round(buyRate * 1000) / 1000,
    use_rate: Math.round(useRate * 1000) / 1000,
    price_distribution: priceCounts,
    top_objections: topObjections,
    top_praise: topPraise,
    total_responses: allResponses.length,
    responses: allResponses,
  };

  send("results", results);
  send("status", { phase: "complete", message: "Focus group complete!" });
}

// ---------------------------------------------------------------------------
// ThinkTank flow
// ---------------------------------------------------------------------------

interface ThinkTankParams {
  question: string;
}

interface Panelist {
  name: string;
  title: string;
  role: string;
  expertise: string;
  bias: string;
  debate_style: string;
}

async function runThinkTank(
  _controller: ReadableStreamDefaultController,
  send: (event: string, data: unknown) => void,
  params: ThinkTankParams,
) {
  const { question } = params;

  send("status", { phase: "researching", message: "Researching domain experts..." });

  const panelPrompt = `I need to debate this question: "${question}"

Generate a panel of 8 experts who would have CLASHING perspectives on this. For each expert, provide:
- name (realistic), title (realistic credentials), role (advocate/skeptic/economist/operator/contrarian/domain_expert/ethicist/pragmatist), expertise (what they know), bias (what they're predisposed to believe), debate_style.

Return JSON: {"panel": [...]}`;

  const panelResult = await callGemini(
    panelPrompt,
    "You are casting a panel of diverse experts for a strategic debate. Make them realistic with real-sounding credentials. Return only valid JSON.",
  );

  let panel: Panelist[];
  try {
    const cleaned = panelResult.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    panel = JSON.parse(cleaned).panel;
  } catch {
    panel = [];
  }

  send("panel", { experts: panel });

  // Round 1: Opening positions
  send("status", { phase: "round_1", message: "Round 1: Opening positions..." });

  const round1Prompt = `Question: "${question}"

Panel:
${panel.map((p) => `- ${p.name} (${p.title}, role: ${p.role}): bias toward ${p.bias}`).join("\n")}

Generate Round 1: Each panelist gives a 2-4 sentence opening statement taking a clear position. At least 3 should disagree.

Return JSON: {"statements": [{"panelist": "name", "statement": "...", "position": "for|against|conditional"}]}`;

  const round1Result = await callGemini(
    round1Prompt,
    "You simulate expert debates. Each expert argues from their expertise and bias. Make them disagree. Return only valid JSON.",
  );

  try {
    const cleaned = round1Result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const round1 = JSON.parse(cleaned);
    send("round", { round: 1, type: "opening_positions", data: round1 });
  } catch {
    send("error", { message: "Round 1 parse error" });
  }

  // Round 2: Direct challenges
  send("status", { phase: "round_2", message: "Round 2: Direct challenges..." });

  const round2Prompt = `Question: "${question}"

Panel and their Round 1 positions are established. Now generate Round 2: Direct Challenges.
Each panelist picks 1-2 others to challenge directly. Name who they're responding to, quote the claim, provide counter-evidence.

Generate 5-6 exchanges. Return JSON: {"exchanges": [{"challenger": "name", "target": "name", "challenge": "...", "response": "..."}]}`;

  const round2Result = await callGemini(
    round2Prompt,
    "Generate heated but substantive expert debate exchanges. Direct challenges, not polite nodding. Return only valid JSON.",
  );

  try {
    const cleaned = round2Result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const round2 = JSON.parse(cleaned);
    send("round", { round: 2, type: "direct_challenges", data: round2 });
  } catch {
    send("error", { message: "Round 2 parse error" });
  }

  // Round 3: Synthesis
  send("status", { phase: "round_3", message: "Round 3: Synthesis & emergent insights..." });

  const round3Prompt = `Question: "${question}"

After 2 rounds of debate, generate Round 3: Synthesis. Each panelist:
1. Acknowledges something another said that changed their thinking
2. Introduces a NEW angle from their expertise
3. States their refined position

Then generate analysis:
- consensus_points (what everyone agrees on)
- emergent_insights (ideas that ONLY appeared because of the debate)
- recommended_next_steps (3-5 specific actions)
- panel_vote (for/against/conditional counts)

Return JSON: {"synthesis": [{"panelist": "name", "concession": "...", "new_angle": "...", "refined_position": "..."}], "analysis": {"consensus_points": [...], "emergent_insights": [...], "recommended_next_steps": [...], "panel_vote": {"for": N, "against": N, "conditional": N}}}`;

  const round3Result = await callGemini(
    round3Prompt,
    "Generate synthesis from a multi-round expert debate. Emergent insights must be ideas that only appeared through the debate collision. Return only valid JSON.",
  );

  try {
    const cleaned = round3Result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const round3 = JSON.parse(cleaned);
    send("round", { round: 3, type: "synthesis", data: round3 });
    send("analysis", round3.analysis || {});
  } catch {
    send("error", { message: "Round 3 parse error" });
  }

  send("status", { phase: "complete", message: "Think Tank debate complete!" });
}
