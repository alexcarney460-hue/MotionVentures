import { NextRequest, NextResponse } from 'next/server'

// POST /api/affiliates/apply — affiliate signup
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

  // Generate referral code from name
  const code = body.name
    .trim()
    .split(/\s+/)[0]
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 6) + Math.floor(Math.random() * 900 + 100)

  // TODO: Wire to Supabase once backend is configured
  // For now, log the application and return success
  console.log('[Affiliate Application]', {
    name: body.name,
    email: body.email,
    phone: body.phone,
    company: body.company,
    experience: body.experience,
    how_heard: body.how_heard,
    referral_code: code,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({
    message: 'Application received. We will review and contact you within 24 hours.',
    referral_code: code,
  })
}
