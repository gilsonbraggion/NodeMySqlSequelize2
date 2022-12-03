const express = require('express')
const pessoas = express.Router()

pessoas.use((req, res, next) => {
    console.log(`Chamou o serviço de pessoas no endereço ${req.originalUrl}`)
    next()
})

// pesquisando todos as pessoas
pessoas.get('/', (req, res) => {
    res.send('Pessoas home page')
  })

  // rota sobre as pessoas
pessoas.get('/about', (req, res) => {
    res.send('Dados das pessoas')
})
  
module.exports = pessoas