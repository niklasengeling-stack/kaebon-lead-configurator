import type { Configuration } from '@/types/configurator'
import { motorOptions } from '@/data/motorOptions'
import { colorOptions } from '@/data/colorOptions'
import { extraOptions } from '@/data/extraOptions'
import { polsterOptions } from '@/data/polsterOptions'
import { polsterFarbeOptions } from '@/data/polsterFarbeOptions'

export function getMotorLabel(motorId: string | null): string {
  if (!motorId) return '—'
  return motorOptions.find((m) => m.id === motorId)?.label ?? motorId
}

export function getColorLabel(colorId: string | null): string {
  if (!colorId) return '—'
  return colorOptions.find((c) => c.id === colorId)?.label ?? colorId
}

export function getExtrasLabel(extraIds: string[]): string {
  if (extraIds.length === 0) return 'Keine'
  return extraIds
    .map((id) => extraOptions.find((e) => e.id === id)?.label ?? id)
    .join(', ')
}

export function getPolsterLabel(ids: string[]): string {
  if (ids.length === 0) return 'Keine'
  return ids
    .map((id) => polsterOptions.find((p) => p.id === id)?.label ?? id)
    .join(', ')
}

export function getPolsterFarbeLabel(id: string | null): string {
  if (!id) return '—'
  return polsterFarbeOptions.find((f) => f.id === id)?.label ?? id
}

export function formatConfiguration(config: Configuration) {
  return {
    motorisierung: getMotorLabel(config.motor),
    farbton: getColorLabel(config.color),
    extras: getExtrasLabel(config.extras),
    polster: getPolsterLabel(config.polster),
    polsterFarbe: getPolsterFarbeLabel(config.polsterFarbe),
  }
}
