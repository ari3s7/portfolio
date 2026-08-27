import { useEffect } from 'react'
import { copy } from '@/data'
import { disposeSound, playTick } from '@/lib/sound'
import { useExperience } from '@/state/useExperience'

export function SoundToggle() {
  const { soundEnabled, setSoundEnabled } = useExperience()

  useEffect(() => {
    return () => disposeSound()
  }, [])

  const toggle = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    if (next) playTick()
  }

  return (
    <button
      type="button"
      className="sound-toggle"
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? copy.chrome.soundOn : copy.chrome.soundOff}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        toggle()
      }}
    >
      <span className="sound-toggle-mark" aria-hidden="true">
        {soundEnabled ? '♪' : '×'}
      </span>
      <span className="sound-toggle-copy">
        {soundEnabled ? copy.chrome.soundOn : copy.chrome.soundOff}
      </span>
    </button>
  )
}
