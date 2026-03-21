'use client'

import { useState, FormEvent } from 'react'

const inputCls = 'h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]'
const selectCls = 'h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-white/90 outline-none focus:ring-2 focus:ring-[var(--mv-primary)]'
const textareaCls = 'rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white/90 outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[var(--mv-primary)]'

export default function PremiumIntakeForm() {
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
          form: 'Premium Growth Intake',
          name: fd.get('name'),
          email: fd.get('email'),
          industry: fd.get('industry'),
          teamSize: fd.get('teamSize'),
          website: fd.get('website'),
          revenue: fd.get('revenue'),
          size: fd.get('size'),
          stack: fd.get('stack'),
          bottleneck: fd.get('bottleneck'),
          goals: fd.get('goals'),
          timeline: fd.get('timeline'),
          budget: fd.get('budget'),
        }),
      })
      window.location.href = '/premium-growth-intake/thanks'
    } catch {
      setSubmitting(false)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Name</span>
          <input name="name" required className={inputCls} placeholder="Jane Doe" />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Email</span>
          <input name="email" type="email" required className={inputCls} placeholder="jane@company.com" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Industry</span>
          <input name="industry" required className={inputCls} placeholder="Home services, dental, med spa, ecom, etc." />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Team size</span>
          <select name="teamSize" required className={selectCls}>
            <option value="" className="bg-black">Select...</option>
            <option value="1" className="bg-black">1 (solo)</option>
            <option value="2-5" className="bg-black">2-5</option>
            <option value="6-15" className="bg-black">6-15</option>
            <option value="16-50" className="bg-black">16-50</option>
            <option value="50+" className="bg-black">50+</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-white/85">Website</span>
        <input name="website" className={inputCls} placeholder="https://yourbusiness.com" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Annual revenue (range)</span>
          <select name="revenue" required className={selectCls}>
            <option value="" className="bg-black">Select...</option>
            <option value="<250k" className="bg-black">&lt; $250k</option>
            <option value="250k-1m" className="bg-black">$250k-$1M</option>
            <option value="1m-5m" className="bg-black">$1M-$5M</option>
            <option value="5m+" className="bg-black">$5M+</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Business size</span>
          <select name="size" required className={selectCls}>
            <option value="" className="bg-black">Select...</option>
            <option value="local" className="bg-black">Local (1-2 locations)</option>
            <option value="multi" className="bg-black">Multi-location</option>
            <option value="online" className="bg-black">Online-first</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-white/85">Current stack (optional)</span>
        <input name="stack" className={inputCls} placeholder="Example: HubSpot, Shopify, Zapier, Google Sheets" />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-white/85">Biggest bottleneck right now</span>
        <textarea name="bottleneck" required rows={4} className={textareaCls} placeholder="Leads, follow-up, scheduling, content, reporting, operations..." />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-semibold text-white/85">Goals for the next 60-90 days</span>
        <textarea name="goals" required rows={3} className={textareaCls} placeholder="More booked calls, more organic traffic, better conversion, fewer admin fires..." />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Timeline</span>
          <select name="timeline" required className={selectCls}>
            <option value="" className="bg-black">Select...</option>
            <option value="ASAP" className="bg-black">ASAP</option>
            <option value="2-4 weeks" className="bg-black">2-4 weeks</option>
            <option value="1-2 months" className="bg-black">1-2 months</option>
            <option value="Exploring" className="bg-black">Exploring</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-white/85">Budget range</span>
          <select name="budget" required className={selectCls}>
            <option value="" className="bg-black">Select...</option>
            <option value="$3k-$8k" className="bg-black">$3k-$8k</option>
            <option value="$8k-$20k" className="bg-black">$8k-$20k</option>
            <option value="$20k+" className="bg-black">$20k+</option>
            <option value="Not sure" className="bg-black">Not sure</option>
          </select>
        </label>
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-white/45">
          By submitting, you agree we can email you back about this request.
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--mv-primary)] focus:ring-offset-2 focus:ring-offset-transparent active:translate-y-px disabled:opacity-50"
        >
          {submitting ? 'Sending...' : 'Submit application'}
        </button>
      </div>
    </form>
  )
}
