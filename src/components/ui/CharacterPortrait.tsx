import { useEffect, useState } from 'react'
import type { PartyMember } from '../../types/portfolio'
import { slashComboFromKey, SlashEffect } from './SlashEffect'

export type CharacterActionState = 'idle' | 'slash' | 'weak' | 'dead'

interface SpriteFrame {
  src: string
  flip?: boolean
}

interface CharacterAsset {
  frames: SpriteFrame[]
  weak: string
  dead: string
  portrait: string
  alt: string
}

function rotationFrames(folder: string, prefix: string): SpriteFrame[] {
  return [
    { src: `${folder}/${prefix}-S.png` },
    { src: `${folder}/${prefix}-SW.png` },
    { src: `${folder}/${prefix}-W.png` },
    { src: `${folder}/${prefix}-NW.png` },
    { src: `${folder}/${prefix}-N.png` },
    { src: `${folder}/${prefix}-NW.png`, flip: true },
    { src: `${folder}/${prefix}-W.png`, flip: true },
    { src: `${folder}/${prefix}-SW.png`, flip: true },
  ]
}

const characterAssets: Record<string, CharacterAsset> = {
  ramza: {
    frames: rotationFrames('/sprites/characters/mime', 'Mime3F'),
    weak: '/sprites/characters/mime/Mime3F-Weak-SW.png',
    dead: '/sprites/characters/mime/Mime3F-Dead-SW.png',
    portrait: '/sprites/characters/mime/Mime3F.png',
    alt: 'Mime',
  },
  agrias: {
    frames: rotationFrames('/sprites/characters/black-chocobo', 'BlackChocobo'),
    weak: '/sprites/characters/black-chocobo/BlackChocobo-Weak-SW.png',
    dead: '/sprites/characters/black-chocobo/BlackChocobo-Dead-SW.png',
    portrait: '/sprites/characters/black-chocobo/BlackChocobo.png',
    alt: 'Black Chocobo',
  },
}

function DirectionalSprite({
  asset,
  selected,
  actionState,
}: {
  asset: CharacterAsset
  selected: boolean
  actionState: CharacterActionState
}) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (!selected || actionState !== 'idle') return

    const interval = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % asset.frames.length)
    }, 220)

    return () => window.clearInterval(interval)
  }, [asset, selected, actionState])

  const frame = asset.frames[selected ? frameIndex : 0]
  const actionSprite =
    actionState === 'dead' ? asset.dead : actionState === 'weak' ? asset.weak : null

  return (
    <div
      className={`relative z-10 h-[72px] flex items-end justify-center w-full ${
        selected && actionState === 'idle' ? 'fft-float' : ''
      } ${actionState === 'slash' ? 'fft-hit-shake' : ''}`}
    >
      <div
        className={
          !actionSprite && frame.flip ? 'origin-bottom -scale-x-100' : 'origin-bottom'
        }
      >
        <img
          src={actionSprite ?? frame.src}
          alt={asset.alt}
          draggable={false}
          className={`block w-auto max-w-none fft-pixelated ${
            actionState === 'dead' ? 'h-[40px] opacity-60 grayscale' : 'h-[72px]'
          } ${selected ? 'drop-shadow-[0_0_6px_rgba(255,255,200,0.8)]' : ''}`}
        />
      </div>
    </div>
  )
}

interface CharacterSpriteProps {
  member: PartyMember
  selected?: boolean
  actionState?: CharacterActionState
  attackKey?: number
  slashCombo?: number
  damage?: number
}

export function CharacterSprite({
  member,
  selected = false,
  actionState = 'idle',
  attackKey = 0,
  slashCombo,
  damage,
}: CharacterSpriteProps) {
  const isChocobo = member.fftName === 'Boco'
  const asset = characterAssets[member.id]
  const combo = slashCombo ?? slashComboFromKey(Math.max(attackKey, 1))

  return (
    <div className="relative flex flex-col items-center">
      {selected && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-0 fft-select-diamond">
          <svg width="52" height="28" viewBox="0 0 52 28" aria-hidden="true">
            <polygon
              points="26,2 50,14 26,26 2,14"
              fill="none"
              stroke="#f0e040"
              strokeWidth="2"
            />
            <polygon
              points="26,6 44,14 26,22 8,14"
              fill="rgba(240,224,64,0.25)"
              stroke="#ffff80"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}

      {actionState === 'slash' && (
        <SlashEffect key={attackKey} combo={combo} damage={damage} />
      )}

      {asset ? (
        <DirectionalSprite asset={asset} selected={selected} actionState={actionState} />
      ) : (
        <svg
          viewBox="0 0 32 40"
          className={`relative z-10 w-10 h-12 ${
            selected ? 'fft-float drop-shadow-[0_0_6px_rgba(255,255,200,0.8)]' : ''
          }`}
          aria-hidden="true"
          style={{ imageRendering: 'pixelated' }}
        >
          {isChocobo ? (
            <>
              <rect x="8" y="24" width="16" height="10" fill={member.color} />
              <rect x="10" y="14" width="12" height="12" fill={member.accentColor} />
              <rect x="18" y="16" width="2" height="2" fill="#1a1a1a" />
              <rect x="22" y="15" width="4" height="3" fill="#e86020" />
              <rect x="9" y="32" width="4" height="5" fill="#e86020" />
              <rect x="19" y="32" width="4" height="5" fill="#e86020" />
            </>
          ) : (
            <>
              <rect x="11" y="10" width="10" height="10" fill={member.color} />
              <rect x="12" y="8" width="8" height="3" fill={member.accentColor} />
              <rect x="13" y="13" width="2" height="2" fill="#1a1a1a" />
              <rect x="17" y="13" width="2" height="2" fill="#1a1a1a" />
              <rect x="9" y="20" width="14" height="10" fill={member.accentColor} />
              <rect x="7" y="22" width="4" height="8" fill={member.color} />
              <rect x="21" y="22" width="4" height="8" fill={member.color} />
              <rect x="10" y="30" width="5" height="6" fill={member.color} />
              <rect x="17" y="30" width="5" height="6" fill={member.color} />
            </>
          )}
        </svg>
      )}
    </div>
  )
}

interface PortraitProps {
  member: PartyMember
  size?: 'sm' | 'md' | 'lg' | 'status'
}

const portraitSizes = {
  lg: 'w-28 h-32',
  status: 'w-[84px] h-[96px]',
  md: 'w-24 h-28',
  sm: 'w-20 h-24',
}

export function CharacterPortrait({ member, size = 'lg' }: PortraitProps) {
  const dim = portraitSizes[size]
  const isChocobo = member.fftName === 'Boco'
  const asset = characterAssets[member.id]

  return (
    <div
      className={`${dim} fft-window p-1 flex items-center justify-center overflow-hidden`}
      style={{ background: 'linear-gradient(135deg, #ece8dc 0%, #d9d4c3 100%)' }}
    >
      {asset ? (
        <img
          src={asset.portrait}
          alt={`${asset.alt} portrait`}
          draggable={false}
          className="w-full h-full object-contain fft-pixelated"
        />
      ) : (
      <svg viewBox="0 0 80 96" className="w-full h-full" aria-hidden="true">
        <rect x="0" y="0" width="80" height="96" fill="#e8e4d8" />
        {isChocobo ? (
          <>
            <ellipse cx="40" cy="62" rx="28" ry="18" fill={member.color} />
            <ellipse cx="40" cy="42" rx="20" ry="22" fill={member.accentColor} />
            <circle cx="48" cy="38" r="4" fill="#1a1a1a" />
            <circle cx="49" cy="37" r="1.5" fill="#fff" />
            <polygon points="56,40 68,34 62,44" fill="#e86020" />
          </>
        ) : (
          <>
            <ellipse cx="40" cy="88" rx="24" ry="6" fill="rgba(0,0,0,0.15)" />
            <rect x="28" y="48" width="24" height="28" fill={member.accentColor} rx="2" />
            <rect x="24" y="52" width="8" height="20" fill={member.color} rx="1" />
            <rect x="48" y="52" width="8" height="20" fill={member.color} rx="1" />
            <circle cx="40" cy="32" r="18" fill={member.color} />
            <rect x="32" y="16" width="16" height="8" fill={member.accentColor} rx="2" />
            <circle cx="34" cy="32" r="3" fill="#1a1a1a" />
            <circle cx="46" cy="32" r="3" fill="#1a1a1a" />
            <rect x="36" y="38" width="8" height="2" fill="#8a7060" rx="1" />
            {member.fftName === 'Ramza' && (
              <rect x="30" y="14" width="20" height="4" fill="#6a5040" rx="1" />
            )}
            {member.fftName === 'Orlandu' && (
              <rect x="58" y="20" width="4" height="50" fill="#888" rx="1" />
            )}
          </>
        )}
      </svg>
      )}
    </div>
  )
}
