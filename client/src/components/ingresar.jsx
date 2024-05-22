import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextoUsuario } from '../context/contextoUsuario'

export default function Join (props) {
  const { userData, setUserData } = useContext(ContextoUsuario)

  const handlePutContext = () => {
    setUserData({ ...userData, userName: props.userName, userId: props.userId, spotify: props.spotify, token: props.token })
  }
  return (

        <div className="container mx-auto p-8 items-center flex flex-col justify-center h-full w-full">

            <form action="" className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-content md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto text-center">
                <div className="mb-8">
                    <label className="block text-gray-900 text-3xl font-bold mb-2" htmlFor="username">
                        Bienvenido de nuevo <p className='text-green-800'>{props.userName}</p>
                    </label>
                    <label className="block text-gray-70 0 text-sm font-bold mb-2" htmlFor="username">
                        Eres tu?
                    </label>

                </div>

                <div className="mb-4 ">
                    <Link to="/options">
                        <button onClick={handlePutContext} className="bg-green-600 hover:bg-green-700 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-9">
                            Ingresar
                        </button>
                    </Link>

                    <button className="bg-red-600 hover:bg-red-900 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={props.handleLogout}>
                        Log Out
                    </button>
                </div>

            </form>
        </div>
  )
}
