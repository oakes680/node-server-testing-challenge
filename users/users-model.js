const data = require('../data/dbConfig')

module.exports = {
    getUsers,
    registerUser,
    login,
    remove
}

function getUsers() {
    return data('users')
}

function registerUser(userData) {
    return data('users')
    .insert(userData)
}

function login(userName){
    return data('users')
    .where(userName)
}

function remove(id) {
    return data('users')
    .where(id).del()
}