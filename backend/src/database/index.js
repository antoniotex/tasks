const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const User = require('../models/User')
const Poster = require('../models/Poster')
const Image = require('../models/Image')
const Category = require('../models/Category')

const connection = new Sequelize(dbConfig)

User.init(connection)
Poster.init(connection)
Image.init(connection)
Category.init(connection)

User.associate(connection.models)
Poster.associate(connection.models)
Image.associate(connection.models)
Category.associate(connection.models)

module.exports = connection