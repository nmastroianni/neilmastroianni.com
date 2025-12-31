import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const slugifyHeading = ({ text }: { text: string }) => {
  return text
    .toLowerCase() // Make lowercase
    .replace(/[^\w\s-]/g, '') // Remove all non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and hyphens with a single hyphen
    .replace(/(^-|-$)/g, '') // Remove leading and trailing hyphens
}
