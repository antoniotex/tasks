const { Model, DataTypes } = require('sequelize')


class Image extends Model {
    static init(sequelize) {
        super.init({
            location: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'poster_id', as: 'poster' })
    }
}

module.exports = Image