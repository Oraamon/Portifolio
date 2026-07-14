import type { PartyMember } from '../../types/portfolio'
import { CharacterPortrait } from '../ui/CharacterPortrait'
import { StatBar } from '../ui/StatBar'

interface StatusFooterProps {
  member: PartyMember
  slotNumber: number
  hpValue?: number
  onAttack?: () => void
}

export function StatusFooter({
  member,
  slotNumber,
  hpValue,
  onAttack,
}: StatusFooterProps) {
  const slotLabel = String(slotNumber + 1).padStart(2, '0')
  const currentHp = hpValue ?? member.stats.hp.value

  return (
    <div className="flex flex-wrap gap-2 px-3 pb-3 pt-1 shrink-0 relative z-10">
      {/* Portrait + vitals */}
      <div className="fft-window flex gap-3 p-2.5 flex-1 min-w-[280px] max-w-md">
        <CharacterPortrait member={member} size="lg" />

        <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
          <div className="flex items-baseline justify-between">
            <span className="text-fft-text fft-ui-text font-bold truncate">
              {member.name}
            </span>
            <span className="text-fft-text-dim fft-ui-text-sm shrink-0 ml-2 tabular-nums">
              Lv.{member.level}
            </span>
          </div>
          <StatBar type="hp" value={currentHp} max={member.stats.hp.max} />
          <StatBar type="mp" value={member.stats.mp.value} max={member.stats.mp.max} />
          <StatBar type="ct" value={member.stats.ct.value} max={member.stats.ct.max} />
        </div>
      </div>

      {/* Job / zodiac / actions */}
      <div className="fft-window flex-1 p-3 flex flex-col justify-between min-w-[220px]">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full shrink-0"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #80c0ff, #2060a0)',
              boxShadow: '0 0 6px #4080c0',
            }}
          />
          <span className="text-fft-text fft-ui-text font-semibold">
            {slotLabel} {member.fftName}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center relative py-2">
          <svg
            viewBox="0 0 40 40"
            className="absolute left-2 w-10 h-10 opacity-25"
            aria-hidden="true"
          >
            <path
              d="M20 4 L24 16 L36 16 L26 24 L30 36 L20 28 L10 36 L14 24 L4 16 L16 16 Z"
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
            />
          </svg>
          <p className="text-fft-text fft-ui-text text-xl font-semibold text-center z-10">
            {member.job}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-4 fft-ui-text-sm text-fft-text">
            <span>
              Brave <strong className="tabular-nums">{member.stats.brave}</strong>
            </span>
            <span>
              Faith <strong className="tabular-nums">{member.stats.faith}</strong>
            </span>
          </div>

          <button
            type="button"
            className="fft-action-btn px-4 py-1.5 fft-ui-text-sm flex items-center gap-1.5"
            onClick={onAttack}
          >
            <span aria-hidden="true">⚔</span>
            Attack
          </button>
        </div>
      </div>
    </div>
  )
}
