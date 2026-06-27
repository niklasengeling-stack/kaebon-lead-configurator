// In-process counter — resets on server restart.
// Replace with a database sequence when persistence is added.
let counter = 0

export function generateLeadId(): string {
  counter++
  const year = new Date().getFullYear()
  const padded = String(counter).padStart(6, '0')
  return `KAEBON-${year}-${padded}`
}
