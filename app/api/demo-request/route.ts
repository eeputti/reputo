type DemoRequestPayload = {
  company?: string;
  contact?: string;
  email?: string;
  phone?: string;
  mapsLink?: string;
  message?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
const demoRequestRecipient = process.env.DEMO_REQUEST_TO_EMAIL || "eelispuro@gmail.com";

function sanitize(value: string | undefined) {
  return value?.trim() || "Ei annettu";
}

export async function POST(request: Request) {
  if (!resendApiKey || !resendFromEmail) {
    return Response.json(
      {
        error:
          "Sähköpostilähetys ei ole vielä käytössä. Lisää RESEND_API_KEY ja RESEND_FROM_EMAIL palvelimen ympäristömuuttujiin.",
      },
      { status: 500 },
    );
  }

  const body = (await request.json()) as DemoRequestPayload;

  if (!body.company?.trim() || !body.email?.trim() || !body.phone?.trim()) {
    return Response.json(
      {
        error: "Täytä ainakin yrityksen nimi, sähköposti ja puhelinnumero.",
      },
      { status: 400 },
    );
  }

  const subject = `Uusi demopyyntö: ${body.company.trim()}`;
  const text = [
    "Uusi demopyyntö Reputon sivustolta",
    "",
    `Yrityksen nimi: ${sanitize(body.company)}`,
    `Yhteyshenkilö: ${sanitize(body.contact)}`,
    `Sähköposti: ${sanitize(body.email)}`,
    `Puhelin: ${sanitize(body.phone)}`,
    `Google Maps / Business -linkki: ${sanitize(body.mapsLink)}`,
    "",
    "Vapaa viesti:",
    sanitize(body.message),
  ].join("\n");

  const html = `
    <h1>Uusi demopyyntö Reputon sivustolta</h1>
    <p><strong>Yrityksen nimi:</strong> ${sanitize(body.company)}</p>
    <p><strong>Yhteyshenkilö:</strong> ${sanitize(body.contact)}</p>
    <p><strong>Sähköposti:</strong> ${sanitize(body.email)}</p>
    <p><strong>Puhelin:</strong> ${sanitize(body.phone)}</p>
    <p><strong>Google Maps / Business -linkki:</strong> ${sanitize(body.mapsLink)}</p>
    <p><strong>Vapaa viesti:</strong></p>
    <p>${sanitize(body.message).replace(/\n/g, "<br />")}</p>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [demoRequestRecipient],
      reply_to: body.email.trim(),
      subject,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const resendPayload = (await resendResponse.json().catch(() => null)) as
      | { message?: string; name?: string }
      | null;

    return Response.json(
      {
        error:
          resendPayload?.message ||
          resendPayload?.name ||
          "Sähköpostin lähetys epäonnistui. Tarkista Resend-asetukset.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
