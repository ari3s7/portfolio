import { BREAKPOINTS } from '@/lib/breakpoints'

export type BladePose = {
  x: number
  y: number
  rotation: number
  rotationX: number
  skewX: number
  scale: number
}

const DESKTOP_POSES: BladePose[] = [
  { x: -312, y: -64, rotation: -12.5, rotationX: 6, skewX: -0.7, scale: 0.9 },
  { x: 322, y: -48, rotation: 11.5, rotationX: 3, skewX: 0.55, scale: 0.93 },
  { x: -326, y: 38, rotation: -8.5, rotationX: 4, skewX: -0.65, scale: 0.96 },
  { x: -286, y: 128, rotation: -6.5, rotationX: 1.8, skewX: -0.4, scale: 1.03 },
  { x: 302, y: 136, rotation: 8, rotationX: 0.8, skewX: 0.45, scale: 1.06 },
]

const TABLET_POSES: BladePose[] = [
  { x: -232, y: -58, rotation: -10, rotationX: 5, skewX: -0.5, scale: 0.9 },
  { x: 242, y: -44, rotation: 9.5, rotationX: 2.5, skewX: 0.45, scale: 0.93 },
  { x: -246, y: 32, rotation: -7.5, rotationX: 3.2, skewX: -0.5, scale: 0.96 },
  { x: -216, y: 118, rotation: -5.5, rotationX: 1.4, skewX: -0.3, scale: 1.02 },
  { x: 226, y: 126, rotation: 7, rotationX: 0.7, skewX: 0.4, scale: 1.04 },
]

const MOBILE_POSES: BladePose[] = [
  { x: 4, y: 0, rotation: -1.1, rotationX: 1.2, skewX: 0, scale: 1 },
  { x: -3, y: 0, rotation: 0.9, rotationX: 0.8, skewX: 0, scale: 1 },
  { x: 2, y: 0, rotation: -0.6, rotationX: 1, skewX: 0, scale: 1 },
  { x: -2, y: 0, rotation: 0.8, rotationX: 0.5, skewX: 0, scale: 1 },
  { x: 3, y: 0, rotation: -0.4, rotationX: 0.4, skewX: 0, scale: 1 },
]

export function getBladePose(index: number, width: number): BladePose {
  if (width < BREAKPOINTS.tablet) return MOBILE_POSES[index] ?? MOBILE_POSES[0]
  if (width < BREAKPOINTS.desktop) return TABLET_POSES[index] ?? TABLET_POSES[0]
  return DESKTOP_POSES[index] ?? DESKTOP_POSES[0]
}

export function isStackedBladeLayout(width: number): boolean {
  return width < BREAKPOINTS.tablet
}
