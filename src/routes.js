const { Router } = require('express')

const userController = require('./controllers/userController')

const myMiddleware = require('./middleware/authMiddleware')

const router = Router()


router.get('/users-list',  userController.listUsers)

router.post('/users-create', userController.createUsers)

router.post('/users-auth',  myMiddleware, userController.authUsers)

router.put('/users-update/:id', myMiddleware,  userController.updateUsers)

router.delete('/users-delete/:id', userController.deleteUser)





module.exports = router