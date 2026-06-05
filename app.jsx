// app.jsx — nav, hero, demo form, footer, tweaks, assembly.
const { useState: uS, useEffect: uE } = React;
const {
  Logo, PhoneMockup, HeroDashCard, Stars, Float3D,
  TrustBar, ProblemSection, HowItWorks, FeaturesSection,
  DashboardPreview, IndustriesSection, ComplianceSection, PricingSection,
  useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio
} = window;

/* ---------- responsive + small global styles ---------- */
function GlobalStyles() {
  return (
    <style>{`
      main { position: relative; }
      main > section { position: relative; z-index: 1; }
      main > .starfield { position: absolute; inset: 0; height: 100%; z-index: 0; }
      .nav { position: sticky; top: 0; z-index: 50; background: color-mix(in oklab, var(--bg) 78%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: border-color .2s, background .2s; }
      .nav.scrolled { border-color: var(--line); }
      .nav-links { display: flex; gap: 30px; }
      .nav-links a { font-size: 0.96rem; font-weight: 500; color: var(--ink-soft); transition: color .15s; white-space: nowrap; }
      .nav-links a:hover { color: var(--ink); }
      .hero-grid { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 48px; align-items: center; }
      .hero-visual { display: flex; align-items: center; justify-content: center; position: relative; }
      .hero-visual .dash-wrap { margin-left: -70px; z-index: 3; width: 338px; flex: none; }
      .field { display: flex; flex-direction: column; gap: 7px; }
      .field label { font-size: 0.86rem; font-weight: 600; color: var(--ink-soft); }
      .field input, .field textarea { font-family: inherit; font-size: 1rem; color: var(--ink); background: var(--surface); border: 1px solid var(--line-strong); border-radius: 12px; padding: 13px 15px; transition: border-color .15s, box-shadow .15s; width: 100%; }
      .field input:focus, .field textarea:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px color-mix(in oklab, var(--ink) 10%, transparent); }
      .field.err input, .field.err textarea { border-color: oklch(0.58 0.18 25); }
      .field .msg { font-size: 0.8rem; color: oklch(0.55 0.18 25); font-weight: 500; }
      @media (max-width: 920px) {
        .hero-grid { grid-template-columns: 1fr; gap: 44px; }
        .hero-visual { justify-content: flex-start; flex-wrap: wrap; gap: 22px; }
        .hero-visual .dash-wrap { margin-left: 0; }
        .nav-links { display: none; }
        .dash-grid { grid-template-columns: 1fr !important; }
        .dash-left { border-right: none !important; border-bottom: 1px solid var(--line); }
        .form-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 560px) {
        .hero-visual { transform: scale(0.92); transform-origin: left top; }
        .btn-row { flex-direction: column; align-items: stretch; }
      }
    `}</style>
  );
}

/* ---------- nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = uS(false);
  uE(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap" style={{ height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <nav className="nav-links">
          <a href="#nain-toimii">Näin se toimii</a>
          <a href="#ominaisuudet">Ominaisuudet</a>
          <a href="#hallintapaneeli">Hallintapaneeli</a>
          <a href="#hinnoittelu">Hinnoittelu</a>
        </nav>
        <a href="#demo" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "0.95rem" }}>Pyydä demo</a>
      </div>
    </div>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="top" className="sec" style={{ paddingTop: "clamp(54px,7vw,96px)", overflow: "hidden" }}>
      <div className="wash" style={{ "--grad": "calc(var(--grad) * 1)" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid">
          <div>
            <div className="reveal in pill" style={{ marginBottom: 24, fontSize: "0.85rem" }}>
              <span className="dot" />Google-arvostelut automaattisesti — tekstiviestillä ja sähköpostilla
            </div>
            <h1 className="display" style={{ marginBottom: 22 }}>Enemmän Google&#8209;arvosteluja. Vähemmän muistettavaa.</h1>
            <p className="lede" style={{ maxWidth: 520, marginBottom: 34 }}>
              Lisää asiakkaan puhelinnumero tai sähköposti, ja Reputo lähettää kohteliaan Google-arvostelupyynnön oikeaan aikaan — tekstiviestinä tai sähköpostina.
            </p>
            <div className="btn-row" style={{ display: "flex", gap: 12, marginBottom: 30 }}>
              <a href="#demo" className="btn btn-primary btn-lg">Pyydä ilmainen demo</a>
              <a href="#nain-toimii" className="btn btn-ghost btn-lg">Näe miten se toimii</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--ink-soft)", fontSize: "0.95rem", fontWeight: 500 }}>
              <Stars value={5} size={15} />
              <span>4.7 ★ keskiarvo · 12 uutta arvostelua / kk</span>
            </div>
          </div>
          <div className="hero-visual">
            <PhoneMockup />
            <div className="dash-wrap"><HeroDashCard /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- final CTA ---------- */
function FinalCTA() {
  return (
    <section className="sec" style={{ overflow: "hidden" }}>
      <div className="wrap">
        <div style={{ background: "var(--accent)", color: "var(--accent-ink)", borderRadius: "var(--r-xl)", padding: "clamp(44px,6vw,80px) clamp(28px,5vw,72px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 560, height: 560, top: "-40%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(closest-side, color-mix(in oklab, var(--green) 40%, transparent), transparent 70%)", opacity: 0.5, pointerEvents: "none" }}></div>
          <div style={{ position: "relative", zIndex: 1 }}>
          <h2 className="h2" style={{ maxWidth: 720, margin: "0 auto 18px" }}>Haluatko nähdä miltä tämä näyttäisi teidän yritykselle?</h2>
          <p style={{ fontSize: "1.15rem", opacity: 0.8, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.5 }}>
            Teemme sinulle nopean demon omalla yritysnimelläsi ja Google-arvostelulinkilläsi.
          </p>
          <a href="#demo" className="btn btn-lg" style={{ background: "#fff", color: "var(--ink)" }}>Pyydä ilmainen demo</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- demo form ---------- */
function DemoForm() {
  const [f, setF] = uS({ yritys: "", henkilo: "", email: "", puhelin: "", maps: "", viesti: "" });
  const [errors, setErrors] = uS({});
  const [sent, setSent] = uS(false);
  const set = (k) => (e) => setF((p) => Object.assign({}, p, { [k]: e.target.value }));
  const fields = [
    { k: "yritys", l: "Yrityksen nimi", req: true, ph: "Autokorjaamo Esimerkki" },
    { k: "henkilo", l: "Yhteyshenkilö", req: false, ph: "Etunimi Sukunimi" },
    { k: "email", l: "Sähköposti", req: true, ph: "nimi@yritys.fi", type: "email" },
    { k: "puhelin", l: "Puhelin", req: true, ph: "040 123 4567", type: "tel" },
    { k: "maps", l: "Google Maps / Google Business -linkki", req: false, ph: "https://g.page/...", full: true },
  ];
  const validate = () => {
    const e = {};
    if (!f.yritys.trim()) e.yritys = "Pakollinen kenttä";
    if (!f.email.trim()) e.email = "Pakollinen kenttä";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Tarkista sähköpostiosoite";
    if (!f.puhelin.trim()) e.puhelin = "Pakollinen kenttä";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = (ev) => { ev.preventDefault(); if (validate()) setSent(true); };

  return (
    <section className="sec" id="demo" style={{ overflow: "hidden" }}>
      <div className="wash" />
      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        <div className="sec-head" style={{ marginBottom: 36, textAlign: "center", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          <h2 className="h2" style={{ marginBottom: 14 }}>Pyydä ilmainen demo</h2>
          <p className="lede">Vastaamme yleensä saman arkipäivän aikana.</p>
        </div>

        {sent ? (
          <div className="card" style={{ padding: "44px 32px", textAlign: "center", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-md)" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green-tint)", color: "var(--green-deep)", display: "grid", placeItems: "center", fontSize: 26, fontWeight: 800, margin: "0 auto 18px" }}>✓</div>
            <h3 className="h3" style={{ marginBottom: 10 }}>Kiitos! Pyyntö vastaanotettu.</h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "1.05rem", maxWidth: 420, margin: "0 auto 22px" }}>
              Olemme yhteydessä osoitteeseen <strong style={{ color: "var(--ink)" }}>{f.email}</strong> ja rakennamme demon yritykselle <strong style={{ color: "var(--ink)" }}>{f.yritys}</strong>.
            </p>
            <button className="btn btn-ghost" onClick={() => { setSent(false); setF({ yritys: "", henkilo: "", email: "", puhelin: "", maps: "", viesti: "" }); }}>Lähetä uusi pyyntö</button>
          </div>
        ) : (
          <form className="card" onSubmit={submit} noValidate style={{ padding: "clamp(26px,4vw,40px)", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-md)" }}>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {fields.map((fld) => (
                <div key={fld.k} className={"field" + (errors[fld.k] ? " err" : "")} style={fld.full ? { gridColumn: "1 / -1" } : {}}>
                  <label>{fld.l}{!fld.req && <span style={{ color: "var(--ink-faint)", fontWeight: 500 }}> · vapaaehtoinen</span>}</label>
                  <input type={fld.type || "text"} value={f[fld.k]} onChange={set(fld.k)} placeholder={fld.ph}
                         className={fld.k === "puhelin" || fld.k === "maps" ? "mono" : ""} />
                  {errors[fld.k] && <span className="msg">{errors[fld.k]}</span>}
                </div>
              ))}
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label>Vapaa viesti<span style={{ color: "var(--ink-faint)", fontWeight: 500 }}> · vapaaehtoinen</span></label>
                <textarea rows={3} value={f.viesti} onChange={set("viesti")} placeholder="Kerro lyhyesti yrityksestäsi…" style={{ resize: "vertical" }}></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 22 }}>Pyydä demo</button>
            <p style={{ textAlign: "center", marginTop: 14, fontSize: "0.86rem", color: "var(--ink-faint)" }}>Ei sitoutumista. Emme jaa tietojasi kolmansille osapuolille.</p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
const COMPANY = {
  legal: "Roisku Media",
  form: "Yksityinen elinkeinonharjoittaja",
  ytunnus: "3413406-6",
  address: "Rauhankatu 10 C 809, 15110 Lahti",
  city: "Lahti",
  phone: "0503260441",
  phoneFmt: "050 326 0441",
  email: "eelispuro@gmail.com",
  web: "www.roiskumedia.fi",
};

function PrivacyModal({ onClose }) {
  uE(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);
  const h = { fontSize: "1.02rem", fontWeight: 700, letterSpacing: "-0.02em", margin: "22px 0 6px", color: "var(--ink)" };
  const p = { color: "var(--ink-soft)", fontSize: "0.96rem", lineHeight: 1.55, margin: 0 };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(14,14,15,0.5)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 20 }}>
      <div onClick={(e)=>e.stopPropagation()} className="card" style={{ width: "100%", maxWidth: 640, maxHeight: "86vh", overflow: "auto", borderRadius: "var(--r-lg)", padding: "clamp(24px,4vw,40px)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Tietosuojaseloste</h2>
          <button onClick={onClose} aria-label="Sulje" style={{ border: "1px solid var(--line-strong)", background: "var(--surface)", borderRadius: "50%", width: 34, height: 34, fontSize: 16, lineHeight: 1, color: "var(--ink-soft)", flex: "none" }}>✕</button>
        </div>
        <p style={{ ...p, marginTop: 6 }}>Päivitetty 5.6.2026. Tämä seloste kuvaa, miten Reputo-palvelussa käsitellään henkilötietoja EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti.</p>

        <h3 style={h}>Rekisterinpitäjä</h3>
        <p style={p}>{COMPANY.legal} ({COMPANY.form})<br />Y-tunnus {COMPANY.ytunnus}<br />{COMPANY.address}<br />Puh. <a href={"tel:"+COMPANY.phone} style={{ color: "var(--ink)" }}>{COMPANY.phoneFmt}</a></p>

        <h3 style={h}>Mitä tietoja käsittelemme</h3>
        <p style={p}>Asiakasyrityksen lisäämät loppuasiakkaiden yhteystiedot (puhelinnumero tai sähköposti ja vapaaehtoinen nimi) arvostelupyyntöjen lähettämistä varten, sekä lähetys- ja klikkaustiedot palvelun toiminnan seuraamiseksi. Lisäksi käsittelemme asiakasyrityksen yhteyshenkilön tietoja sopimuksen hoitamiseksi.</p>

        <h3 style={h}>Käsittelyn peruste ja tarkoitus</h3>
        <p style={p}>Tietoja käsitellään sopimuksen täytäntöönpanemiseksi ja oikeutetun edun perusteella arvostelupyyntöjen toimittamiseksi. Emme suodata asiakkaita emmekä myy tietoja eteenpäin.</p>

        <h3 style={h}>Säilytysaika ja vastaanottajat</h3>
        <p style={p}>Yhteystiedot säilytetään vain niin kauan kuin pyynnön lähettäminen ja palvelun toiminta edellyttävät. Tietoja luovutetaan ainoastaan viestien välittämiseen käytettäville teknisille palveluntarjoajille (SMS- ja sähköpostioperaattorit). Loppuasiakas voi lopettaa viestit milloin tahansa vastaamalla STOP.</p>

        <h3 style={h}>Rekisteröidyn oikeudet</h3>
        <p style={p}>Sinulla on oikeus tarkastaa itseäsi koskevat tiedot, pyytää niiden oikaisua tai poistoa sekä vastustaa käsittelyä. Pyynnöt osoitetaan yllä oleviin yhteystietoihin.</p>
      </div>
    </div>
  );
}

function Footer() {
  const [privacy, setPrivacy] = uS(false);
  const cols = [
    { h: "Tuote", l: [
      { t: "Näin se toimii", href: "#nain-toimii" },
      { t: "Ominaisuudet", href: "#ominaisuudet" },
      { t: "Hallintapaneeli", href: "#hallintapaneeli" },
      { t: "Hinnoittelu", href: "#hinnoittelu" },
    ]},
    { h: "Yritys", l: [
      { t: "Rehellisyys", href: "#rehellisyys" },
      { t: "Tietosuoja", onClick: () => setPrivacy(true) },
      { t: "Pyydä demo", href: "#demo" },
    ]},
  ];
  const linkS = { color: "rgba(255,255,255,0.72)", fontSize: "0.96rem", transition: "color .15s", cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left", fontFamily: "inherit" };
  return (
    <footer style={{ background: "var(--ink)", color: "#fff", padding: "64px 0 40px", position: "relative", zIndex: 1 }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap", marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <Logo light />
            <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 16, fontSize: "0.98rem", lineHeight: 1.5 }}>
              Google-arvostelupyynnöt automaattisesti tekstiviestillä ja sähköpostilla — kiireisille palveluyrityksille.
            </p>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {cols.map((col) => (
              <div key={col.h}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>{col.h}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, alignItems: "flex-start" }}>
                  {col.l.map((x) => x.onClick
                    ? <button key={x.t} onClick={x.onClick} style={linkS} onMouseEnter={(e)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e)=>e.currentTarget.style.color="rgba(255,255,255,0.72)"}>{x.t}</button>
                    : <a key={x.t} href={x.href} style={linkS} onMouseEnter={(e)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e)=>e.currentTarget.style.color="rgba(255,255,255,0.72)"}>{x.t}</a>
                  )}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Yhteystiedot</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: "0.96rem", color: "rgba(255,255,255,0.72)" }}>
                <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>{COMPANY.legal}</span>
                <span>{COMPANY.address}</span>
                <a href={"tel:"+COMPANY.phone} style={linkS} onMouseEnter={(e)=>e.currentTarget.style.color="#fff"} onMouseLeave={(e)=>e.currentTarget.style.color="rgba(255,255,255,0.72)"}>{COMPANY.phoneFmt}</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)" }}>
          <span>© 2026 Reputo · {COMPANY.legal} · Y-tunnus {COMPANY.ytunnus}</span>
          <span>Tehty Suomessa</span>
        </div>
      </div>
      {privacy && <PrivacyModal onClose={() => setPrivacy(false)} />}
    </footer>
  );
}

/* ---------- tweaks ---------- */
const ACCENTS = [
  { v: "#0e0e0f", hover: "#2a2a2c" },
  { v: "#1f3a5f", hover: "#15293f" },
  { v: "#4f46e5", hover: "#4138c9" },
  { v: "#0b6e4f", hover: "#085740" },
  { v: "#c1502e", hover: "#a44226" },
];
const GRAD = { "Pois": 0, "Hillitty": 0.3, "Keskitaso": 0.55, "Runsas": 1 };

// playful gradient palette [light, mid, deep] for the floating 3D field
const PAL = {
  coral:  ["#ffb39c", "#f9744b", "#cf3f22"],
  blue:   ["#aacdff", "#4a90f0", "#2354b8"],
  amber:  ["#ffe0a0", "#f5b73c", "#cc8b12"],
  violet: ["#d6c2ff", "#9162f2", "#6536c8"],
  pink:   ["#ffc1e0", "#f561a8", "#c8327a"],
  teal:   ["#a7f0d8", "#16b886", "#0c7d5b"],
  sky:    ["#b4ecff", "#3ec0ec", "#1487b0"],
};

// One unified field spread down the whole page. Distributed across the side
// margins / section gaps so content stays readable. Themed loosely by region:
// reviews → contact → features → industries → trust → pricing.
const FIELD = [
  // hero / reviews
  { type: "star", size: 64, left: "3%", top: "3%", anim: "bob", dur: 6.4, c: PAL.amber },
  { type: "bubble", size: 56, right: "4%", top: "5%", anim: "tA", dur: 7 },
  { type: "star", size: 44, right: "16%", top: "2%", anim: "bob", dur: 6, delay: -1.5, c: PAL.pink },
  // trust bar / problem
  { type: "star", size: 92, left: "-1%", top: "13%", anim: "spinA", dur: 18, c: PAL.coral },
  { type: "star", size: 50, right: "5%", top: "12%", anim: "bob", dur: 6.6, delay: -1, c: PAL.violet },
  { type: "star", size: 70, right: "2%", top: "19%", anim: "spinB", dur: 20, c: PAL.sky },
  // how it works / contact
  { type: "bubble", size: 84, left: "2%", top: "27%", anim: "tA", dur: 7.2, delay: -0.5 },
  { type: "tile", glyph: "@", size: 66, right: "4%", top: "26%", anim: "tB", dur: 8, delay: -1.6, c: PAL.blue },
  { type: "star", size: 46, left: "12%", top: "32%", anim: "bob", dur: 6.2, c: PAL.amber },
  // features / essentials
  { type: "tile", glyph: "✓", size: 72, left: "1%", top: "40%", anim: "tB", dur: 7.4, c: PAL.teal },
  { type: "star", size: 58, right: "3%", top: "39%", anim: "bob", dur: 6.8, delay: -2, c: PAL.pink },
  { type: "tile", glyph: "★", size: 50, right: "13%", top: "44%", anim: "tA", dur: 6.6, delay: -1, c: PAL.amber },
  // dashboard
  { type: "star", size: 80, left: "-1%", top: "52%", anim: "spinB", dur: 19, c: PAL.violet },
  { type: "bubble", size: 54, right: "5%", top: "53%", anim: "tB", dur: 7, delay: -1.2 },
  // industries
  { type: "icon", glyph: "🚗", size: 70, left: "2%", top: "62%", anim: "tA", dur: 7.3 },
  { type: "icon", glyph: "✂️", size: 56, right: "3%", top: "61%", anim: "tB", dur: 8, delay: -1 },
  { type: "icon", glyph: "💅", size: 58, left: "11%", top: "67%", anim: "tB", dur: 7.7, delay: -2 },
  { type: "icon", glyph: "💪", size: 64, right: "12%", top: "65%", anim: "tA", dur: 7, delay: -0.6 },
  { type: "icon", glyph: "🦷", size: 54, left: "4%", top: "71%", anim: "tA", dur: 7.5, delay: -1.4 },
  { type: "icon", glyph: "🏋️", size: 62, right: "2%", top: "70%", anim: "tB", dur: 8.1, delay: -2.2 },
  { type: "icon", glyph: "🧹", size: 56, left: "14%", top: "73%", anim: "tB", dur: 7.2, delay: -0.9 },
  { type: "icon", glyph: "🔨", size: 60, right: "9%", top: "74%", anim: "tA", dur: 7.8, delay: -1.7 },
  // compliance / trust
  { type: "tile", glyph: "✓", size: 76, left: "0%", top: "80%", anim: "tA", dur: 7.4, c: PAL.teal },
  { type: "star", size: 52, right: "4%", top: "81%", anim: "bob", dur: 6.4, delay: -1, c: PAL.sky },
  // pricing
  { type: "tile", glyph: "€", size: 78, left: "2%", top: "89%", anim: "tB", dur: 7.6, c: PAL.blue },
  { type: "star", size: 60, right: "3%", top: "90%", anim: "bob", dur: 6.6, delay: -1.5, c: PAL.amber },
  { type: "star", size: 44, left: "13%", top: "94%", anim: "bob", dur: 6, delay: -0.8, c: PAL.coral },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#0e0e0f",
  "grad": "Keskitaso"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  uE(() => {
    const root = document.documentElement;
    const a = ACCENTS.find((x) => x.v === t.accent) || ACCENTS[0];
    root.style.setProperty("--accent", a.v);
    root.style.setProperty("--accent-hover", a.hover);
    root.style.setProperty("--grad", String(GRAD[t.grad] != null ? GRAD[t.grad] : 0.55));
  }, [t.accent, t.grad]);

  return (
    <React.Fragment>
      <GlobalStyles />
      <Nav />
      <main>
        <Float3D items={FIELD} />
        <Hero />
        <TrustBar />
        <ProblemSection />
        <HowItWorks />
        <FeaturesSection />
        <DashboardPreview />
        <IndustriesSection />
        <ComplianceSection />
        <PricingSection />
        <FinalCTA />
        <DemoForm />
      </main>
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Brändi" />
        <TweakColor label="Korostusväri" value={t.accent} options={ACCENTS.map((a) => a.v)} onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Tunnelma" />
        <TweakRadio label="Gradientti / lasi" value={t.grad} options={Object.keys(GRAD)} onChange={(v) => setTweak("grad", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
