"use client";

import { useMemo, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { dashboardFallbackRows, formatDashboardRow, type DashboardRow } from "@/lib/dashboard";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isMissingRelationError } from "@/lib/supabase/errors";

type DashboardShellProps = {
  businessId: string | null;
  businessName: string;
  canPersistRequests: boolean;
  rows: DashboardRow[];
  stats: {
    sent: number;
    clicked: number;
    reviewed: number;
    average: string;
  };
  userEmail: string;
};

const initialFormState = {
  customerName: "",
  customerPhone: "",
  message: "",
};

export function DashboardShell({
  businessId,
  businessName,
  canPersistRequests,
  rows,
  stats,
  userEmail,
}: DashboardShellProps) {
  const [form, setForm] = useState(initialFormState);
  const [requestRows, setRequestRows] = useState<DashboardRow[]>(rows.length ? rows : dashboardFallbackRows);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const messagePreview = useMemo(() => {
    if (form.message.trim()) {
      return form.message.trim();
    }

    if (form.customerName.trim()) {
      return `Hei ${form.customerName.trim()}! Kiitos asioinnista. Jätäthän meille rehellisen Google-arvostelun tästä linkistä.`;
    }

    return "Hei! Kiitos asioinnista. Jätäthän meille rehellisen Google-arvostelun tästä linkistä.";
  }, [form.customerName, form.message]);

  function updateField<K extends keyof typeof initialFormState>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);
    setError(null);
    setIsPending(true);

    const optimisticRow: DashboardRow = {
      id: crypto.randomUUID(),
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      status: "Lähetetty",
      sentAt: "Tänään",
      clicked: "Ei vielä",
    };

    try {
      if (canPersistRequests && businessId) {
        const supabase = createBrowserSupabaseClient();
        const { data, error: insertError } = await supabase
          .from("review_requests")
          .insert({
            business_id: businessId,
            customer_name: form.customerName,
            customer_phone: form.customerPhone,
            message: form.message || null,
            status: "sent",
            sent_at: new Date().toISOString(),
          })
          .select("id, customer_name, customer_phone, status, sent_at, clicked_at, review_left_at")
          .single();

        if (insertError) {
          if (!isMissingRelationError(insertError)) {
            throw insertError;
          }
        } else if (data) {
          setRequestRows((current) => [formatDashboardRow(data), ...current].slice(0, 8));
          setNotice("Arvostelupyyntö tallennettiin ja lisättiin taulukkoon.");
          setForm(initialFormState);
          return;
        }
      }

      setRequestRows((current) => [optimisticRow, ...current].slice(0, 8));
      setNotice("Arvostelupyyntö lisättiin paikalliseen MVP-näkymään.");
      setForm(initialFormState);
    } catch (submitError) {
      const nextError =
        submitError instanceof Error ? submitError.message : "Pyynnön lähetys epäonnistui. Yritä uudelleen.";
      setError(nextError);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="logout-row">
            <Logo />
            <LogoutButton />
          </div>

          <div className="dashboard-sidebar-card">
            <p className="form-note">Yritys</p>
            <h3 className="h3" style={{ marginTop: "0.35rem" }}>
              {businessName}
            </h3>
            <p className="muted" style={{ marginTop: "0.55rem" }}>
              {userEmail}
            </p>
          </div>

          <div className="dashboard-sidebar-card">
            <p className="form-note">Tämän viikon fokus</p>
            <p style={{ marginTop: "0.55rem", fontWeight: 600 }}>
              Lisää 10 uutta kontaktia ja seuraa, ketkä siirtyvät Google-arvostelusivulle.
            </p>
          </div>

          <div className="dashboard-sidebar-card">
            <p className="form-note">MVP-tila</p>
            <p style={{ marginTop: "0.55rem", fontWeight: 600 }}>
              {canPersistRequests
                ? "Supabase-taulut löytyivät. Uudet pyynnöt tallennetaan tietokantaan."
                : "Tauluja ei löytynyt vielä kaikissa ympäristöissä. Uudet pyynnöt lisätään paikalliseen näkymään."}
            </p>
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-topbar">
            <div>
              <h1 className="h1">Hallintapaneeli</h1>
              <p className="dashboard-subtitle">
                Seuraa arvostelupyyntöjä ja asiakaspalautetta yhdestä paikasta.
              </p>
            </div>
          </div>

          <section className="dashboard-metrics">
            <article className="card metric-card">
              <p className="form-note">Lähetetyt pyynnöt</p>
              <strong className="metric-value">{stats.sent}</strong>
            </article>
            <article className="card metric-card">
              <p className="form-note">Klikkaukset</p>
              <strong className="metric-value">{stats.clicked}</strong>
            </article>
            <article className="card metric-card">
              <p className="form-note">Uudet arvostelut</p>
              <strong className="metric-value">{stats.reviewed}</strong>
            </article>
            <article className="card metric-card">
              <p className="form-note">Keskiarvo</p>
              <strong className="metric-value">{stats.average}</strong>
            </article>
          </section>

          <section className="dashboard-content-grid">
            <article className="card form-card">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="h3">Lähetä arvostelupyyntö</h2>
                  <p className="form-note" style={{ marginTop: "0.35rem" }}>
                    Lisää asiakkaan tiedot ja esikatsele lähetettävä viesti.
                  </p>
                </div>
              </div>

              {notice ? <div className="alert success">{notice}</div> : null}
              {error ? <div className="alert error">{error}</div> : null}

              <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <div className="field">
                  <label htmlFor="customer-name">Asiakkaan nimi</label>
                  <input
                    id="customer-name"
                    value={form.customerName}
                    onChange={(event) => updateField("customerName", event.target.value)}
                    placeholder="Matti Virtanen"
                    required
                  />
                </div>
                <div className="field" style={{ marginTop: "1rem" }}>
                  <label htmlFor="customer-phone">Puhelinnumero</label>
                  <input
                    id="customer-phone"
                    value={form.customerPhone}
                    onChange={(event) => updateField("customerPhone", event.target.value)}
                    placeholder="+358 40 123 4567"
                    required
                  />
                </div>
                <div className="field" style={{ marginTop: "1rem" }}>
                  <label htmlFor="message-preview">Viestin esikatselu</label>
                  <textarea
                    id="message-preview"
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Hei! Kiitos asioinnista. Jätäthän meille rehellisen Google-arvostelun tästä linkistä."
                  />
                </div>
                <div className="request-preview">
                  <p className="form-note">Esikatselu</p>
                  <p style={{ marginTop: "0.55rem" }}>{messagePreview}</p>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "1rem" }} disabled={isPending}>
                  {isPending ? "Lähetetään..." : "Lähetä pyyntö"}
                </button>
              </form>
            </article>

            <article className="card table-card">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="h3">Viimeisimmät pyynnöt</h2>
                  <p className="form-note" style={{ marginTop: "0.35rem" }}>
                    Viimeisimmät arvostelupyynnöt ja niiden tila.
                  </p>
                </div>
              </div>

              <div className="table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Asiakas</th>
                      <th>Puhelinnumero</th>
                      <th>Tila</th>
                      <th>Lähetetty</th>
                      <th>Klikattu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.customerName}</td>
                        <td className="mono">{row.customerPhone}</td>
                        <td>{row.status}</td>
                        <td>{row.sentAt}</td>
                        <td>{row.clicked}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

