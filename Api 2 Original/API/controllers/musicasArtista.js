const express = require('express');
const router = express.Router();
const { Musicas, Artista } = require('../db/models');

router.get('/musicasArtista/:Id', async (req, res) => {
  try {
    const { Id } = req.params;

    const artista = await Artista.findByPk(Id);

    if (!artista) {
      return res.status(404).json({ error: 'Artista não encontrado' });
    }

    const musicas = await Musicas.findAll({
      where: {artistaId: Id},
      attributes: ['id', 'nome', 'genero', 'dataLancamento']
    });

    return res.json(musicas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar os musicas do artista' });
  }
});

module.exports = router;