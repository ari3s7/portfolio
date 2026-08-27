let context: AudioContext | null = null

function getContext(): AudioContext | null {
  const Ctor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  context ??= new Ctor()
  return context
}

export function playTick(): void {
  const audio = getContext()
  if (!audio) return

  if (audio.state === 'suspended') {
    void audio.resume()
  }

  const now = audio.currentTime
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(196, now)
  gain.gain.setValueAtTime(0.035, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
  oscillator.connect(gain)
  gain.connect(audio.destination)
  oscillator.start(now)
  oscillator.stop(now + 0.08)
}

export function disposeSound(): void {
  if (!context) return
  void context.close()
  context = null
}
