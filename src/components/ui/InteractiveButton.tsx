import type { ButtonHTMLAttributes } from 'react'
import { cx } from '@/lib/cx'

type InteractiveButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function InteractiveButton({
  className,
  type = 'button',
  ...props
}: InteractiveButtonProps) {
  return (
    <button
      type={type}
      className={cx('interactive-control', className)}
      {...props}
    />
  )
}
