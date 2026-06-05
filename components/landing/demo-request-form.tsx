"use client";

import { useState } from "react";

const initialState = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  mapsLink: "",
  message: "",
};

export function DemoRequestForm() {
  const [form, setForm] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof typeof initialState>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Demopyynnön lähetys epäonnistui.");
      }

      setIsSubmitted(true);
      setForm(initialState);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Demopyynnön lähetys epäonnistui. Yritä uudelleen hetken kuluttua.",
      );
    } finally {
      setIsPending(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="card form-card">
        <div className="alert success">
          Kiitos! Demopyyntö lähetettiin onnistuneesti ja se on toimitettu osoitteeseen
          {" "}
          <strong>eelispuro@gmail.com</strong>.
        </div>
      </div>
    );
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      {error ? (
        <div className="alert error" style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      ) : null}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="demo-company">Yrityksen nimi</label>
          <input
            id="demo-company"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Autokorjaamo Esimerkki"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="demo-contact">Yhteyshenkilö</label>
          <input
            id="demo-contact"
            value={form.contact}
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder="Etunimi Sukunimi"
          />
        </div>
        <div className="field">
          <label htmlFor="demo-email">Sähköposti</label>
          <input
            id="demo-email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="nimi@yritys.fi"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="demo-phone">Puhelin</label>
          <input
            id="demo-phone"
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="040 123 4567"
            required
          />
        </div>
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="demo-maps">Google Maps / Google Business -linkki</label>
          <input
            id="demo-maps"
            value={form.mapsLink}
            onChange={(event) => updateField("mapsLink", event.target.value)}
            placeholder="https://g.page/..."
          />
        </div>
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="demo-message">Vapaa viesti</label>
          <textarea
            id="demo-message"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Kerro lyhyesti yrityksestäsi…"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        style={{ marginTop: "1.2rem" }}
        disabled={isPending}
      >
        {isPending ? "Lähetetään..." : "Pyydä demo"}
      </button>
      <p className="form-note" style={{ textAlign: "center", marginTop: "0.9rem" }}>
        Ei sitoutumista. Emme jaa tietojasi kolmansille osapuolille.
      </p>
    </form>
  );
}

