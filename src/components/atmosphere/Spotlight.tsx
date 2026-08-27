import { cx } from '@/lib/cx'

type SpotlightProps = {
  className?: string
}

export function Spotlight({ className }: SpotlightProps) {
  return (
    <div className={cx('atmosphere-spotlight', className)} aria-hidden="true">
      <span className="atmosphere-spotlight-falloff" />
      <span className="atmosphere-spotlight-beam" />
      <span className="atmosphere-spotlight-core" />
      <span className="atmosphere-spotlight-pool" />
    </div>
  )
}
