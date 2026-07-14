import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PartyScreen } from './components/party/PartyScreen'
import { PageTransition } from './components/ui/FFTWindow'
import { SoundProvider, useSound } from './context/SoundContext'
import { AboutPage, ExperiencePage } from './pages/StatusPages'

function SoundControls() {
  const { musicEnabled, sfxEnabled, toggleMusic, toggleSfx, playCursor } = useSound()

  return (
    <div className="fixed bottom-3 left-3 z-50 flex gap-1">
      <button
        type="button"
        onClick={() => {
          playCursor()
          toggleMusic()
        }}
        className="fft-ui-text-sm px-2 py-0.5 fft-window cursor-pointer text-fft-text-dim hover:text-fft-text transition-colors"
        title="Toggle music"
      >
        {musicEnabled ? '♪ ON' : '♪ OFF'}
      </button>
      <button
        type="button"
        onClick={() => {
          playCursor()
          toggleSfx()
        }}
        className="fft-ui-text-sm px-2 py-0.5 fft-window cursor-pointer text-fft-text-dim hover:text-fft-text transition-colors"
        title="Toggle sound effects"
      >
        {sfxEnabled ? 'SFX ON' : 'SFX OFF'}
      </button>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const { startMusic } = useSound()

  useEffect(() => {
    startMusic()
  }, [startMusic])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <PartyScreen />
            </PageTransition>
          }
        />
        <Route
          path="/status/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/status/experience"
          element={
            <PageTransition>
              <ExperiencePage />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <SoundProvider>
      <div className="h-full">
        <SoundControls />
        <AnimatedRoutes />
      </div>
    </SoundProvider>
  )
}

export default App
