'use client'

import * as React from 'react'

type FormState = {
  name: string
  email: string
  company: string
  website: string
  businessType: string
  problem: string
  outcome: string
  budget: string
  timeline: string
}

const initial: FormState = {
  name: '',
  email: '',
  company: '',
  website: '',
  businessType: '',
  problem: '',
  outcome: '',
  budget: '',
  timeline: '',
}

function FieldLabel({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-semibold text-white/90">{title}</span>
      {hint ? <span className="text-xs text-white/45">{hint}</span> : null}
    </div>
  )
}

function InputShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      {children}
    </div>
  )
}

export default function ContactFunnel({ action = '/contact/thanks' }: { action?: string }) {
  const [step, setStep] = React.useState<1 | 2>(1)
  const [data, setData] = React.useState<FormState>(initial)
  const [submitting, setSubmitting] = React.useState(false)

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }))
  }

  const canContinue =
    data.businessType.trim().length > 1 &&
    data.problem.trim().length > 5 &&
    data.outcome.trim().length > 5

  return (
    <div className="relative">
      {/* Step indicator */}
      <div className="mb-6 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span
            className={
              step === 1
                ? 'rounded-full bg-white/15 px-2 py-1 text-white/90'
                : 'rounded-full bg-white/5 px-2 py-1 text-white/55'
            }
          >
            Step 1
          </span>
          <span className="text-white/30">→</span>
          <span
            className={
              step === 2
                ? 'rounded-full bg-white/15 px-2 py-1 text-white/90'
                : 'rounded-full bg-white/5 px-2 py-1 text-white/55'
            }
          >
            Step 2
          </span>
        </div>
        <div className="text-white/45">~60 seconds</div>
      </div>

      {step === 1 ? (
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2 text-sm">
              <FieldLabel title="Type of business" hint="required" />
              <InputShell>
                <input
                  value={data.businessType}
                  onChange={update('businessType')}
                  className="h-11 w-full bg-transparent px-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                  placeholder="Example: home services, local retail, pro services"
                  required
                />
              </InputShell>
            </div>

            <div className="grid gap-2 text-sm">
              <FieldLabel title="Website" hint="optional" />
              <InputShell>
                <input
                  value={data.website}
                  onChange={update('website')}
                  className="h-11 w-full bg-transparent px-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                  placeholder="https://company.com"
                />
              </InputShell>
            </div>
          </div>

          <div className="grid gap-2 text-sm">
            <FieldLabel title="Main problem right now" hint="required" />
            <InputShell>
              <textarea
                value={data.problem}
                onChange={update('problem')}
                rows={4}
                className="w-full resize-none bg-transparent px-1 py-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                placeholder="Example: follow-up is inconsistent, missed calls, site feels dated, leads slowed"
                required
              />
            </InputShell>
          </div>

          <div className="grid gap-2 text-sm">
            <FieldLabel title="What would “better” look like in 60 days?" hint="required" />
            <InputShell>
              <textarea
                value={data.outcome}
                onChange={update('outcome')}
                rows={3}
                className="w-full resize-none bg-transparent px-1 py-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                placeholder="Example: more qualified inquiries, faster response, fewer admin fires"
                required
              />
            </InputShell>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="text-xs text-white/45">No spam. We reply with a crisp plan.</div>
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep(2)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <form className="grid gap-4" onSubmit={async (e) => {
          e.preventDefault()
          setSubmitting(true)
          try {
            const fd = new FormData(e.currentTarget)
            await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                form: 'Contact',
                name: data.name,
                email: data.email,
                company: data.company,
                website: data.website,
                businessType: data.businessType,
                problem: data.problem,
                outcome: data.outcome,
                budget: data.budget,
                timeline: data.timeline,
                notes: fd.get('notes') as string || '',
              }),
            })
            window.location.href = action
          } catch {
            setSubmitting(false)
            alert('Something went wrong. Please try again.')
          }
        }}>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2 text-sm">
              <FieldLabel title="Name" hint="required" />
              <InputShell>
                <input
                  name="name"
                  value={data.name}
                  onChange={update('name')}
                  className="h-11 w-full bg-transparent px-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                  placeholder="Jane Doe"
                  required
                />
              </InputShell>
            </div>

            <div className="grid gap-2 text-sm">
              <FieldLabel title="Email" hint="required" />
              <InputShell>
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={update('email')}
                  className="h-11 w-full bg-transparent px-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                  placeholder="jane@company.com"
                  required
                />
              </InputShell>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2 text-sm">
              <FieldLabel title="Company" hint="optional" />
              <InputShell>
                <input
                  name="company"
                  value={data.company}
                  onChange={update('company')}
                  className="h-11 w-full bg-transparent px-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                  placeholder="Acme Services"
                />
              </InputShell>
            </div>

            <div className="grid gap-2 text-sm">
              <FieldLabel title="Timeline" hint="optional" />
              <InputShell>
                <select
                  name="timeline"
                  value={data.timeline}
                  onChange={update('timeline')}
                  className="h-11 w-full bg-transparent px-1 text-sm text-white/90 outline-none"
                >
                  <option value="" className="bg-black">
                    Select…
                  </option>
                  <option value="ASAP" className="bg-black">
                    ASAP
                  </option>
                  <option value="2-4 weeks" className="bg-black">
                    2–4 weeks
                  </option>
                  <option value="1-2 months" className="bg-black">
                    1–2 months
                  </option>
                  <option value="Exploring" className="bg-black">
                    Exploring
                  </option>
                </select>
              </InputShell>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2 text-sm">
              <FieldLabel title="Budget" hint="optional" />
              <InputShell>
                <select
                  name="budget"
                  value={data.budget}
                  onChange={update('budget')}
                  className="h-11 w-full bg-transparent px-1 text-sm text-white/90 outline-none"
                >
                  <option value="" className="bg-black">
                    Select…
                  </option>
                  <option value="$1k-$3k" className="bg-black">
                    $1k–$3k
                  </option>
                  <option value="$3k-$8k" className="bg-black">
                    $3k–$8k
                  </option>
                  <option value="$8k-$20k" className="bg-black">
                    $8k–$20k
                  </option>
                  <option value="$20k+" className="bg-black">
                    $20k+
                  </option>
                </select>
              </InputShell>
            </div>

            <div className="grid gap-2 text-sm">
              <FieldLabel title="Anything else?" hint="optional" />
              <InputShell>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full resize-none bg-transparent px-1 py-1 text-sm text-white/90 outline-none placeholder:text-white/30"
                  placeholder="Links, constraints, must-haves"
                />
              </InputShell>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-white/60 hover:text-white/85"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--mv-primary)] px-5 text-sm font-semibold text-white shadow-sm shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[var(--mv-primary-hover)] disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Send request'}
            </button>
          </div>

          <div className="text-[11px] leading-relaxed text-white/40">
            By submitting, you agree we can email you back about this request.
          </div>
        </form>
      )}
    </div>
  )
}
