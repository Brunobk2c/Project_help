// Incluir as bibliotecas
// Gerencia as requisicoes, rotas e urls, entre outras funcionalidades
const express = require('express');

// chamar a funcao express 
const router= express.Router();

// Incluir o arquivo que possui a conexao com a base de dados
const db = require('../db/models');
const { where } = require('sequelize');


// criar rota get
router.get("/album", async (req, res) => {
    const album = await db.Album.findAll({
        attributes: ['id', 'nome', 'artistaId']
    });

    if (album){
        return res.json(album);
    }else{
        return res.status(400).json({
            mensagem: "Erro: Nenhum Album encontrado!"
        });
    } 
});


// criar rota post
router.post("/album", async (req, res) => {
    try {
      const {nome, artistaId} = req.body;
      const {dados} = req.body;
      console.log(dados)
 
      const album = await db.Album.create({ nome, artistaId});
  
      return res.json(album);
    } catch (error) {
      return res.status(400).json({
        mensagem: "Erro ao criar Album!"
      });
    }
});
  

// criar rota get by id
router.get("/album/:id", async (req, res) => {
    const {id} = req.params;
    const album = await db.Album.findOne({
        attributes: ['id', 'nome', 'artistaId'],
        where: {id},
    })

    if (album) {
        return res.json(album);
    }else{
        return res.status(404).json({ error: 'Album não encontrado' });
    }
})

// criar a rota put 
router.put('/album/:id', async (req, res) => {
    const {id} = req.params;
    var  { nome, artistaId} = req.body;
    await db.Album.update({nome: nome, artistaId: artistaId}, {where:{id}})
    .then(()=>{
        return res.json({mensagem: 'Dados do Album atualizado'});
    }).catch(()=>{
        return res.status(404).json({error: 'Não foi possivel atualizar dados do Album'});
    })
    
});
  
// 
router.delete('/album/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.Album.destroy({
        where: { id }
      });
      res.status(200).json({ message: 'Album foi apagado' });
    } catch (error) {
      res.status(404).json({ message: 'Não foi possivel apagar o Album' });
    }
});


module.exports = router;