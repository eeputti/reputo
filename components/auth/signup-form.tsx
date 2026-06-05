"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { missingSupabaseConfigMessage } from "@/lib/supabase/config";
import { getAuthErrorMessage, isMissingRelationError } from "@/lib/supabase/errors";

export function SignupForm({ message }: { message?: string }) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const configMessage = missingSupabaseConfigMessage;
  const isDisabled = Boolean(configMessage) || isPending;

  async function bootstrapProfile(userId: string, businessLabel: string) {
    const supabase = createBrowserSupabaseClient();

    // TODO: When every environment has the SQL migration applied, this best-effort fallback can be removed.
    const { data: businessData, error: businessError } = await supabase
      .from("businesses")
      .insert({
        name: businessLabel,
      })
      .select("id")
      .single();

    if (businessError) {
      if (isMissingRelationError(businessError)) {
        return;
      }

      throw businessError;
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      business_id: (businessData as { id: string }).id,
      role: "owner",
    });

    if (profileError) {
      if (isMissingRelationError(profileError)) {
        return;
      }

      throw profileError;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (configMessage) {
      setError(configMessage);
      return;
    }

    setIsPending(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            business_name: businessName,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.session && data.user) {
        await bootstrapProfile(data.user.id, businessName);
      }

      if (!data.session) {
        setSuccess("Tili luotiin. Vahvista sähköpostiosoite ja kirjaudu sen jälkeen sisään.");
        router.replace("/login?message=Vahvista+sähköpostiosoite+ja+kirjaudu+sen+jälkeen+sisään.");
        router.refresh();
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (submitError) {
      const nextError =
        getAuthErrorMessage(submitError) ??
        (submitError instanceof Error ? submitError.message : "Tilin luonti epäonnistui. Yritä uudelleen.");
      setError(nextError);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <div className="auth-form">
        {message ? <div className="alert">{message}</div> : null}
        {success ? <div className="alert success">{success}</div> : null}
        {error ? <div className="alert error">{error}</div> : null}
        {configMessage ? (
          <div className="alert">
            Lisää <code>NEXT_PUBLIC_SUPABASE_URL</code> ja <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> tiedostoon
            <code> .env.local</code> ennen rekisteröitymistä.
          </div>
        ) : null}
      </div>
      <form className="auth-form" onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div className="field">
          <label htmlFor="signup-business-name">Yrityksen nimi</label>
          <input
            id="signup-business-name"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Autokorjaamo Esimerkki"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="signup-email">Sähköposti</label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nimi@yritys.fi"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="signup-password">Salasana</label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Vähintään 6 merkkiä"
            minLength={6}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={isDisabled}>
          {isPending ? "Luodaan tiliä..." : "Luo tili"}
        </button>
      </form>
      <p className="auth-links" style={{ marginTop: "1rem" }}>
        Onko sinulla jo tili? <Link href="/login">Kirjaudu sisään</Link>
      </p>
    </div>
  );
}
