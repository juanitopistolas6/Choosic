import io from 'socket.io-client'
import { useContext, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { ContextoUsuario } from '../context/contextoUsuario'

export default function Options() {
  const { userData, setUserData } = useContext(ContextoUsuario)
  const [isConnected, setIsConnected] = useState(false)
  const navigate = useNavigate()

  const handelLoginSpotify = () => {
    window.location.href = `http://localhost:3003/api/login/${userData.userId}`;
  }

  return (
    <div className="my-container  flex flex-col bg-gradient-to-r from-emerald-950 to-green-700">
      <div className="container divide-y-reverse">
        <Link to="/"><button className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 justify-start">
          Inicio
        </button>
        </Link>
      </div>
      <div className='h-screen w-full items-center justify-center'>

        <div className="text-center w-65">
          <h1 className="text-5xl font-bold mb-4 text-green-50">Bienvenido a Choosic {userData.userName} </h1>
          <p className="text-green-600 mb-8 font-bold">Conectate a salas y vota en tiempo real</p>
          <div className="justify-center flex w-90 ">
            <Link to="/room"> <button className="bg-amber-900 hover:bg-amber-950  duration-150 border  text-white px-4 py-2 rounded-md mx-4">Ingresar a Sala</button></Link>
            <Link to="/createRoom"><button disabled={isConnected} className="bg-amber-900 hover:bg-amber-950 duration-150 text-white px-4 py-2 rounded-md mx-4">Crear sala</button></Link>
            <button className="bg-amber-900 hover:bg-amber-950 duration-150 text-white px-4 py-2 rounded-md mx-4" onClick={handelLoginSpotify} >Link Spotify</button>
          </div>

        </div>
      </div>
    </div>
  )
}
