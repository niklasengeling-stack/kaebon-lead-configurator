import type { PolsterFarbeId } from '@/types/configurator'

export interface PolsterFarbeOption {
  id: PolsterFarbeId
  label: string
  hex: string
  image?: string
}

export const polsterFarbeOptions: PolsterFarbeOption[] = [
  { id: 'diamante-mineral',  label: 'Diamante Mineral',  hex: '#7A8A8F', image: '/options/polster-farben/diamante-mineral.webp' },
  { id: 'diamante-perla',    label: 'Diamante Perla',    hex: '#E2DDD4', image: '/options/polster-farben/diamante-perla.webp' },
  { id: 'diamante-coral',    label: 'Diamante Coral',    hex: '#C96B58', image: '/options/polster-farben/diamante-coral.webp' },
  { id: 'diamante-celeste',  label: 'Diamante Celeste',  hex: '#7AAEC8', image: '/options/polster-farben/diamante-celeste.webp' },
  { id: 'diamante-grafito',  label: 'Diamante Grafito',  hex: '#3E3E3E', image: '/options/polster-farben/diamante-grafito.webp' },
  { id: 'diamante-taupe',    label: 'Diamante Taupe',    hex: '#8E7E6E', image: '/options/polster-farben/diamante-taupe.webp' },
  { id: 'diamante-pirita',   label: 'Diamante Pirita',   hex: '#B5A05E', image: '/options/polster-farben/diamante-pirita.webp' },
]
