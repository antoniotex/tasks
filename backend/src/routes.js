const express = require('express')
const stream = require('stream')

const authMiddleware = require('./middlewares/auth')
const uploads3 = require('./services/file-upload')

const UserController = require('./controller/UserController')
const AuthController = require('./controller/AuthController')
const PosterController = require('./controller/PosterController')

const routes = express.Router()

routes.put('/users/:user_id', authMiddleware, UserController.update)
routes.delete('/users/:user_id', authMiddleware, UserController.delete)

routes.post('/register', AuthController.register)
routes.post('/authenticate', AuthController.authenticate)

routes.get('/posters', PosterController.index)
routes.get('/posters/search', PosterController.search)
routes.get('/posters/:id', PosterController.indexById)

routes.post('/:user_id/posters', uploads3.array('images', 4), PosterController.store)

routes.put('/posters/:id', authMiddleware, PosterController.update)
routes.delete('/posters/:id', authMiddleware, PosterController.delete)

module.exports = routes