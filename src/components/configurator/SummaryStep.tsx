import type { Configuration } from '@/types/configurator'
import { boatModel } from '@/data/boatModel'
import { getColorLabel, getMotorLabel } from '@/lib/configurationSummary'
import { extraOptions } from '@/data/extraOptions'
import BoatPreview from './BoatPreview'

interface SummaryStepProps {
  configuration: Configuration
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

export default function SummaryStep({ configuration }: SummaryStepProps) {
  const selectedExtras = configuration.extras
    .map((id) => extraOptions.find((e) => e.id === id)?.label)
    .filter(Boolean) as string[]

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
          <SummaryRow
            label="Motorisierung"
            values={[getMotorLabel(configuration.motor)]}
          />
          <SummaryRow
            label="Farbton"
            values={[getColorLabel(configuration.color)]}
          />
          <SummaryRow
            label="Extras"
            values={selectedExtras.length > 0 ? selectedExtras : ['Keine']}
          />
          <div className="border-t border-black/[0.07]" />
        </div>
      </div>
    </div>
  )
}
