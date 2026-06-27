import { z } from 'zod'

export const contactSchema = z.object({
  titel: z.string(),
  anrede: z.string().min(1, 'Bitte Anrede eingeben'),
  vorname: z.string().min(1, 'Bitte Vornamen eingeben'),
  nachname: z.string().min(1, 'Bitte Nachnamen eingeben'),
  email: z.string().email('Bitte gültige E-Mail-Adresse eingeben'),
  telefon: z.string().min(1, 'Bitte Telefonnummer eingeben'),
  wohnort: z.string().min(1, 'Bitte Wohnort eingeben'),
  datenschutz: z.boolean().refine((val) => val === true, {
    message: 'Bitte Datenschutzerklärung akzeptieren',
  }),
})

export type ContactSchema = z.infer<typeof contactSchema>
