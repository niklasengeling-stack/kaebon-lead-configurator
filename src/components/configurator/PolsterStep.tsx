'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ColorId, ExtraId, MotorId, PolsterId, PolsterFarbeId } from '@/types/configurator'
import { polsterOptions as staticPolsterOptions, type PolsterOption } from '@/data/polsterOptions'
import { polsterFarbeOptions as staticPolsterFarbeOptions, type PolsterFarbeOption } from '@/data/polsterFarbeOptions'
import BoatPreview from './BoatPreview'
import { cn } from '@/lib/utils'

interface PolsterStepProps {
  polster: PolsterId[]
  polsterFarbe: PolsterFarbeId | null
  onPolsterChange: (polster: PolsterId[]) => void
  onFarbeChange: (farbe: PolsterFarbeId) => void
  motor: MotorId | null
  color: ColorId | null
  extras: ExtraId[]
  polsterOptions?: PolsterOption[]
  polsterFarbeOptions?: PolsterFarbeOption[]
}

export default function PolsterStep({
  polster, polsterFarbe, onPolsterChange, onFarbeChange,
  motor, color, extras,
  polsterOptions = staticPolsterOptions,
  polsterFarbeOptions = staticPolsterFarbeOptions,
}: PolsterStepProps) {
  const [openPanel, setOpenPanel] = useState<'polster' | 'farbe' | null>(null)

  const togglePolster = (id: PolsterId) => {
    if (polster.includes(id)) {
      onPolsterChange(polster.filter((p) => p !== id))
    } else {
      onPolsterChange([...polster, id])
    }
  }

  const selectedFarbe = polsterFarbe
    ? polsterFarbeOptions.find((f) => f.id === polsterFarbe)
    : null

  const plusIcon = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Header — two selectors stacked */}
      <div className="h-[116px] shrink-0 flex flex-col items-center justify-center gap-2 border-b border-black/[0.06]">
        <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-400">Polsterausstattung</p>

        {/* Polster options selector */}
        {polster.length > 0 ? (
          <button
            onClick={() => setOpenPanel((v) => v === 'polster' ? null : 'polster')}
            className="h-8 px-5 rounded-full bg-black text-white text-[11px] tracking-[0.08em] font-medium hover:opacity-70 active:scale-[0.97] transition-all duration-150"
          >
            {polster.length === 1
              ? (polsterOptions.find((o) => o.id === polster[0])?.label ?? '1 Polster-Ausstattung')
              : `${polster.length} Polster-Ausstattungen`}
          </button>
        ) : (
          <button
            onClick={() => setOpenPanel((v) => v === 'polster' ? null : 'polster')}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-70 active:scale-[0.97] transition-all duration-150"
            aria-label="Polster auswählen"
          >
            {plusIcon}
          </button>
        )}

        {/* Polster color selector */}
        {selectedFarbe ? (
          <button
            onClick={() => setOpenPanel((v) => v === 'farbe' ? null : 'farbe')}
            className="h-8 pl-1 pr-4 rounded-full bg-black text-white text-[11px] tracking-[0.08em] font-medium flex items-center gap-2 hover:opacity-70 active:scale-[0.97] transition-all duration-150"
          >
            {selectedFarbe.image ? (
              <span className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/20 relative">
                <Image src={selectedFarbe.image} alt={selectedFarbe.label} fill className="object-cover" unoptimized />
              </span>
            ) : (
              <span className="w-3 h-3 rounded-full shrink-0 border border-white/30" style={{ backgroundColor: selectedFarbe.hex }} />
            )}
            {selectedFarbe.label}
          </button>
        ) : (
          <button
            onClick={() => setOpenPanel((v) => v === 'farbe' ? null : 'farbe')}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-70 active:scale-[0.97] transition-all duration-150"
            aria-label="Polsterfarbe auswählen"
          >
            {plusIcon}
          </button>
        )}
      </div>

      {/* Content zone */}
      <div className="flex-1 relative overflow-hidden">
        {/* Boat preview */}
        <div className="absolute inset-0 flex flex-col">
          <BoatPreview motor={motor} color={color} extras={extras} className="flex-1" />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            opacity: openPanel ? 1 : 0,
            pointerEvents: openPanel ? 'auto' : 'none',
            backgroundColor: 'rgba(255,255,255,0.92)',
            transition: 'opacity 420ms cubic-bezier(0.22,1,0.36,1)',
          }}
          onClick={() => setOpenPanel(null)}
        />

        {/* Polster dropdown */}
        <div
          className="absolute inset-0 flex items-start justify-center pt-10 px-5"
          style={{
            opacity: openPanel === 'polster' ? 1 : 0,
            transform: openPanel === 'polster' ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 380ms cubic-bezier(0.22,1,0.36,1), transform 380ms cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: openPanel === 'polster' ? 'auto' : 'none',
          }}
        >
          <div className="w-full max-w-xs flex flex-col divide-y divide-black/[0.07] border border-black/[0.08] rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
            {polsterOptions.map((option) => {
              const selected = polster.includes(option.id)
              return (
                <button
                  key={option.id}
                  onClick={() => togglePolster(option.id)}
                  className={cn(
                    'w-full py-[18px] px-6 text-left text-[13px] tracking-[0.06em] transition-colors duration-150 flex items-center justify-between',
                    selected
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-neutral-50 active:bg-neutral-100'
                  )}
                >
                  {option.label}
                  {selected && (
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Farbe dropdown */}
        <div
          className="absolute inset-0 flex items-start justify-center pt-10 px-5"
          style={{
            opacity: openPanel === 'farbe' ? 1 : 0,
            transform: openPanel === 'farbe' ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 380ms cubic-bezier(0.22,1,0.36,1), transform 380ms cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: openPanel === 'farbe' ? 'auto' : 'none',
          }}
        >
          <div className="w-full max-w-xs flex flex-col divide-y divide-black/[0.07] border border-black/[0.08] rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
            {polsterFarbeOptions.map((farbe) => {
              const selected = polsterFarbe === farbe.id
              return (
                <button
                  key={farbe.id}
                  onClick={() => { onFarbeChange(farbe.id); setOpenPanel(null) }}
                  className={cn(
                    'w-full py-3 px-4 text-left text-[13px] tracking-[0.06em] transition-colors duration-150 flex items-center gap-3',
                    selected
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-neutral-50 active:bg-neutral-100'
                  )}
                >
                  {farbe.image ? (
                    <span className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative border" style={{ borderColor: selected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }}>
                      <Image src={farbe.image} alt={farbe.label} fill className="object-cover" unoptimized />
                    </span>
                  ) : (
                    <span
                      className="w-10 h-10 rounded-lg shrink-0 border"
                      style={{ backgroundColor: farbe.hex, borderColor: selected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }}
                    />
                  )}
                  {farbe.label}
                  {selected && (
                    <svg className="w-3.5 h-3.5 shrink-0 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
