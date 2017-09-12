'use strict'

const Usuario = require('../models/usuarios')


function getUsuarios (req,res) {
	Usuario.find({}, (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuarioo inexistente'})	
		res.status(200).send({usuario: usuario})
})
}


function getUsuario (req, res) {
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId, (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuarioo inexistente'})	
		res.status(200).send({usuario: usuario})
	})
}


function getEntrada (req, res) {
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId,  (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuarioo inexistente'})
		res.status(200).send({message: usuario.nombre+' posee la entrada con ID '+usuario.tinkets.casino[0].id}) 
	})
}

function validarCasino (req,res)  {
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId,  (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuarioo inexistente'})
		if (!usuario.tinkets.casino || usuario.tinkets.casino[0].estado != 'valido') return res.status(500).send({message: 'No hay tinkets disponibles'})
		else usuario.tinkets.casino[0].estado = 'usado'	
		res.status(200).send({message: 'El tinket con ID '+usuario.tinkets.casino[0].id+' ha sido validado'}) 
		usuario.save()

	})
}

function validarCine (req,res)  {
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId,  (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuarioo inexistente'})
		if (!usuario.tinkets.cine || usuario.tinkets.cine[0].estado != 'valido') return res.status(500).send({message: 'No hay tinkets disponibles'})
		else usuario.tinkets.cine[0].estado = 'usado'	
		res.status(200).send({message: 'El tinket con ID '+usuario.tinkets.cine[0].id+' ha sido validado'}) 
		usuario.save()

	})
}

function rehabTickets (req,res)  {
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId, (err, usuario) => {
		var CON = 0
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuarioo inexistente'})
		while (usuario.tinkets.casino[CON].id) {
			usuario.tinkets.casino[CON].estado = 'valido'
			CON = CON + 1 
			usuario.save()
		}
		
	})
}


module.exports = {
    getUsuarios,
	getUsuario,
	getEntrada,
   	validarCasino,
	validarCine,
	rehabTickets
}
