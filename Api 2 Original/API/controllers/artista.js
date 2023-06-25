// Incluir as bibliotecas
// Gerencia as requisicoes, rotas e urls, entre outras funcionalidades
const express = require('express');

// chamar a funcao express 
const router= express.Router();

// Incluir o arquivo que possui a conexao com a base de dados
const db = require('../db/models');
const { where } = require('sequelize');


// criar rota get
router.get("/artista", async (req, res) => {
    const artista = await db.Artista.findAll({
        attributes: ['id', 'nome', 'pais']
    });

    if (artista){
        return res.json(artista);
    }else{
        return res.status(400).json({
            mensagem: "Erro: Nenhum Artista encontrado!"
        });
    } 
});


// criar rota post
router.post("/artista", async (req, res) => {
    try {
      const { nome, pais } = req.body;
      const {dados} = req.body;
      console.log(dados)
 
      const artista = await db.Artista.create({ nome, pais });
  
      return res.json(artista);
    } catch (error) {
      return res.status(400).json({
        mensagem: "Erro ao criar Artista!"
      });
    }
});
  

// criar rota get by id
router.get("/artista/:id", async (req, res) => {
    const {id} = req.params;
    const aurtor = await db.Artista.findOne({
        attributes: ['id', 'nome', 'pais'],
        where: {id},
    })

    if (aurtor) {
        return res.json(aurtor);
    }else{
        return res.status(404).json({ error: 'Artista não encontrado' });
    }
})

// criar a rota put 
router.put('/artista/:id', async (req, res) => {
    const {id} = req.params;
    var  { nome, pais } = req.body;
    await db.Artista.update({nome: nome, pais: pais}, {where:{id}})
    .then(()=>{
        return res.json({mensagem: 'Dados do Artista atualizado'});
    }).catch(()=>{
        return res.status(404).json({error: 'Não foi possivel atualizar dados do Artista'});
    })
    
});
  
// 
router.delete('/artista/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.Artista.destroy({
        where: { id }
      });
      res.status(200).json({ message: 'Artista foi apagado' });
    } catch (error) {
      res.status(404).json({ message: 'Não foi possivel apagar o Artista' });
    }
});


module.exports = router;