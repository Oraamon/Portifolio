import { useEffect, useState } from 'react'

import { asset } from '../../utils/assets'

const SHEET_URL = asset('tiles/floor-sheet.png')
const TILES_X = 3
const TILES_Y = 3
const SRC_TILE_W = 160
const SRC_TILE_H = 157
const SHEET_W = SRC_TILE_W * TILES_X
const SHEET_H = SRC_TILE_H * TILES_Y
const DISPLAY_TILE = 64

function pickTileIndex(col: number, row: number): number {
  return (col * 7 + row * 13 + col * row) % (TILES_X * TILES_Y)
}

export function FloorBackground({ dimOverlay = 0.2 }: { dimOverlay?: number }) {
  const [grid, setGrid] = useState({ cols: 0, rows: 0 })

  useEffect(() => {
    const update = () => {
      const cols = Math.ceil(window.innerWidth / DISPLAY_TILE) + 1
      const rows = Math.ceil(window.innerHeight / DISPLAY_TILE) + 1
      setGrid({ cols, rows })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const tiles = []
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const index = pickTileIndex(col, row)
      const tileCol = index % TILES_X
      const tileRow = Math.floor(index / TILES_X)

      tiles.push(
        <div
          key={`${col}-${row}`}
          className="absolute fft-pixelated"
          style={{
            left: col * DISPLAY_TILE,
            top: row * DISPLAY_TILE,
            width: DISPLAY_TILE,
            height: DISPLAY_TILE,
            backgroundImage: `url(${SHEET_URL})`,
            backgroundSize: `${(SHEET_W / SRC_TILE_W) * DISPLAY_TILE}px ${(SHEET_H / SRC_TILE_H) * DISPLAY_TILE}px`,
            backgroundPosition: `-${tileCol * DISPLAY_TILE}px -${tileRow * DISPLAY_TILE}px`,
          }}
        />,
      )
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {tiles}
      {dimOverlay > 0 && (
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${dimOverlay})` }} />
      )}
    </div>
  )
}
