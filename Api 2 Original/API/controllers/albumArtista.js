const express = require('express');
const router = express.Router();
const { Album, Artista } = require('../db/models');

router.get('/albumsArtista/:Id', async (req, res) => {
  try {
    const { Id } = req.params;

    const artista = await Artista.findByPk(Id);

    if (!artista) {
      return res.status(404).json({ error: 'Artista não encontrado' });
    }

    const album = await Album.findAll({
      where: {artistaId: Id},
      attributes: ['id', 'nome']
    });

    return res.json(album);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar os albums do artista' });
  }
});

module.exports = router;