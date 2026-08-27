import { useEffect, useRef } from 'react'
import { FinaleSilhouette } from '@/components/objects/FinaleSilhouette'
import { copy, personal, socials } from '@/data'
import { useContactScene } from '@/hooks/useContactScene'
import { contactChannels, visiblePlace } from '@/lib/contactChannels'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { prefersReducedMotion, performanceTier, pointerMode, setActiveSection } =
    useExperience()
  const channels = contactChannels(socials)
  const place = visiblePlace(personal.location)

  useContactScene({
    sectionRef,
    reducedMotion: prefersReducedMotion,
    light: performanceTier === 'light',
  })

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#contact') return
    setActiveSection('contact')
    sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [setActiveSection])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={cx(
        'finale-scene',
        performanceTier === 'light' && 'is-light',
        pointerMode === 'coarse' && 'is-touch',
      )}
      aria-labelledby="contact-heading"
      tabIndex={-1}
    >
      <div className="finale-hatch" aria-hidden="true" />
      <div className="finale-vignette" aria-hidden="true" />

      <div className="finale-well">
        <div className="finale-layout">
          <div className="finale-copy">
            <header className="finale-head">
              <p className="finale-kicker">{copy.contact.kicker}</p>
              <h2 id="contact-heading" className="finale-heading letterpress">
                {copy.contact.heading}
              </h2>
            </header>

            <p className="finale-tagline letterpress">{copy.contactTagline}</p>

            {place ? <p className="finale-place">{place}</p> : null}

            <p className="finale-sign">{personal.name}</p>

            {channels.length > 0 ? (
              <nav className="finale-channels" aria-label={copy.contact.channels}>
                <ul>
                  {channels.map((channel) => (
                    <li key={channel.id}>
                      <p className="finale-channel-label">{channel.label}</p>
                      <a
                        className="finale-link"
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
          </div>

          <div className="finale-art">
            <FinaleSilhouette />
          </div>
        </div>
      </div>
    </section>
  )
}
