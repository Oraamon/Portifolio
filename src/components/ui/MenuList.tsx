import { useSound } from '../../context/SoundContext'
import { HandCursor } from './HandCursor'

interface MenuListProps {
  items: { label: string; route: string }[]
  selectedIndex: number
  onSelect: (index: number) => void
  onConfirm: (route: string) => void
  className?: string
}

export function MenuList({
  items,
  selectedIndex,
  onSelect,
  onConfirm,
  className = '',
}: MenuListProps) {
  const { playCursor, playConfirm } = useSound()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      playCursor()
      onSelect(selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      playCursor()
      onSelect(selectedIndex >= items.length - 1 ? 0 : selectedIndex + 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      playConfirm()
      onConfirm(items[selectedIndex].route)
    }
  }

  return (
    <div
      className={`fft-window w-[148px] ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="menu"
    >
      <div className="fft-window-header px-3 py-1.5 text-center">
        <span className="text-fft-text fft-ui-text font-semibold">Menu</span>
      </div>
      <ul className="py-1">
        {items.map((item, index) => (
          <li
            key={item.route}
            className={`fft-menu-item fft-ui-text-sm py-1 pr-3 cursor-pointer flex items-center gap-1 ${
              index === selectedIndex ? 'selected font-semibold' : 'text-fft-text'
            }`}
            onMouseEnter={() => {
              if (index !== selectedIndex) {
                playCursor()
                onSelect(index)
              }
            }}
            onClick={() => {
              playConfirm()
              onConfirm(item.route)
            }}
          >
            {index === selectedIndex && (
              <span className="absolute left-1 top-1/2 -translate-y-1/2">
                <HandCursor />
              </span>
            )}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
