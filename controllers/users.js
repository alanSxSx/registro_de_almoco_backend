const express = require("express");
const router = express.Router();
const db = require('../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {eAdmin} = require('../middlewares/auth')


router.get("/users/:id", async (req,res) =>{
    const {id} = req.params;
    const user = await db.Users.findOne({

        attributes:['id','name','cpf','id_setor','senha','status','tipo'],
        where: {id},
        order:[['id','ASC']],
    })

    if(user) {
        return res.json(
           user
        )
    } else {
        return res.status(400).json({
            mensagem:"Usuário não Cadastrado",
        })
    }
})



// router.post("/users", async (req,res) =>{

//     let dados = req.body;

//     await db.Users.create(dados).then((dadosUsuario) => {
//         return res.json({
//             mensagem:"Usuario Cadastrado com Sucesso",
//             dadosUsuario
//         })
//     }).catch(() =>{
//         return res.status(400).json({
//             mensagem:"Usuario não Cadastrado",
//         })
//     })

// });

router.post("/users", async (req,res) =>{

    let dados = req.body;

    dados.senha = await bcrypt.hash(dados.senha, 8)

    console.log(dados)

    await db.Users.create(dados).then((dadosUsuario) => {
                return res.json({
                    mensagem:"Usuario Cadastrado com Sucesso",
                    dadosUsuario
                })
            }).catch(() =>{
                return res.status(400).json({
                    mensagem:"Usuario não Cadastrado",
                })
            })

});

router.post("/login", async (req,res) =>{

    const user = await db.Users.findOne({
        attributes:['id','name','cpf','senha','id_setor','status','tipo'],
        where:{
            cpf:req.body.cpf
        }
    })

    if(user === null) {
        return res.status(400).json({
            mensagem:"Usuario ou a senha incorreta.",
        })
    }

    if(!(await bcrypt.compare(req.body.senha, user.senha))){
        return res.status(400).json({
            mensagem:"Usuario ou a senha incorreta.",
        })
    }

    const userData = {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        id_setor: user.id_setor,
        status: user.status,
        tipo: user.tipo
      };

    var token = jwt.sign({id:user.id}, "ALKSJASOKHFOIH9856736456LKAHSIOAHSI",{
        expiresIn:'7d'
    })

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso !",
        token,
        userData
    })


});

router.get("/users",eAdmin, async (req,res) =>{
    const users = await db.Users.findAll({

        attributes:['id','name','cpf','id_setor','senha','status','tipo'],
        order:[['id','ASC']]
    })

    if(users) {
        return res.json(
           users
        )
    } else {
        return res.status(400).json({
            mensagem:"Usuário não Cadastrado",
        })
    }
})


// router.get("/users", async (req,res) =>{
//     const users = await db.Users.findAll({

//         attributes:['id','name','cpf','id_setor','senha','status','tipo'],
//         order:[['id','ASC']]
//     })

//     if(users) {
//         return res.json(
//            users
//         )
//     } else {
//         return res.status(400).json({
//             mensagem:"Usuário não Cadastrado",
//         })
//     }
// })


router.put("/users", async (req,res) =>{

    let dados = req.body;

    dados.senha = await bcrypt.hash(dados.senha, 8)

    await db.Users.update(dados, {where: {id:dados.id}})
    
    .then(() => {
        return res.json({
            mensagem:"Usuario Alterado com Sucesso",       
        })
    }).catch(() =>{
        return res.status(400).json({
            mensagem:"Usuario não Alterado",
        })
    })

});

// router.patch("/users/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { body } = req;  

//         body.senha = await bcrypt.hash(body.senha, 8)

//         const updatedUser = await db.Users.update(body, {
//             where: { id },
//         });

//         if (updatedUser[0] === 1) {
//             const updatedUserData = await db.Users.findOne({
//                 attributes: ['id', 'name', 'cpf', 'id_setor', 'senha', 'status', 'tipo'],
//                 where: { id },
//             });

//             return res.json(updatedUserData);
//         } else {
//             return res.status(400).json({
//                 mensagem: "Usuário não encontrado ou não atualizado",
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             mensagem: "Erro ao atualizar usuário",
//         });
//     }
// });


router.patch("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        // Consulte o usuário no banco de dados para obter a senha criptografada existente.
        const existingUser = await db.Users.findOne({
            attributes: ['id', 'senha'],
            where: { id },
        });

        if (!existingUser) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado",
            });
        }

        // Compare a senha fornecida no corpo da solicitação com a senha criptografada existente.
        const senhaIgual = body.senha === existingUser.senha

        if (senhaIgual) {
            // A senha é a mesma, não é necessário recriptografar.
            delete body.senha; // Remova a senha do corpo da solicitação para evitar a recriptografia.

            const [updatedRows] = await db.Users.update(body, {
                where: { id },
            });

            if (updatedRows === 1) {
                const updatedUserData = await db.Users.findOne({
                    attributes: ['id', 'name', 'cpf', 'id_setor', 'senha', 'status', 'tipo'],
                    where: { id },
                });

                return res.json(updatedUserData);
            }
        } else {
            // A senha é diferente, recriptografe a nova senha antes de atualizar.
            body.senha = await bcrypt.hash(body.senha, 8);

            const [updatedRows] = await db.Users.update(body, {
                where: { id },
            });

            if (updatedRows === 1) {
                const updatedUserData = await db.Users.findOne({
                    attributes: ['id', 'name', 'cpf', 'id_setor', 'senha', 'status', 'tipo'],
                    where: { id },
                });

                return res.json(updatedUserData);
            }
        }

        return res.status(400).json({
            mensagem: "Usuário não encontrado ou não atualizado",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            mensagem: "Erro ao atualizar usuário",
        });
    }
});

router.delete("/users/:id", async (req,res) =>{
    const {id} = req.params;
    const user = await db.Users.destroy({

        where: {id},
    })

    if(user) {
        return res.json({
            mensagem:"Usuario Deletado com Sucesso"
        })
    } else {
        return res.status(400).json({
            mensagem:"Usuario não Deletado",
        })
    }
})

module.exports = router;