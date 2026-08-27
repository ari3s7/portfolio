import { useExperience } from '@/state/useExperience'

const MOTES = [
  { left: '12%', top: '28%', delay: '0s', duration: '18s' },
  { left: '38%', top: '62%', delay: '3s', duration: '21s' },
  { left: '71%', top: '24%', delay: '6s', duration: '19s' },
  { left: '84%', top: '58%', delay: '2s', duration: '22s' },
  { left: '54%', top: '78%', delay: '8s', duration: '20s' },
] as const

export function Motes() {
  const { performanceTier, prefersReducedMotion } = useExperience()

  if (prefersReducedMotion || performanceTier === 'light') return null

  const count = performanceTier === 'full' ? 5 : 3

  return (
    <div className="atmosphere-motes" aria-hidden="true">
      {MOTES.slice(0, count).map((mote, index) => (
        <span
          key={index}
          className="atmosphere-mote"
          style={{
            left: mote.left,
            top: mote.top,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
          }}
        />
      ))}
    </div>
  )
}
