import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
}

export default function Button({
  variant = 'primary',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'h-14 px-8 rounded-full text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-200 cursor-pointer select-none',
        variant === 'primary' && [
          'bg-black text-white',
          'hover:bg-neutral-800 hover:shadow-lg',
          'active:scale-[0.98] active:shadow-none',
          'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100',
        ],
        variant === 'outline' && [
          'border border-black/30 bg-transparent text-black',
          'hover:border-black hover:bg-neutral-50',
          'active:scale-[0.98]',
          'disabled:border-black/10 disabled:text-neutral-300 disabled:cursor-not-allowed disabled:scale-100',
        ],
        variant === 'ghost' && [
          'bg-transparent text-neutral-400',
          'hover:text-black',
          'active:scale-[0.98]',
          'disabled:text-neutral-200 disabled:cursor-not-allowed disabled:scale-100',
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
