"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type FormEvent,
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

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

type DemoFormState = {
  yritys: string;
  henkilo: string;
  email: string;
  puhelin: string;
  maps: string;
  viesti: string;
};

type DemoFieldKey = keyof DemoFormState;
type DemoErrors = Partial<Record<DemoFieldKey, string>>;

const COMPANY = {
  legal: "Roisku Media",
  form: "Yksityinen elinkeinonharjoittaja",
  ytunnus: "3413406-6",
  address: "Rauhankatu 10 C 809, 15110 Lahti",
  phone: "0503260441",
  phoneFmt: "050 326 0441",
  email: "eelispuro@gmail.com",
};

const ACCENT_PALETTE = {
  coral: ["#ffb39c", "#f9744b", "#cf3f22"] as [string, string, string],
  blue: ["#aacdff", "#4a90f0", "#2354b8"] as [string, string, string],
  amber: ["#ffe0a0", "#f5b73c", "#cc8b12"] as [string, string, string],
  violet: ["#d6c2ff", "#9162f2", "#6536c8"] as [string, string, string],
  pink: ["#ffc1e0", "#f561a8", "#c8327a"] as [string, string, string],
  teal: ["#a7f0d8", "#16b886", "#0c7d5b"] as [string, string, string],
  sky: ["#b4ecff", "#3ec0ec", "#1487b0"] as [string, string, string],
};

const FIELD: FloatItem[] = [
  { type: "star", size: 64, left: "3%", top: "3%", anim: "bob", dur: 6.4, c: ACCENT_PALETTE.amber },
  { type: "bubble", size: 56, right: "4%", top: "5%", anim: "tA", dur: 7 },
  { type: "star", size: 44, right: "16%", top: "2%", anim: "bob", dur: 6, delay: -1.5, c: ACCENT_PALETTE.pink },
  { type: "star", size: 92, left: "-1%", top: "13%", anim: "spinA", dur: 18, c: ACCENT_PALETTE.coral },
  { type: "star", size: 50, right: "5%", top: "12%", anim: "bob", dur: 6.6, delay: -1, c: ACCENT_PALETTE.violet },
  { type: "star", size: 70, right: "2%", top: "19%", anim: "spinB", dur: 20, c: ACCENT_PALETTE.sky },
  { type: "bubble", size: 84, left: "2%", top: "27%", anim: "tA", dur: 7.2, delay: -0.5 },
  { type: "tile", glyph: "@", size: 66, right: "4%", top: "26%", anim: "tB", dur: 8, delay: -1.6, c: ACCENT_PALETTE.blue },
  { type: "star", size: 46, left: "12%", top: "32%", anim: "bob", dur: 6.2, c: ACCENT_PALETTE.amber },
  { type: "tile", glyph: "✓", size: 72, left: "1%", top: "40%", anim: "tB", dur: 7.4, c: ACCENT_PALETTE.teal },
  { type: "star", size: 58, right: "3%", top: "39%", anim: "bob", dur: 6.8, delay: -2, c: ACCENT_PALETTE.pink },
  { type: "tile", glyph: "★", size: 50, right: "13%", top: "44%", anim: "tA", dur: 6.6, delay: -1, c: ACCENT_PALETTE.amber },
  { type: "star", size: 80, left: "-1%", top: "52%", anim: "spinB", dur: 19, c: ACCENT_PALETTE.violet },
  { type: "bubble", size: 54, right: "5%", top: "53%", anim: "tB", dur: 7, delay: -1.2 },
  { type: "icon", glyph: "🚗", size: 70, left: "2%", top: "62%", anim: "tA", dur: 7.3 },
  { type: "icon", glyph: "✂️", size: 56, right: "3%", top: "61%", anim: "tB", dur: 8, delay: -1 },
  { type: "icon", glyph: "💅", size: 58, left: "11%", top: "67%", anim: "tB", dur: 7.7, delay: -2 },
  { type: "icon", glyph: "💪", size: 64, right: "12%", top: "65%", anim: "tA", dur: 7, delay: -0.6 },
  { type: "icon", glyph: "🦷", size: 54, left: "4%", top: "71%", anim: "tA", dur: 7.5, delay: -1.4 },
  { type: "icon", glyph: "🏋️", size: 62, right: "2%", top: "70%", anim: "tB", dur: 8.1, delay: -2.2 },
  { type: "icon", glyph: "🧹", size: 56, left: "14%", top: "73%", anim: "tB", dur: 7.2, delay: -0.9 },
  { type: "icon", glyph: "🔨", size: 60, right: "9%", top: "74%", anim: "tA", dur: 7.8, delay: -1.7 },
  { type: "tile", glyph: "✓", size: 76, left: "0%", top: "80%", anim: "tA", dur: 7.4, c: ACCENT_PALETTE.teal },
  { type: "star", size: 52, right: "4%", top: "81%", anim: "bob", dur: 6.4, delay: -1, c: ACCENT_PALETTE.sky },
  { type: "tile", glyph: "€", size: 78, left: "2%", top: "89%", anim: "tB", dur: 7.6, c: ACCENT_PALETTE.blue },
  { type: "star", size: 60, right: "3%", top: "90%", anim: "bob", dur: 6.6, delay: -1.5, c: ACCENT_PALETTE.amber },
  { type: "star", size: 44, left: "13%", top: "94%", anim: "bob", dur: 6, delay: -0.8, c: ACCENT_PALETTE.coral },
];

const TRUST_PILLS = [
  "Ei uutta järjestelmää",
  "Ei manuaalisia viestejä",
  "Helppo lopettaa milloin vain",
  "Rehellinen palaute",
];

const PROBLEM_CARDS = [
  {
    title: "Arvostelut jäävät pyytämättä",
    body: "Hyvä palvelukokemus unohtuu nopeasti, jos asiakkaalta ei pyydetä palautetta oikealla hetkellä.",
  },
  {
    title: "Työntekijöillä ei ole aikaa",
    body: "Kiireisessä arjessa manuaaliset viestit jäävät helposti tekemättä.",
  },
  {
    title: "Kilpailijat näyttävät luotettavammilta",
    body: "Google-arvostelut vaikuttavat siihen, kenelle uusi asiakas soittaa ensimmäisenä.",
  },
];

const STEPS = [
  {
    title: "Lisää numero tai sähköposti",
    body: "Työntekijä lisää asiakkaan puhelinnumeron tai sähköpostin nopealla lomakkeella. Nimi on vapaaehtoinen.",
  },
  {
    title: "Viesti lähtee automaattisesti",
    body: "Arvostelupyyntö lähetetään tekstiviestinä tai sähköpostina esimerkiksi seuraavana päivänä.",
  },
  {
    title: "Asiakas siirtyy Googleen",
    body: "Lyhyt linkki ohjaa suoraan yrityksen Google-arvostelusivulle.",
  },
];

const FEATURES = [
  { title: "Nopea quick add -linkki", body: "Lisää numero tai sähköposti sekunneissa puhelimesta tai tiskiltä." },
  { title: "Automaattiset SMS- ja sähköpostipyynnöt", body: "Viesti lähtee oikeaan aikaan tekstiviestinä tai sähköpostina ilman muistuttamista." },
  { title: "Yksi muistutusviesti", body: "Kohtelias muistutus niille, jotka eivät vielä vastanneet." },
  { title: "Klikkiseuranta", body: "Näet, kuka avasi linkin ja siirtyi Googleen." },
  { title: "Helppo poistua viesteistä", body: "Asiakas voi lopettaa viestit yhdellä vastauksella — vaivatonta sekä asiakkaalle että yrittäjälle." },
  { title: "Oma Google-arvostelulinkki", body: "Linkki ohjaa suoraan oikealle arvostelusivulle." },
  { title: "Kuukausiraportti", body: "Selkeä kooste lähetyksistä ja tuloksista joka kuukausi." },
  { title: "AI-vastauspohjat arvosteluihin", body: "Valmiit vastausluonnokset arvosteluihin myöhemmin." },
];

const INDUSTRIES = [
  "Autokorjaamot",
  "Kampaamot",
  "Kauneushoitolat",
  "Fysioterapeutit",
  "Hammaslääkärit",
  "Kuntosalit",
  "Siivouspalvelut",
  "Remonttipalvelut",
];

const COMPLIANCE_ITEMS = [
  "Ei arvostelujen ostamista",
  "Ei asiakkaiden filtteröintiä",
  "Ei alennuksia arvosteluja vastaan",
  "Selkeä STOP-mahdollisuus",
  "Yritys hallitsee omaa Google-linkkiään",
];

const DEMO_INITIAL_STATE: DemoFormState = {
  yritys: "",
  henkilo: "",
  email: "",
  puhelin: "",
  maps: "",
  viesti: "",
};

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
      .nav-actions { display: flex; align-items: center; gap: 12px; }
      .hero-grid { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 48px; align-items: center; }
      .hero-visual { display: flex; align-items: center; justify-content: center; position: relative; }
      .hero-visual .dash-wrap { margin-left: -70px; z-index: 3; width: 338px; flex: none; }
      .phone-shell { position: relative; z-index: 2; }
      .field { display: flex; flex-direction: column; gap: 7px; }
      .field label { font-size: 0.86rem; font-weight: 600; color: var(--ink-soft); }
      .field input, .field textarea { font-family: inherit; font-size: 1rem; color: var(--ink); background: var(--surface); border: 1px solid var(--line-strong); border-radius: 12px; padding: 13px 15px; transition: border-color .15s, box-shadow .15s; width: 100%; }
      .field input:focus, .field textarea:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px color-mix(in oklab, var(--ink) 10%, transparent); }
      .field.err input, .field.err textarea { border-color: oklch(0.58 0.18 25); }
      .field .msg { font-size: 0.8rem; color: oklch(0.55 0.18 25); font-weight: 500; }
      @media (max-width: 920px) {
        .hero-grid { grid-template-columns: 1fr; gap: 44px; }
        .hero-visual { justify-content: flex-start; align-items: flex-start; flex-wrap: nowrap; min-height: 430px; width: 100%; max-width: 500px; margin: 0; }
        .phone-shell { width: min(268px, 58vw) !important; }
        .hero-visual .dash-wrap { position: absolute; right: 0; top: 92px; bottom: auto; width: min(320px, 66vw); margin-left: 0; }
        .nav-links { display: none; }
        .nav-actions { width: 100%; justify-content: stretch; }
        .nav-actions > * { flex: 1; }
        .dash-grid { grid-template-columns: 1fr !important; }
        .dash-left { border-right: none !important; border-bottom: 1px solid var(--line); }
        .form-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 560px) {
        .hero-visual { min-height: 360px; max-width: 100%; }
        .phone-shell { width: min(228px, 62vw) !important; }
        .hero-visual .dash-wrap { width: min(248px, 72vw); right: 0; top: 108px; }
        .btn-row { flex-direction: column; align-items: stretch; }
      }
    `}</style>
  );
}

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
      document.removeEventListener("visibilitychange", onVisibilityChange);
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

    const onVisibilityChange = () => {
      if (!document.hidden) {
        check();
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    document.addEventListener("visibilitychange", onVisibilityChange);
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
  as = "div",
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "span" | "p" | "h2";
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}) {
  const [ref, seen] = useInView();
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`.trim()}
      style={{ transitionDelay: seen ? `${delay}ms` : "0ms", ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Tag>
  );
}

function Counter({
  to,
  duration = 1300,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [ref, seen] = useInView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) {
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;
    const ease = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min(1, (timestamp - startTime) / duration);
      setValue(to * ease(progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    const timeoutId = window.setTimeout(() => setValue(to), duration + 120);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [decimals, duration, seen, to]);

  const shown = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("fi-FI");

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className="tnum">
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          flex: "none",
          background: light ? "#fff" : "var(--accent)",
          color: light ? "var(--ink)" : "var(--accent-ink)",
          display: "grid",
          placeItems: "center",
          fontWeight: 800,
          fontSize: 15,
          letterSpacing: "-0.04em",
        }}
      >
        R
      </span>
      <span
        style={{
          fontWeight: 700,
          fontSize: "1.06rem",
          letterSpacing: "-0.03em",
          color: light ? "#fff" : "var(--ink)",
        }}
      >
        Reputo
      </span>
    </a>
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
        const style: CSSProperties & Record<string, string> = {
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
    <div
      ref={ref}
      className="phone-shell"
      style={{
        width: 268,
        background: "#0e0e0f",
        borderRadius: 42,
        padding: 10,
        boxShadow: "var(--shadow-lg)",
        flex: "none",
      }}
    >
      <div style={{ background: "#fff", borderRadius: 34, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px 0 24px",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span className="tnum">9.41</span>
          <div
            style={{
              width: 90,
              height: 19,
              background: "#0e0e0f",
              borderRadius: 999,
              position: "absolute",
              left: "50%",
              top: 8,
              transform: "translateX(-50%)",
            }}
          />
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center", fontSize: 11 }}>
            <span style={{ fontVariant: "small-caps" }}>5G</span>
            <span
              style={{
                width: 22,
                height: 11,
                border: "1.4px solid #0e0e0f",
                borderRadius: 3,
                position: "relative",
                display: "inline-block",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 1.5,
                  right: 6,
                  background: "#0e0e0f",
                  borderRadius: 1,
                }}
              />
            </span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#0e0e0f",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 14,
              flex: "none",
            }}
          >
            AE
          </span>
          <div style={{ lineHeight: 1.25, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap" }}>Autokorjaamo Esimerkki</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>tekstiviesti</div>
          </div>
        </div>
        <div
          style={{
            padding: "18px 16px 22px",
            minHeight: 360,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: "linear-gradient(180deg,#fbfbfa,#fff)",
          }}
        >
          <div style={{ textAlign: "center", fontSize: 10.5, color: "var(--ink-faint)", margin: "0 0 4px", fontWeight: 600 }}>
            Tänään 10.02
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "80%",
              background: "#efeff1",
              color: "var(--ink)",
              padding: "12px 14px",
              borderRadius: "18px 18px 18px 5px",
              fontSize: 13.3,
              lineHeight: 1.45,
              opacity: seen ? 1 : 0,
              transform: seen ? "none" : "translateY(8px)",
              transition: "all .5s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            Hei! Kiitos käynnistä Autokorjaamo Esimerkissä. Arvostelusi auttaa meitä paljon. Voit jättää
            rehellisen Google-arvostelun tästä:
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 9,
                padding: "7px 11px",
                background: "#fff",
                border: "1px solid var(--line-strong)",
                borderRadius: 10,
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
              g.page/autokorjaamo-esimerkki
            </a>
            <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--ink-soft)" }}>Vastaa STOP, jos et halua viestejä.</div>
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 10.5,
              color: "var(--ink-faint)",
              paddingLeft: 6,
              fontWeight: 600,
              opacity: delivered ? 1 : 0,
              transition: "opacity .4s",
            }}
          >
            Toimitettu ✓
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroDashCard() {
  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [num, setNum] = useState("040 123 4567");
  const [mail, setMail] = useState("asiakas@esimerkki.fi");
  const [scheduled, setScheduled] = useState(false);
  const isSms = channel === "sms";
  const stats = [
    { key: "Lähetetty", to: 84, decimals: 0 },
    { key: "Klikattu", to: 38, decimals: 0 },
    { key: "Keskiarvo", to: 4.7, decimals: 1, star: true },
    { key: "Uutta arvostelua", to: 12, decimals: 0 },
  ];

  const tabStyle = (active: boolean): CSSProperties => ({
    flex: 1,
    padding: "7px 10px",
    borderRadius: 9,
    border: "none",
    fontSize: 12.5,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "-0.01em",
    transition: "all .18s",
    background: active ? "var(--surface)" : "transparent",
    color: active ? "var(--ink)" : "var(--ink-faint)",
    boxShadow: active ? "var(--shadow-sm)" : "none",
  });

  return (
    <div className="card" style={{ width: "100%", maxWidth: 338, padding: 20, borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-lg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <span style={{ fontWeight: 700, fontSize: "1.02rem", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Lisää asiakas</span>
        <span style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          Autokorjaamo Esimerkki
        </span>
      </div>
      <div style={{ display: "flex", gap: 3, padding: 3, marginBottom: 12, background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 12 }}>
        <button style={tabStyle(isSms)} onClick={() => { setChannel("sms"); setScheduled(false); }} type="button">
          Tekstiviesti
        </button>
        <button style={tabStyle(!isSms)} onClick={() => { setChannel("email"); setScheduled(false); }} type="button">
          Sähköposti
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {isSms ? (
          <input
            value={num}
            onChange={(event) => setNum(event.target.value)}
            inputMode="tel"
            className="mono"
            style={{
              flex: 1,
              minWidth: 0,
              border: "1px solid var(--line-strong)",
              borderRadius: 12,
              padding: "12px 14px",
              fontSize: 14,
              color: "var(--ink)",
              background: "var(--surface-2)",
            }}
          />
        ) : (
          <input
            value={mail}
            onChange={(event) => setMail(event.target.value)}
            inputMode="email"
            className="mono"
            style={{
              flex: 1,
              minWidth: 0,
              border: "1px solid var(--line-strong)",
              borderRadius: 12,
              padding: "12px 14px",
              fontSize: 13.5,
              color: "var(--ink)",
              background: "var(--surface-2)",
            }}
          />
        )}
        <button className="btn btn-primary" style={{ padding: "12px 18px", borderRadius: 12 }} onClick={() => setScheduled(true)} type="button">
          Lähetä
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "11px 14px",
          borderRadius: 12,
          background: "var(--green-tint)",
          color: "var(--green-deep)",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 18,
          opacity: scheduled ? 1 : 0.92,
          transition: "all .3s",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 0 4px color-mix(in oklab, var(--green) 22%, transparent)" }} />
        {scheduled
          ? isSms
            ? "Tekstiviesti ajastettu — huomenna klo 10.00"
            : "Sähköposti ajastettu — huomenna klo 10.00"
          : "Valmis ajastettavaksi"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        {stats.map((stat) => (
          <div key={stat.key} style={{ background: "var(--surface)", padding: "16px 16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, fontSize: "1.7rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
              <Counter to={stat.to} decimals={stat.decimals} />
              {stat.star ? <span style={{ color: "var(--green)", fontSize: "1rem" }}>★</span> : null}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600, marginTop: 2 }}>{stat.key}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap" style={{ minHeight: 70, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", paddingTop: 10, paddingBottom: 10 }}>
        <SiteLogo />
        <nav className="nav-links" aria-label="Päänavigaatio">
          <a href="#nain-toimii">Näin se toimii</a>
          <a href="#ominaisuudet">Ominaisuudet</a>
          <a href="#hallintapaneeli">Hallintapaneeli</a>
          <a href="#hinnoittelu">Hinnoittelu</a>
        </nav>
        <div className="nav-actions">
          <Link href="/login" className="btn btn-secondary" style={{ padding: "10px 18px", fontSize: "0.95rem" }}>
            Kirjaudu sisään
          </Link>
          <a href="#demo" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "0.95rem" }}>
            Pyydä demo
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="section" id="top" style={{ paddingTop: "clamp(54px,7vw,96px)", overflow: "hidden" }}>
      <div className="wash" />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid">
          <div>
            <div className="reveal in pill" style={{ marginBottom: 24, fontSize: "0.85rem" }}>
              <span className="pill-dot" />
              Google-arvostelut automaattisesti — tekstiviestillä ja sähköpostilla
            </div>
            <h1 className="display" style={{ marginBottom: 22 }}>
              Enemmän Google&#8209;arvosteluja. Vähemmän muistettavaa.
            </h1>
            <p className="lede" style={{ maxWidth: 520, marginBottom: 34 }}>
              Lisää asiakkaan puhelinnumero tai sähköposti, ja Reputo lähettää kohteliaan
              Google-arvostelupyynnön oikeaan aikaan — tekstiviestinä tai sähköpostina.
            </p>
            <div className="btn-row" style={{ display: "flex", gap: 12, marginBottom: 30 }}>
              <a href="#demo" className="btn btn-primary" style={{ padding: "0.98rem 1.5rem", fontSize: "1rem" }}>
                Pyydä ilmainen demo
              </a>
              <a href="#nain-toimii" className="btn btn-secondary" style={{ padding: "0.98rem 1.5rem", fontSize: "1rem" }}>
                Näe miten se toimii
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--ink-soft)", fontSize: "0.95rem", fontWeight: 500 }}>
              <Stars value={5} size={15} />
              <span>4.7 ★ keskiarvo · 12 uutta arvostelua / kk</span>
            </div>
          </div>
          <div className="hero-visual">
            <PhoneMockup />
            <div className="dash-wrap">
              <HeroDashCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="section-tight">
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
        <div style={{ fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.02em" }}>Rakennettu kiireisille palveluyrittäjille.</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {TRUST_PILLS.map((pill, index) => (
            <Reveal key={pill} delay={index * 60} as="span" style={{ display: "inline-flex" }}>
              <span className={`pill float-pill fp${index + 1}`}>
                <span className="pill-dot" />
                {pill}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section" id="ongelma">
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-head" style={{ marginBottom: 54 }}>
          <Reveal as="h2" className="h2">
            Tyytyväiset asiakkaat eivät aina muista arvostella.
          </Reveal>
          <Reveal as="p" className="lede" delay={80} style={{ marginTop: 18 }}>
            Useimmat asiakkaat jättävät arvostelun vasta, kun sitä pyydetään. Reputo tekee
            pyytämisestä helppoa ilman, että työntekijöiden tarvitsee kirjautua uuteen järjestelmään
            tai lähettää viestejä käsin.
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {PROBLEM_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 90} className="card" style={{ padding: "28px 26px 30px", borderRadius: "var(--r-lg)" }}>
              <h3 className="h3" style={{ marginBottom: 10 }}>{card.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "1.02rem", lineHeight: 1.5 }}>{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="nain-toimii" style={{ overflow: "hidden" }}>
      <div className="wash" style={{ opacity: 0.8 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-head" style={{ marginBottom: 56 }}>
          <Reveal as="h2" className="h2">Yksi yhteystieto riittää.</Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 0 }}>
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 110} style={{ padding: "0 28px", borderLeft: index ? "1px solid var(--line)" : "none" }}>
              <div style={{ fontSize: "clamp(3.4rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.9, color: "var(--ink)", marginBottom: 22 }} className="tnum">
                {index + 1}
              </div>
              <h3 className="h3" style={{ marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "1.02rem", lineHeight: 1.5, maxWidth: 320 }}>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section" id="ominaisuudet">
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-head" style={{ marginBottom: 50 }}>
          <Reveal as="h2" className="h2">Kaikki oleellinen. Ei turhaa säätöä.</Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
          {FEATURES.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={(index % 4) * 70}
              style={{ background: "var(--surface)", padding: "26px 24px 28px", transitionProperty: "background", transitionDuration: ".2s" }}
              onMouseEnter={(event) => {
                (event.currentTarget as HTMLDivElement).style.background = "var(--surface-2)";
              }}
              onMouseLeave={(event) => {
                (event.currentTarget as HTMLDivElement).style.background = "var(--surface)";
              }}
            >
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 2, background: "var(--accent)", marginBottom: 18 }} />
              <h3 style={{ fontSize: "1.08rem", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 8 }}>{feature.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: "0.97rem", lineHeight: 1.5 }}>{feature.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ kind }: { kind: "sent" | "clicked" | "reminder" | "blocked" }) {
  const map = {
    sent: { text: "Lähetetty", bg: "var(--green-tint)", color: "var(--green-deep)", dot: "var(--green)" },
    clicked: { text: "Klikattu", bg: "var(--green-tint)", color: "var(--green-deep)", dot: "var(--green)" },
    reminder: { text: "Muistutus ajastettu", bg: "var(--amber-tint)", color: "oklch(0.45 0.11 70)", dot: "var(--amber)" },
    blocked: { text: "Estetty", bg: "#f0f0ee", color: "var(--ink-faint)", dot: "var(--ink-faint)" },
  } as const;

  const badge = map[kind];

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px", borderRadius: 999, background: badge.bg, color: badge.color, fontSize: 12.5, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.dot }} />
      {badge.text}
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

function DashboardPreview() {
  const rows = [
    { label: "040 *** 1234", kind: "sent" as const, channel: "SMS" },
    { label: "a***@esimerkki.fi", kind: "clicked" as const, channel: "Email" },
    { label: "044 *** 7621", kind: "reminder" as const, channel: "SMS" },
    { label: "m***@gmail.com", kind: "blocked" as const, channel: "Email" },
  ];
  const stats = [
    { key: "Lähetetyt pyynnöt", to: 84, suffix: "" },
    { key: "Klikkausprosentti", to: 45, suffix: " %" },
    { key: "Uudet arvostelut", to: 12, suffix: "" },
    { key: "Estetyt kontaktit", to: 3, suffix: "" },
  ];
  const bars = [9, 14, 11, 17, 13, 20, 16];
  const max = Math.max(...bars);

  return (
    <section className="section" id="hallintapaneeli" style={{ overflow: "hidden" }}>
      <div className="wash" />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-head" style={{ marginBottom: 44 }}>
          <Reveal as="h2" className="h2">Näe mitä tapahtuu.</Reveal>
        </div>
        <Reveal className="card" style={{ borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid var(--line)", background: "var(--surface-2)", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12 }}>
                R
              </span>
              <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Hallintapaneeli</span>
            </div>
            <span className="pill" style={{ fontSize: "0.82rem", padding: "6px 13px" }}>Toukokuu 2026</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 0 }} className="dash-grid">
            <div style={{ padding: "26px 26px", borderRight: "1px solid var(--line)" }} className="dash-left">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 26 }}>
                {stats.map((stat) => (
                  <div key={stat.key} style={{ border: "1px solid var(--line)", borderRadius: 16, padding: "16px 17px", background: "var(--surface)" }}>
                    <div style={{ fontSize: "1.85rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
                      <Counter to={stat.to} suffix={stat.suffix} />
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600, marginTop: 3 }}>{stat.key}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600, marginBottom: 12 }}>Pyynnöt / viikko</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 80 }}>
                {bars.map((bar, index) => (
                  <BarFill key={`${bar}-${index}`} height={(bar / max) * 100} delay={index * 70} last={index === bars.length - 1} />
                ))}
              </div>
            </div>
            <div style={{ padding: "26px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Viimeisimmät pyynnöt</span>
                <span style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600 }}>Reaaliaikainen</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {rows.map((row, index) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 2px", borderTop: index ? "1px solid var(--line)" : "none" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink-faint)", border: "1px solid var(--line-strong)", borderRadius: 6, padding: "2px 6px", flex: "none" }}>
                        {row.channel}
                      </span>
                      <span className="mono" style={{ fontSize: 13.5, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {row.label}
                      </span>
                    </span>
                    <StatusBadge kind={row.kind} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="section" id="toimialat">
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: 48 }}>
          <Reveal as="h2" className="h2">Yrityksille, joissa asiakas käy paikan päällä.</Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {INDUSTRIES.map((item, index) => (
            <Reveal
              key={item}
              delay={(index % 4) * 60}
              className="card"
              style={{ padding: "22px 22px", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "space-between", transitionProperty: "transform, box-shadow", transitionDuration: ".18s" }}
              onMouseEnter={(event) => {
                const target = event.currentTarget as HTMLDivElement;
                target.style.transform = "translateY(-3px)";
                target.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(event) => {
                const target = event.currentTarget as HTMLDivElement;
                target.style.transform = "none";
                target.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "1.02rem", letterSpacing: "-0.02em" }}>{item}</span>
              <span style={{ color: "var(--ink-faint)", fontSize: 18, lineHeight: 1 }}>→</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComplianceSection() {
  return (
    <section className="section" id="rehellisyys">
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
        <div>
          <Reveal as="h2" className="h2" style={{ marginBottom: 20 }}>Rehellistä palautteen pyytämistä.</Reveal>
          <Reveal as="p" className="lede" delay={80}>
            Reputo ei suodata asiakkaita eikä lupaa vain positiivisia arvosteluja. Viestit pyytävät
            rehellistä Google-arvostelua oikeilta asiakkailta.
          </Reveal>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
          {COMPLIANCE_ITEMS.map((item, index) => (
            <Reveal key={item} as="div" delay={index * 70} style={{ background: "var(--surface)", padding: "18px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--green-tint)", color: "var(--green-deep)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, flex: "none" }}>
                ✓
              </span>
              <span style={{ fontWeight: 500, fontSize: "1.02rem" }}>{item}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Aloittelija",
      price: "49",
      tag: "Pienelle yritykselle",
      feats: ["100 SMS-pyyntöä / kk", "1 toimipiste", "Quick add -linkki", "Klikkiseuranta", "1 muistutusviesti"],
      cta: "Aloita Starterilla",
      featured: false,
    },
    {
      name: "Kasvu",
      price: "99",
      tag: "Kasvavalle palveluyritykselle",
      feats: ["300 SMS-pyyntöä / kk", "Useampi käyttäjä", "Kuukausiraportti", "AI-vastauspohjat", "Prioriteettituki"],
      cta: "Valitse Growth",
      featured: true,
    },
  ];

  return (
    <section className="section" id="hinnoittelu" style={{ overflow: "hidden" }}>
      <div className="wash" />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-head" style={{ marginBottom: 50, maxWidth: 640 }}>
          <Reveal as="h2" className="h2">Selkeä hinta. Ei sitoutumista.</Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 880 }}>
          {plans.map((plan, index) => (
            <Reveal
              key={plan.name}
              delay={index * 100}
              style={{
                borderRadius: "var(--r-xl)",
                padding: "32px 30px 34px",
                background: plan.featured ? "var(--accent)" : "var(--surface)",
                color: plan.featured ? "var(--accent-ink)" : "var(--ink)",
                border: plan.featured ? "1px solid var(--accent)" : "1px solid var(--line)",
                boxShadow: plan.featured ? "var(--shadow-lg)" : "var(--shadow-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>{plan.name}</span>
                {plan.featured ? (
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 10px", borderRadius: 999, background: "rgba(255,255,255,0.14)" }}>
                    Suosituin
                  </span>
                ) : null}
              </div>
              <div style={{ fontSize: 13.5, opacity: plan.featured ? 0.75 : 1, color: plan.featured ? "inherit" : "var(--ink-faint)", fontWeight: 600, marginBottom: 20 }}>
                {plan.tag}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em" }} className="tnum">
                  {plan.price} €
                </span>
                <span style={{ opacity: 0.6, fontWeight: 600 }}>/ kk</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {plan.feats.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: "1rem" }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        flex: "none",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 10,
                        fontWeight: 800,
                        background: plan.featured ? "rgba(255,255,255,0.16)" : "var(--green-tint)",
                        color: plan.featured ? "#fff" : "var(--green-deep)",
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
              <a href="#demo" className={`btn btn-block ${plan.featured ? "" : "btn-primary"}`} style={plan.featured ? { background: "#fff", color: "var(--ink)" } : undefined}>
                {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" delay={120} style={{ marginTop: 24, fontSize: "0.95rem", color: "var(--ink-faint)", fontWeight: 500 }}>
          Ensimmäisille asiakkaille ensimmäinen kuukausi 29 €. Ei sitoutumista.
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section" style={{ overflow: "hidden" }}>
      <div className="wrap">
        <div
          style={{
            background: "var(--accent)",
            color: "var(--accent-ink)",
            borderRadius: "var(--r-xl)",
            padding: "clamp(44px,6vw,80px) clamp(28px,5vw,72px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 560,
              height: 560,
              top: "-40%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(closest-side, color-mix(in oklab, var(--green) 40%, transparent), transparent 70%)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 className="h2" style={{ maxWidth: 720, margin: "0 auto 18px" }}>
              Haluatko nähdä miltä tämä näyttäisi teidän yritykselle?
            </h2>
            <p style={{ fontSize: "1.15rem", opacity: 0.8, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.5 }}>
              Teemme sinulle nopean demon omalla yritysnimelläsi ja Google-arvostelulinkilläsi.
            </p>
            <a href="#demo" className="btn" style={{ background: "#fff", color: "var(--ink)" }}>
              Pyydä ilmainen demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoForm() {
  const [form, setForm] = useState<DemoFormState>(DEMO_INITIAL_STATE);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [sent, setSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fields: Array<{ key: DemoFieldKey; label: string; required: boolean; placeholder: string; type?: string; full?: boolean }> = [
    { key: "yritys", label: "Yrityksen nimi", required: true, placeholder: "Autokorjaamo Esimerkki" },
    { key: "henkilo", label: "Yhteyshenkilö", required: false, placeholder: "Etunimi Sukunimi" },
    { key: "email", label: "Sähköposti", required: true, placeholder: "nimi@yritys.fi", type: "email" },
    { key: "puhelin", label: "Puhelin", required: true, placeholder: "040 123 4567", type: "tel" },
    { key: "maps", label: "Google Maps / Google Business -linkki", required: false, placeholder: "https://g.page/...", full: true },
  ];

  const updateField = (key: DemoFieldKey) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const validate = () => {
    const nextErrors: DemoErrors = {};
    if (!form.yritys.trim()) nextErrors.yritys = "Pakollinen kenttä";
    if (!form.email.trim()) nextErrors.email = "Pakollinen kenttä";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Tarkista sähköpostiosoite";
    if (!form.puhelin.trim()) nextErrors.puhelin = "Pakollinen kenttä";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: form.yritys,
          contact: form.henkilo,
          email: form.email,
          phone: form.puhelin,
          mapsLink: form.maps,
          message: form.viesti,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Demopyynnön lähetys epäonnistui.");
      }

      setSent(true);
      setForm(DEMO_INITIAL_STATE);
      setErrors({});
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Demopyynnön lähetys epäonnistui. Yritä uudelleen hetken kuluttua.",
      );
    } finally {
      setIsPending(false);
    }
  };

  if (sent) {
    return (
      <div className="card" style={{ padding: "44px 32px", textAlign: "center", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green-tint)", color: "var(--green-deep)", display: "grid", placeItems: "center", fontSize: 26, fontWeight: 800, margin: "0 auto 18px" }}>
          ✓
        </div>
        <h3 className="h3" style={{ marginBottom: 10 }}>Kiitos! Pyyntö vastaanotettu.</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: "1.05rem", maxWidth: 440, margin: "0 auto 22px" }}>
          Olemme yhteydessä osoitteeseen <strong style={{ color: "var(--ink)" }}>{COMPANY.email}</strong> ja palaamme
          demopyyntöösi mahdollisimman pian.
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSent(false);
            setForm(DEMO_INITIAL_STATE);
          }}
          type="button"
        >
          Lähetä uusi pyyntö
        </button>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate style={{ padding: "clamp(26px,4vw,40px)", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-md)" }}>
      {submitError ? (
        <div style={{ marginBottom: 18, border: "1px solid rgba(217, 90, 63, 0.18)", background: "var(--red-tint)", color: "var(--red)", borderRadius: 12, padding: "12px 14px" }}>
          {submitError}
        </div>
      ) : null}
      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {fields.map((field) => (
          <div key={field.key} className={`field${errors[field.key] ? " err" : ""}`} style={field.full ? { gridColumn: "1 / -1" } : undefined}>
            <label>
              {field.label}
              {!field.required ? <span style={{ color: "var(--ink-faint)", fontWeight: 500 }}> · vapaaehtoinen</span> : null}
            </label>
            <input
              type={field.type || "text"}
              value={form[field.key]}
              onChange={updateField(field.key)}
              placeholder={field.placeholder}
              className={field.key === "puhelin" || field.key === "maps" ? "mono" : ""}
            />
            {errors[field.key] ? <span className="msg">{errors[field.key]}</span> : null}
          </div>
        ))}
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label>
            Vapaa viesti
            <span style={{ color: "var(--ink-faint)", fontWeight: 500 }}> · vapaaehtoinen</span>
          </label>
          <textarea rows={3} value={form.viesti} onChange={updateField("viesti")} placeholder="Kerro lyhyesti yrityksestäsi…" style={{ resize: "vertical" }} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 22 }} disabled={isPending}>
        {isPending ? "Lähetetään..." : "Pyydä demo"}
      </button>
      <p style={{ textAlign: "center", marginTop: 14, fontSize: "0.86rem", color: "var(--ink-faint)" }}>
        Ei sitoutumista. Emme jaa tietojasi kolmansille osapuolille.
      </p>
    </form>
  );
}

function DemoSection() {
  return (
    <section className="section" id="demo" style={{ overflow: "hidden" }}>
      <div className="wash" />
      <div className="wrap" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        <div className="section-head" style={{ marginBottom: 36, textAlign: "center", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          <Reveal as="h2" className="h2" style={{ marginBottom: 14 }}>Pyydä ilmainen demo</Reveal>
          <Reveal as="p" className="lede" delay={80}>Vastaamme yleensä saman arkipäivän aikana.</Reveal>
        </div>
        <Reveal>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}

function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const headingStyle: CSSProperties = {
    fontSize: "1.02rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    margin: "22px 0 6px",
    color: "var(--ink)",
  };

  const paragraphStyle: CSSProperties = {
    color: "var(--ink-soft)",
    fontSize: "0.96rem",
    lineHeight: 1.55,
    margin: 0,
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(14,14,15,0.5)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 20 }}>
      <div onClick={(event) => event.stopPropagation()} className="card" style={{ width: "100%", maxWidth: 640, maxHeight: "86vh", overflow: "auto", borderRadius: "var(--r-lg)", padding: "clamp(24px,4vw,40px)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Tietosuojaseloste</h2>
          <button onClick={onClose} aria-label="Sulje" style={{ border: "1px solid var(--line-strong)", background: "var(--surface)", borderRadius: "50%", width: 34, height: 34, fontSize: 16, lineHeight: 1, color: "var(--ink-soft)", flex: "none" }} type="button">
            ✕
          </button>
        </div>
        <p style={{ ...paragraphStyle, marginTop: 6 }}>
          Päivitetty 5.6.2026. Tämä seloste kuvaa, miten Reputo-palvelussa käsitellään henkilötietoja
          EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti.
        </p>

        <h3 style={headingStyle}>Rekisterinpitäjä</h3>
        <p style={paragraphStyle}>
          {COMPANY.legal} ({COMPANY.form})
          <br />
          Y-tunnus {COMPANY.ytunnus}
          <br />
          {COMPANY.address}
          <br />
          Puh. <a href={`tel:${COMPANY.phone}`} style={{ color: "var(--ink)" }}>{COMPANY.phoneFmt}</a>
        </p>

        <h3 style={headingStyle}>Mitä tietoja käsittelemme</h3>
        <p style={paragraphStyle}>
          Asiakasyrityksen lisäämät loppuasiakkaiden yhteystiedot (puhelinnumero tai sähköposti ja
          vapaaehtoinen nimi) arvostelupyyntöjen lähettämistä varten, sekä lähetys- ja klikkaustiedot
          palvelun toiminnan seuraamiseksi. Lisäksi käsittelemme asiakasyrityksen yhteyshenkilön tietoja
          sopimuksen hoitamiseksi.
        </p>

        <h3 style={headingStyle}>Käsittelyn peruste ja tarkoitus</h3>
        <p style={paragraphStyle}>
          Tietoja käsitellään sopimuksen täytäntöönpanemiseksi ja oikeutetun edun perusteella
          arvostelupyyntöjen toimittamiseksi. Emme suodata asiakkaita emmekä myy tietoja eteenpäin.
        </p>

        <h3 style={headingStyle}>Säilytysaika ja vastaanottajat</h3>
        <p style={paragraphStyle}>
          Yhteystiedot säilytetään vain niin kauan kuin pyynnön lähettäminen ja palvelun toiminta
          edellyttävät. Tietoja luovutetaan ainoastaan viestien välittämiseen käytettäville teknisille
          palveluntarjoajille (SMS- ja sähköpostioperaattorit). Loppuasiakas voi lopettaa viestit milloin
          tahansa vastaamalla STOP.
        </p>

        <h3 style={headingStyle}>Rekisteröidyn oikeudet</h3>
        <p style={paragraphStyle}>
          Sinulla on oikeus tarkastaa itseäsi koskevat tiedot, pyytää niiden oikaisua tai poistoa sekä
          vastustaa käsittelyä. Pyynnöt osoitetaan yllä oleviin yhteystietoihin.
        </p>
      </div>
    </div>
  );
}

function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const columns = [
    {
      heading: "Tuote",
      links: [
        { text: "Näin se toimii", href: "#nain-toimii" },
        { text: "Ominaisuudet", href: "#ominaisuudet" },
        { text: "Hallintapaneeli", href: "#hallintapaneeli" },
        { text: "Hinnoittelu", href: "#hinnoittelu" },
      ],
    },
    {
      heading: "Yritys",
      links: [
        { text: "Rehellisyys", href: "#rehellisyys" },
        { text: "Tietosuoja", onClick: () => setShowPrivacy(true) },
        { text: "Pyydä demo", href: "#demo" },
      ],
    },
  ];

  const linkStyle: CSSProperties = {
    color: "rgba(255,255,255,0.72)",
    fontSize: "0.96rem",
    transition: "color .15s",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    textAlign: "left",
    fontFamily: "inherit",
  };

  return (
    <footer style={{ background: "var(--ink)", color: "#fff", padding: "64px 0 40px", position: "relative", zIndex: 1 }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap", marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <SiteLogo light />
            <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 16, fontSize: "0.98rem", lineHeight: 1.5 }}>
              Google-arvostelupyynnöt automaattisesti tekstiviestillä ja sähköpostilla — kiireisille
              palveluyrityksille.
            </p>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {columns.map((column) => (
              <div key={column.heading}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
                  {column.heading}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, alignItems: "flex-start" }}>
                  {column.links.map((link) =>
                    "onClick" in link ? (
                      <button
                        key={link.text}
                        onClick={link.onClick}
                        style={linkStyle}
                        type="button"
                        onMouseEnter={(event) => {
                          event.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.color = "rgba(255,255,255,0.72)";
                        }}
                      >
                        {link.text}
                      </button>
                    ) : (
                      <a
                        key={link.text}
                        href={link.href}
                        style={linkStyle}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.color = "rgba(255,255,255,0.72)";
                        }}
                      >
                        {link.text}
                      </a>
                    ),
                  )}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
                Yhteystiedot
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: "0.96rem", color: "rgba(255,255,255,0.72)" }}>
                <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>{COMPANY.legal}</span>
                <span>{COMPANY.address}</span>
                <a
                  href={`tel:${COMPANY.phone}`}
                  style={linkStyle}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "rgba(255,255,255,0.72)";
                  }}
                >
                  {COMPANY.phoneFmt}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)" }}>
          <span>© 2026 Reputo · {COMPANY.legal} · Y-tunnus {COMPANY.ytunnus}</span>
          <span>Tehty Suomessa</span>
        </div>
      </div>
      {showPrivacy ? <PrivacyModal onClose={() => setShowPrivacy(false)} /> : null}
    </footer>
  );
}

export function LandingPage() {
  return (
    <>
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
        <DemoSection />
      </main>
      <Footer />
    </>
  );
}
