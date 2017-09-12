'use strict'

const express = require('express')
const usuariosCtrl = require('../controllers/usuarios')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/usuarios', usuariosCtrl.getUsuarios)
api.get('/usuarios/:usuariosId', auth, usuariosCtrl.getUsuario)
api.get('/usuarios/Entrada/:usuariosId', auth, usuariosCtrl.getEntrada)
api.get('/usuarios/validarCasino/:usuariosId', auth, usuariosCtrl.validarCasino)
api.get('/usuarios/validarCine/:usuariosId', auth, usuariosCtrl.validarCine)
api.get('/usuarios/rehab/:usuariosId', auth, usuariosCtrl.rehabTickets)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
