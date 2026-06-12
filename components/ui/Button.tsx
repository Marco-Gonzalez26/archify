import React, { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClass = `btn--${variant}`
    const sizeClass = `btn--${size}`
    const fullWidthClass = fullWidth ? 'btn--full-width' : ''

    const combinedClassName = [
      'btn',
      variantClass,
      sizeClass,
      fullWidthClass,
      className
    ]
      .filter(Boolean)
      .join(' ')

    return <button ref={ref} className={combinedClassName} {...props} />
  }
)

Button.displayName = 'Button'

export default Button
