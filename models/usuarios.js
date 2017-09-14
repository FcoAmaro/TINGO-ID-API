'use strict'

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const bcrypst = require('bcrypt-nodejs')

const UsuariosSchema = Schema({
	nombre: { type: String, unique: true, required: true},
	correo: { type: String, unique: true, required: true},
	pass : String,
	registro: {type: Date, default: Date.now},
	tinket: {type: [{
		id: {type: Number, required: true},
		estado: {type: String, required: true, default: "NONE"},
		empresa: {type: String, required: true},
		emision: Date,
		detalle: String
	}],required:false}
})

UsuariosSchema.plugin(uniqueValidator)

module.exports = mongoose.model('usuario', UsuariosSchema)
	
