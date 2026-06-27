import type { ColorId, ExtraId, MotorId } from '@/types/configurator'

const DEFAULT_COLOR: ColorId = 'carbon'
const DEFAULT_MOTOR: MotorId = 'torqeedo-6'

export function getBoatImagePath(
  color: ColorId | null,
  motor: MotorId | null,
  extras: ExtraId[] = []
): string {
  const c = color ?? DEFAULT_COLOR
  const m = motor ?? DEFAULT_MOTOR

  const hasTargabuegel = extras.includes('targabuegel')
  const hasSonnensegel = extras.includes('sonnensegel')

  let suffix = ''
  if (hasTargabuegel && hasSonnensegel) {
    suffix = '-sonne-targa'
  } else if (hasTargabuegel) {
    suffix = '-targa'
  }

  return `/boats/eb-eins-classic/${c}-${m}${suffix}.webp`
}
