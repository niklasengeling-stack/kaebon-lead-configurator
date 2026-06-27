'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { ColorId, ExtraId, MotorId } from '@/types/configurator'
import { motorOptions as staticMotorOptions, type MotorOption } from '@/data/motorOptions'
import BoatPreview from './BoatPreview'
import OptionDetailSheet from './OptionDetailSheet'
import { cn } from '@/lib/utils'

interface MotorStepProps {
  value: MotorId | null
  onChange: (motor: MotorId) => void
  color: ColorId | null
  extras: ExtraId[]
  onDropdownChange: (open: boolean) => void
  motorOptions?: MotorOption[]
}


const CARD_W = 240

export default function MotorStep({ value, onChange, color, extras, onDropdownChange, motorOptions = staticMotorOptions }: MotorStepProps) {
  const [open, setOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<MotorOption | null>(null)
  const [sheetOption, setSheetOption] = useState<MotorOption | null>(null)
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

  // Smart card placement: left of cursor if space, else right
  const cardX = mousePos.x - CARD_W - 14 > 8
    ? mousePos.x - CARD_W - 14
    : mousePos.x + 14
  const cardY = Math.max(8, Math.min(mousePos.y - CARD_W / 2, (containerSize.h || 400) - CARD_W - 60))

  const selectedLabel = value ? motorOptions.find((m) => m.id === value)?.label : null

  const handleOptionClick = (motor: MotorOption) => {
    if (isHoverDevice.current) {
      onChange(motor.id)
      setOpen(false)
    } else {
      setSheetOption(motor)
    }
  }

  const confirmSheet = () => {
    if (sheetOption) {
      onChange(sheetOption.id)
      setSheetOption(null)
      setOpen(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-[88px] shrink-0 flex flex-col items-center justify-center gap-2.5 border-b border-black/[0.06]">
        <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-400">Motorisierung</p>
        {selectedLabel ? (
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-8 px-5 rounded-full bg-black text-white text-[11px] tracking-[0.08em] font-medium hover:opacity-70 active:scale-[0.97] transition-all duration-150"
          >
            {selectedLabel}
          </button>
        ) : (
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-70 active:scale-[0.97] transition-all duration-150"
            aria-label="Motor auswählen"
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
          <BoatPreview motor={value} color={color} extras={extras} className="flex-1" />
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

        {/* Desktop hover preview — follows cursor, hidden on touch devices */}
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
          <div className="pointer-events-auto w-full max-w-xs flex flex-col divide-y divide-black/[0.07] border border-black/[0.08] rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
            {motorOptions.map((motor) => (
              <button
                key={motor.id}
                onClick={() => handleOptionClick(motor)}
                onMouseEnter={() => setHoveredOption(motor)}
                onMouseLeave={() => setHoveredOption(null)}
                className={cn(
                  'w-full py-[18px] px-6 text-left text-[13px] tracking-[0.06em] transition-colors duration-150 flex items-center justify-between',
                  value === motor.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-neutral-50 active:bg-neutral-100'
                )}
              >
                {motor.label}
                {motor.description && (
                  <svg className="w-3 h-3 shrink-0 opacity-25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                  </svg>
                )}
              </button>
            ))}
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
