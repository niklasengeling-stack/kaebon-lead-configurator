'use client'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { ColorId, ExtraId, MotorId, PolsterId, PolsterFarbeId } from '@/types/configurator'
import { boatModel as staticBoatModel, type BoatModel } from '@/data/boatModel'
import type { ContactSchema } from '@/lib/leadSchema'
import type { fetchAllOptions } from '@/lib/fetchOptions'

import KaebonLogo from './KaebonLogo'
import MotorStep from './MotorStep'
import ColorStep from './ColorStep'
import ExtrasStep from './ExtrasStep'
import PolsterStep from './PolsterStep'
import SummaryStep from './SummaryStep'
import ContactStep, { type ContactStepHandle } from './ContactStep'
import StepNavigation from './StepNavigation'

type Screen = 'start' | 'motor' | 'farbe' | 'extras' | 'polster' | 'zusammenfassung' | 'kontakt'
const SCREEN_ORDER: Screen[] = [
  'start', 'motor', 'farbe', 'extras', 'polster', 'zusammenfassung', 'kontakt',
]

const TRANSITION_MS = 580
const EASING_ENTER = 'cubic-bezier(0.22, 1, 0.36, 1)'
const EASING_LEAVE = 'cubic-bezier(0.4, 0, 1, 1)'

type Options = Awaited<ReturnType<typeof fetchAllOptions>>

export default function ConfiguratorShell({ options }: { options: Options }) {
  const router = useRouter()
  const contactRef = useRef<ContactStepHandle>(null)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [screen, setScreen] = useState<Screen>('start')
  const [leavingScreen, setLeavingScreen] = useState<Screen | null>(null)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [transitionKey, setTransitionKey] = useState(0)

  const [motor, setMotor] = useState<MotorId | null>(null)
  const [color, setColor] = useState<ColorId | null>(null)
  const [extras, setExtras] = useState<ExtraId[]>([])
  const [polster, setPolster] = useState<PolsterId[]>([])
  const [polsterFarbe, setPolsterFarbe] = useState<PolsterFarbeId | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Video start screen state
  const [startOverlayVisible, setStartOverlayVisible] = useState(true)
  const [startOverlayMounted, setStartOverlayMounted] = useState(true)
  const [activeBoatIndex, setActiveBoatIndex] = useState(0)

  const boats: BoatModel[] = options.boats ?? [staticBoatModel]
  const activeBoat = boats[activeBoatIndex] ?? boats[0]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDropdownChange = useCallback((_open: boolean) => {}, [])

  const navigate = (target: Screen, dir: 'forward' | 'backward') => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    setLeavingScreen(screen)
    setDirection(dir)
    setScreen(target)
    setTransitionKey((k) => k + 1)
    leaveTimerRef.current = setTimeout(() => setLeavingScreen(null), TRANSITION_MS + 50)

    // When returning to start, bring back the video overlay
    if (target === 'start') {
      setStartOverlayMounted(true)
      setTimeout(() => setStartOverlayVisible(true), 80)
    }
  }

  const handleConfigure = () => {
    // Fade out overlay, then navigate (overlap for smoothness)
    setStartOverlayVisible(false)
    setTimeout(() => navigate('motor', 'forward'), 120)
    setTimeout(() => setStartOverlayMounted(false), 800)
  }

  const goBack = () => {
    const idx = SCREEN_ORDER.indexOf(screen)
    if (idx > 0) navigate(SCREEN_ORDER[idx - 1], 'backward')
  }

  const goNext = () => {
    const idx = SCREEN_ORDER.indexOf(screen)
    if (idx < SCREEN_ORDER.length - 1) navigate(SCREEN_ORDER[idx + 1], 'forward')
  }

  const handleContactSubmit = async (contactData: ContactSchema) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configuration: { motor, color, extras, polster, polsterFarbe },
          contact: contactData,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        router.push(`/thank-you?id=${encodeURIComponent(data.leadId)}`)
      } else {
        alert('Fehler beim Senden. Bitte versuche es erneut.')
      }
    } catch {
      alert('Fehler beim Senden. Bitte versuche es erneut.')
    } finally {
      setSubmitting(false)
    }
  }

  const renderContent = (s: Screen) => {
    switch (s) {
      case 'start':
        return <div className="flex-1" />
      case 'motor':
        return (
          <MotorStep
            value={motor}
            onChange={setMotor}
            color={color}
            extras={extras}
            onDropdownChange={handleDropdownChange}
            motorOptions={options.motors}
          />
        )
      case 'farbe':
        return (
          <ColorStep value={color} onChange={setColor} motor={motor} extras={extras} colorOptions={options.colors} />
        )
      case 'extras':
        return (
          <ExtrasStep
            value={extras}
            onChange={setExtras}
            motor={motor}
            color={color}
            onDropdownChange={handleDropdownChange}
            extraOptions={options.extras}
          />
        )
      case 'polster':
        return (
          <PolsterStep
            polster={polster}
            polsterFarbe={polsterFarbe}
            onPolsterChange={setPolster}
            onFarbeChange={setPolsterFarbe}
            motor={motor}
            color={color}
            extras={extras}
            polsterOptions={options.polster}
            polsterFarbeOptions={options.polsterFarben}
          />
        )
      case 'zusammenfassung':
        return (
          <SummaryStep
            configuration={{ motor, color, extras, polster, polsterFarbe }}
            options={options}
          />
        )
      case 'kontakt':
        return <ContactStep ref={contactRef} onSubmit={handleContactSubmit} />
    }
  }

  const enterAnimation =
    direction === 'forward'
      ? `step-enter-forward ${TRANSITION_MS}ms ${EASING_ENTER} both`
      : `step-enter-backward ${TRANSITION_MS}ms ${EASING_ENTER} both`

  const leaveAnimation =
    direction === 'forward'
      ? `step-leave-forward ${Math.round(TRANSITION_MS * 0.75)}ms ${EASING_LEAVE} forwards`
      : `step-leave-backward ${Math.round(TRANSITION_MS * 0.75)}ms ${EASING_LEAVE} forwards`

  return (
    <>
      {/* ── Start screen overlay ── */}
      {startOverlayMounted && (
        <div
          className="fixed inset-0 z-50 flex flex-col overflow-hidden"
          style={{
            opacity: startOverlayVisible ? 1 : 0,
            transition: 'opacity 750ms cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: startOverlayVisible ? 'auto' : 'none',
          }}
        >
          {/* Slides — one per boat, horizontally arranged */}
          <div
            className="flex h-full"
            style={{
              width: `${boats.length * 100}%`,
              transform: `translateX(-${(activeBoatIndex * 100) / boats.length}%)`,
              transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {boats.map((boat) => (
              <div key={boat.id} className="relative flex-shrink-0 flex flex-col" style={{ width: `${100 / boats.length}%` }}>
                {/* Desktop video */}
                <video autoPlay muted loop playsInline poster={boat.posterDesktop}
                  className="hidden md:block absolute inset-0 w-full h-full object-cover">
                  <source src={boat.videoDesktop?.replace('.mp4', '.webm')} type="video/webm" />
                  <source src={boat.videoDesktop} type="video/mp4" />
                </video>
                {/* Mobile video */}
                <video autoPlay muted loop playsInline poster={boat.posterMobile}
                  className="md:hidden absolute inset-0 w-full h-full object-cover">
                  <source src={boat.videoMobile?.replace('.mp4', '.webm')} type="video/webm" />
                  <source src={boat.videoMobile} type="video/mp4" />
                </video>
                {/* Fallback */}
                <div className="absolute inset-0 bg-neutral-900 bg-cover bg-center hidden md:block" style={{ zIndex: -1, backgroundImage: `url(${boat.posterDesktop})` }} />
                <div className="absolute inset-0 bg-neutral-900 bg-cover bg-center md:hidden" style={{ zIndex: -1, backgroundImage: `url(${boat.posterMobile})` }} />
                {/* Gradient */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 28%, transparent 55%, rgba(0,0,0,0.62) 100%)' }} />
              </div>
            ))}
          </div>

          {/* UI layer — always on top */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            {/* Logo */}
            <div className="flex flex-col items-center gap-2 pt-10 pointer-events-auto"
              style={{ animation: 'fade-up 900ms cubic-bezier(0.22,1,0.36,1) 100ms both' }}>
              <Image src="/kaebon-logo.svg" alt="Kaebon" width={172} height={37} priority className="brightness-0 invert" />
              <span className="text-[7.5px] font-medium tracking-[0.65em] text-white/50 uppercase pl-[0.65em]">Konfigurator</span>
            </div>

            {/* Boat name — vertically centered */}
            <div className="flex-1 flex items-center justify-center px-5 pointer-events-auto">
              <div className="text-center" style={{ animation: 'fade-up 900ms cubic-bezier(0.22,1,0.36,1) 350ms both' }}>
                <h1 className="text-[22px] md:text-[28px] font-light tracking-[0.2em] uppercase text-white leading-tight">
                  {activeBoat.name}
                </h1>
              </div>
            </div>

            {/* Bottom — dot indicators + CTA */}
            <div className="flex flex-col items-center gap-4 px-5 pointer-events-auto"
              style={{ paddingBottom: 'max(36px, env(safe-area-inset-bottom))' }}>

              {boats.length > 1 && (
                <div className="flex items-center gap-2">
                  {boats.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveBoatIndex(i)}
                      className="transition-all duration-300"
                      style={{
                        width: i === activeBoatIndex ? 20 : 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: i === activeBoatIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="flex flex-col items-center w-full max-w-[300px]"
                style={{ animation: 'fade-up 900ms cubic-bezier(0.22,1,0.36,1) 500ms both' }}>
                <button
                  onClick={handleConfigure}
                  className="w-full h-[52px] rounded-full bg-white text-black text-[11px] font-medium tracking-[0.25em] uppercase hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200"
                >
                  Konfigurieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Regular configurator layout ── */}
      <div className="min-h-[100dvh] flex flex-col bg-white">
        <KaebonLogo />

        <div className="flex-1 min-h-0 relative overflow-hidden">
          {leavingScreen !== null && (
            <div
              key={`leave-${leavingScreen}-${transitionKey}`}
              className="absolute inset-0 flex flex-col pointer-events-none"
              style={{ animation: leaveAnimation }}
            >
              {renderContent(leavingScreen)}
            </div>
          )}
          <div
            key={`enter-${screen}-${transitionKey}`}
            className="absolute inset-0 flex flex-col"
            style={{ animation: transitionKey > 0 ? enterAnimation : 'none' }}
          >
            {renderContent(screen)}
          </div>
        </div>

        {screen !== 'start' && (
          <StepNavigation
            onBack={goBack}
            onNext={screen === 'kontakt' ? () => contactRef.current?.submit() : goNext}
            nextLabel={
              screen === 'zusammenfassung'
                ? 'Bestätigen'
                : screen === 'kontakt'
                  ? submitting ? 'Wird gesendet…' : 'Senden'
                  : 'Weiter'
            }
            nextDisabled={
              (screen === 'motor' && motor === null) ||
              (screen === 'farbe' && color === null) ||
              (screen === 'polster' && polster.length > 0 && polsterFarbe === null) ||
              submitting
            }
            nextFormId={screen === 'kontakt' ? 'contact-form' : undefined}
          />
        )}
      </div>
    </>
  )
}
