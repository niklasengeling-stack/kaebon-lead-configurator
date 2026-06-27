import type { Configuration } from '@/types/configurator'
import { motorOptions } from '@/data/motorOptions'
import { colorOptions } from '@/data/colorOptions'
import { extraOptions } from '@/data/extraOptions'

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

export function formatConfiguration(config: Configuration) {
  return {
    motorisierung: getMotorLabel(config.motor),
    farbton: getColorLabel(config.color),
    extras: getExtrasLabel(config.extras),
  }
}
