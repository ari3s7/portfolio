export function onResize(handler: () => void): () => void {
  let frame = 0

  const onWindowResize = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      handler()
    })
  }

  window.addEventListener('resize', onWindowResize, { passive: true })

  return () => {
    window.removeEventListener('resize', onWindowResize)
    if (frame) cancelAnimationFrame(frame)
  }
}
