import Button from '@/components/ui/Button'

interface StepNavigationProps {
  onBack?: () => void
  onNext: () => void
  backLabel?: string
  nextLabel?: string
  nextDisabled?: boolean
  nextFormId?: string
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export default function StepNavigation({
  onBack,
  onNext,
  backLabel = 'Zurück',
  nextLabel = 'Weiter',
  nextDisabled = false,
  nextFormId,
}: StepNavigationProps) {
  return (
    <div
      className="shrink-0 flex items-center gap-2 px-5 pt-3 w-full max-w-sm mx-auto"
      style={{ paddingBottom: 'max(28px, env(safe-area-inset-bottom))' }}
    >
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1 h-[56px] px-2 text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors duration-200 select-none"
        >
          <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
          {backLabel}
        </button>
      ) : (
        <div className="flex-1" />
      )}

      <Button
        variant="primary"
        onClick={nextFormId ? undefined : onNext}
        type={nextFormId ? 'submit' : 'button'}
        form={nextFormId}
        disabled={nextDisabled}
        className="flex-1 h-[56px]"
      >
        {nextLabel}
      </Button>
    </div>
  )
}
