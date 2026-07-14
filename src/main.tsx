import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { asset } from './utils/assets'
import './index.css'

document.documentElement.style.setProperty(
  '--fft-floor-sheet',
  `url(${asset('tiles/floor-sheet.png')})`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
