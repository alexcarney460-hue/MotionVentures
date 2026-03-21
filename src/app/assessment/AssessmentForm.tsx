'use client'

import { useState, FormEvent } from 'react'

const inputCls = 'h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]'
const textareaCls = 'rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]'

export default function AssessmentForm() {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'Assessment',
          name: fd.get('name'),
          email: fd.get('email'),
          website: fd.get('website'),
          businessType: fd.get('businessType'),
          problem: fd.get('problem'),
          outcome: fd.get('outcome'),
        }),
      })
      window.location.href = '/assessment/thanks'
    } catch {
      setSubmitting(false)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[color:var(--mv-primary)]">Name</span>
          <input name="name" required className={inputCls} placeholder="Jane Doe" />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[color:var(--mv-primary)]">Email</span>
          <input name="email" type="email" required className={inputCls} placeholder="jane@company.com" />
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-[color:var(--mv-primary)]">Business website (if you have one)</span>
        <input name="website" className={inputCls} placeholder="https://yourbusiness.com" />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-[color:var(--mv-primary)]">Type of business</span>
        <input name="businessType" required className={inputCls} placeholder="Home services, local retail, professional services, etc." />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-[color:var(--mv-primary)]">What&apos;s the main issue right now?</span>
        <textarea name="problem" required rows={4} className={textareaCls} placeholder="Example: leads slowed down, website feels old, follow-up is inconsistent, scheduling is chaotic" />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-[color:var(--mv-primary)]">What would &apos;better&apos; look like in 60 days?</span>
        <textarea name="outcome" required rows={3} className={textareaCls} placeholder="More inquiries, faster response time, more booked work, less admin chaos" />
      </label>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-[color:var(--mv-muted)]">
          By submitting, you agree we can email you back about this request.
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--mv-accent)] focus:ring-offset-2 active:translate-y-px disabled:opacity-50"
        >
          {submitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}
