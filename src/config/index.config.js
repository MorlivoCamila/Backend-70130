const {connect} = require('mongoose')

exports.connectDB = async () => {

    await connect('mongodb://127.0.0.1:27017/c70130')
    console.log('Base de datos conectada.');
    
}