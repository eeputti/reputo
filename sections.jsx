// sections.jsx — page sections. Reads shared components from window.
const { Reveal: R, Counter: Cnt, Stars: St, Float3D } = window;

/* ---------- trust bar ---------- */
function TrustBar() {
  const pills = ["Ei uutta järjestelmää", "Ei manuaalisia viestejä", "Helppo lopettaa milloin vain", "Rehellinen palaute"];
  return (
    <section className="sec-tight">
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
        <div style={{ fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.02em" }}>Rakennettu kiireisille palveluyrittäjille.</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {pills.map((p, i) => (
            <R as="span" key={p} delay={i*60} style={{ display: "inline-flex" }}>
              <span className={"pill float-pill fp" + (i+1)}><span className="dot" />{p}</span>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- problem ---------- */
function ProblemSection() {
  const cards = [
    { t: "Arvostelut jäävät pyytämättä", b: "Hyvä palvelukokemus unohtuu nopeasti, jos asiakkaalta ei pyydetä palautetta oikealla hetkellä." },
    { t: "Työntekijöillä ei ole aikaa", b: "Kiireisessä arjessa manuaaliset viestit jäävät helposti tekemättä." },
    { t: "Kilpailijat näyttävät luotettavammilta", b: "Google-arvostelut vaikuttavat siihen, kenelle uusi asiakas soittaa ensimmäisenä." },
  ];
  return (
    <section className="sec" id="ongelma">
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="sec-head" style={{ marginBottom: 54 }}>
          <R as="h2" className="h2">Tyytyväiset asiakkaat eivät aina muista arvostella.</R>
          <R as="p" className="lede" delay={80} style={{ marginTop: 18 }}>
            Useimmat asiakkaat jättävät arvostelun vasta, kun sitä pyydetään. Reputo tekee pyytämisestä helppoa ilman, että työntekijöiden tarvitsee kirjautua uuteen järjestelmään tai lähettää viestejä käsin.
          </R>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {cards.map((c, i) => (
            <R key={c.t} delay={i*90} className="card" style={{ padding: "28px 26px 30px", borderRadius: "var(--r-lg)" }}>
              <h3 className="h3" style={{ marginBottom: 10 }}>{c.t}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "1.02rem", lineHeight: 1.5 }}>{c.b}</p>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- how it works ---------- */
function HowItWorks() {
  const steps = [
    { t: "Lisää numero tai sähköposti", b: "Työntekijä lisää asiakkaan puhelinnumeron tai sähköpostin nopealla lomakkeella. Nimi on vapaaehtoinen." },
    { t: "Viesti lähtee automaattisesti", b: "Arvostelupyyntö lähetetään tekstiviestinä tai sähköpostina esimerkiksi seuraavana päivänä." },
    { t: "Asiakas siirtyy Googleen", b: "Lyhyt linkki ohjaa suoraan yrityksen Google-arvostelusivulle." },
  ];
  return (
    <section className="sec" id="nain-toimii" style={{ overflow: "hidden" }}>
      <div className="wash" style={{ "--grad": "calc(var(--grad) * 0.7)" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="sec-head" style={{ marginBottom: 56 }}>
          <R as="h2" className="h2">Yksi yhteystieto riittää.</R>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 0 }}>
          {steps.map((s, i) => (
            <R key={s.t} delay={i*110} style={{ padding: "0 28px", borderLeft: i ? "1px solid var(--line)" : "none" }}>
              <div style={{ fontSize: "clamp(3.4rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.9, color: "var(--ink)", marginBottom: 22 }} className="tnum">{i+1}</div>
              <h3 className="h3" style={{ marginBottom: 10 }}>{s.t}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "1.02rem", lineHeight: 1.5, maxWidth: 320 }}>{s.b}</p>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- features ---------- */
function FeaturesSection() {
  const feats = [
    { t: "Nopea quick add -linkki", b: "Lisää numero tai sähköposti sekunneissa puhelimesta tai tiskiltä." },
    { t: "Automaattiset SMS- ja sähköpostipyynnöt", b: "Viesti lähtee oikeaan aikaan tekstiviestinä tai sähköpostina ilman muistuttamista." },
    { t: "Yksi muistutusviesti", b: "Kohtelias muistutus niille, jotka eivät vielä vastanneet." },
    { t: "Klikkiseuranta", b: "Näet, kuka avasi linkin ja siirtyi Googleen." },
    { t: "Helppo poistua viesteistä", b: "Asiakas voi lopettaa viestit yhdellä vastauksella — vaivatonta sekä asiakkaalle että yrittäjälle." },
    { t: "Oma Google-arvostelulinkki", b: "Linkki ohjaa suoraan oikealle arvostelusivulle." },
    { t: "Kuukausiraportti", b: "Selkeä kooste lähetyksistä ja tuloksista joka kuukausi." },
    { t: "AI-vastauspohjat arvosteluihin", b: "Valmiit vastausluonnokset arvosteluihin myöhemmin." },
  ];
  return (
    <section className="sec" id="ominaisuudet">
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="sec-head" style={{ marginBottom: 50 }}>
          <R as="h2" className="h2">Kaikki oleellinen. Ei turhaa säätöä.</R>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
          {feats.map((f, i) => (
            <R key={f.t} delay={(i%4)*70} style={{ background: "var(--surface)", padding: "26px 24px 28px", transitionProperty: "background", transitionDuration: ".2s" }}
               onMouseEnter={(e)=>e.currentTarget.style.background="var(--surface-2)"}
               onMouseLeave={(e)=>e.currentTarget.style.background="var(--surface)"}>
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 2, background: "var(--accent)", marginBottom: 18 }} />
              <h3 style={{ fontSize: "1.08rem", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 8 }}>{f.t}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "0.97rem", lineHeight: 1.5 }}>{f.b}</p>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- dashboard preview ---------- */
function StatusBadge({ kind }) {
  const map = {
    sent: { t: "Lähetetty", bg: "var(--green-tint)", c: "var(--green-deep)", dot: "var(--green)" },
    clicked: { t: "Klikattu", bg: "var(--green-tint)", c: "var(--green-deep)", dot: "var(--green)" },
    reminder: { t: "Muistutus ajastettu", bg: "var(--amber-tint)", c: "oklch(0.45 0.11 70)", dot: "var(--amber)" },
    blocked: { t: "Estetty", bg: "#f0f0ee", c: "var(--ink-faint)", dot: "var(--ink-faint)" },
  };
  const s = map[kind];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px", borderRadius: 999, background: s.bg, color: s.c, fontSize: 12.5, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />{s.t}
    </span>
  );
}

function DashboardPreview() {
  const rows = [
    { n: "040 *** 1234", k: "sent", ch: "SMS" },
    { n: "a***@esimerkki.fi", k: "clicked", ch: "Email" },
    { n: "044 *** 7621", k: "reminder", ch: "SMS" },
    { n: "m***@gmail.com", k: "blocked", ch: "Email" },
  ];
  const stats = [
    { k: "Lähetetyt pyynnöt", to: 84, suffix: "" },
    { k: "Klikkausprosentti", to: 45, suffix: " %" },
    { k: "Uudet arvostelut", to: 12, suffix: "" },
    { k: "Estetyt kontaktit", to: 3, suffix: "" },
  ];
  const bars = [9, 14, 11, 17, 13, 20, 16];
  const max = Math.max(...bars);
  return (
    <section className="sec" id="hallintapaneeli" style={{ overflow: "hidden" }}>
      <div className="wash" />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="sec-head" style={{ marginBottom: 44 }}>
          <R as="h2" className="h2">Näe mitä tapahtuu.</R>
        </div>
        <R className="card" style={{ borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
          {/* dashboard top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid var(--line)", background: "var(--surface-2)", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12 }}>R</span>
              <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Hallintapaneeli</span>
            </div>
            <span className="pill" style={{ fontSize: "0.82rem", padding: "6px 13px" }}>Toukokuu 2026</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 0 }} className="dash-grid">
            {/* left: stats + chart */}
            <div style={{ padding: "26px 26px", borderRight: "1px solid var(--line)" }} className="dash-left">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 26 }}>
                {stats.map((s) => (
                  <div key={s.k} style={{ border: "1px solid var(--line)", borderRadius: 16, padding: "16px 17px", background: "var(--surface)" }}>
                    <div style={{ fontSize: "1.85rem", fontWeight: 700, letterSpacing: "-0.03em" }}><Cnt to={s.to} suffix={s.suffix} /></div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600, marginTop: 3 }}>{s.k}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600, marginBottom: 12 }}>Pyynnöt / viikko</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 80 }}>
                {bars.map((b, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                    <BarFill h={(b/max)*100} delay={i*70} last={i===bars.length-1} />
                  </div>
                ))}
              </div>
            </div>
            {/* right: recent requests */}
            <div style={{ padding: "26px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Viimeisimmät pyynnöt</span>
                <span style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600 }}>Reaaliaikainen</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {rows.map((r, i) => (
                  <div key={r.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 2px", borderTop: i ? "1px solid var(--line)" : "none" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink-faint)", border: "1px solid var(--line-strong)", borderRadius: 6, padding: "2px 6px", flex: "none" }}>{r.ch}</span>
                      <span className="mono" style={{ fontSize: 13.5, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.n}</span>
                    </span>
                    <StatusBadge kind={r.k} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

function BarFill({ h, delay, last }) {
  const [ref, seen] = window.useInView({ threshold: 0.5 });
  return (
    <div ref={ref} style={{
      height: seen ? h + "%" : "0%", minHeight: 4, borderRadius: 6,
      background: last ? "var(--green)" : "var(--accent)", opacity: last ? 1 : 0.85,
      transition: "height .8s cubic-bezier(.2,.8,.2,1)", transitionDelay: delay + "ms"
    }} />
  );
}

/* ---------- industries ---------- */
function IndustriesSection() {
  const items = ["Autokorjaamot","Kampaamot","Kauneushoitolat","Fysioterapeutit","Hammaslääkärit","Kuntosalit","Siivouspalvelut","Remonttipalvelut"];
  return (
    <section className="sec" id="toimialat">
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: 48 }}>
          <R as="h2" className="h2">Yrityksille, joissa asiakas käy paikan päällä.</R>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {items.map((t, i) => (
            <R key={t} delay={(i%4)*60} className="card" style={{ padding: "22px 22px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "space-between", transitionProperty: "transform, box-shadow", transitionDuration: ".18s" }}
               onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="var(--shadow-md)";}}
               onMouseLeave={(e)=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}>
              <span style={{ fontWeight: 600, fontSize: "1.02rem", letterSpacing: "-0.02em" }}>{t}</span>
              <span style={{ color: "var(--ink-faint)", fontSize: 18, lineHeight: 1 }}>→</span>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- compliance ---------- */
function ComplianceSection() {
  const bullets = ["Ei arvostelujen ostamista","Ei asiakkaiden filtteröintiä","Ei alennuksia arvosteluja vastaan","Selkeä STOP-mahdollisuus","Yritys hallitsee omaa Google-linkkiään"];
  return (
    <section className="sec" id="rehellisyys">
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
        <div>
          <R as="h2" className="h2" style={{ marginBottom: 20 }}>Rehellistä palautteen pyytämistä.</R>
          <R as="p" className="lede" delay={80}>
            Reputo ei suodata asiakkaita eikä lupaa vain positiivisia arvosteluja. Viestit pyytävät rehellistä Google-arvostelua oikeilta asiakkailta.
          </R>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
          {bullets.map((b, i) => (
            <R as="div" key={b} delay={i*70} style={{ background: "var(--surface)", padding: "18px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--green-tint)", color: "var(--green-deep)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, flex: "none" }}>✓</span>
              <span style={{ fontWeight: 500, fontSize: "1.02rem" }}>{b}</span>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */
function PricingSection() {
  const plans = [
    { name: "Starter", price: "49", tag: "Pienelle yritykselle", feats: ["100 SMS-pyyntöä / kk","1 toimipiste","Quick add -linkki","Klikkiseuranta","1 muistutusviesti"], cta: "Aloita Starterilla", featured: false },
    { name: "Growth", price: "99", tag: "Kasvavalle palveluyritykselle", feats: ["300 SMS-pyyntöä / kk","Useampi käyttäjä","Kuukausiraportti","AI-vastauspohjat","Prioriteettituki"], cta: "Valitse Growth", featured: true },
  ];
  return (
    <section className="sec" id="hinnoittelu" style={{ overflow: "hidden" }}>
      <div className="wash" />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="sec-head" style={{ marginBottom: 50, maxWidth: 640 }}>
          <R as="h2" className="h2">Selkeä hinta. Ei sitoutumista.</R>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 880 }}>
          {plans.map((p, i) => (
            <R key={p.name} delay={i*100} style={{
              borderRadius: "var(--r-xl)", padding: "32px 30px 34px",
              background: p.featured ? "var(--accent)" : "var(--surface)",
              color: p.featured ? "var(--accent-ink)" : "var(--ink)",
              border: p.featured ? "1px solid var(--accent)" : "1px solid var(--line)",
              boxShadow: p.featured ? "var(--shadow-lg)" : "var(--shadow-sm)"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>{p.name}</span>
                {p.featured && <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 10px", borderRadius: 999, background: "rgba(255,255,255,0.14)" }}>Suosituin</span>}
              </div>
              <div style={{ fontSize: 13.5, opacity: p.featured ? 0.75 : 1, color: p.featured ? "inherit" : "var(--ink-faint)", fontWeight: 600, marginBottom: 20 }}>{p.tag}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em" }} className="tnum">{p.price} €</span>
                <span style={{ opacity: 0.6, fontWeight: 600 }}>/ kk</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {p.feats.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: "1rem" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", flex: "none", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800,
                      background: p.featured ? "rgba(255,255,255,0.16)" : "var(--green-tint)", color: p.featured ? "#fff" : "var(--green-deep)" }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <a href="#demo" className={"btn btn-block " + (p.featured ? "" : "btn-primary")}
                 style={p.featured ? { background: "#fff", color: "var(--ink)" } : {}}>{p.cta}</a>
            </R>
          ))}
        </div>
        <R as="p" delay={120} style={{ marginTop: 24, fontSize: "0.95rem", color: "var(--ink-faint)", fontWeight: 500 }}>
          Ensimmäisille asiakkaille ensimmäinen kuukausi 29 €. Ei sitoutumista.
        </R>
      </div>
    </section>
  );
}

Object.assign(window, { TrustBar, ProblemSection, HowItWorks, FeaturesSection, DashboardPreview, IndustriesSection, ComplianceSection, PricingSection });
