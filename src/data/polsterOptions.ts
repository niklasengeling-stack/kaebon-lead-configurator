import type { PolsterId } from '@/types/configurator'

export interface PolsterOption {
  id: PolsterId
  label: string
}

export const polsterOptions: PolsterOption[] = [
  { id: 'cockpitpolster',       label: 'Cockpitpolster' },
  { id: 'soziuspolster',        label: 'Soziuspolster' },
  { id: 'sonnenliegepolster',   label: 'Sonnenliegepolster' },
  { id: 'bordwandpolster',      label: 'Bordwand-Polster' },
]
