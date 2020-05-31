const User = require('../models/User')

module.exports = {
    async update(req, res) {
        const { user_id } = req.params
        try {
            await User.findByPk(user_id)
                .then(u => { u.update(req.body) })

            return res.json({ success: true })
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    },

    async delete(req, res) {
        const { user_id } = req.params

        try {
            await User.findByPk(user_id)

            user.destroy()

            return res.json({ success: true })
        } catch (error) {
            return res.status(400).json({ success: false })
        }

    }
}