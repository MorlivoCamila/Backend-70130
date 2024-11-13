const {Router}             = require('express')
const router               = Router()
const passportCall         = require('../middleware/passport/passportCalls.js')
const authorization        = require('../middleware/passport/authorization.middleware.js')
const { productService }   = require('../services/index.js')

router.post('/', passportCall('jwt'), authorization('admin'), async (req, res) => { 

    try {

        const { body } = req

        if( !body.title         ||
            !body.description   ||
            !body.code          ||
            !body.price         || 
            !body.stock         ||
            !body.category    
        ){
            return res.status(400).send({status: 'error', error: 'Faltan datos.' })
        }         

        if(isNaN(body.price) || isNaN(body.stock)) return res.status(400).send({status: 'error', error: 'El tipo de dato es incorrecto.'})
        

        const newProduct = await productService.createProduct(body) 
        res.status(200).send({status:'success', message:'Nuevo producto creado.', data:newProduct})

    } catch (error) {

        console.log(error.message)
        res.status(500).send("Error.")

    }
    

})

router.get('/', async (req, res) => {

    try {

        const productos = await productService.getProducts({})
        res.send({status: 'success', data: productos}) 
        
        
    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    

})

router.get('/:id', async (req, res) => {

    try {

        const {id}     = req.params
        const producto = await productService.getProduct({_id:id})

        res.send({status: 'success', payload: producto})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    
})

router.put('/:id', passportCall('jwt'), authorization('admin'), async (req, res) => {

    try {

        const { id }        = req.params
        const prodToReplace = req.body 
        const datosProduct  = await productService.getProduct({_id:id})
        const result        = await productService.updateProduct(id, prodToReplace)
    
        res.send({status: 'succes', message: `Se actualizó el producto: ${datosProduct.title}.`})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    
})

router.delete('/:id', passportCall('jwt'), authorization('admin'), async (req, res) => {
 
    try {

        const {id}         = req.params
        const datosProduct = await productService.getProduct({_id:id})
        const result       = await productService.deleteProduct(id)

        res.send({status: 'succes', message: `Se borró el producto ${datosProduct.title} del almacenamiento.`})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
      
})


module.exports = router


