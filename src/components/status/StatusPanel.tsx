import { motion } from 'framer-motion'
import type { PartyMember } from '../../types/portfolio'
import { CharacterPortrait } from '../ui/CharacterPortrait'
import { FFTWindow } from '../ui/FFTWindow'
import { StatBar } from '../ui/StatBar'

interface StatusPanelProps {
  member: PartyMember
  children?: React.ReactNode
}

export function StatusPanel({ member, children }: StatusPanelProps) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 overflow-hidden min-h-0">
      <motion.div
        className="flex flex-col items-center gap-3 lg:w-44 shrink-0"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <CharacterPortrait member={member} size="lg" />
        <div className="fft-window px-4 py-2 text-center w-full">
          <h2 className="text-fft-text fft-ui-text font-semibold">{member.name}</h2>
          <p className="text-fft-text-dim fft-ui-text-sm">
            Lv. {member.level} {member.job}
          </p>
          <p className="text-fft-text-dim fft-ui-text-sm mt-0.5">{member.section}</p>
        </div>
      </motion.div>

      <div className="flex-1 space-y-3 overflow-y-auto min-h-0">
        <FFTWindow title="Status">
          <div className="space-y-2">
            <StatBar
              label={member.stats.hp.label}
              value={member.stats.hp.value}
              max={member.stats.hp.max}
              type="hp"
            />
            <StatBar
              label={member.stats.mp.label}
              value={member.stats.mp.value}
              max={member.stats.mp.max}
              type="mp"
            />
            <StatBar
              label={member.stats.ct.label}
              value={member.stats.ct.value}
              max={member.stats.ct.max}
              type="ct"
            />

            <div className="flex justify-end gap-6 pt-2 border-t border-fft-border/30 fft-ui-text-sm">
              <span>
                Brave <strong className="tabular-nums">{member.stats.brave}</strong>
              </span>
              <span>
                Faith <strong className="tabular-nums">{member.stats.faith}</strong>
              </span>
            </div>
          </div>
        </FFTWindow>

        {member.skills.length > 0 && (
          <FFTWindow title="Skills">
            <ul className="space-y-1">
              {member.skills.map((skill) => (
                <motion.li
                  key={skill}
                  className="text-fft-text fft-ui-text-sm flex items-center gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-fft-hp-bar font-bold">✓</span>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </FFTWindow>
        )}

        {member.description && (
          <FFTWindow title="Bio">
            <p className="text-fft-text fft-ui-text-sm leading-relaxed">{member.description}</p>
          </FFTWindow>
        )}

        {children}
      </div>
    </div>
  )
}
