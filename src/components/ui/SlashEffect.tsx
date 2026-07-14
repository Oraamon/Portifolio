import { useEffect, useState } from 'react'
import { asset } from '../../utils/assets'

type SlashStyle = 1 | 2 | 3
type SlashColor = 1 | 2 | 3 | 4 | 5

interface SlashStyleConfig {
  folder: string
  prefix: string
  frames: number
  framesDir: string
}

const STYLE_CONFIG: Record<SlashStyle, SlashStyleConfig> = {
  1: { folder: 'Slash 1', prefix: 'Slash_color', frames: 9, framesDir: 'Frames' },
  2: { folder: 'Slash 2', prefix: 'Slash2_color', frames: 7, framesDir: 'Frames' },
  3: { folder: 'Slash 3', prefix: 'Slash3_color', frames: 9, framesDir: 'frames' },
}

const STYLES: SlashStyle[] = [1, 2, 3]
const COLORS: SlashColor[] = [1, 2, 3, 4, 5]

// Every style/color combination (15 total), cycled through on each attack.
export const SLASH_COMBOS: { style: SlashStyle; color: SlashColor }[] = STYLES.flatMap(
  (style) => COLORS.map((color) => ({ style, color })),
)

export function slashComboFromKey(attackKey: number): number {
  const count = SLASH_COMBOS.length
  return (((attackKey - 1) % count) + count) % count
}

const FRAME_DURATION_MS = 55

interface SlashEffectProps {
  combo?: number
  damage?: number
}

export function SlashEffect({ combo = 0, damage }: SlashEffectProps) {
  const { style, color } = SLASH_COMBOS[combo] ?? SLASH_COMBOS[0]
  const config = STYLE_CONFIG[style]
  const [frame, setFrame] = useState(1)

  useEffect(() => {
    setFrame(1)
    const interval = window.setInterval(() => {
      setFrame((current) => {
        if (current >= config.frames) {
          window.clearInterval(interval)
          return current
        }
        return current + 1
      })
    }, FRAME_DURATION_MS)

    return () => window.clearInterval(interval)
  }, [config.frames, combo])

  const file = `${config.prefix}${color}_frame${frame}.png`
  const path = (size: string) =>
    asset(
      `sprites/effects/slash/${size}/${encodeURIComponent(config.folder)}/color${color}/${config.framesDir}/${file}`,
    )

  return (
    <>
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none fft-slash-pop">
        <img
          src={path('64x64')}
          alt=""
          className="block md:hidden w-28 h-28 max-w-none fft-pixelated"
          aria-hidden="true"
        />
        <img
          src={path('128x128')}
          alt=""
          className="hidden md:block w-36 h-36 max-w-none fft-pixelated"
          aria-hidden="true"
        />
      </div>

      {damage != null && (
        <div className="absolute left-1/2 top-0 z-40 -translate-x-1/2 pointer-events-none fft-damage-float">
          <span className="fft-ui-text font-bold text-[#ffe060] text-2xl tabular-nums">
            {damage}
          </span>
        </div>
      )}
    </>
  )
}
