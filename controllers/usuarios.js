'use strict'

const Usuario = require('../models/usuarios')
const service = require('../services')

function crearUsuario (req, res) {
	const usuario = new Usuario({
		nombre: req.body.nombre,
		correo: req.body.correo,
		pass: req.body.pass,
		tinket: [{id: 0, empresa: "TingoID"}]
	})

	usuario.save((err,usuario) => {
		if (err) return res.status(500).send({ message: `Error al crear el usuario: `+err })
		res.status(201).send({ usuario:usuario,message: 'Registrado!!', token: service.createToken(usuario)})
	})
}

function iniciarSesion (req, res) {
  Usuario.findOne({ correo: req.body.correo, pass: req.body.pass}, (err, usuario) => {
    if (err) return res.status(500).send({ message: err })
    if (!usuario) return res.status(404).send({ message: 'No existe el usuario' })

    req.usuario = usuario
    res.status(200).send({
      message: 'Te has logueado correctamente'+req.body.correo + ' - '+req.body.pass,
      token: service.createToken(usuario)
    })
  })
}

function getUsuarios (req,res) {
	Usuario.find({}, (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuario inexistente'})	
		res.status(200).send({usuario: usuario})
})
}


function getUsuario (req, res) {
	let usuarioId = req.params.usuariosId

	Usuario.findById(usuarioId, (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuario inexistente'})	
		res.status(200).send({usuario: usuario})
	})
}

function almacenarTinket (req, res) {
	let usuarioId = req.params.usuariosId
	const idRes = req.body.id
	const estadoRes = req.body.estado
	const empresaRes = req.body.empresa
	const detalleRes = req.body.detalle
	const Tinket = {id: idRes,estado: estadoRes,empresa: empresaRes, detalle: detalleRes} //FORMATO
	//const Tinket =req.body.json

	if (estadoRes != "valido") {
		return res.status(500).send({message: 'Ticket no válido, corresponde a : '+estadoRes})
	}

	Usuario.findOne({"tinket.id":idRes},(err, tinket) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (tinket) return res.status(404).send({message: 'El tiket '+idRes+' ya fue alamcenado previamente'})
		Usuario.findByIdAndUpdate(usuarioId, { $push: { tinket : Tinket}}, { new: true }, (err, usuario) => {
			if (err) return res.status(500).send({message: 'Error: '+err})	
			if (!usuario) return res.status(404).send({message: 'Usuario inexistente'})
			res.status(200).send({usuario: usuario,message: ' Ingresado'})
		})
	})

	
}

function getEntrada (req, res) {
	let usuarioId = req.params.usuariosId

	Usuario.findById(usuarioId,  (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuario inexistente'})
		res.status(200).send({message: usuario.nombre+' posee la entrada con ID '+usuario.tinket.casino[0].id}) 
	})
}

function validarCasino (req,res)  {
	let usuarioId = req.params.usuariosId

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
	let usuarioId = req.params.usuariosId

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
	let usuarioId = req.params.usuariosId

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
	crearUsuario,
	iniciarSesion,
    getUsuarios,
	getUsuario,
	almacenarTinket,
	getEntrada,
   	validarCasino,
	validarCine,
	rehabTickets
}
