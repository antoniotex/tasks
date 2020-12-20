const express = require('express')

const authMiddleware = require('./middlewares/auth')
const uploads3 = require('./services/file-upload')

const UserController = require('./controller/UserController')
const AuthController = require('./controller/AuthController')
const PosterController = require('./controller/PosterController')

const routes = express.Router()


// AUTH ROTES
routes.post('/register', AuthController.register)
routes.post('/authenticate', AuthController.authenticate)

// USER ROUTES
routes.get('/users/posters/:user_id', authMiddleware, PosterController.indexByUser)
routes.post('/users/forgot_password', AuthController.forgotPassword)
routes.post('/users/reset_password', AuthController.resetPassword)
routes.put('/users/:user_id', authMiddleware, UserController.update)
routes.delete('/users/:user_id', authMiddleware, UserController.delete)

// POSTER ROUTES
routes.get('/posters', PosterController.index)
routes.get('/posters/search', PosterController.search)
routes.get('/posters/:id', PosterController.indexById)

routes.post('/posters/:user_id', uploads3.array('images', 6), PosterController.store)
routes.put('/posters/:id', uploads3.array('images', 6), PosterController.update)

routes.delete('/posters/:id', PosterController.delete)
routes.delete('/posters/image/:image_id', PosterController.deleteImageById)

routes.get('/categories', PosterController.getCategories)

module.exports = routes