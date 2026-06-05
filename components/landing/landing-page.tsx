"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

type FloatItem = {
  type: "star" | "bubble" | "tile" | "icon";
  size: number;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  anim?: string;
  dur?: number;
  delay?: number;
  glyph?: string;
  c?: [string, string, string];
  cs?: string;
  o?: number;
  neutral?: boolean;
};

const palette = {
  coral: ["#ffb39c", "#f9744b", "#cf3f22"] as [string, string, string],
  blue: ["#aacdff", "#4a90f0", "#2354b8"] as [string, string, string],
  amber: ["#ffe0a0", "#f5b73c", "#cc8b12"] as [string, string, string],
  violet: ["#d6c2ff", "#9162f2", "#6536c8"] as [string, string, string],
  pink: ["#ffc1e0", "#f561a8", "#c8327a"] as [string, string, string],
  teal: ["#a7f0d8", "#16b886", "#0c7d5b"] as [string, string, string],
  sky: ["#b4ecff", "#3ec0ec", "#1487b0"] as [string, string, string],
};

const fieldItems: FloatItem[] = [
  { type: "star", size: 64, left: "3%", top: "3%", anim: "bob", dur: 6.4, c: palette.amber },
  { type: "bubble", size: 56, right: "4%", top: "5%", anim: "tA", dur: 7 },
  { type: "star", size: 44, right: "16%", top: "2%", anim: "bob", dur: 6, delay: -1.5, c: palette.pink },
  { type: "star", size: 92, left: "-1%", top: "13%", anim: "spinA", dur: 18, c: palette.coral },
  { type: "star", size: 50, right: "5%", top: "12%", anim: "bob", dur: 6.6, delay: -1, c: palette.violet },
  { type: "star", size: 70, right: "2%", top: "19%", anim: "spinB", dur: 20, c: palette.sky },
  { type: "bubble", size: 84, left: "2%", top: "27%", anim: "tA", dur: 7.2, delay: -0.5 },
  { type: "tile", glyph: "@", size: 66, right: "4%", top: "26%", anim: "tB", dur: 8, delay: -1.6, c: palette.blue },
  { type: "star", size: 46, left: "12%", top: "32%", anim: "bob", dur: 6.2, c: palette.amber },
  { type: "tile", glyph: "✓", size: 72, left: "1%", top: "40%", anim: "tB", dur: 7.4, c: palette.teal },
  { type: "star", size: 58, right: "3%", top: "39%", anim: "bob", dur: 6.8, delay: -2, c: palette.pink },
  { type: "tile", glyph: "★", size: 50, right: "13%", top: "44%", anim: "tA", dur: 6.6, delay: -1, c: palette.amber },
  { type: "star", size: 80, left: "-1%", top: "52%", anim: "spinB", dur: 19, c: palette.violet },
  { type: "bubble", size: 54, right: "5%", top: "53%", anim: "tB", dur: 7, delay: -1.2 },
  { type: "icon", glyph: "🚗", size: 70, left: "2%", top: "62%", anim: "tA", dur: 7.3 },
  { type: "icon", glyph: "✂️", size: 56, right: "3%", top: "61%", anim: "tB", dur: 8, delay: -1 },
  { type: "icon", glyph: "💅", size: 58, left: "11%", top: "67%", anim: "tB", dur: 7.7, delay: -2 },
  { type: "icon", glyph: "💪", size: 64, right: "12%", top: "65%", anim: "tA", dur: 7, delay: -0.6 },
  { type: "icon", glyph: "🦷", size: 54, left: "4%", top: "71%", anim: "tA", dur: 7.5, delay: -1.4 },
  { type: "icon", glyph: "🏋️", size: 62, right: "2%", top: "70%", anim: "tB", dur: 8.1, delay: -2.2 },
  { type: "icon", glyph: "🧹", size: 56, left: "14%", top: "73%", anim: "tB", dur: 7.2, delay: -0.9 },
  { type: "icon", glyph: "🔨", size: 60, right: "9%", top: "74%", anim: "tA", dur: 7.8, delay: -1.7 },
  { type: "tile", glyph: "✓", size: 76, left: "0%", top: "80%", anim: "tA", dur: 7.4, c: palette.teal },
  { type: "star", size: 52, right: "4%", top: "81%", anim: "bob", dur: 6.4, delay: -1, c: palette.sky },
  { type: "tile", glyph: "€", size: 78, left: "2%", top: "89%", anim: "tB", dur: 7.6, c: palette.blue },
  { type: "star", size: 60, right: "3%", top: "90%", anim: "bob", dur: 6.6, delay: -1.5, c: palette.amber },
  { type: "star", size: 44, left: "13%", top: "94%", anim: "bob", dur: 6, delay: -0.8, c: palette.coral },
];

function useInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    let done = false;

    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    const reveal = () => {
      if (done) {
        return;
      }

      done = true;
      setSeen(true);
      cleanup();
    };

    const check = () => {
      if (done) {
        return;
      }

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      if (viewportHeight === 0) {
        return;
      }

      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
        reveal();
      }
    };

    const onVisibility = () => {
      if (!document.hidden) {
        check();
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    document.addEventListener("visibilitychange", onVisibility);
    check();

    const rafId = requestAnimationFrame(check);
    const timeoutId = window.setTimeout(check, 300);
    const safetyId = window.setTimeout(reveal, 3000);

    return () => {
      cleanup();
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(safetyId);
    };
  }, []);

  return [ref, seen] as const;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [ref, seen] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`.trim()}
      style={{ transitionDelay: seen ? `${delay}ms` : "0ms", ...style }}
    >
      {children}
    </div>
  );
}

function Counter({
  to,
  duration = 1300,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [ref, seen] = useInView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) {
      return;
    }

    let animationFrame = 0;
    let startTime: number | null = null;
    const ease = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min(1, (timestamp - startTime) / duration);
      setValue(to * ease(progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    const timeoutId = window.setTimeout(() => setValue(to), duration + 120);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeoutId);
    };
  }, [duration, seen, to]);

  const shown = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("fi-FI");

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className="tnum">
      {shown}
      {suffix}
    </span>
  );
}

function Stars({ value = 5, size = 14 }: { value?: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "var(--green)", fontSize: size, lineHeight: 1 }}>
      {[0, 1, 2, 3, 4].map((index) => (
        <span key={index} style={{ opacity: index < Math.round(value) ? 1 : 0.22 }}>
          ★
        </span>
      ))}
    </span>
  );
}

function Float3D({ items }: { items: FloatItem[] }) {
  return (
    <div className="starfield" aria-hidden="true">
      {items.map((item, index) => {
        const style: React.CSSProperties & Record<string, string> = {
          "--s": `${item.size}px`,
          "--d": `${item.dur || 7}s`,
          animationDelay: `${item.delay || 0}s`,
        };

        if (item.left) style.left = item.left;
        if (item.right) style.right = item.right;
        if (item.top) style.top = item.top;
        if (item.bottom) style.bottom = item.bottom;
        if (item.o !== undefined) style["--o"] = String(item.o);
        if (item.c) {
          style["--c1"] = item.c[0];
          style["--c2"] = item.c[1];
          style["--c3"] = item.c[2];
          style["--cs"] = item.cs || item.c[2];
        }

        if (item.type === "star") {
          return <div key={index} className={`star3d ${item.anim || "bob"} ${item.neutral ? "neutral" : ""}`} style={style} />;
        }

        if (item.type === "bubble") {
          return (
            <div key={index} className={`bubble3d ${item.anim || "tA"}`} style={style}>
              <span>
                <i />
                <i />
                <i />
              </span>
            </div>
          );
        }

        if (item.type === "icon") {
          return (
            <div key={index} className={`tile3d ico ${item.anim || "tA"}`} style={style}>
              <span>{item.glyph}</span>
            </div>
          );
        }

        return (
          <div key={index} className={`tile3d ${item.anim || "tA"} ${item.c ? "solid" : ""}`} style={style}>
            <span>{item.glyph}</span>
          </div>
        );
      })}
    </div>
  );
}

function PhoneMockup() {
  const [delivered, setDelivered] = useState(false);
  const [ref, seen] = useInView();

  useEffect(() => {
    if (!seen) {
      return;
    }

    const timeoutId = window.setTimeout(() => setDelivered(true), 900);
    return () => window.clearTimeout(timeoutId);
  }, [seen]);

  return (
    <div ref={ref} className="phone-card">
      <div className="phone-card-inner">
        <div className="phone-toolbar">
          <span className="tnum">9.41</span>
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
          <div className="form-note" style={{ textAlign: "center", fontWeight: 700 }}>
            Tänään 10.02
          </div>
          <div className="phone-bubble phone-bubble-animated" style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(8px)" }}>
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
          <div className="form-note" style={{ paddingLeft: "0.4rem", fontWeight: 700, opacity: delivered ? 1 : 0, transition: "opacity .4s" }}>
            Toimitettu ✓
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardHeroCard() {
  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [scheduled, setScheduled] = useState(false);
  const isSms = channel === "sms";
  const stats = [
    { label: "Lähetetty", value: 84, decimals: 0 },
    { label: "Klikattu", value: 38, decimals: 0 },
    { label: "Keskiarvo", value: 4.7, decimals: 1, star: true },
    { label: "Uutta arvostelua", value: 12, decimals: 0 },
  ];

  return (
    <div className="card hero-dashboard-card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem" }}>
        <strong style={{ letterSpacing: "-0.02em" }}>Lisää asiakas</strong>
        <span className="muted" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
          Autokorjaamo Esimerkki
        </span>
      </div>
      <div className="hero-tabs">
        <button className={`hero-tab ${isSms ? "active" : ""}`} onClick={() => setChannel("sms")} type="button">
          Tekstiviesti
        </button>
        <button className={`hero-tab ${!isSms ? "active" : ""}`} onClick={() => setChannel("email")} type="button">
          Sähköposti
        </button>
      </div>
      <div style={{ display: "flex", gap: "0.55rem", marginBottom: "0.75rem" }}>
        <input
          className="hero-inline-input mono"
          readOnly
          value={isSms ? "040 123 4567" : "asiakas@esimerkki.fi"}
        />
        <button type="button" className="btn btn-primary hero-inline-button" onClick={() => setScheduled(true)}>
          Lähetä
        </button>
      </div>
      <div className="alert success" style={{ marginBottom: "1rem", opacity: scheduled ? 1 : 0.92 }}>
        {scheduled
          ? isSms
            ? "Tekstiviesti ajastettu huomiselle klo 10.00."
            : "Sähköposti ajastettu huomiselle klo 10.00."
          : "Valmis ajastettavaksi"}
      </div>
      <div className="mini-grid">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="mini-value">
              <Counter to={stat.value} decimals={stat.decimals} />
              {stat.star ? <span style={{ color: "var(--green)", fontSize: "1rem", marginLeft: 6 }}>★</span> : null}
            </div>
            <div className="form-note" style={{ marginTop: "0.2rem" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ tone, children }: { tone?: "warning"; children: React.ReactNode }) {
  return (
    <span className={`status-badge ${tone === "warning" ? "warning" : ""}`}>
      <span />
      {children}
    </span>
  );
}

function BarFill({ height, delay, last }: { height: number; delay: number; last?: boolean }) {
  const [ref, seen] = useInView();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
      <div
        ref={ref}
        style={{
          height: seen ? `${height}%` : "0%",
          minHeight: 4,
          borderRadius: 6,
          background: last ? "var(--green)" : "var(--accent)",
          opacity: last ? 1 : 0.85,
          transition: "height .8s cubic-bezier(.2,.8,.2,1)",
          transitionDelay: `${delay}ms`,
        }}
      />
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

      <main className="landing-main">
        <Float3D items={fieldItems} />

        <section className="section">
          <div className="wash" />
          <div className="wrap hero-grid">
            <div style={{ position: "relative", zIndex: 1 }}>
              <Reveal className="pill" style={{ marginBottom: "1.4rem", display: "inline-flex" }}>
                <span className="pill-dot" />
                Google-arvostelut automaattisesti tekstiviestillä ja sähköpostilla
              </Reveal>
              <Reveal delay={60}>
                <h1 className="display">Enemmän Google-arvosteluja. Vähemmän muistettavaa.</h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="lede" style={{ marginTop: "1.5rem", maxWidth: "36rem" }}>
                  Lisää asiakkaan puhelinnumero tai sähköposti, ja Reputo lähettää kohteliaan
                  Google-arvostelupyynnön oikeaan aikaan tekstiviestinä tai sähköpostina.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="button-row" style={{ marginTop: "2rem" }}>
                  <a href="#demo" className="btn btn-primary">
                    Pyydä ilmainen demo
                  </a>
                  <a href="#nain-toimii" className="btn btn-secondary">
                    Näe miten se toimii
                  </a>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginTop: "1.5rem" }}>
                  <Stars value={5} size={15} />
                  <span className="muted" style={{ fontWeight: 600 }}>
                    4.7 keskiarvo · 12 uutta arvostelua / kk
                  </span>
                </div>
              </Reveal>
            </div>
            <div className="hero-visual">
              <PhoneMockup />
              <div className="dash-wrap">
                <DashboardHeroCard />
              </div>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="wrap trust-row">
            <Reveal>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Rakennettu kiireisille palveluyrittäjille.
              </div>
            </Reveal>
            <div className="pill-grid">
              {trustPills.map((pill, index) => (
                <Reveal key={pill} delay={index * 60} style={{ display: "inline-flex" }}>
                  <span className={`pill float-pill fp${index + 1}`}>
                    <span className="pill-dot" />
                    {pill}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="section-head">
              <Reveal>
                <h2 className="h2">Tyytyväiset asiakkaat eivät aina muista arvostella.</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="lede" style={{ marginTop: "1rem" }}>
                  Useimmat asiakkaat jättävät arvostelun vasta, kun sitä pyydetään. Reputo tekee
                  pyytämisestä helppoa ilman, että työntekijöiden tarvitsee kirjautua uuteen
                  järjestelmään tai lähettää viestejä käsin.
                </p>
              </Reveal>
            </div>
            <div className="grid-3">
              {problemCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 90}>
                  <article className="card feature-card">
                    <h3 className="h3">{card.title}</h3>
                    <p className="muted" style={{ marginTop: "0.8rem" }}>
                      {card.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="nain-toimii" style={{ overflow: "hidden" }}>
          <div className="wash wash-soft" />
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <h2 className="h2">Yksi yhteystieto riittää.</h2>
              </Reveal>
            </div>
            <div className="steps-grid steps-grid-lined">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 110} className="step-card-wrap">
                  <article className="step-card">
                    <div className="step-number">{index + 1}</div>
                    <h3 className="h3">{step.title}</h3>
                    <p className="muted" style={{ marginTop: "0.8rem", maxWidth: "22rem" }}>
                      {step.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="ominaisuudet">
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="section-head">
              <Reveal>
                <h2 className="h2">Kaikki oleellinen. Ei turhaa säätöä.</h2>
              </Reveal>
            </div>
            <div className="grid-4 feature-grid-framed">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={(index % 4) * 70}>
                  <article className="card feature-card feature-card-hover">
                    <span className="feature-bullet" />
                    <h3 style={{ margin: 0, fontSize: "1.08rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                      {feature.title}
                    </h3>
                    <p className="muted" style={{ marginTop: "0.75rem" }}>
                      {feature.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="hallintapaneeli" style={{ overflow: "hidden" }}>
          <div className="wash" />
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <h2 className="h2">Näe mitä tapahtuu.</h2>
              </Reveal>
            </div>
            <Reveal>
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
                    <div className="grid-4 dashboard-stat-grid">
                      {[
                        { label: "Lähetetyt pyynnöt", value: 84, suffix: "" },
                        { label: "Klikkausprosentti", value: 45, suffix: " %" },
                        { label: "Uudet arvostelut", value: 12, suffix: "" },
                        { label: "Estetyt kontaktit", value: 3, suffix: "" },
                      ].map((stat) => (
                        <div key={stat.label} className="card metric-card">
                          <strong className="metric-value" style={{ fontSize: "1.8rem" }}>
                            <Counter to={stat.value} suffix={stat.suffix} />
                          </strong>
                          <p className="form-note">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <p className="form-note" style={{ marginTop: "1.3rem", marginBottom: "0.8rem", fontWeight: 700 }}>
                      Pyynnöt / viikko
                    </p>
                    <div className="chart-bars">
                      {barHeights.map((height, index) => (
                        <BarFill key={height + index} height={height} delay={index * 70} last={index === barHeights.length - 1} />
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
                            <span className="pill preview-channel-pill">{row.channel}</span>
                            <span className="mono" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {row.label}
                            </span>
                          </div>
                          <StatusBadge tone={row.tone === "warning" ? "warning" : undefined}>{row.status}</StatusBadge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <h2 className="h2">Yrityksille, joissa asiakas käy paikan päällä.</h2>
              </Reveal>
            </div>
            <div className="industry-grid">
              {industries.map((industry, index) => (
                <Reveal key={industry} delay={(index % 4) * 60}>
                  <article className="card industry-card industry-card-hover">
                    <span style={{ fontWeight: 700 }}>{industry}</span>
                    <span className="muted">→</span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap compliance-grid">
            <div>
              <Reveal>
                <h2 className="h2">Rehellistä palautteen pyytämistä.</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="lede" style={{ marginTop: "1rem" }}>
                  Reputo ei suodata asiakkaita eikä lupaa vain positiivisia arvosteluja. Viestit pyytävät
                  rehellistä Google-arvostelua oikeilta asiakkailta.
                </p>
              </Reveal>
            </div>
            <div className="compliance-list">
              {complianceItems.map((item, index) => (
                <Reveal key={item} delay={index * 70}>
                  <div className="compliance-row">
                    <span className="check-mark">✓</span>
                    <span style={{ fontWeight: 600 }}>{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="hinnoittelu">
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <h2 className="h2">Selkeä hinta. Ei sitoutumista.</h2>
              </Reveal>
            </div>
            <div className="pricing-plan-grid">
              {[
                {
                  name: "Starter",
                  price: "49",
                  tag: "Pienelle yritykselle",
                  feats: ["100 SMS-pyyntöä / kk", "1 toimipiste", "Quick add -linkki", "Klikkiseuranta", "1 muistutusviesti"],
                  cta: "Aloita Starterilla",
                  featured: false,
                },
                {
                  name: "Growth",
                  price: "99",
                  tag: "Kasvavalle palveluyritykselle",
                  feats: ["300 SMS-pyyntöä / kk", "Useampi käyttäjä", "Kuukausiraportti", "AI-vastauspohjat", "Prioriteettituki"],
                  cta: "Valitse Growth",
                  featured: true,
                },
              ].map((plan, index) => (
                <Reveal key={plan.name} delay={index * 100}>
                  <div className={`pricing-plan-card ${plan.featured ? "featured" : ""}`}>
                    <div className="pricing-plan-head">
                      <span className="pricing-plan-name">{plan.name}</span>
                      {plan.featured ? <span className="pricing-plan-badge">Suosituin</span> : null}
                    </div>
                    <div className="pricing-plan-tag">{plan.tag}</div>
                    <div className="pricing-price">
                      <strong>{plan.price} €</strong>
                      <span>/ kk</span>
                    </div>
                    <div className="pricing-features">
                      {plan.feats.map((feature) => (
                        <div key={feature} className="pricing-feature-row">
                          <span className={`pricing-feature-check ${plan.featured ? "featured" : ""}`}>✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#demo"
                      className={`btn btn-block ${plan.featured ? "pricing-featured-button" : "btn-primary"}`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="pricing-footnote">Ensimmäisille asiakkaille ensimmäinen kuukausi 29 €. Ei sitoutumista.</p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="cta-panel">
                <h2 className="h2">Haluatko nähdä miltä tämä näyttäisi teidän yritykselle?</h2>
                <p className="lede" style={{ margin: "1rem auto 1.8rem", maxWidth: "36rem", color: "rgba(255,255,255,0.78)" }}>
                  Teemme sinulle nopean demon omalla yritysnimelläsi ja Google-arvostelulinkilläsi.
                </p>
                <a href="#demo" className="btn" style={{ background: "#fff", color: "var(--ink)" }}>
                  Pyydä ilmainen demo
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="demo">
          <div className="wash" />
          <div className="wrap" style={{ maxWidth: "760px", position: "relative", zIndex: 1 }}>
            <div className="section-head" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
              <Reveal>
                <h2 className="h2">Pyydä ilmainen demo</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="lede" style={{ marginTop: "1rem" }}>
                  Vastaamme yleensä saman arkipäivän aikana.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <DemoRequestForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer footer-dark">
        <div className="wrap footer-inner">
          <div>
            <Logo />
            <p className="form-note footer-note" style={{ marginTop: "0.6rem" }}>
              Reputo auttaa paikallisia yrityksiä pyytämään enemmän rehellisiä Google-arvosteluja.
            </p>
          </div>
          <div>
            <p>Roisku Media · Lahti</p>
            <p className="form-note footer-note" style={{ marginTop: "0.4rem" }}>
              050 326 0441 · eelispuro@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
