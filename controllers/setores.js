const express = require("express");
const router = express.Router();
const db = require('../db/models');


router.get("/setores/:id", async (req,res) =>{
    const {id} = req.params;
    const setor = await db.Setores.findOne({

        attributes:['id','name','code'],
        where: {id},
        order:[['id','ASC']],
    })

    if(setor) {
        return res.json(
           setor
        )
    } else {
        return res.status(400).json({
            mensagem:"Setor não Cadastrado",
        })
    }
})


router.post("/setores", async (req,res) =>{
    let dados = req.body;
    await db.Setores.create(dados).then((dadosSetores) => {
        return res.json({
            mensagem:"Usuario Cadastrado com Sucesso",
            dadosSetores
        })
    }).catch(() =>{
        return res.status(400).json({
            mensagem:"Usuario não Cadastrado",
        })
    })

});


router.get("/setores", async (req,res) =>{


    const setores = await db.Setores.findAll({

        attributes:['id','name','code'],
        order:[['id','ASC']]
    })

    if(setores) {
        return res.json(
           setores
        )
    } else {
        return res.status(400).json({
            mensagem:"Setor não Cadastrado",
        })
    }
})


router.put("/setores", async (req,res) =>{

    let dados = req.body;

    await db.Setores.update(dados, {where: {id:dados.id}})
    
    .then((dadosSetores) => {
        return res.json({
            mensagem:"Usuario Alterado com Sucesso",
            dadosSetores
        })
    }).catch(() =>{
        return res.status(400).json({
            mensagem:"Usuario não Alterado",
        })
    })

});


router.delete("/setores/:id", async (req,res) =>{
    const {id} = req.params;
    const setor = await db.Setores.destroy({

        where: {id},
    })

    if(setor) {
        return res.json({
            mensagem:"Setor Deletado com Sucesso"
        })
    } else {
        return res.status(400).json({
            mensagem:"Setor não Deletado",
        })
    }
})

module.exports = router;