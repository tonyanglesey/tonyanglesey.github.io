"use client";

import { useState } from "react";
import { contactEndpoint } from "@/lib/content";

const STAGES = [
  {
    key: "idea",
    label: "Just an idea",
    hint: "I’ll reply with a few scoping questions and a rough shape for how to start.",
  },
  {
    key: "designs",
    label: "Have designs",
    hint: "Great — I’ll ask to see them and talk build approach and estimate.",
  },
  {
    key: "existing",
    label: "Existing product",
    hint: "I’ll ask for repo/access context and where it hurts most.",
  },
  {
    key: "unsure",
    label: "Not sure yet",
    hint: "No problem — a short call to figure out the right first step.",
  },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const configured = contactEndpoint.trim().length > 0;

export default function ContactForm() {
  const [expanded, setExpanded] = useState(false);
  const [stage, setStage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — a filled hidden field means a bot; pretend success, send nothing.
    if (data.get("_gotcha")) {
      setStatus("success");
      return;
    }
    if (!configured) {
      setStatus("error");
      setErrorMsg("The form isn’t connected to a backend yet.");
      return;
    }

    // Match the old site's contract: JSON POST to /api/contact (Resend backend).
    const payload: Record<string, string> = {};
    data.forEach((value, key) => {
      if (key !== "_gotcha" && typeof value === "string" && value) payload[key] = value;
    });
    if (stage) payload.stage = stage;

    setStatus("submitting");
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong sending that. Please try again or email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="cform">
        <div className="cform-done">
          <div className="cform-ok" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3>Thanks — message sent</h3>
          <p>I’ll get back to you within a day or two.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="cform-row">
        <div className="cform-field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" required placeholder="Jane Doe" />
        </div>
        <div className="cform-field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required placeholder="jane@company.com" />
        </div>
      </div>

      <div className="cform-field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          required
          placeholder="A sentence or two about what you have in mind…"
        />
      </div>

      <div className="cform-rule" />

      <button
        type="button"
        className="cform-disclose"
        aria-expanded={expanded}
        aria-controls="cf-project"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="cform-chev" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4.5 3L7.5 6L4.5 9" />
          </svg>
        </span>
        <span>
          <strong>Tell me about your project</strong>{" "}
          <span className="cform-optnote">optional — helps me reply with the right next step</span>
        </span>
      </button>

      <div id="cf-project" className={`cform-project${expanded ? " open" : ""}`} hidden={!expanded}>
        <div className="cform-field">
          <label>Where are you in the process?</label>
          <div className="cform-seg" role="group" aria-label="Project stage">
            {STAGES.map((s) => (
              <button
                type="button"
                key={s.key}
                aria-pressed={stage === s.key}
                onClick={() => setStage(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
          {stage && (
            <p className="cform-hint">
              <b>{STAGES.find((s) => s.key === stage)!.label}:</b>{" "}
              {STAGES.find((s) => s.key === stage)!.hint}
            </p>
          )}
        </div>

        <div className="cform-row">
          <div className="cform-field">
            <label htmlFor="cf-type">Project type</label>
            <select id="cf-type" name="projectType" defaultValue="">
              <option value="">Select…</option>
              <option>Web app</option>
              <option>Mobile app</option>
              <option>Redesign / UI</option>
              <option>API / backend</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="cform-field">
            <label htmlFor="cf-timeline">Timeline</label>
            <select id="cf-timeline" name="timeline" defaultValue="">
              <option value="">Select…</option>
              <option>ASAP</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>Just exploring</option>
            </select>
          </div>
        </div>

        <div className="cform-field">
          <label htmlFor="cf-budget">
            Budget range <span className="cform-opt">(optional)</span>
          </label>
          <select id="cf-budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option>&lt; $10k</option>
            <option>$10k–$25k</option>
            <option>$25k–$50k</option>
            <option>$50k+</option>
          </select>
        </div>

        <div className="cform-field">
          <label htmlFor="cf-extra">
            Anything else <span className="cform-opt">(optional)</span>
          </label>
          <textarea id="cf-extra" name="details" placeholder="Links, context, must-haves…" />
        </div>
      </div>

      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        className="cform-honeypot"
        tabIndex={-1}
        autoComplete="off"
        name="_gotcha"
        aria-hidden="true"
      />

      {status === "error" && (
        <p className="cform-error" role="alert">
          {errorMsg}
        </p>
      )}

      <div className="cform-submit">
        <button className="btn full" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
