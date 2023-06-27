// Incluir as bibliotecas
// Gerencia as requisicoes, rotas e urls, entre outras funcionalidades
const express = require('express');

// chamar a funcao express 
const router= express.Router();

// Incluir o arquivo que possui a conexao com a base de dados
const db = require('../db/models');
const { where } = require('sequelize');


// criar rota get
router.get("/musicas", async (req, res) => {
    const musicas = await db.Musicas.findAll({
        attributes: ['id','nome', 'genero', 'dataLancamento', 'artistaId', 'albumId']
    });

    if (musicas){
        return res.json(musicas);
    }else{
        return res.status(400).json({
            mensagem: "Erro: Nenhuma Musica encontrada!"
        });
    } 
});


// criar rota post
router.post("/musicas", async (req, res) => {
    try {
      const { nome, genero, dataLancamento, artistaId, albumId } = req.body;
      const {dados} = req.body;
      console.log(dados)
 
      const musicas = await db.Musicas.create({ nome, genero, dataLancamento, artistaId, albumId });
  
      return res.json(musicas);
    } catch (error) {
      return res.status(400).json({
        mensagem: "Erro ao criar Musica!"
      });
    }
});
  

// criar rota get by id
router.get("/musicas/:id", async (req, res) => {
    const {id} = req.params;
    const musicas = await db.Musicas.findOne({
        attributes: ['id', 'nome', 'genero', 'dataLancamento'],
        where: {id},
    })

    if (musicas) {
        return res.json(musicas);
    }else{
        return res.status(404).json({ error: 'Musica não encontrada' });
    }
})

// criar a rota put 
router.put('/musicas/:id', async (req, res) => {
    const {id} = req.params;
    var  { nome, genero, dataLancamento } = req.body;
    await db.Musicas.update({nome: nome, genero: genero, dataLancamento: dataLancamento}, {where:{id}})
    .then(()=>{
        return res.json({mensagem: 'Dados da Musica atualizado'});
    }).catch(()=>{
        return res.status(404).json({error: 'Não foi possivel atualizar dados da Musica'});
    })
    
});
  
// 
router.delete('/musicas/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.Musicas.destroy({
        where: { id }
      });
      res.status(200).json({ message: 'Musica foi apagado' });
    } catch (error) {
      res.status(404).json({ message: 'Não foi possivel apagar a Musica' });
    }
});


module.exports = router;