const express                     = require('express')
const session                     = require('express-session')
const cookieParser                = require('cookie-parser')
const cors                        = require('cors')
const MongoStore                  = require('connect-mongo')
const handlebars                  = require('express-handlebars')
const passpor                     = require('passport')
const nodemailer                  = require('nodemailer')
const sessionRouter               = require('./router/sessions.router.js')
const viewsRouter                 = require('./router/views.router.js')
const cartRouter                  = require('./router/cart.router.js')
const productsRouter              = require('./router/products.router.js')
const usersRouter                 = require('./router/user.router.js')
const ticketsRouter               = require('./router/tickets.router.js')
const { sendEmail }               = require('./router/sendMail.js')
const { initializePassport }      = require('./config/passport.config.js')
const { connectDB, configObject } = require('./config/index.js')

const app  = express()
const PORT = configObject.port

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(cors())

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/c70130',
        ttl: 100000000000
    }),
    secret: 'secretcoder',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passpor.initialize())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

connectDB()

app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)
app.use('/api/cart', cartRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/ticket', ticketsRouter)

app.get('/email', async (req, res) => {

    const nombre = 'Camila Morlivo'

    await sendEmail({
        userClient:'formacioncamilamorlivo@gmail.com',
        subject: 'Prueba de email dinamico',
        html: `
            <div>
                <h1>Bienvenido ${nombre}</h1>
            </div>
        `
    })

    res.send('Email enviado.')

})

app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).send('error de server')    
})

app.listen(PORT, err => {
    if(err) console.log(err);

    console.log(`Servidor escuchando en el puerto: ${PORT}`);    
})
