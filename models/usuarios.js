'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypst = require('bcrypt-nodejs')

const UsuariosSchema = Schema({
	nombre: { type: String, unique: true, required: true},
	correo: { type: String, unique: true, required: true},
	pass : String,
	tinkets: [{
		id: Number,
		estado: {type:String,default:'valido'},
		empresa: {type: String,required: true},
		fechaExp: Date,
		costo: Number,
		detalle: String
	}]
})


module.exports = mongoose.model('usuario', UsuariosSchema)
	
