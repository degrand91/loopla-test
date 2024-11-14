import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SpinningLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'accent'
  className?: string
}

export default function SpinningLoader({
  size = 'md',
  color = 'primary',
  className
}: SpinningLoaderProps = {}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent'
  }

  return (
    <div
      role="status"
      className={cn(
        "animate-spin",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      <Loader2 className="w-full h-full" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}