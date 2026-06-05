export type DashboardRow = {
  id: string;
  customerName: string;
  customerPhone: string;
  status: string;
  sentAt: string;
  clicked: string;
};

type DashboardSourceRow = {
  id: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  sent_at: string | null;
  clicked_at: string | null;
  review_left_at: string | null;
};

function formatRelativeDate(value: string | null) {
  if (!value) {
    return "Ei vielä";
  }

  const target = new Date(value);
  const today = new Date();
  const diffMs = today.getTime() - target.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) {
    return "Tänään";
  }

  if (diffDays === 1) {
    return "Eilen";
  }

  return `${diffDays} päivää sitten`;
}

function formatStatus(row: DashboardSourceRow) {
  if (row.review_left_at) {
    return "Arvostelu jätetty";
  }

  if (row.clicked_at) {
    return "Klikattu";
  }

  if (row.status === "clicked") {
    return "Klikattu";
  }

  if (row.status === "review_left") {
    return "Arvostelu jätetty";
  }

  return "Lähetetty";
}

export function formatDashboardRow(row: DashboardSourceRow): DashboardRow {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    status: formatStatus(row),
    sentAt: formatRelativeDate(row.sent_at),
    clicked: row.clicked_at ? "Kyllä" : "Ei vielä",
  };
}

export const dashboardFallbackRows: DashboardRow[] = [
  {
    id: "fallback-1",
    customerName: "Matti Virtanen",
    customerPhone: "+358 40 123 4567",
    status: "Lähetetty",
    sentAt: "Tänään",
    clicked: "Ei vielä",
  },
  {
    id: "fallback-2",
    customerName: "Laura Nieminen",
    customerPhone: "+358 45 555 1234",
    status: "Klikattu",
    sentAt: "Eilen",
    clicked: "Kyllä",
  },
  {
    id: "fallback-3",
    customerName: "Teemu Korhonen",
    customerPhone: "+358 50 777 8888",
    status: "Arvostelu jätetty",
    sentAt: "2 päivää sitten",
    clicked: "Kyllä",
  },
];

