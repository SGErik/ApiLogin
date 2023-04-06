const { Sequelize, Model, DataTypes } = require('sequelize')


class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type:DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: DataTypes.STRING,

        }, {
            sequelize, tableName: 'users'
        })
    }

}

module.exports = User