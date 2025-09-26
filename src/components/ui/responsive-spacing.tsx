import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveSpacingProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  padding?: {
    x?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    y?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    all?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  }
  margin?: {
    x?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    y?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    all?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  }
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function ResponsiveSpacing({
  children,
  className,
  as: Component = 'div',
  padding,
  margin,
  gap
}: ResponsiveSpacingProps) {
  const spacingClasses = {
    none: '',
    sm: 'sm:space-2',
    md: 'space-2 sm:space-4',
    lg: 'space-4 sm:space-6',
    xl: 'space-6 sm:space-8'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-2 sm:px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  }

  const marginClasses = {
    none: '',
    sm: 'mx-2 sm:mx-4',
    md: 'mx-4 sm:mx-6 lg:mx-8',
    lg: 'mx-6 sm:mx-8 lg:mx-12',
    xl: 'mx-8 sm:mx-12 lg:mx-16'
  }

  const paddingYClasses = {
    none: '',
    sm: 'py-2 sm:py-4',
    md: 'py-4 sm:py-6 lg:py-8',
    lg: 'py-6 sm:py-8 lg:py-12',
    xl: 'py-8 sm:py-12 lg:py-16'
  }

  const marginYClasses = {
    none: '',
    sm: 'my-2 sm:my-4',
    md: 'my-4 sm:my-6 lg:my-8',
    lg: 'my-6 sm:my-8 lg:my-12',
    xl: 'my-8 sm:my-12 lg:my-16'
  }

  const classes = [
    padding?.all && paddingClasses[padding.all],
    padding?.x && paddingClasses[padding.x],
    padding?.y && paddingYClasses[padding.y],
    margin?.all && marginClasses[margin.all],
    margin?.x && marginClasses[margin.x],
    margin?.y && marginYClasses[margin.y],
    gap && spacingClasses[gap]
  ].filter(Boolean)

  return (
    <Component
      className={cn(
        ...classes,
        className
      )}
    >
      {children}
    </Component>
  )
}
