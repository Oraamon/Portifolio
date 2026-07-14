import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { partyMembers, menuItems } from '../../data/portfolio'
import { useSound } from '../../context/SoundContext'
import type { CharacterActionState } from '../ui/CharacterPortrait'
import { slashComboFromKey } from '../ui/SlashEffect'
import { IsometricGrid, moveSelection, type PartyTabId } from './IsometricGrid'
import { MenuList } from '../ui/MenuList'
import { FloorBackground } from './FloorBackground'
import { StatusFooter } from './StatusFooter'
import { TopTabBar } from './TopTabBar'

type TabId = PartyTabId

function defaultMemberTabs(): Record<string, TabId> {
  return Object.fromEntries(partyMembers.map((m) => [m.id, 'hp' as TabId]))
}

export function PartyScreen() {
  const navigate = useNavigate()
  const { playCursor, playConfirm, startMusic } = useSound()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [menuIndex, setMenuIndex] = useState(0)
  const [memberTabs, setMemberTabs] = useState<Record<string, TabId>>(defaultMemberTabs)
  const [actionStates, setActionStates] = useState<Record<string, CharacterActionState>>({})
  const [hpValues, setHpValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(partyMembers.map((m) => [m.id, m.stats.hp.value])),
  )
  const [attackKey, setAttackKey] = useState(0)
  const [slashCombo, setSlashCombo] = useState(0)
  const [damage, setDamage] = useState<number | undefined>(undefined)
  const [flash, setFlash] = useState(false)
  const timeouts = useRef<number[]>([])

  const selected = partyMembers[selectedIndex]
  const activeTab = memberTabs[selected.id] ?? 'hp'
  const selectedHp = hpValues[selected.id] ?? selected.stats.hp.value

  useEffect(() => {
    return () => {
      timeouts.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const clearScheduled = () => {
    timeouts.current.forEach((t) => window.clearTimeout(t))
    timeouts.current = []
  }

  const runAttack = useCallback(
    (memberId: string) => {
      clearScheduled()
      playConfirm()

      const member = partyMembers.find((m) => m.id === memberId)
      const maxHp = member?.stats.hp.max ?? 100
      const fullHp = member?.stats.hp.value ?? maxHp
      const nextDamage = Math.floor(80 + Math.random() * 420)
      const nextKey = attackKey + 1
      setFlash(false)
      setDamage(nextDamage)
      setAttackKey(nextKey)
      setSlashCombo(slashComboFromKey(nextKey))

      setActionStates((s) => ({ ...s, [memberId]: 'idle' }))

      const schedule = (fn: () => void, ms: number) => {
        timeouts.current.push(window.setTimeout(fn, ms))
      }

      schedule(() => {
        setFlash(true)
        setActionStates((s) => ({ ...s, [memberId]: 'slash' }))
        setHpValues((prev) => ({
          ...prev,
          [memberId]: Math.max(0, (prev[memberId] ?? fullHp) - nextDamage),
        }))
      }, 20)

      schedule(() => setFlash(false), 320)
      schedule(() => setActionStates((s) => ({ ...s, [memberId]: 'weak' })), 570)
      schedule(() => {
        setActionStates((s) => ({ ...s, [memberId]: 'dead' }))
        setHpValues((prev) => ({ ...prev, [memberId]: 0 }))
      }, 1120)
      schedule(() => {
        setActionStates((s) => ({ ...s, [memberId]: 'idle' }))
        setHpValues((prev) => ({ ...prev, [memberId]: fullHp }))
        setDamage(undefined)
      }, 2620)
    },
    [attackKey, playConfirm],
  )

  const handleConfirm = (index: number) => {
    playConfirm()
    navigate(partyMembers[index].route)
  }

  const handleTabChange = useCallback(
    (tab: TabId) => {
      playCursor()
      setMemberTabs((prev) => ({ ...prev, [selected.id]: tab }))
    },
    [playCursor, selected.id],
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      playCursor()
      setSelectedIndex((i) => moveSelection(i, 'left', partyMembers.length))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      playCursor()
      setSelectedIndex((i) => moveSelection(i, 'right', partyMembers.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleConfirm(selectedIndex)
    } else if (e.key === ' ' || e.key.toLowerCase() === 'a') {
      e.preventDefault()
      runAttack(selected.id)
    }
  }

  return (
    <div
      className="h-full flex flex-col relative outline-none bg-[#2a2620]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => startMusic()}
    >
      <FloorBackground dimOverlay={0.15} />

      {flash && (
        <div
          key={`flash-${attackKey}`}
          className="absolute inset-0 z-40 bg-white pointer-events-none fft-screen-flash"
        />
      )}

      <div className="absolute top-3 right-3 z-20">
        <MenuList
          items={menuItems}
          selectedIndex={menuIndex}
          onSelect={(i) => {
            playCursor()
            setMenuIndex(i)
          }}
          onConfirm={(route) => navigate(route)}
        />
      </div>

      <TopTabBar activeTab={activeTab} onTabChange={handleTabChange} />

      <IsometricGrid
        members={partyMembers}
        selectedIndex={selectedIndex}
        memberTabs={memberTabs}
        actionStates={actionStates}
        hpValues={hpValues}
        attackKey={attackKey}
        slashCombo={slashCombo}
        damage={damage}
        onSelect={(i) => {
          playCursor()
          setSelectedIndex(i)
        }}
        onConfirm={handleConfirm}
      />

      <StatusFooter
        member={selected}
        slotNumber={selectedIndex}
        hpValue={selectedHp}
        onAttack={() => runAttack(selected.id)}
      />
    </div>
  )
}
