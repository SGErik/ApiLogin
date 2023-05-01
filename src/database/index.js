const { Sequelize } = require('sequelize')
const configDB = require('../config/database')

const sequelize = new Sequelize('postgresql://postgres:ziEDe6yVNm95i0k4tmIJ@containers-us-west-123.railway.app:6524/railway')

const connection = new Sequelize(configDB)

const userModel = require('../models/user')

userModel.init(connection)

sequelize.authenticate().then(()=>{
    console.log('Banco de dados conectado')
}).catch((e)=> {
    console.log('Conexão não foi bem sucedido', e)
})

module.exports = connection

sequelize.sync().then(()=> {
    console.log('Banco de dados sincronizado com sucesso')
}).catch((error)=> {
    console.log('Banco de dados não pode ser sincronizado', error)
})
