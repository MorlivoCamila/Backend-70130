class ProductRepository{

    constructor(dao){
        this.dao = dao
    }

    createProduct = async newProduct            => await this.dao.create(newProduct)
    getProduct    = async filter                => await this.dao.getBy(filter)
    getProducts   = async ()                    => await this.dao.get() 
    updateProduct = async (id, productToUpdate) => await this.dao.update(id, productToUpdate)
    deleteProduct = async id                    => await this.dao.delete(id)

}

module.exports = ProductRepository