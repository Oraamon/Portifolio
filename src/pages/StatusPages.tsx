import {
  partyMembers,
  sectionDetailStats,
  sectionEquipment,
} from '../data/portfolio'
import { CharacterStatusScreen } from '../components/status/CharacterStatusScreen'

function getMember(id: string) {
  return partyMembers.find((m) => m.id === id)!
}

export function AboutPage() {
  return (
    <CharacterStatusScreen
      member={getMember('ramza')}
      equipment={sectionEquipment.about}
      detailStats={sectionDetailStats.about}
      eqpTitle="EQP"
    />
  )
}

export function ExperiencePage() {
  return (
    <CharacterStatusScreen
      member={getMember('agrias')}
      equipment={sectionEquipment.experience}
      detailStats={sectionDetailStats.experience}
      eqpTitle="JOB"
    />
  )
}
