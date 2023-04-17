import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './modules/Login'
import { useAuth } from './store/auth'
import { CreateRate } from './modules/CreateRate'
import { Modal } from './modules/Modal/Modal'

function App() {
  return (
    <div>
      <Login />
    </div>
  )
}

export default App
