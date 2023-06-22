const Sequelize = require("sequelize");

class Address extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
            zipcode: {
                    type: Sequelize.STRING,
                    validate: {
                        notEmpty: {msg: "Insira um CEP"},
                    },
                },
            street: {
                    type: Sequelize.STRING,
                    allowNull: false
                },

            addressNumber: {
                type: Sequelize.STRING,
                allowNull: false
            },
            complement: {
                type: Sequelize.STRING,
                allowNull: true
            }
            },{ sequelize, tableName: 'addresses', timestamps: false}
            
            
        );

        
        return this;

    }
    
    
    static associate(models){
        Address.belongsTo(models.User,{foreignKey:'user_id', as:'user'})
        Address.belongsTo(models.Neighborhood,{foreignKey:'neighborhood_id', as:'neighborhood'})
    }


}


module.exports = Address