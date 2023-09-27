
const jwt = require('jsonwebtoken');

const { promisify } = require('util');


module.exports = {
    eAdmin: async function (req,res,next){
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(400).json({
                erro:true,
                mensagem:'Autenticação falhou. Precisa realizar o login'
            })
        }

        const [, token] = authHeader.split(' ');
        if (!token) {
            return res.status(401).json({ 
                erro:true,
                mensagem: 'Autenticação falhou. Token não fornecido.' 
            });
          }
          
          try{
            const decode = await promisify(jwt.verify)(token,'ALKSJASOKHFOIH9856736456LKAHSIOAHSI')
            req.userId = decode.id;
            return next();
        }catch(err){
            return res.status(401).json({ 
                erro:true,
                mensagem: 'Autenticação falhou. Token Inválido.' 
            });
        }

    }
}
