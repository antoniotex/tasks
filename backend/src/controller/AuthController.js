const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv/config')

async function gerarToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: 86400
    })
}

module.exports = {
    async register(req, res) {
        const { email } = req.body
        try {
            if (await User.findOne({ where: { email } })) {
                return res.status(400).send({ error: 'Já existe um usuário com este endereço de e-mail cadastrado' })
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
        console.log({ email, password })

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

        if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ error: 'Senha inválida' })

        user.password = undefined

        return res.json({ user, token: await gerarToken({ id: user.id }) })
    }
}