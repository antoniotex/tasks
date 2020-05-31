const express = require('express')

const UserController = require('./controller/UserController')
const AuthController = require('./controller/AuthController')

const routes = express.Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.post('/register', AuthController.register)
routes.post('/authenticate', AuthController.authenticate)

module.exports = routes