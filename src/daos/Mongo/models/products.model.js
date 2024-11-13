const { Schema, model }   = require('mongoose')
const  productsCollection = 'products'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: Number,
    stock: Number,
    category: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now()
    }

})

const productModel = model(productsCollection, ProductSchema);

module.exports = {
    productModel
}