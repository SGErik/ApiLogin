const { where } = require('sequelize')
const User = require('../models/user')

module.exports = {
    async createUsers(req, res) {
        try {
            const { name, email, password } = req.body

            const user = await User.create({ name, email, password })

            res.status(200).json({ user })
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: 'Já existe um usuário com este email' })
            } else if (error.name === 'SequelizeValidationError') {
                res.status(400).json({ message: 'Email inválido' })
            } else {
                res.status(400).json({ message: 'Este email não pode ser registrado', error })
            }
        }
    },

    async listUsers(req, res) {
        try {
            const users = await User.findAll()
            if (!users) {
                res.status(401).json({ message: 'Não existe usuários cadastrados' })
            }
            res.status(200).json({ users })
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    async updateUsers(req, res) {
        try {
            const { id } = req.params
            const { name, email } = req.body

            const user = await User.findOne({ where: { id } })
            if (!user) {
                res.status(400).json({ message: 'Não foi possível encontrar o usuário' })
            } else {
                const user = User.update({ name, email }, { where: id })
                res.status(200).json({ message: 'Usuário atualizado', user })
            }


        } catch (error) {
            res.status(400).json({ error })
        }
    }


}