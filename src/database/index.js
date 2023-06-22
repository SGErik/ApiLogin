const { Sequelize } = require('sequelize')
const configDB = require('../config/database')


const connection = new Sequelize(configDB)

const userModel = require('../models/user')
const Address = require('../models/address')
const Neighborhood = require("../models/neighborhood");
const City = require("../models/city");
const State = require("../models/state");

userModel.init(connection)
Address.init(connection)
Neighborhood.init(connection)
City.init(connection)
State.init(connection)

userModel.associate(connection.models)
Address.associate(connection.models)
Neighborhood.associate(connection.models)
City.associate(connection.models)
State.associate(connection.models)



connection.authenticate().then(()=>{
    console.log('Banco de dados conectado')
}).catch((e)=> {
    console.log('Conexão não foi bem sucedido', e)
})

module.exports = connection

connection.sync().then(()=> {
    console.log('Banco de dados sincronizado com sucesso')
}).catch((error)=> {
    console.log('Banco de dados não pode ser sincronizado', error)
})


