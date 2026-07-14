import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { EquipmentItem, PartyMember } from '../../types/portfolio'
import { partyMembers, statusMenuItems } from '../../data/portfolio'
import { useSound } from '../../context/SoundContext'
import { CharacterPortrait, CharacterSprite } from '../ui/CharacterPortrait'
import { HandCursor } from '../ui/HandCursor'
import { StatBar } from '../ui/StatBar'
import { DetailStatsBar } from './DetailStatsBar'
import { EquipmentList } from './EquipmentList'
import type { DetailStats } from '../../types/portfolio'

interface CharacterStatusScreenProps {
  member: PartyMember
  equipment: EquipmentItem[]
  detailStats: DetailStats
  eqpTitle?: string
}

function ShoulderButton({
  label,
  onClick,
  side,
}: {
  label: string
  onClick: () => void
  side: 'left' | 'right'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`fft-pill absolute top-2 z-30 w-auto h-auto shrink-0 px-3 py-1 fft-ui-text-sm text-fft-text-dim hover:text-fft-text cursor-pointer ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
      style={{ position: 'absolute' }}
    >
      {side === 'left' ? `◀ ${label}` : `${label} ▶`}
    </button>
  )
}

export function CharacterStatusScreen({
  member,
  equipment,
  detailStats,
  eqpTitle = 'EQP',
}: CharacterStatusScreenProps) {
  const navigate = useNavigate()
  const { playCursor, playConfirm } = useSound()
  const [menuIndex, setMenuIndex] = useState(0)
  const [eqpIndex, setEqpIndex] = useState(0)

  const memberIndex = partyMembers.findIndex((m) => m.id === member.id)
  const prevMember = partyMembers[(memberIndex - 1 + partyMembers.length) % partyMembers.length]
  const nextMember = partyMembers[(memberIndex + 1) % partyMembers.length]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      playCursor()
      setMenuIndex((i) => (i <= 0 ? statusMenuItems.length - 1 : i - 1))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      playCursor()
      setMenuIndex((i) => (i >= statusMenuItems.length - 1 ? 0 : i + 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      playConfirm()
      navigate(statusMenuItems[menuIndex].route)
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
      e.preventDefault()
      playCursor()
      navigate('/')
    }
  }

  return (
    <div
      className="h-full fft-floor flex flex-col relative outline-none overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <ShoulderButton
        label="L1"
        side="left"
        onClick={() => {
          playCursor()
          navigate(prevMember.route)
        }}
      />
      <ShoulderButton
        label="R1"
        side="right"
        onClick={() => {
          playCursor()
          navigate(nextMember.route)
        }}
      />

      <div className="flex gap-2 px-3 pt-10 shrink-0">
        <div className="fft-window flex gap-2 p-2 w-[300px] shrink-0">
          <div className="w-[88px] shrink-0">
            <CharacterPortrait member={member} size="status" />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
            <p className="text-fft-text fft-ui-text-sm font-semibold text-right">
              Lv.{member.level} Exp.{member.level * 99}
            </p>
            <StatBar type="hp" value={member.stats.hp.value} max={member.stats.hp.max} />
            <StatBar type="mp" value={member.stats.mp.value} max={member.stats.mp.max} />
            <StatBar type="ct" value={member.stats.ct.value} max={member.stats.ct.max} />
          </div>
        </div>

        <div className="fft-window flex-1 p-3 flex flex-col justify-between min-w-[180px]">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full shrink-0"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #80c0ff, #2060a0)',
                boxShadow: '0 0 6px #4080c0',
              }}
            />
            <span className="text-fft-text fft-ui-text font-semibold">{member.fftName}</span>
          </div>

          <div className="flex-1 flex items-center justify-center relative py-1">
            <svg
              viewBox="0 0 48 48"
              className="absolute left-1 w-12 h-12 opacity-25"
              aria-hidden="true"
            >
              <path
                d="M24 4 L28 18 L42 18 L31 28 L35 42 L24 34 L13 42 L17 28 L6 18 L20 18 Z"
                fill="none"
                stroke="#666"
                strokeWidth="1.5"
              />
            </svg>
            <p className="text-fft-text fft-ui-text text-2xl font-semibold text-center z-10 leading-tight">
              {member.job}
            </p>
          </div>

          <div className="flex justify-end gap-6 fft-ui-text-sm text-fft-text">
            <span>
              Brave <strong className="tabular-nums">{member.stats.brave}</strong>
            </span>
            <span>
              Faith <strong className="tabular-nums">{member.stats.faith}</strong>
            </span>
          </div>
        </div>
      </div>

      <DetailStatsBar stats={detailStats} />

      <div className="flex gap-2 px-3 flex-1 min-h-0 pb-3 pt-1">
        <EquipmentList
          title={eqpTitle}
          items={equipment}
          selectedIndex={eqpIndex}
          onSelect={setEqpIndex}
        />

        <div className="fft-window w-[130px] shrink-0 flex flex-col">
          <div className="fft-window-header px-3 py-1 text-center">
            <span className="text-fft-text fft-ui-text font-semibold">Menu</span>
          </div>
          <ul className="py-1 flex-1">
            {statusMenuItems.map((item, index) => (
              <li
                key={item.route}
                className={`fft-menu-item fft-ui-text-sm py-1.5 pr-2 cursor-pointer relative ${
                  index === menuIndex ? 'selected font-semibold' : ''
                }`}
                onMouseEnter={() => {
                  if (index !== menuIndex) {
                    playCursor()
                    setMenuIndex(index)
                  }
                }}
                onClick={() => {
                  playConfirm()
                  navigate(item.route)
                }}
              >
                {index === menuIndex && (
                  <span className="absolute left-0.5 top-1/2 -translate-y-1/2">
                    <HandCursor className="w-4 h-5" />
                  </span>
                )}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-8 right-20 pointer-events-none z-0">
        <div className="relative w-24 flex flex-col items-center">
          <svg viewBox="0 0 64 32" className="w-20 h-10 opacity-80" aria-hidden="true">
            <polygon points="32,4 58,16 32,28 6,16" fill="#7a7060" stroke="#4a4038" strokeWidth="1" />
            <polygon points="32,8 52,16 32,24 12,16" fill="#8a8070" stroke="#5a5048" strokeWidth="0.5" />
          </svg>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 scale-150 flex justify-center">
            <CharacterSprite member={member} />
          </div>
        </div>
      </div>
    </div>
  )
}
