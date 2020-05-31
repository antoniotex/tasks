const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')

require('./database')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(routes)

app.listen(3333)