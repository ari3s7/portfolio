import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import { gsap } from '@/animations/gsapSetup'
import { Cigarette, CigarettePlume } from '@/components/objects/Cigarette'
import { Matchstick } from '@/components/objects/Matchstick'
import { MatchStriker } from '@/components/objects/MatchStriker'
import { copy } from '@/data'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

type MatchPhase = 'unlit' | 'striking' | 'lit'

const TAP_SLOP = 10
const SPARK_COUNT = 8
const SCRATCH_COUNT = 7

function overlaps(a: DOMRect, b: DOMRect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function MatchScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const matchRef = useRef<HTMLButtonElement>(null)
  const headRef = useRef<HTMLSpanElement>(null)
  const strikerRef = useRef<HTMLDivElement>(null)
  const cigTipRef = useRef<HTMLSpanElement>(null)
  const sparksRef = useRef<HTMLDivElement>(null)
  const scratchesRef = useRef<HTMLDivElement>(null)
  const flickerRef = useRef<gsap.core.Tween | null>(null)
  const smokeRef = useRef<gsap.core.Tween | null>(null)
  const igniteRef = useRef<gsap.core.Timeline | null>(null)

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    lastX: 0,
    lastY: 0,
    friction: 0,
    moved: 0,
    lastTime: 0,
  })
  const phaseRef = useRef<MatchPhase>('unlit')
  const [phase, setPhase] = useState<MatchPhase>('unlit')

  const { setGate, prefersReducedMotion, performanceTier, pointerMode } =
    useExperience()

  const setMatchPhase = useCallback((next: MatchPhase) => {
    phaseRef.current = next
    setPhase(next)
  }, [])

  const restMatch = useCallback(() => {
    const match = matchRef.current
    if (!match) return
    gsap.to(match, {
      x: 0,
      y: 0,
      rotation: pointerMode === 'coarse' ? -2 : -8,
      duration: prefersReducedMotion ? 0 : 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [pointerMode, prefersReducedMotion])

  const settleLit = useCallback(() => {
    const scene = sceneRef.current
    const match = matchRef.current
    if (!scene) return

    gsap.set(scene.querySelectorAll('.match-flame, .match-glow, .cig-ember, .cig-glow'), {
      opacity: 1,
    })
    gsap.set(scene.querySelector('.cig-tip-fill'), { fill: '#8a3a1f' })
    gsap.set(match, { x: 0, y: 0, rotation: pointerMode === 'coarse' ? -2 : -8 })
  }, [pointerMode])

  const burstSparks = useCallback(
    (origin: { x: number; y: number }) => {
      const sparks = sparksRef.current
      const stage = stageRef.current
      if (!sparks || !stage || prefersReducedMotion || performanceTier === 'light') return

      const stageBox = stage.getBoundingClientRect()
      const nodes = sparks.querySelectorAll<HTMLElement>('.match-spark')
      nodes.forEach((spark, index) => {
        const angle = (index / nodes.length) * Math.PI * 2 + 0.4
        const dist = 10 + (index % 3) * 8
        gsap.fromTo(
          spark,
          {
            x: origin.x - stageBox.left,
            y: origin.y - stageBox.top,
            opacity: 0.9,
            scale: 1,
          },
          {
            x: origin.x - stageBox.left + Math.cos(angle) * dist,
            y: origin.y - stageBox.top + Math.sin(angle) * dist - 8,
            opacity: 0,
            scale: 0.2,
            duration: 0.32 + index * 0.02,
            ease: 'power2.out',
            overwrite: 'auto',
          },
        )
      })
    },
    [performanceTier, prefersReducedMotion],
  )

  const startLoops = useCallback(() => {
    const scene = sceneRef.current
    if (!scene || prefersReducedMotion) return

    flickerRef.current?.kill()
    smokeRef.current?.kill()

    flickerRef.current = gsap.to(scene.querySelectorAll('.match-flame, .cig-ember'), {
      scale: 1.06,
      opacity: 0.82,
      duration: 0.14,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      transformOrigin: '50% 100%',
    })

    if (performanceTier !== 'light') {
      smokeRef.current = gsap.to(scene.querySelectorAll('.cig-ember'), {
        scale: 1.04,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }
  }, [performanceTier, prefersReducedMotion])

  const ignite = useCallback(
    (mode: 'drag' | 'control') => {
      if (phaseRef.current === 'lit') return

      const scene = sceneRef.current
      const match = matchRef.current
      if (!scene || !match) return

      setMatchPhase('lit')
      setGate('matchLit', true)
      dragRef.current.active = false

      if (prefersReducedMotion) {
        settleLit()
        setGate('cigaretteLit', true)
        return
      }

      const sparkAtHead = () => {
        const head = headRef.current
        if (!head) return
        const box = head.getBoundingClientRect()
        burstSparks({
          x: box.left + box.width / 2,
          y: box.top + box.height / 2,
        })
      }

      const moveToCigarette = () => {
        const liveMatch = matchRef.current
        const cigTip = cigTipRef.current
        if (!liveMatch || !cigTip) return
        const matchBox = liveMatch.getBoundingClientRect()
        const tipBox = cigTip.getBoundingClientRect()
        const currentX = Number(gsap.getProperty(liveMatch, 'x')) || 0
        const currentY = Number(gsap.getProperty(liveMatch, 'y')) || 0
        const headX = matchBox.left + matchBox.width * 0.9
        const headY = matchBox.top + matchBox.height * 0.5
        const tipX = tipBox.left + tipBox.width / 2
        const tipY = tipBox.top + tipBox.height / 2
        gsap.to(liveMatch, {
          x: currentX + (tipX - headX),
          y: currentY + (tipY - headY),
          rotation: -12,
          duration: 0.42,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      }

      igniteRef.current?.kill()
      const timeline = gsap.timeline({ onComplete: startLoops })
      igniteRef.current = timeline

      if (mode === 'control') {
        const striker = strikerRef.current
        if (striker) {
          const matchBox = match.getBoundingClientRect()
          const strip = striker.getBoundingClientRect()
          const travelX =
            strip.left + strip.width * 0.62 - (matchBox.left + matchBox.width * 0.9)
          const travelY =
            strip.top + strip.height * 0.45 - (matchBox.top + matchBox.height * 0.5)
          timeline.to(match, {
            x: `+=${travelX}`,
            y: `+=${travelY}`,
            duration: 0.3,
            ease: 'power2.in',
          })
        }
        timeline.add(sparkAtHead, 0.26)
      } else {
        timeline.add(sparkAtHead, 0)
      }

      timeline.to(
        scene.querySelectorAll('.match-flame, .match-glow'),
        { opacity: 1, duration: 0.16, ease: 'power1.out' },
        mode === 'control' ? 0.22 : 0,
      )
      timeline.to(
        scene.querySelector('.match-head-detail ellipse'),
        { fill: '#8a3a1f', duration: 0.12 },
        mode === 'control' ? 0.22 : 0,
      )
      timeline.add(moveToCigarette, mode === 'control' ? 0.34 : 0.12)
      timeline.to(
        scene.querySelectorAll('.cig-ember, .cig-glow'),
        { opacity: 1, duration: 0.22, ease: 'power1.out' },
        mode === 'control' ? 0.68 : 0.48,
      )
      timeline.to(
        scene.querySelector('.cig-tip-fill'),
        { fill: '#8a3a1f', duration: 0.18 },
        mode === 'control' ? 0.68 : 0.48,
      )
      timeline.add(() => setGate('cigaretteLit', true), mode === 'control' ? 0.74 : 0.54)
    },
    [burstSparks, prefersReducedMotion, setGate, setMatchPhase, settleLit, startLoops],
  )

  useEffect(() => {
    return () => {
      flickerRef.current?.kill()
      smokeRef.current?.kill()
      igniteRef.current?.kill()
    }
  }, [])

  useLayoutEffect(() => {
    const match = matchRef.current
    if (match) {
      gsap.set(match, { x: 0, y: 0, rotation: pointerMode === 'coarse' ? -2 : -8 })
    }

    const scene = sceneRef.current
    if (!scene || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(scene.querySelectorAll('.match-reveal'), {
        y: 16,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scene,
          start: 'top 82%',
          once: true,
        },
      })
    }, scene)

    return () => {
      ctx.revert()
    }
  }, [pointerMode, prefersReducedMotion])

  const markScratch = (head: DOMRect, amount: number) => {
    const scratches = scratchesRef.current
    const striker = strikerRef.current
    if (!scratches || !striker || prefersReducedMotion) return
    const marks = scratches.querySelectorAll<HTMLElement>('.match-scratch')
    const index = Math.min(
      marks.length - 1,
      Math.floor(amount / Math.max(12, 64 / marks.length)),
    )
    const mark = marks[index]
    if (!mark || mark.dataset.shown === 'true') return
    const strip = striker.getBoundingClientRect()
    mark.dataset.shown = 'true'
    mark.style.left = `${((head.left + head.width / 2 - strip.left) / strip.width) * 100}%`
    mark.style.opacity = '0.7'
  }

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (phaseRef.current === 'lit') return
    const match = matchRef.current
    if (!match) return

    match.setPointerCapture(event.pointerId)
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: Number(gsap.getProperty(match, 'x')) || 0,
      originY: Number(gsap.getProperty(match, 'y')) || 0,
      lastX: event.clientX,
      lastY: event.clientY,
      friction: 0,
      moved: 0,
      lastTime: event.timeStamp,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    if (!drag.active || event.pointerId !== drag.pointerId) return
    if (phaseRef.current === 'lit') return

    const match = matchRef.current
    const stage = stageRef.current
    const head = headRef.current
    const striker = strikerRef.current
    if (!match || !stage) return

    const x = drag.originX + event.clientX - drag.startX
    const y = drag.originY + event.clientY - drag.startY

    gsap.set(match, {
      x,
      y,
      rotation: pointerMode === 'coarse' ? -2 : -8 + clamp((event.clientY - drag.startY) * 0.04, -6, 6),
    })

    const stageBox = stage.getBoundingClientRect()
    const matchBox = match.getBoundingClientRect()
    const pad = 6
    let corrX = 0
    let corrY = 0
    if (matchBox.left < stageBox.left + pad) corrX = stageBox.left + pad - matchBox.left
    if (matchBox.right > stageBox.right - pad) corrX = stageBox.right - pad - matchBox.right
    if (matchBox.top < stageBox.top + pad) corrY = stageBox.top + pad - matchBox.top
    if (matchBox.bottom > stageBox.bottom - pad) corrY = stageBox.bottom - pad - matchBox.bottom
    if (corrX || corrY) {
      gsap.set(match, {
        x: x + corrX,
        y: y + corrY,
      })
    }

    const step = Math.hypot(event.clientX - drag.lastX, event.clientY - drag.lastY)
    drag.moved += step
    drag.lastX = event.clientX
    drag.lastY = event.clientY

    if (drag.moved > TAP_SLOP && phaseRef.current === 'unlit') {
      setMatchPhase('striking')
    }

    if (head && striker && overlaps(head.getBoundingClientRect(), striker.getBoundingClientRect())) {
      const dt = Math.max(16, event.timeStamp - drag.lastTime)
      drag.lastTime = event.timeStamp
      const speedBoost = step / dt > 0.7 ? 1.45 : 1
      drag.friction += step * speedBoost
      markScratch(head.getBoundingClientRect(), drag.friction)
      const threshold = pointerMode === 'coarse' ? 52 : 64
      if (drag.friction >= threshold) {
        ignite('drag')
      }
    }
  }

  const endDrag = (event: PointerEvent<HTMLButtonElement>, cancelled: boolean) => {
    const drag = dragRef.current
    if (!drag.active || event.pointerId !== drag.pointerId) return
    drag.active = false

    if (phaseRef.current === 'lit') return

    if (!cancelled && drag.moved < TAP_SLOP) {
      ignite('control')
      return
    }

    setMatchPhase('unlit')
    restMatch()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    ignite('control')
  }

  const status = phase === 'lit' ? `${copy.match.matchLit} ${copy.match.cigaretteLit}` : ''

  return (
    <section
      ref={sceneRef}
      id="match-scene"
      className={cx(
        'match-scene',
        performanceTier === 'light' && 'is-light',
        `is-${phase}`,
      )}
      data-match-phase={phase}
      aria-labelledby="match-heading"
    >
      <div className="match-well">
        <header className="match-copy match-reveal">
          <p className="match-kicker">{copy.match.kicker}</p>
          <h2 id="match-heading" className="match-instruction">
            {copy.match.instruction}
          </h2>
        </header>

        <div ref={stageRef} className="match-stage match-reveal">
          <div className="match-table" aria-hidden="true" />
          <div className="match-table-hatch" aria-hidden="true" />

          <div className="match-cig-slot">
            <span className="cig-ashtray" aria-hidden="true" />
            <Cigarette />
            <span ref={cigTipRef} className="cig-tip-hotspot" aria-hidden="true">
              <CigarettePlume count={performanceTier === 'light' ? 5 : 8} />
            </span>
            <span className="match-object-shadow match-cig-shadow" aria-hidden="true" />
          </div>

          <div className="match-box-slot">
            <MatchStriker />
            <div ref={strikerRef} className="match-striker-surface" aria-hidden="true" />
            <div ref={scratchesRef} className="match-scratches" aria-hidden="true">
              {Array.from({ length: SCRATCH_COUNT }, (_, index) => (
                <span key={index} className="match-scratch" />
              ))}
            </div>
            <span className="match-object-shadow match-box-shadow" aria-hidden="true" />
          </div>

          <button
            ref={matchRef}
            type="button"
            className="match-hit"
            aria-label={`${copy.strikeHint}. ${copy.match.control}`}
            aria-pressed={phase === 'lit'}
            aria-describedby="match-status"
            disabled={phase === 'lit'}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(event) => endDrag(event, false)}
            onPointerCancel={(event) => endDrag(event, true)}
            onClick={(event) => {
              if (dragRef.current.moved >= TAP_SLOP) {
                event.preventDefault()
                event.stopPropagation()
              }
            }}
            onKeyDown={onKeyDown}
          >
            <Matchstick />
            <span ref={headRef} className="match-head-hotspot" aria-hidden="true" />
          </button>

          <div ref={sparksRef} className="match-sparks" aria-hidden="true">
            {Array.from({ length: SPARK_COUNT }, (_, index) => (
              <span key={index} className="match-spark" />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="match-strike-control match-reveal"
          onClick={() => ignite('control')}
          onKeyDown={onKeyDown}
          disabled={phase === 'lit'}
        >
          {copy.match.control}
        </button>

        {phase === 'lit' ? (
          <p className="match-explore">{copy.projects.explore}</p>
        ) : null}

        <p id="match-status" className="match-status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  )
}
