'use strict'

const Empresa = require('../models/empresas')


function getEmpresas (req,res) {
	Empresa.find({}, (err, empresa) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!empresa) return res.status(404).send({message: 'Empresao inexistente'})	
		res.status(200).send({empresa: empresa})
})
}


function getEmpresa (req, res) {
	let empresaId = req.params.empresasId

	Empresa.findById(empresaId, (err, empresa) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!empresa) return res.status(404).send({message: 'Empresao inexistente'})	
		res.status(200).send({empresa: empresa})
	})
}

function buscarEmpresa (req, res) {
	Empresa.findOne({ nombreEmpresa : req.body.nombre }, (err, empresa) => {
		if (err) return res.status(500).send({ message: err })
		if (!empresa) return res.status(404).send({ message: 'No existe la empresa '+req.body.nombre })
		res.status(200).send({empresa: empresa})
	})
}

module.exports = {
    getEmpresas,
	getEmpresa,
	buscarEmpresa
}
