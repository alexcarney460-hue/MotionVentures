import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const NOTIFY_EMAIL = "gardenablaze@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "yrvl ltjs wqga adtr";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-02-25.clover" });
}

function getMailer() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: NOTIFY_EMAIL,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(req: NextRequest) {
  const { product, tier, question, audienceDescription, stimulusType } = await req.json();

  const prices: Record<string, number> = {
    "crowdtest-quick": 4900,
    "crowdtest-deep": 14900,
    "thinktank-standard": 9900,
    "thinktank-deep": 29900,
  };

  const priceKey = `${product}-${tier}`;
  const amount = prices[priceKey];
  if (!amount) return NextResponse.json({ error: "Invalid product/tier" }, { status: 400 });

  const productName = product === "crowdtest" ? "CrowdTest" : "Think Tank";
  const tierName = tier === "deep" ? "Deep Research" : "Standard";

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_creation: "always",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: `${productName} Session`,
          description: tierName,
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    metadata: {
      product,
      tier,
      question,
      audienceDescription: audienceDescription || "",
      stimulusType: stimulusType || "project_idea",
    },
    success_url: `${req.nextUrl.origin}/intelligence/session/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.nextUrl.origin}/intelligence/${product}`,
  });

  // Send immediate notification that someone started checkout
  try {
    const mailer = getMailer();
    await mailer.sendMail({
      from: `Motion Ventures <${NOTIFY_EMAIL}>`,
      to: NOTIFY_EMAIL,
      subject: `New ${productName} Purchase — $${(amount / 100).toFixed(0)} (${tierName})`,
      text: [
        `Someone just purchased a ${productName} session!`,
        ``,
        `Product: ${productName}`,
        `Tier: ${tierName}`,
        `Amount: $${(amount / 100).toFixed(0)}`,
        ``,
        `Question: ${question}`,
        `Audience: ${audienceDescription || "Not specified"}`,
        `Type: ${stimulusType || "project_idea"}`,
        ``,
        `Stripe Session: ${session.id}`,
        `Timestamp: ${new Date().toISOString()}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[Intelligence Email Error]", err);
  }

  return NextResponse.json({ url: session.url });
}
