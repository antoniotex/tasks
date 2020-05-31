const express = require('express')

const UserController = require('./controller/UserController')
const AuthController = require('./controller/AuthController')
const PosterController = require('./controller/PosterController')

const routes = express.Router()

routes.put('/users/:user_id', UserController.update)
routes.delete('/users/:user_id', UserController.delete)

routes.post('/register', AuthController.register)
routes.post('/authenticate', AuthController.authenticate)

routes.get('/posters', PosterController.index)
routes.get('/posters/:id', PosterController.indexById)
routes.post('/:user_id/posters', PosterController.store)
routes.put('/posters/:id', PosterController.update)

module.exports = routes