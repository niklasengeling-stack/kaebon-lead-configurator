import type { LeadPayload } from '@/types/configurator'
import { formatConfiguration } from './configurationSummary'

export function buildSalesEmailHtml(lead: LeadPayload): string {
  const config = formatConfiguration(lead.configuration)
  const { contact } = lead
  const fullName = [contact.titel, contact.anrede, contact.vorname, contact.nachname]
    .filter(Boolean)
    .join(' ')
  const date = new Date(lead.submittedAt).toLocaleString('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Helvetica Neue,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#000;padding:32px 40px;">
            <p style="margin:0;color:#fff;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;">Kaebon Konfigurator</p>
            <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:400;letter-spacing:0.04em;">Neue Konfigurationsanfrage</h1>
          </td>
        </tr>

        <!-- Lead ID + Date -->
        <tr>
          <td style="padding:24px 40px 0;border-bottom:1px solid #eee;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:16px;">
                  <p style="margin:0;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#999;">Lead-ID</p>
                  <p style="margin:4px 0 0;font-size:18px;font-weight:600;letter-spacing:0.1em;color:#000;">${lead.id}</p>
                </td>
                <td align="right" style="padding-bottom:16px;">
                  <p style="margin:0;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#999;">Eingegangen</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#333;">${date}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Configuration -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#999;">Konfiguration · Elektroboot Eins Classic</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0;font-size:12px;color:#888;width:160px;">Motorisierung</td>
                <td style="padding:10px 0;font-size:13px;font-weight:600;color:#000;">${config.motorisierung}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0;font-size:12px;color:#888;">Farbton</td>
                <td style="padding:10px 0;font-size:13px;font-weight:600;color:#000;">${config.farbton}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0;font-size:12px;color:#888;">Extras</td>
                <td style="padding:10px 0;font-size:13px;font-weight:600;color:#000;">${config.extras}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0;font-size:12px;color:#888;">Polster</td>
                <td style="padding:10px 0;font-size:13px;font-weight:600;color:#000;">${config.polster}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:12px;color:#888;">Polsterfarbe</td>
                <td style="padding:10px 0;font-size:13px;font-weight:600;color:#000;">${config.polsterFarbe}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contact -->
        <tr>
          <td style="padding:28px 40px 0;border-top:1px solid #eee;margin-top:28px;">
            <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#999;">Kontaktdaten</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0;font-size:12px;color:#888;width:160px;">Name</td>
                <td style="padding:10px 0;font-size:13px;font-weight:600;color:#000;">${fullName}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0;font-size:12px;color:#888;">E-Mail</td>
                <td style="padding:10px 0;font-size:13px;color:#000;"><a href="mailto:${contact.email}" style="color:#000;">${contact.email}</a></td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0;font-size:12px;color:#888;">Telefon</td>
                <td style="padding:10px 0;font-size:13px;color:#000;"><a href="tel:${contact.telefon}" style="color:#000;">${contact.telefon}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:12px;color:#888;">Wohnort</td>
                <td style="padding:10px 0;font-size:13px;color:#000;">${contact.wohnort}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:32px 40px;border-top:1px solid #eee;margin-top:28px;">
            <p style="margin:0;font-size:11px;color:#bbb;line-height:1.6;">
              Diese E-Mail wurde automatisch durch den Kaebon Konfigurator generiert.<br>
              app.kaebon.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function buildSalesEmailText(lead: LeadPayload): string {
  const config = formatConfiguration(lead.configuration)
  const { contact } = lead
  const fullName = [contact.titel, contact.anrede, contact.vorname, contact.nachname]
    .filter(Boolean)
    .join(' ')
  const date = new Date(lead.submittedAt).toLocaleString('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  return `KAEBON KONFIGURATOR — Neue Konfigurationsanfrage
=======================================================

Lead-ID:     ${lead.id}
Eingegangen: ${date}

KONFIGURATION · ELEKTROBOOT EINS CLASSIC
-----------------------------------------
Motorisierung  ${config.motorisierung}
Farbton        ${config.farbton}
Extras         ${config.extras}
Polster        ${config.polster}
Polsterfarbe   ${config.polsterFarbe}

KONTAKTDATEN
-----------------------------------------
Name      ${fullName}
E-Mail    ${contact.email}
Telefon   ${contact.telefon}
Wohnort   ${contact.wohnort}

-----------------------------------------
app.kaebon.com
`
}
