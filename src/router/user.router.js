const {Router}        = require('express')
const router          = Router()
const { userService } = require('../services')

router.post('/', async (req, res) => {
 
    try {

        const { body }   = req    
        const newUser    = await userService.createUser(body)    

        res.status(200).send({status:'success', message:'Nuevo usuario creado.', data:newUser})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    

})

router.get('/', async (req, res) => {

    try {

        const usuarios = await userService.getUsers({})
        res.send({status: 'success', data: usuarios}) 
        
        
    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    

})

router.get('/:id', async (req, res) => {

    try {

        const {id}    = req.params
        const user    = await userService.getUser( {_id:id} )

        res.send({status: 'success', payload: user})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    
})

router.put('/:id', async (req, res) => {

    try {

        const { id }        = req.params
        const userToReplace = req.body 
        const datosUsuario  = await userService.getUser({_id:id})
        const result        = await userService.updateUser(id, userToReplace)
    
        res.send({status: 'succes', message: `El usuario ${datosUsuario.first_name} ${datosUsuario.last_name} ha sido actualizado.`})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    
})

router.delete('/:id', async (req, res) => {

    try {

        const {id}         = req.params
        const datosUsuario = await userService.getUser({_id:id})
        const result       = await userService.deleteUser(id)

        res.send({status: 'succes', message: `El usuario ${datosUsuario.first_name} ${datosUsuario.last_name} ha sido borrado.`})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
      
})


module.exports = router


