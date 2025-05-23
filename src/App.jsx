import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Especialidades from './Componentes/Especialidades'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          <Routes>
              <Route path="/" element={<Especialidades />} />

          </Routes>
      </div>
  )
}

export default App
