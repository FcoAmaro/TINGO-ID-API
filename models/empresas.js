'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypst = require('bcrypt-nodejs')

const EmpresasSchema = Schema({
	nombreEmpresa : {type: String, required: true, unique: true},
	puerto : Number,
	dirIP : String,
	token : String
})


module.exports = mongoose.model('empresa', EmpresasSchema)
	
