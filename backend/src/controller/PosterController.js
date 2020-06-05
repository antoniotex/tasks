const { Op, QueryTypes } = require('sequelize')
const Poster = require('../models/Poster')
const User = require('../models/User')
const Image = require('../models/Image')
const Category = require('../models/Category')
require('dotenv/config')

module.exports = {
    async index(req, res) {
        try {
            const posters = await Poster.findAll({
                attributes: { exclude: ['category_id', 'user_id', 'updatedAt'] },
                order: [['id', 'DESC']],
                include: [
                    { association: 'images', attributes: ['id', 'location'] },
                    { model: Category, as: 'category', attributes: ['name'] },
                    { model: User, as: 'user', attributes: ['id', 'name'] }
                ]
            })
            return res.json(posters)
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    },

    async search(req, res) {
        const { query } = req.query
        console.log(query)
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
            attributes: { exclude: ['category_id', 'user_id', 'updatedAt'] },
            where: {
                [Op.and]: arrQuery
            },
            order: [['id', 'DESC']],
            include: [
                { association: 'images', attributes: ['id', 'location'] },
                { model: Category, as: 'category', attributes: ['name'] },
                { model: User, as: 'user', attributes: ['id', 'name'] }
            ]
        })

        return res.json(poster)
    },

    async indexById(req, res) {
        const { id } = req.params
        try {
            const poster = await Poster.findByPk(id, {
                attributes: { exclude: ['category_id', 'user_id', 'updatedAt'] },
                include: [
                    { association: 'images', attributes: ['id', 'location'] },
                    { model: Category, as: 'category', attributes: ['name'] },
                    { model: User, as: 'user', attributes: ['id', 'name'] }
                ]
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
    },

    async getCategories(req, res) {
        const categories = await Category.findAll({
            attributes: ['id', 'name'],
            order: ['name'],
        })
        return res.json(categories)
    }
}