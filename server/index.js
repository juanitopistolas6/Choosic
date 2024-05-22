import express from 'express'
import logger from 'morgan'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'

import querystring from 'querystring';
import { createRoom, joinRoom, getRoomByName, putSongOnRoom, getSongsByCode, voteSong, isVoted, cancelVote } from './controllers/roomController.js'
import { createUser, getUserById, getUserByName} from './controllers/userControllers.js';
import { callbackSpotify, searchSongs } from './controllers/spotifyControllers.js'



const port = process.env.PORT ?? 3003

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json());

const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {
  console.log("Usuario conectado al socket!" + socket.id)

  socket.on('join-room', async ({ userId, roomId }) => {
    try {
      console.log("Hola como estas!!!!", userId, roomId)
      await joinRoom({ body: { userId, roomCode: roomId } });
      socket.join(roomId)
      console.log(`Usuario join-room ${socket.id} conectado`)
      io.to(roomId).emit('user-joined', userId)
    } catch (err) {
      console.log(err)
    }

  })

  socket.on('songAdded', ( { roomID, curretPlaylist }) => {
    console.log(cancion)
    io.to(roomID).emit('updatePlaylist', { curretPlaylist })
  })


  socket.on('searchSong',async(data) => {
    console.log(data)
    try{
      const searchResults = await searchSongs(data.roomCode,data.query)

      socket.emit('resultados-busqueda',searchResults)

    }catch(err){
      console.log("Error al buscar la cancion",err)
    }

  })

  socket.on('disconnect', () => {
    console.log(`Usuario ${socket.id} desconectado`)
  })


})

app.get('/api/users/:id/:password', getUserById)
app.get('/api/name/:userName', getUserByName)
app.get('/api/room/:roomCode', getRoomByName)
app.get('/api/songsByCode/:roomCode', getSongsByCode)
app.get('/api/isVoted/:usuario/:salaID/:cancion', isVoted)
app.post('/api/register', createUser)
app.post('/api/createRoom', createRoom)
app.post('/api/agregar/cancion', putSongOnRoom)
app.post('/api/votar', voteSong)
app.post('/api/cancelarVoto', cancelVote)



//Proceso de autenticacion con Spotify --- Coneccion cliente con spotify

const client_id = '7ad579293238465b9d93166f809726a0';
const redirect_uri = 'http://localhost:3003/api/callback';



app.get('/api/login/:idCliente', function(req, res) {

  var state = req.params.idCliente;
  var scope = 'user-modify-playback-state';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/api/callback', callbackSpotify);


server.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
