const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

async function myMiddleware(req, res, next) {
    
    try {
        const email = req.body.email
        const emailPass = req.body.password
        const token = req.headers.authorization.split(' ')[1];
        const bodyToken = req.headers.authorization

        const user = await User.findOne({ where: { email } })
        
        const passwordMatch = await bcrypt.compare(emailPass, user.password)
        
        const decodedToken = jwt.verify(token, 'shhhhhhhhhhh')

        
        
        
        if(user.email == email && passwordMatch) {
            next()
        }else if (!passwordMatch){
            res.status(400).json({message: 'Senha Incorreta'})
        }
        

    }catch(error){
        
        res.status(400).json({message: 'Token Inválido' })
       
    }


}

module.exports = myMiddleware