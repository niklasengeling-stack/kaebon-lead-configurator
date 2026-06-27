'use client'

import { useEffect, useRef } from 'react'
import type { ColorId, ExtraId, MotorId } from '@/types/configurator'
import { colorOptions } from '@/data/colorOptions'
import BoatPreview from './BoatPreview'
import { cn } from '@/lib/utils'

interface ColorStepProps {
  value: ColorId | null
  onChange: (color: ColorId) => void
  motor: MotorId | null
  extras: ExtraId[]
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function ColorStep({ value, onChange, motor, extras }: ColorStepProps) {
  useEffect(() => {
    if (!value) onChange(colorOptions[0].id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onChange(colorOptions[nextIndex].id)   // swipe left → next
      } else {
        onChange(colorOptions[prevIndex].id)   // swipe right → prev
      }
    }
    touchStartX.current = null
  }

  const currentIndex = value ? colorOptions.findIndex((c) => c.id === value) : 0
  const prevIndex = (currentIndex - 1 + colorOptions.length) % colorOptions.length
  const nextIndex = (currentIndex + 1) % colorOptions.length
  const selectedColor = colorOptions[currentIndex]

  const visibleColors = [
    colorOptions[prevIndex],
    colorOptions[currentIndex],
    colorOptions[nextIndex],
  ]

  return (
    <div
      className="flex-1 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="h-[108px] shrink-0 flex flex-col items-center justify-center gap-2.5 border-b border-black/[0.06]">
        <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-400">
          Farbton
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={() => onChange(colorOptions[prevIndex].id)}
            className="text-neutral-300 hover:text-black transition-colors duration-200 active:opacity-40"
            aria-label="Vorherige Farbe"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {visibleColors.map((color, idx) => (
            <button
              key={color.id}
              onClick={() => onChange(color.id)}
              className={cn(
                'rounded-full transition-all duration-300 flex-shrink-0 border border-black/20',
                idx === 1
                  ? 'w-9 h-9 ring-1 ring-black ring-offset-[3px] shadow-sm'
                  : 'w-5 h-5 opacity-35 hover:opacity-60'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.label}
              aria-label={color.label}
            />
          ))}

          <button
            onClick={() => onChange(colorOptions[nextIndex].id)}
            className="text-neutral-300 hover:text-black transition-colors duration-200 active:opacity-40"
            aria-label="Nächste Farbe"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400">
          {selectedColor.label}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <BoatPreview motor={motor} color={value} extras={extras} className="flex-1" />
      </div>
    </div>
  )
}
