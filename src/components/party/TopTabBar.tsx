import type { PartyTabId } from './IsometricGrid'

type TabId = PartyTabId

interface TopTabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}
const tabs: { id: TabId; label: string }[] = [
  { id: 'hp', label: 'Hp' },
  { id: 'mp', label: 'Mp' },
  { id: 'ct', label: 'Ct' },
  { id: 'exp', label: 'Lv. Exp' },
  { id: 'brfa', label: 'Br. Fa' },
]

export function TopTabBar({
  activeTab,
  onTabChange,
}: TopTabBarProps) {
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)
  const changeTab = (offset: number) => {
    const nextIndex = (activeIndex + offset + tabs.length) % tabs.length
    onTabChange(tabs[nextIndex].id)
  }

  return (
    <div className="flex justify-center items-center gap-3 pt-3 px-4 shrink-0 relative z-20">
      <button
        type="button"
        className="fft-pill px-3 py-1 text-fft-text-dim fft-ui-text-sm cursor-pointer shrink-0"
        aria-label="Previous tab"
        onClick={() => changeTab(-1)}
      >
        ◀ L2
      </button>

      <div className="fft-window flex items-stretch overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`fft-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="fft-pill px-3 py-1 text-fft-text-dim fft-ui-text-sm cursor-pointer shrink-0"
        aria-label="Next tab"
        onClick={() => changeTab(1)}
      >
        R2 ▶
      </button>
    </div>
  )
}
