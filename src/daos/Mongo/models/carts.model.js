const { Schema, model } = require('mongoose')
const colecctions       = 'carts'

const CartSchema = new Schema({

    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number
            }
        }]
    }

})

CartSchema.pre('findOne', function() {
    this.populate('products.product')
})
 
const cartModel = model(colecctions, CartSchema)

module.exports = {
    cartModel
}
