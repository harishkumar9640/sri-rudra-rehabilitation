'use client';

import { useId, useState } from 'react';
import { SITE } from '@/lib/constants';

/**
 * Enquiry / appointment-request form for the Contact page.
 *
 * Submission strategy:
 *  Because this site is statically exported (no Node server, no API routes),
 *  the form POSTs to a `mailto:` URL via a one-shot redirect. We do this by
 *  intercepting the submit, building the mailto URL, opening it in the same
 *  tab (`window.location.href = mailto:...`), and showing a visible
 *  "thanks, opening your email app" panel.
 *
 *  Caveats:
 *  - On iOS Safari / Android Chrome the OS will route to the default mail
 *    client. If none is configured, the browser shows "no handler".
 *  - For users without a mail client, we fall back to a visible
 *    "call us / WhatsApp us" CTA below the success state.
 *  - When a backend is added (e.g. /api/enquiry), swap the `handleSubmit`
 *    body for a `fetch()` call.
 *
 * UX:
 *  - All fields have associated <label>s and visible focus rings.
 *  - Required fields use aria-required and the native required attribute.
 *  - Submission state is announced via aria-live so screen-readers catch it.
 *  - 44px tap targets everywhere.
 */
export default function EnquiryForm() {
  const formId = useId();
  const [state, setState] = useState<
    | { kind: 'idle' }
    | { kind: 'submitting' }
    | { kind: 'sent'; mailto: string }
    | { kind: 'no-mail-client' }
  >({ kind: 'idle' });

  /**
   * Build a mailto: URL with all form fields encoded into subject + body.
   */
  function buildMailto(data: FormData): string {
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const relation = String(data.get('relation') || '').trim();
    const condition = String(data.get('condition') || '').trim();
    const message = String(data.get('message') || '').trim();
    const preferred = String(data.get('preferred') || '').trim();

    const subject = `Website enquiry — ${name || 'New lead'}`;
    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || '—'}`,
      `Relation to patient: ${relation || '—'}`,
      `Condition / program: ${condition || '—'}`,
      `Preferred contact: ${preferred || '—'}`,
      '',
      'Message:',
      message || '(none)',
    ];
    const body = encodeURIComponent(lines.join('\n'));
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const mailto = buildMailto(fd);
    setState({ kind: 'submitting' });

    // Try to open the mail client. We can't reliably detect success/failure
    // from JS, so we show a friendly "thanks, opening your email app"
    // panel that includes the direct-call and WhatsApp CTAs as fallbacks.
    // After a short delay we flip to the "no mail client detected" panel so
    // the user has something actionable if nothing happened.
    const t = window.setTimeout(() => setState({ kind: 'no-mail-client' }), 2500);
    try {
      window.location.href = mailto;
    } catch {
      window.clearTimeout(t);
      setState({ kind: 'no-mail-client' });
      return;
    }
    // Assume the mail client opened if we got here without throwing.
    window.setTimeout(() => setState({ kind: 'sent', mailto }), 250);
  }

  if (state.kind === 'sent' || state.kind === 'no-mail-client') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-2xl font-bold text-brand-900">Thank you.</h2>
        <p className="mt-3 text-brand-700">
          {state.kind === 'sent'
            ? "We've started a draft enquiry email to our care team. Hit send in your email app to send it."
            : "If your email app didn't open, you can reach us directly via any of the options below."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={state.kind === 'sent' ? state.mailto : `mailto:${SITE.email}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98]"
          >
            {state.kind === 'sent' ? 'Reopen email draft' : 'Email us directly'}
          </a>
          <a
            href={SITE.phoneHref}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-800 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-900 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98]"
          >
            Call {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#25D366] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1ebe5b] hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98]"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      id={formId}
      aria-labelledby={`${formId}-title`}
      onSubmit={onSubmit}
      className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <header>
        <h2
          id={`${formId}-title`}
          className="text-2xl font-bold text-brand-900"
        >
          Enquiry form
        </h2>
        <p className="mt-2 text-sm text-brand-600">
          Fill this in and our care team will get back to you within a few
          hours. For urgent admissions, please call{' '}
          <a
            href={SITE.phoneHref}
            className="font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-900"
          >
            {SITE.phoneDisplay}
          </a>{' '}
          directly.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          required
          autoComplete="name"
          placeholder="e.g. Anitha Reddy"
        />
        <Field
          label="Phone number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="10-digit mobile"
          pattern="[0-9+\-\s()]{7,}"
        />
        <Field
          label="Email (optional)"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <div>
          <label
            htmlFor={`${formId}-relation`}
            className="block text-sm font-medium text-brand-800"
          >
            You are
          </label>
          <select
            id={`${formId}-relation`}
            name="relation"
            defaultValue=""
            className="mt-2 block w-full rounded-lg border border-brand-200 bg-white px-3 py-2.5 text-sm text-brand-900 shadow-sm transition-colors focus-visible:border-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="self">The patient</option>
            <option value="family">Family member / caregiver</option>
            <option value="doctor">Referring doctor / hospital</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-condition`}
            className="block text-sm font-medium text-brand-800"
          >
            Condition or program of interest
          </label>
          <input
            id={`${formId}-condition`}
            name="condition"
            type="text"
            placeholder="e.g. Stroke recovery, Total knee replacement, ICU deconditioning…"
            className="mt-2 block w-full rounded-lg border border-brand-200 bg-white px-3 py-2.5 text-sm text-brand-900 shadow-sm transition-colors focus-visible:border-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={`${formId}-message`}
            className="block text-sm font-medium text-brand-800"
          >
            Brief description
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            placeholder="Tell us a bit about the patient's age, current condition, when it started, and what you're hoping we can help with."
            className="mt-2 block w-full rounded-lg border border-brand-200 bg-white px-3 py-2.5 text-sm text-brand-900 shadow-sm transition-colors focus-visible:border-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          />
        </div>
        <div className="sm:col-span-2">
          <fieldset>
            <legend className="text-sm font-medium text-brand-800">
              Preferred contact method
            </legend>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup">
              {[
                { v: 'phone', l: 'Phone call' },
                { v: 'whatsapp', l: 'WhatsApp' },
                { v: 'email', l: 'Email' },
              ].map((opt) => (
                <label
                  key={opt.v}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-medium text-brand-800 transition-colors hover:border-teal-600 hover:bg-teal-50 has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-800"
                >
                  <input
                    type="radio"
                    name="preferred"
                    value={opt.v}
                    className="h-4 w-4 accent-teal-600"
                  />
                  {opt.l}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-brand-500">
          By submitting this form you consent to Sri Rudra contacting you
          about your enquiry. We never share your details.
        </p>
        <button
          type="submit"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98]"
        >
          Send enquiry
        </button>
      </div>

      {/* Live region for status changes (idle/submitting/sent). */}
      <p role="status" aria-live="polite" className="sr-only">
        {state.kind === 'submitting' ? 'Opening your email app to send the enquiry.' : ''}
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable labeled text input                                        */
/* ------------------------------------------------------------------ */

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
  inputMode,
  placeholder,
  pattern,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: 'tel' | 'email' | 'numeric' | 'text';
  placeholder?: string;
  pattern?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-brand-800"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-teal-700">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        pattern={pattern}
        aria-required={required ? 'true' : undefined}
        className="mt-2 block w-full rounded-lg border border-brand-200 bg-white px-3 py-2.5 text-sm text-brand-900 shadow-sm transition-colors focus-visible:border-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
      />
    </div>
  );
}
