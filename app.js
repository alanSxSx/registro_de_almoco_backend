// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
const cors = require("cors");
// Chamar a função express
const app = express();
app.use(cors());
// Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir todas as origens (não seguro para produção)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


// Testar conexão com banco de dados
// const db = require("./db/models");

// Incluir as CONTROLLERS
const users = require("./controllers/users");
const precos = require("./controllers/precos");
const refeicoes = require("./controllers/refeicoes");
const setores = require("./controllers/setores");

// Criar as rotas
app.use('/', users);
app.use('/', precos);
app.use('/', refeicoes);
app.use('/', setores);

// Iniciar o servidor na porta 8080, criar a função utilizando modelo Arrow function para retornar a mensagem de sucesso
app.listen(process.env.PORT || 8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});