const { Router }                      = require('express')
const { UserManagerMongo }            = require('../managers/Mongo/usersManager.mongo.js')
const { createHash, isValidPassword } = require('../utils/bcrypt.js')
const { generateToken }               = require('../utils/jsonwebtoken.js')
const passportCall                    = require('../middleware/passport/passportCalls.js')
const authorization                   = require('../middleware/passport/authorization.middleware.js')

const router      = Router()
const userService = new UserManagerMongo()


router.post('/register', async ( req, res ) => {

    const {first_name, last_name, email, password, age, cartId, role} = req.body

    if(!email || !password) return res.status(400).send({status: 'error', error: 'Email y password son obligatorios.'})

    const userFound = await userService.getUser({email})
    if(userFound) return res.status(401).send({status: 'error', error: 'El usuario ya existe.'})

    const newUser = {
        first_name, 
        last_name, 
        email, 
        password: createHash(password),
        age, 
        cartId, 
        role
    }

    const result = await userService.createUser(newUser)

    res.redirect('/')

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    const userFound = await userService.getUser({email})
    if(!userFound) return res.status(401).send({status: 'error', error: 'No existe el usuario.'})

    if(!isValidPassword(password, userFound.password)) return res.send({status: 'error', error: 'Credenciales incorrectas.'})
    
    const token = generateToken({
        id: userFound._id,
        email: userFound.email,
        role: userFound.role
    })

    res.cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }).send({
        status: 'success', 
        data: userFound, 
        token
    })
})


router.get('/current', passportCall('jwt'), authorization('admin'), (req, res) => {
    res.send({dataUser: req.user, message: 'datos sensibles'})
})

module.exports = router
