import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextoUsuario } from '../context/contextoUsuario'

export default function CreateRoom () {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(ContextoUsuario)

  const handleCreateRoom = async () => {
    const token = userData.token
    try {
      const response = await fetch('http://localhost:3003/api/createRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })

      })

      if (response.ok) {
        const data = await response.json()

        console.log('Sala creada correctamente', data.roomCode)

        navigate(`../room/${data.roomCode}`)
      } else {
        console.log('No se pudo creear la sala')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const spotifyOkComponent = () => {
    return (
            <>

                <div className="mb-8" >
                    <h1 className="block text-gray-70 0 font-bold mb-2 text-2xl" htmlFor="username">
                        ¡Estas a punto de crear una sala!
                    </h1>
                    <h4>
                        Presiona OK para confirmar, te redirigiremos a la sala automaticamente
                    </h4>

                </div>

                <div className="mb-4">
                    <button
                        onClick={handleCreateRoom}
                        className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        OK
                    </button>

                </div >
            </>
    )
  }

  const spotifyUnconnected = () => {
    return (
            <>

                <div className="mb-8" >
                    <h1 className="block text-gray-70 0 font-bold mb-2 text-2xl" htmlFor="username">
                        ¡Este usuario no esta conectado con spotify!
                    </h1>
                    <h4>
                        Ve al inicio y conecta tu cuenta de spotify para poder crear salas
                    </h4>

                </div>

                <div className="mb-4">
                    <button
                        className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        OK
                    </button>

                </div >
            </>
    )
  }

  return (
        <div className='my-container h-screen flex flex-col  bg-gradient-to-r from-emerald-950 to-green-700'>
            <div className="container divide-y-reverse">
                <Link to="/options"><button className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 justify-start">
                    Inicio
                </button>
                </Link>
            </div>
            <div className="bg-green-100 shadow-md rounded px-8 w-content pt-6 pb-8 mb-4 mx-auto text-center">
                {userData.spotify ? spotifyOkComponent(handleCreateRoom) : spotifyUnconnected()}
            </div>
        </div>

  )
}
