const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000


const db = require('./app/model')
db.sequelize.sync()
    .then(() => {
        console.log('Conectado ao banco de dados ');
    })
    .catch((err) => {
        console.log('Failed to sync db : ' + err.message);
    });


// Opções do Cors
const corsOptions = {
	origin: 'http://localhost:3000/'
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// Requisições no path principal da aplicação
app.get('/', (req, res) => {
    res.send('Requisição incial')
})

// Sempre declarar os Routers depois dos use do BodyParser
// Criando a rota para o endpoint de Pessoas
const pessoas = require('./app/routes/pessoas.route.js')
app.use('/pessoas', pessoas)

// Criando a rota para o endpoint de tutoriais
const tutoriais = require('./app/routes/tutoriais.route.js')
app.use('/tutoriais', tutoriais)




app.listen(port, () => {
    console.log(`Aplicação respondendo na porta ${port}`)
})