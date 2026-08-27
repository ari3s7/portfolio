import { useEffect, type RefObject } from 'react'
import type { PerformanceTier } from '@/lib/breakpoints'
import { onResize } from '@/lib/onResize'

type Puff = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  grow: number
  aspect: number
  life: number
  ttl: number
  seed: number
  freq: number
  amp: number
  rot: number
  spin: number
  tone: number
  lobes: number
}

const CAPS: Record<PerformanceTier, number> = {
  light: 22,
  medium: 48,
  full: 78,
}

function makePuff(x: number, y: number, drift: number): Puff {
  const seed = Math.random() * Math.PI * 2
  const lift = 0.42 + Math.random() * 0.7 + drift * 0.22
  return {
    x: x + (Math.random() - 0.5) * 14,
    y: y + (Math.random() - 0.5) * 8,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -lift,
    size: 14 + Math.random() * 28,
    grow: 0.045 + Math.random() * 0.08,
    aspect: 0.42 + Math.random() * 0.38,
    life: 0,
    ttl: 160 + Math.random() * 190,
    seed,
    freq: 0.012 + Math.random() * 0.022,
    amp: 0.55 + Math.random() * 0.9,
    rot: seed,
    spin: (Math.random() - 0.5) * 0.01,
    tone: Math.random(),
    lobes: 3 + Math.floor(Math.random() * 3),
  }
}

type UseCigaretteSmokeOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  originSelector: string
  active: boolean
  reducedMotion: boolean
  performanceTier: PerformanceTier
}

export function useCigaretteSmoke({
  canvasRef,
  originSelector,
  active,
  reducedMotion,
  performanceTier,
}: UseCigaretteSmokeOptions): void {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active || reducedMotion) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const pool: Puff[] = []
    const cap = CAPS[performanceTier]
    const originEvery = performanceTier === 'light' ? 8 : 4
    let frame = 0
    let raf = 0
    let running = true
    let visible = true
    let originX = 0
    let originY = 0
    let width = 0
    let height = 0
    let dpr = 1
    let ember: Element | null = null
    let chamber: Element | null = null

    const readOrigin = () => {
      ember ??= document.querySelector(originSelector)
      if (!ember) return
      const box = canvas.getBoundingClientRect()
      const tip = ember.getBoundingClientRect()
      originX = ((tip.left + tip.width * 0.42 - box.left) / box.width) * width
      originY = ((tip.top + tip.height * 0.28 - box.top) / box.height) * height
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      dpr = performanceTier === 'light' ? 1 : Math.min(2, window.devicePixelRatio || 1)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      readOrigin()
    }

    const smokeProgress = () => {
      chamber ??= document.querySelector('.smoke-chamber')
      if (!chamber) return 0
      const rect = chamber.getBoundingClientRect()
      const span = window.innerHeight + rect.height
      return Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span))
    }

    const recycle = (progress: number) => makePuff(originX, originY, progress)

    const drawPuff = (puff: Puff, alpha: number) => {
      const cream = 0.55 + puff.tone * 0.25
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, puff.size * 1.45)
      gradient.addColorStop(0, `rgba(236, 224, 200, ${alpha * cream})`)
      gradient.addColorStop(0.38, `rgba(168, 146, 118, ${alpha * 0.42})`)
      gradient.addColorStop(0.72, `rgba(72, 56, 40, ${alpha * 0.16})`)
      gradient.addColorStop(1, 'rgba(18, 16, 14, 0)')

      context.save()
      context.translate(puff.x, puff.y)
      context.rotate(puff.rot + Math.sin(puff.life * 0.028 + puff.seed) * 0.35)
      context.fillStyle = gradient
      context.beginPath()

      for (let lobe = 0; lobe < puff.lobes; lobe += 1) {
        const t = lobe / puff.lobes
        const trail = lobe * puff.size * 0.32
        const curl =
          Math.sin(puff.life * puff.freq + puff.seed + lobe * 1.1) * puff.size * (0.22 + t * 0.2)
        const rx = puff.size * (1.15 - t * 0.22)
        const ry = puff.size * puff.aspect * (1.05 - t * 0.12)
        context.ellipse(curl, -trail, rx, ry, lobe * 0.38, 0, Math.PI * 2)
      }

      context.fill()
      context.restore()
    }

    const tick = () => {
      if (!running) return
      if (!visible) {
        raf = 0
        return
      }
      frame += 1
      if (frame % originEvery === 0) readOrigin()

      const progress = smokeProgress()
      const spawnBudget =
        frame < 40 ? 4 : 1 + Math.floor(progress * (performanceTier === 'light' ? 1 : 2))
      const fileOpen = document.documentElement.dataset.fileOpen === 'true'
      const curl = fileOpen ? 1.45 : 1

      if (pool.length < cap) {
        for (let i = 0; i < spawnBudget && pool.length < cap; i += 1) {
          pool.push(recycle(progress))
        }
      }

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'source-over'

      for (let i = pool.length - 1; i >= 0; i -= 1) {
        const puff = pool[i]
        puff.life += 1

        const sky = originY > 1 ? Math.max(0, (originY - puff.y) / originY) : 0
        puff.x += puff.vx + Math.sin(puff.life * puff.freq + puff.seed) * puff.amp * curl
        puff.y += puff.vy
        puff.size += puff.grow * (1 + sky * 0.85 + progress * 0.35)
        puff.rot += puff.spin
        puff.vy *= sky > 0.55 ? 0.986 : 0.997
        puff.vx += Math.sin(puff.life * 0.017 + puff.seed) * (fileOpen ? 0.012 : 0.006)

        const lived = puff.life / puff.ttl
        if (lived >= 1 || puff.y < -puff.size * 2.4) {
          pool[i] = recycle(progress)
          continue
        }

        const fade = lived < 0.08 ? lived / 0.08 : 1 - (lived - 0.08) / 0.92
        const linger = 0.28 + Math.min(0.22, sky * 0.28)
        const alpha = Math.max(0, fade) * linger
        drawPuff(puff, alpha)
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    for (let i = 0; i < Math.min(16, cap); i += 1) {
      const seeded = makePuff(originX, originY, 0)
      seeded.life = Math.random() * seeded.ttl * 0.35
      seeded.y -= Math.random() * Math.min(originY * 0.45, 160)
      pool.push(seeded)
    }

    const host = canvas.closest('.smoke-chamber') ?? canvas.parentElement
    const io = host
      ? new IntersectionObserver(
          (entries) => {
            visible = entries.some((entry) => entry.isIntersecting)
            if (visible && running && !raf) raf = requestAnimationFrame(tick)
          },
          { rootMargin: '24% 0px' },
        )
      : null
    if (host) io?.observe(host)

    const stopResize = onResize(resize)
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      stopResize()
      io?.disconnect()
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [active, canvasRef, originSelector, performanceTier, reducedMotion])
}
