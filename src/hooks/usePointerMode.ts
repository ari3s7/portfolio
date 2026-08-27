import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { PointerMode } from '@/lib/breakpoints'

export function usePointerMode(): PointerMode {
  const coarse = useMediaQuery('(pointer: coarse)')
  return coarse ? 'coarse' : 'fine'
}
