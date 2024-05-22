/* eslint-disable camelcase */
/* eslint-disable no-tabs */

import { useContext, useEffect, useState } from 'react'
import { millisecondsToMinutesAndSeconds } from '../utils/minutesFormat'
import { ContextoUsuario } from '../context/contextoUsuario'
import { roomContext } from '../context/room-context'

const Song = ({ imagen, artistas, duracion, nombre, votos, id, sala_id }) => {
  const { userData } = useContext(ContextoUsuario)
  const { url, updatePlaylist, playlist } = useContext(roomContext)
  const [isVoted, setIsVoted] = useState(null)

  useEffect(() => {
		console.log('asdadawd1')
    checkVote()
  }, [])

  useEffect(() => {
    checkVote()
  }, [playlist])

  async function checkVote () {
    const response = await fetch(`${url}/isVoted/${sala_id}/${id}/${userData.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json()
			console.log(data)
      setIsVoted(data.isVoted)
    }
  }

  console.log(isVoted)

  const handleVoteSong = async () => {
    if (!isVoted) {
      const response = await fetch(`${url}/votar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sala: sala_id,
          cancion: id,
          usuario: userData.userId
        })
      })

      if (response.ok) {
        const data = await response.json()
        updatePlaylist(data)
      }
    } else {
      const response = await fetch(`${url}/cancelarVoto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sala: sala_id,
          cancion: id,
          usuario: userData.userId
        })
      })

      if (response.ok) {
        const data = await response.json()
        updatePlaylist(data)
      }
    }
  }

  return (
		<div>
			<div className="flex items-center justify-between bg-white border border-gray-200 rounded p-4 mb-4 relative">
				<div className="flex items-center">
						<img src={imagen} alt={nombre} className="h-16 w-16 mr-4 object-cover" />
						<div>
							<h2 className="text-lg font-semibold">{nombre}</h2>
							<p className="text-gray-600">{artistas}</p>
							<p className="text-gray-600">{millisecondsToMinutesAndSeconds(duracion)}</p>
						</div>
				</div>
				<div className=' flex flex-col w-28 gap-1'>
					<button className="bg-emerald-500  text-white font-bold py-2 px-4 rounded">
						Votos: {votos}
					</button>
					<button
						className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleVoteSong}
					>
						{ isVoted ? 'Cancelar' : 'Votar'}
					</button>
				</div>
			</div>
		</div>
  )
}

export default Song
