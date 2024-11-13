const { Schema, model } = require('mongoose')
const  ticketCollection = 'tickets'

const TicketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    amount: Number,
    purchaser: String,
    purchase_datetime: {
        type: Date,
        default: Date.now()
    }

})

const ticketModel = model(ticketCollection, TicketSchema);

module.exports = {
    ticketModel
}