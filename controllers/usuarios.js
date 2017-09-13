'use strict'

const Usuario = require('../models/usuarios')


function crearUsuario (req, res) {
	const usuario = new Usuario({
		nombre: req.body.nombre,
		correo: req.body.correo,
		pass: req.body.pass,
		tinket: [{id : 0,empresa: "TingoID"}]
	})

	usuario.save((err,usuario) => {
		if (err) return res.status(500).send({ message: `Error al crear el usuario: `+err })
		res.status(201).send({ usuario:usuario,message: 'Registrado!!'})
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

	Usuario.findByIdAndUpdate(usuarioId, { $push: { tinket : Tinket}}, { new: true }, (err, usuario) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!usuario) return res.status(404).send({message: 'Usuario inexistente'})
		res.status(200).send({usuario: usuario,message: ' Ingresado'})
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

function getDetalleTinket (req,res) {
	var jsonApp = JSON.parse(req.responseText);

	var nombre_empresa = req.body.empresa;
	var	numero_registro = req.body.id;
		/*
		*
		 Buscar en la base de datos el nombre de la empresa para encontrar ip y puerto
		 *
		 */
	var socket_empresa = getSocketEmpresa(nombre_empresa);	 
	
	// login a la empresa para obtener el token
	var token = loginEmpresa(socket_empresa);
	
	//Ahora si podemos hacer la consulta a la empresa
	
	// Parametros del JSON que se envia a la caja negra
	const params = {
		'codigoEntradaText':req.body.id,
		'token':token
	}

	var xhr = new XMLHttpRequest();
	var URL = "http://" + JSON.parse(jsonApp.responseText).ip + ":" + JSON.parse(jsonApp.responseText).puerto + "/check_buy";
	xhr.open('POST', URL, false);

	// Agregamos los parametros del formulario post
	
	//xhr.setRequestHeader('token', token);
	xhr.setRequestHeader('Content-type','application/json')
	xhr.send(JSON.stringify(params));
	
	//Ahora podemos hacer lo que queramos con la respuesta
	xhr.onload = function(){
		var detalle_registro = JSON.parse(xhr.responseText);
		res.send(detalle_registro);
	}

/*
	var xhr = (function (token){
		function getXMLHttpRequest(method,url,async){
			var xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open(method,url,async);
			xmlHttpRequest.setRequestHeader('token', token);
			return xmlHttpRequest;
		}
		return getXMLHttpRequest;
	})
*/

}


function loginEmpresa (req, res){
	var xhr = new XMLHttpRequest();
	var URL = "http://" + JSON.parse(req.responseText).ip + ":" + JSON.parse(req.responseText).puerto + "/login";

	xhr.open("POST", URL, false, "TingoID", "1234");
	xhr.send();
	var jsonResponse = JSON.parse(xhr.responseText);
	var token = jsonResponse.token;
	return token;
}




module.exports = {
	crearUsuario,
    getUsuarios,
	getUsuario,
	almacenarTinket,
	getEntrada,
   	validarCasino,
	validarCine,
	rehabTickets,
	loginEmpresa,
	getDetalleTinket
}
