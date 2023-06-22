const { Router } = require('express')

const userController = require('./controllers/userController')

const addressController = require('./controllers/AddressController')

const authMiddleware = require('./middleware/authMiddleware')

const router = Router()


router.get('/users-list',  authMiddleware, userController.listUsers)

router.get('/users-find/:id', authMiddleware, userController.oneUser)

router.get('/sendCep/:cep', addressController.sendCepPromise)

router.get('/users/address/:id', addressController.userAddressInfo)

router.get('/addresses', addressController.allAddressInfo)

router.post('/users-create', userController.createUsers)

router.post('/users/address/:user_id', addressController.cepRegister)

router.post('/users-auth',   userController.authUsers)

router.put('/users-update/:id', authMiddleware, userController.updateUsers)

router.put('/users-updatepass/:id', authMiddleware, userController.updatePassword)

router.put('/users/upAddress/:id', addressController.updateAddress)

router.delete('/users-delete/:id', authMiddleware, userController.deleteUser)





module.exports = router