import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSupabaseServer } from '@/lib/supabase-server';

export const runtime = 'nodejs';

const NOTIFY_EMAIL = 'gardenablaze@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'yrvl ltjs wqga adtr';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: NOTIFY_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

type FormPayload = {
  form: string;
  name: string;
  email: string;
  company?: string;
  website?: string;
  businessType?: string;
  problem?: string;
  outcome?: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  industry?: string;
  teamSize?: string;
  revenue?: string;
  size?: string;
  stack?: string;
  bottleneck?: string;
  goals?: string;
};

function buildEmailBody(data: FormPayload): string {
  const lines: string[] = [
    `New ${data.form} submission from motionventures.co`,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
  ];

  if (data.company) lines.push(`Company: ${data.company}`);
  if (data.website) lines.push(`Website: ${data.website}`);
  if (data.businessType) lines.push(`Business type: ${data.businessType}`);
  if (data.industry) lines.push(`Industry: ${data.industry}`);
  if (data.teamSize) lines.push(`Team size: ${data.teamSize}`);
  if (data.revenue) lines.push(`Revenue: ${data.revenue}`);
  if (data.size) lines.push(`Business size: ${data.size}`);
  if (data.stack) lines.push(`Current stack: ${data.stack}`);
  if (data.problem) lines.push(`\nMain problem:\n${data.problem}`);
  if (data.bottleneck) lines.push(`\nBiggest bottleneck:\n${data.bottleneck}`);
  if (data.outcome) lines.push(`\nDesired outcome (60 days):\n${data.outcome}`);
  if (data.goals) lines.push(`\nGoals (60-90 days):\n${data.goals}`);
  if (data.budget) lines.push(`Budget: ${data.budget}`);
  if (data.timeline) lines.push(`Timeline: ${data.timeline}`);
  if (data.notes) lines.push(`\nNotes:\n${data.notes}`);

  return lines.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const data: FormPayload = await request.json();

    if (!data.name?.trim() || !data.email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const formLabel = data.form || 'Contact';
    const subject = `[Motion Ventures] New ${formLabel} — ${data.name}`;
    const body = buildEmailBody(data);

    // Send email notification
    await transporter.sendMail({
      from: `Motion Ventures <${NOTIFY_EMAIL}>`,
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject,
      text: body,
    });

    // Save to CRM
    const supabase = getSupabaseServer();
    if (supabase) {
      await supabase.from('contacts').upsert(
        {
          email: data.email.toLowerCase().trim(),
          firstname: data.name.split(' ')[0] || data.name,
          lastname: data.name.split(' ').slice(1).join(' ') || null,
          source: `website_${(data.form || 'contact').toLowerCase().replace(/\s+/g, '_')}`,
          lead_status: 'OPEN',
          lifecycle_stage: 'lead',
          notes: body,
        },
        { onConflict: 'email' }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact API] Error:', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
