'use strict'

const express = require('express')
const usuariosCtrl = require('../controllers/usuarios')
const empresasCtrl = require('../controllers/empresas')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/empresas', empresasCtrl.getEmpresas)
api.get('/empresas/:empresasId', empresasCtrl.getEmpresa)
api.post('/empresas/buscar', empresasCtrl.buscarEmpresa)

api.post('/usuarios/crear', usuariosCtrl.crearUsuario)
api.get('/usuarios', usuariosCtrl.getUsuarios)
api.get('/usuarios/:usuariosId', usuariosCtrl.getUsuario)
api.get('/usuarios/Entrada/:usuariosId', usuariosCtrl.getEntrada)
api.get('/usuarios/validarCasino/:usuariosId', usuariosCtrl.validarCasino)
api.get('/usuarios/validarCine/:usuariosId', usuariosCtrl.validarCine)
api.get('/usuarios/rehab/:usuariosId', usuariosCtrl.rehabTickets)

api.put('/usuarios/alm/:usuariosId', usuariosCtrl.almacenarTinket)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
