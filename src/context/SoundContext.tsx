import { Howl } from 'howler'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface SoundContextValue {
  musicEnabled: boolean
  sfxEnabled: boolean
  toggleMusic: () => void
  toggleSfx: () => void
  playCursor: () => void
  playConfirm: () => void
  startMusic: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const MUSIC_SRC = '/audio/say-so-instrumental.mp3'

function createTone(frequency: number, duration: number, volume = 0.15): Howl {
  return new Howl({
    src: [`data:audio/wav;base64,${generateToneWav(frequency, duration)}`],
    volume,
    html5: false,
  })
}

function generateToneWav(frequency: number, durationMs: number): string {
  const sampleRate = 22050
  const numSamples = Math.floor((sampleRate * durationMs) / 1000)
  const buffer = new ArrayBuffer(44 + numSamples * 2)
  const view = new DataView(buffer)

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + numSamples * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, numSamples * 2, true)

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate
    const envelope = Math.exp(-t * 8)
    const sample = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.5
    view.setInt16(44 + i * 2, sample * 32767, true)
  }

  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [sfxEnabled, setSfxEnabled] = useState(true)
  const musicStartedRef = useRef(false)
  const cursorRef = useRef<Howl | null>(null)
  const confirmRef = useRef<Howl | null>(null)
  const musicRef = useRef<Howl | null>(null)

  useEffect(() => {
    cursorRef.current = createTone(880, 50, 0.08)
    confirmRef.current = createTone(660, 120, 0.12)
    musicRef.current = new Howl({
      src: [MUSIC_SRC],
      loop: true,
      volume: 0.45,
      html5: true,
      preload: true,
    })

    return () => {
      musicRef.current?.unload()
      cursorRef.current?.unload()
      confirmRef.current?.unload()
    }
  }, [])

  const startMusic = useCallback(() => {
    if (!musicEnabled || musicStartedRef.current) return
    const music = musicRef.current
    if (!music) return

    musicStartedRef.current = true
    if (!music.playing()) {
      music.play()
    }
  }, [musicEnabled])

  const playCursor = useCallback(() => {
    if (sfxEnabled) cursorRef.current?.play()
  }, [sfxEnabled])

  const playConfirm = useCallback(() => {
    if (sfxEnabled) confirmRef.current?.play()
  }, [sfxEnabled])

  const toggleMusic = useCallback(() => {
    setMusicEnabled((prev) => {
      const next = !prev
      const music = musicRef.current
      if (!music) return next

      if (next) {
        if (!music.playing()) music.play()
        musicStartedRef.current = true
      } else {
        music.pause()
      }
      return next
    })
  }, [])

  const toggleSfx = useCallback(() => {
    setSfxEnabled((prev) => !prev)
  }, [])

  return (
    <SoundContext.Provider
      value={{
        musicEnabled,
        sfxEnabled,
        toggleMusic,
        toggleSfx,
        playCursor,
        playConfirm,
        startMusic,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within SoundProvider')
  return ctx
}
