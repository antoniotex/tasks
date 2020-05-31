const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')


class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize,
            hooks: {
                beforeSave: async (user, options) => {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            }
        })
    }

    // static associate(models) {
    //     this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' })
    //     this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    // }
}

module.exports = User