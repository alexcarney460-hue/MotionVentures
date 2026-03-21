import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function getGeminiKey() {
  return process.env.GEMINI_API_KEY!;
}

async function callGemini(
  prompt: string,
  systemInstruction: string,
): Promise<string> {
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

/* ─────────────────────────────────────────────────────
   Persona response shape (mirrors paid endpoint)
   ───────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────
   POST handler — free CrowdTest (10 personas, no payment)
   ───────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  const { question, audience } = await req.json();

  if (!question || typeof question !== "string" || question.trim().length < 5) {
    return new Response(
      JSON.stringify({ error: "Please provide a question (at least 5 characters)." }),
      { status: 400 },
    );
  }

  const audienceDescription =
    typeof audience === "string" && audience.trim()
      ? audience.trim()
      : "General US adults 25-55";

  const personaCount = 10;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
        );
      };

      try {
        await runFreeCrowdTest(send, {
          question: question.trim(),
          audienceDescription,
          personaCount,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Session failed";
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

/* ─────────────────────────────────────────────────────
   Free CrowdTest flow (simplified, 10 personas)
   ───────────────────────────────────────────────────── */

interface FreeCrowdTestParams {
  question: string;
  audienceDescription: string;
  personaCount: number;
}

async function runFreeCrowdTest(
  send: (event: string, data: unknown) => void,
  params: FreeCrowdTestParams,
) {
  const { question, audienceDescription, personaCount } = params;

  // Phase 1: Generate personas
  send("status", {
    phase: "generating_personas",
    message: "Creating synthetic personas...",
  });

  const personaPrompt = `Generate ${personaCount} unique synthetic personas for this audience: "${audienceDescription}".

Each persona needs: name, age, gender, location, occupation, income_bracket, personality_traits (array), values (array), pain_points (array), tech_savviness, decision_style.

Make them DIVERSE. Include skeptics, enthusiasts, and indifferent people. Vary age, gender, location, income.

Return ONLY valid JSON: {"personas": [...]}`;

  const personaSystem =
    "You are a market research expert. Generate diverse, realistic synthetic personas. Return only valid JSON.";
  const personaResult = await callGemini(personaPrompt, personaSystem);

  let personas: Record<string, unknown>[];
  try {
    const cleaned = personaResult
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    personas = JSON.parse(cleaned).personas;
  } catch {
    personas = Array.from({ length: personaCount }, (_, i) => ({
      name: `Persona ${i + 1}`,
      age: 25 + i * 3,
      gender: i % 2 === 0 ? "female" : "male",
      location: "US",
      occupation: "Professional",
      income_bracket: "$50k-$70k",
      personality_traits: [],
      values: [],
      pain_points: [],
    }));
  }

  send("personas", { count: personas.length, sample: personas.slice(0, 3) });

  // Phase 2: Evaluate stimulus (single batch for free tier)
  send("status", { phase: "running", message: "Running focus group..." });

  const batchDescriptions = personas
    .map(
      (p, idx) =>
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

  const evalSystem =
    "You embody specific people and react authentically. Skeptics should be skeptical. Include negative reactions. Return only valid JSON.";
  const evalResult = await callGemini(evalPrompt, evalSystem);

  const allResponses: PersonaResponse[] = [];

  try {
    const cleaned = evalResult
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);
    const batchResponses: PersonaResponse[] = (parsed.responses || []).map(
      (r: PersonaResponse, idx: number) => ({
        ...r,
        persona_name: r.persona_name || (personas[idx]?.name as string),
        persona_age: personas[idx]?.age as number,
        persona_gender: personas[idx]?.gender as string,
        persona_location: personas[idx]?.location as string,
        persona_occupation: personas[idx]?.occupation as string,
      }),
    );
    allResponses.push(...batchResponses);
    send("progress", { completed: allResponses.length, total: personas.length });
    send("batch", { responses: batchResponses });
  } catch {
    send("error", { message: "Response parse error, continuing..." });
  }

  // Phase 3: Analyze
  send("status", { phase: "analyzing", message: "Analyzing results..." });

  const sentimentCounts: Record<string, number> = {};
  allResponses.forEach((r) => {
    const s = r.sentiment || "unknown";
    sentimentCounts[s] = (sentimentCounts[s] || 0) + 1;
  });

  const avgSentiment =
    allResponses.reduce((sum, r) => sum + (r.sentiment_score || 0), 0) /
    (allResponses.length || 1);

  const buyResponses = allResponses.filter(
    (r) => r.would_buy !== null && r.would_buy !== undefined,
  );
  const buyRate =
    buyResponses.length > 0
      ? buyResponses.filter((r) => r.would_buy).length / buyResponses.length
      : 0;

  const useResponses = allResponses.filter(
    (r) => r.would_use !== null && r.would_use !== undefined,
  );
  const useRate =
    useResponses.length > 0
      ? useResponses.filter((r) => r.would_use).length / useResponses.length
      : 0;

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
