const express = require('express');
const router  = express.Router();
const auth = require('../middlewares/auth');
const passport = require("passport");
const AuthController = require('../../controllers/AuthController');
const app = express()

const { Artista } = require('../../db/models/artista')

// ---------- MusicasController ----------
// ---------- ArtistasController ----------
const artista = require('../../controllers/artista')
app.use('/', artista)

router.get('/artistas', async (req, res) => {
    const artista = await Artista.findAll();
    res.json(artista);
});


router.post('/artistas', async (req, res) => {
    const { name, email, createAt, updateAt} = req.body;
    const artista = await Artista.create({ name, email, createAt, updateAt });
    res.json(artista);
});



router.get('/artistas/{id}', async (req, res) => {
    const { id } = req.body;
    console.log(id)
    const artista = await Artista.findByPk();
    res.json(artista);
  
    // if (!artista) {
    //   return res.status(404).json({ error: 'Artista not found' });
    // }
  
    // res.json(artista);
});
  
router.put('/artistas/{id}', async (req, res) => {
    const { id } = req.body.id;
    const { name, email } = req.body;
    const artista = await Artista.findByPk(id);
  
    if (!artista) {
      return res.status(404).json({ error: 'Artista not found' });
    }
  
    artista.name = name;
    artista.email = email;
    await artista.save();
  
    res.json(artista);
 });
  
router.delete('/artistas/:id', async (req, res) => {
    const { id } = req.params;
    const artista = await Artista.findByPk(id);
  
    if (!artista) {
      return res.status(404).json({ error: 'Artista not found' });
    }
  
    await artista.destroy();
  
    res.status(204).send();
  });

// ---------- AlbumController ----------
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
