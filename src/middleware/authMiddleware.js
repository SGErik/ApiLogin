const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function myMiddleware(req, res, next) {
    try {
        const email = req.body.email
        const emailPass = req.body.password

        const token = req.headers.authorization.split(' ')[1];


        const user = await User.findOne({ where: { email } })

        const decodedToken = jwt.verify(token, 'shhhhhhhhhhh')
        
        if(user.email == email) {
            next()
        }

        

    }catch(error){
        res.status(400).json({ message: 'Email não encontrado' })
    }


}

module.exports = myMiddleware