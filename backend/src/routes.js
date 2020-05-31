const express = require('express')

const UserController = require('./controller/UserController')
const AuthController = require('./controller/AuthController')

const routes = express.Router()

routes.put('/users/:user_id', UserController.update)
routes.delete('/users/:user_id', UserController.delete)

routes.post('/register', AuthController.register)
routes.post('/authenticate', AuthController.authenticate)

module.exports = routes