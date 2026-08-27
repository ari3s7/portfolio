import { useSyncExternalStore } from 'react'
import {
  BREAKPOINTS,
  type PerformanceTier,
} from '@/lib/breakpoints'
import { onResize } from '@/lib/onResize'

type NavigatorConnection = EventTarget & { saveData?: boolean }

function getConnection(): NavigatorConnection | undefined {
  return (navigator as Navigator & { connection?: NavigatorConnection })
    .connection
}

function getTier(): PerformanceTier {
  if (getConnection()?.saveData) return 'light'

  const width = window.innerWidth
  if (width < BREAKPOINTS.tablet) return 'light'
  if (width < BREAKPOINTS.desktop) return 'medium'
  return 'full'
}

function subscribe(onChange: () => void): () => void {
  let last = getTier()

  const check = () => {
    const next = getTier()
    if (next === last) return
    last = next
    onChange()
  }

  const stopResize = onResize(check)

  const connection = getConnection()
  connection?.addEventListener('change', check)

  return () => {
    stopResize()
    connection?.removeEventListener('change', check)
  }
}

export function usePerformanceTier(): PerformanceTier {
  return useSyncExternalStore(subscribe, getTier, () => 'medium')
}
