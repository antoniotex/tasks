const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const sgMail = require('@sendgrid/mail');

require('dotenv/config')

async function gerarToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn:86400
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

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

        console.log({password, nova:user.password})
        if (!await bcrypt.compare(password, user.password)) 
            return res.status(400).json({ error: 'Usuário ou senha incorretos' })

        user.password = undefined

        return res.json({ user, token: await gerarToken({ id: user.id }) })
    },
    async forgotPassword(req, res){
        const { email } = req.body

        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const user = await User.findOne({ where: { email } })

            if(!user)
                return res.status(400).send({error: 'Usuário não encontrado'})

            const emailToken = crypto.randomBytes(20).toString('hex')

            const now = new Date()
            now.setHours(now.getHours() + 1)
            
            await User.findByPk(user.id)
                .then(u => { u.update({ password_reset_token: emailToken, password_reset_expires:now }) })

            const msg = {
                to: email,
                from: {
                    email: 'antoniotx.dev@gmail.com',
                    name: 'Antonio Carlos'
                },
                subject: 'iPerto - Redefinição de senha',
                text: 'Clique no link abaixo para redefinir sua senha',
                html: `<a href=${emailToken}>${emailToken}</a>`,
            };

            await sgMail.send(msg);
            return res.send()

        } catch (error) {
            console.log('Mail Error: ', error.response.body.errors)
           return res.status(400).send({error: 'Erro ao recuperar senha, tente novamente'})
        }
    },
    async resetPassword(req, res){
        const { email, token, password } = req.body

        try {
            const user = await User.findOne({ where: { email } })

            if(!user)
                return res.status(400).send({error: 'Usuário não encontrado'})

            if(token !== user.password_reset_token)
                return res.status(400).send({ error: 'Token inválido' })

            const now = new Date()

            if(now > user.password_reset_expires)
                return res.status(400).send({ error: 'Token expirado, favor gerar um novo' })
            
            await User.findByPk(user.id)
                .then(u => { u.update({ password }) })

            res.send()
            
            
        } catch (error) {
            return res.status(400).send({error: 'Erro ao recuperar senha, tente novamente'})
        }
    }
}