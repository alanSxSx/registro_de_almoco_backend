const express = require("express");
const router = express.Router();
const db = require('../db/models');

router.get("/precos/:id", async (req,res) =>{
    const {id} = req.params;
    const preco = await db.Precos.findOne({

        attributes:['id','precofuncionario','precoempresa','precototal'],
        where: {id},
        order:[['id','ASC']],
    })

    if(preco) {
        return res.json({
           preco
        })
    } else {
        return res.status(400).json({
            mensagem:"Usuário não Cadastrado",
        })
    }
})

router.post("/precos", async (req,res) =>{

    let dados = req.body;

    await db.Precos.create(dados).then((dadosPreco) => {
        return res.json({
            mensagem:"Usuario Cadastrado com Sucesso",
            dadosPreco
        })
    }).catch(() =>{
        return res.status(400).json({
            mensagem:"Usuario não Cadastrado",
        })
    })

});


router.get("/precos", async (req,res) =>{
    const precos = await db.Precos.findAll({

        attributes:['id','precofuncionario','precoempresa','precototal'],
        order:[['id','ASC']]
    })

    if(precos) {
        return res.json(
           precos
        )
    } else {
        return res.status(400).json({
            mensagem:"Preco não Cadastrado",
        })
    }
})


router.put("/precos", async (req,res) =>{

    let dados = req.body;

    await db.Precos.update(dados, {where: {id:dados.id}})
    
    .then(() => {
        return res.json({
            mensagem:"Preco Alterado com Sucesso",       
        })
    }).catch(() =>{
        return res.status(400).json({
            mensagem:"Preco não Alterado",
        })
    })

});

router.patch("/precos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
  
      const updatedPreco = await db.Precos.update(body, {
        where: { id },
      });
  
      if (updatedPreco[0] === 1) {
        const updatedPrecoData = await db.Precos.findOne({
          attributes: ['id', 'precofuncionario', 'precoempresa', 'precototal'],
          where: { id },
        });
  
        return res.json(updatedPrecoData);
      } else {
        return res.status(400).json({
          mensagem: "Preço não encontrado ou não atualizado",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        mensagem: "Erro ao atualizar preço",
      });
    }
  });
  

router.delete("/precos/:id", async (req,res) =>{
    const {id} = req.params;
    const preco = await db.Precos.destroy({

        where: {id},
    })

    if(preco) {
        return res.json({
            mensagem:"Preco Deletado com Sucesso"
        })
    } else {
        return res.status(400).json({
            mensagem:"Preco não Deletado",
        })
    }
})

module.exports = router;