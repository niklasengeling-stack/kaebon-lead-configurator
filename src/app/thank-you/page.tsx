'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import KaebonLogo from '@/components/configurator/KaebonLogo'
import Button from '@/components/ui/Button'

function ThankYouContent() {
  const params = useSearchParams()
  const leadId = params.get('id')

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <KaebonLogo />

      <div className="flex flex-col items-center justify-center flex-1 px-8 text-center">

        {/* Lead ID badge */}
        {leadId && (
          <div
            className="mb-8 px-4 py-2 rounded-full border border-black/[0.08] bg-neutral-50"
            style={{ animation: 'fade-up 700ms cubic-bezier(0.22,1,0.36,1) 100ms both' }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400">
              {leadId}
            </p>
          </div>
        )}

        {/* Headline */}
        <div style={{ animation: 'fade-up 700ms cubic-bezier(0.22,1,0.36,1) 220ms both' }}>
          <p className="text-[10px] tracking-[0.5em] uppercase text-neutral-400 mb-4">
            Vielen Dank
          </p>
          <h1 className="text-[20px] font-light tracking-[0.06em] text-black leading-snug max-w-xs">
            Vielen Dank für Ihre<br />Kaebon Konfiguration.
          </h1>
        </div>

        {/* Body text */}
        <p
          className="mt-5 text-[12px] text-neutral-500 leading-[1.9] max-w-[320px]"
          style={{ animation: 'fade-up 700ms cubic-bezier(0.22,1,0.36,1) 340ms both' }}
        >
          Ihre persönliche Bootskonfiguration wurde erfolgreich übermittelt.
          Das Kaebon Team prüft Ihre Auswahl und meldet sich zeitnah bei Ihnen,
          um Details, Möglichkeiten und ein individuelles Angebot persönlich zu besprechen.
        </p>

        {/* CTA */}
        <div
          className="mt-10 flex flex-col items-center gap-3 w-full max-w-[260px]"
          style={{ animation: 'fade-up 700ms cubic-bezier(0.22,1,0.36,1) 460ms both' }}
        >
          <Button
            variant="primary"
            className="w-full h-[52px]"
            onClick={() => { window.location.href = '/configurator' }}
          >
            Neue Konfiguration
          </Button>
          <button
            onClick={() => window.open('https://kaebon.com', '_blank')}
            className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-black transition-colors duration-200"
          >
            kaebon.com
          </button>
        </div>

      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  )
}
