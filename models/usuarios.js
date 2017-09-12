'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypst = require('bcrypt-nodejs')

const UsuariosSchema = Schema({
	nombre: { type: String, unique: true, required: true},
	correo: { type: String, unique: true, required: true},
	pass : String,
	tinket: {
		casino:[{
			id: Number,
			estado: {type:String,default:'valido'}
		}],
		cine:[{
			id: Number,
			estado: {type:String,default:'valido'}
		}],
	}
})


module.exports = mongoose.model('usuario', UsuariosSchema)
	
