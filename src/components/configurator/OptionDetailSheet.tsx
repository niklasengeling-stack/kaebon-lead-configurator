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
    setTimeout(onClose, 260)
  }

  const handleConfirm = () => {
    setVisible(false)
    setTimeout(onConfirm, 260)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.25)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 260ms ease',
        }}
        onClick={handleClose}
      />

      {/* Card */}
      <div
        className="relative bg-white rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.97)',
          transition: 'opacity 260ms cubic-bezier(0.22,1,0.36,1), transform 260ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Square image — 1:1 ratio, white background */}
        {image && !imgError && (
          <div className="relative w-full aspect-square bg-white">
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

        {/* Content */}
        <div className="px-5 pt-4 pb-3">
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

        {/* Confirm */}
        <div className="px-5 pb-5 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full h-[48px] rounded-full bg-black text-white text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
