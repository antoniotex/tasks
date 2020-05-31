const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const users = await User.findAll()
        return res.json(users)
    },

    async store(req, res) {
        const { name, username, email, password, cellphone, phone } = req.body

        const user = await User.create({
            name,
            username,
            email,
            password,
            cellphone,
            phone
        })

        return res.json(user)
    }
}