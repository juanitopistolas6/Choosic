import io from  'socket.io-client'

export const connectServer  = () => {
    const socket = io("http://localhost:3000")

}
