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
                        msg: 'O campo de email não pode ficar vazio'
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
                        msg: 'A senha deve ter entre 4 e 16 caracteres'
                    }
                }
                
            }

        }, {
            sequelize, tableName: 'users', hooks: {
                beforeCreate: async (user, options) => {
                    await hashPass(user, options)
                },
                beforeUpdate: async (user, options) => {
                    await hashPass(user, options)
                }
            }
        });
        
        
        
        
    
        
        const hashPass = async (user, options) => {
            if (user.password.length >= 4 || user.password.length <= 16){
                
                console.log('oi')
                const hashPassword = await bcrypt.hash(user.password, 10)

                user.password = hashPassword
                
                return options.validate = false
            }
        }
        

        
        
    }


}

module.exports = User