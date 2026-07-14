import type { DetailStats } from '../../types/portfolio'

interface DetailStatsBarProps {
  stats: DetailStats
}

function StatGroup({
  icon,
  label,
  values,
}: {
  icon: 'sword' | 'staff'
  label: string
  values: DetailStats['physical']
}) {
  return (
    <div className="flex items-center gap-3 fft-ui-text-sm text-fft-text">
      <span className="w-4 shrink-0 opacity-60" aria-hidden="true">
        {icon === 'sword' ? '⚔' : '✦'}
      </span>
      <span className="w-8 font-semibold">{label}</span>
      <span className="tabular-nums">
        AT <strong>{values.at}%</strong>
      </span>
      <span className="tabular-nums text-fft-text-dim">
        C-EV <strong className="text-fft-text">{values.cev}%</strong>
      </span>
      <span className="tabular-nums text-fft-text-dim">
        S-EV <strong className="text-fft-text">{values.sev}%</strong>
      </span>
      <span className="tabular-nums text-fft-text-dim">
        A-EV <strong className="text-fft-text">{values.aev}%</strong>
      </span>
    </div>
  )
}

export function DetailStatsBar({ stats }: DetailStatsBarProps) {
  return (
    <div className="fft-window mx-3 my-2 px-3 py-2 flex flex-wrap items-center gap-x-6 gap-y-1">
      <div className="flex items-center gap-4 fft-ui-text-sm text-fft-text shrink-0">
        <span>
          Move <strong className="tabular-nums ml-1">{stats.move}</strong>
        </span>
        <span>
          Jump <strong className="tabular-nums ml-1">{stats.jump}</strong>
        </span>
        <span>
          Speed <strong className="tabular-nums ml-1">{stats.speed}</strong>
        </span>
      </div>
      <div className="hidden sm:flex flex-wrap items-center gap-x-6 gap-y-1 flex-1">
        <StatGroup icon="sword" label="P.A" values={stats.physical} />
        <StatGroup icon="staff" label="M.A" values={stats.magical} />
      </div>
    </div>
  )
}
