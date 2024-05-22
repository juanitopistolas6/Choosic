import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { MiContextoProvider } from './context/contextoUsuario'
import { RoomContextProvider } from './context/room-context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MiContextoProvider>
    <RoomContextProvider>
      <App/>
    </RoomContextProvider>
  </MiContextoProvider>
)
