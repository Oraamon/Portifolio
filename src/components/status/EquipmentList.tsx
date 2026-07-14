import type { EquipmentItem, EquipmentSlot } from '../../types/portfolio'

const slotIcons: Record<EquipmentSlot, string> = {
  shield: '⛨',
  weapon: '⚔',
  helm: '🪖',
  armor: '🛡',
  accessory: '💍',
}

interface EquipmentListProps {
  title?: string
  items: EquipmentItem[]
  selectedIndex?: number
  onSelect?: (index: number) => void
}

function ItemIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" fill={color} stroke="#3d3428" strokeWidth="1" />
      <rect x="4" y="4" width="4" height="4" fill="rgba(255,255,255,0.35)" />
    </svg>
  )
}

function SlotIcon({ slot }: { slot: EquipmentSlot }) {
  return (
    <span className="w-5 text-center text-[0.65rem] shrink-0 opacity-70" aria-hidden="true">
      {slotIcons[slot]}
    </span>
  )
}

export function EquipmentList({
  title = 'EQP',
  items,
  selectedIndex = 0,
  onSelect,
}: EquipmentListProps) {
  return (
    <div className="fft-window flex-1 flex flex-col min-h-0 min-w-0">
      <div className="fft-window-header px-3 py-1">
        <span className="text-fft-text fft-ui-text font-bold tracking-widest">{title}</span>
      </div>
      <ul className="flex-1 overflow-y-auto py-1">
        {items.map((item, index) => (
          <li
            key={`${item.slot}-${item.name}`}
            className={`flex items-center gap-2 px-2 py-1 cursor-pointer fft-ui-text-sm ${
              index === selectedIndex ? 'bg-white/40' : 'hover:bg-white/20'
            }`}
            onMouseEnter={() => onSelect?.(index)}
            onClick={() => onSelect?.(index)}
          >
            <SlotIcon slot={item.slot} />
            <ItemIcon color={item.color} />
            <div className="min-w-0 flex-1">
              <span className="text-fft-text truncate block">{item.name}</span>
              {item.subtitle && (
                <span className="text-fft-text-dim text-[0.7rem] truncate block">
                  {item.subtitle}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
