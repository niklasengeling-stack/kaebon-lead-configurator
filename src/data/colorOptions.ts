import type { ColorId } from '@/types/configurator'

export interface ColorOption {
  id: ColorId
  label: string
  hex: string
}

export const colorOptions: ColorOption[] = [
  { id: 'grau', label: 'Gelcoat Grau', hex: '#8A8F94' },
  { id: 'carbon', label: 'Carbon Schwarz', hex: '#1C1C1C' },
  { id: 'weiss', label: 'Gelcoat Signalweiß', hex: '#EBEBEB' },
  { id: 'orange', label: 'Gelcoat Orange', hex: '#D4651A' },
]
