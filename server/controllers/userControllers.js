
import mysql from 'mysql2/promise';
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'choosic'
  });

export async function getUserById(req, res) {
  try {

    const userId = req.params.id;
    const userPass = req.params.password;

 
    const [rows] = await connection.execute('SELECT * FROM users WHERE user_id = ? and user_password = ?', [userId,userPass]);

 
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

 
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}

export async function getUserByName(req, res) {
  console.log("isaac")
    try {
  
      
      const userName = req.params.userName;

      const [rows] = await connection.execute('SELECT * FROM users WHERE user_name = ? ', [userName]);
 
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
 
      res.json(rows[0]);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  }

  export async function createUser(req, res) {
    try {
      const { userName, password } = req.body;

  
 
      const [existingUser] = await connection.execute('SELECT * FROM users WHERE user_name = ?', [userName]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      }
  
 
      await connection.execute('INSERT INTO users (user_name, user_password) VALUES (?, ?)', [userName, password]);
  
 
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  }
  export async function getTokenByRoom(req, res) {
    try {
        const {roomCode}= req.body;

        const [rows] = await connection.execute('SELECT token FROM rooms WHERE room_code = ?', [roomCode]);

        if (rows.length > 0) {
            return rows[0]
        } else {
            res.status(404).json({ error: 'No se encontró ningún token para la sala especificada' });
        }
    } catch (err) {
        console.error('Error al obtener el token de la sala:', err);
        res.status(500).json({ error: 'Error del servidor al obtener el token de la sala' });
    }
}