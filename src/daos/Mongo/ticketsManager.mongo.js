const { ticketModel } = require("./models/ticket.model")

class TicketDaoMongo{

    constructor(){
        this.model = ticketModel
    }

    create = async newTicket             => await this.model.create( newTicket )
    get    = async ()                    => await this.model.find({})
    getBy  = async filter                => await this.model.findOne(filter)
    update = async (id, ticketToReplace) => await this.model.findByIdAndUpdate({_id : id}, ticketToReplace, {new : true})
    delete = async id                    => await this.model.findByIdAndDelete({_id : id}, { isActive : false }, { new : true } )

}

module.exports = {
    TicketDaoMongo
} 