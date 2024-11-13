const jwt         = require('jsonwebtoken')
const PRIVATE_KEY = 'CoderKeySecret@para-la-firma'

const generateToken = user => jwt.sign(
    user,
    PRIVATE_KEY,
    {
        expiresIn: '1h'
    }
)

const authTokenMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization']

    if(!authHeader) return res.status(401).send({status: 'error', error: 'Not authenticated.'})

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (error, dataToken) => {

        if(dataToken.role != 'admin') return res.send('No eres administrador.')
        req.user = dataToken
        next()

    })

}

module.exports = {
    generateToken, 
    authTokenMiddleware, 
    PRIVATE_KEY
}
