const express = require('express');
const router = express.Router();
const { Musicas, Artista } = require('../db/models');
const artista = require('../db/models/artista');

router.get('/artistaMusicas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const musicas = await Musicas.findByPk(id, {
      attributes: ['artistaId'],
    });

    if (musicas) {
      const artista = await Artista.findByPk(musicas.artistaId, {
        attributes: ['id', 'nome', 'pais'],
      });

      if (artista) {
        return res.json(artista);
      } else {
        return res.status(404).json({ error: `Artista da musica${id} não encontrado` });
      }
    } else {
      return res.status(404).json({ error: `Musica${id} não encontrado`});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Erro ao buscar o artista da Musica${id}` });
  }
});

module.exports = router;