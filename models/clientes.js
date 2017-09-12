'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientesSchema = Schema({
  nombre: String,
  tinketCasinoDispo: [Date],
  tinketCasinoUsado: [Date],
  tinketCineDispo: [Date],
  tinketCineUsado: [Date]
})

module.exports = mongoose.model('clientes', clientesSchema)
