export function hasUrl(value: string | undefined): value is string {
  const trimmed = value?.trim()
  if (!trimmed) return false
  if (trimmed === '#' || trimmed === '/' || /^javascript:/i.test(trimmed)) return false
  return true
}
