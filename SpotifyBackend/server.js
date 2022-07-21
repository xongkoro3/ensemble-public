let express = require('express')
let request = require('request')
let querystring = require('querystring')

let app = express()
var access_token = "This is the default";
let redirect_uri =
    process.env.REDIRECT_URI ||
    'http://localhost:8888/callback'

let SPOTIFY_CLIENT_ID = "a800b19d1b80455b8bb1a72c3d0d5553";
let SPOTIFY_CLIENT_SECRET = "e1e79742edb04b4a92f598d9149c43fb";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/login', function(req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            //client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-read-playback-state user-read-currently-playing',

            redirect_uri
        }))
})

app.get('/callback', function(req, res) {
    let code = req.query.code || null
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
                SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
                //process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        },
        json: true
    }
    request.post(authOptions, function(error, response, body) {
        access_token = body.access_token
        let uri = process.env.FRONTEND_URI || 'http://0.0.0.0:8886/'
        res.redirect(uri + '?access_token=' + access_token)
    })

})

app.get('/api/codes/', (req, res) => {
    res.send(access_token);
});

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)
