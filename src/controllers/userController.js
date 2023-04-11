const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {

    async authUsers(req, res) {

        try {

            const bodyToken = req.headers.authorization
            const { email, password } = req.body
            const emailJWT = await User.findOne({where: { email }})
            const token = jwt.sign( {emailJWT}, 'shhhhhhhhhhh' ) 

            if(bodyToken.length == 0){
                res.status(400).json({message: 'Token Inválido'})
            }


        
        return res.json(token)
        
        
        } catch (e) {
            
        }




    },




    async createUsers(req, res) {
        try {
            const { name, email, password } = req.body

        

            const user = await User.create({ name, email, password })

            res.status(200).json({ user })
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Já existe um usuário com este email' })
            } 
             else {
                res.status(400).json({ error })
            }
        }
    },

    async listUsers(req, res) {
        try {
            const users = await User.findAll()
            if (users.length == 0) {
                return res.status(404).json({ message: 'Não existe usuários cadastrados' })
            }
            res.status(200).json({ users })
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    async updateUsers(req, res) {
        try {
            const { id } = req.params
            const { name, email, password } = req.body

            const user = await User.findOne({ where: { id } })
            if (!user) {
                res.status(400).json({ message: 'Não foi possível encontrar o usuário' })
            } else {
                const user = await User.update({ name, email, password }, { where: { id } })
                res.status(200).json({ message: 'Usuário atualizado', user })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.findOne({ where: { id } })
            if (!user) {
                res.status(400).json({ message: 'Usuário não encontrado' })
            } else {
                await User.destroy({ where: { id } })
                res.status(200).json({ message: 'Usuário Deletado' })
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    }


}