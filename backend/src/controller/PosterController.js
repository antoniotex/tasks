const { Op, QueryTypes } = require('sequelize')
const Poster = require('../models/Poster')
const User = require('../models/User')
const Image = require('../models/Image')
const stream = require('stream')
require('dotenv/config')

module.exports = {
    async index(req, res) {
        try {
            const posters = await Poster.findAll({
                order: [['id', 'DESC']],
                include: { association: 'images' }
            })
            return res.json(posters)
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    },

    async search(req, res) {
        const { query } = req.body

        const arrQuery = []

        for (let i = 0; i < query.split(' ').length; i++) {
            arrQuery.push(
                {
                    [Op.or]: [
                        { title: { [Op.substring]: query.split(' ')[i] } },
                        { description: { [Op.substring]: query.split(' ')[i] } }
                    ]
                }
            )
        }

        const poster = await Poster.findAll({
            where: {
                [Op.and]: arrQuery
            },
            include: { association: 'images' }
        })

        return res.json(poster)
    },

    async indexById(req, res) {
        const { id } = req.params
        try {
            const poster = await Poster.findByPk(id, {
                include: { association: 'images' }
            })

            if (!poster) return res.status(400).json({ error: 'Anúncio não encontrado' })

            return res.json(poster)
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    },

    async store(req, res) {
        const { user_id } = req.params

        try {
            const user = await User.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

            const poster = await Poster.create({ ...req.body, user_id })

            const images = await req.files.map(image => {
                return {
                    location: image.location,
                    poster_id: poster.id
                }
            });

            if (images.length > 0) {
                await Image.bulkCreate(images)
            }

            return res.json(poster)
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    },

    async update(req, res) {
        const { id } = req.params
        try {
            const poster = await Poster.findByPk(id)

            if (!poster) return res.status(400).json({ error: 'Anúncio não encontrado' })

            poster.update(req.body)

            return res.json({ success: true })
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    },

    async delete(req, res) {
        const { id } = req.params
        try {
            const poster = await Poster.findByPk(id)

            if (!poster) return res.status(400).json({ error: 'Anúncio não encontrado' })

            poster.destroy()

            return res.json({ success: true })
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    }
}