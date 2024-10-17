const express                = require('express')
const handlebars             = require('express-handlebars')
const session                = require('express-session')
const MongoStore             = require('connect-mongo')
const passpor                = require('passport')
const sessionRouter          = require('./router/sessions.router.js')
const viewsRouter            = require('./router/views.router.js')
const cartRouter             = require('./router/cart.router.js')
const productsRouter         = require('./router/products.router.js')
const { initializePassport } = require('./config/passport.config.js')
const { connectDB }          = require('./config/index.config.js')
const cookieParser           = require('cookie-parser')

const app  = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())

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


app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).send('error de server')    
})

app.listen(PORT, err => {
    if(err) console.log(err);

    console.log(`Servidor escuchando en el puerto: ${PORT}`);    
})
