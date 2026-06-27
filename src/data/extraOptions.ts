import type { ExtraId } from '@/types/configurator'

export interface ExtraOption {
  id: ExtraId
  label: string
  requiresExtra?: ExtraId
  image?: string
  description?: string
}

export const extraOptions: ExtraOption[] = [
  {
    id: 'hafenplane',
    label: 'Hafenplane',
    image: '/options/extras/hafenplane.webp',
    description: 'Maßgeschneiderte Vollabdeckung für optimalen Schutz im Hafen — vor Witterung, UV und Schmutz.',
  },
  {
    id: 'fahrercockpitplane',
    label: 'Fahrercockpitplane',
    image: '/options/extras/fahrercockpitplane.webp',
    description: 'Gezielte Abdeckung des Cockpitbereichs. Schützt Steuerung und Sitze, lässt das Heck frei.',
  },
  {
    id: 'targabuegel',
    label: 'Targabügel',
    image: '/options/extras/targabuegel.webp',
    description: 'Hochwertiger Edelstahl-Rahmen als Basis für das Sonnensegel und weitere Aufbauten.',
  },
  {
    id: 'sonnensegel',
    label: 'Sonnensegel',
    image: '/options/extras/sonnensegel.webp',
    description: 'Eleganter Sonnenschutz, der auf dem Targabügel montiert wird. Setzt Targabügel voraus.',
    requiresExtra: 'targabuegel',
  },
  {
    id: 'bordelektrik',
    label: 'Bordelektrik mit Display',
    image: '/options/extras/bordelektrik.webp',
    description: 'Integriertes 12V-Bordnetz mit Display — für Navigation, Karten und elektrisches Zubehör.',
  },
  {
    id: 'led-navigation',
    label: 'LED Navigationsbeleuchtung',
    image: '/options/extras/led-navigation.webp',
    description: 'Zugelassene LED-Navigationslichter für sichere Fahrten bei Dunkelheit und eingeschränkter Sicht.',
  },
]
