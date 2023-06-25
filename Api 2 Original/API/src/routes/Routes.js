const express = require('express');
const router  = express.Router();
const auth = require('../middlewares/auth');
const passport = require("passport");
const AuthController = require('../../controllers/AuthController');

// ---------- MusicasController ----------
// ---------- ArtistasController ----------
// ---------- AlbumController ----------
// ---------- AlbumporArtistaController ----------
// ---------- MusicasporArtistaController ----------
// ---------- MusicasporGeneroController ----------
// ---------- AuthController ----------

router.get('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/me', auth, AuthController.me);
router.get('/githubme', auth, AuthController.gitHubMe);
router.get('/auth/github', passport.authenticate("github", { scope: ['profile', 'email'] }));
router.get('/auth/github/callback', passport.authenticate("github", { scope: ['profile', 'email'] }), function (req, res) {
    res.redirect('/me');
});
router.get('/', auth, AuthController.protected); // Catch-all route

module.exports = router;
