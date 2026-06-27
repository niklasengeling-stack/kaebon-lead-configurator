import type { Configuration } from '@/types/configurator'
import { boatModel } from '@/data/boatModel'
import { extraOptions as staticExtraOptions } from '@/data/extraOptions'
import { polsterOptions as staticPolsterOptions } from '@/data/polsterOptions'
import { polsterFarbeOptions as staticPolsterFarbeOptions } from '@/data/polsterFarbeOptions'
import { motorOptions as staticMotorOptions } from '@/data/motorOptions'
import { colorOptions as staticColorOptions } from '@/data/colorOptions'
import type { fetchAllOptions } from '@/lib/fetchOptions'
import BoatPreview from './BoatPreview'

type Options = Awaited<ReturnType<typeof fetchAllOptions>>

interface SummaryStepProps {
  configuration: Configuration
  options?: Options
}

function SummaryRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex items-start justify-between py-[18px] border-t border-black/[0.07]">
      <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-400 pt-px shrink-0">
        {label}
      </p>
      <div className="text-right ml-6">
        {values.map((v) => (
          <p key={v} className="text-[13px] tracking-[0.04em] text-black leading-relaxed">
            {v}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function SummaryStep({ configuration, options }: SummaryStepProps) {
  const motors       = options?.motors        ?? staticMotorOptions
  const colors       = options?.colors        ?? staticColorOptions
  const extras       = options?.extras        ?? staticExtraOptions
  const polster      = options?.polster       ?? staticPolsterOptions
  const polsterFarben = options?.polsterFarben ?? staticPolsterFarbeOptions

  const motorLabel  = motors.find((m) => m.id === configuration.motor)?.label ?? '—'
  const colorLabel  = colors.find((c) => c.id === configuration.color)?.label ?? '—'

  const extraLabels = configuration.extras
    .map((id) => extras.find((e) => e.id === id)?.label)
    .filter(Boolean) as string[]

  const polsterLabels = configuration.polster
    .map((id) => polster.find((p) => p.id === id)?.label)
    .filter(Boolean) as string[]

  const polsterFarbeLabel = configuration.polsterFarbe
    ? (polsterFarben.find((f) => f.id === configuration.polsterFarbe)?.label ?? '—')
    : '—'

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Header */}
      <div className="h-[88px] shrink-0 flex flex-col items-center justify-center gap-1.5 border-b border-black/[0.06]">
        <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-400">
          Zusammenfassung
        </p>
        <p className="text-[16px] font-medium tracking-[0.06em] text-black">
          {boatModel.shortName}
        </p>
      </div>

      {/* Boat preview */}
      <BoatPreview
        motor={configuration.motor}
        color={configuration.color}
        extras={configuration.extras}
        size="small"
        className="shrink-0 h-40 sm:h-48"
      />

      {/* Spec rows */}
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
        <div className="w-full max-w-sm mx-auto px-5 pb-4">
          <SummaryRow label="Motorisierung" values={[motorLabel]} />
          <SummaryRow label="Farbton"       values={[colorLabel]} />
          <SummaryRow label="Extras"        values={extraLabels.length > 0 ? extraLabels : ['Keine']} />
          <SummaryRow label="Polster"       values={polsterLabels.length > 0 ? polsterLabels : ['Keine']} />
          {configuration.polster.length > 0 && (
            <SummaryRow label="Polsterfarbe" values={[polsterFarbeLabel]} />
          )}
          <div className="border-t border-black/[0.07]" />
        </div>
      </div>
    </div>
  )
}
