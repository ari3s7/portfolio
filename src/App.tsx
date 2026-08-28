import { Atmosphere } from '@/components/atmosphere/Atmosphere'
import { ChamberSketch } from '@/components/atmosphere/ChamberSketch'
import { SmokeField } from '@/components/atmosphere/SmokeField'
import { DocumentMeta } from '@/components/chrome/DocumentMeta'
import { InkCursor } from '@/components/chrome/InkCursor'
import { WatchNav } from '@/components/chrome/WatchNav'
import { Contact } from '@/components/sections/Contact'
import { Deal } from '@/components/sections/Deal'
import { Decide } from '@/components/sections/Decide'
import { Experience } from '@/components/sections/Experience'
import { MatchScene } from '@/components/sections/MatchScene'
import { Newspaper } from '@/components/sections/Newspaper'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { useSectionSpy } from '@/hooks/useSectionSpy'
import { HeroCap } from '@/sections/HeroCap'
import { ExperienceProvider } from '@/state/ExperienceProvider'
import { useExperience } from '@/state/useExperience'

function SiteChrome() {
  const { hasEntered, setActiveSection } = useExperience()
  useSectionSpy({ enabled: hasEntered, setActiveSection })
  return (
    <>
      <WatchNav />
      <InkCursor />
    </>
  )
}

export default function App() {
  return (
    <ExperienceProvider>
      <DocumentMeta />
      <Atmosphere />
      <SiteChrome />
      <HeroCap />
      <main id="content" tabIndex={-1}>
        <Newspaper />
        <div className="noir-continuation">
          <div className="smoke-chamber">
            <ChamberSketch />
            <MatchScene />
            <Projects />
            <SmokeField />
          </div>
          <Skills />
          <Experience />
          <Decide />
          <Deal />
          <Contact />
        </div>
      </main>
    </ExperienceProvider>
  )
}
