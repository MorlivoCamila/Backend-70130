const { ProductDaoMongo } = require('../daos/Mongo/productsDao.mongo.js')
const ProductRepository   = require('../repositories/products.repository.js')
const productService      = new ProductRepository(new ProductDaoMongo())

const { UserDaoMongo }    = require('../daos/Mongo/UserDao.mongo.js')
const UserRepository      = require('../repositories/users.repository.js')
const userService         = new UserRepository(new UserDaoMongo())

const { CartDaoMongo }    = require('../daos/Mongo/cartsManager.mongo.js')
const CartRepository      = require('../repositories/cart.repository.js')
const cartService         = new CartRepository(new CartDaoMongo())

const { TicketDaoMongo }  = require('../daos/Mongo/ticketsManager.mongo.js')
const TicketRepository    = require('../repositories/ticket.repository.js')
const ticketService       = new TicketRepository(new TicketDaoMongo())

module.exports = {
    productService,
    userService,
    cartService,
    ticketService
}