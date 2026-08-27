import { useEffect } from 'react'
import { copy, personal } from '@/data'

function upsertMeta(name: string, content: string, property = false): void {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  const existing = document.head.querySelector(selector)
  if (existing instanceof HTMLMetaElement) {
    existing.content = content
    return
  }
  const meta = document.createElement('meta')
  if (property) meta.setAttribute('property', name)
  else meta.name = name
  meta.content = content
  document.head.appendChild(meta)
}

export function DocumentMeta() {
  useEffect(() => {
    const title = `${personal.name} — ${personal.role}`
    const description = personal.intro
    document.title = title
    upsertMeta('description', description)
    upsertMeta('og:title', title, true)
    upsertMeta('og:description', description, true)
    upsertMeta('og:type', 'website', true)
    upsertMeta('twitter:card', 'summary')
    upsertMeta('twitter:title', title)
    upsertMeta('twitter:description', description)
  }, [])

  return (
    <a className="skip-link" href="#content">
      {copy.chrome.skip}
    </a>
  )
}
