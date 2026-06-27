'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder: string
  hasError?: boolean
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function FormSelect({ value, onChange, options, placeholder, hasError }: FormSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('touchstart', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('touchstart', close)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full h-[52px] pl-4 pr-10 text-[13px] bg-white text-left tracking-wide',
          'transition-colors duration-200 focus:outline-none',
          open
            ? 'border-l border-r border-t border-black/20 rounded-tl-xl rounded-tr-xl rounded-bl-none rounded-br-none'
            : hasError
              ? 'border border-red-400 rounded-xl'
              : 'border border-black/[0.12] rounded-xl',
          !value ? 'text-neutral-300' : 'text-black'
        )}
      >
        {selectedLabel ?? placeholder}
      </button>
      <ChevronDown
        className={cn(
          'absolute right-3.5 top-[18px] w-3.5 h-3.5 text-neutral-400 pointer-events-none transition-transform duration-250',
          open && 'rotate-180'
        )}
      />

      {/* Inline dropdown — no fixed positioning, avoids all scroll/keyboard issues */}
      {open && (
        <div className="absolute left-0 right-0 z-50 bg-white border-l border-r border-b border-black/20 rounded-b-xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)] divide-y divide-black/[0.06]" style={{ top: 'calc(100% - 1px)' }}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { onChange(option.value); setOpen(false) }}
              className={cn(
                'w-full py-4 px-4 text-left text-[13px] tracking-[0.03em] flex items-center justify-between transition-colors duration-150',
                value === option.value
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-neutral-50 active:bg-neutral-100'
              )}
            >
              {option.label}
              {value === option.value && (
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
