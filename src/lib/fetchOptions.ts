import { supabase } from './supabase'
import { motorOptions as staticMotors } from '@/data/motorOptions'
import { colorOptions as staticColors } from '@/data/colorOptions'
import { extraOptions as staticExtras } from '@/data/extraOptions'
import { polsterOptions as staticPolster } from '@/data/polsterOptions'
import { polsterFarbeOptions as staticPolsterFarben } from '@/data/polsterFarbeOptions'
import type { MotorOption } from '@/data/motorOptions'
import type { ColorOption } from '@/data/colorOptions'
import type { ExtraOption } from '@/data/extraOptions'
import type { PolsterOption } from '@/data/polsterOptions'
import type { PolsterFarbeOption } from '@/data/polsterFarbeOptions'

export async function fetchMotorOptions(): Promise<MotorOption[]> {
  if (!supabase) return staticMotors
  const { data, error } = await supabase
    .from('motor_options')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  if (error || !data?.length) return staticMotors
  return data.map((r) => ({ id: r.id, label: r.label, description: r.description ?? undefined, image: r.image_url ?? undefined }))
}

export async function fetchColorOptions(): Promise<ColorOption[]> {
  if (!supabase) return staticColors
  const { data, error } = await supabase
    .from('color_options')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  if (error || !data?.length) return staticColors
  return data.map((r) => ({ id: r.id, label: r.label, hex: r.hex }))
}

export async function fetchExtraOptions(): Promise<ExtraOption[]> {
  if (!supabase) return staticExtras
  const { data, error } = await supabase
    .from('extra_options')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  if (error || !data?.length) return staticExtras
  return data.map((r) => ({
    id: r.id,
    label: r.label,
    description: r.description ?? undefined,
    image: r.image_url ?? undefined,
    requiresExtra: r.requires_extra_id ?? undefined,
  }))
}

export async function fetchPolsterOptions(): Promise<PolsterOption[]> {
  if (!supabase) return staticPolster
  const { data, error } = await supabase
    .from('polster_options')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  if (error || !data?.length) return staticPolster
  return data.map((r) => ({ id: r.id, label: r.label }))
}

export async function fetchPolsterFarbeOptions(): Promise<PolsterFarbeOption[]> {
  if (!supabase) return staticPolsterFarben
  const { data, error } = await supabase
    .from('polster_farbe_options')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  if (error || !data?.length) return staticPolsterFarben
  return data.map((r) => ({
    id: r.id,
    label: r.label,
    hex: r.hex,
    image: r.image_url ?? undefined,
  }))
}

export async function fetchAllOptions() {
  const [motors, colors, extras, polster, polsterFarben] = await Promise.all([
    fetchMotorOptions(),
    fetchColorOptions(),
    fetchExtraOptions(),
    fetchPolsterOptions(),
    fetchPolsterFarbeOptions(),
  ])
  return { motors, colors, extras, polster, polsterFarben }
}
