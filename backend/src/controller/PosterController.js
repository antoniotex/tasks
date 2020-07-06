const { Op, QueryTypes } = require('sequelize')
const axios = require('axios')
const Poster = require('../models/Poster')
const User = require('../models/User')
const Image = require('../models/Image')
const Category = require('../models/Category')
require('dotenv/config')

async function getDistance(latitude, longitude, ceps){
    const apiGoogle = `https://maps.googleapis.com/maps/api/distancematrix/json?`
    const keyApiGoogle = `AIzaSyCQzbAc7DC4aYWGWoyxcO5HMM4wtmQB03Q`

    console.log(latitude)
    console.log(longitude)
    console.log(ceps)
    const response = await axios.get(
        `${apiGoogle}origins=${latitude},${longitude}&destinations=${ceps}&key=${keyApiGoogle}`, 
    )
    return response.data.rows[0].elements
}

async function getCeps(posters){
    let map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
    let ceps = ''
    
    for (let i = 0; i < posters.length; i++) {
        const neighborhood = posters[i].neighborhood.replace(/[\W\[\] ]/g,function(a){return map[a]||a})
        const city = posters[i].city.replace(/[\W\[\] ]/g,function(a){return map[a]||a})
        if(i === 0)
            ceps += `${posters[i].cep},${neighborhood.replace(/\s/g, '+')},${city.replace(/\s/g, '+')}`
        else
            ceps += `|${posters[i].cep},${neighborhood.replace(/\s/g, '+')},${city.replace(/\s/g, '+')}`
    }
    return ceps
}

module.exports = {
    async index(req, res) {
        const { latitude, longitude } = req.params
        
        try {
            const posters = await Poster.findAll({
                attributes: { exclude: ['category_id', 'user_id', 'updatedAt'] },
                order: [['id', 'DESC']],
                include: [
                    { association: 'images', attributes: ['id', 'location'] },
                    { model: Category, as: 'category', attributes: ['name'] },
                    { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone_number'] }
                ]
            })

            const ceps = await getCeps(posters)
            const distance = await getDistance(latitude, longitude, ceps)

            await posters.map((poster, index) => {
                poster.dataValues.distance = distance[index]
                if(index == 1)
                    console.log(poster.dataValues.distance)
            })
            
            return res.json(posters)
        } catch (error) {
            return res.status(400).json({ error: error })
        }
    },

    async search(req, res) {
        const { query } = req.query
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
                { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone_number'] }
            ]
        })

        return res.json(poster)
    },

    async indexById(req, res) {
        const { id } = req.params
        try {
            const poster = await Poster.findByPk(id, {
                attributes: { exclude: ['user_id', 'updatedAt'] },
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

    async indexByUser(req, res) {
        const { user_id } = req.params

        try {
            const user = await User.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

            const posters = await Poster.findAll({
                attributes: ['id', 'title', 'createdAt'],
                where: {
                    user_id
                },
                order: [['id', 'DESC']],
            })
            return res.json(posters)
        } catch (error) {
            return res.status(400).json({ error: error })
        }
    },

    async store(req, res) {
        const { user_id } = req.params
        req.body = JSON.parse(JSON.stringify(req.body))

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
            return res.status(400).json({ error })
        }
    },

    async update(req, res) {
        const { id } = req.params
        try {
            const poster = await Poster.findByPk(id)

            if (!poster) return res.status(400).json({ error: 'Anúncio não encontrado' })

            poster.update(req.body)

            const images = await req.files.map(image => {
                return {
                    location: image.location,
                    poster_id: poster.id
                }
            });

            if (images.length > 0) {
                await Image.bulkCreate(images)
            }

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
    },

    async deleteImageById(req, res) {
        try {
            const { image_id } = req.params
            const image = await Image.findByPk(image_id)
            if (!image) return res.status(400).json({ error: 'Imagem não encontrado' })
            image.destroy()
            return res.json({ success: true })
        } catch (error) {
            return res.status(400).json({ success: false })
        }
    }
}