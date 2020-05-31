const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const User = require('../models/User')
const Poster = require('../models/Poster')

const connection = new Sequelize(dbConfig)

User.init(connection)
Poster.init(connection)

User.associate(connection.models)
Poster.associate(connection.models)

module.exports = connection