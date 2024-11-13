const { Router }                      = require('express')
const { createHash, isValidPassword } = require('../utils/bcrypt.js')
const { generateToken }               = require('../utils/jsonwebtoken.js')
const passportCall                    = require('../middleware/passport/passportCalls.js')
const UserDto                         = require('../dto/users.dto.js')
const AdminDto                        = require('../dto/admin.dto.js')
const { userService }                 = require('../services/index.js')

const router = Router()

router.post('/register', async ( req, res ) => {

    const {first_name, last_name, email, password, age, cartId, role} = req.body

    if(!email || !password) return res.status(400).send({status: 'error', error: 'Email y password son obligatorios.'})

    const userFound = await userService.getUser( {email: email} )
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

    const userFound = await userService.getUser( {email: email} )
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

router.get('/current', passportCall('jwt'),  async (req, res) => {

    const datosUser = await userService.getUser({email: req.user.email})
    
    if(req.user.role == 'admin'){
        
        const adminDto = new AdminDto(datosUser)
        res.send({dataUser: adminDto, message: 'datos sensibles'})

    }else{

        let userDto = new UserDto(datosUser) 
        res.send({dataUser: userDto, message: 'datos no sensibles'})
    }


})

module.exports = router
