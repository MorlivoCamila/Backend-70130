const { Router } = require('express')
const router     = Router()

router.get('/', (req, res) => {
    res.render('login', {
        estilos: 'login.css',
        titulo: 'Sing Up'
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        estilos: 'register.css'
    })
})
 
module.exports = router