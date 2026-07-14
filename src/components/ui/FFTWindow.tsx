import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FFTWindowProps {
  title: string
  children: ReactNode
  className?: string
}

export function FFTWindow({ title, children, className = '' }: FFTWindowProps) {
  return (
    <motion.div
      className={`fft-window ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="fft-window-header px-4 py-1.5">
        <h2 className="text-fft-text fft-ui-text font-semibold tracking-wide">{title}</h2>
      </div>
      <div className="p-3">{children}</div>
    </motion.div>
  )
}

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}
