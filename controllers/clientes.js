'use strict'

const clientes = require('../models/clientes')

function getclientes (req, res) {
  let clientesId = req.params.clientesId

  clientes.findById(clientesId, (err, clientes) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!clientes) return res.status(404).send({message: `El clienteso no existe`})

    res.status(200).send({ clientes })
  })
}

function getclientess (req, res) {
  clientes.find({}, (err, clientess) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!clientess) return res.status(404).send({message: 'No existen clientesos'})

    res.send(200, { clientess })
  })
}

function saveclientes (req, res) {
  console.log('POST /api/clientes')
  console.log(req.body)

  let clientes = new clientes()
  clientes.nombre = req.body.nombre
  clientes.tinketCasinoDispo = req.body.tinketCasinoDispo
  clientes.tinketCasinoUsado = req.body.tinketCasinoUsado
  clientes.tinketCineDispo = req.body.tinketCineDispo
  clientes.tinketCineUsado = req.body.tinketCineUsado

  clientes.save((err, clientesStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ clientes: clientesStored })
  })
}

function updateclientes (req, res) {
  let clientesId = req.params.clientesId
  let update = req.body

  clientes.findByIdAndUpdate(clientesId, update, (err, clientesUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el clienteso: ${err}`})

    res.status(200).send({ clientes: clientesUpdated })
  })
}

function deleteclientes (req, res) {
  let clientesId = req.params.clientesId

  clientes.findById(clientesId, (err, clientes) => {
    if (err) res.status(500).send({message: `Error al borrar el clienteso: ${err}`})

    clientes.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el clienteso: ${err}`})
      res.status(200).send({message: 'El clienteso ha sido eliminado'})
    })
  })
}

module.exports = {
  getclientes,
  getclientess,
  saveclientes,
  updateclientes,
  deleteclientes
}
