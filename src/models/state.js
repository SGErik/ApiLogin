const Sequelize = require("sequelize");

class State extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
            state: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
            }, { sequelize, tableName: 'states', timestamps: false}
            
        );

        return this;

    }
    
    
    
    static associate(models){
        State.hasMany(models.City,{foreignKey:'state_id', as:'cities'})
    }
}

module.exports = State;