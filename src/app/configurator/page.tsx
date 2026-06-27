import ConfiguratorShell from '@/components/configurator/ConfiguratorShell'
import { fetchAllOptions } from '@/lib/fetchOptions'

export const metadata = {
  title: 'Kaebon Konfigurator',
  description: 'Konfiguriere deinen Kaebon Elektroboot und erhalte ein persönliches Angebot.',
}

// Revalidate every 60 seconds — changes in Supabase appear within a minute
export const revalidate = 60

export default async function ConfiguratorPage() {
  const options = await fetchAllOptions()
  return <ConfiguratorShell options={options} />
}
