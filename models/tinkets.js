'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypst = require('bcrypt-nodejs')

const TinketsSchema = Schema({
	id: Number,
	estado: String,
	empresa: String,
	fechaExp: Date,
	costo: Number,
	detalle: String

})


module.exports = mongoose.model('tinkets', TinketsSchema)
	
