const express = require('express');
const router  = express.Router();
const auth = require('../middlewares/auth');
const passport = require('../middlewares/passport');




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
router.get('/', auth, AuthController.protected);
router.get('/auth/github', passport.authenticate("github", { scope: ['profile', 'email'] }), AuthController.authGitHub);
router.get('/auth/github/callback', passport.authenticate("github", { failureRedirect: "/login" }), AuthController.authCallback);
router.get('/me', auth, AuthController.me);
router.get('/githubme', auth, AuthController.gitHubMe);


module.exports = router;