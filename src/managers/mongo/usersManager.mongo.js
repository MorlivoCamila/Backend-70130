const { userModel } = require('../../models/users.model.js')

class UserManagerMongo{

    constructor(){
        this.model = userModel
    }

    getUser    = async filter => await this.model.findOne(filter)
    createUser = async newUser => await this.model.create(newUser)

}

module.exports = {
    UserManagerMongo
}