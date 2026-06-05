"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { missingSupabaseConfigMessage } from "@/lib/supabase/config";
import { getAuthErrorMessage } from "@/lib/supabase/errors";

export function LoginForm({ message }: { message?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const configMessage = missingSupabaseConfigMessage;
  const isDisabled = Boolean(configMessage) || isPending;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (configMessage) {
      setError(configMessage);
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (submitError) {
      const nextError =
        getAuthErrorMessage(submitError) ??
        (submitError instanceof Error ? submitError.message : "Kirjautuminen epäonnistui. Yritä uudelleen.");
      setError(nextError);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <div className="auth-form">
        {message ? <div className="alert">{message}</div> : null}
        {error ? <div className="alert error">{error}</div> : null}
        {configMessage ? (
          <div className="alert">
            Lisää <code>NEXT_PUBLIC_SUPABASE_URL</code> ja <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> tiedostoon
            <code> .env.local</code> ennen kirjautumista.
          </div>
        ) : null}
      </div>
      <form className="auth-form" onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div className="field">
          <label htmlFor="login-email">Sähköposti</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nimi@yritys.fi"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Salasana</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Salasana"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={isDisabled}>
          {isPending ? "Kirjaudutaan..." : "Kirjaudu sisään"}
        </button>
      </form>
      <p className="auth-links" style={{ marginTop: "1rem" }}>
        Eikö sinulla ole tiliä? <Link href="/signup">Luo tili</Link>
      </p>
      <div className="auth-demo-card">
        <p className="form-note">Haluatko vain nähdä, miten tämä toimisi käytännössä?</p>
        <h3 className="auth-demo-title">Pyydä demo yrityksellesi</h3>
        <p className="muted" style={{ margin: "0.55rem 0 1rem" }}>
          Jos sinulla ei ole vielä käyttäjää, voimme näyttää miltä Reputo näyttäisi juuri teidän
          yrityksen nimellä ja arvostelulinkillä.
        </p>
        <Link href="/#demo" className="btn btn-secondary btn-block">
          Pyydä demo
        </Link>
        <div className="auth-demo-contact">
          <span>Yhteys: 050 326 0441</span>
          <span>eelispuro@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
