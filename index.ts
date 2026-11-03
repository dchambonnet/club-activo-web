// OPCIONAL — Avisa por correo a info@activo20-30.org cuando llega un contacto o un voluntario nuevo.
// ⚠️ Sin probar contra tu proyecto: requiere una cuenta de Resend con el dominio activo20-30.org verificado.
//
// Despliegue (ver GUIA.md, paso 8):
//   supabase functions deploy notificar --no-verify-jwt
//   supabase secrets set RESEND_API_KEY=re_xxx WEBHOOK_SECRET=una-clave-larga-y-secreta
// Luego crea dos Database Webhooks (INSERT en "contactos" y en "voluntarios") que llamen a esta función
// con el header:  x-webhook-secret: <WEBHOOK_SECRET>

const TO = "info@activo20-30.org";
const FROM = "Sitio web 20-30 <web@activo20-30.org>"; // debe ser un remitente de tu dominio verificado en Resend

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

Deno.serve(async (req) => {
  if (req.headers.get("x-webhook-secret") !== Deno.env.get("WEBHOOK_SECRET")) {
    return new Response("No autorizado", { status: 401 });
  }
  const { table, record } = await req.json();
  if (!record) return new Response("Sin datos", { status: 400 });

  const esContacto = table === "contactos";
  const subject = esContacto
    ? `[Web] ${record.asunto} — ${record.nombre}`
    : `[Web] Nuevo voluntario: ${record.nombre}`;

  const filas = Object.entries(record)
    .filter(([k]) => !["id", "consentimiento", "estado"].includes(k))
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join("");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: record.correo,
      subject,
      html: `<table cellpadding="6" style="font-family:sans-serif">${filas}</table>`,
    }),
  });
  return new Response(await r.text(), { status: r.ok ? 200 : 502 });
});
