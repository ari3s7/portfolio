import { useEffect, useRef, type KeyboardEvent } from 'react'
import { VintageCoinFace } from '@/components/objects/VintageCoin'
import { copy } from '@/data'
import { useCoinToss } from '@/hooks/useCoinToss'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

export function Decide() {
  const sectionRef = useRef<HTMLElement>(null)
  const coinRef = useRef<HTMLSpanElement>(null)
  const liftRef = useRef<HTMLSpanElement>(null)
  const shadowRef = useRef<HTMLSpanElement>(null)
  const { prefersReducedMotion, performanceTier, pointerMode, setActiveSection } =
    useExperience()

  const { phase, toss } = useCoinToss({
    coinRef,
    liftRef,
    shadowRef,
    reducedMotion: prefersReducedMotion,
    light: performanceTier === 'light',
  })

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#decide') return
    setActiveSection('decide')
    sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [setActiveSection])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    toss()
  }

  const tossed = phase === 'heads'
  const tossing = phase === 'tossing'

  return (
    <section
      ref={sectionRef}
      id="decide"
      className={cx(
        'decide-scene',
        tossed && 'is-decided',
        tossing && 'is-tossing',
        performanceTier === 'light' && 'is-light',
        pointerMode === 'coarse' && 'is-touch',
      )}
      aria-labelledby="decide-heading"
      tabIndex={-1}
    >
      <div className="decide-hatch" aria-hidden="true" />
      <div className="decide-vignette" aria-hidden="true" />

      <div className="decide-well">
        <header className="decide-copy">
          <p className="decide-kicker">{copy.decide.kicker}</p>
          <h2 id="decide-heading" className="decide-heading letterpress">
            {copy.decide.heading}
          </h2>
          <p className="decide-stakes">
            <span>
              {copy.decide.headsLabel} — {copy.decide.headsStake}
            </span>
            <span>
              {copy.decide.tailsLabel} — {copy.decide.tailsStake}
            </span>
          </p>
        </header>

        <div className="decide-stage">
          <button
            type="button"
            className="decide-trigger"
            aria-label={tossing ? copy.decide.tossing : copy.decide.toss}
            aria-describedby="decide-status"
            disabled={tossing}
            onClick={toss}
            onKeyDown={onKeyDown}
          >
            <span ref={shadowRef} className="decide-shadow" aria-hidden="true" />
            <span ref={liftRef} className="decide-lift">
              <span ref={coinRef} className="decide-coin">
                <span className="decide-face decide-face-heads">
                  <VintageCoinFace face="heads" />
                </span>
                <span className="decide-face decide-face-tails">
                  <VintageCoinFace face="tails" />
                </span>
              </span>
            </span>
          </button>
        </div>

        <div id="decide-status" className="decide-result" aria-live="polite">
          {tossed ? (
            <>
              <p className="decide-result-lead letterpress">{copy.decide.result}</p>
              <p className="decide-result-aside">{copy.decide.aside}</p>
            </>
          ) : tossing ? (
            <p className="decide-instruction">{copy.decide.tossing}</p>
          ) : (
            <p className="decide-instruction">{copy.decide.instruction}</p>
          )}
        </div>
      </div>
    </section>
  )
}
