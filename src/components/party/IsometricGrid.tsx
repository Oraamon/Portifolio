import { AnimatePresence, motion } from 'framer-motion'
import type { PartyMember } from '../../types/portfolio'
import type { CharacterActionState } from '../ui/CharacterPortrait'
import { CharacterSprite } from '../ui/CharacterPortrait'
import { StatBar } from '../ui/StatBar'

export type PartyTabId = 'hp' | 'mp' | 'ct' | 'exp' | 'brfa'

interface IsometricGridProps {
  members: PartyMember[]
  selectedIndex: number
  memberTabs?: Record<string, PartyTabId>
  actionStates?: Record<string, CharacterActionState>
  hpValues?: Record<string, number>
  attackKey?: number
  slashCombo?: number
  damage?: number
  onSelect: (index: number) => void
  onConfirm: (index: number) => void
}

function FloatingStat({
  member,
  activeTab,
  isDead,
  hpValue,
}: {
  member: PartyMember
  activeTab: PartyTabId
  isDead: boolean
  hpValue: number
}) {
  if (activeTab === 'hp') {
    return (
      <StatBar
        type="hp"
        value={isDead ? 0 : hpValue}
        max={member.stats.hp.max}
        compact
      />
    )
  }

  if (activeTab === 'mp') {
    return (
      <StatBar
        type="mp"
        value={member.stats.mp.value}
        max={member.stats.mp.max}
        compact
      />
    )
  }

  if (activeTab === 'ct') {
    return (
      <StatBar
        type="ct"
        value={member.stats.ct.value}
        max={member.stats.ct.max}
        compact
      />
    )
  }

  if (activeTab === 'exp') {
    return (
      <span className="fft-ui-text-sm font-semibold text-fft-text tabular-nums text-center block">
        Lv.{member.level} Exp.{member.level * 99}
      </span>
    )
  }

  return (
    <span className="fft-ui-text-sm font-semibold text-fft-text tabular-nums text-center block">
      Br.{member.stats.brave} Fa.{member.stats.faith}
    </span>
  )
}

export function IsometricGrid({
  members,
  selectedIndex,
  memberTabs = {},
  actionStates = {},
  hpValues = {},
  attackKey = 0,
  slashCombo,
  damage,
  onSelect,
  onConfirm,
}: IsometricGridProps) {
  const slotPositions = [
    { left: '40%', top: '52%' },
    { left: '60%', top: '52%' },
  ]

  return (
    <div className="relative z-10 flex-1 flex items-center justify-center min-h-0 px-4 py-2">
      <div className="relative w-full h-full">
        {members.map((member, index) => {
          const isSelected = index === selectedIndex
          const pos = slotPositions[index]
          const actionState = actionStates[member.id] ?? 'idle'
          const isDead = actionState === 'dead'
          const activeTab = memberTabs[member.id] ?? 'hp'
          const hpValue = hpValues[member.id] ?? member.stats.hp.value

          return (
            <button
              key={member.id}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer outline-none z-10"
              style={{ left: pos.left, top: pos.top }}
              onClick={() => {
                if (index === selectedIndex) onConfirm(index)
                else onSelect(index)
              }}
              onMouseEnter={() => {
                if (index !== selectedIndex) onSelect(index)
              }}
            >
              <div
                className="absolute left-1/2 bottom-[40px] -translate-x-1/2 w-12 h-3 rounded-[50%] bg-black/35 blur-[1px] pointer-events-none"
                aria-hidden="true"
              />

              <CharacterSprite
                member={member}
                selected={isSelected}
                actionState={actionState}
                attackKey={attackKey}
                slashCombo={slashCombo}
                damage={damage}
              />

              <div className="relative w-[160px] h-10 mt-2">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={`${member.id}-${activeTab}`}
                    className="absolute inset-x-0 top-0"
                    initial={{ y: -24, opacity: 0, scale: 0.92 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 16, opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className={`fft-window px-2.5 py-1.5 ${
                        isSelected ? 'ring-2 ring-fft-select/70' : ''
                      } ${isDead ? 'opacity-60' : ''}`}
                    >
                      <FloatingStat
                        member={member}
                        activeTab={activeTab}
                        isDead={isDead}
                        hpValue={hpValue}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function moveSelection(
  current: number,
  direction: 'left' | 'right',
  total: number,
): number {
  if (total <= 1) return 0
  return direction === 'left'
    ? (current - 1 + total) % total
    : (current + 1) % total
}
