import Image from 'next/image'

export default function KaebonLogo() {
  return (
    <div
      className="shrink-0 flex flex-col items-center gap-1 pt-8 pb-4"
      style={{ animation: 'fade-up 900ms cubic-bezier(0.22,1,0.36,1) 80ms both' }}
    >
      <a href="https://kaebon.com" target="_blank" rel="noopener noreferrer" className="opacity-100 hover:opacity-70 transition-opacity duration-200">
        <Image src="/kaebon-logo.svg" alt="Kaebon" width={172} height={37} priority />
      </a>
      <span className="text-[9px] font-medium tracking-[0.55em] text-black uppercase pl-[0.55em]">
        Konfigurator
      </span>
    </div>
  )
}
