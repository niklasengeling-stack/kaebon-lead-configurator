import type { MotorId } from '@/types/configurator'

export interface MotorOption {
  id: MotorId
  label: string
  image?: string
  description?: string
}

export const motorOptions: MotorOption[] = [
  {
    id: 'torqeedo-1-6',
    label: 'Torqeedo 1.6kW',
    image: '/options/motors/torqeedo-1-6.webp',
    description: 'Leise und effizient. Ideal für ruhige Seen und entspannte Ausfahrten im Nahbereich.',
  },
  {
    id: 'torqeedo-6',
    label: 'Torqeedo 6kW (4.3kW AT)',
    image: '/options/motors/torqeedo-6.webp',
    description: 'Vielseitige Leistung für längere Touren, wechselnde Bedingungen und mehr Freiheit.',
  },
  {
    id: 'torqeedo-12',
    label: 'Torqeedo 12kW',
    image: '/options/motors/torqeedo-12.webp',
    description: 'Maximale Kraft für anspruchsvolle Gewässer und ein intensives Fahrerlebnis.',
  },
]
