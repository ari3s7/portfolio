import type { Suit } from '@/lib/parseRank'

type SuitMarkProps = {
  suit: Suit | null
}

export function SuitMark({ suit }: SuitMarkProps) {
  if (suit === 'heart') {
    return (
      <path
        d="M32 18C28 10 18 12 18 22C18 28 24 34 32 44C40 34 46 28 46 22C46 12 36 10 32 18Z"
        fill="#5c1c1c"
        stroke="#0c0b09"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    )
  }

  if (suit === 'diamond') {
    return (
      <path
        d="M32 10L46 32L32 54L18 32Z"
        fill="#5c1c1c"
        stroke="#0c0b09"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    )
  }

  if (suit === 'club') {
    return (
      <>
        <circle cx="32" cy="20" r="8.2" fill="#0c0b09" />
        <circle cx="22" cy="32" r="8.2" fill="#0c0b09" />
        <circle cx="42" cy="32" r="8.2" fill="#0c0b09" />
        <path d="M32 34V52" stroke="#0c0b09" strokeWidth="5.5" strokeLinecap="round" />
      </>
    )
  }

  return (
    <>
      <path
        d="M32 12C24 24 14 30 14 40C14 48 20 52 26 52C29 52 31 50 32 48C33 50 35 52 38 52C44 52 50 48 50 40C50 30 40 24 32 12Z"
        fill="#0c0b09"
        stroke="#0c0b09"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M32 46V56" stroke="#0c0b09" strokeWidth="4.2" strokeLinecap="round" />
    </>
  )
}
