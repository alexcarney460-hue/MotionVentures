import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const NOTIFY_EMAIL = 'gardenablaze@gmail.com'
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'yrvl ltjs wqga adtr'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: NOTIFY_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  let body: {
    name?: string
    email?: string
    phone?: string
    company?: string
    experience?: string
    how_heard?: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.experience?.trim()) {
    return NextResponse.json(
      { error: 'Name, email, and experience are required' },
      { status: 400 }
    )
  }

  const code = body.name
    .trim()
    .split(/\s+/)[0]
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 6) + Math.floor(Math.random() * 900 + 100)

  // Send email notification
  try {
    await transporter.sendMail({
      from: `Motion Ventures <${NOTIFY_EMAIL}>`,
      to: NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `New Affiliate Application: ${body.name}`,
      text: [
        `New affiliate application received:`,
        ``,
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || 'Not provided'}`,
        `Company: ${body.company || 'Not provided'}`,
        `Experience: ${body.experience}`,
        `How they heard about us: ${body.how_heard || 'Not specified'}`,
        `Generated referral code: ${code}`,
        ``,
        `Submitted: ${new Date().toISOString()}`,
      ].join('\n'),
    })
  } catch (err) {
    console.error('[Affiliate Email Error]', err)
  }

  console.log('[Affiliate Application]', {
    name: body.name,
    email: body.email,
    referral_code: code,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({
    message: 'Application received. We will review and contact you within 24 hours.',
    referral_code: code,
  })
}
