const express = require('express');
const router = express.Router();
const { Album, Artista } = require('../db/models');
const artista = require('../db/models/artista');

router.get('/artistaAlbum/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findByPk(id, {
      attributes: ['artistaId'],
    });

    if (album) {
      const artista = await Artista.findByPk(album.artistaId, {
        attributes: ['id', 'nome', 'pais'],
      });

      if (artista) {
        return res.json(artista);
      } else {
        return res.status(404).json({ error: `Artista do album${id} não encontrado` });
      }
    } else {
      return res.status(404).json({ error: `Album${id} não encontrado`});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Erro ao buscar o artista do Album${id}` });
  }
});

module.exports = router;
