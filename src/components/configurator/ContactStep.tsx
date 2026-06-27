'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactSchema } from '@/lib/leadSchema'
import { cn } from '@/lib/utils'
import { forwardRef, useImperativeHandle } from 'react'
import FormSelect from '@/components/ui/FormSelect'

const TITEL_OPTIONS = [
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' },
  { value: 'Prof. Dr.', label: 'Prof. Dr.' },
  { value: 'Dipl.-Ing.', label: 'Dipl.-Ing.' },
]

const ANREDE_OPTIONS = [
  { value: 'Herr', label: 'Herr' },
  { value: 'Frau', label: 'Frau' },
  { value: 'Divers', label: 'Divers' },
  { value: 'Keine Angabe', label: 'Keine Angabe' },
]

interface ContactStepProps {
  onSubmit: (data: ContactSchema) => void
}

export interface ContactStepHandle {
  submit: () => void
}

const ContactStep = forwardRef<ContactStepHandle, ContactStepProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<ContactSchema>({
      resolver: zodResolver(contactSchema),
      defaultValues: { datenschutz: false, titel: '', anrede: '' },
    })

    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(onSubmit)(),
    }))

    const inputClass = cn(
      'w-full h-[52px] px-4 rounded-xl border text-[13px] bg-white tracking-wide',
      'border-black/[0.12] placeholder:text-neutral-300',
      'focus:outline-none focus:border-black/50 transition-colors duration-200'
    )


    return (
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Header */}
        <div className="h-[88px] shrink-0 flex items-center justify-center border-b border-black/[0.06]">
          <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-400">
            Kontaktdaten
          </p>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <form
            id="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mx-auto px-5 pt-8 pb-12 flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Titel */}
              <div>
                <Controller
                  name="titel"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={TITEL_OPTIONS}
                      placeholder="Titel"
                    />
                  )}
                />
              </div>

              {/* Anrede */}
              <div>
                <Controller
                  name="anrede"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={ANREDE_OPTIONS}
                      placeholder="Anrede"
                      hasError={!!errors.anrede}
                    />
                  )}
                />
                {errors.anrede && (
                  <p className="text-red-400 text-[10px] mt-1 px-1">{errors.anrede.message}</p>
                )}
              </div>
            </div>

            <div>
              <input
                {...register('vorname')}
                placeholder="Vorname"
                className={cn(inputClass, errors.vorname && 'border-red-400')}
              />
              {errors.vorname && (
                <p className="text-red-400 text-[10px] mt-1 px-1">{errors.vorname.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('nachname')}
                placeholder="Nachname"
                className={cn(inputClass, errors.nachname && 'border-red-400')}
              />
              {errors.nachname && (
                <p className="text-red-400 text-[10px] mt-1 px-1">{errors.nachname.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="E-Mail"
                className={cn(inputClass, errors.email && 'border-red-400')}
              />
              {errors.email && (
                <p className="text-red-400 text-[10px] mt-1 px-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('telefon')}
                type="tel"
                placeholder="Telefonnummer"
                className={cn(inputClass, errors.telefon && 'border-red-400')}
              />
              {errors.telefon && (
                <p className="text-red-400 text-[10px] mt-1 px-1">{errors.telefon.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('wohnort')}
                placeholder="Wohnort"
                className={cn(inputClass, errors.wohnort && 'border-red-400')}
              />
              {errors.wohnort && (
                <p className="text-red-400 text-[10px] mt-1 px-1">{errors.wohnort.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3 pt-3 pb-1">
              <input
                {...register('datenschutz')}
                type="checkbox"
                id="datenschutz"
                className="mt-0.5 w-4 h-4 accent-black cursor-pointer flex-shrink-0 rounded"
              />
              <label
                htmlFor="datenschutz"
                className="text-[11px] text-neutral-400 leading-relaxed cursor-pointer"
              >
                Ich habe die{' '}
                <a
                  href="https://www.kaebon.com/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="underline underline-offset-2 text-neutral-600 hover:text-black transition-colors duration-150"
                >
                  Datenschutzerklärung
                </a>{' '}
                gelesen und bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden.
              </label>
            </div>
            {errors.datenschutz && (
              <p className="text-red-400 text-[10px] -mt-2 px-1">{errors.datenschutz.message}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
)

ContactStep.displayName = 'ContactStep'
export default ContactStep
