import { InteractiveButton } from '@/components/ui/InteractiveButton'
import { copy } from '@/data'

type SkipInteractionProps = {
  onSkip: () => void
}

export function SkipInteraction({ onSkip }: SkipInteractionProps) {
  return (
    <InteractiveButton onClick={onSkip}>
      {copy.skipInteraction}
    </InteractiveButton>
  )
}
