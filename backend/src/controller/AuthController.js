const User = require('../models/User')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const bcrypt = require('bcryptjs')

async function gerarToken(params = {}) {
    console.log('Params: ', typeof params.id)
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async register(req, res) {
        const { email } = req.body
        try {
            if (await User.findOne({ where: { email } })) {
                return res.status(400).json({ error: 'Já existe um usuário com este endereço de e-mail cadastrado' })
            }

            const user = await User.create(req.body)
            user.password = undefined

            return res.json({ user, token: await gerarToken({ id: user.id }) })

        } catch (error) {
            return res.status(400).send({ error: 'Falha no registro' })
        }

    },
    async authenticate(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

        if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ error: 'Senha inválida' })

        user.password = undefined

        return res.json({ user, token: await gerarToken({ id: user.id }) })
    }
}