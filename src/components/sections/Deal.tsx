import { useEffect, useRef, type KeyboardEvent } from 'react'
import { DealDeskProps, WhiskeyGlass } from '@/components/objects/WhiskeyGlass'
import { copy } from '@/data'
import { useDealScene } from '@/hooks/useDealScene'
import { cx } from '@/lib/cx'
import { goToSection } from '@/lib/goToSection'
import { useExperience } from '@/state/useExperience'

export function Deal() {
  const sectionRef = useRef<HTMLElement>(null)
  const glassRef = useRef<HTMLSpanElement>(null)
  const { prefersReducedMotion, performanceTier, pointerMode, setActiveSection } =
    useExperience()

  const { phase, offered, play } = useDealScene({
    glassRef,
    reducedMotion: prefersReducedMotion,
  })

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#deal') return
    setActiveSection('deal')
    sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [setActiveSection])

  const onGlassKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    play()
  }

  const makeDeal = () => {
    goToSection('contact', { prefersReducedMotion, setActiveSection })
  }

  const onCtaKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    makeDeal()
  }

  const playing = phase === 'playing'

  return (
    <section
      ref={sectionRef}
      id="deal"
      className={cx(
        'deal-scene',
        offered && 'is-dealt',
        playing && 'is-playing',
        performanceTier === 'light' && 'is-light',
        pointerMode === 'coarse' && 'is-touch',
      )}
      aria-labelledby="deal-heading"
      tabIndex={-1}
    >
      <div className="deal-hatch" aria-hidden="true" />
      <div className="deal-vignette" aria-hidden="true" />

      <div className="deal-well">
        <header className="deal-copy">
          <p className="deal-kicker">{copy.deal.kicker}</p>
          <h2 id="deal-heading" className="deal-heading letterpress">
            {copy.deal.heading}
          </h2>
          <p className="deal-lead">{copy.deal.lead}</p>
        </header>

        <div className="deal-stage">
          <div className="deal-desk" aria-hidden="true" />
          <DealDeskProps />
          <svg
            className="deal-smoke"
            viewBox="0 0 220 180"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="deal-wisp deal-wisp-a"
              d="M108 170C96 132 124 118 112 78C102 48 128 32 118 8"
              stroke="#ead9b8"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              className="deal-wisp deal-wisp-b"
              d="M128 168C140 128 116 110 132 76C146 46 122 28 136 6"
              stroke="#c4a574"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              className="deal-wisp deal-wisp-c"
              d="M118 166C110 124 134 108 120 70"
              stroke="#d2c19a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          <button
            type="button"
            className="deal-trigger"
            aria-label={playing ? copy.deal.pouring : copy.deal.tap}
            aria-expanded={offered}
            aria-controls="deal-offer"
            disabled={playing}
            onClick={play}
            onKeyDown={onGlassKeyDown}
          >
            <span ref={glassRef} className="deal-glass">
              <WhiskeyGlass />
            </span>
          </button>
        </div>

        <div id="deal-offer" className="deal-offer" aria-live="polite">
          {offered ? (
            <>
              <p className="deal-line deal-line-one letterpress">{copy.deal.lineOne}</p>
              <p className="deal-line deal-line-two letterpress">{copy.deal.lineTwo}</p>
              <button
                type="button"
                className="deal-cta interactive-control"
                onClick={makeDeal}
                onKeyDown={onCtaKeyDown}
              >
                {copy.deal.cta}
              </button>
            </>
          ) : (
            <p className="deal-instruction">{copy.deal.instruction}</p>
          )}
        </div>
      </div>
    </section>
  )
}
