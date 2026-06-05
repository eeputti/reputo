// mockups.jsx — phone + dashboard visuals, shared hooks. Exports to window.
const { useState, useEffect, useRef } = React;

/* ---------- shared hooks ---------- */
// Reveal trigger. Robust against frames that start hidden (rAF/IntersectionObserver
// paused) — uses scroll position, re-checks on visibilitychange, and a safety net so
// content is never left permanently hidden.
function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      document.removeEventListener("visibilitychange", onVis);
    };
    const reveal = () => { if (done) return; done = true; setSeen(true); cleanup(); };
    function check() {
      if (done) return;
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      if (vh === 0) return; // can't measure (hidden frame) — wait for visibility
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) reveal();
    }
    function onVis() { if (!document.hidden) check(); }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    document.addEventListener("visibilitychange", onVis);
    check();
    const raf = requestAnimationFrame(check);
    const t = setTimeout(check, 300);
    const safety = setTimeout(reveal, 3000); // never leave content hidden
    return () => { cleanup(); cancelAnimationFrame(raf); clearTimeout(t); clearTimeout(safety); };
  }, []);
  return [ref, seen];
}

// scroll reveal wrapper
function Reveal({ children, delay = 0, as = "div", className = "", style = {}, ...rest }) {
  const [ref, seen] = useInView();
  const Tag = as;
  return (
    <Tag ref={ref} className={"reveal " + (seen ? "in " : "") + className}
         style={Object.assign({ transitionDelay: (seen ? delay : 0) + "ms" }, style)} {...rest}>
      {children}
    </Tag>
  );
}

// count-up number, triggers when scrolled into view
function Counter({ to, duration = 1300, decimals = 0, suffix = "", prefix = "" }) {
  const [ref, seen] = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, start;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (start == null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setVal(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // fallback: guarantee the final value even if rAF never ticks (e.g. hidden frame)
    const done = setTimeout(() => setVal(to), duration + 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(done); };
  }, [seen, to, duration]);
  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("fi-FI");
  return <span ref={ref} className="tnum">{prefix}{shown}{suffix}</span>;
}

/* ---------- brand wordmark ---------- */
function Logo({ light = false }) {
  return (
    <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span style={{
        width: 26, height: 26, borderRadius: 8, flex: "none",
        background: light ? "#fff" : "var(--accent)", color: light ? "var(--ink)" : "var(--accent-ink)",
        display: "grid", placeItems: "center", fontWeight: 800, fontSize: 15, letterSpacing: "-0.04em"
      }}>R</span>
      <span style={{ fontWeight: 700, fontSize: "1.06rem", letterSpacing: "-0.03em", color: light ? "#fff" : "var(--ink)" }}>
        Reputo
      </span>
    </a>
  );
}

/* ---------- star rating ---------- */
function Stars({ value = 5, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "var(--green)", fontSize: size, lineHeight: 1 }}>
      {[0,1,2,3,4].map(i => (
        <span key={i} style={{ opacity: i < Math.round(value) ? 1 : 0.22 }}>★</span>
      ))}
    </span>
  );
}

/* ---------- phone mockup ---------- */
function PhoneMockup() {
  const [delivered, setDelivered] = useState(false);
  const [ref, seen] = useInView({ threshold: 0.4 });
  useEffect(() => { if (seen) { const t = setTimeout(() => setDelivered(true), 900); return () => clearTimeout(t); } }, [seen]);
  return (
    <div ref={ref} style={{
      width: 268, background: "#0e0e0f", borderRadius: 42, padding: 10,
      boxShadow: "var(--shadow-lg)", flex: "none"
    }}>
      <div style={{ background: "#fff", borderRadius: 34, overflow: "hidden", position: "relative" }}>
        {/* status bar */}
        <div style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 0 24px", fontSize: 12, fontWeight: 600 }}>
          <span className="tnum">9.41</span>
          <div style={{ width: 90, height: 19, background: "#0e0e0f", borderRadius: 999, position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)" }} />
          <span style={{ display: "inline-flex", gap: 4, alignItems: "center", fontSize: 11 }}>
            <span style={{ fontVariant: "small-caps" }}>5G</span>
            <span style={{ width: 22, height: 11, border: "1.4px solid #0e0e0f", borderRadius: 3, position: "relative", display: "inline-block" }}>
              <span style={{ position: "absolute", inset: 1.5, right: 6, background: "#0e0e0f", borderRadius: 1 }} />
            </span>
          </span>
        </div>
        {/* convo header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderBottom: "1px solid var(--line)" }}>
          <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#0e0e0f", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14, flex: "none" }}>AE</span>
          <div style={{ lineHeight: 1.25, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap" }}>Autokorjaamo Esimerkki</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>tekstiviesti</div>
          </div>
        </div>
        {/* messages */}
        <div style={{ padding: "18px 16px 22px", minHeight: 360, display: "flex", flexDirection: "column", gap: 8, background: "linear-gradient(180deg,#fbfbfa,#fff)" }}>
          <div style={{ textAlign: "center", fontSize: 10.5, color: "var(--ink-faint)", margin: "0 0 4px", fontWeight: 600 }}>Tänään 10.02</div>
          <div style={{
            alignSelf: "flex-start", maxWidth: "80%", background: "#efeff1", color: "var(--ink)",
            padding: "12px 14px", borderRadius: "18px 18px 18px 5px", fontSize: 13.3, lineHeight: 1.45,
            opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(8px)", transition: "all .5s cubic-bezier(.2,.8,.2,1)"
          }}>
            Hei! Kiitos käynnistä Autokorjaamo Esimerkissä. Arvostelusi auttaa meitä paljon. Voit jättää rehellisen Google-arvostelun tästä:
            <a href="#" onClick={(e)=>e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 9, padding: "7px 11px", background: "#fff", border: "1px solid var(--line-strong)", borderRadius: 10, fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
              g.page/autokorjaamo-esimerkki
            </a>
            <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--ink-soft)" }}>Vastaa STOP, jos et halua viestejä.</div>
          </div>
          <div style={{ alignSelf: "flex-start", fontSize: 10.5, color: "var(--ink-faint)", paddingLeft: 6, fontWeight: 600,
            opacity: delivered ? 1 : 0, transition: "opacity .4s" }}>
            Toimitettu ✓
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- hero dashboard card ---------- */
function HeroDashCard() {
  const [channel, setChannel] = useState("sms");
  const [num, setNum] = useState("040 123 4567");
  const [mail, setMail] = useState("asiakas@esimerkki.fi");
  const [scheduled, setScheduled] = useState(false);
  const isSms = channel === "sms";
  const stats = [
    { k: "Lähetetty", to: 84, dec: 0 },
    { k: "Klikattu", to: 38, dec: 0 },
    { k: "Keskiarvo", to: 4.7, dec: 1, star: true },
    { k: "Uutta arvostelua", to: 12, dec: 0 },
  ];
  const tab = (active) => ({
    flex: 1, padding: "7px 10px", borderRadius: 9, border: "none", fontSize: 12.5, fontWeight: 600,
    cursor: "pointer", letterSpacing: "-0.01em", transition: "all .18s",
    background: active ? "var(--surface)" : "transparent", color: active ? "var(--ink)" : "var(--ink-faint)",
    boxShadow: active ? "var(--shadow-sm)" : "none"
  });
  return (
    <div className="card" style={{ width: "100%", maxWidth: 338, padding: 20, borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-lg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <span style={{ fontWeight: 700, fontSize: "1.02rem", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Lisää asiakas</span>
        <span style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Autokorjaamo Esimerkki</span>
      </div>
      <div style={{ display: "flex", gap: 3, padding: 3, marginBottom: 12, background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 12 }}>
        <button style={tab(isSms)} onClick={()=>{setChannel("sms"); setScheduled(false);}}>Tekstiviesti</button>
        <button style={tab(!isSms)} onClick={()=>{setChannel("email"); setScheduled(false);}}>Sähköposti</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {isSms ? (
          <input value={num} onChange={(e)=>setNum(e.target.value)} inputMode="tel"
            className="mono"
            style={{ flex: 1, minWidth: 0, border: "1px solid var(--line-strong)", borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "var(--ink)", background: "var(--surface-2)" }} />
        ) : (
          <input value={mail} onChange={(e)=>setMail(e.target.value)} inputMode="email"
            className="mono"
            style={{ flex: 1, minWidth: 0, border: "1px solid var(--line-strong)", borderRadius: 12, padding: "12px 14px", fontSize: 13.5, color: "var(--ink)", background: "var(--surface-2)" }} />
        )}
        <button className="btn btn-primary" style={{ padding: "12px 18px", borderRadius: 12 }}
          onClick={()=>{ setScheduled(true); }}>Lähetä</button>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 9, padding: "11px 14px", borderRadius: 12,
        background: "var(--green-tint)", color: "var(--green-deep)", fontSize: 13, fontWeight: 600, marginBottom: 18,
        opacity: scheduled ? 1 : 0.92, transition: "all .3s"
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 0 4px color-mix(in oklab, var(--green) 22%, transparent)" }} />
        {scheduled ? (isSms ? "Tekstiviesti ajastettu — huomenna klo 10.00" : "Sähköposti ajastettu — huomenna klo 10.00") : "Valmis ajastettavaksi"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        {stats.map((s) => (
          <div key={s.k} style={{ background: "var(--surface)", padding: "16px 16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, fontSize: "1.7rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
              <Counter to={s.to} decimals={s.dec} />
              {s.star && <span style={{ color: "var(--green)", fontSize: "1rem" }}>★</span>}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600, marginTop: 2 }}>{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- decorative floating 3D field ---------- */
function Float3D({ items = [] }) {
  const pos = (it) => {
    const s = {};
    ["left","right","top","bottom"].forEach((k) => { if (it[k] != null) s[k] = it[k]; });
    s["--s"] = (it.size || 70) + "px";
    s["--d"] = (it.dur || 7) + "s";
    s.animationDelay = (it.delay || 0) + "s";
    if (it.c) { s["--c1"] = it.c[0]; s["--c2"] = it.c[1]; s["--c3"] = it.c[2]; s["--cs"] = it.cs || it.c[2]; }
    if (it.o != null) s["--o"] = it.o;
    return s;
  };
  return (
    <div className="starfield" aria-hidden="true">
      {items.map((it, i) => {
        if (it.type === "star")
          return <div key={i} className={"star3d " + (it.anim || "bob") + (it.neutral ? " neutral" : "")} style={pos(it)} />;
        if (it.type === "bubble")
          return <div key={i} className={"bubble3d " + (it.anim || "tA")} style={pos(it)}><span><i></i><i></i><i></i></span></div>;
        if (it.type === "icon")
          return <div key={i} className={"tile3d ico " + (it.anim || "tA")} style={pos(it)}><span>{it.glyph}</span></div>;
        return <div key={i} className={"tile3d " + (it.anim || "tA") + (it.c ? " solid" : (it.green ? " green" : ""))} style={pos(it)}><span>{it.glyph}</span></div>;
      })}
    </div>
  );
}

Object.assign(window, { useInView, Reveal, Counter, Logo, Stars, PhoneMockup, HeroDashCard, Float3D });
