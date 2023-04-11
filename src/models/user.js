const { Sequelize, Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')


class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type:DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'Este campo não pode ficar vazio'
                    },
                    isEmail: {
                        msg: 'Este email não é válido'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [4, 16],
                        msg: 'Este campo deve ter entre 4 e 16 caracteres'
                    }
                }
                
            }

        }, {
            sequelize, tableName: 'users'
        })
        
        // User.beforeSave(async (user) => {
        //     if (user.changed('password')) {
        //       const salt = await bcrypt.genSalt(10);
        //       user.password = await bcrypt.hash(user.password, salt);
        //     }
        //   });

        User.beforeCreate(async (user, options) => {
            const hashedPassword = await bcrypt.hash(user.password, 10)
            user.password = hashedPassword
        })
        
    }


}

module.exports = User