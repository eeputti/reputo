import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { DemoRequestForm } from "@/components/landing/demo-request-form";
import {
  complianceItems,
  features,
  industries,
  previewRows,
  problemCards,
  steps,
  trustPills,
} from "@/components/landing/marketing-data";

function DashboardHeroCard() {
  const stats = [
    { label: "Lähetetty", value: "84" },
    { label: "Klikattu", value: "38" },
    { label: "Keskiarvo", value: "4.7 ★" },
    { label: "Uutta arvostelua", value: "12" },
  ];

  return (
    <div className="card hero-dashboard-card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem" }}>
        <strong style={{ letterSpacing: "-0.02em" }}>Lisää asiakas</strong>
        <span className="muted" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
          Autokorjaamo Esimerkki
        </span>
      </div>
      <div className="pill" style={{ marginBottom: "0.85rem", justifyContent: "space-between", width: "100%" }}>
        <span>Tekstiviesti</span>
        <span className="muted mono">040 123 4567</span>
      </div>
      <div className="alert success">Tekstiviesti ajastettu huomiselle klo 10.00.</div>
      <div className="mini-grid">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="mini-value">{stat.value}</div>
            <div className="form-note" style={{ marginTop: "0.2rem" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-card">
      <div className="phone-card-inner">
        <div className="phone-toolbar">
          <span>9.41</span>
          <span>5G</span>
        </div>
        <div className="phone-message-head">
          <div className="phone-avatar">AE</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Autokorjaamo Esimerkki</div>
            <div className="form-note">tekstiviesti</div>
          </div>
        </div>
        <div className="phone-body">
          <div className="form-note" style={{ textAlign: "center" }}>
            Tänään 10.02
          </div>
          <div className="phone-bubble">
            Hei! Kiitos käynnistä Autokorjaamo Esimerkissä. Arvostelusi auttaa meitä paljon. Voit jättää
            rehellisen Google-arvostelun tästä:
            <div className="phone-link">
              <span className="pill-dot" />
              g.page/autokorjaamo-esimerkki
            </div>
            <div className="form-note" style={{ marginTop: "0.75rem" }}>
              Vastaa STOP, jos et halua viestejä.
            </div>
          </div>
          <div className="form-note" style={{ paddingLeft: "0.4rem", fontWeight: 700 }}>
            Toimitettu ✓
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const barHeights = [45, 70, 55, 88, 61, 100, 80];

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="wrap site-header-inner">
          <Logo />
          <nav className="site-nav" aria-label="Päänavigaatio">
            <a href="#nain-toimii">Näin se toimii</a>
            <a href="#ominaisuudet">Ominaisuudet</a>
            <a href="#hallintapaneeli">Hallintapaneeli</a>
            <a href="#hinnoittelu">Hinnoittelu</a>
          </nav>
          <div className="site-actions">
            <Link href="/login" className="btn btn-secondary">
              Kirjaudu sisään
            </Link>
            <a href="#demo" className="btn btn-primary">
              Pyydä demo
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="wrap hero-grid">
            <div>
              <div className="pill" style={{ marginBottom: "1.4rem" }}>
                <span className="pill-dot" />
                Google-arvostelut automaattisesti tekstiviestillä ja sähköpostilla
              </div>
              <h1 className="display">Enemmän Google-arvosteluja. Vähemmän muistettavaa.</h1>
              <p className="lede" style={{ marginTop: "1.5rem", maxWidth: "36rem" }}>
                Lisää asiakkaan puhelinnumero tai sähköposti, ja Reputo lähettää kohteliaan
                Google-arvostelupyynnön oikeaan aikaan tekstiviestinä tai sähköpostina.
              </p>
              <div className="button-row" style={{ marginTop: "2rem" }}>
                <a href="#demo" className="btn btn-primary">
                  Pyydä ilmainen demo
                </a>
                <a href="#nain-toimii" className="btn btn-secondary">
                  Näe miten se toimii
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginTop: "1.5rem" }}>
                <span style={{ color: "var(--green)", letterSpacing: "0.15em" }}>★★★★★</span>
                <span className="muted" style={{ fontWeight: 600 }}>
                  4.7 keskiarvo · 12 uutta arvostelua / kk
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <PhoneMockup />
              <DashboardHeroCard />
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap trust-row">
            <div style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Rakennettu kiireisille palveluyrittäjille.
            </div>
            <div className="pill-grid">
              {trustPills.map((pill) => (
                <span key={pill} className="pill">
                  <span className="pill-dot" />
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">Tyytyväiset asiakkaat eivät aina muista arvostella.</h2>
              <p className="lede" style={{ marginTop: "1rem" }}>
                Useimmat asiakkaat jättävät arvostelun vasta, kun sitä pyydetään. Reputo tekee
                pyytämisestä helppoa ilman, että työntekijöiden tarvitsee kirjautua uuteen
                järjestelmään tai lähettää viestejä käsin.
              </p>
            </div>
            <div className="grid-3">
              {problemCards.map((card) => (
                <article key={card.title} className="card feature-card">
                  <h3 className="h3">{card.title}</h3>
                  <p className="muted" style={{ marginTop: "0.8rem" }}>
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="nain-toimii">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">Yksi yhteystieto riittää.</h2>
            </div>
            <div className="steps-grid">
              {steps.map((step, index) => (
                <article key={step.title} className="step-card">
                  <div className="step-number">{index + 1}</div>
                  <h3 className="h3">{step.title}</h3>
                  <p className="muted" style={{ marginTop: "0.8rem", maxWidth: "22rem" }}>
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="ominaisuudet">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">Kaikki oleellinen. Ei turhaa säätöä.</h2>
            </div>
            <div className="grid-4">
              {features.map((feature) => (
                <article key={feature.title} className="card feature-card">
                  <span className="feature-bullet" />
                  <h3 style={{ margin: 0, fontSize: "1.08rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                    {feature.title}
                  </h3>
                  <p className="muted" style={{ marginTop: "0.75rem" }}>
                    {feature.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="hallintapaneeli">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">Näe mitä tapahtuu.</h2>
            </div>
            <div className="card dashboard-preview">
              <div className="dashboard-preview-top">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="brand-mark" style={{ width: "1.45rem", height: "1.45rem", fontSize: "0.75rem" }}>
                    R
                  </span>
                  <strong>Hallintapaneeli</strong>
                </div>
                <span className="pill">Toukokuu 2026</span>
              </div>
              <div className="dashboard-preview-body">
                <div className="dashboard-preview-left">
                  <div className="grid-4">
                    {[
                      { label: "Lähetetyt pyynnöt", value: "84" },
                      { label: "Klikkausprosentti", value: "45 %" },
                      { label: "Uudet arvostelut", value: "12" },
                      { label: "Estetyt kontaktit", value: "3" },
                    ].map((stat) => (
                      <div key={stat.label} className="card metric-card">
                        <strong className="metric-value" style={{ fontSize: "1.8rem" }}>
                          {stat.value}
                        </strong>
                        <p className="form-note">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="form-note" style={{ marginTop: "1.3rem", marginBottom: "0.8rem" }}>
                    Pyynnöt / viikko
                  </p>
                  <div className="chart-bars">
                    {barHeights.map((height, index) => (
                      <span key={height + index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="dashboard-preview-right">
                  <div className="dashboard-panel-header">
                    <strong>Viimeisimmät pyynnöt</strong>
                    <span className="form-note">Reaaliaikainen</span>
                  </div>
                  <div style={{ display: "grid" }}>
                    {previewRows.map((row, index) => (
                      <div
                        key={row.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          padding: "0.9rem 0",
                          borderTop: index === 0 ? "none" : "1px solid var(--line)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", minWidth: 0 }}>
                          <span className="pill" style={{ padding: "0.25rem 0.55rem", fontSize: "0.72rem" }}>
                            {row.channel}
                          </span>
                          <span className="mono" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {row.label}
                          </span>
                        </div>
                        <span className={`status-badge ${row.tone === "warning" ? "warning" : ""}`}>
                          <span />
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">Yrityksille, joissa asiakas käy paikan päällä.</h2>
            </div>
            <div className="industry-grid">
              {industries.map((industry) => (
                <article key={industry} className="card industry-card">
                  <span style={{ fontWeight: 700 }}>{industry}</span>
                  <span className="muted">→</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap compliance-grid">
            <div>
              <h2 className="h2">Rehellistä palautteen pyytämistä.</h2>
              <p className="lede" style={{ marginTop: "1rem" }}>
                Reputo ei suodata asiakkaita eikä lupaa vain positiivisia arvosteluja. Viestit pyytävät
                rehellistä Google-arvostelua oikeilta asiakkailta.
              </p>
            </div>
            <ul className="compliance-list">
              {complianceItems.map((item) => (
                <li key={item}>
                  <span className="check-mark">✓</span>
                  <span style={{ fontWeight: 600 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="hinnoittelu">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2">Yksi selkeä paketti palveluyrityksille.</h2>
              <p className="lede" style={{ marginTop: "1rem" }}>
                Aloita kevyesti ja laajenna vasta, kun pyyntömäärät kasvavat.
              </p>
            </div>
            <div className="card pricing-card">
              <div className="pill">MVP-hinnoittelu</div>
              <div className="pricing-price">
                <strong>79 €</strong>
                <span className="muted">/ kk</span>
              </div>
              <ul className="pricing-list">
                <li>
                  <span className="check-mark">✓</span>
                  <span>Automaattiset arvostelupyynnöt tekstiviestillä ja sähköpostilla</span>
                </li>
                <li>
                  <span className="check-mark">✓</span>
                  <span>Hallintapaneeli lähetetyille pyynnöille, klikkauksille ja uusille arvosteluille</span>
                </li>
                <li>
                  <span className="check-mark">✓</span>
                  <span>Helppo käyttöönotto yhdelle yritykselle</span>
                </li>
              </ul>
              <div className="button-row">
                <a href="#demo" className="btn btn-primary">
                  Pyydä ilmainen demo
                </a>
                <Link href="/signup" className="btn btn-secondary">
                  Luo tili
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="cta-panel">
              <h2 className="h2">Haluatko nähdä miltä tämä näyttäisi teidän yritykselle?</h2>
              <p className="lede" style={{ margin: "1rem auto 1.8rem", maxWidth: "36rem", color: "rgba(255,255,255,0.78)" }}>
                Teemme sinulle nopean demon omalla yritysnimelläsi ja Google-arvostelulinkilläsi.
              </p>
              <a href="#demo" className="btn" style={{ background: "#fff", color: "var(--ink)" }}>
                Pyydä ilmainen demo
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="demo">
          <div className="wrap" style={{ maxWidth: "760px" }}>
            <div className="section-head" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
              <h2 className="h2">Pyydä ilmainen demo</h2>
              <p className="lede" style={{ marginTop: "1rem" }}>
                Vastaamme yleensä saman arkipäivän aikana.
              </p>
            </div>
            <DemoRequestForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <Logo />
            <p className="form-note" style={{ marginTop: "0.6rem" }}>
              Reputo auttaa paikallisia yrityksiä pyytämään enemmän rehellisiä Google-arvosteluja.
            </p>
          </div>
          <div>
            <p>Roisku Media · Lahti</p>
            <p className="form-note" style={{ marginTop: "0.4rem" }}>
              050 326 0441 · eelispuro@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

