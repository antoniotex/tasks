const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')


class Poster extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            category: DataTypes.STRING,
            cep: DataTypes.STRING,
            state: DataTypes.STRING,
            city: DataTypes.STRING,
            neighborhood: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = Poster