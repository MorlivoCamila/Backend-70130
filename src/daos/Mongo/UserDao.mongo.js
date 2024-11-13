const { userModel } = require("./models/users.model")

class UserDaoMongo {

    constructor(){
        this.model = userModel
    }

    create = async newUser             => await this.model.create(newUser)
    get    = async ()                  => await this.model.find({})
    getBy  = async filter              => await this.model.findOne(filter)
    update = async (id, userToReplace) => await this.model.findByIdAndUpdate({_id: id}, userToReplace, {new: true})
    delete = async id                  => await this.model.findByIdAndDelete({_id:id}, {isActive: false}, {new:true})
}

module.exports = {
    UserDaoMongo
}