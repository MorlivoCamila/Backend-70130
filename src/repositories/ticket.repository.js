class TicketRepository{

    constructor(dao){
        this.dao = dao
    }

    createTicket = async newTicket            => await this.dao.create(newTicket)
    getTicket    = async filter               => await this.dao.getBy(filter)
    getTickets   = async ()                   => await this.dao.get() 
    updateTicket = async (id, ticketToUpdate) => await this.dao.update(id, ticketToUpdate)
    deleteTicket = async id                   => await this.dao.delete(id)

}

module.exports = TicketRepository