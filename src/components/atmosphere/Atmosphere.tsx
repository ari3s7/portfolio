import { Grain } from '@/components/atmosphere/Grain'
import { Motes } from '@/components/atmosphere/Motes'
import { PaperTexture } from '@/components/atmosphere/PaperTexture'
import { Vignette } from '@/components/atmosphere/Vignette'
import { WorldField } from '@/components/atmosphere/WorldField'

export function Atmosphere() {
  return (
    <>
      <WorldField />
      <div className="world-fiber" aria-hidden="true" />
      <div className="world-stain" aria-hidden="true" />
      <div className="world-scratch" aria-hidden="true" />
      <div className="world-halftone" aria-hidden="true" />
      <Vignette />
      <PaperTexture />
      <Grain />
      <Motes />
    </>
  )
}
