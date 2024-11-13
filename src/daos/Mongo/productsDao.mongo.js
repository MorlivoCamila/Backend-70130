const { productModel } = require("./models/products.model")

class ProductDaoMongo{

    constructor(){
        this.model = productModel
    }

    create = async newProduct             => await this.model.create( newProduct )
    get    = async ()                     => await this.model.find({})
    getBy  = async filter                 => await this.model.findOne(filter)
    update = async (id, productToReplace) => await this.model.findByIdAndUpdate({_id : id}, productToReplace, {new : true})
    delete = async id                     => await this.model.findByIdAndDelete({_id : id}, { isActive : false }, { new : true } )

}

module.exports = {
    ProductDaoMongo
} 