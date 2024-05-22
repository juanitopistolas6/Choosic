
import io from 'socket.io-client'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'




export default function InputRoom() {
    const [input, setInput] = useState("")
    const navigate = useNavigate()

    const handleRoomInput = () => {
        navigate(`/room/${input}`)
    }

    return (
        <div className='bg-gradient-to-r from-emerald-950 to-green-700'>
            <div className="container divide-y-reverse">
                <Link to="/"><button className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 justify-start">
                    Inicio
                </button>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className='container mx-auto p-8 items-center flex justify-center h-full w-full'>
                    <form action="sumbit" className='bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto text-center'>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-4 text-slate-900">Ingresa la sala</h1>
                            <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => {setInput(e.target.value)}} placeholder="Ingrese la sala" />
                        </div>
                        <div className="mt-4">
                            <button

                                className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                OK
                            </button>

                        </div>
                    </form>

                </div>

            </div>
        </div>

    )
}