import { Link } from 'react-router-dom'
import { useSound } from '../../context/SoundContext'
import { HandCursor } from '../ui/HandCursor'

export function StatusHeader({ title }: { title: string }) {
  const { playCursor } = useSound()

  return (
    <div className="flex items-center justify-between px-4 py-2 fft-window mx-3 mt-3 shrink-0">
      <Link
        to="/"
        className="text-fft-text hover:opacity-70 fft-ui-text-sm transition-opacity no-underline flex items-center gap-1"
        onClick={() => playCursor()}
      >
        <HandCursor className="w-4 h-5" />
        Party
      </Link>
      <h1 className="text-fft-text fft-ui-text font-semibold">{title}</h1>
      <div className="w-16" />
    </div>
  )
}
