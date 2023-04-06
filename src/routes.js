const { Router } = require('express')

const userController = require('./controllers/userController')

const router = Router()


router.get('/users-list', userController.listUsers)

router.post('/user-create', userController.createUsers)

module.exports = router