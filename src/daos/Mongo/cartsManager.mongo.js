const { cartModel } = require("./models/carts.model")

class CartDaoMongo{

    constructor(){
        this.model = cartModel
    }
    create           = async NewCart             => await this.model.create( NewCart )
    get              = async ()                  => await this.model.find({})
    getBy            = async id                  => await this.model.findOne({_id : id})
    update           = async (id, cartToReplace) => await this.model.findByIdAndUpdate({_id : id}, cartToReplace, {new : true})
    delete           = async id                  => await this.model.findByIdAndDelete({_id : id}, { isActive : false }, {new : true})
}

module.exports = {
    CartDaoMongo
}