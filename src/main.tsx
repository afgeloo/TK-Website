import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global-css/index.css'
import UserSide from './user-side'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserSide />
  </StrictMode>,
)
