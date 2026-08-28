import { useEffect, useRef, type KeyboardEvent } from 'react'
import { EnvelopeBodyArt, EnvelopeFlapArt } from '@/components/objects/LetterEnvelope'
import { WaxSeal } from '@/components/objects/WaxSeal'
import { copy, socials } from '@/data'
import { useContactScene } from '@/hooks/useContactScene'
import { contactChannels } from '@/lib/contactChannels'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { prefersReducedMotion, performanceTier, pointerMode, setActiveSection } =
    useExperience()
  const channels = contactChannels(socials)

  const { opened, opening, open } = useContactScene({
    sectionRef,
    reducedMotion: prefersReducedMotion,
  })

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#contact') return
    setActiveSection('contact')
    sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [setActiveSection])

  const onSealKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    open()
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={cx(
        'finale-scene',
        opened && 'is-open',
        opening && 'is-opening',
        performanceTier === 'light' && 'is-light',
        pointerMode === 'coarse' && 'is-touch',
      )}
      aria-labelledby="contact-heading"
      tabIndex={-1}
    >
      <div className="finale-hatch" aria-hidden="true" />
      <div className="finale-vignette" aria-hidden="true" />

      <div className="finale-well">
        <header className="letter-head">
          <p className="letter-kicker">{copy.contact.kicker}</p>
          <h2 id="contact-heading" className="letter-heading letterpress">
            {copy.contact.heading}
          </h2>
        </header>

        <div className="letter-stage">
          <div className="letter-desk" aria-hidden="true" />

          <div className="letter-rig">
            <div className="letter-envelope">
              <div className="letter-body" aria-hidden="true">
                <EnvelopeBodyArt />
                <div className="letter-body-fiber" />
              </div>

              <div className="letter-mouth">
                <article
                  id="contact-letter"
                  className="letter-sheet"
                  aria-hidden={!opened ? true : undefined}
                  inert={!opened ? true : undefined}
                >
                  <div className="letter-fiber" aria-hidden="true" />
                  <div className="letter-hatch" aria-hidden="true" />
                  <div className="letter-folds" aria-hidden="true" />
                  <p className="letter-closing letter-reveal">{copy.contact.closing}</p>

                  {channels.length > 0 ? (
                    <nav className="letter-channels" aria-label={copy.contact.channels}>
                      <ul>
                        {channels.map((channel) => (
                          <li key={channel.id} className="letter-reveal">
                            <p className="letter-channel-label">{channel.label}</p>
                            <a
                              className="letter-link"
                              href={channel.href}
                              {...(channel.external
                                ? { target: '_blank', rel: 'noreferrer noopener' }
                                : {})}
                            >
                              {channel.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  ) : null}

                  <p className="letter-order letter-reveal">{copy.contact.order}</p>
                </article>
              </div>

              <div className="letter-front" aria-hidden="true">
                <div className="letter-front-fiber" />
                <p className="letter-address">{copy.contact.heading}</p>
              </div>

              <div className="letter-flap">
                <div className="letter-flap-visual" aria-hidden="true">
                  <EnvelopeFlapArt />
                  <div className="letter-flap-back" />
                </div>
                <button
                  type="button"
                  className="letter-seal"
                  aria-label={opening ? copy.contact.opening : copy.contact.open}
                  aria-expanded={opened || opening}
                  aria-controls="contact-letter"
                  tabIndex={opened ? -1 : 0}
                  disabled={opened || opening}
                  onClick={open}
                  onKeyDown={onSealKeyDown}
                >
                  <WaxSeal />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="letter-instruction" hidden={opened || opening}>
          {copy.contact.instruction}
        </p>
      </div>
    </section>
  )
}
