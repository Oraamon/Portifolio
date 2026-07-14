import { motion } from 'framer-motion'

interface StatBarProps {
  label?: string
  value: number
  max: number
  type: 'hp' | 'mp' | 'ct'
  compact?: boolean
  showLabel?: boolean
}

const barConfig = {
  hp: { fill: 'fft-bar-hp', text: 'Hp' },
  mp: { fill: 'fft-bar-mp', text: 'Mp' },
  ct: { fill: 'fft-bar-ct', text: 'Ct' },
}

export function StatBar({
  label,
  value,
  max,
  type,
  compact = false,
  showLabel = true,
}: StatBarProps) {
  const pct = Math.min(100, (value / max) * 100)
  const config = barConfig[type]
  const displayValue =
    type === 'ct' && value === 0 ? '--- / ---' : `${value} / ${max}`

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 w-full">
        <span className="text-fft-text fft-ui-text-sm font-semibold w-5 shrink-0">
          {config.text}
        </span>
        <div className="flex-1 h-3 fft-bar-track relative overflow-hidden min-w-0">
          <motion.div
            className={`fft-bar-fill ${config.fill}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-fft-text fft-ui-text-sm tabular-nums whitespace-nowrap text-[0.7rem]">
          {displayValue}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-fft-text fft-ui-text font-semibold w-7 shrink-0">
          {config.text}
        </span>
      )}
      <div className="flex-1">
        {label && !compact && (
          <span className="text-fft-text-dim fft-ui-text-sm block mb-0.5">{label}</span>
        )}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-4 fft-bar-track relative overflow-hidden">
            <motion.div
              className={`fft-bar-fill ${config.fill}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <span className="text-fft-text fft-ui-text-sm tabular-nums w-16 text-right shrink-0">
            {displayValue}
          </span>
        </div>
      </div>
    </div>
  )
}
