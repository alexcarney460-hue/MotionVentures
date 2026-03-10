'use client'

import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function AffiliateSignupForm() {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/affiliates/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          company: data.get('company'),
          experience: data.get('experience'),
          how_heard: data.get('how_heard'),
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Something went wrong' }))
        throw new Error(body.error || 'Application failed')
      }

      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-[var(--mv-emerald)]/30 bg-[var(--mv-emerald)]/5 p-10 text-center">
        <div className="text-4xl">&#10003;</div>
        <div className="mt-4 font-[var(--font-sora)] text-xl font-bold text-white/90">
          Application received!
        </div>
        <p className="mt-2 text-sm text-white/50">
          We&apos;ll review your application and get back to you within 24
          hours with your unique referral code and link.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/60">
            Full name *
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/25 focus:border-[var(--mv-primary)]/50 focus:ring-1 focus:ring-[var(--mv-primary)]/30"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/60">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/25 focus:border-[var(--mv-primary)]/50 focus:ring-1 focus:ring-[var(--mv-primary)]/30"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/60">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/25 focus:border-[var(--mv-primary)]/50 focus:ring-1 focus:ring-[var(--mv-primary)]/30"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-white/60">
            Company / Organization
          </label>
          <input
            name="company"
            type="text"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/25 focus:border-[var(--mv-primary)]/50 focus:ring-1 focus:ring-[var(--mv-primary)]/30"
            placeholder="Acme Corp"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-white/60">
          Relevant experience *
        </label>
        <textarea
          name="experience"
          required
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/25 focus:border-[var(--mv-primary)]/50 focus:ring-1 focus:ring-[var(--mv-primary)]/30"
          placeholder="Tell us about your network and experience in sales, partnerships, or business development..."
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-white/60">
          How did you hear about us?
        </label>
        <select
          name="how_heard"
          className="w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-[var(--mv-primary)]/50 focus:ring-1 focus:ring-[var(--mv-primary)]/30"
        >
          <option value="">Select...</option>
          <option value="social_media">Social Media</option>
          <option value="website">Website</option>
          <option value="referral">Referred by someone</option>
          <option value="search">Google / Search</option>
          <option value="other">Other</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--mv-primary)] px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {state === 'submitting' ? 'Submitting...' : 'Submit Application'}
      </button>

      <p className="text-center text-xs text-white/30">
        By applying, you agree to our affiliate terms. Commissions are paid
        monthly for referred clients who sign and pay.
      </p>
    </form>
  )
}
