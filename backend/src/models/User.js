const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')


class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            password_reset_token: DataTypes.STRING,
            password_reset_expires: DataTypes.DATE
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

    static associate(models) {
        this.hasMany(models.Poster, { foreignKey: 'user_id', as: 'posters' })
    }
}

module.exports = User