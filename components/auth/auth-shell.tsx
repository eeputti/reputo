import Link from "next/link";

import { Logo } from "@/components/brand/logo";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <section className="auth-panel">
        <div className="wrap" style={{ maxWidth: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
            <Logo />
            <Link href="/" className="text-link">
              Takaisin etusivulle
            </Link>
          </div>
          <div className="card auth-card">
            <div className="auth-card-header">
              <div className="eyebrow">{eyebrow}</div>
              <h1 className="h1">{title}</h1>
              <p className="lede" style={{ marginTop: "1rem" }}>
                {description}
              </p>
            </div>
            {children}
          </div>
        </div>
      </section>
      <aside className="auth-sidebar">
        <div>
          <Logo href="/" />
        </div>
        <div className="auth-sidebar-card">
          <div className="pill" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}>
            <span className="pill-dot" />
            Reputo MVP
          </div>
          <h2 className="h2" style={{ marginTop: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Seuraa arvostelupyyntöjäsi yhdestä näkymästä.
          </h2>
          <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.72)", fontSize: "1.04rem" }}>
            Kirjautumisen jälkeen näet lähetetyt pyynnöt, klikkaukset, uusimmat kontaktit ja ensimmäisen
            hallintapaneelin version.
          </p>
          <div className="auth-sidebar-metrics" style={{ marginTop: "1.4rem" }}>
            <div>
              <strong>34</strong>
              <span style={{ color: "rgba(255,255,255,0.64)" }}>Lähetettyä pyyntöä</span>
            </div>
            <div>
              <strong>18</strong>
              <span style={{ color: "rgba(255,255,255,0.64)" }}>Klikkausta</span>
            </div>
            <div>
              <strong>7</strong>
              <span style={{ color: "rgba(255,255,255,0.64)" }}>Uutta arvostelua</span>
            </div>
            <div>
              <strong>4.7</strong>
              <span style={{ color: "rgba(255,255,255,0.64)" }}>Keskiarvo</span>
            </div>
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.58)", margin: 0 }}>
          Reputo on suunniteltu paikallisille palveluyrityksille, jotka haluavat kasvattaa näkyvyyttään
          ilman ylimääräistä säätöä.
        </p>
      </aside>
    </div>
  );
}

