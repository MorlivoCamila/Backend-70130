class UserRepository{

    constructor(dao){
        this.dao = dao
    }

    createUser = async newUser               => await this.dao.create(newUser)
    getUser    = async filter                => await this.dao.getBy(filter)
    getUsers   = async ()                    => await this.dao.get()
    updateUser = async (id, userToUpdate)    => await this.dao.update(id, userToUpdate)
    deleteUser = async id                    => await this.dao.delete(id)
}

module.exports = UserRepository