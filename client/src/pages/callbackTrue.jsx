
import io from 'socket.io-client'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContextoUsuario } from '../context/contextoUsuario'

export default function CallbackTrue() {
  const { userData, setUserData } = useContext(ContextoUsuario)
  console.log(userData)

  return (
    <div className="my-container  flex flex-col bg-gradient-to-r from-emerald-950 to-green-700">
        <div className="container divide-y-reverse">
        <Link to="/"><button className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 justify-start">
          Inicio
        </button>
        </Link>
      </div>
      <div className='h-screen w-full items-center justify-center'>

        <h1 className='font-bold text-center mt-24 text-white text-4xl'>Cuenta correctamente conectada con spotify</h1>


      </div>
    </div>
  )
}

