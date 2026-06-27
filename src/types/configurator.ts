export type MotorId = 'torqeedo-1-6' | 'torqeedo-6' | 'torqeedo-12'
export type ColorId = 'carbon' | 'weiss' | 'grau' | 'orange'
export type ExtraId =
  | 'hafenplane'
  | 'fahrercockpitplane'
  | 'targabuegel'
  | 'sonnensegel'
  | 'bordelektrik'
  | 'led-navigation'
export type PolsterId =
  | 'cockpitpolster'
  | 'soziuspolster'
  | 'sonnenliegepolster'
  | 'bordwandpolster'
export type PolsterFarbeId =
  | 'diamante-mineral'
  | 'diamante-perla'
  | 'diamante-coral'
  | 'diamante-celeste'
  | 'diamante-grafito'
  | 'diamante-taupe'
  | 'diamante-pirita'

export interface Configuration {
  motor: MotorId | null
  color: ColorId | null
  extras: ExtraId[]
  polster: PolsterId[]
  polsterFarbe: PolsterFarbeId | null
}

export interface ContactData {
  titel: string
  anrede: string
  vorname: string
  nachname: string
  email: string
  telefon: string
  wohnort: string
  datenschutz: boolean
}

export interface LeadPayload {
  id: string
  configuration: Configuration
  contact: ContactData
  submittedAt: string
}
