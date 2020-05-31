const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

// Next é chamado caso o usuario tenha permissão para acessar o controller
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: 'O token não foi informado' })
  }

  // Formato token: Bearer ioaniecebubwxuxbaicvqebicbeuvxywdgvcgdveybxw
  const pieces = authHeader.split(' ')

  if (pieces.length !== 2) {
    return res.status(401).send({ error: 'Erro de token' })
  }

  const [scheme, token] = pieces

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token não está formatado' })
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) return res.status(401).send({ error: 'Token inválido' })

    req.userId = decoded.id
    return next()
  })

}