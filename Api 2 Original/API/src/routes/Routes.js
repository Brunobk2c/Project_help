const express = require('express');
const router  = express.Router();
const auth = require('../middlewares/auth');
const passport = require("passport");
const AuthController = require('../../controllers/AuthController');
const app = express();

// ---------- MusicasController ----------
const musicas = require('../../controllers/musicas')
app.use('/', musicas)

// ---------- ArtistasController ----------
const artista = require('../../controllers/artista');
app.use('/', artista);

// ---------- AlbumController ----------
const album = require('../../controllers/album')
app.use('/', album)

// ---------- AlbumporArtistaController ----------
// ---------- MusicasporArtistaController ----------
// ---------- MusicasporGeneroController ----------
// ---------- AuthController ----------

app.get('/protected', AuthController.protected)
app.get('/login', AuthController.login);
app.get('/logout', AuthController.logout);
app.get('/me', auth, AuthController.me);
app.get('/githubme', auth, AuthController.gitHubMe);
app.get('/auth/github', passport.authenticate("github", { scope: ['profile', 'email'] }));
app.get('/auth/github/callback', passport.authenticate("github", { scope: ['profile', 'email'] }), function (req, res) {
    res.redirect('/protected');
});
app.get('/', auth, AuthController.protected); // Catch-all route

module.exports = app;
