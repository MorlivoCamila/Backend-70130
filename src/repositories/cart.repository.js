class CartRepository{

    constructor(dao){
        this.dao = dao
    }

    createCart = async newCart               => await this.dao.create(newCart)
    getCart    = async filter                => await this.dao.getBy(filter)
    getCarts   = async ()                    => await this.dao.get()
    updateCart = async (id, cartToUpdate)    => await this.dao.update(id, cartToUpdate)
    deleteCart = async id                    => await this.dao.delete(id)

}



module.exports = CartRepository