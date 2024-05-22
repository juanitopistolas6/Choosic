/* eslint-disable no-tabs */
import { useContext } from 'react'
import { millisecondsToMinutesAndSeconds } from '../utils/minutesFormat'
import { roomContext } from '../context/room-context'

/* eslint-disable react/prop-types */
const SearchResult = (props) => {
  const { updatePlaylist, url } = useContext(roomContext)

  const handleSongInput = async () => {
    props.setSearchTracks([])

    try {
      const response = await fetch(`${url}/agregar/cancion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: props.name,
          duracion: props.duracion,
          uri: props.uri,
          imagen: props.imagen,
          artista: props.artista,
          roomCode: props.roomCode
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        props.socket.emit('searchSong',{curretPlaylist: data})
        updatePlaylist(data)
      } else {
        console.error('Error al agregar la canción')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
		<div onClick={handleSongInput} className="bg-white mb-1 mt-1 flex h-16 p-2 gap-2 hover:shadow-2xl">
			<img src={props.imagen} className="rounded-full" />
			<div className="flex flex-col">
					<div className="flex gap-2">
							<p>{props.name}</p>
							<p>- {props.artista}</p>
					</div>
					<p>{millisecondsToMinutesAndSeconds(props.duracion)}</p>
			</div>
		</div>
  )
}

export default SearchResult
