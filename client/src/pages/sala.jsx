/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable camelcase */
import { Link, useParams } from 'react-router-dom'
import Song from '../components/cancion'
import SearchBar from '../components/SearchBar'
import SearchResultsList from '../components/SearchResultList'
import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { ContextoUsuario } from '../context/contextoUsuario'
import { roomContext } from '../context/room-context'
import { ReproduciendoAhora } from '../components/currentSong'

export default function Room () {
  const { codigoSala } = useParams()
  const { userData } = useContext(ContextoUsuario)
  const { playlist, currentSong, url, updatePlaylist } = useContext(roomContext)
  const [searchTracks, setSearchTracks] = useState({})
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socket = io('http://localhost:3003')
    setSocket(socket)

    socket.on('user-joined', (userId) => {
      console.log('conectado', userId)
    })

    socket.on('songAdded', (data) => {
      updatePlaylist(data.curretPlaylist)
    })

    socket.on('resultados-busqueda', (data) => {
      console.log('Search trachs', searchTracks)
      const tracks = data.tracks.items.map(track => ({
        name: track.name,
        uri: track.uri,
        duration: track.duration_ms,
        artist: track.artists.map(artist => artist.name).join(', '),
        imagen: track.album.images[1].url
      }))

      // console.log('Searcheddsasd tracks', tracks)

      setSearchTracks(tracks)
    })

    const joinRoom = (userId, roomId) => {
      console.log(`id_user: ${userId} roomID: ${roomId}`)
      socket.emit('join-room', { userId, roomId })
    }
    const id_user = userData.userId
    joinRoom(id_user, codigoSala)

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    obtainSongs()
  }, [])

  async function obtainSongs () {
    try {
      const response = await fetch(`${url}/songsByCode/${codigoSala}`)

      if (response.ok) {
        const data = await response.json()
        updatePlaylist(data)
      } else {
        console.error('Error al agregar la canción')
      }
    } catch (e) {
      console.log(e)
    }
  }

  obtainSongs()
  

  return (
		<div className='bg-gradient-to-r from-emerald-950 to-green-700'>
			<div className="container divide-y-reverse flex justify-between items-center">
					<Link to="/"><button className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 justify-start">
							Salir
					</button>
					</Link>
					<div className='bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 mx-auto'>
							Codigo de sala: {codigoSala}
					</div>
			</div>
			<div className="flex flex-row items-center justify-center h-screen">
					<div className='container '>
					<SearchBar roomCode={codigoSala} socket={socket} />
					<div className='absolute z-10 mt-1'>
						{searchTracks.length > 0 && (<SearchResultsList roomCode={codigoSala} setSearchTracks= {setSearchTracks} tracks={searchTracks} socket={socket}/>)}
					</div>

						<p className="text-lg text-white mb-5 font-semibold">Reproduciendo Ahora:</p>
						<ReproduciendoAhora {...currentSong}/>
						<p className="text-lg text-white mb-5 font-semibold">Lista de reproduccion:</p>

						<div className='h-[550px] overflow-y-auto'>
							{ playlist.map(cancion => {
							  return (
									<Song
										key={Math.random()}
										{...cancion}
										votosU="5"

									/>
							  )
							})}
						</div>
					</div>

			</div>
		</div>
  )
}
