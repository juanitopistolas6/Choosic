import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Authsl from '../components/auth'
import Join from '../components/ingresar'
import { getCookie } from '../apiFunctions'
import loader from '../assets/loader.gif'

export default function Principal () {
  const [isLoading, setisLoafing] = useState(true)
  const [userValues, setUserValues] = useState({
    userName: undefined,
    userPasswords: undefined,
    userIds: undefined,
    spotify: false,
    token: ''
  })
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const userIdFromCookie = getCookie('userId')
      const userPasswordFromCookie = getCookie('userPassword')

      const response = await fetch(`http://localhost:3003/api/users/${userIdFromCookie}/${userPasswordFromCookie}`)

      if (response.ok) {
        const data = await response.json()

        if (userValues.userIds !== data.user_id) {
          if (data.refresh_token !== null) {
            setUserValues({
              ...userValues,
              userName: data.user_name,
              userIds: data.user_id,
              userPasswords: data.user_password,
              token: data.token,
              spotify: true
            })
          } else {
            setUserValues({
              userName: data.user_name,
              userIds: data.user_id,
              userPasswords: data.user_password,
              spotify: false
            })
          }
          setisLoafing(false)
          setIsLogged(true)
        }
      } else {
        setisLoafing(false)
        setIsLogged(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'userPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setUserValues({
      userName: undefined,
      userIds: undefined,
      userPasswords: undefined
    })
    setIsLogged(false)
  }

  return (
        <div className='my-container h-screen flex flex-col  bg-gradient-to-r from-emerald-950 to-green-700'>
            {
                isLoading
                  ? (
                    <div className='items-center flex flex-col justify-center h-full w-full'>
                        <img src={loader} alt="loader" />

                    </div>
                    )
                  : isLogged
                    ? <Join
                    userName={userValues.userName}
                    userId = {userValues.userIds}
                    userGuest ={false}
                    spotify ={userValues.spotify}
                    token = {userValues.token}
                    handleLogout={handleLogout}>
                    </Join>
                    : <Authsl></Authsl>
            }
        </div>
  )
}
