const jwt = require('jsonwebtoken')


async function authMiddleware(req, res, next) {

    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(400).json({ message: 'Token não existe' })
        }
        const tokenAuth = token.split(' ')[1]


        const decodedToken = jwt.verify(tokenAuth, 'shhhhhhhhhhh')

        if(decodedToken) {
            next()
        }


    } catch (error) {

        res.status(400).json({ message: 'Tokén invalido', error })

    }


}

module.exports = authMiddleware