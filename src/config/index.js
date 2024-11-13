const dotenv             =  require('dotenv')
const { program }        = require('../utils/commander')
const { MongoSingleton } = require('../utils/mongoSingleton')
const { mode }           = program.opts()

dotenv.config({
    path: mode=='development' ? './.env.development' : './.env.production'
})

exports.configObject = {    
    port:        process.env.PORT || 8080,
    private_key: process.env.PRIVATE_KEY,
    gmail_user:  process.env.GMAIL_USER,
    gmail_pass:  process.env.GMAIL_PASS
    
}

exports.connectDB = async () => {
    return await MongoSingleton.getInstance()
}

