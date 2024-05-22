import mysql from 'mysql2/promise';
import { getTokenByRoom } from './userControllers.js';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6442340710juan1',
    database: 'choosic'
});

const redirect_uri = 'http://localhost:3003/api/callback';
const client_secret = '7b56da7d7c794631a75a3c7302b20fa3';
const client_id = '7ad579293238465b9d93166f809726a0';

export function callbackSpotify(req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    console.log(code, state)

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        const authOptions = {
            method: 'POST',
            body: new URLSearchParams({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            }
        };
        console.log(authOptions)
        fetch('https://accounts.spotify.com/api/token', authOptions)
            .then(response => response.json())
            .then(data => {
                let access_token = data.access_token
                let refresh_token = data.refresh_token
                connection.execute('UPDATE users SET token = ?, refresh_token = ? WHERE user_id = ?', [access_token, refresh_token, state])
                    .then(() => {
                        console.log("¡Hola! ¿Cómo estás?");
                        res.redirect('http://localhost:5173/callback/access_granted');
                    })
                    .catch(error => {
                        console.error(error);
                        res.redirect('http://localhost:5173/callback/access_denied');
                    });

            })
            .catch(error => {
                console.error(error);
                res.redirect('http://localhost:5173/callback/access_denied');
            });
    }

}


    export async function searchSongs(roomCode, query) {

        const queryParams = new URLSearchParams({
            q: query,
            type: "track",
            limit: "10"
        })

        const tokens = await getTokenByRoom({ body: {roomCode} });

        const token = tokens.token
        // console.log("Estas son los tokents",tokens)
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }


        const url = `https://api.spotify.com/v1/search?${queryParams.toString()}`;

        const result = await fetch(url, { headers })
        
        if(!result.ok){
            throw new Error("Error al buscar canciones",result)
        }

        const data = await result.json()
        return data;
    }
