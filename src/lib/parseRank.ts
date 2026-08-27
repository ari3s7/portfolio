export type Suit = 'spade' | 'heart' | 'diamond' | 'club'

export type ParsedRank = {
  value: string
  suit: Suit | null
}

const SUITS: Record<string, Suit> = {
  '♠': 'spade',
  '♥': 'heart',
  '♦': 'diamond',
  '♣': 'club',
}

export function parseRank(rank: string): ParsedRank {
  const trimmed = rank.trim()
  if (!trimmed) return { value: '', suit: null }
  const mark = trimmed.slice(-1)
  const suit = SUITS[mark] ?? null
  const value = suit ? trimmed.slice(0, -1).trim() : trimmed
  return { value, suit }
}
