'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { ColorId, ExtraId, MotorId } from '@/types/configurator'
import { getBoatImagePath } from '@/lib/boatImage'
import { cn } from '@/lib/utils'

const DURATION = 600

interface BoatPreviewProps {
  motor: MotorId | null
  color: ColorId | null
  extras: ExtraId[]
  size?: 'normal' | 'small'
  className?: string
}

export default function BoatPreview({
  motor,
  color,
  extras,
  size = 'normal',
  className,
}: BoatPreviewProps) {
  const targetSrc = getBoatImagePath(color, motor, extras)

  // fromSrc: the image animating OUT, toSrc: the image animating IN (or settled)
  const [toSrc, setToSrc] = useState(targetSrc)
  const [fromSrc, setFromSrc] = useState<string | null>(null)
  const [transKey, setTransKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (targetSrc === toSrc) return

    // Cancel any in-progress transition cleanup
    if (timerRef.current) clearTimeout(timerRef.current)

    // Synchronous state updates intentional: fade-out starts immediately, new image mounts in same paint
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFromSrc(toSrc); setToSrc(targetSrc); setTransKey((k) => k + 1)

    timerRef.current = setTimeout(() => {
      setFromSrc(null)
    }, DURATION + 60)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [targetSrc, toSrc])

  return (
    <div
      className={cn(
        'relative w-full',
        size === 'small' && 'h-36 sm:h-44 md:h-52',
        className
      )}
    >
      <div className="absolute inset-0">
        {/* Outgoing image — blurs and fades out */}
        {fromSrc && (
          <div
            key={`from-${fromSrc}-${transKey}`}
            className="absolute inset-0"
            style={{
              animation: `boat-fade-out ${DURATION}ms cubic-bezier(0.4,0,0.2,1) forwards`,
            }}
          >
            <Image
              src={fromSrc}
              alt="Kaebon Elektroboot"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        )}

        {/* Incoming image — unblurs and fades in */}
        <div
          key={`to-${toSrc}-${transKey}`}
          className="absolute inset-0"
          style={{
            animation:
              transKey > 0
                ? `boat-fade-in ${DURATION}ms cubic-bezier(0.22,1,0.36,1) both`
                : 'none',
          }}
        >
          <Image
            src={toSrc}
            alt="Kaebon Elektroboot"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}
