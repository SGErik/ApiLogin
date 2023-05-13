const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cloudinary = require('../config/cloudinary')


module.exports = {

    async authUsers(req, res) {

        try {

            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            const token = jwt.sign({ user }, 'shhhhhhhhhhh')

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (user.email == email && passwordMatch) {

                return res.json({ user, token })
            } else if (user.email == email && !passwordMatch) {
                return res.status(401).json({ message: 'Senha Incorreta' })
            }

        } catch (e) {
            return res.status(400).json({ message: 'Email não encontrado' })
        }




    },


    async createUsers(req, res) {
        try {
            const { name, email, password, confirmedPassword, image, is_admin } = req.body
            let imageUpload = {secure_url: '', public_id: ''}
            
            if(image){

                imageUpload = await cloudinary.uploader.upload(image, {
                    public_id: `${Date.now()}`,
                    resource_type: 'image',
                    folder: 'UserImage',
                    width: 400,
                    height: 400,
                    crop: 'fill'
                })
            }

            if (password === confirmedPassword) {

                const user = await User.create({ name, email, password, url: imageUpload.secure_url, image_id: imageUpload.public_id, is_admin})

                res.status(200).json({ message: 'Usuário criado com sucesso', user })
            } else {
                res.status(400).json({ message: 'Senhas não coincidem' })
            }

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Já existe um usuário com este email' })
            } else {
                res.status(400).json({ error })
            }
        }
    },

    async oneUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.findOne({ where: { id } })
            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado' })
            }
            res.status(200).json({ message: 'Usuário encontrado', user })

        } catch (error) {
            return res.status(400).json({ error })
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
            return res.status(400).json({ error })
        }
    },

    async updatePassword(req, res) {
        try {
            const { id } = req.params
            const { prevPassword, password } = req.body
            const user = await User.findOne({ where: { id } })
            const prevCompare = await bcrypt.compare(prevPassword, user.password)


            if (prevPassword == password) {
                return res.status(400).json({ message: 'Nova senha não pode ser a mesma que a anterior' })
            } else if (!prevCompare) {
                return res.status(400).json({ message: 'Senha antiga incorreta' })
            }

            await user.update({ password }, { where: { id } })

            return res.status(200).json({ message: 'Senha Atualizada' })


        } catch (error) {
            res.status(400).json({ error: error })
        }

    },


    async updateUsers(req, res) {
        try {
            const { id } = req.params
            const { name, email, image } = req.body
            const user = await User.findOne({ where: { id } })
            let imageUpload = {secure_url: user.url, public_id: user.image_id}
            
            if(image) {
                imageUpload = await cloudinary.uploader.upload(image, {
                    public_id: `${Date.now()}`,
                    resource_type: 'image',
                    folder: 'UserImage',
                    width: 400,
                    height: 400,
                    crop: 'fill'
                })
            }

            

            if (!user) {
                res.status(400).json({ message: 'Não foi possível encontrar o usuário' })
            } else {
                
                if(image && user.image_id !== '' ){
                    const imageDelete = await cloudinary.uploader.destroy(user.image_id, {
                        type: 'upload',
                        resource_type: 'image'
                    })
                }

                const userUpdate = await User.update({ name, email, url: imageUpload.secure_url, image_id: imageUpload.public_id }, { where: { id } })
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
                if(user.image_id !== ''){
                    const imageDelete = await cloudinary.uploader.destroy(user.image_id, {
                        type: 'upload',
                        resource_type: 'image'
                    })
                }
                await User.destroy({ where: { id } })
                res.status(200).json({ message: 'Usuário Deletado' })
            }

        } catch (error) {
            res.status(400).json({ message: 'Não foi possível deletar usuário' })
        }
    }




}