/* eslint-disable camelcase */
import { createContext, useEffect, useState } from 'react'

export const roomContext = createContext()

export const RoomContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([])
  const [currentSong, setCurrentSong] = useState(null)
  const url = 'http://localhost:3003/api'

  useEffect(() => {
    console.log('PLAYLIST:', playlist)
    console.log('CURRENT_SONG:', currentSong)
  }, [playlist, currentSong])

  const updatePlaylist = (object) => {
    const newPlaylist = []

    object.forEach(cancion => {
      if (cancion.currentSong) {
        setCurrentSong(cancion)
      } else {
        newPlaylist.push(cancion)
      }
    })

    setPlaylist(prev => [...newPlaylist])
  }

  return (
    <roomContext.Provider value={{ playlist, currentSong, updatePlaylist, url }}>
      {children}
    </roomContext.Provider>
  )
}
