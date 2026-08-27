import { useEffect, useId, useRef, useState } from 'react'
import { CompassWatch } from '@/components/objects/CompassWatch'
import { SoundToggle } from '@/components/chrome/SoundToggle'
import { copy, navigation } from '@/data'
import { goToSection } from '@/lib/goToSection'
import { playTick } from '@/lib/sound'
import { cx } from '@/lib/cx'
import { useExperience } from '@/state/useExperience'
import type { SectionId } from '@/state/types'

export function WatchNav() {
  const listId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const {
    hasEntered,
    activeSection,
    setActiveSection,
    prefersReducedMotion,
    soundEnabled,
  } = useExperience()

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('.watch-nav')) return
      setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  if (!hasEntered) return null

  const jump = (target: SectionId) => {
    if (soundEnabled) playTick()
    goToSection(target, { prefersReducedMotion, setActiveSection })
    setOpen(false)
  }

  return (
    <div className="chrome-rail">
      <nav className={cx('watch-nav', open && 'is-open')} aria-label={copy.chrome.nav}>
        <button
          ref={toggleRef}
          type="button"
          className="watch-nav-toggle"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={open ? copy.chrome.close : copy.chrome.open}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            setOpen((current) => !current)
          }}
        >
          <CompassWatch />
        </button>

        {open ? (
          <ul id={listId} className="watch-nav-list">
            {navigation.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={cx(
                    'watch-nav-link',
                    activeSection === item.id && 'is-current',
                  )}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  onClick={() => jump(item.id)}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return
                    event.preventDefault()
                    jump(item.id)
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>

      <SoundToggle />
    </div>
  )
}
