import { useExperience } from '@/state/useExperience'

const SPECKS = [
  { left: '8%', top: '72%', delay: '0s', duration: '11s', size: 2 },
  { left: '18%', top: '58%', delay: '1.4s', duration: '13s', size: 1 },
  { left: '27%', top: '81%', delay: '2.2s', duration: '10s', size: 2 },
  { left: '41%', top: '64%', delay: '0.6s', duration: '14s', size: 1 },
  { left: '53%', top: '48%', delay: '3.1s', duration: '12s', size: 2 },
  { left: '62%', top: '77%', delay: '1.8s', duration: '15s', size: 1 },
  { left: '71%', top: '55%', delay: '4s', duration: '11s', size: 2 },
  { left: '79%', top: '69%', delay: '2.7s', duration: '13s', size: 1 },
  { left: '86%', top: '43%', delay: '0.9s', duration: '16s', size: 1 },
  { left: '14%', top: '36%', delay: '5s', duration: '12s', size: 1 },
  { left: '33%', top: '29%', delay: '3.6s', duration: '14s', size: 1 },
  { left: '68%', top: '32%', delay: '2s', duration: '13s', size: 2 },
  { left: '91%', top: '61%', delay: '4.4s', duration: '12s', size: 1 },
  { left: '47%', top: '22%', delay: '1.1s', duration: '15s', size: 1 },
] as const

export function Dust() {
  const { performanceTier, prefersReducedMotion } = useExperience()

  if (prefersReducedMotion) return null

  const count =
    performanceTier === 'full' ? 14 : performanceTier === 'medium' ? 8 : 4

  return (
    <div className="atmosphere-dust" aria-hidden="true">
      {SPECKS.slice(0, count).map((speck, index) => (
        <span
          key={index}
          className="atmosphere-dust-speck"
          style={{
            left: speck.left,
            top: speck.top,
            width: speck.size,
            height: speck.size,
            animationDelay: speck.delay,
            animationDuration: speck.duration,
          }}
        />
      ))}
    </div>
  )
}
