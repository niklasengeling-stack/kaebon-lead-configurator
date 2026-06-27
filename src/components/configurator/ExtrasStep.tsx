'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { ColorId, ExtraId, MotorId } from '@/types/configurator'
import { extraOptions as staticExtraOptions, type ExtraOption } from '@/data/extraOptions'
import BoatPreview from './BoatPreview'
import OptionDetailSheet from './OptionDetailSheet'
import { cn } from '@/lib/utils'

interface ExtrasStepProps {
  value: ExtraId[]
  onChange: (extras: ExtraId[]) => void
  motor: MotorId | null
  color: ColorId | null
  onDropdownChange: (open: boolean) => void
  extraOptions?: ExtraOption[]
}


const CARD_W = 240

export default function ExtrasStep({ value, onChange, motor, color, onDropdownChange, extraOptions = staticExtraOptions }: ExtrasStepProps) {
  const [open, setOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<ExtraOption | null>(null)
  const [sheetOption, setSheetOption] = useState<ExtraOption | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })
  const contentRef = useRef<HTMLDivElement>(null)
  const isHoverDevice = useRef(false)

  useEffect(() => {
    isHoverDevice.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }, [])

  useEffect(() => { onDropdownChange(open) }, [open, onDropdownChange])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    if (!containerSize.w) setContainerSize({ w: rect.width, h: rect.height })
  }

  const cardX = mousePos.x - CARD_W - 14 > 8
    ? mousePos.x - CARD_W - 14
    : mousePos.x + 14
  const cardY = Math.max(8, Math.min(mousePos.y - CARD_W / 2, (containerSize.h || 400) - CARD_W - 60))

  const toggleExtra = (id: ExtraId) => {
    if (value.includes(id)) {
      let updated = value.filter((e) => e !== id)
      if (id === 'targabuegel') updated = updated.filter((e) => e !== 'sonnensegel')
      onChange(updated)
    } else {
      onChange([...value, id])
    }
  }

  const isDisabled = (id: ExtraId): boolean => {
    const option = extraOptions.find((e) => e.id === id)
    if (!option?.requiresExtra) return false
    return !value.includes(option.requiresExtra)
  }

  const handleOptionClick = (extra: ExtraOption) => {
    if (isDisabled(extra.id)) return
    if (value.includes(extra.id)) {
      // Already selected: immediate deselect
      toggleExtra(extra.id)
    } else if (isHoverDevice.current) {
      // Desktop: direct select
      toggleExtra(extra.id)
    } else {
      // Mobile: open detail sheet
      setSheetOption(extra)
    }
  }

  const confirmSheet = () => {
    if (sheetOption) {
      toggleExtra(sheetOption.id)
      setSheetOption(null)
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-[88px] shrink-0 flex flex-col items-center justify-center gap-2.5 border-b border-black/[0.06]">
        <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-400">Extras</p>
        {value.length > 0 ? (
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-8 px-5 rounded-full bg-black text-white text-[11px] tracking-[0.08em] font-medium flex items-center gap-2 hover:opacity-70 active:scale-[0.97] transition-all duration-150"
          >
            <span>{value.length === 1 ? '1 Extra' : `${value.length} Extras`}</span>
          </button>
        ) : (
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-70 active:scale-[0.97] transition-all duration-150"
            aria-label="Extras auswählen"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        )}
      </div>

      {/* Content zone */}
      <div
        ref={contentRef}
        className="flex-1 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Boat preview */}
        <div className="absolute inset-0 flex flex-col">
          <BoatPreview motor={motor} color={color} extras={value} className="flex-1" />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            backgroundColor: 'rgba(255,255,255,0.92)',
            transition: 'opacity 420ms cubic-bezier(0.22,1,0.36,1)',
          }}
          onClick={() => setOpen(false)}
        />

        {/* Desktop hover preview — follows cursor */}
        <div
          className="hidden md:block absolute pointer-events-none z-10"
          style={{
            left: cardX,
            top: cardY,
            width: CARD_W,
            opacity: hoveredOption && open ? 1 : 0,
            transition: 'opacity 220ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
            {hoveredOption?.image && (
              <div className="relative w-full aspect-square bg-white">
                <Image
                  src={hoveredOption.image}
                  alt={hoveredOption.label}
                  fill
                  className="object-contain p-5"
                  unoptimized
                />
              </div>
            )}
            {hoveredOption?.description && (
              <p className="text-[11px] text-neutral-500 leading-relaxed text-center px-3 py-3">
                {hoveredOption.description}
              </p>
            )}
          </div>
        </div>

        {/* Dropdown panel */}
        <div
          className="absolute inset-0 flex items-start justify-center pt-4 px-5 pointer-events-none"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 380ms cubic-bezier(0.22,1,0.36,1), transform 380ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="pointer-events-auto w-full max-w-xs flex flex-col divide-y divide-black/[0.07] border border-black/[0.08] rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)] max-h-[70vh] overflow-y-auto">
            {extraOptions.map((extra) => {
              const disabled = isDisabled(extra.id)
              const selected = value.includes(extra.id)
              return (
                <button
                  key={extra.id}
                  onClick={() => handleOptionClick(extra)}
                  onMouseEnter={() => !disabled && setHoveredOption(extra)}
                  onMouseLeave={() => setHoveredOption(null)}
                  disabled={disabled}
                  className={cn(
                    'w-full py-[18px] px-6 text-left text-[13px] tracking-[0.06em] transition-colors duration-150 flex items-center justify-between gap-3',
                    selected
                      ? 'bg-black text-white'
                      : disabled
                        ? 'bg-white text-neutral-300 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-neutral-50 active:bg-neutral-100'
                  )}
                >
                  <span>{extra.label}</span>
                  {selected ? (
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : extra.description && !disabled ? (
                    <svg className="w-3 h-3 shrink-0 opacity-25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                    </svg>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile detail sheet */}
      {sheetOption && (
        <OptionDetailSheet
          label={sheetOption.label}
          image={sheetOption.image}
          description={sheetOption.description}
          onConfirm={confirmSheet}
          onClose={() => setSheetOption(null)}
        />
      )}
    </div>
  )
}
