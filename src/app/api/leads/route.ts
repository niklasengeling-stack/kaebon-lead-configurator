import { z } from 'zod'
import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/leadSchema'
import type { LeadPayload } from '@/types/configurator'
import { generateLeadId } from '@/lib/leadId'
import { buildSalesEmailHtml, buildSalesEmailText } from '@/lib/emailTemplates'

const configurationSchema = z.object({
  motor: z.string().min(1, 'Motor required'),
  color: z.string().min(1, 'Color required'),
  extras: z.array(z.string()).default([]),
  polster: z.array(z.string()).default([]),
  polsterFarbe: z.string().nullable().default(null),
})

const requestSchema = z.object({
  configuration: configurationSchema,
  contact: contactSchema,
})

async function sendEmail(lead: LeadPayload): Promise<void> {
  const apiKey = process.env.EMAIL_API_KEY
  const to = process.env.LEAD_EMAIL_TO
  const from = process.env.LEAD_EMAIL_FROM

  if (!apiKey || !to || !from) {
    console.warn(
      '[Lead] Email env vars missing (EMAIL_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM). ' +
        'Logging lead data instead:'
    )
    console.log(JSON.stringify(lead, null, 2))
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Konfigurationsanfrage ${lead.id} — ${lead.contact.vorname} ${lead.contact.nachname}`,
      html: buildSalesEmailHtml(lead),
      text: buildSalesEmailText(lead),
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('[Lead] Email delivery failed:', error)
    throw new Error('Email delivery failed')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = requestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { configuration, contact } = parsed.data

    const lead: LeadPayload = {
      id: generateLeadId(),
      configuration: {
        motor: configuration.motor as LeadPayload['configuration']['motor'],
        color: configuration.color as LeadPayload['configuration']['color'],
        extras: configuration.extras as LeadPayload['configuration']['extras'],
        polster: configuration.polster as LeadPayload['configuration']['polster'],
        polsterFarbe: configuration.polsterFarbe as LeadPayload['configuration']['polsterFarbe'],
      },
      contact,
      submittedAt: new Date().toISOString(),
    }

    await sendEmail(lead)

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (err) {
    console.error('[Lead] Unhandled error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
