'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface OptionDetailSheetProps {
  label: string
  image?: string
  description?: string
  confirmLabel?: string
  onConfirm: () => void
  onClose: () => void
}

export default function OptionDetailSheet({
  label,
  image,
  description,
  confirmLabel = 'Bestätigen',
  onConfirm,
  onClose,
}: OptionDetailSheetProps) {
  const [visible, setVisible] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const handleConfirm = () => {
    setVisible(false)
    setTimeout(onConfirm, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center md:px-5">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
        onClick={handleClose}
      />

      {/* Sheet — bottom sheet on mobile, centered card on desktop */}
      <div
        className="relative bg-white w-full md:max-w-xs rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          maxHeight: '88dvh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(100%) scale(1)',
          transition: 'opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Drag handle (mobile only) */}
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-black/10" />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          {/* Image — constrained height on small screens */}
          {image && !imgError && (
            <div className="relative w-full bg-white" style={{ aspectRatio: '1 / 1', maxHeight: '45dvh' }}>
              <Image
                src={image}
                alt={label}
                fill
                className="object-contain p-8"
                unoptimized
                onError={() => setImgError(true)}
              />
            </div>
          )}

          {/* Text content */}
          <div className="px-6 pt-4 pb-2">
            <p className="text-[9px] tracking-[0.5em] uppercase text-neutral-400 mb-1">
              Ausstattung
            </p>
            <p className="text-[15px] font-medium tracking-[0.04em] text-black leading-snug">
              {label}
            </p>
            {description && (
              <p className="text-[12px] text-neutral-500 leading-relaxed mt-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Confirm button — always visible, safe area aware */}
        <div
          className="shrink-0 px-6 pt-3"
          style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
        >
          <button
            onClick={handleConfirm}
            className="w-full h-[52px] rounded-full bg-black text-white text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
