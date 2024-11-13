const {Router}          = require('express')
const router            = Router()
const { ticketService } = require('../services')

router.post('/', async (req, res) => {
 
    try {

        const { body }   = req
        const tickets    = await ticketService.getTickets({})         
        const newTicket  = await ticketService.createTicket({code: `TCV0${tickets.length + 1}`, ...body})    

        res.status(200).send({status:'success', message:'Nuevo ticket creado.', data:newTicket})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    

})

router.get('/', async (req, res) => {

    try {

        const tickets = await ticketService.getTickets({})
        res.send({status: 'success', data: tickets}) 
        
        
    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    

})

router.get('/:id', async (req, res) => {

    try {

        const {id}   = req.params
        const ticket = await ticketService.getTicket( {_id:id} )

        res.send({status: 'success', payload: ticket})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    
})

router.put('/:id', async (req, res) => {

    try {

        const { id }          = req.params
        const ticketToReplace = req.body 
        const datosticket     = await ticketService.getTicket({_id:id})
        const result          = await ticketService.updateTicket(id, ticketToReplace)
    
        res.send({status: 'succes', message: `El ticket ${datosticket.code} ha sido actualizado.`})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
    
})

router.delete('/:id', async (req, res) => {

    try {

        const {id}        = req.params
        const datosticket = await ticketService.getTicket({_id:id})
        const result      = await ticketService.deleteTicket(id)

        res.send({status: 'succes', message: `El ticket ${datosticket.code} ha sido borrado.`})

    } catch (error) {

        console.log(error)
        res.status(500).send("Error.")

    }
      
})


module.exports = router


