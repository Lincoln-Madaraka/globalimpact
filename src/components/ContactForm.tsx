"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Labels = {
  title: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  topics: Record<string, string>;
  message: string;
  required: string;
  privacy: string;
  submit: string;
  sending: string;
  success: string;
  mailto: string;
  error: string;
  subject: string;
};

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/**
 * Contact form for a static site. With `endpoint` set (e.g. Formspree) it posts there;
 * otherwise it opens the visitor's email app with the message addressed to `email`.
 * `mailto` and `error` labels arrive with {email} already filled in.
 */
export function ContactForm({ labels, email, endpoint }: { labels: Labels; email: string; endpoint: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const topicSelect = useRef<HTMLSelectElement>(null);

  // Pre-select the topic when arriving from e.g. /contact/?topic=volunteer
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && topic in labels.topics && topicSelect.current) topicSelect.current.value = topic;
  }, [labels.topics]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot field filled in: most likely a bot

    if (endpoint) {
      setStatus("sending");
      try {
        const response = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`);
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const value = (key: string) => String(data.get(key) ?? "").trim();
    const topic = labels.topics[value("topic")] ?? value("topic");
    const lines = [
      `${labels.name}: ${value("name")}`,
      `${labels.company}: ${value("company")}`,
      `${labels.email}: ${value("email")}`,
      value("phone") ? `${labels.phone}: ${value("phone")}` : null,
      `${labels.topic}: ${topic}`,
      "",
      value("message"),
    ].filter((line) => line !== null);
    const subject = `${labels.subject}: ${topic} – ${value("company") || value("name")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("mailto");
  }

  const field =
    "mt-2 block w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-ink placeholder:text-ink-soft/50 transition-colors focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-brand-blue/10";
  const label = "text-sm font-bold text-ink";
  const req = (
    <span className="font-normal text-ink-soft">
      {" "}
      ({labels.required})
    </span>
  );

  const message =
    status === "sent" ? labels.success : status === "mailto" ? labels.mailto : status === "error" ? labels.error : "";

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-brand-blue/5 sm:p-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{labels.title}</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>
            {labels.name}
            {req}
          </span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>{labels.company}</span>
          <input name="company" autoComplete="organization" className={field} />
        </label>
        <label className="block">
          <span className={label}>
            {labels.email}
            {req}
          </span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className={label}>{labels.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>{labels.topic}</span>
          <select ref={topicSelect} name="topic" defaultValue="partnership" className={field}>
            {Object.entries(labels.topics).map(([key, text]) => (
              <option key={key} value={key}>
                {text}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>
            {labels.message}
            {req}
          </span>
          <textarea name="message" required rows={6} className={`${field} resize-y`} />
        </label>
        {/* Honeypot: hidden from people, often filled in by spam bots */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">{labels.privacy}</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-red/25 transition-all hover:-translate-y-0.5 hover:bg-brand-red-800 disabled:opacity-60"
        >
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </div>

      <p
        role="status"
        className={`text-sm font-semibold ${message ? "mt-6 rounded-2xl px-4 py-3" : ""} ${
          status === "error" ? "bg-brand-red-50 text-brand-red-800" : "bg-brand-green-50 text-brand-green-700"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
