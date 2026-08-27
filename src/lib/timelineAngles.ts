export function timelineAngles(count: number): number[] {
  if (count <= 0) return []
  if (count === 1) return [0]
  const span = 240
  const start = -120
  return Array.from({ length: count }, (_, index) => start + (span * index) / (count - 1))
}
