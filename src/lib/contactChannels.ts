import { copy, type Socials } from '@/data'

export type ContactChannelId = 'email' | 'github' | 'linkedin'

export type ContactChannel = {
  id: ContactChannelId
  href: string
  label: string
  text: string
  external: boolean
}

function usable(value: string | undefined): value is string {
  const trimmed = value?.trim() ?? ''
  if (!trimmed) return false
  if (trimmed === '#' || trimmed === '/' || /^javascript:/i.test(trimmed)) return false
  return true
}

function asHref(value: string, kind: ContactChannelId): string {
  const trimmed = value.trim()
  if (kind === 'email') {
    return trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`
  }
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (kind === 'github') {
    const handle = trimmed.replace(/^@/, '').replace(/^github\.com\//i, '')
    return `https://github.com/${handle}`
  }
  const handle = trimmed.replace(/^@/, '').replace(/^(www\.)?linkedin\.com\/(in\/)?/i, '')
  return `https://www.linkedin.com/in/${handle}`
}

export function contactChannels(socials: Socials): ContactChannel[] {
  const channels: ContactChannel[] = []

  if (usable(socials.email)) {
    const href = asHref(socials.email, 'email')
    channels.push({
      id: 'email',
      href,
      label: copy.contact.email,
      text: socials.email.replace(/^mailto:/i, ''),
      external: false,
    })
  }

  if (usable(socials.linkedin)) {
    const href = asHref(socials.linkedin, 'linkedin')
    channels.push({
      id: 'linkedin',
      href,
      label: copy.contact.linkedin,
      text: href.replace(/^https?:\/\//i, ''),
      external: true,
    })
  }

  if (usable(socials.github)) {
    const href = asHref(socials.github, 'github')
    channels.push({
      id: 'github',
      href,
      label: copy.contact.github,
      text: href.replace(/^https?:\/\//i, ''),
      external: true,
    })
  }

  return channels
}

export function visiblePlace(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? ''
  if (!trimmed) return null
  if (trimmed.toUpperCase() === 'LOCATION') return null
  return trimmed
}
