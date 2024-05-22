import React, { createContext, useState } from 'react'

// Crea el contexto
export const ContextoUsuario = createContext()

// Crea el proveedor del contexto
export const MiContextoProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userName: undefined,
    userId: undefined,
    userGuest: undefined,
    spotify: false,
    token: ''
  })

  return (
    <ContextoUsuario.Provider value={{ userData, setUserData }}>
      {children}
    </ContextoUsuario.Provider>
  )
}
