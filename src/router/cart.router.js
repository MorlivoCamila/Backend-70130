const {Router}                        = require('express')
const router                          = Router()
const passportCall                    = require('../middleware/passport/passportCalls.js')
const authorization                   = require('../middleware/passport/authorization.middleware.js')
const { cartService, ticketService }  = require('../services/index.js');
const { productModel }                = require('../daos/Mongo/models/products.model.js');

router.post('/', async (req, res) => { 

    try {

        const { body } = req
        const newCart  = await cartService.createCart(body)
        
        res.status(200).send({status: 'succes', message: `Nuevo carrito creado. ID: ${newCart._id}`})

    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }
      
})

router.post('/:cid/product/:pid', async(req, res) => {

    try {
        
        const {cid}     = req.params
        const {pid}     = req.params
        const quantity  = req.query.quantity    
        const cart      = await cartService.getCart(cid)
    
        cart.products.push({product: pid, quantity: quantity})
    
        const respuesta = await cartService.updateCart( cid, cart)

        res.status(200).send({status: 'succes', message: `El producto ${pid} se guardo en el carrito ${cid}.`, data:respuesta})


    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }

})

router.get('/', async(req, res) => { 
    
    try {

        const carritos = await cartService.getCarts()
        res.send({status: 'success', data: carritos})
    
    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }

})

router.get('/:id', async(req, res) => { 
    
    try {

        const { id }   = req.params
        const carrito  = await cartService.getCart(id)

        res.send({status: 'success', data: carrito})
    
    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }

})

router.put('/:cid/product/:pid', passportCall('jwt'), authorization('user'), async(req,res) =>{ 

    try {
        
        const {cid}  = req.params
        const {pid}  = req.params
        const {body} = req   
        let idFund   = false    
        const cart   = await cartService.getCart(cid)        

        cart.products.map( (prod) => {  
            
            console.log(prod);
            
            if(prod.product._id == pid){
                idFund = true
                prod.quantity = body.quantity
            }

        })

        if(!idFund) return res.status(400).send({status: 'error', error: 'Los datos son incorrectos.' })

        const respuesta = await cartService.updateCart( cid, cart)

        res.send({status: 'succes', message: `El producto ${pid} ha sido actualizado.`})
 
    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }
    
})

router.delete('/:cid', async (req, res) => {

    try {
        
        const {cid}     = req.params
        const respuesta = await cartService.deleteCart(cid)
        
        res.send({status: 'succes', message: `El carrito ${cid} ha sido vaciado.`})
    
    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }

})

router.delete('/:cid/product/:pid', async(req, res) => {

    try {
        
        const {cid} = req.params
        const {pid} = req.params
        const cart  = await cartService.getCart(cid)
        let index
          
        for (let i = 0; i < cart.products.length; i++) {            

            let id = JSON.stringify(cart.products[i].product._id)
            
            id = id.slice(1);
            id = id.slice(0, -1)

            if ( id === pid ) {

                index = i       
            
            } 
        } 
        
        delete(cart.products[index])
        const newCart = cart.products.filter(p => p != null)

        const respuesta = await cartService.updateCart(cid, {products: newCart})

        res.send({status: 'succes', message: `El producto ${pid} ha sido eliminado del carrito ${cid}.`})

   
    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }

})

const updateStock = async (stock, producto) => {

    producto.stock = stock  
    return await productModel.updateOne({_id: producto._id}, producto) 
     
}

const deleteProductInCart = async (id, producto) => {
 
    const cart = await cartService.getCart(id)

    cart.products.map( (p) => {

        if (JSON.stringify(p.product._id) == JSON.stringify(producto._id) ) {          
            p.product = null            
        }
    })

    const newCart = cart.products.filter(p => p.product != null)    

    return await cartService.updateCart(id, {products: newCart})

}

router.post('/:cid/purchase', passportCall('jwt'), authorization('user'),async (req, res) => {

    try {
        
        const {cid}        = req.params
        const tickets      = await ticketService.getTickets({})
        const cart         = await cartService.getCart(cid)
        let prodEliminados = []
        let amount         = 0
        let stock          

        cart.products.map( (p) => {
          
            if(p.product.stock  >= p.quantity){    

                stock        = p.product.stock - p.quantity
                const cuenta = p.product.price * p.quantity
                amount       = amount + cuenta
                
                updateStock(stock, p.product)

            }else{

                prodEliminados.push(p.product.title)
                deleteProductInCart(cid, p.product)

            }            
        })        

        if(prodEliminados.length != []){

            const newTicket  = await ticketService.createTicket({code: `TCV0${tickets.length + 1}`, amount: amount, purcharse: req.user.email})  
            res.send({status: 'succes', message: `Carrito finalizado. Se eliminaron los siguientes productos por falta de stock: ${prodEliminados}`, data: newTicket})
        
        }else{
            
            const newTicket  = await ticketService.createTicket({code: `TCV0${tickets.length + 1}`, amount: amount, purchaser: req.user.email})  
            res.send({status: 'succes', message: 'Carrito finalizado.', data: newTicket})

        }

    
    } catch (error) {
        console.log(error)
        res.status(500).send("Error.")
    }

})

module.exports = router