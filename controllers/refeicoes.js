const express = require("express");
const router = express.Router();
const db = require('../db/models');

router.get("/refeicoes/:id", async (req,res) =>{
    const {id} = req.params;
    const refeicao = await db.Refeicoes.findOne({

        attributes:['id','id_funcionario','data','time','tipo','preco_funcionario','preco_empresa','preco_total'],
        where: {id},
        order:[['id','ASC']],
    })

    if(refeicao) {
        return res.json(
           refeicao
        )
    } else {
        return res.status(400).json({
            mensagem:"Refeição não Cadastrado",
        })
    }
})

router.get("/refeicoes/id_funcionario/:id_funcionario", async (req, res) => {
    try {
        const { id_funcionario } = req.params;

        // Consultar o banco de dados para buscar as refeições do funcionário com o id_funcionario especificado
        const refeicoesDoFuncionario = await db.Refeicoes.findAll({
            attributes: ['id', 'id_funcionario', 'data', 'time', 'tipo', 'preco_funcionario', 'preco_empresa', 'preco_total'],
            where: {
                id_funcionario: id_funcionario
            },
            order: [['id', 'ASC']]
        });

        if (refeicoesDoFuncionario.length === 0) {
            // Se não foram encontradas refeições para o funcionário, retorne um status 404 (Not Found)
            return res.status(404).json({
                mensagem: "Refeições não encontradas para o funcionário com o ID especificado."
            });
        }

        // Se as refeições foram encontradas, retorne-as como resposta
        res.json(refeicoesDoFuncionario);
    } catch (error) {
        // Em caso de erro, retorne um status 500 (Internal Server Error) e uma mensagem de erro
        console.error(error);
        res.status(500).json({
            mensagem: "Ocorreu um erro ao buscar as refeições do funcionário."
        });
    }
});

router.post("/refeicoes", async (req,res) =>{

    let dados = req.body;

    await db.Refeicoes.create(dados).then((dadosRefeicoes) => {
        return res.json({
            mensagem:"Refeição Cadastrado com Sucesso",
            dadosRefeicoes
        })
    }).catch(() =>{
        return res.status(400).json({
            mensagem:"Refeição não Cadastrado",
        })
    })

});


router.get("/refeicoes", async (req,res) =>{
    const refeicoes = await db.Refeicoes.findAll({

        attributes:['id','id_funcionario','data','time','tipo','preco_funcionario','preco_empresa','preco_total'],
        order:[['id','ASC']]
    })

    if(refeicoes) {
        return res.json(
           refeicoes
        )
    } else {
        return res.status(400).json({
            mensagem:"Refeição não Cadastrado",
        })
    }
})


router.put("/refeicoes", async (req,res) =>{

    let dados = req.body;

    await db.Refeicoes.update(dados, {where: {id:dados.id}})
    
    .then(() => {
        return res.json({
            mensagem:"Refeição Alterado com Sucesso",       
        })
    }).catch(() =>{
        return res.status(400).json({
            mensagem:"Refeição não Alterado",
        })
    })

});

router.delete("/refeicoes/:id", async (req,res) =>{
    const {id} = req.params;
    const refeicao = await db.Refeicoes.destroy({

        where: {id},
    })

    if(refeicao) {
        return res.json({
            mensagem:"Refeição Deletado com Sucesso"
        })
    } else {
        return res.status(400).json({
            mensagem:"Refeição não Deletado",
        })
    }
})



module.exports = router;