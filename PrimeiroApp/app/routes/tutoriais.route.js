const express = require('express')

const controller = require('../controllers/tutorial.controller.js')
const tutoriais = express.Router()

tutoriais.use((req, res, next) => {
    console.log(`Chamou o serviço de tutoriais no endereço ${req.originalUrl} com o protocolo ${req.protocol}`)
    next()
})

// Criando o tutorial
tutoriais.post('/', controller.create);

// Buscando todos os tutoriais
tutoriais.get('/', controller.findAll);

// Recuperando todos os tutoriais publicados
tutoriais.get("/published", controller.findAllPublished);

// Recuperando o Tutorial pelo Id
tutoriais.get("/:id", controller.findOne);

// Atualizando o tutorial pelo Id
tutoriais.put("/:id", controller.update);

// Removendo o tutorial pelo Id
tutoriais.delete("/:id", controller.delete);

// Removendo todos os tutoriais
tutoriais.delete("/", controller.deleteAll);

module.exports = tutoriais