export type ContactInfo = {
  name: string
  email: string
  phone: string
}

export const EMPTY_CONTACT: ContactInfo = {
  name: '',
  email: '',
  phone: '',
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('852') && digits.length === 11) return true
  return digits.length === 8
}

export function isContactComplete(contact: ContactInfo) {
  return (
    contact.name.trim().length >= 2 &&
    isValidEmail(contact.email) &&
    isValidPhone(contact.phone)
  )
}
