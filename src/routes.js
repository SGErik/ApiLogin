const { Router } = require('express')

const userController = require('./controllers/userController')

const authMiddleware = require('./middleware/authMiddleware')

const router = Router()


router.get('/users-list',  authMiddleware, userController.listUsers)

router.get('/users-find/:id', authMiddleware, userController.oneUser)

router.post('/users-create', userController.createUsers)

router.post('/users-auth',   userController.authUsers)

router.post('/testFile', userController.testUpload)

router.put('/users-update/:id', authMiddleware, userController.updateUsers)

router.put('/users-updatepass/:id', authMiddleware, userController.updatePassword)

router.delete('/users-delete/:id', authMiddleware, userController.deleteUser)





module.exports = router